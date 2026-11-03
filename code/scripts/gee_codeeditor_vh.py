#!/usr/bin/env python3
"""
VH 補判實驗用：產生一段 GEE 網頁版（Code Editor）JavaScript，匯出馬太鞍溪 2025、
2026 負案例、全清冊回放 22 座湖的 **VH** 影像，期別與 VV 完全相同。下載後用
scripts/split_vh_exports.py 拆檔，放到 data/raw/sentinel1/vh/（不進版控，不影響正式結果）。

影像集合的篩選、日期、範圍、解析度與原本 VV 的匯出腳本相同，只把 select('VV') 換成 select('VH')：
    馬太鞍溪 2025   gee_export_matai_an_s1.js（單張用 .first()）
    2026 負案例     gee_export_series_s1.js（同日相鄰 frame 先 mosaic）
    全清冊回放      gee_fetch_inventory.py／gee_export_inventory.js（同日 mosaic）
每個案例匯出一個多波段 GeoTIFF（Drive 資料夾 vh_s1），波段名稱即檔名，拆檔時依序對應。

在 code/ 底下：

    python scripts/gee_codeeditor_vh.py     # → scripts/gee_export_vh.js
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from gee_codeeditor_inventory import build_lakes  # noqa: E402

S1 = CODE.parent / "data" / "raw" / "sentinel1"
OUT = CODE / "scripts" / "gee_export_vh.js"
NODATA = -32768.0
DRIVE_FOLDER = "vh_s1"
MATAI = [121.29752, 23.70061]

# 馬太鞍溪 2025：波段 → 拆出的檔名（與 VV 檔名一一對應，S1_VV_ 換成 S1_VH_）
MATAI_BANDS = [
    ("pre", ["S1_VH_pre_matai_an.tif"]),
    ("d20250722", ["S1_VH_post_matai_an.tif"]),
    ("d20250728", ["S1_VH_post2_matai_an.tif", "S1_VH_post0728_matai_an.tif"]),
    ("d20250803", ["S1_VH_post0803_matai_an.tif"]),
    ("d20250821", ["S1_VH_post0821_matai_an.tif"]),
    ("d20250827", ["S1_VH_post0827_matai_an.tif"]),
]


def series_days(name: str) -> list:
    pat = re.compile(rf"S1_VV_{re.escape(name)}_(\d{{8}})\.tif$")
    return sorted(m.group(1) for p in S1.glob(f"S1_VV_{name}_*.tif") if (m := pat.search(p.name)))


def cases() -> list:
    """每個案例：name、中心、軌道、事件前期間、逐期日期、取單張方式、波段 → 檔名。"""
    out = [{
        "name": "matai_an_2025", "lon": MATAI[0], "lat": MATAI[1], "pass": "DESCENDING", "orbit": 105,
        "preStart": "2025-06-01", "preEnd": "2025-07-18", "pick": "first",
        "days": [b[1:] for b, _ in MATAI_BANDS[1:]],
        "files": [f for _, fs in MATAI_BANDS for f in [fs]],
    }]
    neg = series_days("neg2026_matai_an")
    out.append({
        "name": "neg2026_matai_an", "lon": MATAI[0], "lat": MATAI[1], "pass": "DESCENDING", "orbit": 105,
        "preStart": "2026-03-01", "preEnd": "2026-05-31", "pick": "mosaic", "days": neg,
        "files": [[f"S1_VH_neg2026_matai_an_pre.tif"]] + [[f"S1_VH_neg2026_matai_an_{d}.tif"] for d in neg],
    })
    for k in build_lakes(None):
        out.append({**k, "pick": "mosaic",
                    "files": [[f"S1_VH_{k['name']}_pre.tif"]] + [[f"S1_VH_{k['name']}_{d}.tif"] for d in k["days"]]})
    return out


HEADER = """\
// 由 scripts/gee_codeeditor_vh.py 產生，請勿手動編輯。
// VH 補判實驗：匯出 VH 影像（期別與 VV 相同），每個案例一個多波段 GeoTIFF，存到 Google Drive 資料夾 {folder}/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 {n} 個）。
// 下載 Drive 上的 {folder}/ 資料夾，放到 data/raw/sentinel1/vh_exports/，
// 再到 code/ 底下跑 python scripts/split_vh_exports.py。

var NODATA = {nodata};
var CASES = {cases};

CASES.forEach(function (k) {{
  var aoi = ee.Geometry.Point([k.lon, k.lat]).buffer(5000).bounds();
  var s = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(aoi)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', k.pass))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', k.orbit))
    .select('VH');
  var bands = [s.filterDate(k.preStart, k.preEnd).median().rename('pre')];
  k.days.forEach(function (d) {{
    var start = ee.Date(d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8));
    var day = s.filterDate(start, start.advance(1, 'day'));
    var img = k.pick === 'first' ? ee.Image(day.first()) : day.mosaic();
    bands.push(img.rename('d' + d));
  }});
  Export.image.toDrive({{
    image: ee.Image.cat(bands).toFloat().unmask(NODATA), description: 'VH_' + k.name, folder: '{folder}',
    fileNamePrefix: 'VH_' + k.name, region: aoi, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9,
    fileFormat: 'GeoTIFF'
  }});
  print(k.name, k.pass, k.orbit, k.days.length + ' 期');
}});
"""


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    cs = cases()
    js_cases = [{k: v for k, v in c.items() if k != "files"} for c in cs]
    OUT.write_text(HEADER.format(folder=DRIVE_FOLDER, n=len(cs), nodata=NODATA,
                                 cases=json.dumps(js_cases, ensure_ascii=False, indent=1)), encoding="utf-8")
    manifest = CODE.parent / "data" / "raw" / "sentinel1" / "vh_manifest.json"
    manifest.write_text(json.dumps({c["name"]: c["files"] for c in cs}, ensure_ascii=False, indent=1) + "\n",
                        encoding="utf-8")
    print(f"寫出 {OUT}：{len(cs)} 個案例、{sum(len(c['days']) + 1 for c in cs)} 張 VH，匯出工作 {len(cs)} 個")
    print(f"寫出 {manifest}（拆檔對照表）")


if __name__ == "__main__":
    main()
