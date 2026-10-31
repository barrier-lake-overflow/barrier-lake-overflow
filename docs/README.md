# docs — 文件目錄

| 想知道 | 看這份 |
|---|---|
| 整套系統怎麼運作、資料格式、指令 | [`system-spec.md`](system-spec.md)（規格說明書） |
| 事件研判規則：持續性、優先等級、信心、提醒、建議任務 | [`events.md`](events.md) |
| 每個門檻的值、依據、敏感度；測試過但沒採用的方法 | [`parameters.md`](parameters.md) |
| SAR 湖面跟航照比對的結果 | [`aerial-validation.md`](aerial-validation.md) |
| 草嶺為什麼漏報 | [`bl070-diagnosis.md`](bl070-diagnosis.md) |
| 成因敘述怎麼產生（不用 LLM） | [`attribution.md`](attribution.md) |
| 每兩天自動更新、部署 | [`daily.md`](daily.md) |
| 給沒裝 Python 的人用 | [`portable-distribution.md`](portable-distribution.md) |
| 修改進度（2026-10 這一輪：用詞、圖例、判水標準、崩塌堆積提醒、實驗） | [`progress.md`](progress.md) |
| 決賽前交接、回放講稿、問答準備（2026-10-10） | [`handoff.md`](handoff.md) |

## 子資料夾

| 資料夾 | 內容 |
|---|---|
| `evidence/` | 影像證據圖（SAR、航照、負案例查證、草嶺診斷）。部分圖用在簡報上，重產前先確認 |
| `results/` | 分析程式產生的數字（敏感度、調參、雙門檻、草嶺診斷、崩塌堆積提醒門檻），由 `code/scripts/` 重產 |
| `reference/` | 早期整理的架構圖與開放資料清單（HTML），資料來源與授權可查 `ossint-open-data-atlas.html` |
| `notes/` | 工作筆記（指導老師提問清單） |
