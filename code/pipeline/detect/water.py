#!/usr/bin/env python3
"""
水體萃取：光學 NDWI 與 SAR 低背向散射

判水標準（三種資料各一條規則，全部集中在這裡，見 docs/parameters.md「判水標準」）：

| 資料 | 規則 | 用在 |
|---|---|---|
| Sentinel-1 SAR | 濾波後 σ⁰ VV < −18 dB（固定，SAR_WATER_DB_DEFAULT） | 偵測（barrier_lake.run_sar_chain） |
| Sentinel-2（有短波紅外線） | MNDWI > 0 且 B8 < 500（optical_water_rule） | 負案例 E1 查證（scripts/check_neg_e1.py） |
| 航照（只有紅綠藍＋近紅外線） | NDVI < −0.15 且 NDWI > 0.2（optical_water_rule） | 湖面驗證（scripts/prepare_aerial.py） |

- SAR 搭配 preprocess/mask.py 的遮罩，不然山區陰影坡會被當成水。颱風期間光學幾乎都被雲遮，
  常常只有 SAR 可用。Otsu 自動門檻（otsu_threshold）保留，但實測山區窗格每一期都退回 −18 dB，
  所以不再預設使用。
- NDWI = (Green − NIR) / (Green + NIR)（McFeeters 1996），water_mask() 可用固定值或 Otsu，
  目前只有已撤下的光學 NDWI 分析用到。

SAR 與光學 NDWI 都輸出 WaterExtent，共用 change_detection()：新增水體 = 事件後 ∧ ¬事件前。
Otsu 用 numpy 自己寫，不引入 scikit-image。

    python -m pipeline.detect.water
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Optional

import numpy as np


# Sentinel-2 影像讀取（真實 GeoTIFF；rasterio 延遲 import，
# 跟 assess/hypsometry.py 的 load_dem_geotiff 同款）

def load_sentinel2_bands(green_path: str, nir_path: str) -> tuple:
    """
    讀取 Sentinel-2 Green（B03）與 NIR（B08）波段（各自一個 GeoTIFF）。
    需要 rasterio（requirements.txt 目前註解掉，開工時解開該行 +
    `pip install -r requirements.txt`）。

    回傳 (green, nir, cell_size_m)。Sentinel-2 官方分發的 B03/B08 本來
    就是同解析度 10m、同網格，理論上不需要另外 resample；若尺寸不一致
    會直接丟錯，提醒先做好對齊。
    """
    try:
        import rasterio
    except ImportError as e:  # pragma: no cover
        raise ImportError(
            "讀取真實 Sentinel-2 影像需要 rasterio："
            "把 requirements.txt 裡 `# rasterio>=1.3` 這行解開後重新安裝。"
        ) from e

    with rasterio.open(green_path) as src_g, rasterio.open(nir_path) as src_n:
        green = src_g.read(1).astype("float64")
        nir = src_n.read(1).astype("float64")
        if green.shape != nir.shape:
            raise ValueError(
                f"Green/NIR 尺寸不一致：{green.shape} vs {nir.shape}，"
                "需先做好共同網格對齊（resample）。"
            )
        if src_g.nodata is not None:
            green[green == src_g.nodata] = np.nan
        if src_n.nodata is not None:
            nir[nir == src_n.nodata] = np.nan
        cell_size = abs(src_g.transform.a)
        return green, nir, cell_size


def load_ndwi_geotiff(path: str) -> dict:
    """
    讀取**已經算好 NDWI** 的單波段 GeoTIFF（例如從 Google Earth Engine
    直接匯出 `normalizedDifference` 的結果），跟 `load_sentinel2_bands()`
    不同——這裡不用再呼叫 `ndwi()` 重算一次，直接可以送進
    `water_mask()` / `extract_water()`（threshold 已知時）。

    回傳 dict：`{"ndwi": array, "cell_size_m": float, "transform": affine
    六元組, "crs": str, "bounds": (west, south, east, north)}`，
    transform/bounds 是為了跟其他來源的 raster（例如另一期 NDWI）做
    地理對齊檢查用。
    """
    try:
        import rasterio
    except ImportError as e:  # pragma: no cover
        raise ImportError(
            "讀取 NDWI GeoTIFF 需要 rasterio："
            "把 requirements.txt 裡 `# rasterio>=1.3` 這行解開後重新安裝。"
        ) from e

    with rasterio.open(path) as src:
        arr = src.read(1).astype("float64")
        if src.nodata is not None:
            arr = np.where(arr == src.nodata, np.nan, arr)
        t = src.transform
        return {
            "ndwi": arr,
            "cell_size_m": abs(t.a),
            "transform": (t.a, t.b, t.c, t.d, t.e, t.f),
            "crs": str(src.crs) if src.crs else None,
            "bounds": (src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top),
        }


# NDWI 計算

def ndwi(green: np.ndarray, nir: np.ndarray) -> np.ndarray:
    """
    NDWI = (Green − NIR) / (Green + NIR)。分母為 0（含兩者皆 nodata）的
    像元回傳 nan，不當成水體也不當成陸地。

    >>> green = np.array([0.30, 0.10])
    >>> nir = np.array([0.05, 0.35])
    >>> vals = ndwi(green, nir)
    >>> round(float(vals[0]), 4), round(float(vals[1]), 4)
    (0.7143, -0.5556)
    """
    green = np.asarray(green, dtype="float64")
    nir = np.asarray(nir, dtype="float64")
    denom = green + nir
    with np.errstate(invalid="ignore", divide="ignore"):
        result = np.where(denom == 0, np.nan, (green - nir) / denom)
    return result


# 門檻二值化（Otsu 自動門檻，numpy 自實作）

def otsu_threshold(values: np.ndarray, bins: int = 256) -> float:
    """
    Otsu 演算法：在直方圖上找一個門檻，使門檻兩側（前景／背景）的
    類間變異數（between-class variance）最大。忽略 nan。

    >>> rng = np.random.default_rng(0)
    >>> land = rng.normal(-0.5, 0.05, 500)   # 陸地群聚
    >>> water = rng.normal(0.6, 0.05, 500)   # 水體群聚
    >>> t = otsu_threshold(np.concatenate([land, water]))
    >>> -0.5 < t < 0.6
    True
    """
    v = np.asarray(values, dtype="float64")
    v = v[~np.isnan(v)]
    if v.size == 0:
        raise ValueError("values 全是 nan，無法計算門檻")
    if v.min() == v.max():
        return float(v.min())

    hist, edges = np.histogram(v, bins=bins)
    hist = hist.astype("float64")
    centers = (edges[:-1] + edges[1:]) / 2.0

    total = hist.sum()
    sum_all = (hist * centers).sum()

    weight_bg = np.cumsum(hist)
    sum_bg = np.cumsum(hist * centers)
    weight_fg = total - weight_bg

    with np.errstate(invalid="ignore", divide="ignore"):
        mean_bg = sum_bg / weight_bg
        mean_fg = (sum_all - sum_bg) / weight_fg
        between_var = weight_bg * weight_fg * (mean_bg - mean_fg) ** 2

    between_var = np.nan_to_num(between_var, nan=-1.0)
    # 兩群中間有空檔時，整段的類間變異數一樣大。取平段中點，
    # argmax 會取第一個 bin，門檻會貼著低群邊緣。
    max_var = between_var.max()
    tied = np.flatnonzero(np.isclose(between_var, max_var))
    best_idx = int(round(tied.mean()))
    return float(centers[best_idx])


def water_mask(ndwi_arr: np.ndarray, threshold: Optional[float] = None) -> tuple:
    """
    回傳 (布林遮罩, 實際使用的門檻)。threshold=None 時用 otsu_threshold
    自動找；也可以傳固定值（McFeeters 慣例門檻是 0.0）。

    >>> arr = np.array([0.7, 0.6, -0.4, -0.5])
    >>> mask, t = water_mask(arr, threshold=0.0)
    >>> mask.tolist()
    [True, True, False, False]
    """
    ndwi_arr = np.asarray(ndwi_arr, dtype="float64")
    if threshold is None:
        threshold = otsu_threshold(ndwi_arr)
    mask = np.where(np.isnan(ndwi_arr), False, ndwi_arr > threshold)
    return mask, threshold


# 光學判水規則（查證與驗證用，不參與偵測）

# Sentinel-2 L2A（反射率 × 10000）：水的近紅外線幾乎完全被吸收，MNDWI（Xu 2006）明顯大於 0。
# 只看 MNDWI 會把山區陰影、暗色岩屑也算進來，所以加上近紅外線上限。
S2_WATER_MNDWI_MIN = 0.0
S2_WATER_NIR_MAX = 500.0
# 航照沒有短波紅外線，算不出 MNDWI。門檻由 7/27、8/18、3/27 已知地物實測值選定（未看 SAR 結果）：
# 湖 NDVI −0.22～−0.38、NDWI 0.37～0.56；崩塌地 NDVI −0.06～+0.02，但 NDWI 可到 0.21，
# 所以要同時看 NDVI（水的近紅外線比紅光還低，其他地表沒有這個特性）。
AERIAL_WATER_NDVI_MAX = -0.15
AERIAL_WATER_NDWI_MIN = 0.2


def optical_water_rule(green: np.ndarray, nir: np.ndarray,
                       red: Optional[np.ndarray] = None,
                       swir: Optional[np.ndarray] = None) -> np.ndarray:
    """
    光學影像逐像元判水，回傳布林遮罩。有短波紅外線（Sentinel-2 B11）用 MNDWI 規則，
    沒有（航照）用 NDVI＋NDWI 規則，兩者至少要給一個。

    - 有 swir：MNDWI = (G − SWIR)/(G + SWIR) > 0 且 NIR < 500（Sentinel-2 L2A 反射率 × 10000）
    - 只有 red：NDVI = (NIR − R)/(NIR + R) < −0.15 且 NDWI = (G − NIR)/(G + NIR) > 0.2

    >>> g, n = np.array([900.0, 850.0]), np.array([200.0, 790.0])
    >>> optical_water_rule(g, n, red=np.array([400.0, 800.0])).tolist()   # 湖、崩塌裸地
    [True, False]
    >>> optical_water_rule(np.array([700.0, 900.0]), np.array([300.0, 1500.0]),
    ...                    swir=np.array([200.0, 1600.0])).tolist()       # 水、土石
    [True, False]
    """
    g = np.asarray(green, dtype=np.float32)
    nir = np.asarray(nir, dtype=np.float32)
    if swir is not None:
        s = np.asarray(swir, dtype=np.float32)
        mndwi = (g - s) / (g + s + 1e-6)
        return (mndwi > S2_WATER_MNDWI_MIN) & (nir < S2_WATER_NIR_MAX)
    if red is None:
        raise ValueError("optical_water_rule 需要 swir（Sentinel-2）或 red（航照）其中一個")
    r = np.asarray(red, dtype=np.float32)
    ndwi = (g - nir) / (g + nir + 1e-6)
    ndvi = (nir - r) / (nir + r + 1e-6)
    return (ndvi < AERIAL_WATER_NDVI_MAX) & (ndwi > AERIAL_WATER_NDWI_MIN)


# 單期水體萃取結果（面積等），單位慣例跟 hypsometry 一致

@dataclass
class WaterExtent:
    """單一時期（一景影像）的水體萃取結果。"""
    mask: np.ndarray
    threshold: float
    method: str                    # "otsu"/"fixed"（光學）或 "sar_otsu"/"sar_fixed"/"sar_otsu_fallback"（加 VH 時尾綴 "+vh"）
    cell_size_m: float
    date: Optional[str] = None     # ISO 日期，回測用

    @property
    def area_m2(self) -> float:
        return float(self.mask.sum()) * (self.cell_size_m ** 2)

    @property
    def area_hectare(self) -> float:
        return self.area_m2 / 1e4

    def summary(self) -> dict:
        return {
            "date": self.date,
            "method": self.method,
            "threshold": round(float(self.threshold), 4),
            "pixel_count": int(self.mask.sum()),
            "area_m2": round(self.area_m2, 1),
            "area_hectare": round(self.area_hectare, 3),
        }


def extract_water(green: np.ndarray, nir: np.ndarray, cell_size_m: float,
                   threshold: Optional[float] = None,
                   date: Optional[str] = None) -> WaterExtent:
    """
    一站式：算 NDWI → 二值化 → 包成 WaterExtent。

    >>> green = np.full((4, 4), 0.10)
    >>> nir = np.full((4, 4), 0.35)
    >>> green[1:3, 1:3] = 0.30   # 中間 2x2 是水體
    >>> nir[1:3, 1:3] = 0.05
    >>> ext = extract_water(green, nir, cell_size_m=10.0, threshold=0.0)
    >>> int(ext.mask.sum())
    4
    >>> ext.area_hectare
    0.04
    """
    ndwi_arr = ndwi(green, nir)
    mask, used_threshold = water_mask(ndwi_arr, threshold=threshold)
    method = "fixed" if threshold is not None else "otsu"
    return WaterExtent(mask=mask, threshold=used_threshold, method=method,
                        cell_size_m=cell_size_m, date=date)


# SAR 半：低回波判水（σ⁰ dB）

# 正式流程的固定門檻：C 波段 VV 平靜水面多在 −20 dB 以下、植生山坡
# 約 −12～−6 dB，文獻常用 −18 dB 左右（例：Twele et al. 2016 以此為
# 初值再做局部 Otsu）。偵測流程（run_sar_chain、analyze_sar_change.py）預設用這個值。
SAR_WATER_DB_DEFAULT = -18.0
# Otsu 門檻若高於此值，代表它切到的是「陸地內部兩群」（例如草地 vs
# 森林）而不是水陸分界——畫面內水體太少時常見，此時退回固定門檻。
SAR_OTSU_MAX_DB = -14.0
# B2 實驗（VH 輔助，預設關閉）：VV 介於 −18 與 −15 dB 之間「差一點」的像元，VH 也很低才補判為水。
# 湖面被風吹皺或混濁時 VV 會偏高，VH 對水面粗糙度的反應不同。VH 門檻在實驗前從文獻選定、不調：
# Manjusree et al. 2012 對交叉極化（HV/VH）建議的水體範圍約 −15～−24 dB，取最嚴格的 −24 dB，
# 只補判有把握的像元。VH 無法分辨水與雷達陰影（陰影兩種極化都低），陰影仍靠遮罩處理。
SAR_VV_MARGINAL_DB = -15.0
SAR_VH_WATER_DB = -24.0


def sar_water_mask(vv_db: np.ndarray, threshold: Optional[float] = None,
                   invalid_mask: Optional[np.ndarray] = None,
                   vh_db: Optional[np.ndarray] = None,
                   vh_threshold: float = SAR_VH_WATER_DB,
                   vv_marginal_db: float = SAR_VV_MARGINAL_DB) -> tuple:
    """
    低回波判水：σ⁰ < 門檻 即為水體。回傳 (遮罩, 門檻, method)。

    - threshold=None：只拿有效像元（非 nan、非 invalid_mask）跑 Otsu；
      結果高於 SAR_OTSU_MAX_DB 時退回 SAR_WATER_DB_DEFAULT，
      method="sar_otsu_fallback"。
    - invalid_mask（陰影／疊置／陡坡）內的像元一律 False。
    - vh_db（B2 實驗）：另外把「VV < vv_marginal_db 且 VH < vh_threshold」的像元判為水，
      method 加上 "+vh"。不給 vh_db 時規則與原本相同。

    >>> vv = np.array([-20.0, -16.0, -16.0, -12.0])
    >>> vh = np.array([-28.0, -26.0, -20.0, -30.0])
    >>> sar_water_mask(vv, -18.0)[0].tolist()
    [True, False, False, False]
    >>> m, _, method = sar_water_mask(vv, -18.0, vh_db=vh)
    >>> m.tolist(), method
    ([True, True, False, False], 'sar_fixed+vh')

    >>> vv = np.array([-24.0, -22.0, -8.0, -7.0, -23.0])
    >>> shadow = np.array([False, False, False, False, True])
    >>> mask, t, m = sar_water_mask(vv, threshold=-18.0, invalid_mask=shadow)
    >>> mask.tolist(), m
    ([True, True, False, False, False], 'sar_fixed')
    """
    vv_db = np.asarray(vv_db, dtype="float64")
    invalid = np.isnan(vv_db)
    if invalid_mask is not None:
        invalid = invalid | np.asarray(invalid_mask, dtype=bool)

    if threshold is not None:
        method = "sar_fixed"
    else:
        valid_vals = vv_db[~invalid]
        if valid_vals.size == 0:
            threshold, method = SAR_WATER_DB_DEFAULT, "sar_otsu_fallback"
        else:
            threshold, method = otsu_threshold(valid_vals), "sar_otsu"
            if threshold > SAR_OTSU_MAX_DB:
                threshold, method = SAR_WATER_DB_DEFAULT, "sar_otsu_fallback"

    vv = np.nan_to_num(vv_db, nan=np.inf)
    mask = ~invalid & (vv < threshold)
    if vh_db is not None:
        vh = np.nan_to_num(np.asarray(vh_db, dtype="float64"), nan=np.inf)
        mask |= ~invalid & (vv < vv_marginal_db) & (vh < vh_threshold)
        method += "+vh"
    return mask, float(threshold), method


def extract_water_sar(vv_db: np.ndarray, cell_size_m: float,
                      threshold: Optional[float] = None,
                      invalid_mask: Optional[np.ndarray] = None,
                      date: Optional[str] = None,
                      vh_db: Optional[np.ndarray] = None) -> WaterExtent:
    """
    SAR 版一站式萃取，輸出跟光學版同一個 WaterExtent，可直接送
    change_detection()。vv_db 建議先過 preprocess.sar.lee_filter。
    vh_db（B2 實驗）見 sar_water_mask。

    >>> vv = np.full((4, 4), -8.0)
    >>> vv[1:3, 1:3] = -23.0
    >>> ext = extract_water_sar(vv, cell_size_m=10.0, threshold=-18.0)
    >>> int(ext.mask.sum()), ext.method
    (4, 'sar_fixed')
    """
    mask, used, method = sar_water_mask(vv_db, threshold=threshold, invalid_mask=invalid_mask,
                                        vh_db=vh_db)
    return WaterExtent(mask=mask, threshold=used, method=method,
                       cell_size_m=cell_size_m, date=date)


# 變化偵測：事件後新增的水體（barrier_lake.py 的輸入之一）

def change_detection(pre: WaterExtent, post: WaterExtent) -> np.ndarray:
    """
    新增水體 = 事件後水體 且 非事件前水體（排除河道等常態水體）。
    要求 pre/post 的網格尺寸一致（同一塊區域、同解析度、對齊好的影像）。

    >>> pre_mask = np.array([[True, False], [False, False]])
    >>> post_mask = np.array([[True, True], [False, True]])
    >>> pre = WaterExtent(mask=pre_mask, threshold=0.0, method="fixed", cell_size_m=10.0)
    >>> post = WaterExtent(mask=post_mask, threshold=0.0, method="fixed", cell_size_m=10.0)
    >>> change_detection(pre, post).tolist()
    [[False, True], [False, True]]
    """
    if pre.mask.shape != post.mask.shape:
        raise ValueError(
            f"pre/post 網格尺寸不一致：{pre.mask.shape} vs {post.mask.shape}，"
            "需先做好共同網格對齊。"
        )
    return post.mask & ~pre.mask


# 存檔

def save_extent_summary(extent: WaterExtent, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(extent.summary(), f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    import doctest
    fails, total = doctest.testmod()
    print(f"water: {total - fails}/{total} 通過")

    # 示範：合成一塊背景陸地、中央圓形水體的影像，模擬事件前後對比
    # （事件後水體範圍擴大，模擬堰塞湖形成）
    size = 41
    yy, xx = np.mgrid[0:size, 0:size]
    center = size // 2
    dist = np.sqrt((yy - center) ** 2 + (xx - center) ** 2)

    def make_scene(water_radius: float):
        is_water = dist <= water_radius
        green = np.where(is_water, 0.30, 0.10)
        nir = np.where(is_water, 0.05, 0.35)
        return green, nir

    pre_green, pre_nir = make_scene(water_radius=5.0)     # 事件前：既有河道
    post_green, post_nir = make_scene(water_radius=15.0)  # 事件後：堰塞湖擴大水體範圍

    pre_extent = extract_water(pre_green, pre_nir, cell_size_m=10.0, date="2025-09-20")
    post_extent = extract_water(post_green, post_nir, cell_size_m=10.0, date="2025-09-23")
    new_water = change_detection(pre_extent, post_extent)

    print(f"\n事件前水體面積：{pre_extent.area_hectare:.2f} 公頃"
          f"（{pre_extent.method} 門檻 {pre_extent.threshold:.3f}）")
    print(f"事件後水體面積：{post_extent.area_hectare:.2f} 公頃"
          f"（{post_extent.method} 門檻 {post_extent.threshold:.3f}）")
    area_new_ha = float(new_water.sum()) * 100.0 / 1e4
    print(f"新增水體：{int(new_water.sum())} 像元，約 {area_new_ha:.2f} 公頃")
