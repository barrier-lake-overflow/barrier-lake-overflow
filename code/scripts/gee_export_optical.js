// 由 scripts/gee_codeeditor_optical.py 產生，請勿手動編輯。
// 光學候選來源實驗：每湖一個多波段 GeoTIFF ＋ 一個 CSV，匯出到 Google Drive 資料夾 replay_optical/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 25 個）。
// 下載 Drive 上的 replay_optical/ 資料夾，放到 data/raw/optical/exports/，
// 再到 code/ 底下跑 python scripts/split_optical_exports.py。

var CS = 0.65, CLEAR_FRAC = 0.5, MNDWI_MIN = 0.0, NIR_MAX = 500.0;
var FOLDER = 'replay_optical';
var LAKES = [
 {
  "name": "inv_bl051",
  "lon": 121.51907,
  "lat": 24.81997,
  "preStart": "2015-06-08",
  "preEnd": "2015-08-07",
  "postStart": "2015-08-07",
  "postEnd": "2015-10-13"
 },
 {
  "name": "inv_bl052",
  "lon": 121.42685,
  "lat": 24.16742,
  "preStart": "2015-06-06",
  "preEnd": "2015-08-05",
  "postStart": "2015-08-05",
  "postEnd": "2015-10-11"
 },
 {
  "name": "inv_bl053",
  "lon": 121.55162,
  "lat": 24.17193,
  "preStart": "2015-11-21",
  "preEnd": "2016-01-20",
  "postStart": "2016-01-20",
  "postEnd": "2016-03-27"
 },
 {
  "name": "inv_bl054",
  "lon": 121.37322,
  "lat": 24.8075,
  "preStart": "2016-06-13",
  "preEnd": "2016-08-12",
  "postStart": "2016-08-12",
  "postEnd": "2016-10-18"
 },
 {
  "name": "inv_bl056",
  "lon": 121.22889,
  "lat": 22.94524,
  "preStart": "2016-05-03",
  "preEnd": "2016-07-02",
  "postStart": "2016-07-02",
  "postEnd": "2016-09-07"
 },
 {
  "name": "inv_bl057",
  "lon": 121.37434,
  "lat": 23.73653,
  "preStart": "2015-12-31",
  "preEnd": "2016-02-29",
  "postStart": "2016-02-29",
  "postEnd": "2016-05-06"
 },
 {
  "name": "inv_bl058",
  "lon": 120.75151,
  "lat": 23.70828,
  "preStart": "2017-03-28",
  "preEnd": "2017-05-27",
  "postStart": "2017-05-27",
  "postEnd": "2017-08-02"
 },
 {
  "name": "inv_bl060",
  "lon": 120.7682,
  "lat": 24.21974,
  "preStart": "2019-06-15",
  "preEnd": "2019-08-14",
  "postStart": "2019-08-14",
  "postEnd": "2019-10-20"
 },
 {
  "name": "inv_bl061",
  "lon": 120.95323,
  "lat": 22.72525,
  "preStart": "2020-11-30",
  "preEnd": "2021-01-29",
  "postStart": "2021-01-29",
  "postEnd": "2021-04-06"
 },
 {
  "name": "inv_bl062",
  "lon": 121.4044,
  "lat": 24.67563,
  "preStart": "2021-04-13",
  "preEnd": "2021-06-12",
  "postStart": "2021-06-12",
  "postEnd": "2021-08-18"
 },
 {
  "name": "inv_bl063",
  "lon": 121.25644,
  "lat": 23.4965,
  "preStart": "2021-08-31",
  "preEnd": "2021-10-30",
  "postStart": "2021-10-30",
  "postEnd": "2022-01-05"
 },
 {
  "name": "inv_bl064",
  "lon": 121.05426,
  "lat": 23.16209,
  "preStart": "2022-09-14",
  "preEnd": "2022-11-13",
  "postStart": "2022-11-13",
  "postEnd": "2023-01-19"
 },
 {
  "name": "inv_bl065",
  "lon": 121.293,
  "lat": 23.77814,
  "preStart": "2024-01-06",
  "preEnd": "2024-03-06",
  "postStart": "2024-03-06",
  "postEnd": "2024-05-12"
 },
 {
  "name": "inv_bl066",
  "lon": 121.37851,
  "lat": 24.00896,
  "preStart": "2024-02-07",
  "preEnd": "2024-04-07",
  "postStart": "2024-04-07",
  "postEnd": "2024-06-13"
 },
 {
  "name": "inv_bl067",
  "lon": 120.67236,
  "lat": 22.37236,
  "preStart": "2024-07-30",
  "preEnd": "2024-09-28",
  "postStart": "2024-09-28",
  "postEnd": "2024-12-04"
 },
 {
  "name": "inv_bl068",
  "lon": 121.34463,
  "lat": 24.56425,
  "preStart": "2024-08-27",
  "preEnd": "2024-10-26",
  "postStart": "2024-10-26",
  "postEnd": "2025-01-01"
 },
 {
  "name": "inv_bl069",
  "lon": 121.1592,
  "lat": 23.38086,
  "preStart": "2024-11-19",
  "preEnd": "2025-01-18",
  "postStart": "2025-01-18",
  "postEnd": "2025-03-26"
 },
 {
  "name": "inv_bl070",
  "lon": 120.66859,
  "lat": 23.57874,
  "preStart": "2025-05-02",
  "preEnd": "2025-07-01",
  "postStart": "2025-07-01",
  "postEnd": "2025-09-06"
 },
 {
  "name": "matai_an_2025",
  "lon": 121.29752,
  "lat": 23.70061,
  "preStart": "2025-05-15",
  "preEnd": "2025-07-14",
  "postStart": "2025-07-14",
  "postEnd": "2025-09-19"
 },
 {
  "name": "inv_bl072",
  "lon": 121.55913,
  "lat": 24.17315,
  "preStart": "2025-08-11",
  "preEnd": "2025-10-10",
  "postStart": "2025-10-10",
  "postEnd": "2025-12-16"
 },
 {
  "name": "inv_bl073",
  "lon": 121.24971,
  "lat": 24.16209,
  "preStart": "2026-01-30",
  "preEnd": "2026-03-31",
  "postStart": "2026-03-31",
  "postEnd": "2026-06-06"
 },
 {
  "name": "inv_bl074",
  "lon": 120.69867,
  "lat": 23.66271,
  "preStart": "2026-04-07",
  "preEnd": "2026-06-06",
  "postStart": "2026-06-06",
  "postEnd": "2026-08-12"
 },
 {
  "name": "inv_bl075",
  "lon": 121.26957,
  "lat": 23.79204,
  "preStart": "2026-04-14",
  "preEnd": "2026-06-13",
  "postStart": "2026-06-13",
  "postEnd": "2026-08-19"
 },
 {
  "name": "neg2026_matai_an",
  "lon": 121.29752,
  "lat": 23.70061,
  "preStart": "2026-03-29",
  "preEnd": "2026-05-28",
  "postStart": "2026-05-28",
  "postEnd": "2026-09-30"
 }
];

var SENSORS = {
  s2: {id: 'COPERNICUS/S2_SR_HARMONIZED', sat: 'SPACECRAFT_NAME', b: ['B3', 'B4', 'B8', 'B11']},
  l8: {id: 'LANDSAT/LC08/C02/T1_L2', sat: 'SPACECRAFT_ID', b: ['SR_B3', 'SR_B4', 'SR_B5', 'SR_B6']},
  l9: {id: 'LANDSAT/LC09/C02/T1_L2', sat: 'SPACECRAFT_ID', b: ['SR_B3', 'SR_B4', 'SR_B5', 'SR_B6']}
};
var CSP = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');

function coll(key, region, start, end) {
  var c = ee.ImageCollection(SENSORS[key].id).filterBounds(region).filterDate(start, end);
  if (key === 's2') {
    // Cloud Score+ 缺的景補全遮罩波段（整景當雲遮）
    var nocs = ee.Image.constant(0).float().rename('cs_cdf').updateMask(0);
    c = c.linkCollection(CSP, ['cs_cdf']).map(function (i) {
      return ee.Image(ee.Algorithms.If(i.bandNames().contains('cs_cdf'), i, i.addBands(nocs)));
    });
  }
  return c;
}

// 單景 → 綠、紅、近紅外、短波紅外（反射率 × 10000），非晴空像元遮掉
function refl(key, img) {
  var bands, clear;
  if (key === 's2') {
    bands = img.select(SENSORS[key].b, ['g', 'r', 'n', 's']).toFloat();
    clear = img.select('cs_cdf').gte(CS);
  } else {
    bands = img.select(SENSORS[key].b, ['g', 'r', 'n', 's']).multiply(0.275).add(-2000);
    var qa = img.select('QA_PIXEL');
    clear = qa.bitwiseAnd(30).eq(0).and(qa.bitwiseAnd(1).eq(0));   // bit 1～4 雲類；bit 0 無資料
  }
  return bands.updateMask(clear);
}

// 判水＋NDVI 編成一個 int16 波段：非晴空 −1；晴空 (round(NDVI×1000)+1000)×2 + 是否為水
function encode(r) {
  var g = r.select('g'), red = r.select('r'), n = r.select('n'), s = r.select('s');
  var water = g.subtract(s).divide(g.add(s)).gt(MNDWI_MIN).and(n.lt(NIR_MAX));
  var ndvi = n.subtract(red).divide(n.add(red)).clamp(-1, 1);
  return ndvi.multiply(1000).round().add(1000).multiply(2).add(water).unmask(-1).toInt16().rename('v');
}

var rows = [];
LAKES.forEach(function (k) {
  var pt = ee.Geometry.Point([k.lon, k.lat]);
  var region = pt.buffer(2500).bounds();
  var win = pt.buffer(2000).bounds();

  var preAll = coll('s2', region, k.preStart, k.preEnd).map(function (i) { return refl('s2', i); })
    .merge(coll('l8', region, k.preStart, k.preEnd).map(function (i) { return refl('l8', i); }))
    .merge(coll('l9', region, k.preStart, k.preEnd).map(function (i) { return refl('l9', i); }));

  // 同一天同一顆衛星的相鄰圖幅併成一景，算 4 km 窗格晴空比例
  function daily(key) {
    var c = coll(key, region, k.postStart, k.postEnd).map(function (i) {
      return i.set('dkey', ee.String(i.get(SENSORS[key].sat)).cat('|')
        .cat(ee.Date(i.get('system:time_start')).format('YYYY-MM-dd')));
    });
    return ee.ImageCollection.fromImages(c.aggregate_array('dkey').distinct().map(function (dk) {
      var sub = c.filter(ee.Filter.eq('dkey', dk));
      var first = ee.Image(sub.sort('system:time_start').first());
      var img = encode(refl(key, sub.mosaic()));
      var clear = img.gte(0).reduceRegion({reducer: ee.Reducer.mean(), geometry: win, scale: 30,
                                           maxPixels: 1e8}).get('v');
      return img.set({key: key, sat: first.get(SENSORS[key].sat), clear: clear,
                      'system:time_start': first.get('system:time_start')});
    }));
  }
  var scenes = daily('s2').merge(daily('l8')).merge(daily('l9')).sort('system:time_start');
  var usable = scenes.filter(ee.Filter.gte('clear', CLEAR_FRAC)).sort('system:time_start');

  var img = ee.Image.cat([
    encode(preAll.median()).rename('pre'),
    preAll.select('g').count().unmask(0).toInt16().rename('precount'),
    ee.Image('NASA/NASADEM_HGT/001').select('elevation').resample('bilinear').round().toInt16().rename('dem'),
    usable.toBands()
  ]).toInt16();
  Export.image.toDrive({
    image: img, description: k.name, folder: FOLDER, fileNamePrefix: k.name,
    region: region, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9, fileFormat: 'GeoTIFF'
  });

  rows.push(ee.FeatureCollection([ee.Feature(null, {lake: k.name, type: 'pre', n: preAll.size()})]));
  rows.push(ee.FeatureCollection(scenes.toList(1000).map(function (s) {
    s = ee.Image(s);
    return ee.Feature(null, {lake: k.name, type: 'scene', key: s.get('key'), sat: s.get('sat'),
                             ms: s.get('system:time_start'), clear: s.get('clear')});
  })));
  print(k.name);
});

Export.table.toDrive({
  collection: ee.FeatureCollection(rows).flatten(), description: 'optical_scenes', folder: FOLDER,
  fileNamePrefix: 'optical_scenes', fileFormat: 'CSV',
  selectors: ['lake', 'type', 'key', 'sat', 'ms', 'clear', 'n']
});
