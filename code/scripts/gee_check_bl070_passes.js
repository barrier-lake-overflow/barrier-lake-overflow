// 草嶺（bl070）漏報診斷：湖存在期間（2025-07-08 晚間堵塞 → 07-09 18:20 溢流 → 07-11 幾乎退光）
// 有哪些衛星影像。貼到 https://code.earthengine.google.com 按 Run，把 Console 的輸出整段貼回來。
// 只查詢、不匯出，不需要按 Tasks。

var DAM = ee.Geometry.Point([120.66859, 23.57874]);   // 清冊壩址
var START = '2025-07-06', END = '2025-07-21';

function tw(img) {   // 台灣時間字串
  return ee.Date(img.get('system:time_start')).format('YYYY-MM-dd HH:mm', 'Asia/Taipei');
}

// 1. Sentinel-1：所有軌道、升降軌
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(DAM).filterDate(START, END)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .sort('system:time_start');
print('Sentinel-1 過境（台灣時間｜升降軌｜相對軌道｜極化）',
  s1.map(function (img) {
    return ee.Feature(null, {
      tw: tw(img), pass: img.get('orbitProperties_pass'),
      orbit: img.get('relativeOrbitNumber_start'),
      pol: ee.List(img.get('transmitterReceiverPolarisation')).join('+')
    });
  }).reduceColumns(ee.Reducer.toList(4), ['tw', 'pass', 'orbit', 'pol']).get('list'));

// 2. Sentinel-2：壩址周圍 2 km 的雲量（Cloud Score+，cs_cdf ≥ 0.65 算晴空）
var aoi = DAM.buffer(2000).bounds();
var cs = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(DAM).filterDate(START, END)
  .linkCollection(cs, ['cs_cdf'])
  .sort('system:time_start');
print('Sentinel-2（台灣時間｜整景雲量 %｜壩址 2 km 內晴空比例）',
  s2.map(function (img) {
    var clear = img.select('cs_cdf').gte(0.65)
      .reduceRegion({reducer: ee.Reducer.mean(), geometry: aoi, scale: 20, maxPixels: 1e8})
      .get('cs_cdf');
    return ee.Feature(null, {tw: tw(img), cloud: img.get('CLOUDY_PIXEL_PERCENTAGE'), clear: clear});
  }).reduceColumns(ee.Reducer.toList(3), ['tw', 'cloud', 'clear']).get('list'));

// 3. Landsat 8/9
var ls = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .merge(ee.ImageCollection('LANDSAT/LC09/C02/T1_L2'))
  .filterBounds(DAM).filterDate(START, END)
  .sort('system:time_start');
print('Landsat 8/9（台灣時間｜雲量 %）',
  ls.map(function (img) {
    return ee.Feature(null, {tw: tw(img), cloud: img.get('CLOUD_COVER')});
  }).reduceColumns(ee.Reducer.toList(2), ['tw', 'cloud']).get('list'));
