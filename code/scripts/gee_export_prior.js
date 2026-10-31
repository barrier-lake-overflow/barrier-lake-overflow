// 由 scripts/gee_codeeditor_prior.py 產生，請勿手動編輯。
// A1 崩塌堆積提醒：匯出每個案例「一年前」的 VV 基準（事件前基準期間往前推一年的中位數），
// 存到 Google Drive 資料夾 prior_s1/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 24 個）。
// 下載 Drive 上的 prior_s1/ 資料夾，放到 data/raw/sentinel1/prior_exports/，
// 再到 code/ 底下跑 python scripts/split_prior_exports.py。

var NODATA = -32768.0;
var CASES = [
 {
  "name": "matai_an_2025",
  "lon": 121.29752,
  "lat": 23.70061,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2025-06-01",
  "preEnd": "2025-07-18"
 },
 {
  "name": "neg2026_matai_an",
  "lon": 121.29752,
  "lat": 23.70061,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-03-01",
  "preEnd": "2026-05-31"
 },
 {
  "name": "inv_bl051",
  "lon": 121.51907,
  "lat": 24.81997,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-06-08",
  "preEnd": "2015-08-07"
 },
 {
  "name": "inv_bl052",
  "lon": 121.42685,
  "lat": 24.16742,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-06-06",
  "preEnd": "2015-08-05"
 },
 {
  "name": "inv_bl053",
  "lon": 121.55162,
  "lat": 24.17193,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-11-21",
  "preEnd": "2016-01-20"
 },
 {
  "name": "inv_bl054",
  "lon": 121.37322,
  "lat": 24.8075,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2016-06-13",
  "preEnd": "2016-08-12"
 },
 {
  "name": "inv_bl056",
  "lon": 121.22889,
  "lat": 22.94524,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2016-05-03",
  "preEnd": "2016-07-02"
 },
 {
  "name": "inv_bl057",
  "lon": 121.37434,
  "lat": 23.73653,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-12-31",
  "preEnd": "2016-02-29"
 },
 {
  "name": "inv_bl058",
  "lon": 120.75151,
  "lat": 23.70828,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2017-03-28",
  "preEnd": "2017-05-27"
 },
 {
  "name": "inv_bl060",
  "lon": 120.7682,
  "lat": 24.21974,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2019-06-15",
  "preEnd": "2019-08-14"
 },
 {
  "name": "inv_bl061",
  "lon": 120.95323,
  "lat": 22.72525,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2020-11-30",
  "preEnd": "2021-01-29"
 },
 {
  "name": "inv_bl062",
  "lon": 121.4044,
  "lat": 24.67563,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2021-04-13",
  "preEnd": "2021-06-12"
 },
 {
  "name": "inv_bl063",
  "lon": 121.25644,
  "lat": 23.4965,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2021-08-31",
  "preEnd": "2021-10-30"
 },
 {
  "name": "inv_bl064",
  "lon": 121.05426,
  "lat": 23.16209,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2022-09-14",
  "preEnd": "2022-11-13"
 },
 {
  "name": "inv_bl065",
  "lon": 121.293,
  "lat": 23.77814,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-01-06",
  "preEnd": "2024-03-06"
 },
 {
  "name": "inv_bl066",
  "lon": 121.37851,
  "lat": 24.00896,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-02-07",
  "preEnd": "2024-04-07"
 },
 {
  "name": "inv_bl067",
  "lon": 120.67236,
  "lat": 22.37236,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-07-30",
  "preEnd": "2024-09-28"
 },
 {
  "name": "inv_bl068",
  "lon": 121.34463,
  "lat": 24.56425,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-08-27",
  "preEnd": "2024-10-26"
 },
 {
  "name": "inv_bl069",
  "lon": 121.1592,
  "lat": 23.38086,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-11-19",
  "preEnd": "2025-01-18"
 },
 {
  "name": "inv_bl070",
  "lon": 120.66859,
  "lat": 23.57874,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2025-05-02",
  "preEnd": "2025-07-01"
 },
 {
  "name": "inv_bl072",
  "lon": 121.55913,
  "lat": 24.17315,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2025-08-11",
  "preEnd": "2025-10-10"
 },
 {
  "name": "inv_bl073",
  "lon": 121.24971,
  "lat": 24.16209,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-01-30",
  "preEnd": "2026-03-31"
 },
 {
  "name": "inv_bl074",
  "lon": 120.69867,
  "lat": 23.66271,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-04-07",
  "preEnd": "2026-06-06"
 },
 {
  "name": "inv_bl075",
  "lon": 121.26957,
  "lat": 23.79204,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2026-04-14",
  "preEnd": "2026-06-13"
 }
];

CASES.forEach(function (k) {
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
  Export.image.toDrive({
    image: img.rename('prior').toFloat().unmask(NODATA), description: 'PRIOR_' + k.name,
    folder: 'prior_s1', fileNamePrefix: 'PRIOR_' + k.name,
    region: aoi, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9, fileFormat: 'GeoTIFF'
  });
  print(k.name, k.pass, k.orbit, '一年前基準', start.format('YYYY-MM-dd'), '～', end.format('YYYY-MM-dd'),
        col.size(), '張');
});
