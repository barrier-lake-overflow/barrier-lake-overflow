#!/usr/bin/env python3
"""
光學偵測來源的 Google Earth Engine 端：列出 Sentinel-2／Landsat 8/9 各景與窗格晴空比例、下載判水結果。
每日監看（pipeline/daily/optical.py）與全清冊回放（scripts/gee_fetch_optical.py）共用；
本機無法登入 GEE 時，回放改用網頁版（scripts/gee_codeeditor_optical.py，同一套規則的 JavaScript）。

- 去雲：Sentinel-2 L2A 用 Cloud Score+ cs_cdf ≥ CS_THRESHOLD；Landsat 8/9 C2 L2 用 QA_PIXEL
  （雲、膨脹雲、卷雲、雲影都排除）。同一天同一顆衛星的相鄰圖幅併成一景。
- 判水：MNDWI > 0 且近紅外線 < 500（反射率 × 10000，Landsat 換算到同一尺度），與每日光學判讀相同。
- 事件前基準：每個像元只用晴空觀測取中位數，再套同一判水規則；完全沒有晴空觀測的像元記為「不知道」。
- 下載：每景三個整數波段 water、clear、ndvi×1000（事件前多一個 count），10 m、EPSG:4326，
  中心外推 BUFFER_M 的方框；偵測只用中間 4 km（pipeline/detect/optical.py）。
"""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from pathlib import Path

from pipeline.detect import optical as OD
from pipeline.detect.water import S2_WATER_MNDWI_MIN, S2_WATER_NIR_MAX

from . import gee
from .basemap import CS_THRESHOLD

BUFFER_M = 2500        # 下載範圍：中心外推 2.5 km 方框
WINDOW_M = 2000        # 4 km 窗格半寬，算晴空比例用

SENSORS = {
    # 代號: (GEE 影像集, 衛星名稱屬性, 綠, 紅, 近紅外, 短波紅外)
    "s2": ("COPERNICUS/S2_SR_HARMONIZED", "SPACECRAFT_NAME", "B3", "B4", "B8", "B11"),
    "l8": ("LANDSAT/LC08/C02/T1_L2", "SPACECRAFT_ID", "SR_B3", "SR_B4", "SR_B5", "SR_B6"),
    "l9": ("LANDSAT/LC09/C02/T1_L2", "SPACECRAFT_ID", "SR_B3", "SR_B4", "SR_B5", "SR_B6"),
}


def regions(ee, lon: float, lat: float) -> tuple:
    """(下載範圍, 4 km 窗格)。"""
    pt = ee.Geometry.Point([lon, lat])
    return pt.buffer(BUFFER_M).bounds(), pt.buffer(WINDOW_M).bounds()


def collection(ee, key: str, region, start: str, end: str):
    col = ee.ImageCollection(SENSORS[key][0]).filterBounds(region).filterDate(start, end)
    if key == "s2":
        # Cloud Score+ 缺的景補全遮罩波段（整景當雲遮）
        cs = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED")
        nocs = ee.Image.constant(0).float().rename("cs_cdf").updateMask(0)
        col = col.linkCollection(cs, ["cs_cdf"]).map(lambda i: ee.Image(ee.Algorithms.If(
            i.bandNames().contains("cs_cdf"), i, i.addBands(nocs))))
    return col


def reflectance(ee, key: str, img):
    """單景 → 綠、紅、近紅外、短波紅外（反射率 × 10000）四個波段，非晴空像元遮掉。"""
    _, _, g, r, n, s = SENSORS[key]
    if key == "s2":
        bands = img.select([g, r, n, s], ["g", "r", "n", "s"]).toFloat()
        clear = img.select("cs_cdf").gte(CS_THRESHOLD)
    else:
        bands = img.select([g, r, n, s], ["g", "r", "n", "s"]).multiply(0.275).add(-2000)   # C2 → × 10000
        qa = img.select("QA_PIXEL")
        clear = qa.bitwiseAnd(0b11110).eq(0).And(qa.bitwiseAnd(1).eq(0))   # bit 1～4 雲類；bit 0 無資料
    return bands.updateMask(clear)


def classify_bands(ee, refl):
    """反射率 → water（晴空且判為水）、clear、ndvi×1000，整數波段，沒資料的像元 clear = 0。"""
    g, r, n, s = refl.select("g"), refl.select("r"), refl.select("n"), refl.select("s")
    water = g.subtract(s).divide(g.add(s)).gt(S2_WATER_MNDWI_MIN).And(n.lt(S2_WATER_NIR_MAX))
    ndvi = n.subtract(r).divide(n.add(r)).clamp(-1, 1).multiply(1000)
    clear = refl.select("g").mask().gt(0)
    return (water.unmask(0).rename("water")
            .addBands(clear.unmask(0).rename("clear"))
            .addBands(ndvi.unmask(-9999).rename("ndvi"))).toInt16()


def pre_collection(ee, region, start: str, end: str):
    """事件前各衛星的晴空反射率合在一起。"""
    cols = [collection(ee, k, region, start, end).map(lambda i, k=k: reflectance(ee, k, i)) for k in SENSORS]
    return cols[0].merge(cols[1]).merge(cols[2])


def _day_mosaic(ee, key: str, region, sat: str, day: date):
    col = collection(ee, key, region, day.isoformat(), (day + timedelta(days=1)).isoformat()).filter(
        ee.Filter.eq(SENSORS[key][1], sat))
    return classify_bands(ee, reflectance(ee, key, col.mosaic()))


def list_scenes(ee, region, window, start: str, end: str) -> list:
    """
    start～end 之間每一景（同日同衛星併成一景）與 4 km 窗格晴空比例，依時間排序：
    [{"key", "sensor", "day", "timeUTC", "clearPct", "usable"}]。sensor 是 GEE 原始名稱。
    """
    feats = []
    for k in SENSORS:
        rows = collection(ee, k, region, start, end).reduceColumns(
            ee.Reducer.toList(2), [SENSORS[k][1], "system:time_start"]).get("list").getInfo()
        days: dict = {}
        for sat, ms in rows:
            d = datetime.fromtimestamp(ms / 1000, tz=timezone.utc).date()
            days[(sat, d)] = min(days.get((sat, d), ms), ms)
        for (sat, d), ms in days.items():
            frac = _day_mosaic(ee, k, region, sat, d).select("clear").reduceRegion(
                ee.Reducer.mean(), window, 30, maxPixels=1e8).get("clear")
            feats.append(ee.Feature(None, {"key": k, "sat": sat, "ms": ms, "clear": frac}))
    got = ee.FeatureCollection(feats).getInfo()["features"] if feats else []
    out = []
    for f in sorted(got, key=lambda f: f["properties"]["ms"]):
        p = f["properties"]
        t = datetime.fromtimestamp(p["ms"] / 1000, tz=timezone.utc)
        clear = p.get("clear")
        out.append({"key": p["key"], "sensor": p["sat"], "day": t.strftime("%Y%m%d"),
                    "timeUTC": t.isoformat(timespec="minutes"),
                    "clearPct": None if clear is None else round(100 * clear, 1),
                    "usable": clear is not None and clear >= OD.CLEAR_FRAC})
    return out


def scene_file(name: str, s: dict) -> str:
    return f"OPT_{name}_{s['day']}_{OD.sensor_tag(s['sensor'])}.tif"


def download_baseline(ee, region, start: str, end: str, pre: Path, dem: Path) -> int:
    """事件前基準與 DEM；回傳事件前影像數（0 時不下載）。"""
    col = pre_collection(ee, region, start, end)
    n = col.size().getInfo()
    if n:
        img = classify_bands(ee, col.median()).addBands(col.select("g").count().rename("count").toInt16())
        gee.download(img, region, pre)
        gee.download(ee.Image("NASA/NASADEM_HGT/001").select("elevation").resample("bilinear"), region, dem)
    return n


def download_scene(ee, region, s: dict, path: Path) -> None:
    d = date(int(s["day"][:4]), int(s["day"][4:6]), int(s["day"][6:]))
    gee.download(_day_mosaic(ee, s["key"], region, s["sensor"], d), region, path)
