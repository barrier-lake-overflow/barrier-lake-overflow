#!/usr/bin/env python3
"""
演練回放的「接下來的衛星過境」：回放情境每一期之後會有哪些 Sentinel-1／Sentinel-2／Landsat 影像進來，
讓值班人員練習「下一期複核前可以先調閱什麼」。即時監看窗格用 daily/optical.py 與 events/build.py
upcoming_passes，這裡只做回放情境（kind ≠ live）。

    python -m pipeline.daily.passes --project <GCP 專案 ID>          # 補缺的
    python -m pipeline.daily.passes --project <ID> --force           # 全部重抓

- 抓取：情境中心點上實際的取像時間（Landsat 含 T2、只留白天，雲多的影像才不會漏、夜間熱紅外不算），
  存成 data/derived/satpasses/<情境 id>.json。
- 推算：與 optical.py、build.py 相同的固定週期（Sentinel-1 12 天、Sentinel-2 10 天、Landsat 16 天，
  每顆衛星每個軌道各自推），只用該期以前的取像，回放不偷看未來。
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

from . import gee
from .optical import NEXT_DAYS, TW, sensor_label

CODE = Path(__file__).resolve().parents[2]
REPO = CODE.parent
SCENARIOS = REPO / "data" / "raw" / "scenarios"
OUT = REPO / "data" / "derived" / "satpasses"

LOOKBACK_DAYS = 60     # 第一期 SAR 前多抓幾天，才有「最近一次」可以往後推
CYCLE_DAYS = {"sar": 12, "s2": 10, "landsat": 16}
COLLECTIONS = [
    # (種類, 影像集, 衛星欄位, 軌道欄位)
    ("sar", "COPERNICUS/S1_GRD", "platform_number", "relativeOrbitNumber_start"),
    ("s2", "COPERNICUS/S2_HARMONIZED", "SPACECRAFT_NAME", "SENSING_ORBIT_NUMBER"),
    ("landsat", "LANDSAT/LC08/C02/T1_TOA", "SPACECRAFT_ID", "WRS_PATH"),
    ("landsat", "LANDSAT/LC08/C02/T2_TOA", "SPACECRAFT_ID", "WRS_PATH"),
    ("landsat", "LANDSAT/LC09/C02/T1_TOA", "SPACECRAFT_ID", "WRS_PATH"),
    ("landsat", "LANDSAT/LC09/C02/T2_TOA", "SPACECRAFT_ID", "WRS_PATH"),
]


def fetch(ee, lon: float, lat: float, start: datetime, end: datetime) -> list:
    """[[種類, 衛星, 軌道, ISO 時間]]；同一顆衛星同一分鐘的相鄰圖幅只留一筆。Sentinel-1 軌道寫成「降軌 105」。"""
    pt = ee.Geometry.Point([lon, lat])
    seen = set()
    for kind, coll, sat_key, orbit_key in COLLECTIONS:
        col = ee.ImageCollection(coll).filterBounds(pt).filterDate(start.isoformat(), end.isoformat())
        keys = [sat_key, orbit_key, "system:time_start"]
        if kind == "sar":
            col = col.filter(ee.Filter.eq("instrumentMode", "IW"))
            keys.append("orbitProperties_pass")
        if kind == "landsat":
            col = col.filter(ee.Filter.gt("SUN_ELEVATION", 0))   # 夜間降軌只有熱紅外，看不到湖面
        for row in col.reduceColumns(ee.Reducer.toList(len(keys)), keys).get("list").getInfo():
            sat, orbit, ms = row[0], int(row[1]), row[2]
            if kind == "sar":
                sat, orbit = f"Sentinel-1{sat}", f"{'降' if row[3] == 'DESCENDING' else '升'}軌 {orbit}"
            t = datetime.fromtimestamp(ms / 1000, timezone.utc).replace(second=0, microsecond=0)
            seen.add((kind, sensor_label(sat), str(orbit), t))
    return [[k, s, o, t.isoformat()] for k, s, o, t in sorted(seen, key=lambda r: r[3])]


def upcoming_at(history: list, as_of: datetime, sar_orbits: set, days: int = NEXT_DAYS) -> list:
    """
    as_of 之後 days 天內預計的過境，格式與 events/build.py upcoming_passes 相同
    （{"date", "time", "sensor", "kind", "orbit"}，kind 是 sar／optical）。只用 as_of 以前的取像；
    Sentinel-1 只列本窗格在處理的軌道（sar_orbits）；超過兩個週期沒出現的衛星視為停止或不再涵蓋。

    >>> h = [["sar", "Sentinel-1A", "降軌 105", "2025-07-22T21:52:00+00:00"],
    ...      ["sar", "Sentinel-1A", "升軌 69", "2025-07-20T10:01:00+00:00"],
    ...      ["s2", "Sentinel-2C", "46", "2025-07-13T02:41:00+00:00"],
    ...      ["landsat", "Landsat 9", "117", "2025-05-01T02:20:00+00:00"]]
    >>> t = datetime(2025, 7, 22, 22, tzinfo=timezone.utc)
    >>> [(p["date"], p["time"], p["sensor"], p["kind"], p["orbit"]) for p in upcoming_at(h, t, {"降軌 105"})]
    [('2025-07-23', '10:41', 'Sentinel-2C', 'optical', None), ('2025-08-02', '10:41', 'Sentinel-2C', 'optical', None), ('2025-08-04', '05:52', 'Sentinel-1A', 'sar', '降軌 105')]
    """
    last: dict = {}
    for kind, sat, orbit, iso in history:
        t = datetime.fromisoformat(iso)
        if t <= as_of and (kind != "sar" or orbit in sar_orbits):
            last[(kind, sat, orbit)] = max(last.get((kind, sat, orbit), t), t)
    out = []
    end = as_of + timedelta(days=days)
    for (kind, sat, orbit), t in last.items():
        step = timedelta(days=CYCLE_DAYS[kind])
        if as_of - t > 2 * step + timedelta(days=1):
            continue
        while t <= as_of:
            t += step
        while t <= end:
            tw = t.astimezone(TW)
            out.append({"date": tw.date().isoformat(), "time": f"{tw:%H:%M}", "sensor": sat,
                        "kind": "sar" if kind == "sar" else "optical", "orbit": orbit if kind == "sar" else None})
            t += step
    return sorted(out, key=lambda p: (p["date"], p["time"]))


def window(sc: dict) -> tuple:
    """抓取範圍：第一期 SAR 前 LOOKBACK_DAYS 天到最後一期（含複核期）後一天。"""
    times = [datetime.fromisoformat(t) for p in sc.get("passes", [])
             for t in (p.get("time"), p.get("recheckTime")) if t]
    return (min(times) - timedelta(days=LOOKBACK_DAYS), max(times) + timedelta(days=1)) if times else None


def load(scenario_id: str, out_dir: Path = OUT) -> list:
    path = out_dir / f"{scenario_id}.json"
    return json.loads(path.read_text(encoding="utf-8"))["passes"] if path.exists() else []


def main(ee=None, project=None, force: bool = False, out_dir: Path = OUT) -> dict:
    ee = ee or gee.init(project)
    out_dir.mkdir(parents=True, exist_ok=True)
    done, failed = [], []
    for path in sorted(SCENARIOS.glob("*.json")):
        sc = json.loads(path.read_text(encoding="utf-8"))
        rng = window(sc)
        out = out_dir / f"{sc['id']}.json"
        if sc.get("kind") == "live" or not rng:
            continue
        if not force and out.exists() and json.loads(out.read_text(encoding="utf-8"))["until"] >= rng[1].isoformat():
            continue
        try:
            rows = fetch(ee, *sc["center"], *rng)
        except Exception as e:   # 單一情境失敗不影響其他
            print(f"  {sc['id']} 衛星過境失敗：{gee.redact(str(e))}")
            failed.append(sc["id"])
            continue
        body = ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
        out.write_text(f'{{"until": "{rng[1].isoformat()}", "passes": [\n{body}\n]}}\n', encoding="utf-8")
        done.append(sc["id"])
    print(f"回放衛星過境：更新 {len(done)} 個情境" + (f"，失敗 {len(failed)}：{'、'.join(failed)}" if failed else ""))
    return {"updated": len(done), "failed": len(failed)}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project")
    ap.add_argument("--force", action="store_true", help="全部重抓")
    a = ap.parse_args()
    main(project=a.project, force=a.force)
