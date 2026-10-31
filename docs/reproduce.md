# 開發環境與重現步驟

怎麼安裝、怎麼重產儀表板資料、怎麼從頭重跑驗證結果（[`validation.md`](validation.md)）。
所有分析程式的用途見 [`code/scripts/README.md`](../code/scripts/README.md)；每日自動更新與排程見 [`daily.md`](daily.md)。

## 開發環境

需要 Python 3.11 以上。

```bash
python3 -m venv .venv && source .venv/bin/activate      # Windows：python -m venv .venv，再 .venv\Scripts\activate
pip install -r requirements.txt
cd code && pip install -e .
```

證據圖與航照處理另外需要 `matplotlib`、`Pillow`。給沒裝 Python 的人用、而且資料會更新的做法見 [`portable-distribution.md`](portable-distribution.md)。

## 常用指令

以下都在 `code/` 底下執行：

```bash
pytest                                                 # 全部測試

python -m pipeline.build_all                           # 清冊 → lakes.js、風險 → risk.js、成因敘述、事件佇列 events.js
python -m pipeline.build_all --project <GCP 專案 ID>    # 風險改用 GSMaP 衛星雨量（Google Earth Engine）
python -m pipeline.daily.run --project <GCP 專案 ID>    # 每日自動更新：清冊、警戒、雨量、Sentinel-1、新聞候選
```

雨量一律用 GSMaP v8 雨量計校正版（Google Earth Engine），不需要 CWA 金鑰；沒給 `--project` 時風險用訓練平均值佔位，不會失敗。

各步驟也可以單獨跑：

```bash
python -m pipeline.ingest.inventory ../data/raw/taiwan-barrier-lakes.csv dashboard/data/lakes.js
python -m pipeline.attribution.annotate
python -m pipeline.ingest.risk            # 加 --offline 不連網
python -m pipeline.ingest.observations    # 看 observations.csv 填了幾筆
python -m pipeline.events.build           # SAR 結果 → 事件佇列 events.js（情境設定在 data/raw/scenarios/）
```

每個模組直接執行會跑自己的 doctest 和合成資料示範，例如：

```bash
python -m pipeline.detect.barrier_lake   # 四種合成情境的 A/B/C 分級
python -m pipeline.assess.hypsometry
python -m pipeline.attribution.forecast
```

儀表板用的字型放在本機（`code/dashboard/vendor/fonts/`），資料或頁面出現新的字時，在 `code/` 底下跑 `python scripts/vendor_fonts.py`。

## 馬太鞍溪正案例

1. 在 Google Earth Engine 執行 `code/scripts/gee_export_matai_an_s1.js`，匯出 8 張 Sentinel-1（含一年前基準）與 1 張 DEM，
   放到 `data/raw/sentinel1/`（這批影像已進版控，可略過此步）。
2. 在 `code/` 底下：

```bash
scripts\run_sar_all.bat                 # Windows：四個日期、同一組參數 → data/derived/final_*.json
python scripts/make_sar_evidence.py     # 影像證據圖 → docs/evidence/*.png（需 matplotlib）
```

單一日期可直接呼叫 `scripts/analyze_sar_change.py`，常用選項：
`--max-water-slope-deg`（坡度門檻）、`--debug-components`（列出被淘汰的水體塊與原因）、
`--prior-baseline`（一年前基準，標出既有崩塌堆積）、`--dashboard-out dashboard/data/inundation.js`（把最高等級候選寫進儀表板）。

## 2026 汛期負案例

1. 在 GEE 執行 `code/scripts/gee_export_series_s1.js`（預設同一個馬太鞍溪窗格、2026-06～09），
   匯出的檔案放到 `data/raw/sentinel1/`，Console 會印出過境時間（這批影像已進版控，可略過此步）。
2. 在 `code/` 底下：

```bash
python scripts/run_sar_series.py --name neg2026_matai_an --lon 121.29752 --lat 23.70061 --pass-time 21:52 --scenario-name "馬太鞍溪 · 2026 汛期（負案例）" --kind negative
python -m pipeline.events.build
```

參數與正案例相同，不另外調。結果若出現高優先事件，要當成需要查證的發現，不要回頭調參數。

3. 查證 E1：在 GEE 執行 `code/scripts/gee_check_s2_e1.js`，把 `S2_E1_check_2026.tif` 放到 `data/raw/sentinel2/`
   （這個檔案已進版控，可略過 GEE），再跑 `python scripts/check_neg_e1.py`（印出逐期統計，並產生 `docs/evidence/neg2026_e1_*.png`）。

## 全清冊回放

影像約 1 GB，不進版控；結果檔 `data/derived/final_inv_*.json` 與情境檔 `data/raw/scenarios/inv_*.json` 有進版控，
只想重產儀表板直接跑最後一行即可。要從頭重跑（需要 Earth Engine 帳號與已啟用 Earth Engine API 的 GCP 專案）：

```bash
earthengine authenticate                                       # 第一次用
python scripts/gee_fetch_inventory.py --project <GCP 專案 ID>    # 選湖、挑軌道、下載到 data/raw/sentinel1/replay/（含一年前基準）
python scripts/run_inventory_replay.py                          # 逐湖逐期偵測
python -m pipeline.events.build                                 # 回放＋統計 → dashboard/data/events.js、replay.js
```

每湖選了哪一軌、哪幾期，記在 `data/raw/replay_manifest.json`。

本機無法登入 Earth Engine 時，可改用 GEE 網頁版：`scripts/gee_export_inventory.js`（回放影像）與
`scripts/gee_export_prior.js`（一年前基準）貼到 Code Editor 執行，從 Google Drive 下載後用
`split_inventory_exports.py`、`split_prior_exports.py` 拆檔，期別照 `replay_manifest.json`，結果與原本相同。

光學 NDWI（`scripts/analyze_ndwi_change.py`）與 DEM 蓄水量（`scripts/run_hypsometry_real.py`）的腳本保留，
但馬太鞍溪的結果因面積依據有誤已撤下。
