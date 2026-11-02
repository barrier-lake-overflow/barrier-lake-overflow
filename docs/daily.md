# 自動更新

`python -m pipeline.daily.run`（在 `code/` 底下）把資料抓一輪，重產儀表板。模組名稱沿用 daily，實際排程是**每兩天一次**。

**正式部署：GitHub Actions ＋ GitHub Pages。** GitHub Actions 每兩天跑這支程式、把結果 commit 回 repo，
GitHub Pages 偵測到 push 後自動更新網站：<https://barrier-lake-overflow.github.io/barrier-lake-overflow/>。
（repo 根目錄的 `index.html` 會轉到 `code/dashboard/`。）要改用 Netlify 的話設定也已備好，見下方「Netlify」。
本機 Windows 排程只留給開發測試用。

為什麼兩天一次：衛星雨量在 GEE 上本來就落後 1～2 天，每天跑對雨量沒有幫助。代價是警戒窗格、Sentinel-1 新影像、
新聞最多晚 2 天；颱風期間建議到 Actions 頁面手動 Run workflow。

## 每次做什麼

| 步驟 | 來源 | 產出 |
|---|---|---|
| inventory | [農村水保署堰塞湖清冊](https://tech.ardswc.gov.tw/Results/BarrierLakeInfo)（網站的 XLSX 下載） | `data/raw/taiwan-barrier-lakes.csv` → `lakes.js`、成因敘述 |
| alerts | [土石流及大規模崩塌警戒](https://data.gov.tw/dataset/148402)（農業部開放資料） | 發布中的警戒（`state.json`） |
| rain | GSMaP v8 雨量計校正版（Google Earth Engine，JAXA） | 94 處大規模崩塌潛勢區的 24／72 小時雨量 |
| risk | GSMaP | 各湖 1／3／7／30 天雨量 → 風險模型 `risk.js` |
| watchlist | 上面三項 | 監看窗格（`data/live/state.json`） |
| sentinel | Sentinel-1 GRD（Google Earth Engine） | 各窗格新過境的偵測結果、情境檔 `data/raw/scenarios/live_*.json` |
| passrain | GSMaP | 每一期過境前 24／72 小時雨量，寫進情境檔 `passes[].rain` |
| basemap | Sentinel-2、Landsat 8/9 | 各情境小地圖的事件前光學底圖（缺的才做） |
| optical | Sentinel-2 L2A、Landsat 8/9 L2（Google Earth Engine） | ① 光學偵測：各窗格晴空景的新增水體，與 SAR 並列的偵測來源，結果 `final_opt_live_*.json`、情境檔 `opticalDetection`；② 光學判讀：最近 45 天雲量、下一次預計過境、各事件位置看不看得到水，情境檔 `optical`（見下節） |
| news | Google 新聞 RSS | 外部證據候選 `data/live/news.json` |
| build | 以上 | `events.js`、`replay.js`、`daily.js` |

每一步獨立執行，失敗會記在 `data/live/status.json` 與儀表板「每日自動更新」面板，不會擋後面的步驟。
來源失敗（例如警戒 API 連不上）時，該來源的窗格當天不判定過期，避免誤把窗格關掉。

## 監看窗格怎麼決定

三種觸發，2 km 內的併成同一個 4 km 窗格：

1. **清冊監測中**：清冊「存在（監測中）」的湖，以壩址為中心；清冊改成消失或穩定，窗格當天停止。
2. **警戒**：發布中的土石流警戒（依潛勢溪流編號）與大規模崩塌警戒（依崩塌區編號），位置查 `data/raw/hotspots.json`
   （由 `scripts/prepare_hotspots.py` 從 [1745 條土石流潛勢溪流](https://data.gov.tw/dataset/172537)、
   [94 處大規模崩塌潛勢區](https://data.gov.tw/dataset/176528) 轉出；溪流取線段中點）。
3. **雨量熱區**：大規模崩塌潛勢區的 GSMaP 72 小時雨量 ≥ 200 mm。

警戒與雨量窗格在最後一次觸發後保留 30 天（堰塞湖常在豪雨後幾天才被發現）。

窗格啟用時固定：事件前基準（啟用前 7～67 天中位數）與軌道。**事件前基準 ≥ 3 張的軌道全部都抓**
（花蓮一帶是升軌 69＋降軌 105），都不足時只抓張數最多的一軌。每一軌是獨立序列：自己的事件前基準、
自己的複核期（升降軌照射方向相反，陰影與疊置位置不同，不能互相複核）；偵測結果合併成同一個情境，
事件追蹤跨軌道（250 m 內視為同一事件）。兩軌交錯讓重訪從約 12 天縮短到約 6 天。

每次執行抓各軌新過境，只保留最近 90 天；前一期當時沒有複核期的，新影像到了會拿來重跑。

**下一期**：每顆 Sentinel-1 同一軌固定 12 天重複一次，但哪幾顆衛星拍哪一軌會變（2026 年：升軌 69 從 S1A 換成只剩 S1D；
降軌 105 以 S1C 為主、S1D 偶爾加拍），所以每一軌**每顆衛星**各自從最近一次取得往後推 12 天，只算 36 天內在這一軌拍過的衛星，
取最早的一次（`daily/sentinel.py` `orbit_satellites`、`events/build.py` `next_sar_pass`）。最新一期另外參考最近一次**成功**查詢的時間
（情境檔 `sarCheckedAt`）：查詢前一天以前該到卻沒有影像的過境，視為衛星沒拍，跳到再下一次。查詢失敗時這個時間不會更新，
所以排程壞掉時儀表板仍會顯示「應已過境 X 天，尚無資料」。回放情境沒有軌道資料，沿用「該期 + 重訪間隔」。

儀表板「接下來的衛星過境」（`events/build.py` `upcoming_passes`）列出監看窗格接下來 16 天的 Sentinel-1（同上推法）
與 Sentinel-2／Landsat（`optical.next`）預計過境。演練回放改用各期自己的過境（`daily/passes.py`，步驟 `passes`）：
抓情境中心實際的取像時間存到 `data/derived/satpasses/`，每一期只用該期以前的取像、同樣的固定週期往後推，不偷看事後資料。
偵測參數與全清冊回放完全相同。全清冊回放仍是每湖一軌（形成後最早有影像的一軌），規則不變。

**未校準的門檻**：雨量 200 mm／72 h、保留 30 天、合併 2 km 都是自訂值。可以用
[警戒發布紀錄](https://data.gov.tw/dataset/156617) 與 GSMaP 歷史雨量回頭校準，尚未做。

## 光學影像（Sentinel-2、Landsat）

`pipeline/daily/optical.py`，只做監看中的窗格，每個窗格做兩件事。

**① 光學偵測（與 SAR 並列的第二個偵測來源）**：GEE 端在 `pipeline/daily/optical_detect.py`，偵測規則在 `pipeline/detect/optical.py`
（規則與全清冊回放驗證見 [`validation.md`](validation.md)「光學偵測來源」）。

- 時間窗與 SAR 相同：事件前基準為窗格啟用前 7～67 天（每個像元只用晴空觀測取中位數），逐期從啟用前 7 天起，只留最近 90 天。
- 每次列出期間內所有景、算 4 km 窗格晴空比例（一次 GEE 呼叫），晴空過半的景才算一期。
- 只下載需要跑的期別：沒有結果檔、或當時沒有複核期而現在有下一期的（與 SAR 相同）。每景三個整數波段（約 1 MB），
  事件前基準與 DEM 每次重新下載。結果 `data/derived/final_opt_live_*.json` 進版控，所以 CI 每次在乾淨環境也能接續。
- 偵測結果寫進情境檔 `opticalDetection.passes`，與 SAR 的 `passes` 分開存（sentinel 步驟重寫情境檔時會保留），
  build 時兩者合在一起追蹤事件、研判（[`events.md`](events.md)「偵測來源」）。
- 偵測失敗不擋判讀；那個窗格記為失敗，上一次的偵測結果留著。

**② 光學判讀**：每個窗格兩次 GEE 呼叫（影像清單、統計），不下載影像。

- **影像**：Sentinel-2 L2A（`COPERNICUS/S2_SR_HARMONIZED`）用 Cloud Score+ cs_cdf ≥ 0.65 當晴空（與底圖、負案例查證相同，
  不用 SCL）；Landsat 8/9 Collection 2 L2 用 `QA_PIXEL` 排除雲、膨脹雲、卷雲、雲影。同一天同一顆衛星的相鄰圖幅併成一景。
  Cloud Score+ 偶爾比影像晚上架，那一景先記「雲量資料未到」，下次更新再判讀。
- **判水**：`detect/water.py` 的 Sentinel-2 規則（MNDWI > 0 且 B8 < 500）；Landsat 換算成同一反射率尺度後套同一規則（未另外驗證）。
  範圍是最近一次偵測（SAR 或光學）的水體多邊形，只看事件首次偵測以後的影像。晴空像元未過半＝雲遮；晴空像元中判為水 ≥ 30%＝看得到水、
  < 10%＝看不到水、其間＝少量水。**門檻自訂、未校準**。
- **下一次過境**：Sentinel-2 每顆衛星每個軌道 10 天、Landsat 每顆衛星每個 WRS 圖幅 16 天，從最近 45 天實際取得的影像往後推 16 天內的日期。
  只是估計（衛星排程、影像上架延遲都可能不同）。
- **只會壓低、不會提高**：結果附在事件卡與事件清單上；晴空至少兩次判為沒有水時優先最高到「中」，
  SAR 沒看到但光學仍看得到水時不說潰決（[`events.md`](events.md)）。自動判讀不算獨立證據，要人工查證確認。
  回看前幾期時，事件卡只列下一期過境前拍到的影像。

## 雨量

- **GSMaP**（`JAXA/GPM_L3/GSMaP/v8/operational`，`hourlyPrecipRateGC`）：不需要金鑰，1998 年起都有。**GEE 上通常落後 1～2 天**（2026-10-12 實測：GSMaP 36 小時、IMERG 47 小時），儀表板會顯示雨量資料至何時。
  所以雨量熱區觸發在颱風時會晚 1～2 天；即時的是農村水保署警戒，最緊急的狀況會先由警戒觸發。
  用雨量計校正版，因為未校正版在台灣山區低估明顯（馬太鞍溪形成前 72 小時：未校正 93 mm、校正 249 mm）。
  解析度約 11 km，仍是衛星估計，事件卡上標示「衛星估計，非測站」。
- **風險模型**的 1／3／7／30 天雨量也用 GSMaP（模型以 ERA5-Land 網格雨量訓練，網格雨量比單點測站接近）。
  已不再呼叫 CWA API，也不需要金鑰；儀表板原本「貼 CWA 金鑰更新即時風險」的功能已移除，改由每日排程更新。
- 事件卡的「形成期間雨量」優先用 `observations.csv` 人工查證的測站值，沒有才用 GSMaP。
- GSMaP 約 11 km 一格，相鄰的湖（例如萬里溪與馬太鞍溪）可能落在同一格、數值相同。

## 新聞候選

Google 新聞 RSS 以「堰塞湖」等關鍵字查最近 7 天，依標題與摘要的關鍵字分類（空拍／航拍／無人機 → 航拍，
衛星影像／衛星監測 → 衛星，勘查／通報／發現 → 現地，其他 → 背景），並比對清冊湖名與監看窗格的溪名。
**只產生候選**，人工確認後才寫進情境檔、進研判：

```bash
python -m pipeline.daily.news list
python -m pipeline.daily.news accept <id>                       # 用對到的情境
python -m pipeline.daily.news accept <id> --scenario inv_bl072 --kind aerial   # 指定情境、改正分類
python -m pipeline.daily.news reject <id>
```

確認時位置用情境中心、半徑 1 km（新聞通常只有溪名）。RSS 只看得到最近的新聞，**過去的外部證據沒辦法用這個補**，
全清冊回放的證據仍要人工查（進度在 `data/raw/external_evidence_research.json`）。

## 本機排程（Windows，選用）

只在開發測試、或沒有 GitHub Actions 時用。第一次要先登入 GEE（`earthengine authenticate`）。之後：

```powershell
powershell -ExecutionPolicy Bypass -File code\scripts\install_daily_task.ps1 -Project ossint2026
Start-ScheduledTask -TaskName BarrierLakeDailyUpdate     # 立即跑一次
```

預設每天 08:00，錯過（關機、睡眠）會在下次開機後補跑。日誌在 `data/live/logs/daily-YYYYMMDD.log`。
加 `-Commit` 會把結果 git commit（不推上遠端）。移除：`... install_daily_task.ps1 -Remove`。

## GitHub Actions（雲端）

`.github/workflows/daily.yml` 每兩天 07:17（台灣）執行（GitHub 排程可能延遲數十分鐘；急著更新時可手動 Run workflow），結果自動 commit 並推回 repo。需要 repo 擁有者設定一次：

1. **建 GEE 服務帳號**：Google Cloud Console → 專案 `ossint2026` → IAM 與管理 → 服務帳戶 → 建立
   （例如 `daily-update`），角色給「Earth Engine Resource Writer」（`roles/earthengine.writer`）與「Service Usage Consumer」。
   不能只給「Earth Engine Resource Viewer」：唯讀角色沒有 `earthengine.thumbnails.create`，雨量算得出來但影像下載不了
   （見 `docs/notes/incident-live-monitoring.md`）。
2. 該服務帳戶 → 金鑰 → 新增金鑰 → JSON，下載。
3. GitHub repo → Settings → Secrets and variables → Actions → New repository secret：
   - `GEE_SERVICE_ACCOUNT_KEY`：金鑰 JSON 全文
   - `GEE_PROJECT`：`ossint2026`
4. Settings → Actions → General → Workflow permissions 選「Read and write permissions」。
5. Actions 分頁 → daily-update → Run workflow，手動跑一次確認。

**本機與雲端只選一邊 commit**：兩邊都 commit 會互相衝突。啟用 GitHub Actions 後，本機排程不要加 `-Commit`，
要看最新結果就 `git pull`。

## Netlify

repo 根目錄的 `netlify.toml` 已設定好，在 Netlify 上「Add new site → Import an existing project」選這個 GitHub repo，
其餘欄位留空（設定會從 `netlify.toml` 讀）：

- 發布目錄 `code/dashboard`，不需要建置；建置指令只把 `docs/evidence/` 的證據圖複製進發布目錄
  （事件卡的連結是 `../../docs/evidence/…`，本機直接開檔與網站上都能解析）。
- 儀表板與證據圖都沒變的 push（例如只改 pipeline 或文件）不會重新部署。
- `data/*.js` 設定不快取，每日更新後重新整理就是最新資料。
- 網站是公開的：只發布 `code/dashboard/`，`data/live/`、情境檔、影像都不會上去。
  儀表板上的人工查證紀錄仍只存在各自的瀏覽器裡。
- 新聞候選的 `accept` 仍要在本機用指令做，然後 commit／push；網站上只能看，不能確認。

## 檔案

| 檔案 | 進版控 | 說明 |
|---|---|---|
| `data/live/state.json` | 是 | 監看窗格（啟用日、軌道、已處理影像），排程與 CI 共用 |
| `data/live/news.json` | 是 | 新聞候選與確認紀錄 |
| `data/live/status.json`、`code/dashboard/data/daily.js` | 是 | 最近一次執行狀態 |
| `data/derived/final_live_*.json`、`data/derived/final_opt_live_*.json`、`data/raw/scenarios/live_*.json` | 是 | 監看窗格的偵測結果（SAR、光學）與情境 |
| `data/raw/sentinel1/live/*.tif` | 否 | SAR 影像暫存（約 5 MB／張），CI 每次重新下載需要的那幾張 |
| `data/raw/optical/live/*.tif` | 否 | 光學影像暫存（約 1 MB／張），同上 |
| `data/live/logs/` | 否 | 本機日誌 |
