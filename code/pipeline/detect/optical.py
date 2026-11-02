#!/usr/bin/env python3
"""
光學（Sentinel-2、Landsat 8/9）新增水體偵測：SAR 之外的第二個偵測來源，全清冊回放與每日監看共用。

輸入是 GEE 已判好水的整數影像（pipeline/daily/optical_detect.py 下載，或網頁版匯出後由
scripts/split_optical_exports.py 拆檔），每景三個波段：water（晴空且判為水）、clear（晴空）、
ndvi（× 1000，沒資料為 −9999）；事件前基準多一個 count（晴空觀測數）。判水規則與每日光學判讀相同
（detect/water.py optical_water_rule：MNDWI > 0 且近紅外線 < 500），去雲：Sentinel-2 Cloud Score+ ≥ 0.65、
Landsat QA_PIXEL。

規則在看全清冊回放結果之前寫死（docs/validation.md「光學偵測來源」），與 SAR 盡量相同：

- 新增水體：事件後晴空且判為水、事件前基準不是水，而且事件前後都有晴空觀測。被雲遮的像元當「不知道」。
- 坡度 > 35° 不判水；坡度雙門檻：每塊至少 1 像元坡度 ≤ 20° 才保留（與 SAR 相同）。
- 貼河道、最小 0.5 公頃、碎塊合併：detect/barrier_lake.py classify，參數與 SAR 相同。
- 複核：下一個晴空過半的光學期，同位置新增水體 IoU ≥ 0.3 算持續。
- 崩塌（只影響證據強度 A/B/C）：事件前 NDVI ≥ 0.5、事件後 < 0.3 的晴空像元（植生消失），排除水體外擴
  2 像元、小於 10 像元的碎塊。門檻自訂、未校準。
- 4 km 窗格晴空像元未過半的景不算一期。

每一期光學在研判端各自當成一個「軌道」（ORBIT_PREFIX + 衛星 + 日期）：光學某一期沒看到（可能只是局部雲遮）
不會判成持續性中斷，SAR 期別也不拿來判光學事件消失（events/triage.py same_orbit）。
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

import numpy as np
from scipy import ndimage

from pipeline.detect.barrier_lake import EIGHT, classify, river_mask, seed_filter
from pipeline.preprocess.mask import slope_aspect
from pipeline.preprocess.raster import crop_window, mask_to_lonlat_polygon
from pipeline.preprocess.sar import cell_size_xy_m

HALF_WIDTH_KM = 2.0             # 4 km 窗格
CLEAR_FRAC = 0.5                # 窗格晴空像元過半才算一期（與 daily/optical.py CLEAR_FRAC 相同）
MAX_WATER_SLOPE_DEG = 35.0      # 與 SAR（scripts/run_sar_series.py）相同
SEED_SLOPE_DEG = 20.0
MIN_LAKE_AREA_M2 = 5000.0
SEARCH_RADIUS_M = 500.0
MIN_CATCHMENT_KM2 = 1.0
VEG_BEFORE_MIN = 0.5            # 光學崩塌：事件前 NDVI ≥ 此值（植生）
VEG_AFTER_MAX = 0.3             # 且事件後 < 此值（裸露）
LANDSLIDE_MIN_PX = 10
WATER_EDGE_BUFFER_PX = 2
BAND_ORDER = ("water", "clear", "ndvi", "count")
ORBIT_PREFIX = "光學"


def is_optical_orbit(label: Optional[str]) -> bool:
    """
    >>> is_optical_orbit("光學 Sentinel-2B 20250814"), is_optical_orbit("降軌 105"), is_optical_orbit(None)
    (True, False, False)
    """
    return bool(label) and label.startswith(ORBIT_PREFIX)


def sensor_label(name: str) -> str:
    """
    GEE 的衛星名稱 → 顯示用（與 daily/optical.py 相同）。

    >>> sensor_label("Sentinel-2B"), sensor_label("LANDSAT_9")
    ('Sentinel-2B', 'Landsat 9')
    """
    return name.replace("LANDSAT_", "Landsat ") if name.startswith("LANDSAT_") else name


def sensor_tag(name: str) -> str:
    """
    >>> sensor_tag("Sentinel-2B"), sensor_tag("LANDSAT_8"), sensor_tag("Landsat 9")
    ('S2B', 'L8', 'L9')
    """
    return sensor_label(name).replace("Sentinel-", "S").replace("Landsat ", "L")


# ── 讀檔 ──

def load_raster(path: Path) -> dict:
    """多波段 GeoTIFF → {"bands": {名稱: array}, "transform", "shape"}。檔案沒寫波段名稱時依 BAND_ORDER。"""
    import rasterio
    with rasterio.open(path) as src:
        names = [d or (BAND_ORDER[i] if src.count > 1 else "elevation") for i, d in enumerate(src.descriptions)]
        bands = {n: src.read(i + 1).astype("float64") for i, n in enumerate(names)}
        t = src.transform
        return {"bands": bands, "transform": (t.a, t.b, t.c, t.d, t.e, t.f), "shape": (src.height, src.width)}


def crop(r: dict, band: str, lon: float, lat: float, half_width_km: float = HALF_WIDTH_KM) -> tuple:
    """以 (lon, lat) 為中心裁方形視窗，回傳 (陣列, row0, col0)。"""
    return crop_window({"transform": r["transform"], "a": r["bands"][band]}, lon, lat, half_width_km, key="a")


def scene_arrays(r: dict, lon: float, lat: float) -> tuple:
    """裁好的 {"water", "clear", "ndvi"（實際值）}、row0、col0。"""
    water, row0, col0 = crop(r, "water", lon, lat)
    ndvi = crop(r, "ndvi", lon, lat)[0]
    return {"water": water, "clear": crop(r, "clear", lon, lat)[0],
            "ndvi": np.where(ndvi <= -9999, np.nan, ndvi / 1000.0)}, row0, col0


# ── 偵測 ──

def optical_landslide(pre_ndvi, post_ndvi, known, water_any) -> np.ndarray:
    """
    植生消失＝崩塌：事件前 NDVI ≥ VEG_BEFORE_MIN、事件後 < VEG_AFTER_MAX，排除水體附近與小碎塊。

    >>> pre = np.full((6, 6), 0.7); post = pre.copy(); post[1:5, 1:4] = 0.1
    >>> m = optical_landslide(pre, post, np.ones((6, 6), bool), np.zeros((6, 6), bool))
    >>> int(m.sum())
    12
    """
    with np.errstate(invalid="ignore"):
        m = known & (pre_ndvi >= VEG_BEFORE_MIN) & (post_ndvi < VEG_AFTER_MAX)
    m &= ~ndimage.binary_dilation(water_any, EIGHT, iterations=WATER_EDGE_BUFFER_PX)
    lab, n = ndimage.label(m, structure=EIGHT)
    if n:
        sizes = ndimage.sum(m, lab, range(1, n + 1))
        m = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= LANDSLIDE_MIN_PX])
    return m


def detect_period(pre: dict, post: dict, later: Optional[dict], dem: np.ndarray, cell: tuple,
                  transform: Optional[tuple] = None) -> tuple:
    """
    pre／post／later：scene_arrays 的輸出（已裁切）。回傳 (classify 的 Candidate 清單, 診斷 dict)。

    >>> n = 60; yy, xx = np.mgrid[0:n, 0:n]
    >>> dem = 1000 + 3.0 * np.abs(xx - 30) + (n - yy)            # 南北向河谷
    >>> river = (np.abs(xx - 30) <= 1).astype(float)
    >>> sc = lambda w: {"water": w, "clear": np.ones((n, n)), "ndvi": np.full((n, n), 0.7)}
    >>> lake = river.copy(); lake[20:35, 22:38] = 1                # 新增約 2 公頃
    >>> cands, diag = detect_period(sc(river), sc(lake), sc(lake), dem, (10.0, 10.0))
    >>> [(c.grade, round(c.area_hectare, 1), c.persistent) for c in cands], diag["postClearPct"]
    ([('C', 1.9, True)], 100.0)
    """
    slope = np.nan_to_num(slope_aspect(dem, cell)[0], nan=np.inf)
    flat = slope <= MAX_WATER_SLOPE_DEG
    pre_known = pre["clear"] > 0
    pre_water = (pre["water"] > 0) & pre_known

    def new_water(scene):
        return (scene["water"] > 0) & (scene["clear"] > 0) & pre_known & ~pre_water & flat

    nw = seed_filter(new_water(post), slope <= SEED_SLOPE_DEG, 1)
    later_nw = [new_water(later)] if later is not None else []   # 複核不套雙門檻（與 SAR 相同）
    known = pre_known & (post["clear"] > 0)
    water_any = pre_water | ((post["water"] > 0) & (post["clear"] > 0))
    landslide = optical_landslide(pre["ndvi"], post["ndvi"], known, water_any)
    river = river_mask(pre_water, dem, cell, MIN_CATCHMENT_KM2)
    cands = classify(nw, landslide, river, cell, dem=dem, later_new_water=later_nw, transform=transform,
                     min_area_m2=MIN_LAKE_AREA_M2, search_radius_m=SEARCH_RADIUS_M)
    px = cell[0] * cell[1] / 1e4
    diag = {
        "preKnownPct": round(100 * float(pre_known.mean()), 1),
        "postClearPct": round(100 * float((post["clear"] > 0).mean()), 1),
        "newWaterHectare": round(float(nw.sum()) * px, 2),
        "landslideHectare": round(float(landslide.sum()) * px, 2),
    }
    return cands, diag


def _reasons(cand, sensor: str, clear_pct) -> list:
    """classify 的說明是照 SAR 寫的，崩塌那句換成光學的判法。"""
    out = [f"光學 {sensor}（窗格晴空 {clear_pct}%）新增水體"]
    for r in cand.reasons:
        out.append(r.replace("（SAR 回波變化 ≥ 門檻）", "（光學：植生消失）")
                    .replace("可能位於雷達陰影／疊置區，建議光學或現地複核", "光學看不到植生消失"))
    return out


def result_files(name: str, periods: list, derived: Path) -> list:
    return [derived / f"final_opt_{name}_{s['day']}_{sensor_tag(s['sensor'])}.json" for s in periods]


def series_plan(name: str, periods: list, derived: Path, rerun: bool = False) -> list:
    """
    要（重）跑偵測的期別索引：沒有結果檔，或當時沒有複核期、現在有下一期了（與 SAR needs_run 相同）。
    每日排程據此只下載需要的影像（第 i 期與第 i+1 期）。

    >>> series_plan("x_nonexistent", [{"sensor": "Sentinel-2B", "day": "20260101"}], Path("."))
    [0]
    """
    outs = result_files(name, periods, derived)

    def needs(i):
        if rerun or not outs[i].exists():
            return True
        if i + 1 >= len(periods):
            return False
        try:
            return json.loads(outs[i].read_text(encoding="utf-8")).get("laterScenes", 0) == 0
        except (OSError, ValueError):
            return True

    return [i for i in range(len(periods)) if needs(i)]


def run_series(name: str, lon: float, lat: float, periods: list, raw_dir: Path, derived: Path,
               rerun: bool = False) -> list:
    """
    一個地點的所有光學期別逐期偵測（下一期當複核），結果寫 derived/final_opt_<name>_<日>_<衛星>.json，
    回傳情境檔的 opticalDetection.passes。

    periods：[{"sensor", "day", "timeUTC", "clearPct", "file"}]，只放晴空過半的景，依時間排序。
    影像在 raw_dir：OPT_<name>_pre.tif、NASADEM_<name>.tif、各期 file。
    結果檔已存在、且當時已有複核期（或現在仍沒有下一期）就不重跑。
    """
    pre_path, dem_path = raw_dir / f"OPT_{name}_pre.tif", raw_dir / f"NASADEM_{name}.tif"
    outs = result_files(name, periods, derived)
    todo = series_plan(name, periods, derived, rerun)
    if todo:
        if not pre_path.exists() or not dem_path.exists():
            raise FileNotFoundError(f"缺少 {pre_path.name} 或 {dem_path.name}")
        pre_r, dem_r = load_raster(pre_path), load_raster(dem_path)
        if pre_r["transform"] != dem_r["transform"] or pre_r["shape"] != dem_r["shape"]:
            raise ValueError(f"{name}：事件前基準與 DEM 網格不一致")
        pre, row0, col0 = scene_arrays(pre_r, lon, lat)
        dem = crop(dem_r, next(iter(dem_r["bands"])), lon, lat)[0]
        a, b, c, d, e, f = pre_r["transform"]
        win_t = (a, b, c + col0 * a + row0 * b, d, e, f + col0 * d + row0 * e)
        cell = cell_size_xy_m(pre_r["transform"], True, center_lat=lat)
        loaded: dict = {}

        def scene(i):
            if i not in loaded:
                r = load_raster(raw_dir / periods[i]["file"])
                if r["transform"] != pre_r["transform"] or r["shape"] != pre_r["shape"]:
                    raise ValueError(f"{periods[i]['file']} 網格與事件前基準不一致")
                loaded[i] = scene_arrays(r, lon, lat)[0]
            return loaded[i]

        derived.mkdir(parents=True, exist_ok=True)
        for i in todo:
            s = periods[i]
            has_later = i + 1 < len(periods)
            cands, diag = detect_period(pre, scene(i), scene(i + 1) if has_later else None, dem, cell, win_t)
            sensor = sensor_label(s["sensor"])
            items = []
            for cand in cands:
                item = cand.to_dict()
                item["reasons"] = _reasons(cand, sensor, s.get("clearPct"))
                if cand.centroid_xy:
                    clon, clat = cand.centroid_xy
                    item["centroidLonLat"] = [round(clon, 6), round(clat, 6)]
                    item["distanceFromDamM"] = round(_distance_m((lon, lat), (clon, clat)), 1)
                item["polygonLonLat"] = mask_to_lonlat_polygon(cand.mask, pre_r["transform"], row0, col0)
                items.append(item)
            outs[i].write_text(json.dumps({
                "source": "optical", "sensor": sensor, "clearPct": s.get("clearPct"),
                "note": "光學新增水體（pipeline/detect/optical.py）：只算晴空像元，雲遮處不計",
                "laterScenes": 1 if has_later else 0, "diagnostic": diag, "candidates": items,
            }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    passes = []
    for i, s in enumerate(periods):
        sensor = sensor_label(s["sensor"])
        passes.append({
            "file": outs[i].name,
            "time": s["timeUTC"],
            "recheckTime": periods[i + 1]["timeUTC"] if i + 1 < len(periods) else None,
            "evidenceImage": None,
            "source": "optical",
            "sensor": sensor,
            "clearPct": s.get("clearPct"),
            "orbitLabel": f"{ORBIT_PREFIX} {sensor} {s['day']}",
        })
    return passes


def _distance_m(a: tuple, b: tuple) -> float:
    import math
    dlat = (b[1] - a[1]) * 111320.0
    dlon = (b[0] - a[0]) * 111320.0 * math.cos(math.radians(a[1]))
    return math.hypot(dlat, dlon)
