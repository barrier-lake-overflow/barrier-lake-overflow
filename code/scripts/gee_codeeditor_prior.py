#!/usr/bin/env python3
"""
A1 崩塌堆積提醒（第二版）：產生 GEE 網頁版（Code Editor）JavaScript，匯出每個案例「一年前」的
VV 基準影像，用來找出前一年到這次事件前之間新出現的崩塌（既有崩塌堆積區）。

一年前基準 = 同一軌道、事件前基準期間整段往前推一年的中位數（季節相同）。例如 2026 負案例的
事件前基準是 2026-03～05，一年前基準就是 2025-03～05；兩者相比，2025 年 7 月馬太鞍溪的崩塌堆積
會被標出來。範圍、解析度、座標系與原本的 VV 匯出相同。2015 年的案例往前一年還沒有 Sentinel-1，
該期沒有影像時整張填 NODATA，之後視為沒有一年前資料（不加提醒）。

每個案例一個單波段 GeoTIFF（Drive 資料夾 prior_s1），用 scripts/split_prior_exports.py 改名，
放到與事件前基準相同的資料夾（run_sar_all.bat、run_sar_series.py 會自動帶入）。

在 code/ 底下：

    python scripts/gee_codeeditor_prior.py     # → scripts/gee_export_prior.js
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE / "scripts"))

from gee_codeeditor_vh import cases  # noqa: E402  與 VH 實驗同一份案例清單（中心、軌道、事件前期間）

OUT = CODE / "scripts" / "gee_export_prior.js"
NODATA = -32768.0
DRIVE_FOLDER = "prior_s1"


def prior_file(name: str) -> str:
    """
    >>> prior_file("matai_an_2025"), prior_file("inv_bl070")
    ('S1_VV_prior_matai_an.tif', 'S1_VV_inv_bl070_prior.tif')
    """
    return "S1_VV_prior_matai_an.tif" if name == "matai_an_2025" else f"S1_VV_{name}_prior.tif"


HEADER = """\
// 由 scripts/gee_codeeditor_prior.py 產生，請勿手動編輯。
// A1 崩塌堆積提醒：匯出每個案例「一年前」的 VV 基準（事件前基準期間往前推一年的中位數），
// 存到 Google Drive 資料夾 {folder}/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 {n} 個）。
// 下載 Drive 上的 {folder}/ 資料夾，放到 data/raw/sentinel1/prior_exports/，
// 再到 code/ 底下跑 python scripts/split_prior_exports.py。

var NODATA = {nodata};
var CASES = {cases};

CASES.forEach(function (k) {{
  var aoi = ee.Geometry.Point([k.lon, k.lat]).buffer(5000).bounds();
  var start = ee.Date(k.preStart).advance(-1, 'year');
  var end = ee.Date(k.preEnd).advance(-1, 'year');
  var col = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(aoi)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', k.pass))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', k.orbit))
    .filterDate(start, end)
    .select('VV');
  // 一年前還沒有影像（2015 年的案例）時整張填 NODATA
  var img = ee.Image(ee.Algorithms.If(col.size().gt(0), col.median(), ee.Image.constant(NODATA).rename('VV')));
  Export.image.toDrive({{
    image: img.rename('prior').toFloat().unmask(NODATA), description: 'PRIOR_' + k.name,
    folder: '{folder}', fileNamePrefix: 'PRIOR_' + k.name,
    region: aoi, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9, fileFormat: 'GeoTIFF'
  }});
  print(k.name, k.pass, k.orbit, '一年前基準', start.format('YYYY-MM-dd'), '～', end.format('YYYY-MM-dd'),
        col.size(), '張');
}});
"""


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    cs = [{k: c[k] for k in ("name", "lon", "lat", "pass", "orbit", "preStart", "preEnd")} for c in cases()]
    OUT.write_text(HEADER.format(folder=DRIVE_FOLDER, n=len(cs), nodata=NODATA,
                                 cases=json.dumps(cs, ensure_ascii=False, indent=1)), encoding="utf-8")
    print(f"寫出 {OUT}：{len(cs)} 個案例，匯出工作 {len(cs)} 個")


if __name__ == "__main__":
    main()
