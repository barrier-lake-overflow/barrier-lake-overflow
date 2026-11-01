#!/usr/bin/env python3
"""
監看窗格的光學影像（Sentinel-2、Landsat 8/9）：最近幾景的雲量、下一次預計過境、每個 SAR 事件位置看不看得到水。

    python -m pipeline.daily.optical --project <GCP 專案 ID>

- 只做監看中的自動監看窗格（kind=live）。結果寫進情境檔 optical 欄位，build 時附到事件卡。
- 只供值班參考，不參與優先等級與研判信心：山區陰影、薄雲、濕泥仍可能誤判，門檻也還沒校準。
  要列為 SAR 以外的獨立證據，仍要有人調閱影像確認後記在人工查證。
- 影像：Sentinel-2 L2A（COPERNICUS/S2_SR_HARMONIZED，Cloud Score+ cs_cdf ≥ CS_THRESHOLD 才算晴空，與底圖、
  負案例查證相同）；Landsat 8/9 Collection 2 L2（QA_PIXEL 的雲、膨脹雲、卷雲、雲影都排除）。
  同一天同一顆衛星的相鄰圖幅先 mosaic 成一景。
- 判水：pipeline/detect/water.py optical_water_rule 的 Sentinel-2 規則（MNDWI > 0 且近紅外線 < 500，
  反射率 × 10000）。Landsat 換算成同一尺度後套同一規則（Landsat 未另外驗證；30 m 像元，小湖只有幾個像元）。
- 每個事件取 SAR 最近一次偵測的範圍，每景算晴空比例、晴空像元中判為水的比例，再用 verdict() 分成
  看得到水／少量水／看不到水／雲遮。只看事件首次偵測以後的影像。
- 下一次過境：Sentinel-2 每顆衛星每個軌道 10 天、Landsat 每顆衛星每個 WRS 圖幅 16 天重複，
  從最近實際取得的影像往後推（predict_next）。只是預估，衛星排程或影像上架延遲都可能讓實際日期不同。
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

from pipeline.detect.water import S2_WATER_MNDWI_MIN, S2_WATER_NIR_MAX

from . import gee
from .basemap import CS_THRESHOLD, SCENARIOS, window_box

TW = timezone(timedelta(hours=8))
LOOKBACK_DAYS = 45     # 最近幾天的影像（雲量清單、事件判讀、推算下一次過境都用這段）
NEXT_DAYS = 16         # 預估未來幾天內的過境
CLEAR_FRAC = 0.5       # 事件範圍內晴空像元過半才判讀（與 scripts/check_neg_e1.py 相同）
WATER_YES = 0.3        # 晴空像元中判為水的比例 ≥ 此值：看得到水（自訂，未校準）
WATER_NO = 0.1         # < 此值：看不到水；其間：少量水（自訂，未校準）
MIN_PIXELS = 3         # 事件範圍內有效像元少於此數不判讀（Landsat 30 m 像元下的小湖）
POINT_BUFFER_M = 40    # 沒有多邊形的事件，以中心點外推此距離

SENSORS = {
    # 名稱: (GEE 影像集, 衛星名稱屬性, 軌道／圖幅屬性, 重複週期天數, 判讀解析度 m)
    "s2": ("COPERNICUS/S2_SR_HARMONIZED", "SPACECRAFT_NAME", ["SENSING_ORBIT_NUMBER"], 10, 10),
    "l8": ("LANDSAT/LC08/C02/T1_L2", "SPACECRAFT_ID", ["WRS_PATH", "WRS_ROW"], 16, 30),
    "l9": ("LANDSAT/LC09/C02/T1_L2", "SPACECRAFT_ID", ["WRS_PATH", "WRS_ROW"], 16, 30),
}
VERDICT_TEXT = {"water": "看得到水", "partial": "少量水", "no_water": "看不到水", "cloud": "雲遮"}


def sensor_label(name: str) -> str:
    """
    >>> sensor_label("Sentinel-2B"), sensor_label("LANDSAT_9")
    ('Sentinel-2B', 'Landsat 9')
    """
    return name.replace("LANDSAT_", "Landsat ") if name.startswith("LANDSAT_") else name


def family(sensor: str) -> str:
    """
    >>> family("Sentinel-2C"), family("Landsat 8")
    ('Sentinel-2', 'Landsat')
    """
    return "Sentinel-2" if sensor.startswith("Sentinel-2") else "Landsat"


def verdict(clear: Optional[float], water: Optional[float], n: int) -> Optional[str]:
    """
    clear：事件範圍內晴空像元比例；water：晴空像元中判為水的比例；n：有效像元數。
    資料不足（範圍太小、該景還沒有雲量資料）回傳 None。

    >>> verdict(0.9, 0.62, 40), verdict(0.9, 0.15, 40), verdict(0.9, 0.02, 40)
    ('water', 'partial', 'no_water')
    >>> verdict(0.3, None, 40), verdict(0.9, 0.5, 2), verdict(None, None, 0)
    ('cloud', None, None)
    """
    if clear is None or n < MIN_PIXELS:
        return None
    if clear < CLEAR_FRAC:
        return "cloud"
    if water is None:
        return None
    return "water" if water >= WATER_YES else "no_water" if water < WATER_NO else "partial"


def predict_next(rows: list, cycles: dict, today: date, days: int = NEXT_DAYS) -> list:
    """
    rows：[(衛星, 軌道代號, epoch_ms)]；cycles：{衛星: 重複週期天數}。每顆衛星每個軌道從最近一次
    取得的日期往後加週期，取 today（含）到 today + days 之間的日期。回傳 [{"date", "sensor"}]，依日期排序。

    >>> ms = lambda s: datetime.fromisoformat(s + "T02:30+00:00").timestamp() * 1000
    >>> rows = [("Sentinel-2B", "32", ms("2026-10-14")), ("Sentinel-2B", "32", ms("2026-10-24")),
    ...         ("Sentinel-2C", "32", ms("2026-10-29")), ("Landsat 9", "117/43", ms("2026-10-20"))]
    >>> cyc = {"Sentinel-2B": 10, "Sentinel-2C": 10, "Landsat 9": 16}
    >>> [(p["date"], p["sensor"]) for p in predict_next(rows, cyc, date(2026, 11, 1))]
    [('2026-11-03', 'Sentinel-2B'), ('2026-11-05', 'Landsat 9'), ('2026-11-08', 'Sentinel-2C'), ('2026-11-13', 'Sentinel-2B')]
    """
    last: dict = {}
    for sat, orbit, ms in rows:
        d = datetime.fromtimestamp(ms / 1000, tz=TW).date()
        last[(sat, orbit)] = max(last.get((sat, orbit), d), d)
    out = set()
    end = today + timedelta(days=days)
    for (sat, _), d in last.items():
        step = timedelta(days=cycles[sat])
        while d < today:
            d += step
        while d <= end:
            if d > last[(sat, _)]:
                out.add((d.isoformat(), sat))
            d += step
    return [{"date": d, "sensor": s} for d, s in sorted(out)]


def event_shapes(sc: dict) -> list:
    """情境的事件（與 events/build.py 相同的追蹤）：[(事件代號, 首次偵測時間, 最近範圍 [[lon, lat]…] 或中心點)]。"""
    from pipeline.events import build as B
    out = []
    for ev in B.track(B.load_passes(sc, B.DERIVED)):
        latest = ev["detections"][-1]
        poly = latest.cand.get("polygonLonLat") or []
        out.append((ev["id"], ev["detections"][0].pass_time, poly if len(poly) >= 3 else list(latest.lon_lat)))
    return out


def _normalized(ee, key: str, img):
    """單景 → 兩個 0／1 波段：clear（晴空）、water（晴空且判為水）。沒有雲量資料、不在影像範圍內的像元遮掉。"""
    if key == "s2":
        g, nir, swir = img.select("B3"), img.select("B8"), img.select("B11")
        clear = img.select("cs_cdf").gte(CS_THRESHOLD)
    else:
        sr = img.select(["SR_B3", "SR_B5", "SR_B6"]).multiply(0.275).add(-2000)   # Collection 2 → 反射率 × 10000
        g, nir, swir = sr.select("SR_B3"), sr.select("SR_B5"), sr.select("SR_B6")
        qa = img.select("QA_PIXEL")
        clear = qa.bitwiseAnd(0b11110).eq(0).updateMask(qa.bitwiseAnd(1).eq(0))   # bit 1～4 雲類；bit 0 無資料
    mndwi = g.subtract(swir).divide(g.add(swir))
    water = mndwi.gt(S2_WATER_MNDWI_MIN).And(nir.lt(S2_WATER_NIR_MAX)).And(clear)
    return clear.rename("clear").addBands(water.rename("water")).updateMask(clear.mask())


def scan_window(ee, sc: dict, now: datetime) -> dict:
    """一個窗格：最近影像清單、下一次過境、各事件逐景判讀。GEE 只呼叫兩次（影像清單、統計）。"""
    w, s, e, n = window_box(sc["center"], sc.get("windowKm", 4.0))
    box = ee.Geometry.Rectangle([w, s, e, n], "EPSG:4326", False)
    start = (now - timedelta(days=LOOKBACK_DAYS)).astimezone(timezone.utc).strftime("%Y-%m-%d")
    end = (now + timedelta(days=1)).astimezone(timezone.utc).strftime("%Y-%m-%d")
    cols = {k: ee.ImageCollection(c).filterBounds(box).filterDate(start, end) for k, (c, *_rest) in SENSORS.items()}

    meta = ee.Dictionary({k: cols[k].reduceColumns(ee.Reducer.toList(len(SENSORS[k][2]) + 2),
                                                   [SENSORS[k][1], *SENSORS[k][2], "system:time_start"]).get("list")
                          for k in SENSORS}).getInfo()
    rows, cycles, scenes = [], {}, {}
    for k, items in meta.items():
        for *props, ms in items:
            sat = sensor_label(props[0])
            rows.append((sat, "/".join(str(p) for p in props[1:]), ms))
            cycles[sat] = SENSORS[k][3]
            day = datetime.fromtimestamp(ms / 1000, tz=timezone.utc).date()
            scenes.setdefault((k, props[0], day), ms)   # 同日同衛星的相鄰圖幅算一景
    nxt = predict_next(rows, cycles, now.astimezone(TW).date())

    events = event_shapes(sc)
    feats = [ee.Feature(box, {"key": "window"})] + [
        ee.Feature(ee.Geometry.Polygon([shape]) if isinstance(shape[0], list)
                   else ee.Geometry.Point(shape).buffer(POINT_BUFFER_M), {"key": eid})
        for eid, _, shape in events]
    fc = ee.FeatureCollection(feats)
    cs = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED")
    reducer = ee.Reducer.mean().combine(ee.Reducer.count(), sharedInputs=True)
    stats = []
    for (k, sat, day), ms in scenes.items():
        col = cols[k].filterDate(day.isoformat(), (day + timedelta(days=1)).isoformat()).filter(
            ee.Filter.eq(SENSORS[k][1], sat))
        if k == "s2":
            # Cloud Score+ 偶爾比影像晚上架：缺的補一個全遮罩波段，該景這次只記「尚無雲量資料」，下次再判讀
            nocs = ee.Image.constant(0).float().rename("cs_cdf").updateMask(0)
            col = col.linkCollection(cs, ["cs_cdf"]).map(lambda i: ee.Image(ee.Algorithms.If(
                i.bandNames().contains("cs_cdf"), i, i.addBands(nocs))))
        img = _normalized(ee, k, col.mosaic())
        stats.append(img.reduceRegions(collection=fc, reducer=reducer, scale=SENSORS[k][4], tileScale=2)
                     .map(lambda f, ms=ms, sat=sat: ee.Feature(None, {
                         "key": f.get("key"), "ms": ms, "sensor": sat,
                         "clear": f.get("clear_mean"), "water": f.get("water_mean"), "n": f.get("clear_count")})))
    got = ee.FeatureCollection(stats).flatten().getInfo()["features"] if stats else []

    by_key: dict = {}
    for f in got:
        p = f["properties"]
        clear, water, cnt = p.get("clear"), p.get("water"), p.get("n") or 0
        by_key.setdefault(p["key"], []).append({
            "time": datetime.fromtimestamp(p["ms"] / 1000, tz=TW).isoformat(timespec="minutes"),
            "sensor": sensor_label(p["sensor"]),
            "clearPct": round(100 * clear) if clear is not None and cnt else None,
            # 晴空像元中判為水的比例（water 是全部有效像元中「晴空且是水」的比例）
            "waterPct": round(100 * water / clear) if clear and water is not None and cnt else None,
            "n": cnt,
        })
    window_scenes = sorted(({k: r[k] for k in ("time", "sensor", "clearPct")} for r in by_key.get("window", [])),
                           key=lambda r: r["time"], reverse=True)
    checks = []
    for eid, first, shape in events:
        results = []
        for r in sorted(by_key.get(eid, []), key=lambda r: r["time"], reverse=True):
            v = verdict(r["clearPct"] / 100 if r["clearPct"] is not None else None,
                        r["waterPct"] / 100 if r["waterPct"] is not None else None, r["n"])
            if v and datetime.fromisoformat(r["time"]) >= first:
                results.append({"time": r["time"], "sensor": r["sensor"], "verdict": v,
                                "clearPct": r["clearPct"], "waterPct": r["waterPct"] if v != "cloud" else None})
        center = shape if not isinstance(shape[0], list) else [
            round(sum(p[0] for p in shape) / len(shape), 6), round(sum(p[1] for p in shape) / len(shape), 6)]
        checks.append({"event": eid, "lonLat": center, "results": results})
    return {"checkedAt": now.isoformat(timespec="minutes"), "scenes": window_scenes, "next": nxt, "checks": checks}


def main(ee=None, project=None, now=None) -> dict:
    """所有監看中的窗格。單一窗格失敗不影響其他窗格，全部跑完後有失敗就拋出錯誤（與 sentinel 相同）。"""
    from .sentinel import failure_message
    now = now or datetime.now(TW)
    ee = ee or gee.init(project)
    results = []
    for path in sorted(SCENARIOS.glob("live_*.json")):
        sc = json.loads(path.read_text(encoding="utf-8"))
        if sc.get("kind") != "live" or not sc.get("active"):
            continue
        try:
            sc["optical"] = scan_window(ee, sc, now)
        except Exception as e:   # 單一窗格失敗不影響其他窗格；上一次的結果留著
            results.append({"id": sc["id"], "status": "error", "error": gee.redact(str(e))})
            print(f"  {sc['id']} 光學影像失敗：{gee.redact(str(e))}")
            continue
        path.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        o = sc["optical"]
        latest = o["scenes"][0] if o["scenes"] else None
        nxt = "、".join(f"{p['sensor']} {p['date'][5:]}" for p in o["next"][:3]) or "—"
        print(f"  {sc['id']}：{len(o['scenes'])} 景" +
              (f"，最近 {latest['time'][5:10]} {latest['sensor']} 晴空 {latest['clearPct']}%" if latest else "") +
              f"，事件 {len(o['checks'])} 件，下一次 {nxt}")
        results.append({"id": sc["id"], "status": "ok", "scenes": len(o["scenes"]), "events": len(o["checks"])})
    msg = failure_message(results)
    if msg:
        raise RuntimeError(msg)
    return {"windows": len(results)}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project")
    a = ap.parse_args()
    main(project=a.project)
