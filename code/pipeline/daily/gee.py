#!/usr/bin/env python3
"""
Google Earth Engine 共用：登入、下載、Sentinel-1 查詢、GSMaP 雨量。

登入兩種方式：
- 本機：先跑一次 earthengine authenticate，之後用 --project 指定 GCP 專案。
- 排程／CI：環境變數 GEE_SERVICE_ACCOUNT_KEY 放服務帳號金鑰 JSON 全文，
  GEE_PROJECT 放專案 ID（見 docs/daily.md）。
"""

from __future__ import annotations

import json
import os
import time
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

BUFFER_M = 5000   # 與 gee_export_series_s1.js 相同：中心外推 5 km 的方框
GSMAP = "JAXA/GPM_L3/GSMaP/v8/operational"
GSMAP_BAND = "hourlyPrecipRateGC"   # 經雨量計校正；未校正版在台灣山區低估明顯（馬太鞍溪形成前 72h：93 vs 249 mm）
GSMAP_LABEL = "GSMaP v8 雨量計校正（衛星估計，非測站）"

_ee = None


def init(project: Optional[str] = None):
    """登入並回傳 ee 模組。"""
    global _ee
    if _ee is not None:
        return _ee
    import ee
    key = os.environ.get("GEE_SERVICE_ACCOUNT_KEY", "").strip()
    project = project or os.environ.get("GEE_PROJECT", "").strip() or None
    if key:
        info = json.loads(key)
        creds = ee.ServiceAccountCredentials(info["client_email"], key_data=key)
        ee.Initialize(creds, project=project or info.get("project_id"))
    else:
        ee.Initialize(project=project)
    _ee = ee
    return ee


def aoi(ee, lon: float, lat: float):
    return ee.Geometry.Point([lon, lat]).buffer(BUFFER_M).bounds()


def download(img, region, path: Path, tries: int = 3) -> None:
    """下載成 GeoTIFF（10 m、EPSG:4326，與 GEE 匯出腳本相同）；已存在就略過。"""
    if path.exists() and path.stat().st_size > 0:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    url = img.toFloat().getDownloadURL(
        {"region": region, "scale": 10, "crs": "EPSG:4326", "format": "GEO_TIFF"})
    for k in range(tries):
        try:
            tmp = path.with_suffix(".part")
            with urllib.request.urlopen(url, timeout=300) as r, open(tmp, "wb") as f:
                f.write(r.read())
            tmp.replace(path)
            return
        except Exception as e:   # 網路或 GEE 暫時性錯誤，稍等重試
            if k == tries - 1:
                raise
            print(f"    重試（{e}）")
            time.sleep(5 * (k + 1))


def s1_collection(ee, region):
    return (ee.ImageCollection("COPERNICUS/S1_GRD")
            .filterBounds(region)
            .filter(ee.Filter.eq("instrumentMode", "IW"))
            .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV")))


def s1_images(ee, region, start: str, end: str) -> list:
    """[(pass, relativeOrbit, epoch_ms)]，與 replay.choose_orbit 的輸入相同。"""
    return s1_collection(ee, region).filterDate(start, end).reduceColumns(
        ee.Reducer.toList(3), ["orbitProperties_pass", "relativeOrbitNumber_start", "system:time_start"]
    ).get("list").getInfo()


def s1_orbit(ee, region, orbit_pass: str, orbit: int):
    return (s1_collection(ee, region)
            .filter(ee.Filter.eq("orbitProperties_pass", orbit_pass))
            .filter(ee.Filter.eq("relativeOrbitNumber_start", orbit))
            .select("VV"))


def download_scene(ee, region, orbit_pass: str, orbit: int, day: str, path: Path) -> None:
    """某軌道某 UTC 日期的影像（同日相鄰 frame 先 mosaic）。"""
    start = ee.Date(f"{day[:4]}-{day[4:6]}-{day[6:]}")
    s = s1_orbit(ee, region, orbit_pass, orbit)
    download(s.filterDate(start, start.advance(1, "day")).mosaic(), region, path)


def download_baseline(ee, region, orbit_pass: str, orbit: int, start: str, end: str, pre: Path, dem: Path) -> None:
    s = s1_orbit(ee, region, orbit_pass, orbit)
    download(s.filterDate(start, end).median(), region, pre)
    download(ee.Image("NASA/NASADEM_HGT/001").select("elevation").resample("bilinear"), region, dem)


def gsmap_latest(ee) -> datetime:
    last = ee.ImageCollection(GSMAP).sort("system:time_start", False).first()
    ms = last.get("system:time_start").getInfo()
    return datetime.fromtimestamp(ms / 1000, tz=timezone.utc) + timedelta(hours=1)   # 每筆是該小時的雨量


def gsmap_at(ee, items: list) -> dict:
    """
    items：[(key, lon, lat, end_datetime)]，每個點各自的終點時間。伺服器端一次算完，
    回傳 {key: {"h24": mm, "h72": mm}}。用在每一期過境前的雨量。
    """
    if not items:
        return {}
    col = ee.ImageCollection(GSMAP).select(GSMAP_BAND)
    fc = ee.FeatureCollection([
        ee.Feature(ee.Geometry.Point([lon, lat]),
                   {"k": k, "end": end.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")})
        for k, lon, lat, end in items])

    def one(f):
        end = ee.Date(f.get("end"))
        def total(h):
            img = col.filterDate(end.advance(-h, "hour"), end).sum()
            return img.reduceRegion(ee.Reducer.first(), f.geometry(), 11132).get(GSMAP_BAND)
        return f.set({"h24": total(24), "h72": total(72)})

    rows = fc.map(one).getInfo()["features"]
    out = {}
    for r in rows:
        p = r["properties"]
        out[p["k"]] = {h: (round(p[h], 1) if p.get(h) is not None else None) for h in ("h24", "h72")}
    return out


def gsmap_totals(ee, points: dict, end: datetime, hours: tuple = (24, 72)) -> dict:
    """
    points：{key: (lon, lat)}；回傳 {key: {"h24": mm, "h72": mm}}，end 往前累積。
    一次 reduceRegions 算完所有點。資料晚於 end 的部分不會用到（回放不偷看未來）。
    """
    if not points:
        return {}
    fc = ee.FeatureCollection([ee.Feature(ee.Geometry.Point(list(ll)), {"k": k}) for k, ll in points.items()])
    out = {k: {} for k in points}
    end_s = end.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    for h in hours:
        start_s = (end - timedelta(hours=h)).astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
        img = ee.ImageCollection(GSMAP).filterDate(start_s, end_s).select(GSMAP_BAND).sum().rename("mm")
        rows = img.reduceRegions(fc, ee.Reducer.first(), 11132).getInfo()["features"]
        for f in rows:
            v = f["properties"].get("first")
            out[f["properties"]["k"]][f"h{h}"] = round(v, 1) if v is not None else None
    return out
