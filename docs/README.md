# docs — 文件目錄

## 系統怎麼運作

| 想知道 | 看這份 |
|---|---|
| 整套系統怎麼運作、資料格式、指令 | [`system-spec.md`](system-spec.md)（規格說明書） |
| 事件研判規則：持續性、優先等級、信心、提醒、建議任務 | [`events.md`](events.md) |
| 每個門檻的值、依據、敏感度；測試過但沒採用的方法 | [`parameters.md`](parameters.md) |
| 成因敘述怎麼產生（不用 LLM） | [`attribution.md`](attribution.md) |
| 每兩天自動更新、部署 | [`daily.md`](daily.md) |
| 安裝、常用指令、從頭重跑驗證 | [`reproduce.md`](reproduce.md) |
| 給沒裝 Python 的人用 | [`portable-distribution.md`](portable-distribution.md) |
| 開發過程使用生成式 AI 的工具與範圍 | [`genai-disclosure.md`](genai-disclosure.md) |

## 驗證結果

| 想知道 | 看這份 |
|---|---|
| 所有驗證結果：馬太鞍溪正案例、2026 負案例、全清冊回放、光學偵測來源、已知限制 | [`validation.md`](validation.md) |
| SAR 湖面跟航照比對的結果 | [`aerial-validation.md`](aerial-validation.md) |
| 福衛八號查證候選、D8 河網與官方水系比對 | [`fs8-validation.md`](fs8-validation.md) |
| 草嶺為什麼漏報 | [`bl070-diagnosis.md`](bl070-diagnosis.md) |

## 子資料夾

| 資料夾 | 內容 |
|---|---|
| `evidence/` | 影像證據圖（SAR、航照、負案例查證、草嶺診斷）。部分圖用在簡報上，重產前先確認 |
| `results/` | 分析程式產生的數字（敏感度、調參、雙門檻、草嶺診斷、崩塌堆積提醒門檻、光學偵測回放比較），由 `code/scripts/` 重產 |
| `reference/` | 開放資料清單（`ossint-open-data-atlas.html`），資料來源與授權可查 |
