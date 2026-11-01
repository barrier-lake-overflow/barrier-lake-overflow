# scripts — 真實資料的分析與工具

這裡的程式都在 `code/` 底下執行（例如 `python scripts/analyze_sar_change.py …`）。
核心邏輯在 `code/pipeline/`，這裡負責讀檔、下載、串流程、出圖與實驗。
程式之間會互相 import（例如 `run_inventory_replay.py` 用 `run_sar_series.py`，每日自動更新也用它），所以不分子資料夾。

## 正式流程：SAR 偵測與回放

| 程式 | 用途 |
|---|---|
| `analyze_sar_change.py` | 單一期偵測：事件前後 σ⁰ → 新增水體、崩塌 → 候選 A/B/C → `data/derived/final_*.json`。所有流程都呼叫它 |
| `run_sar_all.bat` | 馬太鞍溪 2025 正案例 4 期（同一組參數） |
| `run_sar_series.py` | 一個地點的逐期序列（下一期當複核）＋寫情境檔；2026 負案例、每日監看都用它 |
| `run_inventory_replay.py` | 全清冊回放：依 `data/raw/replay_manifest.json` 每湖逐期偵測、寫情境檔 |
| `show_sar_result.py` | 把結果 JSON 印成摘要 |
| `demo_sar.bat` | 現場展示：重跑馬太鞍溪 → 摘要 → 證據圖 |

偵測參數（坡度 35°、起始坡度 20°、判水 −18 dB）在 `run_sar_series.py` 與 `run_sar_all.bat` 中一致，不逐案調整。
一年前基準（`S1_VV_*_prior.tif`）找得到就自動帶入，供事件卡的崩塌堆積提醒。

## 影像下載（Google Earth Engine）

| 程式 | 方式 | 內容 |
|---|---|---|
| `gee_export_matai_an_s1.js` | GEE 網頁版 | 馬太鞍溪 2025：事件前、5 期、一年前基準、DEM |
| `gee_export_series_s1.js` | GEE 網頁版 | 任一地點的逐期序列（預設 2026 負案例） |
| `gee_fetch_inventory.py` | Python（需 `earthengine authenticate`） | 全清冊回放：選軌道、下載到 `data/raw/sentinel1/replay/`、寫 `replay_manifest.json` |
| `gee_codeeditor_inventory.py` → `gee_export_inventory.js` → `split_inventory_exports.py` | GEE 網頁版 | 本機無法登入 GEE 時的回放影像替代下載（每湖一個多波段檔，再拆成單張） |
| `gee_codeeditor_prior.py` → `gee_export_prior.js` → `split_prior_exports.py` | GEE 網頁版 | 每個案例的一年前基準（崩塌堆積提醒用） |
| `gee_check_s2_e1.js` | GEE 網頁版 | 2026 負案例 E1 的 Sentinel-2 查證影像 |
| `gee_check_bl070_passes.js` | GEE 網頁版 | 草嶺湖存在期間有哪些衛星過境（只列清單） |

`gee_export_*.js` 中由 `gee_codeeditor_*.py` 產生的檔案請勿手動編輯，改產生程式後重產。

## 查證、診斷與證據圖

| 程式 | 用途 |
|---|---|
| `make_sar_evidence.py` | 馬太鞍溪 SAR 證據圖 → `docs/evidence/bl071_sar_*.png`（簡報 P18 使用，重產會改變投影片） |
| `check_neg_e1.py` | 2026 負案例 E1 的 Sentinel-2 查證統計與圖（`docs/evidence/neg2026_e1_*.png`） |
| `diagnose_missed_lake.py` | 漏報診斷：逐關拆解低值像元、依 DEM＋清冊蓄水量推估湖面（草嶺見 `docs/bl070-diagnosis.md`） |
| `prepare_aerial.py` | 航遙分署航照裁切、拼接、逐張判水（原始航照不在專案內） |
| `aerial_lake_check.py` | 航照湖面 vs SAR 偵測（`docs/aerial-validation.md`） |
| `aerial_deposit_check.py` | 誤報位置的地表類型 |
| `aerial_dashboard.py` | 航照放進值班佇列小地圖與外部證據 |
| `fs8_dashboard.py` | 福衛八號水面與裸露堆積範圍放上小地圖（`dashboard/data/fs8.js`，只有向量、不含影像） |

## 參數與實驗（結果寫在 `docs/parameters.md`）

| 程式 | 用途 |
|---|---|
| `sensitivity_replay.py` | 單參數敏感度 → `docs/results/sensitivity.json` |
| `tune_replay.py` | 調參與留一交叉驗證 → `docs/results/tuning.json` |
| `hysteresis_replay.py` | 坡度雙門檻比較 → `docs/results/hysteresis.json` |
| `run_experiment.py` | 實驗性修改：用正式參數重跑全部案例到 `data/experiments/<名稱>/`，與正式結果並排比較（B1 射線追蹤、B2 VH、崩塌堆積提醒都用它） |
| `old_landslide_threshold.py` | 崩塌堆積提醒的門檻分析 → `docs/results/old_landslide_threshold.json` |
| `gee_codeeditor_vh.py` → `gee_export_vh.js` → `split_vh_exports.py` | B2（加入 VH，未採用）實驗用的 VH 影像 |

## 每日自動更新（本機排程）

| 程式 | 用途 |
|---|---|
| `install_daily_task.ps1` | 安裝／移除 Windows 工作排程器 |
| `daily_run.bat` | 排程呼叫 `python -m pipeline.daily.run`，日誌在 `data/live/logs/` |

正式部署用 GitHub Actions（`.github/workflows/daily.yml`），見 `docs/daily.md`。

## 資料準備

| 程式 | 用途 |
|---|---|
| `prepare_hotspots.py` | 土石流潛勢溪流、大規模崩塌潛勢區 shp → `data/raw/hotspots.json` |
| `vendor_fonts.py` | 下載儀表板字型到 `dashboard/vendor/fonts/`（資料出現新字時重跑） |

## 後續擴充（程式保留，決賽不展示）

| 程式 | 用途 |
|---|---|
| `analyze_ndwi_change.py` | 光學 NDWI 新增水體（馬太鞍溪結果已撤下）；其中 `crop_window` 等函式被 `analyze_sar_change.py` 使用 |
| `run_hypsometry_real.py` | DEM 蓄水量（結果已撤下） |
| `run_exposure_real.py` | 暴露人口 |
