#!/usr/bin/env python3
"""
GeoTIFF 視窗與向量化的共用工具（SAR 腳本、光學偵測、證據圖共用）。

- crop_window：以經緯度為中心裁方形視窗（北向上、無旋轉的 GeoTIFF）
- mask_to_lonlat_polygon：裁切視窗內的遮罩 → 原圖座標的 (lon, lat) 外環
- merge_into_dashboard_layer：把一筆偵測範圍合併進 dashboard/data/inundation.js
"""

from __future__ import annotations

import json
import math

import numpy as np


def crop_window(data: dict, center_lon: float, center_lat: float, half_width_km: float,
                key: str = "ndwi") -> tuple:
    """
    以 (center_lon, center_lat) 為中心，裁出 half_width_km 公里半寬的方形視窗。
    回傳 (裁切後 data[key] array, row0, col0)——row0/col0 供後續換算裁切區域內
    像元座標回原圖用。key 預設 "ndwi"；scripts/analyze_sar_change.py 用 "db"。
    """
    t = data["transform"]
    a, b, c, d, e, f = t  # affine: x = a*col + c, y = e*row + f
    deg_per_km_lat = 1.0 / 111.32
    deg_per_km_lon = 1.0 / (111.32 * math.cos(math.radians(center_lat)))
    half_lat = half_width_km * deg_per_km_lat
    half_lon = half_width_km * deg_per_km_lon

    def lonlat_to_rowcol(lon, lat):
        col = (lon - c) / a
        row = (lat - f) / e
        return row, col

    r0, c0 = lonlat_to_rowcol(center_lon - half_lon, center_lat + half_lat)
    r1, c1 = lonlat_to_rowcol(center_lon + half_lon, center_lat - half_lat)
    rows, cols = data[key].shape
    row0, row1 = sorted([int(round(r0)), int(round(r1))])
    col0, col1 = sorted([int(round(c0)), int(round(c1))])
    row0, row1 = max(0, row0), min(rows, row1)
    col0, col1 = max(0, col0), min(cols, col1)
    return data[key][row0:row1, col0:col1], row0, col0


def mask_to_lonlat_polygon(mask: np.ndarray, transform: tuple, row0: int, col0: int,
                            simplify_tolerance_deg: float = 0.0003) -> list:
    """
    把裁切視窗內的遮罩轉成原圖座標系下的 (lon, lat) 多邊形外環頂點清單。

    `transform` 是原圖（未裁切）的 affine 六元組；視窗左上角在原圖的
    (row0, col0)，只要把 affine 的平移項 (c, f) 往視窗方向挪過去即可，
    不用另外處理縮放/旋轉——這幾張 GeoTIFF 都是北向上、無旋轉。
    找不到任何多邊形（遮罩全空）回傳 None。
    """
    from rasterio import features
    from rasterio.transform import Affine
    from shapely.geometry import shape
    from shapely.ops import unary_union

    if not mask.any():
        return None

    a, b, c, d, e, f = transform
    window_transform = Affine(a, b, c + col0 * a + row0 * b, d, e, f + col0 * d + row0 * e)

    polys = [shape(geom) for geom, value in
             features.shapes(mask.astype("uint8"), mask=mask, transform=window_transform)
             if value == 1]
    if not polys:
        return None
    merged = unary_union(polys)
    if merged.geom_type == "MultiPolygon":
        merged = max(merged.geoms, key=lambda g: g.area)
    simplified = merged.simplify(simplify_tolerance_deg, preserve_topology=True)
    return [list(pt) for pt in simplified.exterior.coords]


def merge_into_dashboard_layer(path: str, lake_id: str, entry: dict) -> None:
    """
    把 entry 合併進 `dashboard/data/inundation.js` 的 `window.INUNDATION_DEMO`
    物件，只覆蓋 lake_id 這一筆，保留其他湖既有的資料（例如
    `pipeline.assess.dashboard_export` 產生的合成示範資料）。
    """
    import os

    existing = {}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            text = f.read()
        start, end = text.index("{"), text.rindex("}") + 1
        existing = json.loads(text[start:end])

    existing[lake_id] = entry
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 由 pipeline.assess.dashboard_export（合成示範）與\n")
        f.write("// scripts/analyze_sar_change.py（Sentinel-1 SAR）共同維護，\n")
        f.write("// 每筆各自的 synthetic 欄位標明資料來源，請勿手動編輯\n")
        f.write(f"window.INUNDATION_DEMO = {json.dumps(existing, ensure_ascii=False, indent=2)};\n")
