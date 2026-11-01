#!/usr/bin/env python3
"""
DEM D8 河網 vs 國土測繪中心官方水系：系統推算的河道準不準，以及每個 SAR 候選離官方河道多遠。

    cd code
    python scripts/river_compare.py

需要：
    data/raw/sentinel1/NASADEM_neg2026_matai_an.tif  （SAR 偵測用的同一張 DEM，有進版控）
    data/cache/nlsc_water_mataian.gpkg               （scripts/fetch_nlsc_water.py 產生，不進版控）
    code/dashboard/data/events.js                    （SAR 候選位置）

輸出：
    docs/results/river_compare.json                  兩個重疊比例（全部圖徵、事件前圖徵各一組）
    docs/results/river_distance.csv                  每個候選到最近官方河道中線與 D8 河道的距離
    docs/evidence/river_compare_matai_an.png         兩套河網疊合圖，標出對不上的河段

D8 河網與偵測時完全相同：NASADEM 重採樣到約 10 m、priority-flood 填窪、集水面積 ≥ 1 km²
（pipeline.detect.barrier_lake.river_mask 預設值）。
容許距離 60 m＝NASADEM 原生解析度 30 m 的 2 倍，跑之前訂好。
官方水系的 MDATE 從 2011 到 2026 都有，WFS 只給現行版。「事件前」只取 MDATE ≤ 202506
（馬太鞍溪堰塞湖 2025-07-21 形成，202507 分不出是事件前或後，保守排除）。
距離只用於說明，不加進排序。
"""

from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

import numpy as np
import shapely
from pyproj import Transformer
from scipy.spatial import cKDTree

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
sys.path.insert(0, str(CODE))

from pipeline.detect.barrier_lake import river_mask  # noqa: E402
from pipeline.preprocess.sar import load_s1_geotiff  # noqa: E402

DEM = REPO / "data" / "raw" / "sentinel1" / "NASADEM_neg2026_matai_an.tif"
NLSC = REPO / "data" / "cache" / "nlsc_water_mataian.gpkg"
EVENTS_JS = CODE / "dashboard" / "data" / "events.js"
OUT_JSON = REPO / "docs" / "results" / "river_compare.json"
OUT_CSV = REPO / "docs" / "results" / "river_distance.csv"
OUT_PNG = REPO / "docs" / "evidence" / "river_compare_matai_an.png"

SCENARIOS = ("matai_an_2025", "neg2026_matai_an")
MIN_CATCHMENT_KM2 = 1.0
TOLERANCE_M = 60.0
PRE_EVENT_MDATE = 202506
SAMPLE_STEP_M = 5.0

TO_3826 = Transformer.from_crs("EPSG:4326", "EPSG:3826", always_xy=True)


def d8_cells_3826(dem: dict) -> tuple:
    """D8 河道像元中心（EPSG:3826）與整張 DEM 範圍（EPSG:3826 多邊形）。"""
    z = dem["db"].astype("float64")
    river = river_mask(np.zeros(z.shape, dtype=bool), z, dem["cell_size_xy_m"], MIN_CATCHMENT_KM2)
    a, b, c, d, e, f = dem["transform"]
    rr, cc = np.nonzero(river)
    lon = c + (cc + 0.5) * a
    lat = f + (rr + 0.5) * e
    x, y = TO_3826.transform(lon, lat)
    w, s, ea, n = dem["bounds"]
    bx, by = TO_3826.transform([w, ea, ea, w], [s, s, n, n])
    return np.column_stack([x, y]), shapely.Polygon(zip(bx, by)), river


def sample_lines(lines, step: float) -> np.ndarray:
    pts = []
    for ln in shapely.get_parts(lines):
        n = max(int(ln.length // step), 1)
        p = shapely.line_interpolate_point(ln, np.linspace(0, ln.length, n + 1))
        pts.append(shapely.get_coordinates(p))
    return np.vstack(pts) if pts else np.empty((0, 2))


def overlap(d8_xy: np.ndarray, lines) -> dict:
    """
    兩個方向的重疊比例：
      d8_within_tol      D8 河道像元中，離官方河道中線 ≤ 容許距離的比例
      official_covered   官方河道中線（每 5 m 取一點）中，離 D8 河道像元 ≤ 容許距離的比例
    """
    union = shapely.union_all(lines)
    d_d8 = shapely.distance(shapely.points(d8_xy), union)
    samples = sample_lines(union, SAMPLE_STEP_M)
    d_off, _ = cKDTree(d8_xy).query(samples)
    return {"d8_cells": int(len(d8_xy)), "official_km": round(float(shapely.length(union)) / 1000, 2),
            "d8_within_tol": round(float((d_d8 <= TOLERANCE_M).mean()), 3),
            "official_covered": round(float((d_off <= TOLERANCE_M).mean()), 3),
            "_d_off": d_off, "_samples": samples}


def load_events() -> list:
    text = EVENTS_JS.read_text(encoding="utf-8")
    out = {}
    for sc in json.loads(text[text.index("["):].rstrip().rstrip(";")):
        if sc["id"] not in SCENARIOS:
            continue
        for snap in sc["snapshots"]:
            for e in snap.get("events", []):
                out[(sc["id"], e["id"])] = e["lonLat"]
    return [(s, e, ll) for (s, e), ll in out.items()]


def plot(dem: dict, river: np.ndarray, lines, ov: dict, events: list) -> None:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib import font_manager
    have = {f.name for f in font_manager.fontManager.ttflist}
    cjk = [n for n in ("Microsoft JhengHei", "Noto Sans CJK TC", "PingFang TC", "Heiti TC") if n in have]
    matplotlib.rcParams["font.family"] = cjk[:1] + ["sans-serif"]
    matplotlib.rcParams["axes.unicode_minus"] = False

    z = dem["db"].astype("float64")
    dx, dy = dem["cell_size_xy_m"]
    gy, gx = np.gradient(z, dy, dx)
    shade = np.cos(np.arctan(np.hypot(gx, gy))) * 0.6 + 0.4 * (gx - gy) / (np.hypot(gx, gy) + 1e-6) * 0.3
    a, _, c, _, e, f = dem["transform"]
    rows, cols = z.shape
    lon_w, lon_e, lat_n, lat_s = c, c + cols * a, f, f + rows * e
    x0, y0 = TO_3826.transform(lon_w, lat_s)
    x1, y1 = TO_3826.transform(lon_e, lat_n)
    extent = (x0, x1, y0, y1)

    fig, ax = plt.subplots(figsize=(10, 10), dpi=110)
    ax.imshow(shade, cmap="gray", extent=extent, vmin=0, vmax=1)
    ax.imshow(np.ma.masked_where(~river, river), cmap="Blues", vmin=0, vmax=1.2, extent=extent,
              alpha=0.9, interpolation="nearest")
    for ln in shapely.get_parts(shapely.union_all(lines)):
        xy = shapely.get_coordinates(ln)
        ax.plot(xy[:, 0], xy[:, 1], color="#f2c200", lw=1.2)
    miss = ov["_samples"][ov["_d_off"] > TOLERANCE_M]
    ax.scatter(miss[:, 0], miss[:, 1], s=2, color="#e0201b", zorder=3)
    for s, eid, (lo, la) in events:
        x, y = TO_3826.transform(lo, la)
        ax.scatter([x], [y], s=60, facecolors="none", edgecolors="#d020d0" if s.startswith("neg") else "#ff8000",
                   linewidths=2, zorder=4)
        ax.annotate(("2026 " if s.startswith("neg") else "2025 ") + eid, (x, y), xytext=(6, 6),
                    textcoords="offset points", fontsize=9, color="white")
    ax.set_xlim(x0, x1)
    ax.set_ylim(y0, y1)
    ax.ticklabel_format(useOffset=False, style="plain")
    ax.set_xlabel("TWD97 TM2 E (m)")
    ax.set_ylabel("TWD97 TM2 N (m)")
    ax.set_title(f"藍＝DEM D8 河網（集水 ≥ {MIN_CATCHMENT_KM2:g} km²）　黃＝官方河川中線　紅＝官方河道離 D8 超過 {TOLERANCE_M:.0f} m\n"
                 f"圓圈＝SAR 候選（橘 2025、洋紅 2026）　官方水系：國土測繪中心 臺灣通用電子地圖；地形：NASADEM",
                 fontsize=10)
    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    fig.tight_layout()
    fig.savefig(OUT_PNG)


def main() -> int:
    if not NLSC.exists():
        print(f"找不到 {NLSC}，先執行 scripts/fetch_nlsc_water.py", file=sys.stderr)
        return 1
    import geopandas as gpd
    dem = load_s1_geotiff(str(DEM))
    d8_xy, dem_box, river = d8_cells_3826(dem)
    rl = gpd.read_file(NLSC, layer="river_line").to_crs("EPSG:3826")
    rl = rl[rl.intersects(dem_box)]
    clip = lambda g: shapely.intersection(np.asarray(g.geometry.values), dem_box)  # noqa: E731
    all_lines = clip(rl)
    pre_lines = clip(rl[rl["MDATE"].astype(int) <= PRE_EVENT_MDATE])

    ov_all = overlap(d8_xy, all_lines)
    ov_pre = overlap(d8_xy, pre_lines)
    summary = {
        "dem": DEM.name, "min_catchment_km2": MIN_CATCHMENT_KM2, "tolerance_m": TOLERANCE_M,
        "all_features": {k: v for k, v in ov_all.items() if not k.startswith("_")} | {"n_segments": int(len(rl))},
        "pre_event_features": {k: v for k, v in ov_pre.items() if not k.startswith("_")}
        | {"n_segments": int((rl["MDATE"].astype(int) <= PRE_EVENT_MDATE).sum()), "mdate_max": PRE_EVENT_MDATE},
        "mdate_counts": {str(k): int(v) for k, v in rl["MDATE"].astype(int).value_counts().sort_index().items()},
    }

    events = load_events()
    u_all, u_pre = shapely.union_all(all_lines), shapely.union_all(pre_lines)
    tree = cKDTree(d8_xy)
    rows = []
    for s, eid, (lo, la) in events:
        p = shapely.Point(*TO_3826.transform(lo, la))
        rows.append({"scenario": s, "event": eid, "lon": lo, "lat": la,
                     "dist_official_m": round(float(p.distance(u_all))),
                     "dist_official_pre_event_m": round(float(p.distance(u_pre))),
                     "dist_d8_m": round(float(tree.query([p.x, p.y])[0]))})

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(summary, ensure_ascii=False, indent=1), encoding="utf-8")
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    plot(dem, river, all_lines, ov_all, events)

    for name, ov in (("全部圖徵", ov_all), (f"事件前（MDATE ≤ {PRE_EVENT_MDATE}）", ov_pre)):
        print(f"{name}：D8 河道像元離官方河道 ≤ {TOLERANCE_M:.0f} m 的比例 {ov['d8_within_tol']:.0%}；"
              f"官方河道（{ov['official_km']} km）被 D8 涵蓋 {ov['official_covered']:.0%}")
    for r in rows:
        print(f"{r['scenario']:<18}{r['event']:<4} 官方河道 {r['dist_official_m']:>4} m"
              f"（事件前 {r['dist_official_pre_event_m']:>4} m）  D8 河道 {r['dist_d8_m']:>4} m")
    print(f"→ {OUT_JSON.relative_to(REPO)}、{OUT_CSV.relative_to(REPO)}、{OUT_PNG.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
