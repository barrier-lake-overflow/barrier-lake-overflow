# 執行企劃：每日自動監看停在 10/11

撰寫：2026-11-01

## 一、問題

每日自動更新（GitHub Actions，每兩天一次）的 Sentinel-1 影像分析，從 10/14 起沒有再產生新結果：

- 三個監看窗格（花蓮萬里溪、花蓮馬太鞍溪、新竹泰崗溪）停在 10/11。
- 10/26 新加入的三個窗格（大規模崩塌潛勢區竹縣 LL002、宜縣 LL001、宜縣 LL003）完全沒有結果。
- 儀表板的待處理清單一直是 10/11 的資料。

## 二、原因

1. **直接原因：服務帳號權限不足。**
   雲端排程用的是 GEE 服務帳號（專案 `ossint2026`）。下載影像需要 `earthengine.thumbnails.create` 權限，這個帳號沒有，每個窗格一開始下載就失敗。
   GitHub Actions log（daily-update #14，2026-10-30）六個窗格都是：

   ```
   Permission 'earthengine.thumbnails.create' denied on resource 'projects/***' (or it may not exist).
   ```

2. **根本原因：服務帳號設成唯讀角色。**
   服務帳號目前是「Earth Engine Resource Viewer」，這是唯讀角色：只能在雲端計算數字（雨量熱區、風險模型、過境前雨量都正常），不能把影像下載回來。
   10/11 的結果是 10/13 有人用個人帳號在本機跑出來的，所以當時沒發現雲端其實下載不到。

## 三、處理步驟

| # | 工作 | 負責人 | 說明 |
|---|---|---|---|
| 1 | 補權限 | `ossint2026` 專案管理者 | Google Cloud Console → IAM 與管理 → IAM → daily-update 服務帳號，加上「**Earth Engine Resource Writer**」（`roles/earthengine.writer`） |
| 2 | 手動重跑一次 | 同上 | GitHub → Actions → daily-update → Run workflow |
| 3 | 確認功能恢復 | 同上 | 重跑完後同步檢查是否已更新：三個窗格補上 10/14、10/16、10/22 等期，另外三個窗格開始有資料（確認方式見下節） |


## 四、如何確認修好了

- Actions 的 daily-update 執行時間明顯變長（每個窗格要下載影像，不會只有幾十秒）。
- `data/derived/` 出現 10/14 之後的 `final_live_*.json`。
- 儀表板的監看窗格不再標紅「資料可能過舊」，待處理清單標題的日期更新，「還沒有分析結果的窗格」那一行消失。
