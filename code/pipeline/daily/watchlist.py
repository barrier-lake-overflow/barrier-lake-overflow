#!/usr/bin/env python3
"""
每日監看名單：哪些 4 km 窗格要追 Sentinel-1 新影像。三種來源：

1. 清冊中「存在（監測中）」的堰塞湖，以壩址為中心。
2. 農村水保署土石流／大規模崩塌警戒：依潛勢溪流、崩塌區編號對應位置（data/raw/hotspots.json）。
3. 雨量熱區：大規模崩塌潛勢區中，GSMaP 72 小時累積雨量 ≥ RAIN_TRIGGER_72H_MM 的地點。

觸發來源在 MERGE_RADIUS_M 內的併成同一窗格。警戒與雨量窗格在最後一次觸發後保留
KEEP_DAYS 天（堰塞湖常在豪雨後幾天才被發現）；清冊湖只要仍是監測中就一直保留。
窗格狀態存在 data/live/state.json（進版控，排程與 CI 共用）。

門檻都是自訂、尚未校準的，見 docs/daily.md。
"""

from __future__ import annotations

import json
import math
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

REPO = Path(__file__).resolve().parents[3]
HOTSPOTS = REPO / "data" / "raw" / "hotspots.json"
STATE = REPO / "data" / "live" / "state.json"
ALERT_URL = "https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=ofvJwoWC5wum&IsTransData=1"

TW = timezone(timedelta(hours=8))
MERGE_RADIUS_M = 2000.0
KEEP_DAYS = 30
RAIN_TRIGGER_72H_MM = 200.0   # 未校準；GSMaP 校正版，見 docs/daily.md


def distance_m(a: tuple, b: tuple) -> float:
    lat = math.radians((a[1] + b[1]) / 2)
    return math.hypot((a[0] - b[0]) * 111_320 * math.cos(lat), (a[1] - b[1]) * 110_540)


def window_id(lon: float, lat: float) -> str:
    """ASCII 窗格代號（檔名用），約 100 m 解析度。

    >>> window_id(121.29752, 23.70061)
    'live_E121298_N23701'
    """
    return f"live_E{round(lon * 1000):d}_N{round(lat * 1000):d}"


def fetch_alerts(timeout: int = 60) -> list:
    """目前發布中的警戒：[{"type": "D"/"L", "no", "level", "place", "updated"}]。沒有警戒回傳 []。"""
    req = urllib.request.Request(ALERT_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        rows = json.loads(r.read().decode("utf-8-sig"))
    return parse_alerts(rows)


def parse_alerts(rows: list) -> list:
    """
    >>> parse_alerts([{"AlertType": "-", "LandslideName": "目前無警戒", "DebrisNo": "-", "LandslideNo": "-"}])
    []
    >>> parse_alerts([{"AlertType": "D", "DebrisNo": "花縣DF001", "LandslideNo": None, "AlertLevel": "r",
    ...   "County": "花蓮縣", "Town": "秀林鄉", "Vill": "富世村", "LastUpdateDate": "2025-07-19 06:03"}])[0]["no"]
    '花縣DF001'
    """
    out = []
    for r in rows:
        t = r.get("AlertType")
        no = r.get("DebrisNo") if t == "D" else r.get("LandslideNo") if t == "L" else None
        if not no or no == "-":
            continue
        out.append({"type": t, "no": no.strip(), "level": r.get("AlertLevel"),
                    "place": f"{r.get('County') or ''}{r.get('Town') or ''}{r.get('Vill') or ''}",
                    "updated": r.get("LastUpdateDate")})
    return out


def load_hotspots(path: Path = HOTSPOTS) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def triggers_from_alerts(alerts: list, hotspots: dict) -> tuple:
    """回傳 (triggers, unmatched)。對不到座標的編號列在 unmatched，不靜默丟掉。"""
    trig, unmatched = [], []
    for a in alerts:
        table = hotspots["debris"] if a["type"] == "D" else hotspots["landslide"]
        h = table.get(a["no"])
        if not h:
            unmatched.append(a["no"])
            continue
        level = "紅色" if a["level"] == "r" else "黃色"
        kind = "土石流" if a["type"] == "D" else "大規模崩塌"
        trig.append({"source": "alert", "key": a["no"], "lonLat": h["lonLat"],
                     "label": f"{kind}{level}警戒 {a['no']}（{h['name'] or h['place']}）"})
    return trig, unmatched


def triggers_from_rain(rain: dict, hotspots: dict, threshold: float = RAIN_TRIGGER_72H_MM) -> list:
    """rain：{崩塌區編號: {"h72": mm}}。

    >>> hs = {"landslide": {"投縣LL004": {"lonLat": [120.77, 23.70], "name": "南投縣-鹿谷鄉-D006", "place": ""}}}
    >>> [t["key"] for t in triggers_from_rain({"投縣LL004": {"h72": 250.0}}, hs)]
    ['投縣LL004']
    >>> triggers_from_rain({"投縣LL004": {"h72": 120.0}}, hs)
    []
    """
    out = []
    for no, v in rain.items():
        if (v.get("h72") or 0) >= threshold and no in hotspots["landslide"]:
            h = hotspots["landslide"][no]
            out.append({"source": "rain", "key": no, "lonLat": h["lonLat"],
                        "label": f"大規模崩塌潛勢區 {no}（{h['name']}）72 小時雨量 {v['h72']:.0f} mm"})
    return out


def triggers_from_lakes(lakes: list) -> list:
    return [{"source": "inventory", "key": l["id"], "lonLat": [l["lon"], l["lat"]],
             "label": f"清冊監測中：{l['name']}（{l.get('formed', '')}）", "lakeId": l["id"], "name": l["name"]}
            for l in lakes if l.get("statusKey") == "watch" and l.get("lon") is not None]


def update_windows(state: dict, triggers: list, now: datetime, keep_days: int = KEEP_DAYS,
                   frozen: frozenset = frozenset()) -> dict:
    """
    把今天的觸發併進窗格狀態；回傳更新後的 state["windows"]。
    新窗格記下 activatedAt（事件前基準以此往前取）；舊窗格更新 lastTriggeredAt 與來源。
    清冊湖不再是監測中、或警戒／雨量超過 keep_days 沒有再觸發的窗格，active 改為 False。
    frozen：今天抓取失敗的來源種類（"alert"、"rain"），含這些來源的窗格今天不判定過期。

    >>> now = datetime(2026, 7, 1, 8, tzinfo=TW)
    >>> t = [{"source": "alert", "key": "A", "lonLat": [121.0, 23.0], "label": "a"},
    ...      {"source": "rain", "key": "B", "lonLat": [121.01, 23.0], "label": "b"}]
    >>> w = update_windows({}, t, now)
    >>> len(w), sorted(next(iter(w.values()))["sources"])
    (1, ['A', 'B'])
    >>> w = update_windows({"windows": w}, [], now + timedelta(days=31))
    >>> next(iter(w.values()))["active"]
    False
    """
    windows = dict(state.get("windows", {}))
    now_s = now.isoformat(timespec="minutes")
    seen = set()
    for t in triggers:
        ll = tuple(t["lonLat"])
        wid = next((k for k, w in windows.items()
                    if w["active"] and distance_m(tuple(w["center"]), ll) <= MERGE_RADIUS_M), None)
        if wid is None:
            wid = window_id(*ll)
            # 新窗格（或過期後重新啟用）：事件前基準以今天重新取，軌道與影像紀錄重來
            windows[wid] = {
                "id": wid, "center": list(ll), "activatedAt": now_s,
                "name": t.get("name") or t["label"], "lakeId": t.get("lakeId"),
                "sources": {}, "active": True, "orbits": {},
            }
        w = windows[wid]
        w["sources"][t["key"]] = {"source": t["source"], "label": t["label"], "lastTriggeredAt": now_s}
        if t.get("lakeId") and not w.get("lakeId"):
            w.update(lakeId=t["lakeId"], name=t.get("name") or w["name"])
        w["lastTriggeredAt"] = now_s
        seen.add(wid)
    for wid, w in windows.items():
        if wid in seen or not w["active"]:
            continue
        kinds = {s["source"] for s in w["sources"].values()}
        if kinds & frozen:
            continue
        last = datetime.fromisoformat(w["lastTriggeredAt"])
        inventory = "inventory" in kinds
        if inventory or now - last > timedelta(days=keep_days):
            w["active"] = False
            w["deactivatedAt"] = now_s
    return windows


def load_state(path: Path = STATE) -> dict:
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def save_state(state: dict, path: Path = STATE) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def landslide_points(hotspots: dict) -> dict:
    return {k: tuple(v["lonLat"]) for k, v in hotspots["landslide"].items()}


def main(lakes: list, rain: Optional[dict] = None, alerts: Optional[list] = None,
         now: Optional[datetime] = None) -> dict:
    """組今天的觸發、更新窗格。rain / alerts 傳 None 代表該步驟失敗（不當成「沒有」）。"""
    now = now or datetime.now(TW)
    hotspots = load_hotspots()
    state = load_state()
    triggers = triggers_from_lakes(lakes)
    unmatched: list = []
    if alerts is not None:
        t, unmatched = triggers_from_alerts(alerts, hotspots)
        triggers += t
    if rain is not None:
        triggers += triggers_from_rain(rain, hotspots)
    # 來源失敗時，不讓該來源的窗格因為「今天沒觸發」而過期（也不刷新觸發時間）
    frozen = frozenset(k for k, v in (("alert", alerts), ("rain", rain)) if v is None)
    state["windows"] = update_windows(state, triggers, now, frozen=frozen)
    state["updatedAt"] = now.isoformat(timespec="minutes")
    save_state(state)
    active = [w for w in state["windows"].values() if w["active"]]
    print(f"監看窗格：啟用 {len(active)} 個（清冊 {sum(1 for t in triggers if t['source'] == 'inventory')}、"
          f"警戒 {sum(1 for t in triggers if t['source'] == 'alert')}、雨量 {sum(1 for t in triggers if t['source'] == 'rain')} 個觸發）"
          + (f"；對不到座標的警戒編號：{'、'.join(unmatched)}" if unmatched else ""))
    return {"active": len(active), "unmatched": unmatched}
