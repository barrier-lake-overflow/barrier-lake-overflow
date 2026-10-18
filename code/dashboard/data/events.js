/* 由 pipeline/events/build.py 產生，請勿手動編輯。
   每個情境逐期回放：某時點只用當時已取得的影像，不含未來的複核結果。 */
window.EVENT_SCENARIOS = [
 {
  "id": "inv_bl051",
  "name": "烏來堰塞湖 · 2015",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2015-08-14 形成，清冊蓄水量 0.6 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 4 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.51907,
   24.81997
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl051",
   "name": "烏來堰塞湖",
   "lonLat": [
    121.51907,
    24.81997
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl051.jpg",
   "before": "2015-08-07",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2015-08-07 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2015-08-14T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2015-08-18T10:00:00+00:00",
    "label": "8/18 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 5 天",
    "nextPass": "8/30",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-08-30T10:00:00+00:00",
    "label": "8/30 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/18 的候選",
    "since": "距觸發約 17 天",
    "nextPass": "9/11",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-09-11T10:00:00+00:00",
    "label": "9/11 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/30 的候選",
    "since": "距觸發約 29 天",
    "nextPass": "9/23",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-10-05T10:00:00+00:00",
    "label": "10/5 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/11 的候選",
    "since": "距觸發約 53 天",
    "nextPass": "10/17",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl052",
  "name": "塔次基里溪 · 2015",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2015-08-12 形成，清冊蓄水量 11 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.42685,
   24.16742
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl052",
   "name": "塔次基里溪",
   "lonLat": [
    121.42685,
    24.16742
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl052.jpg",
   "before": "2015-08-05",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2015-08-05 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2015-08-12T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2015-08-06T10:00:00+00:00",
    "label": "8/6 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 5 天",
    "nextPass": "8/18",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-08-18T10:00:00+00:00",
    "label": "8/18 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/6 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "8/30",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-08-30T10:00:00+00:00",
    "label": "8/30 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/18 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "9/11",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-09-11T10:00:00+00:00",
    "label": "9/11 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/30 的候選",
    "since": "距觸發約 31 天",
    "nextPass": "9/23",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2015-10-05T10:00:00+00:00",
    "label": "10/5 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/11 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "10/17",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl053",
  "name": "立霧溪錐麓 · 2016",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2016-01-27 形成。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.55162,
   24.17193
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl053",
   "name": "立霧溪錐麓",
   "lonLat": [
    121.55162,
    24.17193
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl053.jpg",
   "before": "2016-01-20",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2016-01-20 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2016-01-27T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2016-02-02T10:00:00+00:00",
    "label": "2/2 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 7 天",
    "nextPass": "2/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-02-14T10:00:00+00:00",
    "label": "2/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/2 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "2/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-02-26T10:00:00+00:00",
    "label": "2/26 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/14 的候選",
    "since": "距觸發約 31 天",
    "nextPass": "3/9",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-03-09T10:00:00+00:00",
    "label": "3/9 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/26 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "3/21",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-03-21T10:00:00+00:00",
    "label": "3/21 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/9 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "4/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl054",
  "name": "桃園霞雲溪 · 2016",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2016-08-19 形成，清冊蓄水量 0.27 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.37322,
   24.8075
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl054",
   "name": "桃園霞雲溪",
   "lonLat": [
    121.37322,
    24.8075
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl054.jpg",
   "before": "2016-08-12",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2016-08-12 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2016-08-19T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2016-08-12T10:00:00+00:00",
    "label": "8/12 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 6 天",
    "nextPass": "8/24",
    "counts": {
     "high": 0,
     "medium": 2,
     "low": 0
    },
    "newCount": 2,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.360911,
       24.805318
      ],
      "distanceFromReferenceM": 1267,
      "areaHectare": 3.06,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 231.0,
      "polygonLonLat": [
       [
        121.36176606384846,
        24.80589859261964
       ],
       [
        121.36167623232005,
        24.806617244846937
       ],
       [
        121.362754210661,
        24.806437581790114
       ],
       [
        121.36392202053034,
        24.805090108863933
       ],
       [
        121.36302370524622,
        24.80526977192076
       ],
       [
        121.36221522149052,
        24.806168087204878
       ],
       [
        121.36176606384846,
        24.80589859261964
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 3.06,
        "recheck": "pending",
        "recheckTime": "9/5 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.06 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 10.50 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E2 需要人工確認：單期 SAR 出現約 3.1 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 8/24 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 3.06 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 10.5 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 68 mm、24 小時 16 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 8/24）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（8/24）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.385929,
       24.805877
      ],
      "distanceFromReferenceM": 1297,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 539.0,
      "polygonLonLat": [
       [
        121.38602057651968,
        24.806437581790114
       ],
       [
        121.38557141887762,
        24.806078255676464
       ],
       [
        121.38548158734922,
        24.80535960344917
       ],
       [
        121.38602057651968,
        24.80535960344917
       ],
       [
        121.38646973416175,
        24.805988424148055
       ],
       [
        121.38602057651968,
        24.806437581790114
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 0.55,
        "recheck": "pending",
        "recheckTime": "9/5 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 7.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（539 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 8/24 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 0.55 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 7.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（539 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 68 mm、24 小時 16 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 8/24）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（8/24）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2016-09-05T10:00:00+00:00",
    "label": "9/5 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/12 的候選",
    "since": "距觸發約 18 天",
    "nextPass": "9/17",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.360911,
       24.805318
      ],
      "distanceFromReferenceM": 1267,
      "areaHectare": 3.06,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 231.0,
      "polygonLonLat": [
       [
        121.36176606384846,
        24.80589859261964
       ],
       [
        121.36167623232005,
        24.806617244846937
       ],
       [
        121.362754210661,
        24.806437581790114
       ],
       [
        121.36392202053034,
        24.805090108863933
       ],
       [
        121.36302370524622,
        24.80526977192076
       ],
       [
        121.36221522149052,
        24.806168087204878
       ],
       [
        121.36176606384846,
        24.80589859261964
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 3.06,
        "recheck": "persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.06 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 10.50 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "中",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 3.06 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 10.5 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.385929,
       24.805877
      ],
      "distanceFromReferenceM": 1297,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 539.0,
      "polygonLonLat": [
       [
        121.38602057651968,
        24.806437581790114
       ],
       [
        121.38557141887762,
        24.806078255676464
       ],
       [
        121.38548158734922,
        24.80535960344917
       ],
       [
        121.38602057651968,
        24.80535960344917
       ],
       [
        121.38646973416175,
        24.805988424148055
       ],
       [
        121.38602057651968,
        24.806437581790114
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 7.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（539 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.25）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.25），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 0.55 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "9/5 複核同位置水體 IoU 0.25，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 7.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（539 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.25，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2016-09-17T10:01:00+00:00",
    "label": "9/17 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 9/5 的候選",
    "since": "距觸發約 30 天",
    "nextPass": "9/29",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/12 18:00",
      "lastSeen": "9/17 18:01",
      "lastSeenAt": "2016-09-17T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.362618,
       24.805455
      ],
      "distanceFromReferenceM": 1095,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 236.0,
      "polygonLonLat": [
       [
        121.36230505301893,
        24.8063477502617
       ],
       [
        121.3621253899621,
        24.80580876109123
       ],
       [
        121.36176606384846,
        24.80589859261964
       ],
       [
        121.36194572690528,
        24.806437581790114
       ],
       [
        121.36230505301893,
        24.8063477502617
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 3.06,
        "recheck": "persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.06 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 10.50 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       },
       {
        "passTime": "9/17 18:01",
        "areaHectare": 0.55,
        "recheck": "pending",
        "recheckTime": "9/29 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：4 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "9/17 18:01 SAR 新增水體 0.55 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "9/5 複核同位置仍有水體（IoU 0.38），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.4 公頃"
       },
       {
        "kind": "trend",
        "status": "context",
        "text": "面積 3.1 → 0.6 公頃，縮小中"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 50 mm、24 小時 48 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 9/29）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "trend.shrinking",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.385929,
       24.805877
      ],
      "distanceFromReferenceM": 1297,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 539.0,
      "polygonLonLat": [
       [
        121.38602057651968,
        24.806437581790114
       ],
       [
        121.38557141887762,
        24.806078255676464
       ],
       [
        121.38548158734922,
        24.80535960344917
       ],
       [
        121.38602057651968,
        24.80535960344917
       ],
       [
        121.38646973416175,
        24.805988424148055
       ],
       [
        121.38602057651968,
        24.806437581790114
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 7.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（539 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.25）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.25），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 0.55 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "9/5 複核同位置水體 IoU 0.25，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 7.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（539 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 50 mm、24 小時 48 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.25，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2016-09-29T10:00:00+00:00",
    "label": "9/29 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/17 的候選",
    "since": "距觸發約 42 天",
    "nextPass": "10/11",
    "counts": {
     "high": 1,
     "medium": 1,
     "low": 1
    },
    "newCount": 1,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/12 18:00",
      "lastSeen": "9/17 18:01",
      "lastSeenAt": "2016-09-17T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.362618,
       24.805455
      ],
      "distanceFromReferenceM": 1095,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 236.0,
      "polygonLonLat": [
       [
        121.36230505301893,
        24.8063477502617
       ],
       [
        121.3621253899621,
        24.80580876109123
       ],
       [
        121.36176606384846,
        24.80589859261964
       ],
       [
        121.36194572690528,
        24.806437581790114
       ],
       [
        121.36230505301893,
        24.8063477502617
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 3.06,
        "recheck": "persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.06 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 10.50 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       },
       {
        "passTime": "9/17 18:01",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/29 18:00",
        "iou": 0.15,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.15，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "9/17 18:01 SAR 新增水體 0.55 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.4 公頃"
       },
       {
        "kind": "trend",
        "status": "context",
        "text": "面積 3.1 → 0.6 公頃，縮小中"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 212 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "trend.shrinking",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "9/29 18:00",
      "lastSeen": "9/29 18:00",
      "lastSeenAt": "2016-09-29T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.357744,
       24.805494
      ],
      "distanceFromReferenceM": 1579,
      "areaHectare": 0.94,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 235.0,
      "polygonLonLat": [
       [
        121.35996943328021,
        24.806078255676464
       ],
       [
        121.3598796017518,
        24.80571892956282
       ],
       [
        121.3598796017518,
        24.806078255676464
       ],
       [
        121.35916094952451,
        24.80589859261964
       ],
       [
        121.35925078105292,
        24.80625791873329
       ],
       [
        121.35996943328021,
        24.806078255676464
       ]
      ],
      "detections": [
       {
        "passTime": "9/29 18:00",
        "areaHectare": 0.94,
        "recheck": "pending",
        "recheckTime": "10/11 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.93 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 4.54 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.9 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/11 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "9/29 18:00 SAR 新增水體 0.94 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 4.5 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 212 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/11）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/11）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.385929,
       24.805877
      ],
      "distanceFromReferenceM": 1297,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 539.0,
      "polygonLonLat": [
       [
        121.38602057651968,
        24.806437581790114
       ],
       [
        121.38557141887762,
        24.806078255676464
       ],
       [
        121.38548158734922,
        24.80535960344917
       ],
       [
        121.38602057651968,
        24.80535960344917
       ],
       [
        121.38646973416175,
        24.805988424148055
       ],
       [
        121.38602057651968,
        24.806437581790114
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 7.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（539 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.25）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.25），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 0.55 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "9/5 複核同位置水體 IoU 0.25，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 7.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（539 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 212 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.25，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2016-10-11T10:00:00+00:00",
    "label": "10/11 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/29 的候選",
    "since": "距觸發約 54 天",
    "nextPass": "10/23",
    "counts": {
     "high": 2,
     "medium": 1,
     "low": 1
    },
    "newCount": 1,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/12 18:00",
      "lastSeen": "10/11 18:00",
      "lastSeenAt": "2016-10-11T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.362957,
       24.805168
      ],
      "distanceFromReferenceM": 1069,
      "areaHectare": 1.81,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 235.0,
      "polygonLonLat": [
       [
        121.36203555843369,
        24.806527413318527
       ],
       [
        121.3635626944167,
        24.805539266505995
       ],
       [
        121.3635626944167,
        24.80526977192076
       ],
       [
        121.36221522149052,
        24.806168087204878
       ],
       [
        121.36176606384846,
        24.80589859261964
       ],
       [
        121.36203555843369,
        24.806527413318527
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 3.06,
        "recheck": "persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.06 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 10.50 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       },
       {
        "passTime": "9/17 18:01",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/29 18:00",
        "iou": 0.15,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.15，未確認持續"
        ]
       },
       {
        "passTime": "10/11 18:00",
        "areaHectare": 1.81,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.82 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 4.86 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E2 值得優先查證：4 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 18:00 SAR 新增水體 1.81 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "9/5 複核同位置仍有水體（IoU 0.38），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 4.9 公頃"
       },
       {
        "kind": "trend",
        "status": "context",
        "text": "面積 3.1 → 1.8 公頃，縮小中"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 67 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 10/23）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "trend.shrinking",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "9/29 18:00",
      "lastSeen": "10/11 18:00",
      "lastSeenAt": "2016-10-11T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.35808,
       24.805415
      ],
      "distanceFromReferenceM": 1547,
      "areaHectare": 0.76,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 231.0,
      "polygonLonLat": [
       [
        121.36023892786545,
        24.806168087204878
       ],
       [
        121.3597897702234,
        24.805629098034405
       ],
       [
        121.3598796017518,
        24.806078255676464
       ],
       [
        121.35925078105292,
        24.80580876109123
       ],
       [
        121.35916094952451,
        24.806168087204878
       ],
       [
        121.36023892786545,
        24.806168087204878
       ]
      ],
      "detections": [
       {
        "passTime": "9/29 18:00",
        "areaHectare": 0.94,
        "recheck": "persistent",
        "recheckTime": "10/11 18:00",
        "iou": 0.57,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.93 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 4.54 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.57，持續蓄水"
        ]
       },
       {
        "passTime": "10/11 18:00",
        "areaHectare": 0.76,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.76 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.05 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E3 值得優先查證：4 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 18:00 SAR 新增水體 0.76 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "10/11 複核同位置仍有水體（IoU 0.57），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.0 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 67 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 10/23）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "10/11 18:00",
      "lastSeen": "10/11 18:00",
      "lastSeenAt": "2016-10-11T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.370288,
       24.7974
      ],
      "distanceFromReferenceM": 1155,
      "areaHectare": 0.83,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 245.0,
      "polygonLonLat": [
       [
        121.36967123834872,
        24.79754426047733
       ],
       [
        121.37083904821806,
        24.79754426047733
       ],
       [
        121.37137803738854,
        24.79709510283527
       ],
       [
        121.37003056446235,
        24.79700527130686
       ],
       [
        121.3703000590476,
        24.797454428948917
       ],
       [
        121.36967123834872,
        24.79754426047733
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 18:00",
        "areaHectare": 0.83,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.84 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.29 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（245 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E4 需要人工確認：單期 SAR 出現約 0.8 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 18:00 SAR 新增水體 0.83 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.3 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（245 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 67 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "8/12 18:00",
      "lastSeen": "8/12 18:00",
      "lastSeenAt": "2016-08-12T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.385929,
       24.805877
      ],
      "distanceFromReferenceM": 1297,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 539.0,
      "polygonLonLat": [
       [
        121.38602057651968,
        24.806437581790114
       ],
       [
        121.38557141887762,
        24.806078255676464
       ],
       [
        121.38548158734922,
        24.80535960344917
       ],
       [
        121.38602057651968,
        24.80535960344917
       ],
       [
        121.38646973416175,
        24.805988424148055
       ],
       [
        121.38602057651968,
        24.806437581790114
       ]
      ],
      "detections": [
       {
        "passTime": "8/12 18:00",
        "areaHectare": 0.55,
        "recheck": "not_persistent",
        "recheckTime": "9/5 18:00",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 7.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（539 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.25）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.25），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/12 18:00 SAR 新增水體 0.55 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "9/5 複核同位置水體 IoU 0.25，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 7.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（539 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 67 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.25，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl056",
  "name": "泰源南溪 · 2016",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2016-07-09 形成。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 6 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.22889,
   22.94524
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl056",
   "name": "泰源南溪",
   "lonLat": [
    121.22889,
    22.94524
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl056.jpg",
   "before": "2016-07-02",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2016-07-02 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2016-07-09T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2016-07-07T10:00:00+00:00",
    "label": "7/7 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 1 天",
    "nextPass": "7/19",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-07-19T10:00:00+00:00",
    "label": "7/19 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/7 的候選",
    "since": "距觸發約 11 天",
    "nextPass": "7/31",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-07-31T10:00:00+00:00",
    "label": "7/31 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/19 的候選",
    "since": "距觸發約 23 天",
    "nextPass": "8/12",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-08-12T10:00:00+00:00",
    "label": "8/12 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/31 的候選",
    "since": "距觸發約 35 天",
    "nextPass": "8/24",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-08-24T10:00:00+00:00",
    "label": "8/24 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/12 的候選",
    "since": "距觸發約 47 天",
    "nextPass": "9/5",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-09-05T10:00:00+00:00",
    "label": "9/5 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/24 的候選",
    "since": "距觸發約 59 天",
    "nextPass": "9/17",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl057",
  "name": "萬里溪 · 2016",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2016-03-07 形成，清冊蓄水量 0.25 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 3 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.37434,
   23.73653
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl057",
   "name": "萬里溪",
   "lonLat": [
    121.37434,
    23.73653
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl057.jpg",
   "before": "2016-02-29",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2016-02-29 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2016-03-07T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2016-03-09T10:00:00+00:00",
    "label": "3/9 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 66 小時",
    "nextPass": "3/27",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-03-21T10:00:00+00:00",
    "label": "3/21 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/9 的候選",
    "since": "距觸發約 15 天",
    "nextPass": "4/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2016-04-14T10:00:00+00:00",
    "label": "4/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/21 的候選",
    "since": "距觸發約 39 天",
    "nextPass": "5/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl058",
  "name": "東埔蚋溪小半天 · 2017",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2017-06-03 形成。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.75151,
   23.70828
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl058",
   "name": "東埔蚋溪小半天",
   "lonLat": [
    120.75151,
    23.70828
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl058.jpg",
   "before": "2017-05-27",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2017-05-27 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2017-06-03T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2017-05-27T10:00:00+00:00",
    "label": "5/27 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 6 天",
    "nextPass": "6/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2017-06-08T10:00:00+00:00",
    "label": "6/8 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 5/27 的候選",
    "since": "距觸發約 6 天",
    "nextPass": "6/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2017-07-02T10:00:00+00:00",
    "label": "7/2 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 6/8 的候選",
    "since": "距觸發約 30 天",
    "nextPass": "7/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2017-07-14T10:00:00+00:00",
    "label": "7/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/2 的候選",
    "since": "距觸發約 42 天",
    "nextPass": "7/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2017-07-26T10:00:00+00:00",
    "label": "7/26 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/14 的候選",
    "since": "距觸發約 54 天",
    "nextPass": "8/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl060",
  "name": "烏牛欄溪 · 2019",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2019-08-21 形成。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 10 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.7682,
   24.21974
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl060",
   "name": "烏牛欄溪",
   "lonLat": [
    120.7682,
    24.21974
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl060.jpg",
   "before": "2019-08-14",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2019-08-14 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2019-08-21T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2019-08-15T10:00:00+00:00",
    "label": "8/15 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 5 天",
    "nextPass": "8/21",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-08-21T10:01:00+00:00",
    "label": "8/21 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 8/15 的候選",
    "since": "距觸發約 18 小時",
    "nextPass": "8/27",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-08-27T10:00:00+00:00",
    "label": "8/27 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/21 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "9/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-09-02T10:01:00+00:00",
    "label": "9/2 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 8/27 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "9/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-09-08T10:00:00+00:00",
    "label": "9/8 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/2 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "9/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-09-20T10:00:00+00:00",
    "label": "9/20 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/8 的候選",
    "since": "距觸發約 31 天",
    "nextPass": "9/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-09-26T10:01:00+00:00",
    "label": "9/26 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 9/20 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "10/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-10-02T10:00:00+00:00",
    "label": "10/2 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 9/26 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "10/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-10-08T10:01:00+00:00",
    "label": "10/8 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/2 的候選",
    "since": "距觸發約 49 天",
    "nextPass": "10/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2019-10-14T10:00:00+00:00",
    "label": "10/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 10/8 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "10/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl061",
  "name": "臺東大南溪 · 2021",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2021-02-05 形成，清冊蓄水量 170 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 6 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.95323,
   22.72525
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl061",
   "name": "臺東大南溪",
   "lonLat": [
    120.95323,
    22.72525
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl061.jpg",
   "before": "2021-01-29",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2021-01-29 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2021-02-05T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2021-01-30T10:00:00+00:00",
    "label": "1/30 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 5 天",
    "nextPass": "2/11",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-02-11T10:00:00+00:00",
    "label": "2/11 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 1/30 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "2/23",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-02-23T10:00:00+00:00",
    "label": "2/23 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/11 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "3/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-03-07T10:00:00+00:00",
    "label": "3/7 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/23 的候選",
    "since": "距觸發約 31 天",
    "nextPass": "3/19",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-03-19T10:00:00+00:00",
    "label": "3/19 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/7 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "3/31",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "3/19 18:00",
      "lastSeen": "3/19 18:00",
      "lastSeenAt": "2021-03-19T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       120.95247,
       22.726831
      ],
      "distanceFromReferenceM": 191,
      "areaHectare": 0.58,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 512.0,
      "polygonLonLat": [
       [
        120.95258345193203,
        22.7266580359966
       ],
       [
        120.95186479970474,
        22.72710719363866
       ],
       [
        120.95186479970474,
        22.72746651975231
       ],
       [
        120.95267328346044,
        22.72710719363866
       ],
       [
        120.95258345193203,
        22.7266580359966
       ]
      ],
      "detections": [
       {
        "passTime": "3/19 18:00",
        "areaHectare": 0.58,
        "recheck": "pending",
        "recheckTime": "3/31 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.58 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.00 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（512 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 3/31 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "3/19 18:00 SAR 新增水體 0.58 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（512 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2005 知本溪（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 3/31）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（3/31）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2021-03-31T10:00:00+00:00",
    "label": "3/31 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/19 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "4/12",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "3/19 18:00",
      "lastSeen": "3/31 18:00",
      "lastSeenAt": "2021-03-31T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       120.952512,
       22.72679
      ],
      "distanceFromReferenceM": 186,
      "areaHectare": 0.55,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 511.0,
      "polygonLonLat": [
       [
        120.95258345193203,
        22.7266580359966
       ],
       [
        120.95195463123315,
        22.726927530581836
       ],
       [
        120.95195463123315,
        22.727376688223895
       ],
       [
        120.95267328346044,
        22.72710719363866
       ],
       [
        120.95258345193203,
        22.7266580359966
       ]
      ],
      "detections": [
       {
        "passTime": "3/19 18:00",
        "areaHectare": 0.58,
        "recheck": "persistent",
        "recheckTime": "3/31 18:00",
        "iou": 0.89,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.58 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.00 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（512 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.89，持續蓄水"
        ]
       },
       {
        "passTime": "3/31 18:00",
        "areaHectare": 0.55,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.03 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（511 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "3/31 18:00 SAR 新增水體 0.55 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "3/31 複核同位置仍有水體（IoU 0.89），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 6.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（511 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2005 知本溪（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 4/12）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl062",
  "name": "桃園大曼溪 · 2021",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2021-06-19 形成，清冊蓄水量 1.5 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 降軌 105 共 11 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.4044,
   24.67563
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl062",
   "name": "桃園大曼溪",
   "lonLat": [
    121.4044,
    24.67563
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl062.jpg",
   "before": "2021-06-12",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2021-06-12 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2021-06-19T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2021-06-13T21:52:00+00:00",
    "label": "6/14 05:52",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 5 天",
    "nextPass": "6/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-06-19T21:51:00+00:00",
    "label": "6/20 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 6/14 的候選",
    "since": "距觸發約 30 小時",
    "nextPass": "6/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-06-25T21:52:00+00:00",
    "label": "6/26 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/20 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "7/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-01T21:51:00+00:00",
    "label": "7/2 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 6/26 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "7/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-07T21:52:00+00:00",
    "label": "7/8 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/2 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "7/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-13T21:51:00+00:00",
    "label": "7/14 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/8 的候選",
    "since": "距觸發約 25 天",
    "nextPass": "7/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-19T21:52:00+00:00",
    "label": "7/20 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/14 的候選",
    "since": "距觸發約 31 天",
    "nextPass": "7/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-25T21:51:00+00:00",
    "label": "7/26 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/20 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "8/1",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-07-31T21:52:00+00:00",
    "label": "8/1 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/26 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "8/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-08-06T21:51:00+00:00",
    "label": "8/7 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 8/1 的候選",
    "since": "距觸發約 49 天",
    "nextPass": "8/13",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-08-12T21:52:00+00:00",
    "label": "8/13 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 8/7 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "8/19",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl063",
  "name": "花蓮豐坪溪上游 · 2021",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2021-11-06 形成，清冊蓄水量 7.5 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 10 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.25644,
   23.4965
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl063",
   "name": "花蓮豐坪溪上游",
   "lonLat": [
    121.25644,
    23.4965
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl063.jpg",
   "before": "2021-10-30",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2021-10-30 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2021-11-06T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2021-11-02T10:01:00+00:00",
    "label": "11/2 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 3 天",
    "nextPass": "11/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-11-08T10:00:00+00:00",
    "label": "11/8 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/2 的候選",
    "since": "距觸發約 66 小時",
    "nextPass": "11/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-11-14T10:01:00+00:00",
    "label": "11/14 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/8 的候選",
    "since": "距觸發約 9 天",
    "nextPass": "11/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-11-20T10:00:00+00:00",
    "label": "11/20 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/14 的候選",
    "since": "距觸發約 15 天",
    "nextPass": "11/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-11-26T10:01:00+00:00",
    "label": "11/26 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/20 的候選",
    "since": "距觸發約 21 天",
    "nextPass": "12/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-12-02T10:00:00+00:00",
    "label": "12/2 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/26 的候選",
    "since": "距觸發約 27 天",
    "nextPass": "12/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-12-08T10:01:00+00:00",
    "label": "12/8 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/2 的候選",
    "since": "距觸發約 33 天",
    "nextPass": "12/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-12-14T10:00:00+00:00",
    "label": "12/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 12/8 的候選",
    "since": "距觸發約 39 天",
    "nextPass": "12/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2021-12-20T10:01:00+00:00",
    "label": "12/20 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/14 的候選",
    "since": "距觸發約 45 天",
    "nextPass": "12/26",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2022-01-01T10:01:00+00:00",
    "label": "1/1 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/20 的候選",
    "since": "距觸發約 57 天",
    "nextPass": "1/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl064",
  "name": "臺東新武呂溪 · 2022",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2022-11-20 形成，清冊蓄水量 8.6 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.05426,
   23.16209
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl064",
   "name": "臺東新武呂溪",
   "lonLat": [
    121.05426,
    23.16209
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl064.jpg",
   "before": "2022-11-13",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2022-11-13 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2022-11-20T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2022-11-21T10:01:00+00:00",
    "label": "11/21 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 42 小時",
    "nextPass": "12/3",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2022-12-03T10:01:00+00:00",
    "label": "12/3 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/21 的候選",
    "since": "距觸發約 14 天",
    "nextPass": "12/15",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2022-12-15T10:01:00+00:00",
    "label": "12/15 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/3 的候選",
    "since": "距觸發約 26 天",
    "nextPass": "12/27",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2022-12-27T10:01:00+00:00",
    "label": "12/27 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/15 的候選",
    "since": "距觸發約 38 天",
    "nextPass": "1/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2023-01-08T10:01:00+00:00",
    "label": "1/8 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/27 的候選",
    "since": "距觸發約 50 天",
    "nextPass": "1/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl065",
  "name": "花蓮萬里溪 · 2024",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2024-03-13 形成，清冊蓄水量 55 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.293,
   23.77814
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl065",
   "name": "花蓮萬里溪",
   "lonLat": [
    121.293,
    23.77814
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl065.jpg",
   "before": "2024-03-06",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2024-03-06 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2024-03-13T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2024-03-15T10:01:00+00:00",
    "label": "3/15 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 66 小時",
    "nextPass": "3/27",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-03-27T10:01:00+00:00",
    "label": "3/27 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 3/15 的候選",
    "since": "距觸發約 15 天",
    "nextPass": "4/8",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-04-08T10:01:00+00:00",
    "label": "4/8 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 3/27 的候選",
    "since": "距觸發約 27 天",
    "nextPass": "4/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-04-20T10:01:00+00:00",
    "label": "4/20 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 4/8 的候選",
    "since": "距觸發約 39 天",
    "nextPass": "5/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-05-02T10:01:00+00:00",
    "label": "5/2 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 4/20 的候選",
    "since": "距觸發約 51 天",
    "nextPass": "5/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl066",
  "name": "花蓮木瓜溪 · 2024",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2024-04-14 形成，清冊蓄水量 43 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.37851,
   24.00896
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl066",
   "name": "花蓮木瓜溪",
   "lonLat": [
    121.37851,
    24.00896
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl066.jpg",
   "before": "2024-04-07",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2024-04-07 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2024-04-14T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2024-04-08T10:01:00+00:00",
    "label": "4/8 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 5 天",
    "nextPass": "4/20",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-04-20T10:01:00+00:00",
    "label": "4/20 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 4/8 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "5/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-05-02T10:01:00+00:00",
    "label": "5/2 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 4/20 的候選",
    "since": "距觸發約 19 天",
    "nextPass": "5/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-05-26T10:01:00+00:00",
    "label": "5/26 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 5/2 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "6/7",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "5/26 18:01",
      "lastSeen": "5/26 18:01",
      "lastSeenAt": "2024-05-26T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.376598,
       24.010922
      ],
      "distanceFromReferenceM": 291,
      "areaHectare": 0.6,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 615.0,
      "polygonLonLat": [
       [
        121.37595944533756,
        24.011698049929574
       ],
       [
        121.37649843450802,
        24.011248892287515
       ],
       [
        121.37586961380914,
        24.01106922923069
       ],
       [
        121.37595944533756,
        24.011698049929574
       ]
      ],
      "detections": [
       {
        "passTime": "5/26 18:01",
        "areaHectare": 0.6,
        "recheck": "pending",
        "recheckTime": "6/7 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.60 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 4.32 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（615 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 6/7 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/26 18:01 SAR 新增水體 0.60 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 4.3 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（615 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2009 木瓜溪銅門（7.3 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 7 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 6/7）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（6/7）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2024-06-07T10:01:00+00:00",
    "label": "6/7 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 5/26 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "6/19",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "5/26 18:01",
      "lastSeen": "5/26 18:01",
      "lastSeenAt": "2024-05-26T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.376598,
       24.010922
      ],
      "distanceFromReferenceM": 291,
      "areaHectare": 0.6,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 615.0,
      "polygonLonLat": [
       [
        121.37595944533756,
        24.011698049929574
       ],
       [
        121.37649843450802,
        24.011248892287515
       ],
       [
        121.37586961380914,
        24.01106922923069
       ],
       [
        121.37595944533756,
        24.011698049929574
       ]
      ],
      "detections": [
       {
        "passTime": "5/26 18:01",
        "areaHectare": 0.6,
        "recheck": "not_persistent",
        "recheckTime": "6/7 18:01",
        "iou": 0.18,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.60 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 4.32 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（615 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.18，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.18）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.18），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/26 18:01 SAR 新增水體 0.60 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "6/7 複核同位置水體 IoU 0.18，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 4.3 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（615 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2009 木瓜溪銅門（7.3 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.18，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl067",
  "name": "屏東率芒溪 · 2024",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2024-10-05 形成，清冊蓄水量 3.7 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 5 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.67236,
   22.37236
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl067",
   "name": "屏東率芒溪",
   "lonLat": [
    120.67236,
    22.37236
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl067.jpg",
   "before": "2024-09-28",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2024-09-28 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2024-10-05T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2024-10-05T10:01:00+00:00",
    "label": "10/5 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 18 小時",
    "nextPass": "10/17",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-10-17T10:01:00+00:00",
    "label": "10/17 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/5 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "10/29",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-10-29T10:01:00+00:00",
    "label": "10/29 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/17 的候選",
    "since": "距觸發約 25 天",
    "nextPass": "11/10",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-11-10T10:01:00+00:00",
    "label": "11/10 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/29 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "11/22",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-11-22T10:01:00+00:00",
    "label": "11/22 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/10 的候選",
    "since": "距觸發約 49 天",
    "nextPass": "12/4",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   }
  ]
 },
 {
  "id": "inv_bl068",
  "name": "新竹泰崗溪 · 2024",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2024-11-02 形成，清冊蓄水量 27 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 6 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.34463,
   24.56425
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl068",
   "name": "新竹泰崗溪",
   "lonLat": [
    121.34463,
    24.56425
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl068.jpg",
   "before": "2024-10-26",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2024-10-26 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2024-11-02T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2024-10-29T10:01:00+00:00",
    "label": "10/29 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 3 天",
    "nextPass": "11/10",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-11-10T10:01:00+00:00",
    "label": "11/10 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/29 的候選",
    "since": "距觸發約 9 天",
    "nextPass": "11/22",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2024-11-22T10:01:00+00:00",
    "label": "11/22 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/10 的候選",
    "since": "距觸發約 21 天",
    "nextPass": "12/4",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "11/22 18:01",
      "lastSeen": "11/22 18:01",
      "lastSeenAt": "2024-11-22T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.329262,
       24.550439
      ],
      "distanceFromReferenceM": 2180,
      "areaHectare": 0.66,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1900.0,
      "polygonLonLat": [
       [
        121.32906738750651,
        24.55041772581605
       ],
       [
        121.32969620820539,
        24.549968568173988
       ],
       [
        121.32888772444969,
        24.549609242060342
       ],
       [
        121.32906738750651,
        24.55041772581605
       ]
      ],
      "detections": [
       {
        "passTime": "11/22 18:01",
        "areaHectare": 0.66,
        "recheck": "pending",
        "recheckTime": "12/4 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.65 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.82 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 12/4 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "11/22 18:01 SAR 新增水體 0.66 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1900 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 13 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 12/4）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（12/4）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2024-12-04T10:01:00+00:00",
    "label": "12/4 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/22 的候選",
    "since": "距觸發約 33 天",
    "nextPass": "12/16",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "11/22 18:01",
      "lastSeen": "12/4 18:01",
      "lastSeenAt": "2024-12-04T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.329341,
       24.550074
      ],
      "distanceFromReferenceM": 2203,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1900.0,
      "polygonLonLat": [
       [
        121.32960637667698,
        24.5500583997024
       ],
       [
        121.32906738750651,
        24.549609242060342
       ],
       [
        121.32870806139286,
        24.549878736645578
       ],
       [
        121.32933688209174,
        24.549968568173988
       ],
       [
        121.32924705056334,
        24.550327894287637
       ],
       [
        121.32960637667698,
        24.5500583997024
       ]
      ],
      "detections": [
       {
        "passTime": "11/22 18:01",
        "areaHectare": 0.66,
        "recheck": "persistent",
        "recheckTime": "12/4 18:01",
        "iou": 0.37,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.65 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.82 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.37，持續蓄水"
        ]
       },
       {
        "passTime": "12/4 18:01",
        "areaHectare": 0.5,
        "recheck": "pending",
        "recheckTime": "12/16 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.54 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/4 18:01 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "12/4 複核同位置仍有水體（IoU 0.37），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1900 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 12/16）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2024-12-16T10:01:00+00:00",
    "label": "12/16 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/4 的候選",
    "since": "距觸發約 45 天",
    "nextPass": "12/28",
    "counts": {
     "high": 1,
     "medium": 3,
     "low": 0
    },
    "newCount": 3,
    "events": [
     {
      "id": "E1",
      "firstSeen": "11/22 18:01",
      "lastSeen": "12/4 18:01",
      "lastSeenAt": "2024-12-04T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.329341,
       24.550074
      ],
      "distanceFromReferenceM": 2203,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1900.0,
      "polygonLonLat": [
       [
        121.32960637667698,
        24.5500583997024
       ],
       [
        121.32906738750651,
        24.549609242060342
       ],
       [
        121.32870806139286,
        24.549878736645578
       ],
       [
        121.32933688209174,
        24.549968568173988
       ],
       [
        121.32924705056334,
        24.550327894287637
       ],
       [
        121.32960637667698,
        24.5500583997024
       ]
      ],
      "detections": [
       {
        "passTime": "11/22 18:01",
        "areaHectare": 0.66,
        "recheck": "persistent",
        "recheckTime": "12/4 18:01",
        "iou": 0.37,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.65 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.82 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.37，持續蓄水"
        ]
       },
       {
        "passTime": "12/4 18:01",
        "areaHectare": 0.5,
        "recheck": "not_persistent",
        "recheckTime": "12/16 18:01",
        "iou": 0.23,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.54 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/4 18:01 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1900 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/16 18:01",
      "lastSeenAt": "2024-12-16T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.342841,
       24.561074
      ],
      "distanceFromReferenceM": 395,
      "areaHectare": 0.85,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1137.0,
      "polygonLonLat": [
       [
        121.34110481231372,
        24.561556835339132
       ],
       [
        121.34083531772848,
        24.56101784616866
       ],
       [
        121.34083531772848,
        24.561646666867542
       ],
       [
        121.34110481231372,
        24.561556835339132
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.85,
        "recheck": "pending",
        "recheckTime": "12/28 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.85 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 9.43 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1137 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E2 需要人工確認：單期 SAR 出現約 0.8 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 12/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/16 18:01 SAR 新增水體 0.85 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 9.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1137 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 12/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（12/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/16 18:01",
      "lastSeenAt": "2024-12-16T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.343917,
       24.566599
      ],
      "distanceFromReferenceM": 270,
      "areaHectare": 0.61,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1114.0,
      "polygonLonLat": [
       [
        121.34344043205242,
        24.566677232458613
       ],
       [
        121.3439794212229,
        24.566767063987022
       ],
       [
        121.34406925275131,
        24.566317906344963
       ],
       [
        121.34344043205242,
        24.566677232458613
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.61,
        "recheck": "pending",
        "recheckTime": "12/28 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.61 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 11.62 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1114 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 12/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/16 18:01 SAR 新增水體 0.61 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 11.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1114 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 12/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（12/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/16 18:01",
      "lastSeenAt": "2024-12-16T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.333677,
       24.547936
      ],
      "distanceFromReferenceM": 2117,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1541.0,
      "polygonLonLat": [
       [
        121.33436744768281,
        24.547812611492102
       ],
       [
        121.33400812156917,
        24.547363453850043
       ],
       [
        121.33373862698393,
        24.54772277996369
       ],
       [
        121.33436744768281,
        24.547812611492102
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.59,
        "recheck": "pending",
        "recheckTime": "12/28 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.42 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1541 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E4 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 12/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/16 18:01 SAR 新增水體 0.59 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1541 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 12/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（12/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2024-12-28T10:01:00+00:00",
    "label": "12/28 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/16 的候選",
    "since": "距觸發約 57 天",
    "nextPass": "1/9",
    "counts": {
     "high": 4,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E2",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/28 18:01",
      "lastSeenAt": "2024-12-28T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.342878,
       24.56154
      ],
      "distanceFromReferenceM": 348,
      "areaHectare": 0.83,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1137.0,
      "polygonLonLat": [
       [
        121.34379975816607,
        24.56200599298119
       ],
       [
        121.34353026358083,
        24.562275487566428
       ],
       [
        121.34388958969448,
        24.562724645208487
       ],
       [
        121.34379975816607,
        24.56200599298119
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.85,
        "recheck": "persistent",
        "recheckTime": "12/28 18:01",
        "iou": 0.37,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.85 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 9.43 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1137 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.37，持續蓄水"
        ]
       },
       {
        "passTime": "12/28 18:01",
        "areaHectare": 0.83,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.83 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 9.91 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1137 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/28 18:01 SAR 新增水體 0.83 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "12/28 複核同位置仍有水體（IoU 0.37），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 9.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1137 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 1/9）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/16 18:01",
      "lastSeenAt": "2024-12-16T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.343917,
       24.566599
      ],
      "distanceFromReferenceM": 270,
      "areaHectare": 0.61,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1114.0,
      "polygonLonLat": [
       [
        121.34344043205242,
        24.566677232458613
       ],
       [
        121.3439794212229,
        24.566767063987022
       ],
       [
        121.34406925275131,
        24.566317906344963
       ],
       [
        121.34344043205242,
        24.566677232458613
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.61,
        "recheck": "persistent",
        "recheckTime": "12/28 18:01",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.61 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 11.62 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1114 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E3 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/16 18:01 SAR 新增水體 0.61 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 11.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1114 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "12/16 18:01",
      "lastSeen": "12/16 18:01",
      "lastSeenAt": "2024-12-16T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.333677,
       24.547936
      ],
      "distanceFromReferenceM": 2117,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1541.0,
      "polygonLonLat": [
       [
        121.33436744768281,
        24.547812611492102
       ],
       [
        121.33400812156917,
        24.547363453850043
       ],
       [
        121.33373862698393,
        24.54772277996369
       ],
       [
        121.33436744768281,
        24.547812611492102
       ]
      ],
      "detections": [
       {
        "passTime": "12/16 18:01",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "12/28 18:01",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.42 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1541 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E4 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/16 18:01 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1541 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "11/22 18:01",
      "lastSeen": "12/28 18:01",
      "lastSeenAt": "2024-12-28T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.329452,
       24.550294
      ],
      "distanceFromReferenceM": 2178,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1899.0,
      "polygonLonLat": [
       [
        121.32888772444969,
        24.55050755734446
       ],
       [
        121.32915721903493,
        24.550238062759224
       ],
       [
        121.32924705056334,
        24.550327894287637
       ],
       [
        121.32960637667698,
        24.550238062759224
       ],
       [
        121.32915721903493,
        24.5500583997024
       ],
       [
        121.32888772444969,
        24.55050755734446
       ]
      ],
      "detections": [
       {
        "passTime": "11/22 18:01",
        "areaHectare": 0.66,
        "recheck": "persistent",
        "recheckTime": "12/4 18:01",
        "iou": 0.37,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.65 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.82 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.37，持續蓄水"
        ]
       },
       {
        "passTime": "12/4 18:01",
        "areaHectare": 0.5,
        "recheck": "not_persistent",
        "recheckTime": "12/16 18:01",
        "iou": 0.23,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.54 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1900 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       },
       {
        "passTime": "12/28 18:01",
        "areaHectare": 0.5,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.50 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1899 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/28 18:01 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "12/4 複核同位置仍有水體（IoU 0.37），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1899 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 1/9）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E5",
      "firstSeen": "12/28 18:01",
      "lastSeen": "12/28 18:01",
      "lastSeenAt": "2024-12-28T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.357943,
       24.54728
      ],
      "distanceFromReferenceM": 2310,
      "areaHectare": 0.75,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1404.0,
      "polygonLonLat": [
       [
        121.35790330812675,
        24.547093959264807
       ],
       [
        121.35853212882563,
        24.546734633151157
       ],
       [
        121.35727448742786,
        24.546465138565924
       ],
       [
        121.35790330812675,
        24.547093959264807
       ]
      ],
      "detections": [
       {
        "passTime": "12/28 18:01",
        "areaHectare": 0.75,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.75 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.62 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1404 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E5 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 1/9 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/28 18:01 SAR 新增水體 0.75 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1404 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2018 宜蘭石頭溪（9.4 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 1/9）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（1/9）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl069",
  "name": "花蓮樂樂溪 · 2025",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2025-01-25 形成，清冊蓄水量 8.6 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 6 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.1592,
   23.38086
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl069",
   "name": "花蓮樂樂溪",
   "lonLat": [
    121.1592,
    23.38086
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl069.jpg",
   "before": "2025-01-18",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2025-01-18 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2025-01-25T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2025-01-21T10:00:00+00:00",
    "label": "1/21 18:00",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 3 天",
    "nextPass": "2/2",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2025-02-02T10:01:00+00:00",
    "label": "2/2 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 1/21 的候選",
    "since": "距觸發約 9 天",
    "nextPass": "2/14",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2025-02-14T10:00:00+00:00",
    "label": "2/14 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/2 的候選",
    "since": "距觸發約 21 天",
    "nextPass": "2/26",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "2/14 18:00",
      "lastSeen": "2/14 18:00",
      "lastSeenAt": "2025-02-14T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.147708,
       23.384638
      ],
      "distanceFromReferenceM": 1246,
      "areaHectare": 0.53,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1513.0,
      "polygonLonLat": [
       [
        121.14724837400072,
        23.38539263384144
       ],
       [
        121.1477873631712,
        23.384943476199382
       ],
       [
        121.14742803705755,
        23.38440448702891
       ],
       [
        121.14724837400072,
        23.38539263384144
       ]
      ],
      "detections": [
       {
        "passTime": "2/14 18:00",
        "areaHectare": 0.53,
        "recheck": "pending",
        "recheckTime": "2/26 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.68 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1513 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.5 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 2/26 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "2/14 18:00 SAR 新增水體 0.53 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1513 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 57 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 2/26）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（2/26）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-02-26T10:00:00+00:00",
    "label": "2/26 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/14 的候選",
    "since": "距觸發約 33 天",
    "nextPass": "3/10",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "2/14 18:00",
      "lastSeen": "2/26 18:00",
      "lastSeenAt": "2025-02-26T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.147599,
       23.385843
      ],
      "distanceFromReferenceM": 1307,
      "areaHectare": 0.77,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1547.0,
      "polygonLonLat": [
       [
        121.1477873631712,
        23.38512313925621
       ],
       [
        121.14769753164279,
        23.3843146555005
       ],
       [
        121.14724837400072,
        23.38575195995509
       ],
       [
        121.1477873631712,
        23.38512313925621
       ]
      ],
      "detections": [
       {
        "passTime": "2/14 18:00",
        "areaHectare": 0.53,
        "recheck": "persistent",
        "recheckTime": "2/26 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.68 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "2/26 18:00",
        "areaHectare": 0.77,
        "recheck": "pending",
        "recheckTime": "3/10 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.77 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.92 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1547 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "2/26 18:00 SAR 新增水體 0.77 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "2/26 複核同位置仍有水體（IoU 0.66），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1547 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 3/10）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-03-10T10:00:00+00:00",
    "label": "3/10 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 2/26 的候選",
    "since": "距觸發約 45 天",
    "nextPass": "3/22",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "2/14 18:00",
      "lastSeen": "3/10 18:00",
      "lastSeenAt": "2025-03-10T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.147606,
       23.385908
      ],
      "distanceFromReferenceM": 1309,
      "areaHectare": 0.75,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1547.0,
      "polygonLonLat": [
       [
        121.14742803705755,
        23.385572296898268
       ],
       [
        121.1477873631712,
        23.38512313925621
       ],
       [
        121.14760770011438,
        23.384494318557323
       ],
       [
        121.14733820552914,
        23.384494318557323
       ],
       [
        121.14742803705755,
        23.385572296898268
       ]
      ],
      "detections": [
       {
        "passTime": "2/14 18:00",
        "areaHectare": 0.53,
        "recheck": "persistent",
        "recheckTime": "2/26 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.68 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "2/26 18:00",
        "areaHectare": 0.77,
        "recheck": "persistent",
        "recheckTime": "3/10 18:00",
        "iou": 0.82,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.77 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.92 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1547 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.82，持續蓄水"
        ]
       },
       {
        "passTime": "3/10 18:00",
        "areaHectare": 0.75,
        "recheck": "pending",
        "recheckTime": "3/22 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.75 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.88 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1547 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "3/10 18:00 SAR 新增水體 0.75 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "3/10 複核同位置仍有水體（IoU 0.82），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1547 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 3/22）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-03-22T10:00:00+00:00",
    "label": "3/22 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 3/10 的候選",
    "since": "距觸發約 57 天",
    "nextPass": "4/3",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "2/14 18:00",
      "lastSeen": "3/22 18:00",
      "lastSeenAt": "2025-03-22T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.147602,
       23.385974
      ],
      "distanceFromReferenceM": 1313,
      "areaHectare": 0.77,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1545.0,
      "polygonLonLat": [
       [
        121.14733820552914,
        23.386021454540327
       ],
       [
        121.14742803705755,
        23.387279095938094
       ],
       [
        121.14787719469962,
        23.387458758994917
       ],
       [
        121.14787719469962,
        23.3865604437108
       ],
       [
        121.14733820552914,
        23.386021454540327
       ]
      ],
      "detections": [
       {
        "passTime": "2/14 18:00",
        "areaHectare": 0.53,
        "recheck": "persistent",
        "recheckTime": "2/26 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.68 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "2/26 18:00",
        "areaHectare": 0.77,
        "recheck": "persistent",
        "recheckTime": "3/10 18:00",
        "iou": 0.82,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.77 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.92 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1547 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.82，持續蓄水"
        ]
       },
       {
        "passTime": "3/10 18:00",
        "areaHectare": 0.75,
        "recheck": "persistent",
        "recheckTime": "3/22 18:00",
        "iou": 0.71,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.75 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.88 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1547 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.71，持續蓄水"
        ]
       },
       {
        "passTime": "3/22 18:00",
        "areaHectare": 0.77,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.77 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.22 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1545 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 4 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "3/22 18:00 SAR 新增水體 0.77 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "3/22 複核同位置仍有水體（IoU 0.71），共 4 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1545 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 4/3）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl070",
  "name": "雲林清水溪(草嶺) · 2025",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2025-07-08 形成，清冊蓄水量 1400 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 7 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.66859,
   23.57874
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl070",
   "name": "雲林清水溪(草嶺)",
   "lonLat": [
    120.66859,
    23.57874
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl070.jpg",
   "before": "2025-07-01",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2025-07-01 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2025-07-08T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2025-07-08T10:01:00+00:00",
    "label": "7/8 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 18 小時",
    "nextPass": "7/17",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2025-07-20T10:01:00+00:00",
    "label": "7/20 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 7/8 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "7/29",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "pending",
        "recheckTime": "8/1 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.3 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/29 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 131 mm、24 小時 33 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/29）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/29）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-01T10:01:00+00:00",
    "label": "8/1 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 7/20 的候選",
    "since": "距觸發約 25 天",
    "nextPass": "8/10",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "not_persistent",
        "recheckTime": "8/1 18:01",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/1 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 92 mm、24 小時 15 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-13T10:01:00+00:00",
    "label": "8/13 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 8/1 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "8/22",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "not_persistent",
        "recheckTime": "8/1 18:01",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/1 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 122 mm、24 小時 99 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-19T10:00:00+00:00",
    "label": "8/19 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/13 的候選",
    "since": "距觸發約 43 天",
    "nextPass": "8/28",
    "counts": {
     "high": 0,
     "medium": 2,
     "low": 1
    },
    "newCount": 2,
    "events": [
     {
      "id": "E3",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/19 18:00",
      "lastSeenAt": "2025-08-19T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       120.663252,
       23.578792
      ],
      "distanceFromReferenceM": 545,
      "areaHectare": 0.58,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 514.0,
      "polygonLonLat": [
       [
        120.66305643586031,
        23.579159240626026
       ],
       [
        120.66341576197395,
        23.579069409097613
       ],
       [
        120.66323609891714,
        23.578260925341905
       ],
       [
        120.66260727821825,
        23.578350756870318
       ],
       [
        120.66305643586031,
        23.579159240626026
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.58,
        "recheck": "pending",
        "recheckTime": "8/25 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.58 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.03 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（514 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 8/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/19 18:00 SAR 新增水體 0.58 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 15.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（514 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（1.0 km）、1999 草嶺（1.3 km）、2009 油車寮（6.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 8/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（8/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/19 18:00",
      "lastSeenAt": "2025-08-19T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       120.674392,
       23.572221
      ],
      "distanceFromReferenceM": 933,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 553.0,
      "polygonLonLat": [
       [
        120.6742853769118,
        23.572601539051952
       ],
       [
        120.67491419761069,
        23.572511707523542
       ],
       [
        120.67401588232657,
        23.571882886824657
       ],
       [
        120.6742853769118,
        23.572601539051952
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.56,
        "recheck": "pending",
        "recheckTime": "8/25 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（553 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E2 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 8/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/19 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（553 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.5 km）、1999 草嶺（0.1 km）、2009 油車寮（5.4 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 8/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（8/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "not_persistent",
        "recheckTime": "8/1 18:01",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/1 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-25T10:01:00+00:00",
    "label": "8/25 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 8/19 的候選",
    "since": "距觸發約 49 天",
    "nextPass": "9/3",
    "counts": {
     "high": 1,
     "medium": 1,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/19 18:00",
      "lastSeenAt": "2025-08-19T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       120.674392,
       23.572221
      ],
      "distanceFromReferenceM": 933,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 553.0,
      "polygonLonLat": [
       [
        120.6742853769118,
        23.572601539051952
       ],
       [
        120.67491419761069,
        23.572511707523542
       ],
       [
        120.67401588232657,
        23.571882886824657
       ],
       [
        120.6742853769118,
        23.572601539051952
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.56,
        "recheck": "persistent",
        "recheckTime": "8/25 18:01",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（553 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/19 18:00 SAR 新增水體 0.56 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（553 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.5 km）、1999 草嶺（0.1 km）、2009 油車寮（5.4 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 12 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/25 18:01",
      "lastSeenAt": "2025-08-25T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.663323,
       23.578715
      ],
      "distanceFromReferenceM": 537,
      "areaHectare": 0.53,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 514.0,
      "polygonLonLat": [
       [
        120.66332593044554,
        23.579069409097613
       ],
       [
        120.6637750880876,
        23.578799914512377
       ],
       [
        120.66341576197395,
        23.578171093813495
       ],
       [
        120.66287677280349,
        23.57853041992714
       ],
       [
        120.66332593044554,
        23.579069409097613
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.58,
        "recheck": "not_persistent",
        "recheckTime": "8/25 18:01",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.58 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.03 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（514 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       },
       {
        "passTime": "8/25 18:01",
        "areaHectare": 0.53,
        "recheck": "pending",
        "recheckTime": "8/31 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 13.76 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（514 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.5 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 9/3 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/25 18:01 SAR 新增水體 0.53 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 13.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（514 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（1.0 km）、1999 草嶺（1.3 km）、2009 油車寮（6.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 12 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 9/3）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（9/3）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "not_persistent",
        "recheckTime": "8/1 18:01",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/1 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 12 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-31T10:00:00+00:00",
    "label": "8/31 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/25 的候選",
    "since": "距觸發約 55 天",
    "nextPass": "9/9",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 2
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/19 18:00",
      "lastSeenAt": "2025-08-19T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       120.674392,
       23.572221
      ],
      "distanceFromReferenceM": 933,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 553.0,
      "polygonLonLat": [
       [
        120.6742853769118,
        23.572601539051952
       ],
       [
        120.67491419761069,
        23.572511707523542
       ],
       [
        120.67401588232657,
        23.571882886824657
       ],
       [
        120.6742853769118,
        23.572601539051952
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.56,
        "recheck": "persistent",
        "recheckTime": "8/25 18:01",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（553 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/19 18:00 SAR 新增水體 0.56 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（553 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.5 km）、1999 草嶺（0.1 km）、2009 油車寮（5.4 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/20 18:01",
      "lastSeen": "7/20 18:01",
      "lastSeenAt": "2025-07-20T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.672093,
       23.577207
      ],
      "distanceFromReferenceM": 396,
      "areaHectare": 1.29,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 513.0,
      "polygonLonLat": [
       [
        120.6719497571731,
        23.577721936171436
       ],
       [
        120.67338706162768,
        23.576733789358904
       ],
       [
        120.67338706162768,
        23.57565581101796
       ],
       [
        120.67311756704245,
        23.576733789358904
       ],
       [
        120.67159043105944,
        23.5774524415862
       ],
       [
        120.6719497571731,
        23.577721936171436
       ]
      ],
      "detections": [
       {
        "passTime": "7/20 18:01",
        "areaHectare": 1.29,
        "recheck": "not_persistent",
        "recheckTime": "8/1 18:01",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.29 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 25.84 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（513 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/20 18:01 SAR 新增水體 1.29 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/1 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 25.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（513 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（0.1 km）、1999 草嶺（0.5 km）、2009 油車寮（6.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "8/19 18:00",
      "lastSeen": "8/25 18:01",
      "lastSeenAt": "2025-08-25T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       120.663323,
       23.578715
      ],
      "distanceFromReferenceM": 537,
      "areaHectare": 0.53,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 514.0,
      "polygonLonLat": [
       [
        120.66332593044554,
        23.579069409097613
       ],
       [
        120.6637750880876,
        23.578799914512377
       ],
       [
        120.66341576197395,
        23.578171093813495
       ],
       [
        120.66287677280349,
        23.57853041992714
       ],
       [
        120.66332593044554,
        23.579069409097613
       ]
      ],
      "detections": [
       {
        "passTime": "8/19 18:00",
        "areaHectare": 0.58,
        "recheck": "not_persistent",
        "recheckTime": "8/25 18:01",
        "iou": 0.25,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.58 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.03 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（514 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.25，未確認持續"
        ]
       },
       {
        "passTime": "8/25 18:01",
        "areaHectare": 0.53,
        "recheck": "not_persistent",
        "recheckTime": "8/31 18:00",
        "iou": 0.18,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.53 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 13.76 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（514 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.18，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.18）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.18），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/25 18:01 SAR 新增水體 0.53 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/31 複核同位置水體 IoU 0.18，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 13.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（514 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：1979 草嶺（1.0 km）、1999 草嶺（1.3 km）、2009 油車寮（6.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.18，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl072",
  "name": "花蓮立霧溪(燕子口) · 2025",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2025-10-17 形成，清冊蓄水量 190 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 10 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.55913,
   24.17315
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl072",
   "name": "花蓮立霧溪(燕子口)",
   "lonLat": [
    121.55913,
    24.17315
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl072.jpg",
   "before": "2025-10-10",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2025-10-10 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2025-10-17T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2025-10-12T10:01:00+00:00",
    "label": "10/12 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 4 天",
    "nextPass": "10/18",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": true,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "pending",
        "recheckTime": "10/18 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/18 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 6 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/18）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/18）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-10-18T10:00:00+00:00",
    "label": "10/18 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 10/12 的候選",
    "since": "距觸發約 42 小時",
    "nextPass": "10/24",
    "counts": {
     "high": 1,
     "medium": 2,
     "low": 0
    },
    "newCount": 2,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.551582,
       24.172428
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.98,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55166991491133,
        24.171867665088087
       ],
       [
        121.55292755630909,
        24.172226991201732
       ],
       [
        121.55337671395115,
        24.171957496616496
       ],
       [
        121.55166991491133,
        24.171867665088087
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "pending",
        "recheckTime": "10/24 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E2 需要人工確認：單期 SAR 出現約 1.0 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/24 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.98 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 4.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/24）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/24）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "pending",
        "recheckTime": "10/24 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/24 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/24）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/24）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-10-24T10:01:00+00:00",
    "label": "10/24 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/18 的候選",
    "since": "距觸發約 8 天",
    "nextPass": "10/30",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "pending",
        "recheckTime": "10/30 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "10/24 複核同位置仍有水體（IoU 0.59），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 241 mm、24 小時 30 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 10/30）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 241 mm、24 小時 30 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 241 mm、24 小時 30 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-10-30T10:00:00+00:00",
    "label": "10/30 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 10/24 的候選",
    "since": "距觸發約 14 天",
    "nextPass": "11/5",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 59 mm、24 小時 8 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 59 mm、24 小時 8 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 59 mm、24 小時 8 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-11-05T10:01:00+00:00",
    "label": "11/5 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 10/30 的候選",
    "since": "距觸發約 20 天",
    "nextPass": "11/11",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 43 mm、24 小時 19 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 43 mm、24 小時 19 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 43 mm、24 小時 19 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-11-11T10:00:00+00:00",
    "label": "11/11 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/5 的候選",
    "since": "距觸發約 26 天",
    "nextPass": "11/17",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 132 mm、24 小時 130 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 132 mm、24 小時 130 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 132 mm、24 小時 130 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-11-23T10:00:00+00:00",
    "label": "11/23 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/11 的候選",
    "since": "距觸發約 38 天",
    "nextPass": "11/29",
    "counts": {
     "high": 2,
     "medium": 1,
     "low": 1
    },
    "newCount": 1,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "11/23 18:00",
      "lastSeen": "11/23 18:00",
      "lastSeenAt": "2025-11-23T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.557435,
       24.155918
      ],
      "distanceFromReferenceM": 1913,
      "areaHectare": 0.57,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1260.0,
      "polygonLonLat": [
       [
        121.55688014355921,
        24.156686136786465
       ],
       [
        121.55732930120128,
        24.15641664220123
       ],
       [
        121.55741913272969,
        24.155787821502347
       ],
       [
        121.55714963814445,
        24.155787821502347
       ],
       [
        121.55723946967287,
        24.155338663860288
       ],
       [
        121.55777845884333,
        24.15515900080346
       ],
       [
        121.55759879578652,
        24.156596305258052
       ],
       [
        121.55688014355921,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "11/23 18:00",
        "areaHectare": 0.57,
        "recheck": "pending",
        "recheckTime": "11/29 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.57 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.02 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1260 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E4 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 11/29 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "11/23 18:00 SAR 新增水體 0.57 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1260 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（9.1 km）、2016 立霧溪錐麓（1.9 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 11/29）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（11/29）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-11-29T10:01:00+00:00",
    "label": "11/29 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 11/23 的候選",
    "since": "距觸發約 44 天",
    "nextPass": "12/5",
    "counts": {
     "high": 3,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/24 18:01",
      "lastSeenAt": "2025-10-24T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551577,
       24.172468
      ],
      "distanceFromReferenceM": 771,
      "areaHectare": 0.89,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 425.0,
      "polygonLonLat": [
       [
        121.55104109421244,
        24.173125306485854
       ],
       [
        121.55158008338292,
        24.17240665425856
       ],
       [
        121.5514902518545,
        24.172137159673323
       ],
       [
        121.55077159962721,
        24.17303547495744
       ],
       [
        121.55023261045673,
        24.172945643429028
       ],
       [
        121.55104109421244,
        24.173125306485854
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/24 18:01 SAR 新增水體 0.89 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（425 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "11/23 18:00",
      "lastSeen": "11/23 18:00",
      "lastSeenAt": "2025-11-23T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.557435,
       24.155918
      ],
      "distanceFromReferenceM": 1913,
      "areaHectare": 0.57,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1260.0,
      "polygonLonLat": [
       [
        121.55688014355921,
        24.156686136786465
       ],
       [
        121.55732930120128,
        24.15641664220123
       ],
       [
        121.55741913272969,
        24.155787821502347
       ],
       [
        121.55714963814445,
        24.155787821502347
       ],
       [
        121.55723946967287,
        24.155338663860288
       ],
       [
        121.55777845884333,
        24.15515900080346
       ],
       [
        121.55759879578652,
        24.156596305258052
       ],
       [
        121.55688014355921,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "11/23 18:00",
        "areaHectare": 0.57,
        "recheck": "persistent",
        "recheckTime": "11/29 18:01",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.57 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.02 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1260 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E4 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "11/23 18:00 SAR 新增水體 0.57 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1260 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（9.1 km）、2016 立霧溪錐麓（1.9 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-12-05T10:00:00+00:00",
    "label": "12/5 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 11/29 的候選",
    "since": "距觸發約 50 天",
    "nextPass": "12/11",
    "counts": {
     "high": 3,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "12/5 18:00",
      "lastSeenAt": "2025-12-05T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551389,
       24.172611
      ],
      "distanceFromReferenceM": 788,
      "areaHectare": 0.69,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 427.0,
      "polygonLonLat": [
       [
        121.55166991491133,
        24.171867665088087
       ],
       [
        121.55292755630909,
        24.172226991201732
       ],
       [
        121.5530173878375,
        24.17204732814491
       ],
       [
        121.55166991491133,
        24.171867665088087
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       },
       {
        "passTime": "12/5 18:00",
        "areaHectare": 0.69,
        "recheck": "pending",
        "recheckTime": "12/11 18:01",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.69 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（427 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/5 18:00 SAR 新增水體 0.69 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "10/24 複核同位置仍有水體（IoU 0.59），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（427 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 12/11）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "11/23 18:00",
      "lastSeen": "11/23 18:00",
      "lastSeenAt": "2025-11-23T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.557435,
       24.155918
      ],
      "distanceFromReferenceM": 1913,
      "areaHectare": 0.57,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1260.0,
      "polygonLonLat": [
       [
        121.55688014355921,
        24.156686136786465
       ],
       [
        121.55732930120128,
        24.15641664220123
       ],
       [
        121.55741913272969,
        24.155787821502347
       ],
       [
        121.55714963814445,
        24.155787821502347
       ],
       [
        121.55723946967287,
        24.155338663860288
       ],
       [
        121.55777845884333,
        24.15515900080346
       ],
       [
        121.55759879578652,
        24.156596305258052
       ],
       [
        121.55688014355921,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "11/23 18:00",
        "areaHectare": 0.57,
        "recheck": "persistent",
        "recheckTime": "11/29 18:01",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.57 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.02 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1260 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E4 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "11/23 18:00 SAR 新增水體 0.57 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1260 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（9.1 km）、2016 立霧溪錐麓（1.9 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 9 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-12-11T10:01:00+00:00",
    "label": "12/11 18:01",
    "what": "新一期 SAR 全幅偵測＋複核 12/5 的候選",
    "since": "距觸發約 56 天",
    "nextPass": "12/17",
    "counts": {
     "high": 3,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/12 18:01",
      "lastSeen": "10/12 18:01",
      "lastSeenAt": "2025-10-12T10:01:00+00:00",
      "isNew": false,
      "lonLat": [
       121.560369,
       24.168233
      ],
      "distanceFromReferenceM": 558,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 415.0,
      "polygonLonLat": [
       [
        121.56020391011046,
        24.168094740894784
       ],
       [
        121.56029374163887,
        24.168543898536843
       ],
       [
        121.56002424705363,
        24.168454067008433
       ],
       [
        121.5597547524684,
        24.16935238229255
       ],
       [
        121.56056323622411,
        24.168723561593666
       ],
       [
        121.56038357316729,
        24.168184572423197
       ],
       [
        121.56101239386616,
        24.16800490936637
       ],
       [
        121.56065306775253,
        24.16755575172431
       ],
       [
        121.56020391011046,
        24.168094740894784
       ]
      ],
      "detections": [
       {
        "passTime": "10/12 18:01",
        "areaHectare": 0.7,
        "recheck": "persistent",
        "recheckTime": "10/18 18:00",
        "iou": 0.42,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.16 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（415 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.42，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/12 18:01 SAR 新增水體 0.70 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（415 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.9 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 53 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "10/18 18:00",
      "lastSeen": "12/5 18:00",
      "lastSeenAt": "2025-12-05T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.551389,
       24.172611
      ],
      "distanceFromReferenceM": 788,
      "areaHectare": 0.69,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 427.0,
      "polygonLonLat": [
       [
        121.55166991491133,
        24.171867665088087
       ],
       [
        121.55292755630909,
        24.172226991201732
       ],
       [
        121.5530173878375,
        24.17204732814491
       ],
       [
        121.55166991491133,
        24.171867665088087
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.98,
        "recheck": "persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.59,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.98 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 3.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.59，持續蓄水"
        ]
       },
       {
        "passTime": "10/24 18:01",
        "areaHectare": 0.89,
        "recheck": "not_persistent",
        "recheckTime": "10/30 18:00",
        "iou": 0.12,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.89 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.70 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（425 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.12，未確認持續"
        ]
       },
       {
        "passTime": "12/5 18:00",
        "areaHectare": 0.69,
        "recheck": "persistent",
        "recheckTime": "12/11 18:01",
        "iou": 0.48,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.69 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.97 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（427 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.48，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "12/5 18:00 SAR 新增水體 0.69 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（427 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2009 陶賽溪（9.6 km）、2014 瓦黑爾溪（7.9 km）、2016 立霧溪錐麓（0.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 53 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "11/23 18:00",
      "lastSeen": "11/23 18:00",
      "lastSeenAt": "2025-11-23T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.557435,
       24.155918
      ],
      "distanceFromReferenceM": 1913,
      "areaHectare": 0.57,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1260.0,
      "polygonLonLat": [
       [
        121.55688014355921,
        24.156686136786465
       ],
       [
        121.55732930120128,
        24.15641664220123
       ],
       [
        121.55741913272969,
        24.155787821502347
       ],
       [
        121.55714963814445,
        24.155787821502347
       ],
       [
        121.55723946967287,
        24.155338663860288
       ],
       [
        121.55777845884333,
        24.15515900080346
       ],
       [
        121.55759879578652,
        24.156596305258052
       ],
       [
        121.55688014355921,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "11/23 18:00",
        "areaHectare": 0.57,
        "recheck": "persistent",
        "recheckTime": "11/29 18:01",
        "iou": 0.38,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.57 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.02 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1260 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.38，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E4 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "11/23 18:00 SAR 新增水體 0.57 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1260 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（9.1 km）、2016 立霧溪錐麓（1.9 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 53 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/18 18:00",
      "lastSeen": "10/18 18:00",
      "lastSeenAt": "2025-10-18T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.553855,
       24.163464
      ],
      "distanceFromReferenceM": 1197,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 502.0,
      "polygonLonLat": [
       [
        121.55346654547957,
        24.1636929960026
       ],
       [
        121.55328688242274,
        24.163423501417363
       ],
       [
        121.55328688242274,
        24.16378282753101
       ],
       [
        121.55346654547957,
        24.1636929960026
       ]
      ],
      "detections": [
       {
        "passTime": "10/18 18:00",
        "areaHectare": 0.56,
        "recheck": "not_persistent",
        "recheckTime": "10/24 18:01",
        "iou": 0.11,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.56 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.93 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（502 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.11，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.11）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.11），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/18 18:00 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "10/24 複核同位置水體 IoU 0.11，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（502 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2014 瓦黑爾溪（8.5 km）、2016 立霧溪錐麓（1.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 53 mm、24 小時 10 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.11，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl073",
  "name": "南投合歡溪 · 2026",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2026-04-07 形成，清冊蓄水量 4 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 降軌 105 共 15 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.24971,
   24.16209
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl073",
   "name": "南投合歡溪",
   "lonLat": [
    121.24971,
    24.16209
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl073.jpg",
   "before": "2026-03-31",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-03-31 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2026-04-07T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2026-03-31T21:52:00+00:00",
    "label": "4/1 05:52",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 6 天",
    "nextPass": "4/6",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-04-06T21:51:00+00:00",
    "label": "4/7 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 4/1 的候選",
    "since": "距觸發約 6 小時",
    "nextPass": "4/12",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-04-12T21:52:00+00:00",
    "label": "4/13 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 4/7 的候選",
    "since": "距觸發約 6 天",
    "nextPass": "4/18",
    "counts": {
     "high": 0,
     "medium": 2,
     "low": 0
    },
    "newCount": 2,
    "events": [
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/13 05:52",
      "lastSeenAt": "2026-04-12T21:52:00+00:00",
      "isNew": true,
      "lonLat": [
       121.243211,
       24.17665
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.27,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3047.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.176179578451862
       ],
       [
        121.2432782778731,
        24.175460926224567
       ],
       [
        121.24273928870262,
        24.175460926224567
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.17483210552568
       ],
       [
        121.24237996258897,
        24.1757304208098
       ],
       [
        121.24309861481628,
        24.176179578451862
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "pending",
        "recheckTime": "4/19 05:51",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.3 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 4/18 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/13 05:52 SAR 新增水體 1.27 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3047 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 4/18）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（4/18）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/13 05:52",
      "lastSeenAt": "2026-04-12T21:52:00+00:00",
      "isNew": true,
      "lonLat": [
       121.265491,
       24.163621
      ],
      "distanceFromReferenceM": 1612,
      "areaHectare": 1.03,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2730.0,
      "polygonLonLat": [
       [
        121.26483784469197,
        24.163962490587835
       ],
       [
        121.26537683386243,
        24.163962490587835
       ],
       [
        121.26429885552149,
        24.16279468071848
       ],
       [
        121.26483784469197,
        24.163962490587835
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "pending",
        "recheckTime": "4/19 05:51",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E2 需要人工確認：單期 SAR 出現約 1.0 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 4/18 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/13 05:52 SAR 新增水體 1.03 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.4 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 4/18）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（4/18）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-04-18T21:51:00+00:00",
    "label": "4/19 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 4/13 的候選",
    "since": "距觸發約 12 天",
    "nextPass": "4/24",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/19 05:51",
      "lastSeenAt": "2026-04-18T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.264758,
       24.162991
      ],
      "distanceFromReferenceM": 1532,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2734.0,
      "polygonLonLat": [
       [
        121.26429885552149,
        24.163064175303717
       ],
       [
        121.2650175077488,
        24.163333669888953
       ],
       [
        121.2650175077488,
        24.16387265905942
       ],
       [
        121.26555649691926,
        24.163782827531012
       ],
       [
        121.2650175077488,
        24.162525186133244
       ],
       [
        121.26492767622038,
        24.16324383836054
       ],
       [
        121.26429885552149,
        24.163064175303717
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "pending",
        "recheckTime": "4/20 05:51",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/19 05:51 SAR 新增水體 0.68 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "4/19 複核同位置仍有水體（IoU 0.31），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2734 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "context",
        "text": "面積 1.0 → 0.7 公頃，縮小中"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 143 mm、24 小時 138 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 4/24）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.shrinking",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/13 05:52",
      "lastSeenAt": "2026-04-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243211,
       24.17665
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.27,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3047.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.176179578451862
       ],
       [
        121.2432782778731,
        24.175460926224567
       ],
       [
        121.24273928870262,
        24.175460926224567
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.17483210552568
       ],
       [
        121.24237996258897,
        24.1757304208098
       ],
       [
        121.24309861481628,
        24.176179578451862
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/13 05:52 SAR 新增水體 1.27 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/19 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3047 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 143 mm、24 小時 138 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-04-19T21:51:00+00:00",
    "label": "4/20 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 4/19 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "4/25",
    "counts": {
     "high": 1,
     "medium": 3,
     "low": 0
    },
    "newCount": 2,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "pending",
        "recheckTime": "4/25 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E2 值得優先查證：4 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "4/20 複核同位置仍有水體（IoU 0.47），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 155 mm、24 小時 14 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 4/25）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "pending",
        "recheckTime": "4/25 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.4 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 4/25 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 155 mm、24 小時 14 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 4/25）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（4/25）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "pending",
        "recheckTime": "4/25 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 4/25 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 155 mm、24 小時 14 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 4/25）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（4/25）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "pending",
        "recheckTime": "4/25 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E4 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 4/25 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 155 mm、24 小時 14 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 4/25）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（4/25）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-04-24T21:52:00+00:00",
    "label": "4/25 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 4/20 的候選",
    "since": "距觸發約 18 天",
    "nextPass": "4/30",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 25 mm、24 小時 5 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 25 mm、24 小時 5 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 25 mm、24 小時 5 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 25 mm、24 小時 5 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-04-30T21:51:00+00:00",
    "label": "5/1 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 4/25 的候選",
    "since": "距觸發約 24 天",
    "nextPass": "5/6",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 76 mm、24 小時 42 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 76 mm、24 小時 42 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 76 mm、24 小時 42 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 76 mm、24 小時 42 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-01T21:51:00+00:00",
    "label": "5/2 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 5/1 的候選",
    "since": "距觸發約 25 天",
    "nextPass": "5/7",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 71 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 71 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 71 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 71 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-06T21:52:00+00:00",
    "label": "5/7 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 5/2 的候選",
    "since": "距觸發約 30 天",
    "nextPass": "5/12",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 203 mm、24 小時 104 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 203 mm、24 小時 104 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 203 mm、24 小時 104 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 203 mm、24 小時 104 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-12T21:51:00+00:00",
    "label": "5/13 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 5/7 的候選",
    "since": "距觸發約 36 天",
    "nextPass": "5/18",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 22 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 22 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 22 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 22 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-13T21:51:00+00:00",
    "label": "5/14 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 5/13 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "5/19",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 45 mm、24 小時 26 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.243417,
       24.176731
      ],
      "distanceFromReferenceM": 1740,
      "areaHectare": 1.36,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3079.0,
      "polygonLonLat": [
       [
        121.24300878328786,
        24.17519143163933
       ],
       [
        121.24246979411738,
        24.17564058928139
       ],
       [
        121.24282912023104,
        24.176179578451862
       ],
       [
        121.2433681094015,
        24.175550757752976
       ],
       [
        121.24300878328786,
        24.17519143163933
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.06）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.06），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 1.36 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.06，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3079 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 45 mm、24 小時 26 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.06，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 45 mm、24 小時 26 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 45 mm、24 小時 26 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-18T21:52:00+00:00",
    "label": "5/19 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 5/14 的候選",
    "since": "距觸發約 42 天",
    "nextPass": "5/24",
    "counts": {
     "high": 1,
     "medium": 1,
     "low": 2
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 10 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "5/19 05:52",
      "lastSeenAt": "2026-05-18T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.242901,
       24.175879
      ],
      "distanceFromReferenceM": 1674,
      "areaHectare": 1.73,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3035.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.175999915395035
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.175011768582504
       ],
       [
        121.24220029953216,
        24.175820252338212
       ],
       [
        121.24309861481628,
        24.175999915395035
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "5/19 05:52",
        "areaHectare": 1.73,
        "recheck": "pending",
        "recheckTime": "5/25 05:51",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.73 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.61 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3035 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 5/24 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/19 05:52 SAR 新增水體 1.73 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3035 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 10 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 5/24）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（5/24）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 10 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 10 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-24T21:51:00+00:00",
    "label": "5/25 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 5/19 的候選",
    "since": "距觸發約 48 天",
    "nextPass": "5/30",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "5/19 05:52",
      "lastSeenAt": "2026-05-18T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.242901,
       24.175879
      ],
      "distanceFromReferenceM": 1674,
      "areaHectare": 1.73,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3035.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.175999915395035
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.175011768582504
       ],
       [
        121.24220029953216,
        24.175820252338212
       ],
       [
        121.24309861481628,
        24.175999915395035
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "5/19 05:52",
        "areaHectare": 1.73,
        "recheck": "not_persistent",
        "recheckTime": "5/25 05:51",
        "iou": 0.17,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.73 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.61 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3035 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.17，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.17）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.17），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/19 05:52 SAR 新增水體 1.73 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "5/25 複核同位置水體 IoU 0.17，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3035 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.17，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-25T21:51:00+00:00",
    "label": "5/26 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 5/25 的候選",
    "since": "距觸發約 49 天",
    "nextPass": "5/31",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "5/19 05:52",
      "lastSeenAt": "2026-05-18T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.242901,
       24.175879
      ],
      "distanceFromReferenceM": 1674,
      "areaHectare": 1.73,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3035.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.175999915395035
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.175011768582504
       ],
       [
        121.24220029953216,
        24.175820252338212
       ],
       [
        121.24309861481628,
        24.175999915395035
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "5/19 05:52",
        "areaHectare": 1.73,
        "recheck": "not_persistent",
        "recheckTime": "5/25 05:51",
        "iou": 0.17,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.73 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.61 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3035 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.17，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.17）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.17），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/19 05:52 SAR 新增水體 1.73 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "5/25 複核同位置水體 IoU 0.17，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3035 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.17，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-05-30T21:52:00+00:00",
    "label": "5/31 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 5/26 的候選",
    "since": "距觸發約 54 天",
    "nextPass": "6/5",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "4/13 05:52",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.26475,
       24.162961
      ],
      "distanceFromReferenceM": 1531,
      "areaHectare": 0.92,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2733.0,
      "polygonLonLat": [
       [
        121.26528700233402,
        24.16324383836054
       ],
       [
        121.26456835010673,
        24.16387265905942
       ],
       [
        121.2658259915045,
        24.1636929960026
       ],
       [
        121.26573615997609,
        24.16324383836054
       ],
       [
        121.26564632844767,
        24.1636929960026
       ],
       [
        121.26528700233402,
        24.16324383836054
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.03,
        "recheck": "persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.31,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.03 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.39 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.31，持續蓄水"
        ]
       },
       {
        "passTime": "4/19 05:51",
        "areaHectare": 0.68,
        "recheck": "persistent",
        "recheckTime": "4/20 05:51",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.12 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2734 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.92,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.0,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.92 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.09 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E2 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.92 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "4/13 05:52",
      "lastSeen": "5/19 05:52",
      "lastSeenAt": "2026-05-18T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.242901,
       24.175879
      ],
      "distanceFromReferenceM": 1674,
      "areaHectare": 1.73,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3035.0,
      "polygonLonLat": [
       [
        121.24309861481628,
        24.175999915395035
       ],
       [
        121.24282912023104,
        24.175011768582504
       ],
       [
        121.24237996258897,
        24.175011768582504
       ],
       [
        121.24220029953216,
        24.175820252338212
       ],
       [
        121.24309861481628,
        24.175999915395035
       ]
      ],
      "detections": [
       {
        "passTime": "4/13 05:52",
        "areaHectare": 1.27,
        "recheck": "not_persistent",
        "recheckTime": "4/19 05:51",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.27 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.98 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3047 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "4/20 05:51",
        "areaHectare": 1.36,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.06,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.36 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.21 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3079 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.06，未確認持續"
        ]
       },
       {
        "passTime": "5/19 05:52",
        "areaHectare": 1.73,
        "recheck": "not_persistent",
        "recheckTime": "5/25 05:51",
        "iou": 0.17,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.73 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.61 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3035 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.17，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.17）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.17），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "5/19 05:52 SAR 新增水體 1.73 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "5/25 複核同位置水體 IoU 0.17，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3035 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.17，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.262552,
       24.178372
      ],
      "distanceFromReferenceM": 2223,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 3121.0,
      "polygonLonLat": [
       [
        121.26187340425437,
        24.178155872076925
       ],
       [
        121.26277171953849,
        24.178605029718984
       ],
       [
        121.26322087718054,
        24.177706714434862
       ],
       [
        121.26187340425437,
        24.178155872076925
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.20 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（3121 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E3 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（3121 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "4/20 05:51",
      "lastSeen": "4/20 05:51",
      "lastSeenAt": "2026-04-19T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.252828,
       24.156758
      ],
      "distanceFromReferenceM": 669,
      "areaHectare": 0.68,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 2945.0,
      "polygonLonLat": [
       [
        121.25181227307223,
        24.156686136786465
       ],
       [
        121.25199193612906,
        24.156416642201233
       ],
       [
        121.2523512622427,
        24.156147147615997
       ],
       [
        121.25190210460065,
        24.156147147615997
       ],
       [
        121.25181227307223,
        24.156686136786465
       ]
      ],
      "detections": [
       {
        "passTime": "4/20 05:51",
        "areaHectare": 0.68,
        "recheck": "not_persistent",
        "recheckTime": "4/25 05:52",
        "iou": 0.01,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.68 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.66 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（2945 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.01，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.01）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.01），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "4/20 05:51 SAR 新增水體 0.68 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "4/25 複核同位置水體 IoU 0.01，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（2945 m）以下，符合堵塞型態"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 4 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.01，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl074",
  "name": "加走寮溪 · 2026",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2026-06-13 形成，清冊蓄水量 10 萬 m³。以清冊壩址為中心 4 km 窗格，Sentinel-1 降軌 105 共 12 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   120.69867,
   23.66271
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl074",
   "name": "加走寮溪",
   "lonLat": [
    120.69867,
    23.66271
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl074.jpg",
   "before": "2026-06-06",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-06-06 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2026-06-13T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2026-06-05T21:51:00+00:00",
    "label": "6/6 05:51",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 7 天",
    "nextPass": "6/12",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-06T21:52:00+00:00",
    "label": "6/7 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/6 的候選",
    "since": "觸發前約 6 天",
    "nextPass": "6/13",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-11T21:52:00+00:00",
    "label": "6/12 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/7 的候選",
    "since": "觸發前約 18 小時",
    "nextPass": "6/18",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-18T21:52:00+00:00",
    "label": "6/19 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/12 的候選",
    "since": "距觸發約 6 天",
    "nextPass": "6/25",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-23T21:52:00+00:00",
    "label": "6/24 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/19 的候選",
    "since": "距觸發約 11 天",
    "nextPass": "6/30",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-24T21:51:00+00:00",
    "label": "6/25 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 6/24 的候選",
    "since": "距觸發約 12 天",
    "nextPass": "7/1",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-30T21:51:00+00:00",
    "label": "7/1 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 6/25 的候選",
    "since": "距觸發約 18 天",
    "nextPass": "7/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-07-06T21:51:00+00:00",
    "label": "7/7 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/1 的候選",
    "since": "距觸發約 24 天",
    "nextPass": "7/13",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-07-12T21:52:00+00:00",
    "label": "7/13 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/7 的候選",
    "since": "距觸發約 30 天",
    "nextPass": "7/19",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-07-18T21:51:00+00:00",
    "label": "7/19 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/13 的候選",
    "since": "距觸發約 36 天",
    "nextPass": "7/25",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-07-24T21:51:00+00:00",
    "label": "7/25 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/19 的候選",
    "since": "距觸發約 42 天",
    "nextPass": "7/31",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/25 05:51",
      "lastSeen": "7/25 05:51",
      "lastSeenAt": "2026-07-24T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       120.694777,
       23.658794
      ],
      "distanceFromReferenceM": 587,
      "areaHectare": 0.67,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 416.0,
      "polygonLonLat": [
       [
        120.6945873023329,
        23.658300817156952
       ],
       [
        120.69503645997497,
        23.65910930091266
       ],
       [
        120.69503645997497,
        23.658210985628543
       ],
       [
        120.6945873023329,
        23.658300817156952
       ]
      ],
      "detections": [
       {
        "passTime": "7/25 05:51",
        "areaHectare": 0.67,
        "recheck": "pending",
        "recheckTime": "7/31 05:51",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.67 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.15 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（416 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/31 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/25 05:51 SAR 新增水體 0.67 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（416 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 4 筆堰塞湖：1979 草嶺（9.4 km）、1999 草嶺（9.7 km）、2017 東埔蚋溪小半天（8.0 km）、2025 雲林清水溪(草嶺)（9.2 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/31）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/31）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-07-30T21:51:00+00:00",
    "label": "7/31 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/25 的候選",
    "since": "距觸發約 48 天",
    "nextPass": "8/6",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 1
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/25 05:51",
      "lastSeen": "7/25 05:51",
      "lastSeenAt": "2026-07-24T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       120.694777,
       23.658794
      ],
      "distanceFromReferenceM": 587,
      "areaHectare": 0.67,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 416.0,
      "polygonLonLat": [
       [
        120.6945873023329,
        23.658300817156952
       ],
       [
        120.69503645997497,
        23.65910930091266
       ],
       [
        120.69503645997497,
        23.658210985628543
       ],
       [
        120.6945873023329,
        23.658300817156952
       ]
      ],
      "detections": [
       {
        "passTime": "7/25 05:51",
        "areaHectare": 0.67,
        "recheck": "not_persistent",
        "recheckTime": "7/31 05:51",
        "iou": 0.17,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.67 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.15 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（416 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.17，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.17）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.17），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/25 05:51 SAR 新增水體 0.67 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/31 複核同位置水體 IoU 0.17，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.2 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（416 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 4 筆堰塞湖：1979 草嶺（9.4 km）、1999 草嶺（9.7 km）、2017 東埔蚋溪小半天（8.0 km）、2025 雲林清水溪(草嶺)（9.2 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 15 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.17，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "inv_bl075",
  "name": "花蓮萬里溪 · 2026",
  "kind": "replay",
  "active": null,
  "description": "全清冊回放：清冊登載 2026-06-20 形成。以清冊壩址為中心 4 km 窗格，Sentinel-1 升軌 69 共 7 期（形成前 7 天到形成後 60 天），參數與馬太鞍溪相同，未逐湖調整。",
  "center": [
   121.26957,
   23.79204
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl075",
   "name": "花蓮萬里溪",
   "lonLat": [
    121.26957,
    23.79204
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/inv_bl075.jpg",
   "before": "2026-06-13",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-06-13 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊登載形成日",
   "time": "2026-06-20T00:00:00+08:00",
   "source": "農村水保署堰塞湖清冊"
  },
  "snapshots": [
   {
    "asOf": "2026-06-21T10:01:00+00:00",
    "label": "6/21 18:01",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 42 小時",
    "nextPass": "6/30",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-28T10:00:00+00:00",
    "label": "6/28 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 6/21 的候選",
    "since": "距觸發約 9 天",
    "nextPass": "7/7",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "pending",
        "recheckTime": "7/10 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.5 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/7 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 183 mm、24 小時 52 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/7）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/7）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-07-10T10:00:00+00:00",
    "label": "7/10 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 6/28 的候選",
    "since": "距觸發約 21 天",
    "nextPass": "7/19",
    "counts": {
     "high": 1,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "persistent",
        "recheckTime": "7/10 18:00",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 50 mm、24 小時 50 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/10 18:00",
      "lastSeen": "7/10 18:00",
      "lastSeenAt": "2026-07-10T10:00:00+00:00",
      "isNew": true,
      "lonLat": [
       121.266829,
       23.793227
      ],
      "distanceFromReferenceM": 308,
      "areaHectare": 2.33,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1036.0,
      "polygonLonLat": [
       [
        121.26555649691926,
        23.794126088115824
       ],
       [
        121.26636498067496,
        23.793497267416942
       ],
       [
        121.26762262207274,
        23.793497267416942
       ],
       [
        121.26852093735685,
        23.79205996296235
       ],
       [
        121.26816161124322,
        23.79205996296235
       ],
       [
        121.26717346443068,
        23.79250912060441
       ],
       [
        121.26618531761815,
        23.793497267416942
       ],
       [
        121.26537683386243,
        23.793587098945352
       ],
       [
        121.26555649691926,
        23.794126088115824
       ]
      ],
      "detections": [
       {
        "passTime": "7/10 18:00",
        "areaHectare": 2.33,
        "recheck": "pending",
        "recheckTime": "7/22 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 2.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.56 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E2 需要人工確認：單期 SAR 出現約 2.3 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/19 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/10 18:00 SAR 新增水體 2.33 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 15.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1036 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 50 mm、24 小時 50 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/19）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/19）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-07-22T10:00:00+00:00",
    "label": "7/22 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/10 的候選",
    "since": "距觸發約 33 天",
    "nextPass": "7/31",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "7/10 18:00",
      "lastSeen": "7/22 18:00",
      "lastSeenAt": "2026-07-22T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.266847,
       23.793218
      ],
      "distanceFromReferenceM": 306,
      "areaHectare": 4.37,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1036.0,
      "polygonLonLat": [
       [
        121.26465818163514,
        23.795293897985182
       ],
       [
        121.26447851857831,
        23.79484474034312
       ],
       [
        121.26492767622038,
        23.79439558270106
       ],
       [
        121.26591582303291,
        23.794215919644238
       ],
       [
        121.26636498067496,
        23.793587098945352
       ],
       [
        121.26780228512956,
        23.793587098945352
       ],
       [
        121.26861076888527,
        23.79197013143394
       ],
       [
        121.27022773639668,
        23.791880299905525
       ],
       [
        121.27013790486828,
        23.791431142263466
       ],
       [
        121.26771245360115,
        23.79197013143394
       ],
       [
        121.26636498067496,
        23.79340743588853
       ],
       [
        121.26393952940785,
        23.79439558270106
       ],
       [
        121.26465818163514,
        23.795293897985182
       ]
      ],
      "detections": [
       {
        "passTime": "7/10 18:00",
        "areaHectare": 2.33,
        "recheck": "persistent",
        "recheckTime": "7/22 18:00",
        "iou": 0.52,
        "evidenceImage": null,
        "reasons": [
         "新增水體 2.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.56 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "7/22 18:00",
        "areaHectare": 4.37,
        "recheck": "pending",
        "recheckTime": "8/3 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.37 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E2 值得優先查證：6 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/22 18:00 SAR 新增水體 4.37 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "7/22 複核同位置仍有水體（IoU 0.52），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 20.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1036 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 2.3 → 4.4 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 7/31）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "persistent",
        "recheckTime": "7/10 18:00",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-08-03T10:00:00+00:00",
    "label": "8/3 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 7/22 的候選",
    "since": "距觸發約 45 天",
    "nextPass": "8/12",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "7/10 18:00",
      "lastSeen": "8/3 18:00",
      "lastSeenAt": "2026-08-03T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.266779,
       23.7932
      ],
      "distanceFromReferenceM": 312,
      "areaHectare": 3.82,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1036.0,
      "polygonLonLat": [
       [
        121.26968874722621,
        23.791700636848702
       ],
       [
        121.26717346443068,
        23.792239626019175
       ],
       [
        121.26699380137386,
        23.79295827824647
       ],
       [
        121.26591582303291,
        23.793587098945352
       ],
       [
        121.2680717797148,
        23.793497267416942
       ],
       [
        121.26798194818639,
        23.792419289075998
       ],
       [
        121.26968874722621,
        23.791700636848702
       ]
      ],
      "detections": [
       {
        "passTime": "7/10 18:00",
        "areaHectare": 2.33,
        "recheck": "persistent",
        "recheckTime": "7/22 18:00",
        "iou": 0.52,
        "evidenceImage": null,
        "reasons": [
         "新增水體 2.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.56 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "7/22 18:00",
        "areaHectare": 4.37,
        "recheck": "persistent",
        "recheckTime": "8/3 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.37 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "8/3 18:00",
        "areaHectare": 3.82,
        "recheck": "pending",
        "recheckTime": "8/9 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.82 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 22.28 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E2 值得優先查證：6 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/3 18:00 SAR 新增水體 3.82 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/3 複核同位置仍有水體（IoU 0.66），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 22.3 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1036 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 2.3 → 3.8 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 8/12）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "persistent",
        "recheckTime": "7/10 18:00",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-08-09T10:00:00+00:00",
    "label": "8/9 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/3 的候選",
    "since": "距觸發約 51 天",
    "nextPass": "8/18",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "7/10 18:00",
      "lastSeen": "8/9 18:00",
      "lastSeenAt": "2026-08-09T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.267174,
       23.793119
      ],
      "distanceFromReferenceM": 272,
      "areaHectare": 4.33,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1036.0,
      "polygonLonLat": [
       [
        121.26483784469197,
        23.795383729513592
       ],
       [
        121.26465818163514,
        23.79439558270106
       ],
       [
        121.26564632844767,
        23.79430575117265
       ],
       [
        121.26654464373179,
        23.793497267416942
       ],
       [
        121.2680717797148,
        23.793497267416942
       ],
       [
        121.26825144277161,
        23.792329457547588
       ],
       [
        121.2688802634705,
        23.791880299905525
       ],
       [
        121.26780228512956,
        23.791880299905525
       ],
       [
        121.26636498067496,
        23.79340743588853
       ],
       [
        121.26384969787944,
        23.794485414229474
       ],
       [
        121.26483784469197,
        23.795383729513592
       ]
      ],
      "detections": [
       {
        "passTime": "7/10 18:00",
        "areaHectare": 2.33,
        "recheck": "persistent",
        "recheckTime": "7/22 18:00",
        "iou": 0.52,
        "evidenceImage": null,
        "reasons": [
         "新增水體 2.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.56 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "7/22 18:00",
        "areaHectare": 4.37,
        "recheck": "persistent",
        "recheckTime": "8/3 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.37 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "8/3 18:00",
        "areaHectare": 3.82,
        "recheck": "persistent",
        "recheckTime": "8/9 18:00",
        "iou": 0.58,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.82 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 22.28 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.58，持續蓄水"
        ]
       },
       {
        "passTime": "8/9 18:00",
        "areaHectare": 4.33,
        "recheck": "pending",
        "recheckTime": "8/15 18:00",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.34 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 4 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E2 值得優先查證：6 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/9 18:00 SAR 新增水體 4.33 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/9 複核同位置仍有水體（IoU 0.58），共 4 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 20.3 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1036 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 2.3 → 4.3 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 115 mm、24 小時 58 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 8/18）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "persistent",
        "recheckTime": "7/10 18:00",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 115 mm、24 小時 58 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2026-08-15T10:00:00+00:00",
    "label": "8/15 18:00",
    "what": "新一期 SAR 全幅偵測＋複核 8/9 的候選",
    "since": "距觸發約 57 天",
    "nextPass": "8/24",
    "counts": {
     "high": 2,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E2",
      "firstSeen": "7/10 18:00",
      "lastSeen": "8/15 18:00",
      "lastSeenAt": "2026-08-15T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.266919,
       23.793158
      ],
      "distanceFromReferenceM": 297,
      "areaHectare": 4.34,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1036.0,
      "polygonLonLat": [
       [
        121.26465818163514,
        23.79520406645677
       ],
       [
        121.26483784469197,
        23.79439558270106
       ],
       [
        121.26600565456133,
        23.794126088115824
       ],
       [
        121.26645481220338,
        23.793497267416942
       ],
       [
        121.26789211665798,
        23.79331760436012
       ],
       [
        121.26825144277161,
        23.792329457547588
       ],
       [
        121.26923958958415,
        23.791880299905525
       ],
       [
        121.26834127430003,
        23.79161080532029
       ],
       [
        121.26708363290227,
        23.792329457547588
       ],
       [
        121.26636498067496,
        23.79340743588853
       ],
       [
        121.26411919246468,
        23.79439558270106
       ],
       [
        121.26393952940785,
        23.79475490881471
       ],
       [
        121.26465818163514,
        23.79520406645677
       ]
      ],
      "detections": [
       {
        "passTime": "7/10 18:00",
        "areaHectare": 2.33,
        "recheck": "persistent",
        "recheckTime": "7/22 18:00",
        "iou": 0.52,
        "evidenceImage": null,
        "reasons": [
         "新增水體 2.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 15.56 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "7/22 18:00",
        "areaHectare": 4.37,
        "recheck": "persistent",
        "recheckTime": "8/3 18:00",
        "iou": 0.66,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.37 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.66，持續蓄水"
        ]
       },
       {
        "passTime": "8/3 18:00",
        "areaHectare": 3.82,
        "recheck": "persistent",
        "recheckTime": "8/9 18:00",
        "iou": 0.58,
        "evidenceImage": null,
        "reasons": [
         "新增水體 3.82 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 22.28 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.58，持續蓄水"
        ]
       },
       {
        "passTime": "8/9 18:00",
        "areaHectare": 4.33,
        "recheck": "persistent",
        "recheckTime": "8/15 18:00",
        "iou": 0.69,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.33 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 20.34 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.69，持續蓄水"
        ]
       },
       {
        "passTime": "8/15 18:00",
        "areaHectare": 4.34,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 4.34 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 22.35 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1036 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 5 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E2 值得優先查證：6 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/15 18:00 SAR 新增水體 4.34 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/15 複核同位置仍有水體（IoU 0.69），共 5 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 22.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1036 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 2.3 → 4.3 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.1 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 23 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 8/24）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "6/28 18:00",
      "lastSeen": "6/28 18:00",
      "lastSeenAt": "2026-06-28T10:00:00+00:00",
      "isNew": false,
      "lonLat": [
       121.288688,
       23.788007
      ],
      "distanceFromReferenceM": 1998,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 824.0,
      "polygonLonLat": [
       [
        121.28864319972114,
        23.788646364882695
       ],
       [
        121.28900252583479,
        23.78828703876905
       ],
       [
        121.28891269430638,
        23.788017544183813
       ],
       [
        121.2883737051359,
        23.78828703876905
       ],
       [
        121.28864319972114,
        23.788646364882695
       ]
      ],
      "detections": [
       {
        "passTime": "6/28 18:00",
        "areaHectare": 0.5,
        "recheck": "persistent",
        "recheckTime": "7/10 18:00",
        "iou": 0.47,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.01 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "後續 1 期影像同位置水體 IoU 最高 0.47，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "6/28 18:00 SAR 新增水體 0.50 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.0 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2024 花蓮萬里溪（1.2 km）、2025 花蓮馬太鞍溪（9.7 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 23 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "live_E121270_N23792",
  "name": "花蓮萬里溪",
  "kind": "live",
  "active": true,
  "description": "自動監看（監看中）：清冊監測中：花蓮萬里溪（2026/06/20）。窗格自 2026-10-11 啟用，Sentinel-1 降軌 105＋升軌 69，事件前基準 降軌 105 10 張、升軌 69 5 張；各軌道獨立複核，參數與全清冊回放相同。",
  "center": [
   121.26957,
   23.79204
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl075",
   "name": "花蓮萬里溪",
   "lonLat": [
    121.26957,
    23.79204
   ],
   "label": "清冊壩址"
  },
  "basemap": {
   "file": "data/basemaps/live_E121270_N23792.jpg",
   "before": "2026-10-11",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-10-11 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊監測中：花蓮萬里溪（2026/06/20）",
   "time": "2026-10-11T15:42+08:00",
   "source": "每日監看"
  },
  "snapshots": [
   {
    "asOf": "2026-10-10T21:51:00+00:00",
    "label": "10/11 05:51",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 10 小時",
    "nextPass": "10/23",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/11 05:51",
      "lastSeen": "10/11 05:51",
      "lastSeenAt": "2026-10-10T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.267733,
       23.792923
      ],
      "distanceFromReferenceM": 211,
      "areaHectare": 1.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1034.0,
      "polygonLonLat": [
       [
        121.26905992652733,
        23.792688783661234
       ],
       [
        121.26914975805575,
        23.79205996296235
       ],
       [
        121.26852093735685,
        23.792239626019175
       ],
       [
        121.26905992652733,
        23.792688783661234
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 05:51",
        "areaHectare": 1.5,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.37 公頃（SAR 回波變化 ≥ 門檻）",
         "但鄰近崩塌全在湖面以上坡面，未到達河床，不視為壩體",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.5 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 05:51 SAR 新增水體 1.50 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.4 公頃"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2024 花蓮萬里溪（3.0 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "清冊監測中：花蓮萬里溪（2026/06/20）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "live_E121298_N23701",
  "name": "花蓮馬太鞍溪",
  "kind": "live",
  "active": true,
  "description": "自動監看（監看中）：清冊監測中：花蓮馬太鞍溪（2025/7/21）。窗格自 2026-10-11 啟用，Sentinel-1 降軌 105＋升軌 69，事件前基準 降軌 105 5 張、升軌 69 5 張；各軌道獨立複核，參數與全清冊回放相同。",
  "center": [
   121.29752,
   23.70061
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl071",
   "name": "花蓮馬太鞍溪",
   "lonLat": [
    121.29752,
    23.70061
   ],
   "label": "清冊壩址"
  },
  "basemap": {
   "file": "data/basemaps/live_E121298_N23701.jpg",
   "before": "2026-10-11",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-10-11 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊監測中：花蓮馬太鞍溪（2025/7/21）",
   "time": "2026-10-11T15:42+08:00",
   "source": "每日監看"
  },
  "snapshots": [
   {
    "asOf": "2026-10-10T21:51:00+00:00",
    "label": "10/11 05:51",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 10 小時",
    "nextPass": "10/23",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/11 05:51",
      "lastSeen": "10/11 05:51",
      "lastSeenAt": "2026-10-10T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.301837,
       23.700615
      ],
      "distanceFromReferenceM": 440,
      "areaHectare": 1.16,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 916.0,
      "polygonLonLat": [
       [
        121.30229759203976,
        23.701330119266277
       ],
       [
        121.30148910828406,
        23.70106062468104
       ],
       [
        121.30139927675565,
        23.700431803982156
       ],
       [
        121.30130944522723,
        23.70106062468104
       ],
       [
        121.30229759203976,
        23.701330119266277
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 05:51",
        "areaHectare": 1.16,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 1.16 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 2.68 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（916 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 1.2 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 05:51 SAR 新增水體 1.16 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 2.7 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（916 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（8.4 km）、2024 花蓮萬里溪（8.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "清冊監測中：花蓮馬太鞍溪（2025/7/21）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "live_E121345_N24564",
  "name": "新竹泰崗溪",
  "kind": "live",
  "active": true,
  "description": "自動監看（監看中）：清冊監測中：新竹泰崗溪（2024/11/2）。窗格自 2026-10-11 啟用，Sentinel-1 降軌 105＋升軌 69，事件前基準 降軌 105 5 張、升軌 69 5 張；各軌道獨立複核，參數與全清冊回放相同。",
  "center": [
   121.34463,
   24.56425
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl068",
   "name": "新竹泰崗溪",
   "lonLat": [
    121.34463,
    24.56425
   ],
   "label": "清冊壩址"
  },
  "basemap": {
   "file": "data/basemaps/live_E121345_N24564.jpg",
   "before": "2026-10-11",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-10-11 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": {
   "label": "清冊監測中：新竹泰崗溪（2024/11/2）",
   "time": "2026-10-11T15:42+08:00",
   "source": "每日監看"
  },
  "snapshots": [
   {
    "asOf": "2026-10-10T21:51:00+00:00",
    "label": "10/11 05:51",
    "what": "新一期 SAR 全幅偵測",
    "since": "觸發前約 10 小時",
    "nextPass": "10/23",
    "counts": {
     "high": 0,
     "medium": 3,
     "low": 0
    },
    "newCount": 3,
    "events": [
     {
      "id": "E1",
      "firstSeen": "10/11 05:51",
      "lastSeen": "10/11 05:51",
      "lastSeenAt": "2026-10-10T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.358195,
       24.547716
      ],
      "distanceFromReferenceM": 2286,
      "areaHectare": 0.62,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1394.0,
      "polygonLonLat": [
       [
        121.35943044410975,
        24.548082106077338
       ],
       [
        121.35925078105292,
        24.547812611492102
       ],
       [
        121.35916094952451,
        24.547992274548925
       ],
       [
        121.35943044410975,
        24.548082106077338
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 05:51",
        "areaHectare": 0.62,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.62 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.51 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1394 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 05:51 SAR 新增水體 0.62 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1394 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2018 宜蘭石頭溪（9.3 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "清冊監測中：新竹泰崗溪（2024/11/2）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "10/11 05:51",
      "lastSeen": "10/11 05:51",
      "lastSeenAt": "2026-10-10T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.353729,
       24.577187
      ],
      "distanceFromReferenceM": 1701,
      "areaHectare": 0.56,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1796.0,
      "polygonLonLat": [
       [
        121.35269307947885,
        24.576379037527104
       ],
       [
        121.35242358489361,
        24.57664853211234
       ],
       [
        121.35269307947885,
        24.576828195169163
       ],
       [
        121.35269307947885,
        24.576379037527104
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 05:51",
        "areaHectare": 0.56,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.55 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 0.87 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1796 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E2 需要人工確認：單期 SAR 出現約 0.6 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 05:51 SAR 新增水體 0.56 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 0.9 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1796 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2018 宜蘭石頭溪（9.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "清冊監測中：新竹泰崗溪（2024/11/2）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E3",
      "firstSeen": "10/11 05:51",
      "lastSeen": "10/11 05:51",
      "lastSeenAt": "2026-10-10T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.360967,
       24.565745
      ],
      "distanceFromReferenceM": 1662,
      "areaHectare": 0.5,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1412.0,
      "polygonLonLat": [
       [
        121.36077791703593,
        24.56649756940179
       ],
       [
        121.36104741162116,
        24.56613824328814
       ],
       [
        121.36050842245069,
        24.566048411759727
       ],
       [
        121.36077791703593,
        24.56649756940179
       ]
      ],
      "detections": [
       {
        "passTime": "10/11 05:51",
        "areaHectare": 0.5,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.50 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 1.06 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1412 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E3 需要人工確認：單期 SAR 出現約 0.5 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 10/23 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "10/11 05:51 SAR 新增水體 0.50 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 1.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1412 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 1 筆堰塞湖：2018 宜蘭石頭溪（8.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "清冊監測中：新竹泰崗溪（2024/11/2）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 10/23）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（10/23）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "matai_an_2025",
  "name": "馬太鞍溪 · 2025 薇帕颱風",
  "kind": "positive",
  "active": null,
  "description": "壩址周圍 4 km 窗格，Sentinel-1 降軌 105 逐期回放。湖於 2025-07-21 17:54 形成，2025-09-23 溢流潰決。",
  "center": [
   121.29752,
   23.70061
  ],
  "windowKm": 4.0,
  "reference": {
   "lakeId": "bl071",
   "name": "花蓮馬太鞍溪",
   "lonLat": [
    121.29752,
    23.70061
   ],
   "label": "清冊壩址（事後登載，僅供對照）"
  },
  "basemap": {
   "file": "data/basemaps/matai_an_2025.jpg",
   "before": "2025-07-14",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2025-07-14 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250327.png",
    "shotDate": "2025-03-27",
    "available": "2025-03-28T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250727.png",
    "shotDate": "2025-07-27",
    "available": "2025-07-28T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250806.png",
    "shotDate": "2025-08-06",
    "available": "2025-08-07T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250816.png",
    "shotDate": "2025-08-16",
    "available": "2025-08-17T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250818.png",
    "shotDate": "2025-08-18",
    "available": "2025-08-19T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20250930.png",
    "shotDate": "2025-09-30",
    "available": "2025-10-01T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   },
   {
    "file": "data/basemaps/aerial_matai_an_2025_20251013.png",
    "shotDate": "2025-10-13",
    "available": "2025-10-14T23:59:00+08:00",
    "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）"
   }
  ],
  "trigger": {
   "label": "薇帕颱風外圍環流",
   "time": "2025-07-21T17:54:00+08:00",
   "source": "observations.csv（bl071）"
  },
  "snapshots": [
   {
    "asOf": "2025-07-22T21:52:00+00:00",
    "label": "7/23 05:52",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 36 小時",
    "nextPass": "7/29",
    "counts": {
     "high": 0,
     "medium": 2,
     "low": 0
    },
    "newCount": 2,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": true,
      "lonLat": [
       121.302106,
       23.709542
      ],
      "distanceFromReferenceM": 1092,
      "areaHectare": 2.13,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1115.0,
      "polygonLonLat": [
       [
        121.30211792898294,
        23.709953945993824
       ],
       [
        121.30211792898294,
        23.709414956823352
       ],
       [
        121.30238742356818,
        23.70986411446541
       ],
       [
        121.30301624426707,
        23.709684451408588
       ],
       [
        121.30274674968183,
        23.709145462238116
       ],
       [
        121.30166877134089,
        23.709504788351765
       ],
       [
        121.30157893981247,
        23.708516641539234
       ],
       [
        121.30068062452835,
        23.708696304596057
       ],
       [
        121.30139927675565,
        23.709145462238116
       ],
       [
        121.30121961369882,
        23.70986411446541
       ],
       [
        121.30211792898294,
        23.709953945993824
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 2.13,
        "recheck": "pending",
        "recheckTime": "7/29 05:51",
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 2.13 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 129.41 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1115 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E1 需要人工確認：單期 SAR 出現約 2.1 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/29 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 2.13 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 129.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1115 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.9 km）、2024 花蓮萬里溪（7.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 208 mm、24 小時 18 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/29）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/29）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": true,
      "lonLat": [
       121.307012,
       23.708795
      ],
      "distanceFromReferenceM": 1325,
      "areaHectare": 0.88,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1212.0,
      "polygonLonLat": [
       [
        121.30723832610242,
        23.70878613612447
       ],
       [
        121.30759765221607,
        23.708516641539234
       ],
       [
        121.30732815763083,
        23.707887820840348
       ],
       [
        121.30651967387513,
        23.708247146953997
       ],
       [
        121.30723832610242,
        23.70878613612447
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 0.88,
        "recheck": "pending",
        "recheckTime": "7/29 05:51",
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 0.88 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 117.04 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1212 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E2 需要人工確認：單期 SAR 出現約 0.9 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/29 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 0.88 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 117.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1212 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.5 km）、2024 花蓮萬里溪（7.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 208 mm、24 小時 18 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/29）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/29）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "priority.medium.pending"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-07-28T21:51:00+00:00",
    "label": "7/29 05:51",
    "what": "新一期 SAR 全幅偵測＋複核 7/23 的候選",
    "since": "距觸發約 7 天",
    "nextPass": "8/4",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 2
    },
    "newCount": 1,
    "events": [
     {
      "id": "E3",
      "firstSeen": "7/29 05:51",
      "lastSeen": "7/29 05:51",
      "lastSeenAt": "2025-07-28T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.293443,
       23.698143
      ],
      "distanceFromReferenceM": 497,
      "areaHectare": 5.66,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 888.0,
      "polygonLonLat": [
       [
        121.29169747168716,
        23.697018205902502
       ],
       [
        121.29304494461334,
        23.69782668965821
       ],
       [
        121.29286528155652,
        23.69827584730027
       ],
       [
        121.29538056435204,
        23.6992639941128
       ],
       [
        121.29645854269299,
        23.70115045620945
       ],
       [
        121.29717719492028,
        23.70070129856739
       ],
       [
        121.29681786880664,
        23.700252140925333
       ],
       [
        121.29636871116458,
        23.70052163551057
       ],
       [
        121.2965483742214,
        23.699443657169624
       ],
       [
        121.29600938505094,
        23.699443657169624
       ],
       [
        121.29591955352252,
        23.698994499527565
       ],
       [
        121.29322460767015,
        23.69827584730027
       ],
       [
        121.29313477614176,
        23.697736858129797
       ],
       [
        121.29250595544286,
        23.696569048260443
       ],
       [
        121.29106865098828,
        23.69638938520362
       ],
       [
        121.29097881945987,
        23.695850396033148
       ],
       [
        121.29026016723256,
        23.69558090144791
       ],
       [
        121.28909235736322,
        23.695850396033148
       ],
       [
        121.29079915640304,
        23.696299553675207
       ],
       [
        121.29160764015874,
        23.69737753201615
       ],
       [
        121.29169747168716,
        23.697018205902502
       ]
      ],
      "detections": [
       {
        "passTime": "7/29 05:51",
        "areaHectare": 5.66,
        "recheck": "pending",
        "recheckTime": "8/4 05:52",
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0728.png",
        "reasons": [
         "新增水體 5.66 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 111.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（888 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "高",
      "confidenceReasons": [
       "SAR 與他單位獨立觀測一致（光學、航拍、衛星判釋或現地勘查）",
       "外部來源：維基百科「花蓮馬太鞍溪堰塞湖災害」、農業部林業及自然保育署航測及遙測分署 提供"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "中",
      "summary": "E3 值得優先查證：6 項證據一致（SAR 新增水體、貼河道、附近崩塌、堵塞型態、他單位光學影像、他單位航拍），其中他單位的觀測與 SAR 互相獨立；目前缺少現地證據，建議下一步 UAV 現地查證並取得他單位既有判釋成果。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/29 05:51 SAR 新增水體 5.66 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 111.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（888 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（9.3 km）、2024 花蓮萬里溪（8.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "optical",
        "status": "support",
        "text": "7/24 農村水保署以 Planet 光學衛星影像發現堰塞湖，當日成立應變小組",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」（引農村水保署發布）",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "7/28 航遙分署 7/27 航拍：壩址上游可見湖面，航照判讀約 28 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "取得他單位既有光學判釋與航拍成果",
        "reason": "已有其他單位發布的成果，直接串接，不重做"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游已有聚落與橋梁"
       },
       {
        "label": "持續 SAR 監測（下一期 8/4）",
        "reason": "同時完成 SAR 持續性複核"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "external.optical",
       "external.aerial",
       "exposure.known",
       "priority.high.corroborated"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302106,
       23.709542
      ],
      "distanceFromReferenceM": 1092,
      "areaHectare": 2.13,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1115.0,
      "polygonLonLat": [
       [
        121.30211792898294,
        23.709953945993824
       ],
       [
        121.30211792898294,
        23.709414956823352
       ],
       [
        121.30238742356818,
        23.70986411446541
       ],
       [
        121.30301624426707,
        23.709684451408588
       ],
       [
        121.30274674968183,
        23.709145462238116
       ],
       [
        121.30166877134089,
        23.709504788351765
       ],
       [
        121.30157893981247,
        23.708516641539234
       ],
       [
        121.30068062452835,
        23.708696304596057
       ],
       [
        121.30139927675565,
        23.709145462238116
       ],
       [
        121.30121961369882,
        23.70986411446541
       ],
       [
        121.30211792898294,
        23.709953945993824
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 2.13,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.0,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 2.13 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 129.41 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1115 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 2.13 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 129.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1115 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.9 km）、2024 花蓮萬里溪（7.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.307012,
       23.708795
      ],
      "distanceFromReferenceM": 1325,
      "areaHectare": 0.88,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1212.0,
      "polygonLonLat": [
       [
        121.30723832610242,
        23.70878613612447
       ],
       [
        121.30759765221607,
        23.708516641539234
       ],
       [
        121.30732815763083,
        23.707887820840348
       ],
       [
        121.30651967387513,
        23.708247146953997
       ],
       [
        121.30723832610242,
        23.70878613612447
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 0.88,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.23,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 0.88 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 117.04 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1212 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.23）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E2 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.23），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 0.88 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.23，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 117.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1212 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.5 km）、2024 花蓮萬里溪（7.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.23，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-03T21:52:00+00:00",
    "label": "8/4 05:52",
    "what": "複核 7/29 的候選",
    "since": "距觸發約 13 天",
    "nextPass": "8/10",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 2
    },
    "newCount": 0,
    "events": [
     {
      "id": "E3",
      "firstSeen": "7/29 05:51",
      "lastSeen": "7/29 05:51",
      "lastSeenAt": "2025-07-28T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.293443,
       23.698143
      ],
      "distanceFromReferenceM": 497,
      "areaHectare": 5.66,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 888.0,
      "polygonLonLat": [
       [
        121.29169747168716,
        23.697018205902502
       ],
       [
        121.29304494461334,
        23.69782668965821
       ],
       [
        121.29286528155652,
        23.69827584730027
       ],
       [
        121.29538056435204,
        23.6992639941128
       ],
       [
        121.29645854269299,
        23.70115045620945
       ],
       [
        121.29717719492028,
        23.70070129856739
       ],
       [
        121.29681786880664,
        23.700252140925333
       ],
       [
        121.29636871116458,
        23.70052163551057
       ],
       [
        121.2965483742214,
        23.699443657169624
       ],
       [
        121.29600938505094,
        23.699443657169624
       ],
       [
        121.29591955352252,
        23.698994499527565
       ],
       [
        121.29322460767015,
        23.69827584730027
       ],
       [
        121.29313477614176,
        23.697736858129797
       ],
       [
        121.29250595544286,
        23.696569048260443
       ],
       [
        121.29106865098828,
        23.69638938520362
       ],
       [
        121.29097881945987,
        23.695850396033148
       ],
       [
        121.29026016723256,
        23.69558090144791
       ],
       [
        121.28909235736322,
        23.695850396033148
       ],
       [
        121.29079915640304,
        23.696299553675207
       ],
       [
        121.29160764015874,
        23.69737753201615
       ],
       [
        121.29169747168716,
        23.697018205902502
       ]
      ],
      "detections": [
       {
        "passTime": "7/29 05:51",
        "areaHectare": 5.66,
        "recheck": "persistent",
        "recheckTime": "8/4 05:52",
        "iou": 0.52,
        "evidenceImage": "docs/evidence/bl071_sar_0728.png",
        "reasons": [
         "新增水體 5.66 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 111.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（888 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "高",
      "confidenceReasons": [
       "SAR 與他單位獨立觀測一致（光學、航拍、衛星判釋或現地勘查）",
       "外部來源：維基百科「花蓮馬太鞍溪堰塞湖災害」、農業部林業及自然保育署航測及遙測分署 提供"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "中",
      "summary": "E3 值得優先查證：7 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、他單位光學影像、他單位航拍），其中他單位的觀測與 SAR 互相獨立；目前缺少現地證據，建議下一步 UAV 現地查證並取得他單位既有判釋成果。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/29 05:51 SAR 新增水體 5.66 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/4 複核同位置仍有水體（IoU 0.52），共 1 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 111.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（888 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（9.3 km）、2024 花蓮萬里溪（8.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "optical",
        "status": "support",
        "text": "7/24 農村水保署以 Planet 光學衛星影像發現堰塞湖，當日成立應變小組",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」（引農村水保署發布）",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "7/28 航遙分署 7/27 航拍：壩址上游可見湖面，航照判讀約 28 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "取得他單位既有光學判釋與航拍成果",
        "reason": "已有其他單位發布的成果，直接串接，不重做"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游已有聚落與橋梁"
       },
       {
        "label": "持續 SAR 監測（下一期 8/10）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "external.optical",
       "external.aerial",
       "exposure.known",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302106,
       23.709542
      ],
      "distanceFromReferenceM": 1092,
      "areaHectare": 2.13,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1115.0,
      "polygonLonLat": [
       [
        121.30211792898294,
        23.709953945993824
       ],
       [
        121.30211792898294,
        23.709414956823352
       ],
       [
        121.30238742356818,
        23.70986411446541
       ],
       [
        121.30301624426707,
        23.709684451408588
       ],
       [
        121.30274674968183,
        23.709145462238116
       ],
       [
        121.30166877134089,
        23.709504788351765
       ],
       [
        121.30157893981247,
        23.708516641539234
       ],
       [
        121.30068062452835,
        23.708696304596057
       ],
       [
        121.30139927675565,
        23.709145462238116
       ],
       [
        121.30121961369882,
        23.70986411446541
       ],
       [
        121.30211792898294,
        23.709953945993824
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 2.13,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.0,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 2.13 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 129.41 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1115 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 2.13 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 129.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1115 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.9 km）、2024 花蓮萬里溪（7.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.307012,
       23.708795
      ],
      "distanceFromReferenceM": 1325,
      "areaHectare": 0.88,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1212.0,
      "polygonLonLat": [
       [
        121.30723832610242,
        23.70878613612447
       ],
       [
        121.30759765221607,
        23.708516641539234
       ],
       [
        121.30732815763083,
        23.707887820840348
       ],
       [
        121.30651967387513,
        23.708247146953997
       ],
       [
        121.30723832610242,
        23.70878613612447
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 0.88,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.23,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 0.88 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 117.04 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1212 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.23）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E2 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.23），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 0.88 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.23，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 117.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1212 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.5 km）、2024 花蓮萬里溪（7.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 89 mm、24 小時 32 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.23，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-21T21:51:00+00:00",
    "label": "8/22 05:51",
    "what": "新一期 SAR 全幅偵測",
    "since": "距觸發約 31 天",
    "nextPass": "8/28",
    "counts": {
     "high": 1,
     "medium": 1,
     "low": 2
    },
    "newCount": 1,
    "events": [
     {
      "id": "E3",
      "firstSeen": "7/29 05:51",
      "lastSeen": "8/22 05:51",
      "lastSeenAt": "2025-08-21T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.294755,
       23.698258
      ],
      "distanceFromReferenceM": 383,
      "areaHectare": 25.62,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 849.0,
      "polygonLonLat": [
       [
        121.29169747168716,
        23.697108037430915
       ],
       [
        121.29304494461334,
        23.69782668965821
       ],
       [
        121.2927754500281,
        23.698186015771856
       ],
       [
        121.29385342836905,
        23.698904667999155
       ],
       [
        121.29511106976682,
        23.699174162584388
       ],
       [
        121.29690770033505,
        23.70186910843675
       ],
       [
        121.29780601561917,
        23.702138603021982
       ],
       [
        121.29699753186347,
        23.700341972453746
       ],
       [
        121.29636871116458,
        23.70052163551057
       ],
       [
        121.2965483742214,
        23.699443657169624
       ],
       [
        121.29717719492028,
        23.699443657169624
       ],
       [
        121.29825517326123,
        23.700611467038982
       ],
       [
        121.29816534173281,
        23.70115045620945
       ],
       [
        121.29933315160217,
        23.701779276908336
       ],
       [
        121.29996197230106,
        23.70285725524928
       ],
       [
        121.30005180382948,
        23.701779276908336
       ],
       [
        121.299512814659,
        23.701240287737864
       ],
       [
        121.29978230924424,
        23.700431803982156
       ],
       [
        121.30005180382948,
        23.70106062468104
       ],
       [
        121.30005180382948,
        23.70052163551057
       ],
       [
        121.30059079299994,
        23.70052163551057
       ],
       [
        121.30023146688629,
        23.700252140925333
       ],
       [
        121.30041112994311,
        23.699174162584388
       ],
       [
        121.299512814659,
        23.699174162584388
       ],
       [
        121.29996197230106,
        23.699533488698037
       ],
       [
        121.29996197230106,
        23.700252140925333
       ],
       [
        121.299512814659,
        23.69971315175486
       ],
       [
        121.299512814659,
        23.700431803982156
       ],
       [
        121.29897382548853,
        23.699174162584388
       ],
       [
        121.29942298313058,
        23.69863517341392
       ],
       [
        121.30023146688629,
        23.69863517341392
       ],
       [
        121.30005180382948,
        23.698365678828683
       ],
       [
        121.29690770033505,
        23.69827584730027
       ],
       [
        121.29672803727823,
        23.69872500494233
       ],
       [
        121.29645854269299,
        23.698365678828683
       ],
       [
        121.29466191212475,
        23.69863517341392
       ],
       [
        121.29322460767015,
        23.69827584730027
       ],
       [
        121.29331443919857,
        23.697557195072974
       ],
       [
        121.29475174365317,
        23.698006352715034
       ],
       [
        121.29466191212475,
        23.697108037430915
       ],
       [
        121.29403309142587,
        23.69683854284568
       ],
       [
        121.2943025860111,
        23.69647921673203
       ],
       [
        121.28909235736322,
        23.694053765464908
       ],
       [
        121.28945168347686,
        23.69540123839109
       ],
       [
        121.28891269430639,
        23.696119890618384
       ],
       [
        121.29034999876097,
        23.69603005908997
       ],
       [
        121.29097881945987,
        23.697108037430915
       ],
       [
        121.29160764015874,
        23.69746736354456
       ],
       [
        121.29169747168716,
        23.697108037430915
       ]
      ],
      "detections": [
       {
        "passTime": "7/29 05:51",
        "areaHectare": 5.66,
        "recheck": "persistent",
        "recheckTime": "8/4 05:52",
        "iou": 0.52,
        "evidenceImage": "docs/evidence/bl071_sar_0728.png",
        "reasons": [
         "新增水體 5.66 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 111.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（888 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "8/22 05:51",
        "areaHectare": 25.62,
        "recheck": "pending",
        "recheckTime": "8/28 05:52",
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0821.png",
        "reasons": [
         "新增水體 25.62 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 112.83 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（849 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "高",
      "confidenceReasons": [
       "SAR 與他單位獨立觀測一致（光學、航拍、衛星判釋或現地勘查）",
       "外部來源：維基百科「花蓮馬太鞍溪堰塞湖災害」、農業部林業及自然保育署航測及遙測分署 提供"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "大",
      "summary": "E3 值得優先查證：8 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大、他單位光學影像、他單位航拍），其中他單位的觀測與 SAR 互相獨立；目前缺少現地證據，建議下一步 UAV 現地查證並取得他單位既有判釋成果。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/22 05:51 SAR 新增水體 25.62 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/4 複核同位置仍有水體（IoU 0.52），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 112.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（849 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 5.7 → 25.6 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（9.1 km）、2024 花蓮萬里溪（8.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "optical",
        "status": "support",
        "text": "7/24 農村水保署以 Planet 光學衛星影像發現堰塞湖，當日成立應變小組",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」（引農村水保署發布）",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "7/28 航遙分署 7/27 航拍：壩址上游可見湖面，航照判讀約 28 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/7 航遙分署 8/6 航拍：壩址上游可見湖面，航照判讀至少 14 公頃（部分在照片範圍外）",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/17 航遙分署 8/16 航拍：壩址上游可見湖面，航照判讀約 69 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/19 航遙分署 8/18 航拍：壩址上游可見湖面，航照判讀約 91 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "official",
        "status": "context",
        "text": "8/20 官方估蓄水量 4,800 萬 m³，滿水位 9,100 萬 m³",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "取得他單位既有光學判釋與航拍成果",
        "reason": "已有其他單位發布的成果，直接串接，不重做"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游已有聚落與橋梁"
       },
       {
        "label": "持續 SAR 監測（下一期 8/28）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "external.optical",
       "external.aerial",
       "external.aerial",
       "external.aerial",
       "external.aerial",
       "external.official",
       "exposure.known",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "8/22 05:51",
      "lastSeen": "8/22 05:51",
      "lastSeenAt": "2025-08-21T21:51:00+00:00",
      "isNew": true,
      "lonLat": [
       121.307299,
       23.695216
      ],
      "distanceFromReferenceM": 1162,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 956.0,
      "polygonLonLat": [
       [
        121.30732815763083,
        23.694502923106967
       ],
       [
        121.30678916846037,
        23.69495208074903
       ],
       [
        121.30741798915925,
        23.695131743805852
       ],
       [
        121.30687899998878,
        23.695221575334262
       ],
       [
        121.30714849457401,
        23.695850396033148
       ],
       [
        121.3077773152729,
        23.6954910699195
       ],
       [
        121.30732815763083,
        23.694502923106967
       ]
      ],
      "detections": [
       {
        "passTime": "8/22 05:51",
        "areaHectare": 0.7,
        "recheck": "pending",
        "recheckTime": "8/28 05:52",
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0821.png",
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 97.57 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（956 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E4 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 8/28 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/22 05:51 SAR 新增水體 0.70 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 97.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（956 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（8.2 km）、2024 花蓮萬里溪（9.3 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 8/28）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（8/28）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "priority.medium.pending"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302106,
       23.709542
      ],
      "distanceFromReferenceM": 1092,
      "areaHectare": 2.13,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1115.0,
      "polygonLonLat": [
       [
        121.30211792898294,
        23.709953945993824
       ],
       [
        121.30211792898294,
        23.709414956823352
       ],
       [
        121.30238742356818,
        23.70986411446541
       ],
       [
        121.30301624426707,
        23.709684451408588
       ],
       [
        121.30274674968183,
        23.709145462238116
       ],
       [
        121.30166877134089,
        23.709504788351765
       ],
       [
        121.30157893981247,
        23.708516641539234
       ],
       [
        121.30068062452835,
        23.708696304596057
       ],
       [
        121.30139927675565,
        23.709145462238116
       ],
       [
        121.30121961369882,
        23.70986411446541
       ],
       [
        121.30211792898294,
        23.709953945993824
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 2.13,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.0,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 2.13 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 129.41 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1115 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 2.13 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 129.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1115 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.9 km）、2024 花蓮萬里溪（7.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.307012,
       23.708795
      ],
      "distanceFromReferenceM": 1325,
      "areaHectare": 0.88,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1212.0,
      "polygonLonLat": [
       [
        121.30723832610242,
        23.70878613612447
       ],
       [
        121.30759765221607,
        23.708516641539234
       ],
       [
        121.30732815763083,
        23.707887820840348
       ],
       [
        121.30651967387513,
        23.708247146953997
       ],
       [
        121.30723832610242,
        23.70878613612447
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 0.88,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.23,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 0.88 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 117.04 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1212 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.23）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E2 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.23），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 0.88 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.23，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 117.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1212 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.5 km）、2024 花蓮萬里溪（7.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 2 mm、24 小時 2 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.23，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   },
   {
    "asOf": "2025-08-27T21:52:00+00:00",
    "label": "8/28 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 8/22 的候選",
    "since": "距觸發約 37 天",
    "nextPass": "9/3",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 3
    },
    "newCount": 0,
    "events": [
     {
      "id": "E3",
      "firstSeen": "7/29 05:51",
      "lastSeen": "8/28 05:52",
      "lastSeenAt": "2025-08-27T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.294159,
       23.697871
      ],
      "distanceFromReferenceM": 457,
      "areaHectare": 22.48,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 848.0,
      "polygonLonLat": [
       [
        121.29124831404509,
        23.697197868959325
       ],
       [
        121.29304494461334,
        23.69782668965821
       ],
       [
        121.29295511308493,
        23.698365678828683
       ],
       [
        121.29385342836905,
        23.698455510357093
       ],
       [
        121.29322460767015,
        23.69827584730027
       ],
       [
        121.29331443919857,
        23.697557195072974
       ],
       [
        121.29475174365317,
        23.698006352715034
       ],
       [
        121.29466191212475,
        23.697108037430915
       ],
       [
        121.29403309142587,
        23.69683854284568
       ],
       [
        121.29421275448269,
        23.69638938520362
       ],
       [
        121.29026016723256,
        23.69423342852173
       ],
       [
        121.28918218889163,
        23.693963933936494
       ],
       [
        121.28918218889163,
        23.694682586163793
       ],
       [
        121.28873303124956,
        23.694862249220616
       ],
       [
        121.28792454749386,
        23.69423342852173
       ],
       [
        121.28720589526657,
        23.694502923106967
       ],
       [
        121.2882838736075,
        23.695760564504734
       ],
       [
        121.28918218889163,
        23.694862249220616
       ],
       [
        121.28945168347686,
        23.69540123839109
       ],
       [
        121.28891269430639,
        23.69603005908997
       ],
       [
        121.29034999876097,
        23.69603005908997
       ],
       [
        121.29124831404509,
        23.697197868959325
       ]
      ],
      "detections": [
       {
        "passTime": "7/29 05:51",
        "areaHectare": 5.66,
        "recheck": "persistent",
        "recheckTime": "8/4 05:52",
        "iou": 0.52,
        "evidenceImage": "docs/evidence/bl071_sar_0728.png",
        "reasons": [
         "新增水體 5.66 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 111.48 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（888 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.52，持續蓄水"
        ]
       },
       {
        "passTime": "8/22 05:51",
        "areaHectare": 25.62,
        "recheck": "persistent",
        "recheckTime": "8/28 05:52",
        "iou": 0.77,
        "evidenceImage": "docs/evidence/bl071_sar_0821.png",
        "reasons": [
         "新增水體 25.62 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 112.83 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（849 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.77，持續蓄水"
        ]
       },
       {
        "passTime": "8/28 05:52",
        "areaHectare": 22.48,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": "docs/evidence/bl071_sar_0827.png",
        "reasons": [
         "新增水體 22.48 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 114.07 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（848 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "高",
      "confidenceReasons": [
       "SAR 與他單位獨立觀測一致（光學、航拍、衛星判釋或現地勘查）",
       "外部來源：維基百科「花蓮馬太鞍溪堰塞湖災害」、農業部林業及自然保育署航測及遙測分署 提供"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "大",
      "summary": "E3 值得優先查證：8 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態、面積擴大、他單位光學影像、他單位航拍），其中他單位的觀測與 SAR 互相獨立；目前缺少現地證據，建議下一步 UAV 現地查證並取得他單位既有判釋成果。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/28 05:52 SAR 新增水體 22.48 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "8/28 複核同位置仍有水體（IoU 0.77），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 114.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（848 m）以下，符合堵塞型態"
       },
       {
        "kind": "trend",
        "status": "support",
        "text": "面積 5.7 → 22.5 公頃，擴大中"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（9.2 km）、2024 花蓮萬里溪（8.9 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 31 mm、24 小時 9 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "optical",
        "status": "support",
        "text": "7/24 農村水保署以 Planet 光學衛星影像發現堰塞湖，當日成立應變小組",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」（引農村水保署發布）",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "7/28 航遙分署 7/27 航拍：壩址上游可見湖面，航照判讀約 28 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/7 航遙分署 8/6 航拍：壩址上游可見湖面，航照判讀至少 14 公頃（部分在照片範圍外）",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/17 航遙分署 8/16 航拍：壩址上游可見湖面，航照判讀約 69 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "aerial",
        "status": "support",
        "text": "8/19 航遙分署 8/18 航拍：壩址上游可見湖面，航照判讀約 91 公頃",
        "source": "農業部林業及自然保育署航測及遙測分署 提供（航拍影像）",
        "url": null
       },
       {
        "kind": "official",
        "status": "context",
        "text": "8/20 官方估蓄水量 4,800 萬 m³，滿水位 9,100 萬 m³",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」",
        "url": "https://zh.wikipedia.org/zh-tw/花蓮馬太鞍溪堰塞湖災害"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "取得他單位既有光學判釋與航拍成果",
        "reason": "已有其他單位發布的成果，直接串接，不重做"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游已有聚落與橋梁"
       },
       {
        "label": "持續 SAR 監測（下一期 9/3）",
        "reason": "追蹤湖面變化；目前面積擴大中"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "trend.growing",
       "history.nearby",
       "external.optical",
       "external.aerial",
       "external.aerial",
       "external.aerial",
       "external.aerial",
       "external.official",
       "exposure.known",
       "priority.high.confirmed"
      ],
      "hindsight": []
     },
     {
      "id": "E1",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302106,
       23.709542
      ],
      "distanceFromReferenceM": 1092,
      "areaHectare": 2.13,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1115.0,
      "polygonLonLat": [
       [
        121.30211792898294,
        23.709953945993824
       ],
       [
        121.30211792898294,
        23.709414956823352
       ],
       [
        121.30238742356818,
        23.70986411446541
       ],
       [
        121.30301624426707,
        23.709684451408588
       ],
       [
        121.30274674968183,
        23.709145462238116
       ],
       [
        121.30166877134089,
        23.709504788351765
       ],
       [
        121.30157893981247,
        23.708516641539234
       ],
       [
        121.30068062452835,
        23.708696304596057
       ],
       [
        121.30139927675565,
        23.709145462238116
       ],
       [
        121.30121961369882,
        23.70986411446541
       ],
       [
        121.30211792898294,
        23.709953945993824
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 2.13,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.0,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 2.13 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 129.41 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1115 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.00，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.00）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "中",
      "summary": "E1 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.00），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 2.13 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.00，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 129.4 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1115 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.9 km）、2024 花蓮萬里溪（7.6 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 31 mm、24 小時 9 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.00，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E2",
      "firstSeen": "7/23 05:52",
      "lastSeen": "7/23 05:52",
      "lastSeenAt": "2025-07-22T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.307012,
       23.708795
      ],
      "distanceFromReferenceM": 1325,
      "areaHectare": 0.88,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1212.0,
      "polygonLonLat": [
       [
        121.30723832610242,
        23.70878613612447
       ],
       [
        121.30759765221607,
        23.708516641539234
       ],
       [
        121.30732815763083,
        23.707887820840348
       ],
       [
        121.30651967387513,
        23.708247146953997
       ],
       [
        121.30723832610242,
        23.70878613612447
       ]
      ],
      "detections": [
       {
        "passTime": "7/23 05:52",
        "areaHectare": 0.88,
        "recheck": "not_persistent",
        "recheckTime": "7/29 05:51",
        "iou": 0.23,
        "evidenceImage": "docs/evidence/bl071_sar_0722.png",
        "reasons": [
         "新增水體 0.88 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 117.04 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1212 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.23，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.23）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E2 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.23），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/23 05:52 SAR 新增水體 0.88 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "7/29 複核同位置水體 IoU 0.23，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 117.0 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1212 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（7.5 km）、2024 花蓮萬里溪（7.8 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 31 mm、24 小時 9 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.23，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     },
     {
      "id": "E4",
      "firstSeen": "8/22 05:51",
      "lastSeen": "8/22 05:51",
      "lastSeenAt": "2025-08-21T21:51:00+00:00",
      "isNew": false,
      "lonLat": [
       121.307299,
       23.695216
      ],
      "distanceFromReferenceM": 1162,
      "areaHectare": 0.7,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 956.0,
      "polygonLonLat": [
       [
        121.30732815763083,
        23.694502923106967
       ],
       [
        121.30678916846037,
        23.69495208074903
       ],
       [
        121.30741798915925,
        23.695131743805852
       ],
       [
        121.30687899998878,
        23.695221575334262
       ],
       [
        121.30714849457401,
        23.695850396033148
       ],
       [
        121.3077773152729,
        23.6954910699195
       ],
       [
        121.30732815763083,
        23.694502923106967
       ]
      ],
      "detections": [
       {
        "passTime": "8/22 05:51",
        "areaHectare": 0.7,
        "recheck": "not_persistent",
        "recheckTime": "8/28 05:52",
        "iou": 0.21,
        "evidenceImage": "docs/evidence/bl071_sar_0821.png",
        "reasons": [
         "新增水體 0.70 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 97.57 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（956 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.21，未確認持續"
        ]
       }
      ],
      "priority": "low",
      "priorityText": "低優先",
      "action": "暫時觀察",
      "confidence": "中",
      "confidenceReasons": [
       "複核結果明確（IoU 0.21）",
       "證據只有 SAR 一種來源，最高到「中」"
      ],
      "persistence": "failed",
      "persistenceText": "複核未持續",
      "grade": "B",
      "scale": "小",
      "summary": "E4 暫時觀察：空間條件符合，但下一期複核未持續（IoU 0.21），不建議派遣任務。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "8/22 05:51 SAR 新增水體 0.70 公頃（證據強度 B 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "8/28 複核同位置水體 IoU 0.21，未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 97.6 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（956 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 2 筆堰塞湖：2016 萬里溪（8.2 km）、2024 花蓮萬里溪（9.3 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "薇帕颱風外圍環流，2025-07-21 起連日豪雨"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "區域曾受 2024-04-03 花蓮地震（規模 7.2）影響"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 31 mm、24 小時 9 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       },
       {
        "kind": "exposure",
        "status": "context",
        "text": "下游為光復鄉市區與台 9 線馬太鞍溪橋；9/21 撤離範圍為光復鄉、鳳林鎮、萬榮鄉共 1,800 戶、8,000 多人（事後資料，僅供規模參考）",
        "source": "維基百科「花蓮馬太鞍溪堰塞湖災害」；NCDR 馬太鞍溪堰塞湖災害全紀錄",
        "url": "https://den.ncdr.nat.gov.tw/special/%E9%A6%AC%E5%A4%AA%E9%9E%8D/index.html"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：單期暗區常見成因是崩塌後新陡崖的雷達陰影或濕土暫時變暗。"
      ],
      "tasks": [
       {
        "label": "暫時觀察，不派遣任務",
        "reason": "下一期複核同位置水體 IoU 0.21，未持續"
       },
       {
        "label": "若同位置再次出現，重新列入待複核",
        "reason": "跨期追蹤以 250 m 內為同一事件"
       }
      ],
      "rulesFired": [
       "persistence.failed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "exposure.known",
       "gap.optical",
       "conflict.spatial_vs_persistence",
       "priority.low.failed"
      ],
      "hindsight": []
     }
    ]
   }
  ]
 },
 {
  "id": "neg2026_matai_an",
  "name": "馬太鞍溪 · 2026 汛期（負案例）",
  "kind": "negative",
  "active": null,
  "description": "2026 汛期 17 期，同一窗格、同一組參數（Sentinel-1 降軌 105）；這段期間窗格內沒有新的堰塞湖。E1 位於崩塌堆積區，自 7/13 起被列為高優先，經 Sentinel-2 事後查證確認為誤報（已知失效情境：事件前地形看不到崩塌後的新地形）。E1 只有 SAR 一種證據，研判信心從未到「高」。",
  "center": [
   121.29752,
   23.70061
  ],
  "windowKm": 4.0,
  "reference": null,
  "basemap": {
   "file": "data/basemaps/neg2026_matai_an.jpg",
   "before": "2026-05-29",
   "source": "Sentinel-2（Cloud Score+ 去雲）事件前合成，2026-05-29 以前；缺漏處以 Landsat 8/9 補"
  },
  "aerial": [],
  "trigger": null,
  "snapshots": [
   {
    "asOf": "2026-06-05T21:52:00+00:00",
    "label": "6/6 05:52",
    "what": "新一期 SAR 全幅偵測",
    "since": "",
    "nextPass": "6/12",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-06T21:52:00+00:00",
    "label": "6/7 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/6 的候選",
    "since": "",
    "nextPass": "6/13",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-11T21:52:00+00:00",
    "label": "6/12 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/7 的候選",
    "since": "",
    "nextPass": "6/18",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-18T21:52:00+00:00",
    "label": "6/19 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/12 的候選",
    "since": "",
    "nextPass": "6/25",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-23T21:52:00+00:00",
    "label": "6/24 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/19 的候選",
    "since": "",
    "nextPass": "6/30",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-24T21:52:00+00:00",
    "label": "6/25 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/24 的候選",
    "since": "",
    "nextPass": "7/1",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-06-30T21:52:00+00:00",
    "label": "7/1 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 6/25 的候選",
    "since": "",
    "nextPass": "7/7",
    "counts": {
     "high": 0,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": []
   },
   {
    "asOf": "2026-07-06T21:52:00+00:00",
    "label": "7/7 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/1 的候選",
    "since": "",
    "nextPass": "7/13",
    "counts": {
     "high": 0,
     "medium": 1,
     "low": 0
    },
    "newCount": 1,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/7 05:52",
      "lastSeenAt": "2026-07-06T21:52:00+00:00",
      "isNew": true,
      "lonLat": [
       121.302598,
       23.700002
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.74,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1001.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.69962332022645
       ],
       [
        121.30355523343754,
        23.70016230939692
       ],
       [
        121.30301624426707,
        23.700252140925333
       ],
       [
        121.30346540190912,
        23.70070129856739
       ],
       [
        121.30364506496595,
        23.69962332022645
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "pending",
        "recheckTime": "7/13 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "medium",
      "priorityText": "中優先",
      "action": "建議人工確認",
      "confidence": "低",
      "confidenceReasons": [
       "只有單期 SAR，尚未複核"
      ],
      "persistence": "pending",
      "persistenceText": "待複核",
      "grade": "B",
      "scale": "小",
      "summary": "E1 需要人工確認：單期 SAR 出現約 0.7 公頃的疑似新增水體，空間條件符合，但尚未複核；建議 7/13 下一期過境複核，暫不派遣 UAV。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/7 05:52 SAR 新增水體 0.74 公頃（證據強度 B 級）"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 6.5 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1001 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.4 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "persistence",
        "text": "尚未複核：單期影像無法排除陰影或濕土誤判（下一期 7/13）"
       },
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "值班人員判讀 SAR 證據圖",
        "reason": "確認暗區是否在河谷底、是否為崩塌坡面陰影"
       },
       {
        "label": "排下一期 SAR 複核（7/13）",
        "reason": "A 級需要兩期一致；單期出現的暗區多數會在複核時消失"
       },
       {
        "label": "調閱光學影像（雲況許可時）",
        "reason": "SAR 以外的獨立證據"
       },
       {
        "label": "暫不派遣 UAV",
        "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"
       }
      ],
      "rulesFired": [
       "persistence.pending",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.medium.pending"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-07-12T21:52:00+00:00",
    "label": "7/13 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/7 的候選",
    "since": "",
    "nextPass": "7/19",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "pending",
        "recheckTime": "7/19 05:52",
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 2 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "7/13 複核同位置仍有水體（IoU 0.32），共 2 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 170 mm、24 小時 6 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 7/19）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-07-18T21:52:00+00:00",
    "label": "7/19 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/13 的候選",
    "since": "",
    "nextPass": "7/25",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 8 mm、24 小時 3 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-07-24T21:52:00+00:00",
    "label": "7/25 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/19 的候選",
    "since": "",
    "nextPass": "7/31",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 1 mm、24 小時 1 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-07-30T21:52:00+00:00",
    "label": "7/31 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/25 的候選",
    "since": "",
    "nextPass": "8/6",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 8 mm、24 小時 4 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-08-11T21:52:00+00:00",
    "label": "8/12 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 7/31 的候選",
    "since": "",
    "nextPass": "8/18",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 64 mm、24 小時 12 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-08-23T21:52:00+00:00",
    "label": "8/24 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 8/12 的候選",
    "since": "",
    "nextPass": "8/30",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 319 mm、24 小時 164 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-09-04T21:52:00+00:00",
    "label": "9/5 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 8/24 的候選",
    "since": "",
    "nextPass": "9/11",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 248 mm、24 小時 24 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-09-16T21:52:00+00:00",
    "label": "9/17 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 9/5 的候選",
    "since": "",
    "nextPass": "9/23",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "7/13 05:52",
      "lastSeenAt": "2026-07-12T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.302646,
       23.70028
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.59,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 999.0,
      "polygonLonLat": [
       [
        121.30364506496595,
        23.700970793152628
       ],
       [
        121.30310607579547,
        23.700341972453746
       ],
       [
        121.30274674968183,
        23.700611467038982
       ],
       [
        121.30364506496595,
        23.700970793152628
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "低",
      "confidenceReasons": [
       "前後期結果不一致，需人工判斷"
      ],
      "persistence": "lost",
      "persistenceText": "持續性中斷",
      "grade": "A",
      "scale": "小",
      "summary": "E1 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "7/13 05:52 SAR 新增水體 0.59 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "against",
        "text": "前期已確認蓄水，最新一期同位置未再偵測到或複核未持續"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 5.1 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（999 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.3 km）、2024 花蓮萬里溪（8.7 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 52 mm、24 小時 5 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [
       "前期多期一致，最新一期卻未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。"
      ],
      "tasks": [
       {
        "label": "立即查證是否潰決或排空",
        "reason": "前期已確認蓄水，最新一期未見；潰決會直接影響下游"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"
       },
       {
        "label": "通報主管機關（農村水保署）",
        "reason": "下游保全對象尚未串接，需由主管機關評估"
       }
      ],
      "rulesFired": [
       "persistence.lost",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.lost"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   },
   {
    "asOf": "2026-09-28T21:52:00+00:00",
    "label": "9/29 05:52",
    "what": "新一期 SAR 全幅偵測＋複核 9/17 的候選",
    "since": "",
    "nextPass": "10/5",
    "counts": {
     "high": 1,
     "medium": 0,
     "low": 0
    },
    "newCount": 0,
    "events": [
     {
      "id": "E1",
      "firstSeen": "7/7 05:52",
      "lastSeen": "9/29 05:52",
      "lastSeenAt": "2026-09-28T21:52:00+00:00",
      "isNew": false,
      "lonLat": [
       121.301995,
       23.700547
      ],
      "distanceFromReferenceM": null,
      "areaHectare": 0.69,
      "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
      "lakeFloorM": 1008.0,
      "polygonLonLat": [
       [
        121.30229759203976,
        23.70115045620945
       ],
       [
        121.30139927675565,
        23.700611467038982
       ],
       [
        121.30130944522723,
        23.70115045620945
       ],
       [
        121.30229759203976,
        23.70115045620945
       ]
      ],
      "detections": [
       {
        "passTime": "7/7 05:52",
        "areaHectare": 0.74,
        "recheck": "persistent",
        "recheckTime": "7/13 05:52",
        "iou": 0.32,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.74 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 6.52 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1001 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.32，持續蓄水"
        ]
       },
       {
        "passTime": "7/13 05:52",
        "areaHectare": 0.59,
        "recheck": "persistent",
        "recheckTime": "7/19 05:52",
        "iou": 0.45,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.59 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 5.09 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（999 m）附近或以下，研判土石堵塞下游河道",
         "後續 1 期影像同位置水體 IoU 最高 0.45，持續蓄水"
        ]
       },
       {
        "passTime": "9/29 05:52",
        "areaHectare": 0.69,
        "recheck": "pending",
        "recheckTime": null,
        "iou": null,
        "evidenceImage": null,
        "reasons": [
         "新增水體 0.69 公頃，緊貼事件前河道",
         "500 m 內偵測到崩塌 9.83 公頃（SAR 回波變化 ≥ 門檻）",
         "崩塌延伸至湖底高程（1008 m）附近或以下，研判土石堵塞下游河道",
         "僅單期影像，尚未確認多時相持續性"
        ]
       }
      ],
      "priority": "high",
      "priorityText": "高優先",
      "action": "建議立即查證",
      "confidence": "中",
      "confidenceReasons": [
       "SAR 3 期一致",
       "證據只有 SAR 一種來源，最高到「中」；需光學或現地證據才能到「高」"
      ],
      "persistence": "confirmed",
      "persistenceText": "已確認持續",
      "grade": "A",
      "scale": "小",
      "summary": "E1 值得優先查證：5 項證據一致（SAR 新增水體、跨期持續、貼河道、附近崩塌、堵塞型態）；目前缺少光學影像與現地證據，建議下一步 UAV 現地查證並調閱光學影像。",
      "evidence": [
       {
        "kind": "sar",
        "status": "support",
        "text": "9/29 05:52 SAR 新增水體 0.69 公頃（證據強度 A 級）"
       },
       {
        "kind": "persistence",
        "status": "support",
        "text": "7/19 複核同位置仍有水體（IoU 0.45），共 3 期偵測到"
       },
       {
        "kind": "river",
        "status": "support",
        "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"
       },
       {
        "kind": "landslide",
        "status": "support",
        "text": "500 m 內有 SAR 崩塌訊號 9.8 公頃"
       },
       {
        "kind": "terrain",
        "status": "support",
        "text": "崩塌延伸到水體下游、湖底高程（1008 m）以下，符合堵塞型態"
       },
       {
        "kind": "history",
        "status": "context",
        "text": "10 km 內清冊另有 3 筆堰塞湖：2016 萬里溪（8.4 km）、2024 花蓮萬里溪（8.6 km）、2025 花蓮馬太鞍溪（0.5 km）"
       },
       {
        "kind": "context",
        "status": "context",
        "text": "過境前雨量 72 小時 0 mm、24 小時 0 mm（GSMaP v8 雨量計校正（衛星估計，非測站））"
       }
      ],
      "gaps": [
       {
        "kind": "optical",
        "text": "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"
       },
       {
        "kind": "exposure",
        "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"
       },
       {
        "kind": "field",
        "text": "人工查證：尚未進行"
       }
      ],
      "conflicts": [],
      "tasks": [
       {
        "label": "UAV／現地查證壩體與湖面",
        "reason": "SAR 只能看到水面，壩體高度、材料與溢流風險要現地確認"
       },
       {
        "label": "調閱最新光學影像",
        "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"
       },
       {
        "label": "通報主管機關（農村水保署）並評估下游保全對象",
        "reason": "下游聚落、道路圖層尚未串接"
       },
       {
        "label": "持續 SAR 監測（下一期 10/5）",
        "reason": "追蹤湖面變化"
       }
      ],
      "rulesFired": [
       "persistence.confirmed",
       "spatial.on_river",
       "spatial.landslide",
       "spatial.blockage",
       "history.nearby",
       "gap.optical",
       "gap.exposure",
       "priority.high.confirmed"
      ],
      "hindsight": [
       {
        "lonLat": [
         121.3024,
         23.7002
        ],
        "radiusM": 300,
        "verdict": "false_positive",
        "title": "事後查證：誤報（不是水體）",
        "text": "以 Sentinel-2 查證 2026-06～09（Cloud Score+ 去雲後晴天 7 期）：E1 範圍內近紅外線反射 1,070～1,820，與周圍土石相近（水應低於 500）；MNDWI −0.08～0.04，不高於周圍（水應明顯大於 0）。研判為崩塌堆積區的 SAR 暗區（新陡坎的雷達陰影或平滑泥砂面），屬已知失效情境。",
        "images": [
         {
          "label": "光學查證圖",
          "path": "docs/evidence/neg2026_e1_optical.png"
         },
         {
          "label": "SAR 與地形圖",
          "path": "docs/evidence/neg2026_e1_sar.png"
         }
        ],
        "method": "scripts/gee_check_s2_e1.js、scripts/check_neg_e1.py"
       }
      ]
     }
    ]
   }
  ]
 }
];
