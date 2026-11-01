#!/usr/bin/env python3
"""
福衛八號光學確認：SAR 候選範圍在 2026 年 3/31、4/15 的福衛八號影像上是不是水，並描出堆積區與水面範圍。

    cd code
    python scripts/fs8_validate.py

需要：
    data/restricted/fs8/fs8_matai_an_2026.tif   （國家太空中心提供，不進版控，見 data/inventory.csv）
    code/dashboard/data/events.js               （pipeline.events.build 的結果，取候選範圍）

輸出（都是不含影像的衍生產品，授權書 2.1(i) 允許自由使用，可以進版控）：
    docs/results/fs8_check.csv                  每個候選一列：像水像元比例、三種綠光假設下的 NDWI、判定
    docs/results/fs8_cover_matai_an_2026.geojson  壩址 4 km 窗格內的「水」「裸露地」範圍（EPSG:4326）

為什麼不用 NDWI／近紅外線門檻：太空中心還沒提供波段定義與數值單位（反射率或 DN），
Sentinel-2 的「近紅外線 < 500」在這張影像上整個窗格沒有一個像元符合。這裡只用兩件不需要知道
單位、也不需要知道哪個可見光波段是綠光的事：
    1. 第 4 波段是近紅外線：植被在此波段特別亮、與第 1～3 波段幾乎不相關（相關係數約 0.2）。
    2. 比值 r = 近紅外線 ÷ 第 1～3 波段中最亮的一個。水吸收近紅外線，r 明顯小於 1；
       裸露土石、岩壁的光譜平坦，r 約 1；植被 r 約 4～6。

門檻（docs/fs8-validation.md 有選定經過）：
    r < 0.9        → 水。0.9～1.0 是新鮮岩壁等亮色裸地，在窗格內看過分布後選定，不是物理常數
    0.9 ≤ r < 2.0  → 裸露地。2.0 是直方圖兩峰之間的谷底
    r ≥ 2.0        → 植被
候選判定：範圍內水像元 ≥ 10% → 有水跡象；可能是雲的像元 ≥ 50% → 無法判定；其餘 → 未見水。
這些門檻只用在這支程式，不回頭改 SAR 偵測或排序參數。
"""

from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

import numpy as np
import rasterio
from pyproj import Transformer
from rasterio.features import geometry_mask, shapes
from rasterio.windows import from_bounds
from scipy import ndimage
import shapely
from shapely.geometry import Point, Polygon, mapping, shape
from shapely.ops import unary_union

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
FS8 = REPO / "data" / "restricted" / "fs8" / "fs8_matai_an_2026.tif"
EVENTS_JS = CODE / "dashboard" / "data" / "events.js"
OUT_CSV = REPO / "docs" / "results" / "fs8_check.csv"
OUT_COVER = REPO / "docs" / "results" / "fs8_cover_matai_an_2026.geojson"

FS8_DATES = ("2026-03-31", "2026-04-15")   # 兩天拼接，分界未提供
SCENARIOS = ("matai_an_2025", "neg2026_matai_an")
CENTER = (121.29752, 23.70061)
WINDOW_M = 4000.0

NIR = 3                      # 第 4 波段（0 起算）
VISIBLE = (0, 1, 2)          # 第 1～3 波段
WATER_RATIO = 0.9
VEG_RATIO = 2.0
WATER_FRAC = 0.10            # 候選範圍內水像元比例 ≥ 此值 → 有水跡象
CLOUD_FRAC = 0.50
CLOUD_PCTL = 99.5            # 第 1 波段高於全景此百分位、且光譜平坦 → 可能是雲
MIN_WATER_PX = 10            # 小於 40 m² 的水塊不畫
MIN_BARE_HA = 0.5

TO_3826 = Transformer.from_crs("EPSG:4326", "EPSG:3826", always_xy=True)
TO_4326 = Transformer.from_crs("EPSG:3826", "EPSG:4326", always_xy=True)


def nir_ratio(bands: np.ndarray) -> np.ndarray:
    """
    近紅外線 ÷ 最亮的可見光波段。nodata（−9999）與 0 → nan。

    >>> b = np.array([[[100.]], [[200.]], [[150.]], [[100.]], [[0.]], [[0.]]])
    >>> round(float(nir_ratio(b)[0, 0]), 2)
    0.5
    """
    b = np.asarray(bands, dtype="float64")
    vis = b[list(VISIBLE)].max(axis=0)
    nir = b[NIR]
    bad = (b[list(VISIBLE) + [NIR]] <= 0).any(axis=0)
    with np.errstate(divide="ignore", invalid="ignore"):
        r = nir / vis
    r[bad] = np.nan
    return r


def classify(r: np.ndarray) -> np.ndarray:
    """
    0 = 無資料、1 = 水、2 = 裸露地、3 = 植被。

    >>> classify(np.array([0.5, 0.95, 1.5, 4.0, np.nan])).tolist()
    [1, 2, 2, 3, 0]
    """
    c = np.zeros(r.shape, dtype="uint8")
    ok = np.isfinite(r)
    c[ok & (r < WATER_RATIO)] = 1
    c[ok & (r >= WATER_RATIO) & (r < VEG_RATIO)] = 2
    c[ok & (r >= VEG_RATIO)] = 3
    return c


def verdict(water_frac: float, cloud_frac: float) -> str:
    """
    >>> verdict(0.0, 0.0), verdict(0.2, 0.0), verdict(0.0, 0.6)
    ('未見水', '有水跡象', '無法判定（雲）')
    """
    if cloud_frac >= CLOUD_FRAC:
        return "無法判定（雲）"
    return "有水跡象" if water_frac >= WATER_FRAC else "未見水"


def load_events() -> list:
    """每個情境的每個事件取最後一次出現時的範圍，並記錄首見、末見與最高優先等級。"""
    text = EVENTS_JS.read_text(encoding="utf-8")
    scenarios = json.loads(text[text.index("["):].rstrip().rstrip(";"))
    rank = {"low": 0, "medium": 1, "high": 2}
    out = []
    for sc in scenarios:
        if sc["id"] not in SCENARIOS:
            continue
        seen = {}
        for snap in sc["snapshots"]:
            for e in snap.get("events", []):
                rec = seen.setdefault(e["id"], {"scenario": sc["id"], "event": e["id"],
                                                "first_seen": snap["asOf"][:10], "max_priority": "low"})
                rec["last_seen"] = snap["asOf"][:10]
                rec["polygon"] = e.get("polygonLonLat")
                rec["lonLat"] = e["lonLat"]
                if rank.get(e.get("priority"), 0) > rank[rec["max_priority"]]:
                    rec["max_priority"] = e["priority"]
        out.extend(seen.values())
    return out


def footprint_3826(ev: dict):
    if ev.get("polygon") and len(ev["polygon"]) >= 3:
        poly = Polygon(ev["polygon"])
        return shapely.transform(poly, lambda x, y: TO_3826.transform(x, y), interleaved=False)
    x, y = TO_3826.transform(*ev["lonLat"])
    return Point(x, y).buffer(30.0)


def check_events(src, cloud_thr: float) -> list:
    rows = []
    for ev in load_events():
        geom = footprint_3826(ev)
        win = from_bounds(*geom.bounds, transform=src.transform).round_offsets().round_lengths()
        b = src.read(window=win).astype("float64")
        inside = ~geometry_mask([mapping(geom)], out_shape=b.shape[1:],
                                transform=src.window_transform(win), all_touched=True)
        r = nir_ratio(b)
        valid = inside & np.isfinite(r)
        n = int(valid.sum())
        water = valid & (r < WATER_RATIO)
        cloud = valid & (b[0] >= cloud_thr) & (r < 1.15)
        med = np.median(b[:, valid], axis=1) if n else np.full(b.shape[0], np.nan)
        ndwi = [(med[g] - med[NIR]) / (med[g] + med[NIR]) for g in VISIBLE]
        wf = water.sum() / n if n else float("nan")
        cf = cloud.sum() / n if n else float("nan")
        rows.append({
            "scenario": ev["scenario"], "event": ev["event"],
            "first_seen": ev["first_seen"], "last_seen": ev["last_seen"], "max_priority": ev["max_priority"],
            "lon": round(ev["lonLat"][0], 6), "lat": round(ev["lonLat"][1], 6),
            "area_m2": round(geom.area), "n_pixels": n,
            "nir_ratio_median": round(float(np.median(r[valid])), 3) if n else "",
            "water_frac": round(float(wf), 3), "cloud_frac": round(float(cf), 3),
            "ndwi_if_green_b1": round(float(ndwi[0]), 3), "ndwi_if_green_b2": round(float(ndwi[1]), 3),
            "ndwi_if_green_b3": round(float(ndwi[2]), 3),
            "verdict": verdict(wf, cf) if n else "無資料",
            "fs8_dates": " / ".join(FS8_DATES),
        })
    return rows


def cover_polygons(src) -> dict:
    """壩址 4 km 窗格內的水與裸露地向量（衍生產品，不含影像數值）。"""
    cx, cy = TO_3826.transform(*CENTER)
    h = WINDOW_M / 2
    win = from_bounds(cx - h, cy - h, cx + h, cy + h, transform=src.transform).round_offsets().round_lengths()
    tr = src.window_transform(win)
    cls = classify(nir_ratio(src.read(window=win)))
    px_m2 = abs(tr.a * tr.e)

    water = cls == 1
    lab, n = ndimage.label(water, structure=np.ones((3, 3)))
    sizes = ndimage.sum(water, lab, range(1, n + 1))
    water = np.isin(lab, np.nonzero(sizes >= MIN_WATER_PX)[0] + 1)

    # 裸露地先做 5×5 多數決去雜點，再去掉小塊
    bare = ndimage.uniform_filter((cls == 2).astype("float32"), size=5) > 0.5
    bare &= ~water
    lab, n = ndimage.label(bare)
    sizes = ndimage.sum(bare, lab, range(1, n + 1)) * px_m2 / 1e4
    bare = np.isin(lab, np.nonzero(sizes >= MIN_BARE_HA)[0] + 1)

    feats = []
    for name, mask, tol in (("水", water, 1.0), ("裸露地", bare, 4.0)):
        geoms = [shape(g) for g, v in shapes(mask.astype("uint8"), mask=mask, transform=tr) if v == 1]
        merged = unary_union(geoms).simplify(tol, preserve_topology=True)
        area_ha = merged.area / 1e4
        wgs = shapely.transform(merged, lambda x, y: TO_4326.transform(x, y), interleaved=False)
        feats.append({"type": "Feature",
                      "properties": {"class": name, "area_ha": round(area_ha, 2),
                                     "source": "福衛八號 2026-03-31／04-15 拼接影像衍生（scripts/fs8_validate.py）",
                                     "rule": f"近紅外線 ÷ 最亮可見光 < {WATER_RATIO} 為水；{WATER_RATIO}～{VEG_RATIO} 為裸露地"},
                      "geometry": json.loads(json.dumps(mapping(wgs), default=float))})
    return {"type": "FeatureCollection", "features": feats}


def _round_coords(obj, nd=6):
    if isinstance(obj, float):
        return round(obj, nd)
    if isinstance(obj, (list, tuple)):
        return [_round_coords(o, nd) for o in obj]
    if isinstance(obj, dict):
        return {k: _round_coords(v, nd) for k, v in obj.items()}
    return obj


def main() -> int:
    if not FS8.exists():
        print(f"找不到 {FS8}（福衛八號原始檔不進版控，向隊內取得後放到這裡）", file=sys.stderr)
        return 1
    with rasterio.open(FS8) as src:
        sample = src.read(1, out_shape=(src.height // 6, src.width // 6))
        cloud_thr = float(np.percentile(sample[sample > 0], CLOUD_PCTL))
        rows = check_events(src, cloud_thr)
        cover = cover_polygons(src)

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    OUT_COVER.write_text(json.dumps(_round_coords(cover), ensure_ascii=False), encoding="utf-8")

    print(f"{'情境':<18}{'事件':<5}{'首見':<12}{'末見':<12}{'最高':<8}{'像元':>6}{'r 中位':>8}{'水':>7}{'雲':>7}  判定")
    for r in rows:
        print(f"{r['scenario']:<18}{r['event']:<5}{r['first_seen']:<12}{r['last_seen']:<12}{r['max_priority']:<8}"
              f"{r['n_pixels']:>6}{r['nir_ratio_median']:>8}{r['water_frac']:>7.0%}{r['cloud_frac']:>7.0%}  {r['verdict']}")
    for ft in cover["features"]:
        print(f"窗格內{ft['properties']['class']}：{ft['properties']['area_ha']} 公頃")
    print(f"→ {OUT_CSV.relative_to(REPO)}、{OUT_COVER.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
