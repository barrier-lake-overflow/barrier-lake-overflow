// 負案例 E1 查證：2026 汛期 Sentinel-2 逐期影像 + 每期統計表（共 2 個匯出任務）
// 下載後：S2_E1_check_2026.tif 放到 data/raw/sentinel2/，再在 code/ 底下跑
//     python scripts/check_neg_e1.py
// （或直接 python scripts/check_neg_e1.py --fetch --project <GCP 專案 ID>，由 Python 抓同樣的影像）
// 雲遮罩用 Cloud Score+（cs_cdf，乘 10000 存成整數），不用 L2A 的 SCL 地物分類。
// CSV（每期 E1 周圍 30 m 的 MNDWI、晴空比例、太陽角度）是快速檢查用，不是程式輸入。
var dam = ee.Geometry.Point([121.29752, 23.70061]);
var e1  = ee.Geometry.Point([121.3025, 23.7001]);
var aoi = dam.buffer(1500).bounds();   // 壩址周圍 3 km 見方
var CS_THRESHOLD = 0.65;               // 與底圖（pipeline/daily/basemap.py）相同

var cs = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2026-06-01', '2026-10-01')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
  .linkCollection(cs, ['cs_cdf'])
  .sort('system:time_start');

// 1) 影像：每期 B2 B3 B4 B8 B11 + CS（Cloud Score+ × 10000），合成一個檔案
var BANDS = ['B2', 'B3', 'B4', 'B8', 'B11', 'CS'];
var stack = s2.map(function (img) {
  var d = img.date().format('YYYYMMdd');
  return img.addBands(img.select('cs_cdf').multiply(10000).rename('CS'))
    .select(BANDS).toUint16()
    .rename(ee.List(BANDS).map(function (b) { return ee.String(b).cat('_').cat(d); }));
}).toBands();
Export.image.toDrive({image: stack, description: 'S2_E1_check_2026', region: aoi,
  scale: 10, crs: 'EPSG:4326', maxPixels: 1e9});

// 2) 統計表：每期 E1 周圍 30 m 的 MNDWI、晴空比例，以及太陽方位角、天頂角
var table = s2.map(function (img) {
  var m = img.normalizedDifference(['B3', 'B11']).rename('MNDWI')
    .reduceRegion(ee.Reducer.mean(), e1.buffer(30), 10);
  var clear = img.select('cs_cdf').gte(CS_THRESHOLD)
    .reduceRegion(ee.Reducer.mean(), e1.buffer(30), 10);
  return ee.Feature(null, {
    date: img.date().format('YYYY-MM-dd HH:mm'),
    mndwi: m.get('MNDWI'),
    clear_frac: clear.get('cs_cdf'),
    cloud_pct: img.get('CLOUDY_PIXEL_PERCENTAGE'),
    sun_azimuth: img.get('MEAN_SOLAR_AZIMUTH_ANGLE'),
    sun_zenith: img.get('MEAN_SOLAR_ZENITH_ANGLE')
  });
});
Export.table.toDrive({collection: table, description: 'S2_E1_check_2026_table', fileFormat: 'CSV'});
print('期數', s2.size());
