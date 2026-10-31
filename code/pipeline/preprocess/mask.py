#!/usr/bin/env python3
"""
SAR 幾何失真遮罩

背向衛星的陡坡收不到回波（陰影），σ⁰ 低得像水；面向衛星的陡坡會疊置，
回波異常增強，像崩塌。用事件前 DEM 的坡度坡向配合入射角與視向標出來：

    距離向坡度 s_r（正 = 面向衛星）
    s_r >  θ        → 疊置
    s_r < θ − 90°   → 陰影

預設只看像元本身的坡面，被遠處山脊擋住的陰影抓不到。ray_traced_shadow() 沿視線往衛星方向
追蹤，補上這一類（sar_invalid_masks(ray_trace=True)，B1 實驗用，預設關閉）。兩者都用事件前 DEM，
崩塌後新陡崖的陰影一樣抓不到。
前縮（foreshortening_mask）：面向衛星、但還沒到疊置的陡坡，局部入射角很小，影像上被壓縮、偏亮，
不會被誤判成水，只做統計。
另外坡度 > max_deg 一律不當水；崩塌偵測不能套這個。

Sentinel-1 右視：視向 = 航向 + 90°。台灣升軌視向約 77°，降軌約 283°。
IW 入射角 29°–46°，取 39°。

    python -m pipeline.preprocess.mask
"""

from __future__ import annotations

import math
from typing import Union

import numpy as np
from scipy import ndimage


S1_LOOK_AZIMUTH_DEG = {"ASCENDING": 77.0, "DESCENDING": 283.0}
S1_IW_MID_INCIDENCE_DEG = 39.0
# 局部入射角（入射角 − 距離向坡度）低於此值、但還沒疊置的坡面視為前縮。自訂，只用於統計。
FORESHORTENING_LOCAL_INC_DEG = 10.0


def _cell_xy(cell_size_m: Union[float, tuple]) -> tuple:
    if isinstance(cell_size_m, (tuple, list)):
        return float(cell_size_m[0]), float(cell_size_m[1])
    return float(cell_size_m), float(cell_size_m)


def slope_aspect(dem: np.ndarray, cell_size_m: Union[float, tuple]) -> tuple:
    """
    回傳 (slope_deg, aspect_deg)。cell_size_m 可給單一值或 (dx, dy)。
    陣列列號往下＝往南、欄號往右＝往東（北向上 GeoTIFF 慣例）。
    aspect 是坡面「朝向」（下坡方向），0°=北、90°=東。

    >>> rows, cols = np.mgrid[0:5, 0:5]
    >>> dem = 100.0 - cols * 10.0            # 往東下降 10 m / 10 m → 45° 朝東坡
    >>> s, a = slope_aspect(dem, 10.0)
    >>> round(float(s[2, 2]), 1), round(float(a[2, 2]), 1)
    (45.0, 90.0)
    """
    dx, dy = _cell_xy(cell_size_m)
    dem = np.asarray(dem, dtype="float64")
    dz_drow, dz_dcol = np.gradient(dem, dy, dx)
    dz_east = dz_dcol
    dz_north = -dz_drow
    slope = np.degrees(np.arctan(np.hypot(dz_east, dz_north)))
    # 下坡方向 = −梯度
    aspect = np.degrees(np.arctan2(-dz_east, -dz_north)) % 360.0
    return slope, aspect


def range_slope_deg(slope_deg: np.ndarray, aspect_deg: np.ndarray,
                    look_azimuth_deg: float) -> np.ndarray:
    """
    距離向坡度：坡面在「朝向衛星」方向的傾角，正值 = 面向衛星。
    衛星位於視向的反方向（look_azimuth + 180°）。

    >>> round(float(range_slope_deg(np.array(30.0), np.array(257.0), 77.0)), 6)  # 正對衛星
    30.0
    >>> round(float(range_slope_deg(np.array(30.0), np.array(77.0), 77.0)), 6)  # 背對
    -30.0
    """
    toward_sensor = (look_azimuth_deg + 180.0) % 360.0
    rel = np.radians(np.asarray(aspect_deg) - toward_sensor)
    return np.degrees(np.arctan(np.tan(np.radians(slope_deg)) * np.cos(rel)))


def layover_shadow_mask(dem: np.ndarray, cell_size_m: Union[float, tuple],
                        incidence_deg: float = S1_IW_MID_INCIDENCE_DEG,
                        look_azimuth_deg: float = S1_LOOK_AZIMUTH_DEG["ASCENDING"]) -> tuple:
    """
    回傳 (layover, shadow) 兩個布林遮罩（局部坡面判定，見檔頭說明）。
    DEM 為 nan 的像元兩者皆 False（交給呼叫端另外處理 nodata）。

    >>> _, cols = np.mgrid[0:5, 0:5]
    >>> away = 100.0 - cols * 20.0     # 朝東 63° 陡坡，升軌視向朝東 → 背對衛星
    >>> lay, sh = layover_shadow_mask(away, 10.0, 39.0, 77.0)
    >>> bool(sh[2, 2]), bool(lay[2, 2])
    (True, False)
    >>> toward = 100.0 + cols * 20.0   # 朝西 63° 陡坡 → 面向衛星
    >>> lay, sh = layover_shadow_mask(toward, 10.0, 39.0, 77.0)
    >>> bool(sh[2, 2]), bool(lay[2, 2])
    (False, True)
    """
    slope, aspect = slope_aspect(dem, cell_size_m)
    s_r = range_slope_deg(slope, aspect, look_azimuth_deg)
    valid = ~np.isnan(s_r)
    layover = valid & (np.nan_to_num(s_r) > incidence_deg)
    shadow = valid & (np.nan_to_num(s_r) < incidence_deg - 90.0)
    return layover, shadow


def ray_traced_shadow(dem: np.ndarray, cell_size_m: Union[float, tuple],
                      incidence_deg: float = S1_IW_MID_INCIDENCE_DEG,
                      look_azimuth_deg: float = S1_LOOK_AZIMUTH_DEG["ASCENDING"],
                      max_distance_m: float = 3000.0) -> np.ndarray:
    """
    沿視線往衛星方向追蹤的雷達陰影：從像元 P 朝衛星走距離 d 的點 Q，若
    (z_Q − z_P) / d > cot(入射角)，Q 擋住了 P 到衛星的視線，P 在陰影中。
    背向衛星、比 90° − 入射角還陡的坡面也會被自己的上坡擋住。局部判定用有限差分，會把
    崖頂邊緣也算進陰影，所以 sar_invalid_masks 取兩者聯集，不用射線追蹤取代局部判定。

    逐步取樣（步長一個像元、雙線性內插），不旋轉 DEM。窗格邊緣外的山脊看不到，
    靠近衛星那一側的邊緣會低估。DEM 為 nan 的像元回傳 False。

    >>> dem = np.zeros((5, 12)); dem[:, :3] = 300.0      # 西側 300 m 高台，東側平地
    >>> sh = ray_traced_shadow(dem, 50.0, 39.0, 77.0)   # 升軌往東看，衛星在西側
    >>> sh[2, 3:9].tolist()          # 影長 300 m × cot 39° ≈ 243 m：距高台 205 m 內的平地被擋住
    [True, True, True, True, False, False]
    >>> layover_shadow_mask(dem, 50.0, 39.0, 77.0)[1][2, 4:7].tolist()   # 局部判定看不到
    [False, False, False]
    """
    dx, dy = _cell_xy(cell_size_m)
    z = np.asarray(dem, dtype="float64")
    valid = np.isfinite(z)
    zf = np.where(valid, z, np.nanmin(z) if valid.any() else 0.0)
    toward = math.radians((look_azimuth_deg + 180.0) % 360.0)
    step = min(dx, dy)
    dcol = step * math.sin(toward) / dx        # 往東為 +col
    drow = -step * math.cos(toward) / dy       # 往北為 −row
    cot = 1.0 / math.tan(math.radians(incidence_deg))
    rows, cols = np.mgrid[0:z.shape[0], 0:z.shape[1]].astype("float64")
    best = np.full(z.shape, -np.inf)
    for k in range(1, int(max_distance_m // step) + 1):
        r, c = rows + k * drow, cols + k * dcol
        inside = (r >= 0) & (r <= z.shape[0] - 1) & (c >= 0) & (c <= z.shape[1] - 1)
        if not inside.any():
            break
        zq = ndimage.map_coordinates(zf, [r, c], order=1, mode="nearest")
        best = np.where(inside, np.maximum(best, (zq - zf) / (k * step)), best)
    return valid & (best > cot)


def foreshortening_mask(dem: np.ndarray, cell_size_m: Union[float, tuple],
                        incidence_deg: float = S1_IW_MID_INCIDENCE_DEG,
                        look_azimuth_deg: float = S1_LOOK_AZIMUTH_DEG["ASCENDING"],
                        max_local_inc_deg: float = FORESHORTENING_LOCAL_INC_DEG) -> np.ndarray:
    """
    前縮：局部入射角 = 入射角 − 距離向坡度，介於 0 與 max_local_inc_deg 之間（再陡就是疊置）。

    >>> _, cols = np.mgrid[0:5, 0:5]
    >>> toward = 100.0 + cols * 7.0                   # 朝西 35° 坡，面向升軌衛星，局部入射角 4°
    >>> bool(foreshortening_mask(toward, 10.0, 39.0, 77.0)[2, 2])
    True
    """
    slope, aspect = slope_aspect(dem, cell_size_m)
    s_r = np.nan_to_num(range_slope_deg(slope, aspect, look_azimuth_deg), nan=-90.0)
    local = incidence_deg - s_r
    return (local >= 0.0) & (local < max_local_inc_deg)


def steep_slope_mask(slope_deg: np.ndarray, max_deg: float = 20.0) -> np.ndarray:
    """
    >>> steep_slope_mask(np.array([5.0, 25.0, np.nan])).tolist()
    [False, True, False]
    """
    slope_deg = np.asarray(slope_deg, dtype="float64")
    return np.where(np.isnan(slope_deg), False, slope_deg > max_deg)


def sar_invalid_masks(dem: np.ndarray, cell_size_m: Union[float, tuple],
                      incidence_deg: float = S1_IW_MID_INCIDENCE_DEG,
                      look_azimuth_deg: float = S1_LOOK_AZIMUTH_DEG["ASCENDING"],
                      max_water_slope_deg: float = 20.0,
                      ray_trace: bool = False) -> dict:
    """
    一次算好兩組遮罩：
    - "water"：水體萃取用 = 疊置 | 陰影 | 陡坡 | DEM nodata
    - "landslide"：崩塌偵測用 = 疊置 | 陰影 | DEM nodata（不排除陡坡）
    另附 "layover"、"shadow"、"slope_deg" 供輸出統計。

    ray_trace=True（B1 實驗）：陰影改為「局部判定 ∪ 射線追蹤」，另附 "ray_shadow"（射線追蹤
    多抓到的部分）與 "foreshortening"（只統計，不進遮罩）。預設 False，行為與原本相同。
    """
    dem = np.asarray(dem, dtype="float64")
    layover, shadow = layover_shadow_mask(dem, cell_size_m, incidence_deg, look_azimuth_deg)
    extra = {}
    if ray_trace:
        ray = ray_traced_shadow(dem, cell_size_m, incidence_deg, look_azimuth_deg)
        extra = {"ray_shadow": ray & ~shadow,
                 "foreshortening": foreshortening_mask(dem, cell_size_m, incidence_deg, look_azimuth_deg)}
        shadow = shadow | ray
    slope, _ = slope_aspect(dem, cell_size_m)
    nodata = np.isnan(dem)
    geom = layover | shadow | nodata
    return {
        "water": geom | steep_slope_mask(slope, max_water_slope_deg),
        "landslide": geom,
        "layover": layover,
        "shadow": shadow,
        "slope_deg": slope,
        **extra,
    }


if __name__ == "__main__":
    import doctest
    fails, total = doctest.testmod()
    print(f"mask: {total - fails}/{total} 通過")
