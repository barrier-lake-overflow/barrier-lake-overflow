#!/usr/bin/env python3
"""
全清冊回放影像改用 GEE 網頁版（Code Editor）匯出：產生一段 JavaScript，貼到
https://code.earthengine.google.com 執行，匯出到 Google Drive，下載後再用
scripts/split_inventory_exports.py 拆成回放用的檔案。

本機無法用 earthengine-api 登入時用這條路；能登入的話直接跑 gee_fetch_inventory.py 比較省事。

軌道與期別照 data/raw/replay_manifest.json，不重新挑（結果才能和既有回放比對）。
每湖匯出一個多波段 GeoTIFF（Drive 資料夾 replay_s1，檔名 inv_<lakeId>.tif），波段依序：
pre（事件前中位數）、dem（NASADEM）、dYYYYMMDD（逐期，同日相鄰 frame 先 mosaic）。
範圍、解析度、座標系與 gee_fetch_inventory.py 相同（中心外推 5 km 方框、10 m、EPSG:4326）。
沒有影像的像元填 NODATA，拆檔時寫成 GeoTIFF 的 nodata，讀檔時會變成 nan。
一年前基準（崩塌堆積提醒用）另外由 gee_codeeditor_prior.py 匯出。

在 code/ 底下：

    python scripts/gee_codeeditor_inventory.py                 # → scripts/gee_export_inventory.js
    python scripts/gee_codeeditor_inventory.py --only bl070    # 只匯出指定的湖
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))

from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.events import replay as R  # noqa: E402

LAKES_JS = CODE / "dashboard" / "data" / "lakes.js"
OUT = CODE / "scripts" / "gee_export_inventory.js"
BUFFER_M = 5000        # 與 gee_fetch_inventory.py 相同
NODATA = -32768.0
DRIVE_FOLDER = "replay_s1"

HEADER = """\
// 由 scripts/gee_codeeditor_inventory.py 產生，請勿手動編輯。
// 全清冊回放影像：每湖一個多波段 GeoTIFF，匯出到 Google Drive 資料夾 {folder}/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 {n} 個）。
// 下載 Drive 上的 {folder}/ 資料夾，放到 data/raw/sentinel1/replay_exports/，
// 再到 code/ 底下跑 python scripts/split_inventory_exports.py。

var NODATA = {nodata};
var LAKES = {lakes};

LAKES.forEach(function (k) {{
  var aoi = ee.Geometry.Point([k.lon, k.lat]).buffer({buffer}).bounds();
  var s = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(aoi)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', k.pass))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', k.orbit))
    .select('VV');
  var bands = [
    s.filterDate(k.preStart, k.preEnd).median().rename('pre'),
    ee.Image('NASA/NASADEM_HGT/001').select('elevation').resample('bilinear').rename('dem')
  ];
  k.days.forEach(function (d) {{
    var start = ee.Date(d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8));
    bands.push(s.filterDate(start, start.advance(1, 'day')).mosaic().rename('d' + d));
  }});
  var img = ee.Image.cat(bands).toFloat().unmask(NODATA);
  Export.image.toDrive({{
    image: img, description: k.name, folder: '{folder}', fileNamePrefix: k.name,
    region: aoi, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9, fileFormat: 'GeoTIFF'
  }});
  print(k.name, k.pass, k.orbit, k.days.length + ' 期');
}});
"""


def build_lakes(only: list | None) -> list:
    manifest = R.load_manifest().get("lakes", {})
    targets = {t["lakeId"]: t for t in R.select_targets(read_lakes(LAKES_JS))[0]}
    out = []
    for lake_id, m in manifest.items():
        if m.get("status") != "ok" or lake_id not in targets:
            continue
        if only and lake_id not in only:
            continue
        t = targets[lake_id]
        out.append({"name": m["scenarioId"], "lon": t["lon"], "lat": t["lat"],
                    "pass": m["pass"], "orbit": m["orbit"],
                    "preStart": t["preStart"], "preEnd": t["preEnd"],
                    "days": [s["day"] for s in m["scenes"]]})
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", nargs="*", default=None, help="只匯出這些清冊編號（例如 bl070）")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    lakes = build_lakes(args.only)
    if not lakes:
        sys.exit("沒有可匯出的湖：確認 data/raw/replay_manifest.json 存在，且 --only 的編號正確")
    js = HEADER.format(folder=DRIVE_FOLDER, n=len(lakes), nodata=NODATA, buffer=BUFFER_M,
                       lakes=json.dumps(lakes, ensure_ascii=False, indent=1))
    Path(args.out).write_text(js, encoding="utf-8")
    scenes = sum(len(k["days"]) for k in lakes)
    print(f"寫出 {args.out}：{len(lakes)} 座湖、{scenes} 期，匯出工作 {len(lakes)} 個")


if __name__ == "__main__":
    main()
