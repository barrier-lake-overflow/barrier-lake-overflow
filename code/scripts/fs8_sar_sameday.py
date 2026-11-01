#!/usr/bin/env python3
"""
福衛八號同期 SAR：2026 負案例 E1 範圍內，每一期 Sentinel-1 有多少像元暗到會被當成水（VV < −18 dB）。
福衛八號拍攝的 3/31、4/15 前後都有降軌 105 過境（3/31 21:52 UTC 同日；4/12、4/18 前後三天），
那時光學影像確認 E1 是乾的裸露堆積，所以那幾期的暗像元就不是水。

    cd code
    python scripts/fs8_sar_sameday.py --project <GCP 專案 ID>

需要：code/dashboard/data/events.js（取 E1 範圍）、Earth Engine 帳號（只查詢，不下載影像）。
輸出：docs/results/fs8_sar_sameday.csv（每期 E1 範圍內 VV < −18 dB 的像元比例、中位數）

軌道、門檻與偵測相同（降軌 105、判水 −18 dB），不重跑偵測、不改參數。
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
EVENTS_JS = CODE / "dashboard" / "data" / "events.js"
OUT_CSV = REPO / "docs" / "results" / "fs8_sar_sameday.csv"

WATER_DB = -18.0
ORBIT = 105
PRE = ("2026-03-01", "2026-05-31")       # 與 gee_export_series_s1.js 的事件前期間相同
SPAN = ("2026-03-20", "2026-10-01")
FS8_DATES = ("2026-03-31", "2026-04-15")


def e1_polygon() -> list:
    text = EVENTS_JS.read_text(encoding="utf-8")
    sc = next(s for s in json.loads(text[text.index("["):].rstrip().rstrip(";")) if s["id"] == "neg2026_matai_an")
    return [e for snap in sc["snapshots"] for e in snap.get("events", []) if e["id"] == "E1"][-1]["polygonLonLat"]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", required=True, help="GCP 專案 ID（Earth Engine）")
    args = ap.parse_args()

    import ee
    ee.Initialize(project=args.project)
    g = ee.Geometry.Polygon([e1_polygon()])
    s1 = (ee.ImageCollection("COPERNICUS/S1_GRD").filterBounds(g)
          .filter(ee.Filter.eq("instrumentMode", "IW"))
          .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"))
          .filter(ee.Filter.eq("relativeOrbitNumber_start", ORBIT)).select("VV"))

    def stats(img):
        dark = img.lt(WATER_DB).reduceRegion(ee.Reducer.mean(), g, 10).get("VV")
        med = img.reduceRegion(ee.Reducer.median(), g, 10).get("VV")
        return dark, med

    pre_dark, pre_med = stats(s1.filterDate(*PRE).median())
    feats = s1.filterDate(*SPAN).sort("system:time_start").map(
        lambda im: ee.Feature(None, dict(zip(("dark", "median"), stats(im)), t=im.get("system:time_start"),
                                         sat=im.get("platform_number"))))
    rows = [{"pass_utc": "事件前中位數 " + " ~ ".join(PRE), "satellite": "",
             "dark_frac": round(pre_dark.getInfo(), 3), "vv_median_db": round(pre_med.getInfo(), 1), "note": "偵測的比較基準"}]
    fs8 = [datetime.fromisoformat(d).date() for d in FS8_DATES]
    for ft in feats.getInfo()["features"]:
        p = ft["properties"]
        t = datetime.fromtimestamp(p["t"] / 1000, tz=timezone.utc)
        gap = min(abs((t.date() - d).days) for d in fs8)
        rows.append({"pass_utc": t.strftime("%Y-%m-%d %H:%M"), "satellite": "S1" + p["sat"],
                     "dark_frac": round(p["dark"], 3), "vv_median_db": round(p["median"], 1),
                     "note": f"距福衛八號 {gap} 天" if gap <= 3 else ""})

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    for r in rows:
        print(f"{r['pass_utc']:<34}{r['satellite']:<5}{r['dark_frac']:>7.0%}{r['vv_median_db']:>7}  {r['note']}")
    print(f"→ {OUT_CSV.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
