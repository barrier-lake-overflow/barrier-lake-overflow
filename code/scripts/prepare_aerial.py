#!/usr/bin/env python3
"""
航照裁切與拼接：把航遙分署提供的馬太鞍溪航照（每張約 4 GB、約 15 cm）整理成
壩址周圍 4 km 窗格、1 m 解析度的逐日拼接圖，給湖面範圍驗證（見 docs/pending-discussion.md）用。

在 code/ 底下執行（需要 numpy、rasterio、Pillow）：

    python scripts/prepare_aerial.py --src "D:/6.黑客松競賽-程式這樣寫對不隊/光學影像"
    python scripts/prepare_aerial.py --src <資料夾> --dates 20250806      # 只做某幾天
    python scripts/prepare_aerial.py --src <資料夾> --force               # 已有的也重做

原始航照不複製進專案。產出（data/raw/ 底下，不進版控）：

    data/raw/aerial/aerial_<name>_<YYYYMMDD>_1m.tif   8 波段（uint16，0 為無資料）：
        1～4 紅、綠、藍、近紅外線（拼接，原始數值）
        5    像元來自第幾張原始檔（1 起算，對應 SOURCES 標籤）
        6    幾張原始檔拍到這個像元
        7    其中幾張判為水
        8    其中幾張判為裸露地
        9    其中幾張判為植被
    data/raw/aerial/preview/aerial_<name>_<YYYYMMDD>.jpg   真色預覽（4 m）
    data/raw/aerial/manifest.json                    各日期用了哪些原始檔、覆蓋率、取得時間

- 範圍：情境中心為中心的正方形，邊長 windowKm，TWD97 TM2（EPSG:3826）正北朝上。
- 拼接：同一天多張時，離窗格中心近的原始檔優先，只填還空著的像元。
- 數值尺度不只各日期不同，同一天的原始檔之間也可能不同（7/27 有的約 500、有的約 30,000），
  所以不改數值，另存第 5 波段記錄來源，預覽逐張原始檔分開拉伸。
- 水與裸露地逐張原始檔判斷再合併（第 6～9 波段）：同一個位置在某張照片上可能剛好是水面反光或雲，
  其他角度的照片卻看得清楚，所以「有一張判為水」就有意義；不能只看拼接後留下的那一張。
- 判斷規則（固定門檻，逐張原始檔套用）：
    水     NDVI < −0.15 且 NDWI > 0.2（水的近紅外線比紅光還低，其他地表沒有這個特性）
    裸露地 −0.15 ≤ NDVI < 0.2 且不是水
    植被   NDVI ≥ 0.3
  門檻由 7/27、8/18、3/27 幾處已知地物（森林、崩塌地、湖面）的實測值選定：湖 NDVI −0.22～−0.38、
  NDWI 0.37～0.56；崩塌地 NDVI −0.06～+0.02，但 NDWI 可到 0.21（所以不能只看 NDWI）；森林 NDVI 0.6～0.8。
  選門檻時沒有看 SAR 結果。原始檔邊緣 3 m 內不用，避免重投影時與無資料混在一起的亮邊。
- 取得時間：實際提供給值班人員的時間不明，保守取拍攝日隔天 23:59（台灣時間）。

出處：農業部林業及自然保育署航測及遙測分署 提供。使用這批航照產生的任何圖、範圍都要註明。
"""

from __future__ import annotations

import argparse
import json
import re
import time
from datetime import date, timedelta
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image
from pyproj import Transformer
from rasterio.enums import Resampling
from rasterio.transform import from_origin
from rasterio.vrt import WarpedVRT
from scipy import ndimage

REPO = Path(__file__).resolve().parents[2]
OUT = REPO / "data" / "raw" / "aerial"
SCENARIO = REPO / "data" / "raw" / "scenarios" / "matai_an_2025.json"
CRS = "EPSG:3826"
ATTRIBUTION = "農業部林業及自然保育署航測及遙測分署 提供"
BANDS = ("red", "green", "blue", "nir", "frame", "seen", "water_votes", "bare_votes", "veg_votes")
WATER_NDVI_MAX = -0.15
WATER_NDWI_MIN = 0.2
BARE_NDVI_MAX = 0.2
VEG_NDVI_MIN = 0.3
EDGE_PX = 3
RES_M = 1.0
PREVIEW_RES_M = 4.0

DATE_RE = re.compile(r"(?:^|_)(\d{6})[a-z]_")


def shot_date(filename: str) -> date:
    """
    從檔名取出拍攝日期（YYMMDD 後面接一個字母）。

    >>> shot_date("250727o_52~6039_hr4.tif"), shot_date("96202012_250327g_52~3969_hr4.tif")
    (datetime.date(2025, 7, 27), datetime.date(2025, 3, 27))
    """
    m = DATE_RE.search(filename)
    if not m:
        raise ValueError(f"檔名看不出日期：{filename}")
    s = m.group(1)
    return date(2000 + int(s[:2]), int(s[2:4]), int(s[4:]))


def window_grid(center_lonlat: tuple, window_km: float, res_m: float) -> tuple:
    """
    回傳 (transform, size)：以中心為中心、邊長 window_km 的正方形格網（EPSG:3826）。

    >>> tr, n = window_grid((121.29752, 23.70061), 4.0, 1.0)
    >>> n, round(tr.c), round(tr.f)
    (4000, 278340, 2623899)
    """
    x, y = Transformer.from_crs("EPSG:4326", CRS, always_xy=True).transform(*center_lonlat)
    half = window_km * 1000 / 2
    n = int(round(2 * half / res_m))
    return from_origin(x - half, y + half, res_m, res_m), n


def frame_distance(path: Path, center_xy: tuple) -> float:
    """原始檔中心到窗格中心的距離（m），拼接時近的優先。"""
    with rasterio.open(path) as s:
        cx, cy = s.transform * (s.width / 2, s.height / 2)
    return float(np.hypot(cx - center_xy[0], cy - center_xy[1]))


def classify(a: np.ndarray, valid: np.ndarray) -> tuple:
    """
    單張原始檔逐像元判斷，回傳 (水, 裸露地, 植被) 遮罩。

    >>> a = np.array([[[400]], [[900]], [[850]], [[200]]])     # 湖：近紅外線比紅光低
    >>> [bool(m[0, 0]) for m in classify(a, np.ones((1, 1), bool))]
    [True, False, False]
    >>> a = np.array([[[800]], [[850]], [[780]], [[790]]])     # 崩塌裸地
    >>> [bool(m[0, 0]) for m in classify(a, np.ones((1, 1), bool))]
    [False, True, False]
    """
    r, g, nir = (a[i].astype(np.float32) for i in (0, 1, 3))
    ndwi = (g - nir) / (g + nir + 1e-6)
    ndvi = (nir - r) / (nir + r + 1e-6)
    water = valid & (ndvi < WATER_NDVI_MAX) & (ndwi > WATER_NDWI_MIN)
    bare = valid & ~water & (ndvi >= WATER_NDVI_MAX) & (ndvi < BARE_NDVI_MAX)
    veg = valid & (ndvi >= VEG_NDVI_MIN)
    return water, bare, veg


def mosaic(paths: list, transform, n: int) -> tuple:
    """
    依序把各原始檔重投影到格網上：拼接只填還空著的像元；水與裸露逐張判斷後累加票數。
    回傳 (9 波段陣列, 實際用到的檔名)。
    """
    out = np.zeros((len(BANDS), n, n), dtype=np.uint16)
    used = []
    for p in paths:
        with rasterio.open(p) as src, WarpedVRT(src, crs=CRS, transform=transform, width=n, height=n,
                                                src_nodata=0, nodata=0,
                                                resampling=Resampling.average) as vrt:
            a = vrt.read()
        valid = ndimage.binary_erosion((a != 0).all(axis=0), iterations=EDGE_PX)
        if not valid.any():
            print(f"    {p.name}：不在窗格內")
            continue
        water, bare, veg = classify(a, valid)
        out[5] += valid
        out[6] += water
        out[7] += bare
        out[8] += veg
        fill = (out[4] == 0) & valid
        if fill.any():
            used.append(p.name)
            out[:4, fill] = a[:, fill]
            out[4, fill] = len(used)
        print(f"    {p.name}：補了 {fill.mean() * 100:.1f}% 窗格，水 {water.sum() * RES_M ** 2 / 1e4:.1f} ha")
    return out, used


def stretch(band: np.ndarray, valid: np.ndarray) -> np.ndarray:
    """2～98 百分位拉伸成 0～255。"""
    v = band[valid].astype(float)
    if v.size == 0:
        return np.zeros(band.shape, dtype=np.uint8)
    lo, hi = np.percentile(v, [2, 98])
    return (np.clip((band.astype(float) - lo) / (hi - lo + 1e-9), 0, 1) * 255).astype(np.uint8)


def write_preview(a: np.ndarray, path: Path) -> None:
    """真色預覽；各原始檔分開拉伸，避免尺度不同的檔案拼在一起時一半全黑。"""
    rgb = np.zeros(a.shape[1:] + (3,), dtype=np.uint8)
    for k in np.unique(a[4][a[4] > 0]):
        part = a[4] == k
        rgb[part] = np.dstack([stretch(a[b], part) for b in range(3)])[part]
    img = Image.fromarray(rgb)
    k = int(PREVIEW_RES_M / RES_M)
    img = img.resize((img.width // k, img.height // k), Image.Resampling.BOX)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, quality=88)


def write_tif(a: np.ndarray, transform, path: Path, sources: list, shot: date) -> None:
    profile = dict(driver="GTiff", width=a.shape[2], height=a.shape[1], count=a.shape[0], dtype="uint16",
                   crs=CRS, transform=transform, nodata=0, compress="deflate", predictor=2,
                   tiled=True, blockxsize=512, blockysize=512)
    with rasterio.open(path, "w", **profile) as dst:
        dst.write(a)
        for i, name in enumerate(BANDS, start=1):
            dst.set_band_description(i, name)
        dst.update_tags(ATTRIBUTION=ATTRIBUTION, SHOT_DATE=shot.isoformat(), SOURCES=";".join(sources))


def main() -> None:
    ap = argparse.ArgumentParser(description="航照裁切成壩址窗格並逐日拼接")
    ap.add_argument("--src", required=True, help="原始航照資料夾（*.tif ＋ *.tfw）")
    ap.add_argument("--name", default="matai_an", help="輸出檔名用的地點代號")
    ap.add_argument("--dates", default="", help="只做這幾天，逗號分隔 YYYYMMDD")
    ap.add_argument("--force", action="store_true", help="已有輸出也重做")
    args = ap.parse_args()

    sc = json.loads(SCENARIO.read_text(encoding="utf-8"))
    center, window_km = tuple(sc["center"]), sc["windowKm"]
    transform, n = window_grid(center, window_km, RES_M)
    center_xy = transform * (n / 2, n / 2)

    groups: dict = {}
    for p in sorted(Path(args.src).glob("*.tif")):
        groups.setdefault(shot_date(p.name), []).append(p)
    wanted = {d for d in args.dates.split(",") if d}

    OUT.mkdir(parents=True, exist_ok=True)
    manifest_path = OUT / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    manifest.update({"attribution": ATTRIBUTION, "crs": CRS, "resolutionM": RES_M,
                     "center": list(center), "windowKm": window_km, "bands": list(BANDS),
                     "availableRule": "拍攝日隔天 23:59（台灣時間）；實際提供時間不明，取保守值",
                     "classify": {"waterNdviMax": WATER_NDVI_MAX, "waterNdwiMin": WATER_NDWI_MIN,
                                  "bareNdviMax": BARE_NDVI_MAX, "vegNdviMin": VEG_NDVI_MIN}})
    dates = manifest.setdefault("dates", {})

    for d in sorted(groups):
        key = d.strftime("%Y%m%d")
        if wanted and key not in wanted:
            continue
        tif = OUT / f"aerial_{args.name}_{key}_1m.tif"
        if tif.exists() and not args.force:
            print(f"[{key}] 已存在，略過")
            continue
        paths = sorted(groups[d], key=lambda p: frame_distance(p, center_xy))
        print(f"[{key}] {len(paths)} 張")
        t0 = time.time()
        a, used = mosaic(paths, transform, n)
        coverage = float((a[4] > 0).mean())
        write_tif(a, transform, tif, used, d)
        write_preview(a, OUT / "preview" / f"aerial_{args.name}_{key}.jpg")
        dates[key] = {"file": tif.name, "shotDate": d.isoformat(),
                      "available": f"{(d + timedelta(days=1)).isoformat()}T23:59:00+08:00",
                      "coverage": round(coverage, 3), "sources": used,
                      "notInMosaic": [p.name for p in paths if p.name not in used]}
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"[{key}] 覆蓋 {coverage * 100:.1f}%，{time.time() - t0:.0f} 秒")


if __name__ == "__main__":
    main()
