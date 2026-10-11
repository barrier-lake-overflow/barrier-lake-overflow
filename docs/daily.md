# 每日自動更新

`python -m pipeline.daily.run`（在 `code/` 底下）每天把資料抓一輪，重產儀表板。

**正式部署：GitHub Actions ＋ Netlify。** GitHub Actions 每天跑這支程式、把結果 commit 回 repo，
Netlify 偵測到 push 後自動重新部署靜態儀表板。Netlify 本身不跑這條流程（它的排程函式只支援 JS／Go、
執行時間很短，跑不了影像下載與 rasterio）。本機 Windows 排程只留給開發測試用。

## 每天做什麼

| 步驟 | 來源 | 產出 |
|---|---|---|
| inventory | [農村水保署堰塞湖清冊](https://tech.ardswc.gov.tw/Results/BarrierLakeInfo)（網站的 XLSX 下載） | `data/raw/taiwan-barrier-lakes.csv` → `lakes.js`、成因敘述 |
| alerts | [土石流及大規模崩塌警戒](https://data.gov.tw/dataset/148402)（農業部開放資料） | 發布中的警戒（`state.json`） |
| rain | GSMaP v8 雨量計校正版（Google Earth Engine，JAXA） | 94 處大規模崩塌潛勢區的 24／72 小時雨量 |
| risk | GSMaP | 各湖 1／3／7／30 天雨量 → 風險模型 `risk.js` |
| watchlist | 上面三項 | 監看窗格（`data/live/state.json`） |
| sentinel | Sentinel-1 GRD（Google Earth Engine） | 各窗格新過境的偵測結果、情境檔 `data/raw/scenarios/live_*.json` |
| passrain | GSMaP | 每一期過境前 24／72 小時雨量，寫進情境檔 `passes[].rain` |
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

窗格啟用時固定：事件前基準（啟用前 7～67 天中位數）、軌道（基準張數最多的一軌）。之後每天抓該軌新過境，
只保留最近 90 天；前一期當時沒有複核期的，新影像到了會拿來重跑。偵測參數與全清冊回放完全相同。

**未校準的門檻**：雨量 200 mm／72 h、保留 30 天、合併 2 km 都是自訂值。可以用
[警戒發布紀錄](https://data.gov.tw/dataset/156617) 與 GSMaP 歷史雨量回頭校準，尚未做。

## 雨量

- **GSMaP**（`JAXA/GPM_L3/GSMaP/v8/operational`，`hourlyPrecipRateGC`）：不需要金鑰，GEE 上約延遲半天，1998 年起都有。
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

`.github/workflows/daily.yml` 每天 07:30（台灣）執行，結果自動 commit 並推回 repo。需要 repo 擁有者設定一次：

1. **建 GEE 服務帳號**：Google Cloud Console → 專案 `ossint2026` → IAM 與管理 → 服務帳戶 → 建立
   （例如 `daily-update`），角色給「Earth Engine Resource Viewer」與「Service Usage Consumer」。
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
| `data/derived/final_live_*.json`、`data/raw/scenarios/live_*.json` | 是 | 監看窗格的偵測結果與情境 |
| `data/raw/sentinel1/live/*.tif` | 否 | 影像暫存（約 5 MB／張），CI 每次重新下載需要的那幾張 |
| `data/live/logs/` | 否 | 本機日誌 |
