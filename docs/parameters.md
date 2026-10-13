# 參數與依據

偵測與研判用到的每個門檻：數值、來源，以及改動後結果會差多少。
「依據」欄分四種：**規格**（衛星或資料本身的規格）、**文獻**（有出處的常用值）、**清冊**（用農村水保署堰塞湖清冊算出來的）、**自訂**（專案自己定的，沒有校準）。

敏感度的數字來自 `scripts/sensitivity_replay.py`（結果在 `docs/sensitivity.json`），做法見文末。

## 偵測（SAR → 候選 A/B/C）

| 參數 | 值 | 程式位置 | 依據 | 敏感度 |
|---|---|---|---|---|
| Lee 濾波視窗 | 判水 3×3、崩塌 5×5 | `detect/barrier_lake.py` | 文獻：Lee 1980。自訂：視窗大小（山區河道只有 2～3 像元寬，判水用小視窗） | 未測 |
| 判水門檻 | Otsu 自動；Otsu 高於 −14 dB 時改用 −18 dB | `detect/water.py` | 文獻：Otsu 1979；−18 dB 參考 Twele et al. 2016 | 未測 |
| 陰影／疊置遮罩 | 入射角 39°；視向升軌 77°、降軌 283° | `preprocess/mask.py` | 規格：Sentinel-1 IW 入射角 29°～46°，取中間值 | 未測 |
| 判水最大坡度 | 35° | `scripts/run_sar_series.py` | 自訂：30 m DEM 在窄谷會把谷底坡度拉高，20° 會把湖面整片遮掉 | 未測 |
| 河網最小集水面積 | 1 km² | `detect/barrier_lake.py` | 自訂 | 未測 |
| 崩塌門檻 | \|Δσ⁰\| ≥ 3 dB | `detect/landslide.py` | 文獻：振幅比值法（Mondini et al. 2019）。**3 dB 這個數值沒有查到出處**，屬自訂 | 2～4 dB：**沒有影響** |
| 崩塌最小碎塊 | 10 像元 | `detect/barrier_lake.py` | 自訂 | 未測 |
| **最小湖面積** | **0.5 公頃** | `detect/barrier_lake.py` | 文獻：Sentinel-1 能穩定辨識的水體約 ≥ 1 公頃（廣州研究召回率 > 0.8 需 > 10⁴ m²），另一研究約 2 公頃。清冊：0.5 公頃約等於 2.5～5 萬 m³（假設平均水深 5～10 m），有登載蓄水量的 43 湖中 7～9 湖低於此值 | **最敏感**，見下表 |
| 碎塊合併間隙 | 3 像元 | `detect/barrier_lake.py` | 自訂：湖常被原河道切成兩半 | 未測 |
| 貼河道（條件 1） | 河道外擴 2 像元內 | `detect/barrier_lake.py` | 自訂 | 未測 |
| 崩塌搜尋半徑（條件 2） | 500 m | `detect/barrier_lake.py` | 清冊：72 湖壩址到崩塌點距離中位數 219 m，46 湖（64%）≤ 500 m | 200～1000 m：**沒有影響** |
| 壩體高程容許值（條件 2） | 5 m | `detect/barrier_lake.py` | 自訂 | 0～20 m：**沒有影響** |
| 持續 IoU（條件 3） | 0.3 | `detect/barrier_lake.py` | 自訂。存續時間的分布有文獻可對照，見下方「持續性」 | 只影響高優先，見下表 |

## 研判與回放

| 參數 | 值 | 程式位置 | 依據 |
|---|---|---|---|
| 跨期追蹤半徑 | 250 m | `events/build.py` | 自訂 |
| 規模分級 | < 1 公頃小、1～10 中、≥ 10 大 | `events/triage.py` | 自訂 |
| 擴大／縮小 | 面積 ≥ 1.5 倍／≤ 0.67 倍 | `events/triage.py` | 自訂 |
| 只有 SAR 時信心最高到「中」 | — | `events/triage.py` | 設計原則：單一感測器不能自我證實 |
| 回放「偵測到」的比對半徑 | 清冊壩址 1 km | `events/replay.py` | 自訂：清冊座標是壩體，湖面在上游 |
| 事件前基準 | 形成前 7～67 天中位數，至少 3 張 | `events/replay.py` | 自訂 |
| 隨機基準 | 把壩址換成窗格內任一點，1 km 內剛好有事件的機率 | `events/replay.py` | 自訂：用來判斷偵測數有多少是碰巧 |

## 每日監看與底圖

| 參數 | 值 | 依據 |
|---|---|---|
| 雨量熱區 | GSMaP 72 小時 ≥ 200 mm | 自訂（[daily.md](daily.md)「未校準的門檻」） |
| 窗格保留 | 最後一次觸發後 30 天 | 自訂 |
| 窗格合併 | 2 km | 自訂 |
| 去雲 | Cloud Score+ cs_cdf ≥ 0.65 | 自訂 |

## 持續性：清冊與文獻對照

條件 3 需要湖撐到下一期影像。單一軌道約 12 天一期，兩軌交錯約 6 天。

| 存續時間 | 清冊（有記錄日數的 34 湖） | Schuster & Costa（63 案） | 352 壩統計（Frontiers 2022） |
|---|---|---|---|
| ≤ 1 天 | 3 湖（9%） | 22% | 30% |
| ≤ 10 天 | 12 湖（35%） | 約 50% | — |
| ≤ 1 個月 | 14 湖（41%） | — | 68% |
| ≤ 1 年 | 27 湖（79%） | — | 84% |

方向一致：三分之一以上的湖在第二期影像前就消失，所以「沒有持續」不能拿來排除堰塞湖。現行設計把沒有持續的候選給 B 級，不刪除，這和上表相符。
清冊的存續時間比文獻長，可能是因為短命的湖沒有記錄日數（76 湖中只有 34 湖有記錄）。

## 敏感度分析

**做法：**
- 對象是全清冊回放 23 湖，加上 2026 汛期的負案例。
- 每次只改一個參數，其餘維持基準值。
- 每組參數都照正式流程走一遍：分類、串事件、研判優先等級、比對清冊壩址、算隨機基準。
- 基準組的結果與儀表板相同（偵測 8、隨機期望 5.0），確認重算的流程與正式版一致。

| 參數 | 值 | 偵測／隨機期望 | 高優先偵測／隨機期望 | 其他事件 | 負案例事件／高優先 |
|---|---|---|---|---|---|
| **基準** | — | **8／5.0** | **5／2.7** | 49 | 1／1 |
| 最小湖面積 | 0.2 公頃 | 16／13.2 | 13／9.3 | 250 | 13／8 |
| 最小湖面積 | 1 公頃 | 3／1.6 | 3／1.1 | 8 | 1／1 |
| 最小湖面積 | 2 公頃 | 2／0.9 | 2／0.6 | 3 | 0／0 |
| 持續 IoU | 0.1 | 8／5.0 | 8／4.7 | 49 | 1／1 |
| 持續 IoU | 0.5 | 8／5.0 | 4／1.3 | 49 | 1／1 |
| 崩塌搜尋半徑 | 200、1000 m | 8／5.0 | 5／2.7 | 49 | 1／1 |
| 壩體高程容許值 | 0、20 m | 8／5.0 | 5／2.7 | 49 | 1／1 |
| 崩塌門檻 | 2 dB | 8／5.0 | 5／2.7 | 49 | 1／1 |
| 崩塌門檻 | 4 dB | 8／5.0 | 5／2.6 | 49 | 1／1 |

「其他事件」是 23 湖窗格內，不在清冊壩址 1 km 內的事件總數，可以看成誤報量的上限。

**讀法：**

1. **最小湖面積是唯一真正左右結果的參數。** 門檻放寬到 0.2 公頃，偵測數翻倍（16），但隨機期望也跟著漲到 13.2，誤報從 49 增加到 250，負案例出現 8 個高優先誤報。收緊到 1～2 公頃，誤報幾乎歸零，但只剩大湖（泰崗溪、馬太鞍溪、萬里溪 bl075）抓得到。不論門檻設多少，偵測數超出隨機的幅度都只有 1～3 湖。
2. **條件 2（附近有崩塌）在這些資料上沒有作用。** 搜尋半徑、高程容許值、崩塌門檻怎麼改，結果都一樣。山區窗格裡幾乎到處都偵測得到崩塌，這個條件每次都成立；A／B 主要由條件 3 決定。
3. **持續 IoU 只影響「高優先」。** 0.1 時偵測到的 8 湖全部升為高優先，隨機期望也到 4.7；0.5 時剩 4 湖，隨機期望 1.3。
4. **樣本太少，不能據此挑參數。** 只有 23 湖，偵測數與隨機期望差 1～3 湖，在統計上分不開。以基準組粗估（卜瓦松近似），期望 5.0 時偶然出現 ≥ 8 的機率約 13%。另外，這裡一次比了 12 組參數，若事後挑出看起來最好的一組，結果會偏樂觀。

**因此沒有改任何參數。** 這份分析的用途是：

- 說明「最小湖面積」是關鍵門檻，現行的 0.5 公頃比文獻建議的下限（約 1 公頃）小，以多抓小湖換來較多誤報；
- 說明條件 2 目前形同虛設。要讓它有作用，需要更嚴格的定義，例如崩塌必須跨過河道。

重現：`cd code && python scripts/sensitivity_replay.py`（需要本機已下載的回放影像，約 30 分鐘）。

## 文獻

- Lee, J.-S. (1980). Digital image enhancement and noise filtering by use of local statistics. *IEEE TPAMI* 2(2).
- Otsu, N. (1979). A threshold selection method from gray-level histograms. *IEEE TSMC* 9(1).
- Twele, A., Cao, W., Plank, S., Martinis, S. (2016). Sentinel-1-based flood mapping: a fully automated processing chain. *IJRS* 37(13).
- Mondini, A. C. et al. (2019). [Sentinel-1 SAR amplitude imagery for rapid landslide detection](https://geomorphology.irpi.cnr.it/publications/repository/links/journals/2019/sentinel-1-sar-amplitude-imagery-for-rapid-landslide-detection-remote-sensing). *Remote Sensing* 11, 760.
- Schuster, R. L., Costa, J. E. (1986). [A perspective on landslide dams](https://www.usgs.gov/publications/perspective-landslide-dams). USGS.
- [Frontiers in Earth Science (2022)：352 座堰塞壩存續時間統計](https://frontiersin.org/journals/earth-science/articles/10.3389/feart.2022.1062981/pdf)
- [Water 13, 945（2021）：Sentinel-1 小水體可辨識面積](https://mdpi-res.com/d_attachment/water/water-13-00945/article_deploy/water-13-00945.pdf)
- [Mapping small and medium-sized water reservoirs using Sentinel-1A, Chiapas（JARS 2020）](https://opticalengineering.spiedigitallibrary.org/journals/journal-of-applied-remote-sensing/volume-14/issue-03/036503/Mapping-small-and-medium-sized-water-reservoirs-using-Sentinel-1A/10.1117/1.JRS.14.036503.full)
