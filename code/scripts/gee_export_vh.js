// 由 scripts/gee_codeeditor_vh.py 產生，請勿手動編輯。
// B2 實驗：匯出 VH 影像（期別與 VV 相同），每個案例一個多波段 GeoTIFF，存到 Google Drive 資料夾 vh_s1/。
// 用法：貼到 https://code.earthengine.google.com 按 Run → 右側 Tasks 分頁逐一按 RUN（共 24 個）。
// 下載 Drive 上的 vh_s1/ 資料夾，放到 data/raw/sentinel1/vh_exports/，
// 再到 code/ 底下跑 python scripts/split_vh_exports.py。

var NODATA = -32768.0;
var CASES = [
 {
  "name": "matai_an_2025",
  "lon": 121.29752,
  "lat": 23.70061,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2025-06-01",
  "preEnd": "2025-07-18",
  "pick": "first",
  "days": [
   "20250722",
   "20250728",
   "20250803",
   "20250821",
   "20250827"
  ]
 },
 {
  "name": "neg2026_matai_an",
  "lon": 121.29752,
  "lat": 23.70061,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-03-01",
  "preEnd": "2026-05-31",
  "pick": "mosaic",
  "days": [
   "20260605",
   "20260606",
   "20260611",
   "20260618",
   "20260623",
   "20260624",
   "20260630",
   "20260706",
   "20260712",
   "20260718",
   "20260724",
   "20260730",
   "20260811",
   "20260823",
   "20260904",
   "20260916",
   "20260928"
  ]
 },
 {
  "name": "inv_bl051",
  "lon": 121.51907,
  "lat": 24.81997,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-06-08",
  "preEnd": "2015-08-07",
  "days": [
   "20150818",
   "20150830",
   "20150911",
   "20151005"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl052",
  "lon": 121.42685,
  "lat": 24.16742,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-06-06",
  "preEnd": "2015-08-05",
  "days": [
   "20150806",
   "20150818",
   "20150830",
   "20150911",
   "20151005"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl053",
  "lon": 121.55162,
  "lat": 24.17193,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-11-21",
  "preEnd": "2016-01-20",
  "days": [
   "20160202",
   "20160214",
   "20160226",
   "20160309",
   "20160321"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl054",
  "lon": 121.37322,
  "lat": 24.8075,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2016-06-13",
  "preEnd": "2016-08-12",
  "days": [
   "20160812",
   "20160905",
   "20160917",
   "20160929",
   "20161011"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl056",
  "lon": 121.22889,
  "lat": 22.94524,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2016-05-03",
  "preEnd": "2016-07-02",
  "days": [
   "20160707",
   "20160719",
   "20160731",
   "20160812",
   "20160824",
   "20160905"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl057",
  "lon": 121.37434,
  "lat": 23.73653,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2015-12-31",
  "preEnd": "2016-02-29",
  "days": [
   "20160309",
   "20160321",
   "20160414"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl058",
  "lon": 120.75151,
  "lat": 23.70828,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2017-03-28",
  "preEnd": "2017-05-27",
  "days": [
   "20170527",
   "20170608",
   "20170702",
   "20170714",
   "20170726"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl060",
  "lon": 120.7682,
  "lat": 24.21974,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2019-06-15",
  "preEnd": "2019-08-14",
  "days": [
   "20190815",
   "20190821",
   "20190827",
   "20190902",
   "20190908",
   "20190920",
   "20190926",
   "20191002",
   "20191008",
   "20191014"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl061",
  "lon": 120.95323,
  "lat": 22.72525,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2020-11-30",
  "preEnd": "2021-01-29",
  "days": [
   "20210130",
   "20210211",
   "20210223",
   "20210307",
   "20210319",
   "20210331"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl062",
  "lon": 121.4044,
  "lat": 24.67563,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2021-04-13",
  "preEnd": "2021-06-12",
  "days": [
   "20210613",
   "20210619",
   "20210625",
   "20210701",
   "20210707",
   "20210713",
   "20210719",
   "20210725",
   "20210731",
   "20210806",
   "20210812"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl063",
  "lon": 121.25644,
  "lat": 23.4965,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2021-08-31",
  "preEnd": "2021-10-30",
  "days": [
   "20211102",
   "20211108",
   "20211114",
   "20211120",
   "20211126",
   "20211202",
   "20211208",
   "20211214",
   "20211220",
   "20220101"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl064",
  "lon": 121.05426,
  "lat": 23.16209,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2022-09-14",
  "preEnd": "2022-11-13",
  "days": [
   "20221121",
   "20221203",
   "20221215",
   "20221227",
   "20230108"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl065",
  "lon": 121.293,
  "lat": 23.77814,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-01-06",
  "preEnd": "2024-03-06",
  "days": [
   "20240315",
   "20240327",
   "20240408",
   "20240420",
   "20240502"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl066",
  "lon": 121.37851,
  "lat": 24.00896,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-02-07",
  "preEnd": "2024-04-07",
  "days": [
   "20240408",
   "20240420",
   "20240502",
   "20240526",
   "20240607"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl067",
  "lon": 120.67236,
  "lat": 22.37236,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-07-30",
  "preEnd": "2024-09-28",
  "days": [
   "20241005",
   "20241017",
   "20241029",
   "20241110",
   "20241122"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl068",
  "lon": 121.34463,
  "lat": 24.56425,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-08-27",
  "preEnd": "2024-10-26",
  "days": [
   "20241029",
   "20241110",
   "20241122",
   "20241204",
   "20241216",
   "20241228"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl069",
  "lon": 121.1592,
  "lat": 23.38086,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2024-11-19",
  "preEnd": "2025-01-18",
  "days": [
   "20250121",
   "20250202",
   "20250214",
   "20250226",
   "20250310",
   "20250322"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl070",
  "lon": 120.66859,
  "lat": 23.57874,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2025-05-02",
  "preEnd": "2025-07-01",
  "days": [
   "20250708",
   "20250720",
   "20250801",
   "20250813",
   "20250819",
   "20250825",
   "20250831"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl072",
  "lon": 121.55913,
  "lat": 24.17315,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2025-08-11",
  "preEnd": "2025-10-10",
  "days": [
   "20251012",
   "20251018",
   "20251024",
   "20251030",
   "20251105",
   "20251111",
   "20251123",
   "20251129",
   "20251205",
   "20251211"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl073",
  "lon": 121.24971,
  "lat": 24.16209,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-01-30",
  "preEnd": "2026-03-31",
  "days": [
   "20260331",
   "20260406",
   "20260412",
   "20260418",
   "20260419",
   "20260424",
   "20260430",
   "20260501",
   "20260506",
   "20260512",
   "20260513",
   "20260518",
   "20260524",
   "20260525",
   "20260530"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl074",
  "lon": 120.69867,
  "lat": 23.66271,
  "pass": "DESCENDING",
  "orbit": 105,
  "preStart": "2026-04-07",
  "preEnd": "2026-06-06",
  "days": [
   "20260605",
   "20260606",
   "20260611",
   "20260618",
   "20260623",
   "20260624",
   "20260630",
   "20260706",
   "20260712",
   "20260718",
   "20260724",
   "20260730"
  ],
  "pick": "mosaic"
 },
 {
  "name": "inv_bl075",
  "lon": 121.26957,
  "lat": 23.79204,
  "pass": "ASCENDING",
  "orbit": 69,
  "preStart": "2026-04-14",
  "preEnd": "2026-06-13",
  "days": [
   "20260621",
   "20260628",
   "20260710",
   "20260722",
   "20260803",
   "20260809",
   "20260815"
  ],
  "pick": "mosaic"
 }
];

CASES.forEach(function (k) {
  var aoi = ee.Geometry.Point([k.lon, k.lat]).buffer(5000).bounds();
  var s = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(aoi)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', k.pass))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', k.orbit))
    .select('VH');
  var bands = [s.filterDate(k.preStart, k.preEnd).median().rename('pre')];
  k.days.forEach(function (d) {
    var start = ee.Date(d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8));
    var day = s.filterDate(start, start.advance(1, 'day'));
    var img = k.pick === 'first' ? ee.Image(day.first()) : day.mosaic();
    bands.push(img.rename('d' + d));
  });
  Export.image.toDrive({
    image: ee.Image.cat(bands).toFloat().unmask(NODATA), description: 'VH_' + k.name, folder: 'vh_s1',
    fileNamePrefix: 'VH_' + k.name, region: aoi, scale: 10, crs: 'EPSG:4326', maxPixels: 1e9,
    fileFormat: 'GeoTIFF'
  });
  print(k.name, k.pass, k.orbit, k.days.length + ' 期');
});
