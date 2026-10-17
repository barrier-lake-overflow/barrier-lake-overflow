#!/usr/bin/env python3
"""
用航照畫出馬太鞍溪真實湖面，檢驗 SAR 偵測結果（面積、重疊度、誤報位置是不是水）。

在 code/ 底下執行，需要先跑 scripts/prepare_aerial.py：

    python scripts/aerial_lake_check.py

湖面怎麼畫（規則先寫死，不看 SAR 結果調整）：
- 水：prepare_aerial.py 逐張原始檔判斷（NDVI < −0.15 且 NDWI > 0.2），同一天只要有一張判為水就算水。
  同一個位置在某張照片上可能剛好是水面反光或雲，換個角度拍的照片卻看得清楚，所以取聯集。
- 小於 50 m² 的零碎水塊不算。
- 湖：壩址 1 km 內最大的一塊連通水體。湖碰到航照沒拍到的地方或窗格邊界時，面積只是下限。
- 只看形成（2025-07-21）之後的日期；3/27 事件前航照的近紅外線數值分不出植被與水，不拿來判斷。

比對：
- 航照 7/27 ↔ SAR 7/28（7/29 05:51 台灣）；航照 8/16、8/18 ↔ SAR 8/21、8/27。
- SAR 範圍用 data/derived/final_*.json 候選的 polygonLonLat（已簡化的外框）。
- 重疊度 IoU、SAR 抓到真實湖面的比例（recall）、SAR 範圍裡真的是湖的比例（precision）。
- 誤報：各候選範圍內，航照判為水的比例。

產出（data/derived/ 不進版控，docs/evidence/ 為對照圖）：
    data/derived/aerial_validation.json
    data/derived/aerial_lake_<YYYYMMDD>.geojson
    docs/evidence/aerial_lake_<YYYYMMDD>.png

航照：農業部林業及自然保育署航測及遙測分署 提供。
"""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image, ImageDraw
from pyproj import Transformer
from rasterio import features
from scipy import ndimage

REPO = Path(__file__).resolve().parents[2]
AERIAL = REPO / "data" / "raw" / "aerial"
DERIVED = REPO / "data" / "derived"
EVIDENCE = REPO / "docs" / "evidence"
ATTRIBUTION = "農業部林業及自然保育署航測及遙測分署 提供"
DAM_LONLAT = (121.29752, 23.70061)
LAKE_SEARCH_M = 1000.0
MIN_PIECE_PX = 50            # 1 m 格網，小於 50 m² 的水塊不算
PREVIEW_SCALE = 4
TO_TWD97 = Transformer.from_crs("EPSG:4326", "EPSG:3826", always_xy=True)
TO_WGS84 = Transformer.from_crs("EPSG:3826", "EPSG:4326", always_xy=True)

FORMED = "20250721"           # 堰塞湖形成日；之前的航照不判斷

# 航照日期 → 要比對的 SAR 結果檔（data/derived/final_<key>.json）
PAIRS = {"20250727": ["0722", "0728"], "20250816": ["0821", "0827"], "20250818": ["0821", "0827"]}


def load(key: str) -> tuple:
    with rasterio.open(AERIAL / f"aerial_matai_an_{key}_1m.tif") as s:
        return s.read().astype(np.float32), s.transform


def water_mask(a: np.ndarray) -> tuple:
    """回傳 (水遮罩, 有資料遮罩)。第 6 波段是拍到的張數，第 7 波段是判為水的張數。"""
    valid = a[5] > 0
    water = a[6] > 0
    lab, k = ndimage.label(water)
    sizes = ndimage.sum(water, lab, range(1, k + 1))
    keep = np.zeros(k + 1, bool)
    keep[1:] = sizes >= MIN_PIECE_PX
    return keep[lab], valid


def lake_component(water: np.ndarray, valid: np.ndarray, transform) -> tuple:
    """壩址 LAKE_SEARCH_M 內最大的連通水體；回傳 (湖遮罩, 是否碰到無資料或窗格邊界)。"""
    lab, _ = ndimage.label(water)
    x, y = TO_TWD97.transform(*DAM_LONLAT)
    col, row = ~transform * (x, y)
    rr, cc = np.ogrid[:water.shape[0], :water.shape[1]]
    near = (rr - row) ** 2 + (cc - col) ** 2 <= (LAKE_SEARCH_M / transform.a) ** 2
    ids, counts = np.unique(lab[near & water], return_counts=True)
    if ids.size == 0:
        return np.zeros_like(water), False
    best = max(ids, key=lambda i: (lab == i).sum())
    lake = lab == best
    ring = ndimage.binary_dilation(lake) & ~lake
    edge = np.zeros_like(lake)
    edge[0, :] = edge[-1, :] = edge[:, 0] = edge[:, -1] = True
    truncated = bool((ring & ~valid).any() or (lake & edge).any())
    return lake, truncated


def rasterize_polygon(lonlat: list, transform, shape) -> np.ndarray:
    xy = [TO_TWD97.transform(lon, lat) for lon, lat in lonlat]
    return features.rasterize([({"type": "Polygon", "coordinates": [xy]}, 1)],
                              out_shape=shape, transform=transform, fill=0, dtype="uint8").astype(bool)


def lake_geojson(lake: np.ndarray, transform, key: str, meta: dict) -> dict:
    feats = []
    for geom, v in features.shapes(lake.astype("uint8"), mask=lake, transform=transform):
        rings = [[list(map(lambda c: round(c, 6), TO_WGS84.transform(x, y))) for x, y in ring]
                 for ring in geom["coordinates"]]
        feats.append({"type": "Feature", "geometry": {"type": "Polygon", "coordinates": rings},
                      "properties": {}})
    return {"type": "FeatureCollection", "name": f"aerial_lake_{key}",
            "properties": {**meta, "attribution": ATTRIBUTION}, "features": feats}


def stretch_rgb(a: np.ndarray) -> np.ndarray:
    """真色，各原始檔分開拉伸。"""
    rgb = np.zeros(a.shape[1:] + (3,), dtype=np.uint8)
    for k in np.unique(a[4][a[4] > 0]):
        part = a[4] == k
        for b in range(3):
            lo, hi = np.percentile(a[b][part], [2, 98])
            rgb[..., b][part] = (np.clip((a[b][part] - lo) / (hi - lo + 1e-9), 0, 1) * 255).astype(np.uint8)
    return rgb


def outline(mask: np.ndarray) -> np.ndarray:
    return mask & ~ndimage.binary_erosion(mask, iterations=3)


def figure(a, lake, sar_polys: list, title: str, path: Path) -> None:
    """真色航照＋航照湖面（青）＋SAR 候選（A 級綠、其他橘），縮成 4 m。"""
    rgb = stretch_rgb(a)
    rgb[outline(lake)] = (0, 230, 255)
    for grade, m in sar_polys:
        rgb[outline(m)] = (60, 220, 60) if grade == "A" else (255, 150, 0)
    img = Image.fromarray(rgb)
    img = img.resize((img.width // PREVIEW_SCALE, img.height // PREVIEW_SCALE), Image.Resampling.BOX)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, img.width, 34], fill=(0, 0, 0))
    d.text((6, 4), title, fill=(255, 255, 255))
    d.text((6, 19), "cyan=aerial lake  green=SAR A  orange=SAR B   "
           "Aerial photo: Aerial Survey and Remote Sensing Branch, Forestry and Nature Conservation Agency",
           fill=(200, 200, 200))
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def main() -> None:
    manifest = json.loads((AERIAL / "manifest.json").read_text(encoding="utf-8"))
    results = {"attribution": ATTRIBUTION, "method": {
        "water": "逐張原始檔 NDVI < -0.15 且 NDWI > 0.2，同一天任一張判為水即算水",
        "lake": f"壩址 {LAKE_SEARCH_M:g} m 內最大連通水體", "minPieceM2": MIN_PIECE_PX,
        "clouds": "未自動判斷；所有拍到的照片都被雲或反光遮住的湖面算非水"}, "dates": {}}

    for key in sorted(manifest["dates"]):
        if key < FORMED:
            continue
        a, tr = load(key)
        water, valid = water_mask(a)
        lake, truncated = lake_component(water, valid, tr)
        px = tr.a * -tr.e
        row = {"shotDate": date(int(key[:4]), int(key[4:6]), int(key[6:])).isoformat(),
               "available": manifest["dates"][key]["available"],
               "coverage": manifest["dates"][key]["coverage"],
               "lakeHectare": round(lake.sum() * px / 1e4, 2), "lakeTruncated": truncated,
               "comparisons": []}
        sar_polys = []
        for sar_key in PAIRS.get(key, []):
            sar = json.loads((DERIVED / f"final_{sar_key}.json").read_text(encoding="utf-8"))
            for c in sar["candidates"]:
                m = rasterize_polygon(c["polygonLonLat"], tr, lake.shape)
                inside_photo = (m & valid).sum() / max(m.sum(), 1)
                cmp = {"sar": sar_key, "sarDate": sar["post"]["date"], "candidate": c["id"],
                       "grade": c["grade"], "persistent": c.get("persistent"),
                       "sarHectare": c["areaHectare"],
                       "sarPolygonHectare": round(m.sum() * px / 1e4, 2),
                       "photoCoversPct": round(inside_photo * 100, 1),
                       "waterInSarPct": round((m & water).sum() / max((m & valid).sum(), 1) * 100, 1)}
                if lake.any() and (m & lake).any():
                    inter, union = (m & lake).sum(), (m | lake).sum()
                    cmp.update({"iou": round(inter / union, 2),
                                "sarCatchesLakePct": round(inter / lake.sum() * 100, 1),
                                "sarIsLakePct": round(inter / m.sum() * 100, 1)})
                row["comparisons"].append(cmp)
                if sar_key == PAIRS[key][0] or c["grade"] == "A":
                    sar_polys.append((c["grade"], m))
        results["dates"][key] = row
        print(f"[{key}] 湖 {row['lakeHectare']} ha" + ("（碰到邊界，下限）" if truncated else ""))
        for cmp in row["comparisons"]:
            print(f"    SAR {cmp['sar']} {cmp['candidate']}({cmp['grade']}) {cmp['sarHectare']} ha："
                  f"範圍內水 {cmp['waterInSarPct']}%，IoU {cmp.get('iou', '—')}，"
                  f"抓到湖 {cmp.get('sarCatchesLakePct', '—')}%")
        if lake.any():
            meta = {k: row[k] for k in ("shotDate", "lakeHectare", "lakeTruncated")}
            (DERIVED / f"aerial_lake_{key}.geojson").write_text(
                json.dumps(lake_geojson(lake, tr, key, meta), ensure_ascii=False), encoding="utf-8")
        figure(a, lake, sar_polys, f"aerial {row['shotDate']}  lake {row['lakeHectare']} ha",
               EVIDENCE / f"aerial_lake_{key}.png")

    (DERIVED / "aerial_validation.json").write_text(json.dumps(results, ensure_ascii=False, indent=1),
                                                    encoding="utf-8")


if __name__ == "__main__":
    main()
