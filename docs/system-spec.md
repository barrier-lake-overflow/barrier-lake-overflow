# 堰塞湖事件研判平台 · 系統規格說明書

> 專案：`barrier-lake-overflow`（OSSInt 2026 開源空間資訊於國家韌性應用黑客松 · 災害防救賽道）
> 文件性質：整套系統（資料處理管線、偵測、事件研判、自動更新、儀表板）的規格說明
> 依據：本資料夾的程式碼與文件（2026-10-29 版本）。各規則的細節與依據另見 `docs/events.md`、`docs/parameters.md`、`docs/daily.md`。

---

## 目錄

1. [文件目的與範圍](#1-文件目的與範圍)
2. [系統概述](#2-系統概述)
3. [系統架構](#3-系統架構)
4. [執行環境與相依套件](#4-執行環境與相依套件)
5. [外部資料來源](#5-外部資料來源)
6. [功能規格](#6-功能規格)
7. [資料規格](#7-資料規格)
8. [參數一覽](#8-參數一覽)
9. [操作介面（指令）](#9-操作介面指令)
10. [部署](#10-部署)
11. [測試](#11-測試)
12. [驗證結果](#12-驗證結果)
13. [已知限制](#13-已知限制)
14. [附錄：文件與程式不一致處](#14-附錄文件與程式不一致處)

---

## 1. 文件目的與範圍

### 1.1 目的

說明本系統「做什麼、怎麼做、輸入輸出是什麼、限制在哪裡」，讓評審、指導老師、新成員不必讀程式碼，就能掌握系統行為；也作為日後修改時對照的基準。

### 1.2 範圍

| 範圍 | 說明 | 決賽展示 |
|---|---|---|
| 事件佇列（跨期追蹤 → 優先排序 → 證據缺口 → 建議任務 → 人工查證） | 系統主線 | 是 |
| SAR 變化偵測（新增水體、崩塌、A/B/C 證據強度） | 事件佇列的輸入 | 是 |
| 全清冊回放、2026 負案例 | 驗證 | 是 |
| 每兩天自動更新（清冊、警戒、雨量、監看窗格、新聞候選） | 營運 | 是 |
| 全台清冊儀表板、成因敘述、風險模型 | 背景資訊 | 是（次要） |
| 蓄水量、淹沒範圍、暴露人口、溢流預報 | 後續擴充，程式保留 | 否 |

### 1.3 用語

| 用語 | 定義 |
|---|---|
| σ⁰（背向散射係數） | SAR 影像像元值，單位 dB。平靜水面背向散射低（約 −20 dB 以下） |
| 新增水體 | 事件後判為水、事件前不是水的像元 |
| 候選 | 偵測端的一塊新增水體連通塊，帶 A/B/C 等級 |
| 事件 | 跨期追蹤後的同一個疑似堰塞湖（代號 E1、E2…） |
| 時點（snapshot） | 一次衛星過境（偵測期或複核期），回放的最小單位 |
| 複核 | 用下一期影像檢查同位置是否仍有新增水體（IoU） |
| 情境（scenario） | 一個地點、一段時間的逐期影像設定；分為正案例、負案例、回放、即時監看 |
| 窗格 | 以某點為中心的 4 km × 4 km 分析範圍 |
| 外部證據 | 他單位已發布的光學、航拍、判釋或現地成果 |
| 事後查證（hindsight） | 回放結束後才做的查證，只做註記，不參與研判 |

---

## 2. 系統概述

### 2.1 要解決的問題

豪雨與颱風期間，值班人員要從大量資料裡找出「哪一件最該先查」。光學衛星常被雲遮住；Sentinel-1 雷達能穿雲，但單期的低背向散射區可能是雷達陰影或濕土，不能直接當成結論。

### 2.2 系統定位

把衛星偵測結果整理成**事件佇列**：每個疑似事件附上證據、證據缺口、優先等級與建議任務，**由值班人員做最後判斷**。

### 2.3 設計原則

1. **SAR 提供證據，不下結論。** 偵測端的 A/B/C 只代表「SAR 證據強度」，要經過複核、空間條件與人工查證才會排進高優先。
2. **系統整理與排序，人員判斷。** 只有 SAR 證據時，研判信心最高到「中」；要有 SAR 以外的獨立證據（他單位光學／航拍、現地或人工查證）才會到「高」。
3. **串接既有能力，不重做。** 他單位已發布的成果依時間與位置自動對到事件，當作獨立證據。
4. **說明下一步。** 每張事件卡都附建議任務，例如「暫不派遣 UAV，先以下一期複核過濾誤報」。
5. **每個判斷都能追溯。** 規則寫死在程式，每項判斷記入 `rulesFired`；敘述不用 LLM，以規則加模板產生。
6. **回放不偷看未來。** 某時點只用當時已取得的影像與已發布的外部成果。

### 2.4 使用者

| 角色 | 使用方式 |
|---|---|
| 值班人員 | 開儀表板看值班佇列、讀事件卡、記錄人工查證、複製任務單 |
| 維運人員 | 執行／排程管線、確認新聞候選、維護情境檔 |
| 評審／指導老師 | 看回放、全清冊回放統計、負案例 |

---

## 3. 系統架構

### 3.1 資料流

```
【外部來源】
 農村水保署清冊 ─┐   土石流／大規模崩塌警戒 ─┐   GSMaP 衛星雨量 ─┐   Sentinel-1 GRD ─┐   Google 新聞 RSS
                 │                          │                 │                │            │
【pipeline】      ▼                          ▼                 ▼                ▼            ▼
 ingest.inventory → lakes.js         daily.watchlist（監看窗格）   daily.sentinel（下載＋偵測）  daily.news（候選）
 attribution.annotate → 成因敘述          │                               │
 ingest.risk → risk.js                    └──────────────┬────────────────┘
                                                         ▼
                           preprocess（Lee 濾波、陰影／疊置／陡坡遮罩）
                                                         ▼
                           detect（判水 → 新增水體 → 坡度雙門檻 → 崩塌 → 河道 → A/B/C）
                                                         ▼
                                     data/derived/final_*.json（每期偵測結果）
                                                         ▼
          data/raw/scenarios/*.json（情境：期別、外部證據、事後查證）──► events.build
                                                         ▼
                           events.triage（持續性 → 優先 → 信心 → 缺口 → 任務）
                           events.replay（全清冊回放統計、隨機基準）
                                                         ▼
【dashboard】       events.js、replay.js、daily.js、lakes.js、risk.js …（window.* 全域變數）
                                                         ▼
                                     code/dashboard/index.html（純靜態、可離線）
```

### 3.2 目錄結構

```
barrier-lake-overflow-main/
├─ index.html                 轉址到 code/dashboard/（GitHub Pages 用）
├─ netlify.toml               Netlify 部署設定（備選）
├─ run_dashboard.bat          本機開啟儀表板
├─ requirements.txt           完整開發環境
├─ requirements-daily.txt     每日自動更新（CI）精簡套件
├─ .github/workflows/
│   ├─ daily.yml              每兩天自動更新
│   └─ nlsc-probe.yml
├─ code/
│   ├─ pyproject.toml         套件 ossint-pipeline
│   ├─ pipeline/
│   │   ├─ build_all.py       一鍵重建儀表板資料
│   │   ├─ ingest/            清冊、風險模型、人工觀測
│   │   ├─ preprocess/        SAR 讀檔、Lee 濾波、幾何遮罩
│   │   ├─ detect/            判水、崩塌、疑似堰塞湖分級
│   │   ├─ events/            事件追蹤、研判、全清冊回放
│   │   ├─ daily/             自動更新各步驟
│   │   ├─ attribution/       成因敘述、溢流預報
│   │   └─ assess/            蓄水量、規模、淹沒、暴露、回測（後續擴充）
│   ├─ scripts/               真實資料分析、GEE 下載、回放、證據圖、實驗（README.md 依用途分類）
│   ├─ tests/                 單元測試（226 項）
│   └─ dashboard/             儀表板（HTML/CSS/JS、data/、vendor/）
├─ data/
│   ├─ raw/                   原始資料（清冊、情境、Sentinel-1/2、熱點、觀測）
│   │   └─ sentinel1/replay/  全清冊回放影像（不進版控）
│   ├─ derived/               偵測結果 final_*.json；satpasses/ 演練回放的衛星過境紀錄
│   ├─ live/                  自動更新狀態（state、news、status）
│   └─ experiments/           實驗結果與修改前基準（不進版控）
└─ docs/                      規格、規則、參數、驗證、自動更新、進度（目錄見 docs/README.md）
    ├─ evidence/              影像證據圖
    ├─ results/               分析程式產生的數字（敏感度、調參、門檻分析）
    ├─ reference/             早期架構圖、開放資料清單
    └─ notes/                 工作筆記
```

本機開發另有 `.venv/`（Python 虛擬環境，不進版控），不屬於系統本身。

### 3.3 模組一覽

| 套件 | 模組 | 職責 |
|---|---|---|
| `ingest` | `inventory.py` | 清冊 CSV → `lakes.js`，TWD97 TM2 → WGS84 |
| | `observations.py` | 讀人工整理的歷史觀測 `observations.csv` |
| | `risk.py` | 邏輯迴歸風險模型 → `risk.js` |
| `preprocess` | `sar.py` | 讀 GeoTIFF、Lee 濾波、網格對齊檢查 |
| | `mask.py` | 雷達陰影／疊置／陡坡遮罩；射線追蹤陰影、前縮（實驗，預設關閉） |
| `detect` | `water.py` | SAR 判水（固定 −18 dB）、光學判水規則 `optical_water_rule()`、變化偵測；VH 補判（實驗，預設關閉） |
| | `landslide.py` | 振幅比值法崩塌偵測 |
| | `barrier_lake.py` | 河道、坡度雙門檻、候選分級、既有崩塌堆積比例、整條 SAR 流程 `run_sar_chain()` |
| `events` | `build.py` | 跨期追蹤、回放時點、事件卡、輸出 `events.js` |
| | `triage.py` | 持續性、優先等級、研判信心、證據、缺口、衝突、提醒、任務、摘要 |
| | `replay.py` | 全清冊回放選湖、判定、隨機基準 → `replay.js` |
| `daily` | `run.py` 等 | 自動更新的十個步驟（見 6.6） |
| `attribution` | `rules.py`、`compose.py`、`verbalize.py`、`annotate.py` | 成因敘述 |
| | `forecast.py` | 溢流預報（後續擴充） |
| `assess` | `hypsometry.py`、`scale.py`、`inundation.py`、`exposure.py`、`backtest.py`、`dashboard_export.py` | 蓄水量、規模、淹沒、暴露、回測（後續擴充） |

---

## 4. 執行環境與相依套件

### 4.1 執行環境

| 項目 | 需求 |
|---|---|
| 只看儀表板 | 任一現代瀏覽器，直接開 `code/dashboard/index.html`，不需安裝、可離線（字型與 three.js 已放在 `vendor/`） |
| 執行管線 | Python 3.11+（`pyproject.toml` 標示 ≥ 3.10；CI 用 3.12） |
| 下載新影像、雨量 | Google Earth Engine 帳號與已啟用 Earth Engine API 的 GCP 專案 |
| 作業系統 | 開發以 Windows 為主（`.bat`、`install_daily_task.ps1`）；CI 用 Ubuntu |

### 4.2 Python 套件

| 套件 | 用途 | 檔案 |
|---|---|---|
| pyproj | 座標轉換 | 兩者 |
| PyYAML | 敘述句型庫 | 兩者 |
| numpy、scipy | 陣列運算、連通分析、濾波 | 兩者 |
| rasterio | 讀寫 GeoTIFF | 兩者 |
| shapely | 幾何 | 兩者 |
| earthengine-api | GEE 下載 | 兩者 |
| openpyxl | 清冊 XLSX | `requirements-daily.txt` |
| geopandas | 暴露人口（後續擴充） | `requirements.txt` |
| requests | 網路請求 | `requirements.txt` |
| pytest | 測試 | `requirements.txt` |
| matplotlib | 證據圖（選用） | 未列入，用到時自行安裝 |

安裝：

```bash
python -m venv .venv
pip install -r requirements.txt
cd code && pip install -e .
```

---

## 5. 外部資料來源

| 資料 | 提供者 | 取得方式 | 用途 |
|---|---|---|---|
| 堰塞湖清冊（75 筆，1979–2026） | 農業部農村發展及水土保持署 | 網站 XLSX（`daily/inventory_fetch.py`）；`data/raw/taiwan-barrier-lakes.csv` | 清冊、回放選湖、監看窗格、歷史災害 |
| 土石流及大規模崩塌警戒 | 農業部開放資料 | API（`daily` alerts） | 監看窗格觸發 |
| 土石流潛勢溪流（1745 條）、大規模崩塌潛勢區（94 處） | data.gov.tw | `scripts/prepare_hotspots.py` → `data/raw/hotspots.json` | 警戒位置、雨量熱區 |
| Sentinel-1 GRD σ⁰（VV） | ESA，經 GEE `COPERNICUS/S1_GRD` | GEE 匯出／下載 | SAR 偵測 |
| NASADEM | NASA，經 GEE | GEE 匯出 | 遮罩、河網、壩體高程檢核 |
| Sentinel-2（含 Cloud Score+）、Landsat 8/9 | ESA／USGS，經 GEE | GEE | 小地圖底圖、負案例查證、光學判讀、衛星時間軸（`daily/optical.py`、`daily/passes.py`） |
| GSMaP v8 雨量計校正版 | JAXA，經 GEE | GEE | 雨量熱區、過境前雨量、風險模型 |
| 馬太鞍溪航照（2025 年 7 個日期，約 15 cm，RGB＋NIR） | 林業及自然保育署航測及遙測分署 提供 | 不進版控 | 湖面驗證、誤報地表檢查、小地圖航照圖層 |
| 福衛八號多光譜（2026-03-31／04-15 拼接，2 m） | 國家太空中心（授權書 C0920-18） | 申請取得，原始檔在 `data/restricted/`，不進版控 | 候選查證、小地圖水面與裸露堆積範圍（`scripts/fs8_validate.py`、`fs8_dashboard.py`）；只公開不含影像的衍生產品 |
| 通用電子地圖水系（河川中線、河川面、面狀水域） | 內政部國土測繪中心 | WFS（`scripts/fetch_nlsc_water.py`，金鑰在 `.env`） | D8 河網比對（`docs/fs8-validation.md`） |
| Google 新聞 RSS | Google | `daily/news.py` | 外部證據候選 |
| 村里界、SEGIS 人口 | 內政部 | 不進版控 | 暴露人口（後續擴充） |

儀表板頂端「⚙ 設定」小視窗與使用說明「資料來源與授權」列出上述來源；Copernicus、USGS 照其規定的標註原文。衛星時間軸的「開啟影像」連到 Copernicus Browser（外部網站），不是本平台的資料。

---

## 6. 功能規格

### 6.1 清冊轉換（`pipeline/ingest/inventory.py`）

- **輸入**：`data/raw/taiwan-barrier-lakes.csv`（DBF 匯出格式欄名，例如 `壩體X_TW,N,10,0`）。
- **處理**：壩體座標 TWD97 TM2（EPSG:3826）轉 WGS84；整理存續狀態（`watch`／`stable`／`gone`）、誘因（`quake`／`typhoon`／`rain`／`slide`）。
- **輸出**：`code/dashboard/data/lakes.js`（`window.BARRIER_LAKES`），每筆 `id` 為 `bl` 加三位項次。

### 6.2 SAR 前處理（`pipeline/preprocess/`）

| 功能 | 規格 |
|---|---|
| 輻射與地形校正 | 由 GEE `COPERNICUS/S1_GRD` 完成，像元值為 σ⁰ dB；不需要 SNAP |
| 讀檔 | `load_s1_geotiff()`；目前只支援 EPSG:4326 匯出 |
| 網格檢查 | `check_aligned()`：網格不一致直接報錯，不自動重採樣 |
| Lee 濾波 | 線性功率域計算；判水用 3×3（保留 2～3 像元寬的窄河道），崩塌用 5×5 |
| 幾何遮罩 | 距離向坡度 `s_r`（正值＝面向衛星）：`s_r > θ` 為疊置、`s_r < θ − 90°` 為陰影；θ = 39°；視向升軌 77°、降軌 283° |
| 陡坡遮罩 | 坡度 > `max_water_slope_deg` 不判水（正式流程 35°）；崩塌偵測不套陡坡遮罩 |
| 遮罩組合 | 判水：疊置｜陰影｜陡坡｜DEM 無資料；崩塌：疊置｜陰影｜DEM 無資料 |
| 射線追蹤陰影（實驗） | `ray_traced_shadow()`：沿視線往衛星方向找遮擋；`--ray-trace-shadow` 開啟時陰影 = 局部判定 ∪ 射線追蹤，另統計前縮面積。**預設關閉**（測試後少抓到一座湖，未採用） |

### 6.3 偵測（`pipeline/detect/`）

整條流程由 `run_sar_chain()` 串起，命令列入口為 `scripts/analyze_sar_change.py`。

**6.3.1 判水（`water.py`）**

- SAR：濾波後 σ⁰ < −18 dB 即為水（固定門檻，`method` 記為 `sar_fixed`）。Otsu 保留，傳 `water_threshold_db=None` 時才用；實測山區窗格每一期都會退回 −18 dB。
- 光學判水規則集中在 `optical_water_rule()`：Sentinel-2 用 MNDWI > 0 且 B8 < 500，航照用 NDVI < −0.15 且 NDWI > 0.2。只用在查證與驗證，不參與偵測。三種資料的規則與依據見 `docs/parameters.md`「判水標準」。
- 光學 NDWI 變化偵測（保留）：NDWI =（Green − NIR）/（Green + NIR），固定門檻或 Otsu。
- 新增水體 = 事件後水體 ∧ ¬事件前水體。

**6.3.2 坡度雙門檻（`seed_filter()`）**

坡度 ≤ 35° 的像元都可以判水，但每塊新增水體至少要有 1 像元落在坡度 ≤ 20° 才保留，保留時整塊留下。複核期不套用這條，只看同位置是否還有水。

**6.3.3 崩塌（`landslide.py`）**

Δ = σ⁰後 − σ⁰前，|Δ| ≥ 3 dB 視為變化，兩個方向都算並記正負號。排除：水體外擴 2 像元（避免湖岸出現假崩塌）、疊置、陰影、小於 10 像元的碎塊。

**6.3.4 河道（`river_mask()`）**

河道 = 事件前水體 ∪ DEM D8 河網（priority-flood 填窪後，集水面積 ≥ 1 km²）。

**6.3.5 候選分級（`classify()`）**

1. 新增水體外擴 3 像元後做連通分析，相隔近的碎塊視為同一座湖（面積仍只算新增水體像元）。
2. 小於最小湖面積（0.5 公頃）的不列入。
3. 依三個條件評分：

| 條件 | 判定 |
|---|---|
| ① 貼河道 | 外擴 2 像元後碰到河道 |
| ② 附近有崩塌（壩體在下游） | 500 m 內有崩塌；有 DEM 時，崩塌最低點須 ≤ 湖底高程 + 5 m |
| ③ 持續 | 後續期別同位置新增水體 IoU ≥ 0.3 |

| 等級 | 條件 |
|---|---|
| A | ①＋②＋③ |
| B | ①＋② |
| C | 只有 ① |
| 不列入 | 不貼河道 |

每個候選輸出面積、中心點、湖底與湖緣高程、崩塌面積、多邊形、判定理由（`reasons`）。

**6.3.6 診斷輸出**

- `darkNewPixelsDiagnostic`：遮罩前「事件後低於門檻、事件前沒有」的面積，以及被遮罩擋掉的比例。
- `--debug-components`：列出每塊新增水體被保留或淘汰的原因（面積不足、未貼河道）。

**6.3.7 既有崩塌堆積區（`--prior-baseline`）**

給了一年前基準（同軌道、事件前基準期間往前推一年的中位數）時，用同一套崩塌偵測比較「一年前 → 事件前」，得到事件發生時已經存在的崩塌堆積區。每個候選輸出落在裡面（外擴 2 像元）的面積比例 `oldLandslidePct`，供事件研判的崩塌堆積提醒使用；不影響新增水體、崩塌與分級。沒有一年前基準時不輸出這個欄位。

**6.3.8 實驗開關（預設關閉）**

| 開關 | 內容 | 結果 |
|---|---|---|
| `--ray-trace-shadow` | 射線追蹤陰影＋前縮統計（6.2） | 未採用 |
| `--use-vh`（＋`--pre-vh`、`--post-vh`、`--post-later-vh`） | VV 介於 −18～−15 dB 且 VH < −24 dB 的像元補判為水 | 未採用：誤報幾乎加倍 |

實驗用 `scripts/run_experiment.py` 以正式參數重跑全部案例、與正式結果並排比較；採用標準是全部指標都沒有變差且至少一項變好。結果見 `docs/parameters.md`。

### 6.4 事件研判（`pipeline/events/build.py`、`triage.py`）

**6.4.1 跨期追蹤**

依過境時間排序各期候選；新候選的中心點與既有事件最新位置相距 ≤ 250 m 時視為同一事件，否則開新事件（E1、E2…依首次出現順序）。

**6.4.2 回放時點**

每一期影像（偵測期與複核期）各是一個時點。某時點只用：
- 過境時間 ≤ 該時點的偵測；
- 複核時間 ≤ 該時點的複核結果（否則視為待複核，並隱藏含 IoU 的理由）；
- 發布時間 ≤ 該時點、且位置在 `radiusM` 內的外部證據；
- 該期過境前的雨量。

**6.4.3 持續性**

| 狀態 | 條件 |
|---|---|
| 已確認持續 `confirmed` | 曾經複核持續，或兩期以上偵測到且沒有複核失敗 |
| 待複核 `pending` | 單期，或複核影像尚未取得 |
| 複核未持續 `failed` | 最新一筆的複核未達 IoU 門檻 |
| 持續性中斷 `lost` | 曾確認，但最新一期未再偵測到或最新複核未持續 |

**6.4.4 SAR 證據強度**：崩塌＋（confirmed 或 lost）為 A，只有崩塌為 B，其餘為 C。

**6.4.5 優先等級（依序比對）**

| 條件 | 優先 | 行動 |
|---|---|---|
| 持續性中斷 | 高 | 建議立即查證（可能潰決或排空） |
| 已確認持續＋A 級 | 高 | 建議立即查證 |
| 待複核＋B 級＋外部獨立證據 | 高 | 建議立即查證（多源一致） |
| 待複核＋B 級 | 中 | 建議人工確認 |
| 其他（C 級、複核未持續） | 低 | 暫時觀察 |

同一等級內依面積由大到小排序。

**6.4.6 研判信心**

| 信心 | 條件 |
|---|---|
| 高 | 有外部獨立證據（`optical`、`aerial`、`satellite`、`field`）且狀態為 confirmed／pending；或儀表板人工查證「確認」 |
| 中 | 已確認持續，或複核結果明確未持續（只有 SAR） |
| 低 | 單期待複核，或前後期不一致 |

**6.4.7 證據、缺口、衝突、任務**

| 項目 | 內容 |
|---|---|
| 證據 `evidence` | 每筆標 `support`／`against`／`context`：SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積趨勢（≥ 1.5 倍擴大、≤ 0.67 倍縮小）、10 km 內歷史堰塞湖、背景、外部成果、下游保全對象 |
| 缺口 `gaps` | 尚未複核、形成期間雨量、光學影像、下游保全對象、人工查證 |
| 衝突 `conflicts` | 空間條件符合但複核未持續；前期一致但最新一期未見 |
| 提醒 `cautions` | 崩塌堆積：最新一筆偵測有 ≥ 10% 面積落在既有崩塌堆積區（一年前到事件前之間新出現的崩塌）。只提示，不改優先、信心、證據強度 |
| 任務 `tasks` | 依優先等級產生（UAV 現地查證、調閱光學、通報主管機關、持續監測、排下一期複核、暫不派 UAV 等），每項附理由 |
| 摘要 `summary` | 一句話，例如「E3 值得優先查證：6 項證據一致……」 |
| 規模 `scale` | 面積 ≥ 10 公頃「大」、1～10「中」、< 1「小」；SAR 面積視為下限 |

**6.4.8 事後查證**：情境檔 `hindsight` 依位置附到事件卡，儀表板以虛線框標示「回放當下系統不知道」，不改動任何研判結果。

### 6.5 全清冊回放（`pipeline/events/replay.py`、`scripts/gee_fetch_inventory.py`、`scripts/run_inventory_replay.py`）

| 規則 | 值 |
|---|---|
| 選湖 | 清冊形成日期完整到日、2015-01-01 以後；馬太鞍溪（bl071）沿用正案例情境 |
| 窗格 | 清冊壩址為中心 4 km |
| 事件前基準 | 形成前 7～67 天的中位數 |
| 逐期影像 | 形成前 7 天到形成後 60 天 |
| 軌道 | 形成後最早有影像的軌道；事件前基準 < 3 張的軌道排後面 |
| 判定偵測到 | 形成前 1 天起到潰決（或形成後 60 天）為止，壩址 1 km 內出現事件（看事件最後一次被偵測的時間） |
| 碰巧命中機率 | 把壩址換成窗格內 41×41 格點的任一點，1 km 內剛好有事件的比例；全部湖加總 = 隨機基準期望 |

規則在執行前就寫死，不看結果、不逐湖調整。每湖的軌道與期別記在 `data/raw/replay_manifest.json`。

### 6.6 自動更新（`pipeline/daily/`）

`python -m pipeline.daily.run --project <ID>`，正式排程為**每兩天一次**（GSMaP 在 GEE 上本來就落後 1～2 天）。每一步獨立執行，失敗只記錄在 `data/live/status.json`，不影響後續步驟；同時有 `.lock` 防止重複執行。

| 步驟 | 內容 | 產出 |
|---|---|---|
| inventory | 下載清冊 XLSX（帶防偽 token 的表單），內容沒變就不覆寫 | CSV → `lakes.js`、成因敘述 |
| alerts | 發布中的土石流／大規模崩塌警戒 | `state.json` |
| rain | 94 處大規模崩塌潛勢區 GSMaP 24／72 小時雨量 | 雨量熱區 |
| risk | 各湖 GSMaP 1／3／7／30 天雨量 | `risk.js` |
| watchlist | 監看窗格：清冊監測中＋警戒＋雨量熱區（72 h ≥ 200 mm），2 km 內合併，觸發後保留 30 天 | `state.json` |
| sentinel | 各窗格新過境 → 下載 → 偵測；事件前基準 ≥ 3 張的軌道全部抓，各軌獨立複核，只保留最近 90 天 | `final_live_*.json`、`scenarios/live_*.json` |
| passrain | 每期過境前 24／72 小時雨量（缺的才補） | 情境檔 `passes[].rain` |
| basemap | 各情境事件前光學底圖（Sentinel-2 中位數，空白處用 Landsat 補） | `dashboard/data/basemaps/*.jpg` |
| optical | 監看窗格最近 45 天 Sentinel-2／Landsat 8/9 雲量、下一次預計過境（依重訪週期推估）、各事件位置光學判水（只供參考，不進研判） | 情境檔 `optical` |
| passes | 演練回放情境（kind ≠ live）中心點上實際的 Sentinel-1／2、Landsat 8/9 取像時間（Landsat 含 T2、只留白天），缺的才抓；build 時每一期只用該期以前的取像、依固定週期（12／10／16 天）推估之後的過境 | `data/derived/satpasses/<情境 id>.json` |
| news | Google 新聞 RSS 關鍵字分類為外部證據**候選**，人工確認後才寫進情境 | `data/live/news.json` |
| build | 事件佇列、全清冊回放、執行狀態 | `events.js`、`replay.js`、`daily.js` |

來源失敗時，該來源的窗格當天不判定過期。新聞候選以指令確認：`python -m pipeline.daily.news list | accept <id> | reject <id>`。

### 6.7 成因敘述（`pipeline/attribution/`）

- `rules.py`：輸入清冊紀錄與觀測，輸出命中的規則與填槽值。雨量分級依中央氣象署；颱風距離 < 100 km 為直接侵襲、100～300 km 為外圍環流（自訂）；地震後 72 小時內且規模 ≥ 5.0 視為地震關聯（自訂）。
- `compose.py`＋`templates.yaml`：依句型組成中文敘述，附 `rules_fired`。
- `verbalize.py`：數值轉中文，精度隨量級調整，分得出「無」和「未記載」。
- `annotate.py`：全清冊敘述寫回 `lakes.js` 的 `narrative`、`rulesFired`。
- **不使用 LLM**，每句話都能對回產生它的規則。

### 6.8 風險模型（`pipeline/ingest/risk.py`）

- 邏輯迴歸，係數與特徵平均值寫死在程式中（以 ERA5-Land 網格雨量訓練）。
- 特徵：1／3／7／30 天雨量（GSMaP）、蓄水量、是否地震或降雨形成。
- 沒給 `--project` 或 GEE 失敗時，用訓練平均值佔位，並在 `RISK_MODEL_META.mode` 標明。
- 正樣本極少，儀表板須揭露「未驗證」限制。

### 6.9 後續擴充模組（程式保留，決賽不展示）

| 模組 | 功能 | 狀態 |
|---|---|---|
| `assess/hypsometry.py` | 從壩址往上游連通填窪，算水位–面積–容積曲線 | 程式完成；馬太鞍溪結果已撤下 |
| `assess/scale.py` | 蓄水量 → 規模級距＋信心，區間 ±40% | 需重新校正 |
| `assess/inundation.py` | bathtub 淹沒範圍（只淹湖體，不往下游傳） | 程式完成 |
| `assess/exposure.py` | 淹沒多邊形 × 村里 × 人口 | 程式完成 |
| `assess/backtest.py` | 偵測日 vs 官方形成／溢流日 | 程式完成 |
| `attribution/forecast.py` | 水量平衡溢流預報，低／中／高雨量情境給區間 | 程式完成 |

### 6.10 儀表板（`code/dashboard/`）

純靜態前端，資料以 `<script src="data/*.js">` 載入成全域變數，不需伺服器。

**6.10.1 畫面結構**

兩個分頁，一次只顯示一個：「值班」（預設）與「全台清冊」。值班分頁一打開是即時監看；
歷史事件（正／負案例、全清冊回放）放在演練模式，頂端有紫色橫幅標明不是即時資料。

| 區塊 | 檔案 | 功能 |
|---|---|---|
| 頂端列 | `index.html`、`views.js` | 標誌（程式這樣寫對不隊，系統與團隊共用；`img/logo.svg` 淺色底用、`img/logo-dark.svg` 深色底用，依外觀只顯示一個）、系統名稱、分頁（值班／全台清冊）、一行資料狀態、使用說明（開新分頁）、「⚙ 設定」（與使用說明同高的按鈕；小視窗：外觀跟隨電腦／淺色／深色，存在 `localStorage` 的 `theme`，預設 `auto`；字體標準／大／特大，存在 `fontScale`；兩者使用說明頁也套用；下方是資料來源致謝）。一般畫面的狀態只寫資料更新時間與警戒則數；網管檢視（網址加 `?admin`）另寫失敗的步驟與白話原因（例如「Sentinel-1失敗：GEE 服務帳號沒有下載影像的權限」「警戒資料這次沒抓到，沿用上一次」）、即時監看影像多久沒更新 |
| 系統管理分頁（網管檢視，`#admin`） | `daily-view.js`、`code/dashboard/data/syslog.js` | 只在 `?admin` 時出現（點頂端狀態列也會過去）。系統狀態：本次各步驟（滑鼠停留看錯誤原文與白話說明）、雨量資料時間、失敗步驟的白話原因、監看窗格（各窗格最近一次失敗的時間與原因；點一個切到該窗格）。執行紀錄：最近 30 次自動更新的開始時間、花費、失敗步驟與原因、各步驟成功與否（`data/live/history.json`）。最近一次的完整輸出：最後 400 行，可只看錯誤與警告。`syslog.js` 只在網管檢視載入。網管檢視只是把畫面分開，不是權限保護；寫出前會遮掉 GEE 專案 ID 與服務帳號信箱（`gee.redact()`） |
| 使用說明 | `help.html` | 獨立頁面。最前面是「圖解：值班快速上手」四張圖（HTML 方塊流程圖，方塊可點、跳到詳細說明）：一上班先看什麼、畫面上什麼在哪裡（值班畫面實際截圖 `help-img/duty-top.jpg`、`duty-board.jpg`，疊上 19 個數字（截圖當下有出現的 17 個可點框），框的位置以截圖百分比表示；截圖為淺色外觀、標準字體，以 headless Chrome 截取並同時量出各區塊位置；附「我想知道…看哪裡」對照表）、一個事件怎麼處理（高／中／低三欄）、事件的狀態怎麼變。之後依功能分節：平台在做什麼（原則、流程）、畫面總覽與網址、即時監看（窗格、衛星過境、事件清單、小地圖、新聞候選）、事件卡、優先等級與研判信心（含持續性、證據強度）、人工查證、演練模式與系統歷史成績、系統狀態、全台清冊、常見問題、名詞解釋。左側目錄自動產生並標出目前位置；搜尋框只留下有提到關鍵字的段落並標記（網址 `help.html?q=關鍵字` 可直接搜尋）。儀表板各區塊旁的「?」開新分頁到對應段落（`help.html#段落 id`） |
| 頂端橫幅 | `daily-view.js` | 發布中的警戒（紅，列類型、則數、地點與等級）；網頁開著時每 10 分鐘與切回分頁時檢查 `code/dashboard/data/daily.js`，有新的更新就提示重新整理 |
| 值班 · 即時監看 | `duty.js` | 資料過舊提示（最新一期超過 12 天，或每日更新已記到更新的影像卻沒分析；一般畫面是琥珀色「即時監看資料暫停更新…不代表現況」，網管檢視是陶紅色並寫出處理方式）、待處理清單（各窗格最新一期的高／中優先事件，標題寫出依據的日期；附查證狀態與「尚未查證 · 已 X 天」，點列切過去；每日更新已在監看但還沒有分析結果的窗格另列一行）、監看窗格按鈕（最新一期高／中優先事件數、距今天數，過舊變紅）、衛星過境時點軸（標「最新」與距今天數；看舊一期時提示並可回到最新）、時點軸下方一行「接下來」：下一期雷達與最快的光學過境、依優先分組的佇列（高優先未查證標等待天數；下一期還有幾天或「應已過境 X 天，尚無資料」）、SVG 小地圖（事件多邊形、壩址、事件前底圖、可切換的航照圖層、福衛八號水面與裸露堆積圖層——收到日以前的時點標為事後資料、預設關；「放大檢視」展開成覆蓋全畫面的大圖，Esc 或「關閉」縮回）、新聞候選、事件卡 |
| 值班 · 演練模式 | `duty.js`、`replay-view.js` | 橫幅與「回到即時監看」、歷史案例（正案例、負案例、更多歷史案例下拉選單）、系統歷史成績（全清冊回放總計、依蓄水量分組；逐湖明細表預設收起，點一列跳到該湖首次偵測的時點） |
| 事件卡 | `duty.js` | 寬螢幕（≥ 1200 px）固定在右側。直接顯示：位置（經緯度＋TWD97 TM2，網頁端換算，與清冊 TWD97 誤差 ≤ 1 m；複製座標、Google 地圖連結，任務單同附）、優先／信心／規模／下一期複核（日期、軌道、還有幾天）、**衛星時間軸**（事件首次出現、最多往回 45 天，到未來約兩週；雷達標這期有沒有偵測到，光學在即時監看標自動判讀與晴空比例、在回放只標有過境；紅線為今天／本期，之後為虛線預估，第一個雷達標「下一期複核」；光學有「開啟影像」連到 Copernicus Browser，位置與日期帶好、不濾雲量；桌機橫向可拖曳／滾輪捲動，手機直排；光學超過 6 張時雲遮的先收起）、證據衝突、提醒（例如崩塌堆積）、建議任務（可複製任務單，附衛星時程）、人工查證表單、事後查證框（負案例；同結論多筆時佇列標籤只列一次）。點開才顯示：研判摘要、證據（✓ ✗ ·）與缺口、逐期偵測紀錄與證據圖、命中規則。優先與信心標籤滑鼠停留顯示圖例說明 |
| 全台清冊 | `app.js`、`map3d.js` | KPI、three.js 立體地形圖（點位、高風險、SAR 範圍、名稱圖層）、湖泊詳情（結論、行動、證據、基本資料；有事件回放的湖可直接開演練模式）、篩選（存續狀態、風險、誘因、縣市、關鍵字）、年度分布 |

網址：`#duty`（值班）、`#inventory`（全台清冊）、`#drill`（直接開演練模式，報告用）。

分頁小圖示 `img/favicon.svg`：標誌的簡化版（只留外框、山脈、河流，線條加粗，16～32 px 才看得清楚），依瀏覽器的深淺色換色；根目錄轉址頁與使用說明頁也用同一個。README 頂端的標誌用 `<picture>` 依 GitHub 的深淺色顯示對應版本。

字體：所有字體大小乘上 CSS 變數 `--fs`（標準 1、大 1.15、特大 1.3）；17 px 以上的標題與大數字用 `--fs-h`（1、1.07、1.12），放大得少一點以免擠爆版面。720 px 以下另有換行規則（佇列標籤移到文字下方、長按鈕可換行）。

外觀：`<html data-theme="light|dark">`，由 `<head>` 的小程式依設定決定（`auto` 跟隨 `prefers-color-scheme`，電腦切換時跟著換）。色票是 `styles.css` 開頭的 CSS 變數，淺色一組覆寫；半透明底色用 `--jade-rgb` 等 RGB 變數。兩種外觀的文字對比都達 WCAG AA（一般字 4.5:1、大字 3:1，逐一檢查值班、演練、全台清冊、設定小視窗與使用說明的所有文字）；深色的紅字因此改為 `#E5755E`，實心紅色塊另用 `--clay-fill` 配白字。小地圖（含放大檢視）兩種外觀都用深色色票，衛星照片與事件色塊才清楚；3D 地圖有深淺兩組地形與點位配色，換外觀時重建。

頁尾三段：左「程式這樣寫對不隊 開發」、中「堰塞湖事件研判平台 · OSSInt 2026」、右「資料來源見頂端「設定」」；手機改為上下三行。

**6.10.2 人工查證**

- 選項：確認為堰塞湖／持續觀察／排除（非堰塞湖），附查證人員與補充說明。
- 存在瀏覽器 `localStorage`，以「情境 id:事件 id」為索引，可匯出 JSON。
  即時監看用鍵 `ossint.verify.v1`，演練模式用 `ossint.verify.drill.v1`，兩邊分開存、分開匯出；
  舊版存在 `v1` 裡的歷史事件紀錄，第一次載入時會搬到演練那一份。
- 只在記錄當下及之後的回放時點生效。
- 「確認」會把信心顯示為「高」並移除「人工查證」缺口；系統原本的研判不覆寫，只在旁邊註記。

---

## 7. 資料規格

### 7.1 檔案清單

| 檔案 | 產生者 | 讀取者 | 版控 |
|---|---|---|---|
| `data/raw/taiwan-barrier-lakes.csv` | 網站下載 | `ingest.inventory` | 是 |
| `data/raw/observations.csv` | 人工 | `ingest.observations`、`events.build` | 是 |
| `data/raw/hotspots.json` | `scripts/prepare_hotspots.py` | `daily.watchlist` | 是 |
| `data/raw/replay_manifest.json` | `scripts/gee_fetch_inventory.py` | `run_inventory_replay.py`、`events.replay` | 是 |
| `data/raw/scenarios/*.json` | `run_sar_series.py`、`run_inventory_replay.py`、`daily.sentinel`＋人工 | `events.build` | 是 |
| `data/raw/sentinel1/*.tif` | GEE 匯出 | `analyze_sar_change.py` | 馬太鞍溪正／負案例是（含一年前基準 `*prior*.tif`）；回放（`replay/`）與 live 否 |
| `data/raw/sentinel2/S2_E1_check_2026.tif` | GEE | `check_neg_e1.py` | 是 |
| `data/derived/final_*.json` | `analyze_sar_change.py` | `events.build` | 是 |
| `data/derived/satpasses/*.json` | `pipeline.daily.passes` | `events.build` | 是 |
| `docs/results/fs8_*`、`river_*` | `fs8_validate.py`、`fs8_sar_sameday.py`、`river_compare.py` | 文件引用、`fs8_dashboard.py` | 是（只有衍生產品） |
| `data/live/state.json`、`news.json`、`status.json` | `pipeline.daily` | `pipeline.daily`、`daily.js` | 是 |
| `code/dashboard/data/*.js` | 各 pipeline 模組 | 儀表板 | 是 |
| `docs/results/*.json` | `sensitivity_replay.py`、`tune_replay.py`、`hysteresis_replay.py`、`diagnose_missed_lake.py`、`old_landslide_threshold.py` | 文件引用 | 是 |
| `data/experiments/<名稱>/` | `run_experiment.py` | 比較表 `comparison.md` | 否 |

### 7.2 偵測結果 `data/derived/final_*.json`

命名：`final_<MMDD>.json`（馬太鞍溪正案例）、`final_<情境>_<YYYYMMDD>.json`（序列）。

```jsonc
{
  "lakeId": "inv_bl070",
  "synthetic": false,
  "source": "Sentinel-1 GRD σ⁰ VV（Google Earth Engine 匯出），非合成資料",
  "orbit": "ASCENDING",                // 或 DESCENDING
  "analysisWindowKm": 4.0,
  "cellSizeM": [9.17, 10.0],           // [dx, dy]
  "pre":  { "date", "method", "threshold", "pixel_count", "area_m2", "area_hectare" },
  "post": { ...同上 },
  "newWaterTotalAreaHectare": 0.862,
  "landslide": { "date", "method", "threshold_db", "pixel_count", "increase_pixels",
                 "decrease_pixels", "components", "area_m2", "area_hectare" },
  "geometryMask": { "layoverHectare", "shadowHectare", "excludedForWaterPct",
                    "slopeOnlyExcludedHectare", "maxWaterSlopeDeg", "seedSlopeDeg", "seedMinAreaM2" },
  "darkNewPixelsDiagnostic": { "note", "thresholdDb", "darkNewHectareBeforeMask",
                               "maskedHectare", "maskedPct" },
  "laterScenes": 1,                    // 複核期數
  "candidates": [ {
    "id": "cand1", "grade": "A",
    "areaHectare", "centroidRowCol", "centroidXY", "centroidLonLat", "distanceFromDamM",
    "onRiver", "landslideNearby", "damDownstream", "persistent", "laterScenesChecked",
    "landslideAreaHectare", "lakeFloorM", "waterLevelM",
    "oldLandslidePct",                 // 落在既有崩塌堆積區的面積比例；只有給了一年前基準才有
    "reasons": ["…", "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"],
    "polygonLonLat": [[lon, lat], …]
  } ],
  "debugComponents": { … }             // 只在 --debug-components 時輸出
}
```

複核 IoU 只寫在 `reasons` 文字中，`triage.Detection.iou` 以正則 `IoU 最高 ([\d.]+)` 取出。

### 7.3 情境檔 `data/raw/scenarios/<id>.json`

| 欄位 | 型別 | 說明 |
|---|---|---|
| `id`、`name` | 字串 | 情境代號、顯示名稱 |
| `kind` | `positive`／`negative`／`replay`／`live` | 正案例／負案例／全清冊回放／即時監看 |
| `description` | 字串 | 說明 |
| `center` | [lon, lat] | 窗格中心 |
| `windowKm`、`revisitDays`、`orbitLabel` | 數值／字串 | 窗格大小、重訪天數（推算下一期）、軌道標籤 |
| `trigger` | {label, time, source} | 觸發事件，只用於時點標籤 |
| `context` | 字串陣列 | 背景說明 |
| `externalEvidence` | [{time, kind, lonLat, radiusM, text, source, url}] | 他單位成果；`kind` 為 `optical`／`aerial`／`satellite`／`field`／`official` |
| `exposure` | {text, source, url} | 下游保全對象 |
| `hindsight` | [{lonLat, radiusM, verdict, title, text, images, method}] | 事後查證；同一事件可有多筆（例如 2026 E1：Sentinel-2、福衛八號同日雷達比對） |
| `observationsLakeId`、`referenceLakeId`、`referenceLabel` | 字串 | 對應觀測表、清冊參考點 |
| `basemap`、`aerial` | 物件／陣列 | 小地圖底圖、航照圖層（依可取得時間顯示） |
| `orbits`、`sarCheckedAt` | [{label, satellite, cycleDays, last}]、時間 | 監看窗格每一軌每顆還在拍的衛星（12 天重複）最近一次取得、最近一次成功查詢（`daily/sentinel.py` 產生），推算下一期用 |
| `optical` | {checkedAt, scenes[{time, sensor, clearPct}], next[{date, sensor}], checks[{event, lonLat, results[{time, sensor, verdict, clearPct, waterPct}]}]} | 監看窗格的光學影像（`daily/optical.py` 產生）；`verdict` 為 `water`／`partial`／`no_water`／`cloud` |
| `passes` | [{file, time, recheckTime, evidenceImage, rain{h24, h72, source}}] | 逐期影像與對應結果檔 |
| `hidden`、`active` | 布林 | 停用的監看窗格不輸出 |

人工整理欄位（`description`、`context`、`trigger`、`externalEvidence`、`exposure`、`hindsight`、`basemap`、`aerial`、`optical` 等）在重跑偵測時會保留，只重新產生 `passes`。

目前共 27 個情境：正案例 1（`matai_an_2025`，4 期）、負案例 1（`neg2026_matai_an`，17 期）、回放 22（`inv_bl051`～`inv_bl075`）、即時監看 3（`live_*`）。

### 7.4 儀表板資料

| 檔案 | 全域變數 | 內容 |
|---|---|---|
| `events.js` | `window.EVENT_SCENARIOS` | 情境陣列（即時監看另有 `upcoming[{date, time, sensor, kind, orbit}]`：從最近一次查詢往後推估的過境；回放另有 `opticalPasses[{time, sensor}]`：實際的光學過境）→ `snapshots[]`（`asOf`、`label`、`what`、`since`、`nextPass`、`nextPassOrbit`、`counts{high,medium,low}`、`newCount`；回放另有 `upcoming`：只用該期以前的取像推估之後的過境）→ `events[]` 事件卡 |
| `fs8.js` | `window.FS8_COVER` | 福衛八號水面與裸露堆積範圍（`scripts/fs8_dashboard.py`，簡化到約 2 m）：`center`、`windowKm`、`shot`、`available`（收到日）、`source`、`layers[{class, label, areaHa, rings}]` |
| `replay.js` | `window.REPLAY_SUMMARY` | `rules`、`totals`（detected、missed、expectedChanceHits…）、`bySize`、逐湖列 |
| `daily.js` | — | 最近一次自動更新狀態、監看窗格、新聞候選 |
| `lakes.js` | `window.BARRIER_LAKES` | 清冊（id、seq、year、name、county、town、village、cause、formed、duration、volume、breachDate、status、lon、lat、narrative、rulesFired…） |
| `risk.js` | `window.LAKE_RISK` | 以湖名為鍵：雨量特徵、`risk_prob`、`risk_level`、`alert` |
| `inundation.js` | — | 地圖上的 SAR 偵測範圍（`synthetic: false` 才畫） |
| `terrain.js` | — | 全台立體地形網格 |

事件卡欄位：`id`、`firstSeen`、`lastSeen`、`lastSeenAt`、`isNew`、`lonLat`、`distanceFromReferenceM`、`areaHectare`、`areaNote`、`lakeFloorM`、`polygonLonLat`、`detections[]`、`priority`、`priorityText`、`action`、`confidence`、`confidenceReasons`、`persistence`、`persistenceText`、`grade`、`scale`、`summary`、`evidence`、`gaps`、`conflicts`、`cautions`、`tasks`、`rulesFired`、`hindsight`、`optical`（即時監看：各景光學判讀）。

### 7.5 人工觀測 `data/raw/observations.csv`

欄位：`lake_id, rain_24h_mm, rain_window_hours, rain_max_hourly_mm, rain_percentile, typhoon_name, typhoon_distance_km, southwest_flow, quake_name, quake_time, quake_magnitude, pga_gal, formed_time, frontal_system, source`。除 `lake_id` 外都可空白；有填就要填 `source`。測站雨量有填時，事件卡優先用測站值，沒有才用 GSMaP。

---

## 8. 參數一覽

依據分四類：規格、文獻、清冊、自訂。完整說明與敏感度見 `docs/parameters.md`。

| 參數 | 值 | 位置 | 依據 |
|---|---|---|---|
| Lee 濾波視窗 | 判水 3×3、崩塌 5×5 | `detect/barrier_lake.py` | 文獻＋自訂 |
| 判水門檻（SAR） | 固定 −18 dB | `detect/water.py` | 文獻 |
| 判水規則（光學查證） | Sentinel-2：MNDWI > 0 且 B8 < 500；航照：NDVI < −0.15 且 NDWI > 0.2 | `detect/water.py` | 文獻／自訂 |
| 入射角／視向 | 39°；升軌 77°、降軌 283° | `preprocess/mask.py` | 規格 |
| 判水最大坡度 | 35° | `run_sar_series.py`、`run_sar_all.bat` | 自訂（馬太鞍溪 8/27） |
| 判水起始坡度 | 20°，≥ 1 像元 | 同上 | 回放比較 5 組後選定 |
| 河網最小集水面積 | 1 km² | `detect/barrier_lake.py` | 自訂 |
| 崩塌門檻 | \|Δσ⁰\| ≥ 3 dB | `detect/landslide.py` | 文獻方法、數值自訂 |
| 崩塌最小碎塊 | 10 像元 | `detect/barrier_lake.py` | 自訂 |
| 最小湖面積 | 0.5 公頃 | 同上 | 文獻＋清冊 |
| 碎塊合併間隙 | 3 像元 | 同上 | 自訂 |
| 貼河道外擴 | 2 像元 | 同上 | 自訂 |
| 崩塌搜尋半徑 | 500 m | 同上 | 清冊（壩址到崩塌點距離中位數 219 m） |
| 壩體高程容許值 | 5 m | 同上 | 自訂 |
| 持續 IoU | 0.3 | 同上 | 自訂 |
| 跨期追蹤半徑 | 250 m | `events/build.py` | 自訂 |
| 規模級距 | < 1／1～10／≥ 10 公頃 | `events/triage.py` | 自訂 |
| 擴大／縮小 | ≥ 1.5 倍／≤ 0.67 倍 | 同上 | 自訂 |
| 歷史災害搜尋半徑 | 10 km | 同上 | 自訂 |
| 崩塌堆積提醒門檻 | 落在既有崩塌堆積區 ≥ 10% | `events/triage.py` | 依事先訂好的規則選定（真湖最高 5.6%、E1 39～80%） |
| 回放比對半徑 | 1 km | `events/replay.py` | 自訂 |
| 事件前基準 | 形成前 7～67 天，至少 3 張 | 同上 | 自訂 |
| 雨量熱區 | GSMaP 72 h ≥ 200 mm | `daily/watchlist.py` | 自訂、未校準 |
| 窗格保留／合併 | 30 天／2 km | 同上 | 自訂 |
| 去雲 | Cloud Score+ cs_cdf ≥ 0.65 | `daily/basemap.py` 等 | 自訂 |
| 光學判讀（參考用） | 晴空 ≥ 50% 才判讀；晴空像元判為水 ≥ 30% 看得到水、< 10% 看不到水 | `daily/optical.py` | 自訂、未校準 |

敏感度重點：**最小湖面積**與**判水最大坡度**左右結果；崩塌搜尋半徑、高程容許值、崩塌門檻、貼河道外擴在回放資料上沒有影響（條件 ② 形同虛設）；持續 IoU 只影響高優先。

---

## 9. 操作介面（指令）

以下皆在 `code/` 底下執行。

| 目的 | 指令 |
|---|---|
| 一鍵重建儀表板資料 | `python -m pipeline.build_all [--project <GCP 專案 ID>]` |
| 自動更新 | `python -m pipeline.daily.run --project <ID> [--skip news,sentinel] [--commit [--push]]` |
| 清冊轉換 | `python -m pipeline.ingest.inventory ../data/raw/taiwan-barrier-lakes.csv dashboard/data/lakes.js` |
| 成因敘述 | `python -m pipeline.attribution.annotate` |
| 風險模型 | `python -m pipeline.ingest.risk [--project <ID>]` |
| 事件佇列 | `python -m pipeline.events.build` |
| 單期 SAR 偵測 | `python scripts/analyze_sar_change.py --pre … --post … [--post-later …] --dem … --orbit … --lon … --lat … --lake-id … [--prior-baseline …] --out …` |
| 馬太鞍溪四期 | `scripts\run_sar_all.bat` |
| 逐期序列（負案例） | `python scripts/run_sar_series.py --name neg2026_matai_an --lon 121.29752 --lat 23.70061 --pass-time 21:52 --scenario-name "…" --kind negative` |
| 全清冊回放 | `python scripts/gee_fetch_inventory.py --project <ID>` → `python scripts/run_inventory_replay.py [--only …] [--rerun]` → `python -m pipeline.events.build` |
| 證據圖 | `python scripts/make_sar_evidence.py` |
| 負案例光學查證 | `python scripts/check_neg_e1.py` |
| 新聞候選 | `python -m pipeline.daily.news list｜accept <id> [--scenario …] [--kind …]｜reject <id>` |
| 調參／敏感度／雙門檻 | `python scripts/tune_replay.py`、`sensitivity_replay.py`、`hysteresis_replay.py` |
| 實驗性修改比較 | `python scripts/run_experiment.py --name <名稱> [--extra=--ray-trace-shadow] [--with-vh --extra=--use-vh] [--with-prior]` |
| 漏報診斷 | `python scripts/diagnose_missed_lake.py --lake bl070 --day 20250708 --later 20250720` |
| 崩塌堆積提醒門檻 | `python scripts/old_landslide_threshold.py --derived ../data/experiments/a1_prior/derived` |
| 字型更新 | `python scripts/vendor_fonts.py` |
| 合成示範 | `python -m pipeline.detect.barrier_lake`（四種合成情境） |

GEE 網頁版腳本：`scripts/gee_export_matai_an_s1.js`（正案例）、`gee_export_series_s1.js`（逐期序列）、`gee_check_s2_e1.js`（負案例 Sentinel-2）、`gee_check_bl070_passes.js`（草嶺過境清單）；本機無法登入 GEE 時，回放影像與一年前基準可用 `gee_export_inventory.js`、`gee_export_prior.js`（由 `gee_codeeditor_*.py` 產生）匯出，再用 `split_*_exports.py` 拆檔。每支程式的用途見 `code/scripts/README.md`。

---

## 10. 部署

| 方式 | 說明 |
|---|---|
| 本機 | 直接開 `code/dashboard/index.html` 或 `run_dashboard.bat` |
| GitHub Actions＋GitHub Pages（正式） | `.github/workflows/daily.yml`：每兩天 07:17（台灣時間），Ubuntu＋Python 3.12，安裝 `requirements-daily.txt`，執行 `pipeline.daily.run --commit --push`，逾時 150 分鐘。Secrets：`GEE_SERVICE_ACCOUNT_KEY`、`GEE_PROJECT`。根目錄 `index.html` 轉址到 `code/dashboard/` |
| Netlify（備選） | `netlify.toml`：發布 `code/dashboard`，建置時把 `docs/evidence/` 複製進去；`data/*.js` 不快取 |
| Windows 本機排程（開發用） | `code/scripts/install_daily_task.ps1 -Project <ID> [-Commit]`，日誌在 `data/live/logs/` |

本機與雲端只能選一邊 commit，避免互相衝突。公開網站只發布 `code/dashboard/`；人工查證紀錄只存在各自的瀏覽器裡。

---

## 11. 測試

執行：`cd code && pytest`（或 `python -m unittest discover -s tests`）。各模組也可直接執行跑 doctest。

| 測試檔 | 測試函式數 | 對象 |
|---|---|---|
| `test_assess.py` | 31 | 蓄水量、淹沒、暴露 |
| `test_attribution.py` | 39 | 成因規則與敘述 |
| `test_backtest.py` | 10 | 回測 |
| `test_daily.py` | 10 | 自動更新（含 `passes` doctest） |
| `test_detect.py` | 35 | 判水、光學判水規則、固定門檻、VH 補判、既有崩塌堆積比例 |
| `test_events.py` | 37 | 持續性、優先、信心、提醒、任務、下一期與過境推估 |
| `test_observations.py` | 5 | 觀測表 |
| `test_replay.py` | 4 | 回放判定 |
| `test_risk.py` | 9 | 風險模型 |
| `test_sar.py` | 38 | 前處理、遮罩、射線追蹤陰影、雙門檻、整條 SAR 流程 |
| `test_scale.py` | 8 | 規模級距 |
| **合計** | **226** | 另有各模組 doctest（`python -m unittest discover -s tests` 連同 doctest 計數較多） |

沒裝 shapely、rasterio 時，部分測試會失敗（`docs/notes/handoff.md` 記為 5 項，屬正常）。

合成驗證：南北向山谷四種情境（崩塌堵河且兩期持續 → A；單期 → B；無崩塌 → C；崩塌只在湖面以上 → C），不貼河道的積水不列入；20 組隨機 speckle × 5 種情境，每次都只有 1 個候選且分級正確。

---

## 12. 驗證結果

### 12.1 馬太鞍溪（2025，降軌 105）

| 影像 | 湖 | 其他候選 |
|---|---|---|
| 7/22＋7/28 複核 | 未偵測（湖尚未成形） | 2 個 B 級，複核未持續 |
| 7/28＋8/3 複核 | A 級 5.7 公頃，IoU 0.52 | 無 |
| 8/21＋8/27 複核 | A 級 25.6 公頃，IoU 0.77 | 1 個 B 級，複核未持續 |
| 8/27 單期 | B 級 22.5 公頃 | 無 |

- 回放：7/29 E3 首次偵測，對上 7/24 光學與 7/27 航拍，多源一致直接列高優先、信心「高」。3 個誤報從頭到尾沒進高優先。
- 航照比對：生產者精度 21～38%（SAR 只抓到真實湖面的兩到四成），使用者精度 77～100%（位置正確）。

### 12.2 2026 汛期負案例（同窗格同參數，17 期）

整季只有一個事件 E1（崩塌堆積區，0.6～0.7 公頃），7/13 起列高優先，之後 7 個時點顯示「持續性中斷」。Sentinel-2 查證確認不是水（B8 1,091～1,803、MNDWI −0.08～0.03）。信心從未到「高」。
福衛八號（2026-03-31／04-15，汛期前）看到 E1 是乾的裸露堆積（水像元 0.5%），同一天 3/31 的降軌雷達在 E1 卻有 20% 像元低於 −18 dB，與 7 月列為高優先時的 28～32% 相近：E1 的暗是堆積本身的性質，不是汛期才出現的水（`docs/fs8-validation.md`）。

### 12.3 全清冊回放（23 筆）

| 指標 | 結果 |
|---|---|
| 偵測到 | 7／23（隨機期望 3.1） |
| 蓄水量 ≥ 20 萬 m³ | 5／7（隨機期望 1.7） |
| < 20 萬 m³ | 1／11（隨機期望 1.1） |
| 未登載 | 1／5（隨機期望 0.3） |
| 窗格內其他事件 | 17 個，其中高優先 8 個 |
| 留一交叉驗證 | 7／3.1 |

大型堰塞湖 SAR 多半看得到；小型的（≤ 10 萬 m³）和隨機差不多。最大的漏報是草嶺（1,400 萬 m³）：湖只存在約兩天，唯一一次過境（7/8 18:01）在堵塞前後、湖還沒蓄水，預期湖區的背向散射與事件前相同（見 `docs/bl070-diagnosis.md`）。

---

## 13. 已知限制

1. **參數校準樣本小**：坡度 35° 只用馬太鞍溪選定；雙門檻在 23 筆回放上選定，改善約 1 筆，統計上分不開。
2. **偵測到不等於找對**：窗格內事件多時可能是碰巧，統計表附碰巧命中機率。
3. **崩塌堆積區會持續誤報**：事件前 DEM 看不到崩塌後的新陡崖與平滑泥砂面；優先等級目前不受「只有 SAR」限制。緩解：用一年前的影像標出事件前已存在的崩塌堆積區，疑似水體落在裡面就在事件卡加註提醒（E1 會被提醒到）；但當次事件新產生的崩塌上的誤報不會被提醒，要靠複核過濾。2015 年的案例與每日自動監看沒有一年前基準。
4. **陰影只做局部坡面判定**：被遠處山脊擋住的陰影抓不到。射線追蹤陰影已實作並測試，但少抓到一座湖，未採用（開關預設關閉）；前縮只能統計。
5. **SAR 面積嚴重偏低**：只抓到真實湖面約兩到四成，不能直接算蓄水量。
6. **偵測時效受重訪限制**：單軌約 12 天、雙軌約 6 天；兩次過境之間的狀況無法得知。
7. **回放窗格是事後選的**：以清冊壩址為中心；實際值班要由崩塌熱區或雨量警戒決定。
8. **外部成果多為人工整理**：發布時間只知道日期，一律視為當天 23:59 取得；新聞只產生候選。
9. **條件 ②（附近有崩塌）形同虛設**：山區窗格幾乎到處偵測得到崩塌。
10. **小湖看不到**：最小湖面 0.5 公頃。
11. **後續擴充模組的限制**：暴露人口只涵蓋湖體；風險模型正樣本 12 筆、未留出驗證；溢流預報只考慮溢頂。
12. **只用 VV 極化**：加入 VH 補判已測試，湖多抓 3 座但誤報幾乎加倍，未採用。崩塌偵測只用振幅比值法（沒做 SLC 相干性）。

---

## 14. 附錄：文件與程式不一致處

以程式碼為準。2026-10-29 文件對齊後的狀態：

**已修正**

| 位置 | 原本寫的 | 改為 |
|---|---|---|
| `code/pipeline/detect/README.md` 已知限制 | D8 河網沒有先填窪 | 先以 priority-flood 填窪再計算 |
| `code/pipeline/detect/README.md` 最後一段 | 還沒用真實 Sentinel-1 跑過、`orbit = 69` 是佔位值 | 刪除 |
| `code/pipeline/detect/barrier_lake.py` `flow_accumulation_d8()` 說明 | 沒有先做填窪 | 補「呼叫端 `river_mask()` 預設會先填窪」 |
| `data/README.md`「重新產生」 | `build_all --live` 用 CWA 即時雨量 | `build_all --project`（GSMaP） |
| `README.md` 開頭範例 | E3「目前缺少光學影像」 | 改成儀表板實際產生的 7/29 摘要 |
| `README.md` 目錄說明 | `derived/` 不進版控 | 註明 `final_*.json` 有進版控 |
| `docs/notes/handoff.md` | 全部測試 180 項 | 208 項（unittest，含 doctest）；pytest 為 193 項 |
| `docs/parameters.md`、`water.py` 檔頭、`detect/README.md` 檔案表 | 判水用 Otsu | 程式正式改為固定 −18 dB（A3），文件同步 |
| `README.md`「草嶺漏報」 | 原因待查 | 寫入 A4 診斷結論（見 `docs/bl070-diagnosis.md`） |
| `README.md`、`docs/events.md`、`aerial-validation.md` | SAR 只抓到兩到三成 | 兩到四成（航照實測 21～38%） |
| `README.md` 等文件多處 | 暗區 | 疑似水體／背向散射低（與儀表板一致） |
| `README.md`、`docs/events.md` 負案例 E1 光學數字 | B8 1,070～1,820、MNDWI −0.08～0.04（雙門檻前的範圍） | B8 1,091～1,803、MNDWI −0.08～0.03（目前的範圍，結論不變） |

**尚未修正**

| 位置 | 文件寫的 | 實際 | 原因 |
|---|---|---|---|
| `pyproject.toml`、`requirements.txt` 註解 | requests 用於 CWA 即時雨量 | 專案程式已不直接使用 requests | 套件設定檔，選做 |
