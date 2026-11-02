#!/usr/bin/env python3
"""
光學候選來源實驗改用 GEE 網頁版（Code Editor）匯出：產生一段 JavaScript，貼到
https://code.earthengine.google.com 執行，匯出到 Google Drive，下載後再用
scripts/split_optical_exports.py 拆成 optical_replay.py 要的檔案。

本機無法用 earthengine-api 登入時用這條路；能登入的話直接跑 gee_fetch_optical.py 比較省事。
選湖、時間窗、去雲、判水、晴空過半才算一期，規則都與 gee_fetch_optical.py 相同。

匯出內容（Drive 資料夾 replay_optical/）：

- 每湖一個多波段 GeoTIFF（<情境>.tif），int16，波段依序：
  pre（事件前基準，編碼見下）、precount（晴空觀測數）、dem（NASADEM，取整數公尺）、
  之後每個晴空過半的景一個波段（依取像時間排序）。
- 一個 CSV（optical_scenes.csv）：每湖一列 type=pre（事件前影像數），每一景一列 type=scene
  （衛星、取像時間、4 km 窗格晴空比例）。拆檔時依 CSV 對回波段順序。

判水結果編碼成單一波段（一景只要一個波段）：非晴空 = −1；晴空 = (round(NDVI × 1000) + 1000) × 2 + 是否為水。

在 code/ 底下：

    python scripts/gee_codeeditor_optical.py                 # → scripts/gee_export_optical.js
    python scripts/gee_codeeditor_optical.py --only bl071    # 只匯出指定的湖（清冊編號或情境 id）
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from pipeline.detect.water import S2_WATER_MNDWI_MIN, S2_WATER_NIR_MAX  # noqa: E402

import gee_fetch_optical as F  # noqa: E402

OUT = CODE / "scripts" / "gee_export_optical.js"
DRIVE_FOLDER = "replay_optical"

HEADER = """\
// 由 scripts/gee_codeeditor_optical.py 產生，請勿手動編輯。
// 光學候選來源實驗：每湖一個多波段 GeoTIFF ＋ 一個 CSV，匯出到 Google Drive 資料夾 {folder}/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 {tasks} 個）。
// 下載 Drive 上的 {folder}/ 資料夾，放到 data/raw/optical/exports/，
// 再到 code/ 底下跑 python scripts/split_optical_exports.py。

var CS = {cs}, CLEAR_FRAC = {clear_frac}, MNDWI_MIN = {mndwi}, NIR_MAX = {nir};
var FOLDER = '{folder}';
var LAKES = {lakes};

var SENSORS = {{
  s2: {{id: 'COPERNICUS/S2_SR_HARMONIZED', sat: 'SPACECRAFT_NAME', b: ['B3', 'B4', 'B8', 'B11']}},
  l8: {{id: 'LANDSAT/LC08/C02/T1_L2', sat: 'SPACECRAFT_ID', b: ['SR_B3', 'SR_B4', 'SR_B5', 'SR_B6']}},
  l9: {{id: 'LANDSAT/LC09/C02/T1_L2', sat: 'SPACECRAFT_ID', b: ['SR_B3', 'SR_B4', 'SR_B5', 'SR_B6']}}
}};
var CSP = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');

function coll(key, region, start, end) {{
  var c = ee.ImageCollection(SENSORS[key].id).filterBounds(region).filterDate(start, end);
  if (key === 's2') {{
    // Cloud Score+ 缺的景補全遮罩波段（整景當雲遮）
    var nocs = ee.Image.constant(0).float().rename('cs_cdf').updateMask(0);
    c = c.linkCollection(CSP, ['cs_cdf']).map(function (i) {{
      return ee.Image(ee.Algorithms.If(i.bandNames().contains('cs_cdf'), i, i.addBands(nocs)));
    }});
  }}
  return c;
}}

// 單景 → 綠、紅、近紅外、短波紅外（反射率 × 10000），非晴空像元遮掉
function refl(key, img) {{
  var bands, clear;
  if (key === 's2') {{
    bands = img.select(SENSORS[key].b, ['g', 'r', 'n', 's']).toFloat();
    clear = img.select('cs_cdf').gte(CS);
  }} else {{
    bands = img.select(SENSORS[key].b, ['g', 'r', 'n', 's']).multiply(0.275).add(-2000);
    var qa = img.select('QA_PIXEL');
    clear = qa.bitwiseAnd(30).eq(0).and(qa.bitwiseAnd(1).eq(0));   // bit 1～4 雲類；bit 0 無資料
  }}
  return bands.updateMask(clear);
}}

// 判水＋NDVI 編成一個 int16 波段：非晴空 −1；晴空 (round(NDVI×1000)+1000)×2 + 是否為水
function encode(r) {{
  var g = r.select('g'), red = r.select('r'), n = r.select('n'), s = r.select('s');
  var water = g.subtract(s).divide(g.add(s)).gt(MNDWI_MIN).and(n.lt(NIR_MAX));
  var ndvi = n.subtract(red).divide(n.add(red)).clamp(-1, 1);
  return ndvi.multiply(1000).round().add(1000).multiply(2).add(water).unmask(-1).toInt16().rename('v');
}}

var rows = [];
LAKES.forEach(function (k) {{
  var pt = ee.Geometry.Point([k.lon, k.lat]);
  var region = pt.buffer({buffer}).bounds();
  var win = pt.buffer({window}).bounds();

  var preAll = coll('s2', region, k.preStart, k.preEnd).map(function (i) {{ return refl('s2', i); }})
    .merge(coll('l8', region, k.preStart, k.preEnd).map(function (i) {{ return refl('l8', i); }}))
    .merge(coll('l9', region, k.preStart, k.preEnd).map(function (i) {{ return refl('l9', i); }}));

  // 同一天同一顆衛星的相鄰圖幅併成一景，算 4 km 窗格晴空比例
  function daily(key) {{
    var c = coll(key, region, k.postStart, k.postEnd).map(function (i) {{
      return i.set('dkey', ee.String(i.get(SENSORS[key].sat)).cat('|')
        .cat(ee.Date(i.get('system:time_start')).format('YYYY-MM-dd')));
    }});
    return ee.ImageCollection.fromImages(c.aggregate_array('dkey').distinct().map(function (dk) {{
      var sub = c.filter(ee.Filter.eq('dkey', dk));
      var first = ee.Image(sub.sort('system:time_start').first());
      var img = encode(refl(key, sub.mosaic()));
      var clear = img.gte(0).reduceRegion({{reducer: ee.Reducer.mean(), geometry: win, scale: 30,
                                           maxPixels: 1e8}}).get('v');
      return img.set({{key: key, sat: first.get(SENSORS[key].sat), clear: clear,
                      'system:time_start': first.get('system:time_start')}});
    }}));
  }}
  var scenes = daily('s2').merge(daily('l8')).merge(daily('l9')).sort('system:time_start');
  var usable = scenes.filter(ee.Filter.gte('clear', CLEAR_FRAC)).sort('system:time_start');

  var img = ee.Image.cat([
    encode(preAll.median()).rename('pre'),
    preAll.select('g').count().unmask(0).toInt16().rename('precount'),
    ee.Image('NASA/NASADEM_HGT/001').select('elevation').resample('bilinear').round().toInt16().rename('dem'),
    usable.toBands()
  ]).toInt16();
  Export.image.toDrive({{
    image: img, description: k.name, folder: FOLDER, fileNamePrefix: k.name,
    region: region, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9, fileFormat: 'GeoTIFF'
  }});

  rows.push(ee.FeatureCollection([ee.Feature(null, {{lake: k.name, type: 'pre', n: preAll.size()}})]));
  rows.push(ee.FeatureCollection(scenes.toList(1000).map(function (s) {{
    s = ee.Image(s);
    return ee.Feature(null, {{lake: k.name, type: 'scene', key: s.get('key'), sat: s.get('sat'),
                             ms: s.get('system:time_start'), clear: s.get('clear')}});
  }})));
  print(k.name);
}});

Export.table.toDrive({{
  collection: ee.FeatureCollection(rows).flatten(), description: 'optical_scenes', folder: FOLDER,
  fileNamePrefix: 'optical_scenes', fileFormat: 'CSV',
  selectors: ['lake', 'type', 'key', 'sat', 'ms', 'clear', 'n']
}});
"""


def build_lakes(only: list | None) -> list:
    out = []
    for t in F.targets_all():
        if only and t["lakeId"] not in only and t["scenarioId"] not in only:
            continue
        out.append({"name": t["scenarioId"], "lon": t["lon"], "lat": t["lat"],
                    "preStart": t["preStart"], "preEnd": t["preEnd"],
                    "postStart": t["postStart"], "postEnd": t["postEnd"]})
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", nargs="*", default=None, help="只匯出這些清冊編號或情境 id")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    lakes = build_lakes(args.only)
    if not lakes:
        sys.exit("沒有可匯出的湖：確認 --only 的編號正確")
    js = HEADER.format(folder=DRIVE_FOLDER, tasks=len(lakes) + 1, cs=F.CS_THRESHOLD, clear_frac=F.CLEAR_FRAC,
                       mndwi=S2_WATER_MNDWI_MIN, nir=S2_WATER_NIR_MAX, buffer=F.BUFFER_M, window=F.WINDOW_M,
                       lakes=json.dumps(lakes, ensure_ascii=False, indent=1))
    Path(args.out).write_text(js, encoding="utf-8")
    print(f"寫出 {args.out}：{len(lakes)} 座湖，匯出工作 {len(lakes) + 1} 個（每湖一張影像＋一個 CSV）")


if __name__ == "__main__":
    main()
