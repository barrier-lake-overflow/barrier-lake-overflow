#!/usr/bin/env python3
"""
新聞與官方消息 → 外部證據「候選」。只產生候選，人工確認後才進研判。

來源：Google 新聞 RSS（彙整中央社、公視、林業保育署公告等）。依關鍵字規則分類（不用 LLM，
每筆都能對回是哪個關鍵字）：

    空拍、航拍、無人機、航遙測          → aerial
    衛星影像、衛星監測、衛星判釋         → satellite
    勘查、會勘、現地、民眾通報、發現      → field
    其他                              → official（只算背景）

地點比對：標題或摘要中出現清冊湖名、監看窗格名稱裡的溪名，就掛到那個情境。對不到的也保留，
可以人工指定。候選存在 data/live/news.json（進版控）。

確認一筆候選（寫進情境檔 externalEvidence，之後的研判就會用到）：

    python -m pipeline.daily.news list
    python -m pipeline.daily.news accept <候選 id> [--scenario <情境 id>] [--kind aerial|satellite|field|official]
    python -m pipeline.daily.news reject <候選 id>
"""

from __future__ import annotations

import argparse
import email.utils
import hashlib
import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
NEWS = REPO / "data" / "live" / "news.json"
SCENARIOS = REPO / "data" / "raw" / "scenarios"
TW = timezone(timedelta(hours=8))

QUERIES = ["堰塞湖", "崩塌 阻塞 河道", "土石 堵塞 溪 湖"]
KEEP_DAYS = 60

KIND_RULES = [
    ("aerial", ("空拍", "航拍", "無人機", "空勘", "航遙測", "航測")),
    ("satellite", ("衛星影像", "衛星監測", "衛星判釋", "衛星圖")),
    ("field", ("勘查", "會勘", "現地", "民眾通報", "通報", "發現")),
]
# 溪名比對時去掉的縣市前綴與括號
PREFIX = re.compile(r"^(臺|台)?(北|新北|桃園|新竹|苗栗|臺中|台中|南投|彰化|雲林|嘉義|臺南|台南|高雄|屏東|宜蘭|花蓮|臺東|台東)(市|縣)?")


def classify(text: str) -> tuple:
    """回傳 (kind, 命中的關鍵字)。

    >>> classify("林保署無人機空拍確認萬里溪堰塞湖")
    ('aerial', '空拍')
    >>> classify("透過衛星監測發現新堰塞湖")
    ('satellite', '衛星監測')
    >>> classify("堰塞湖現況資訊")
    ('official', '')
    """
    for kind, words in KIND_RULES:
        for w in words:
            if w in text:
                return kind, w
    return "official", ""


def place_keys(name: str) -> list:
    """湖名或窗格名稱 → 比對用的關鍵字（去縣市前綴、括號內另列）。

    >>> place_keys("花蓮立霧溪(燕子口)")
    ['立霧溪', '燕子口']
    >>> place_keys("雲林清水溪(草嶺)")
    ['清水溪', '草嶺']
    """
    keys = []
    for part in re.split(r"[()（）]", name):
        part = PREFIX.sub("", part.strip())
        if len(part) >= 2:
            keys.append(part)
    return keys


def fetch_rss(query: str, timeout: int = 60) -> list:
    url = ("https://news.google.com/rss/search?" +
           urllib.parse.urlencode({"q": f"{query} when:7d", "hl": "zh-TW", "gl": "TW", "ceid": "TW:zh-Hant"}))
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        root = ET.fromstring(r.read())
    out = []
    for it in root.iter("item"):
        src = it.find("source")
        desc = re.sub(r"<[^>]+>", " ", html.unescape(it.findtext("description") or ""))
        out.append({
            "title": (it.findtext("title") or "").strip(),
            "url": (it.findtext("link") or "").strip(),
            "source": src.text.strip() if src is not None and src.text else "",
            "time": email.utils.parsedate_to_datetime(it.findtext("pubDate")).astimezone(TW).isoformat(timespec="minutes"),
            "summary": re.sub(r"\s+", " ", desc).strip()[:300],
        })
    return out


def targets(lakes: list, scenarios: list) -> list:
    """
    可比對的地點：[(keys, scenario_id 或 None, lakeId 或 None, 顯示名稱)]，依優先順序排：
    監看中的窗格 → 清冊湖（新的在前）。同名溪流（例如兩次萬里溪）確認時預設掛到最前面那個。
    清冊湖只取 2015 年後與監看中的。
    """
    out = []
    live = [s for s in scenarios if s.get("kind") == "live" and s.get("active")]
    lake_names = {l["id"]: l["name"] for l in lakes}
    for s in live:
        if s.get("referenceLakeId") in lake_names:
            keys = place_keys(lake_names[s["referenceLakeId"]])
        else:
            names = re.findall(r"（([^）]+)）", " ".join(s.get("context", [])))
            keys = [k for n in names for k in place_keys(n.split("-")[-1])]
        if keys:
            out.append((keys, s["id"], s.get("referenceLakeId"), s["name"]))
    by_lake = {s.get("referenceLakeId"): s["id"] for s in scenarios
               if s.get("referenceLakeId") and s.get("kind") != "live"}
    for l in sorted(lakes, key=lambda l: l.get("seq", 0), reverse=True):
        if (l.get("year") or 0) >= 2015 or l.get("statusKey") == "watch":
            out.append((place_keys(l["name"]), by_lake.get(l["id"]), l["id"], f"{l['name']}（{l.get('year')}）"))
    return out


def match(item: dict, places: list) -> list:
    """依 targets 的優先順序回傳對到的地點；同一個情境或清冊湖只列一次。"""
    text = item["title"] + " " + item["summary"]
    out, seen = [], set()
    for keys, sid, lid, name in places:
        if any(k in text for k in keys) and (sid or lid) not in seen and (lid is None or lid not in seen):
            out.append({"scenarioId": sid, "lakeId": lid, "name": name})
            seen.update(x for x in (sid, lid) if x)
    return out


def load(path: Path = NEWS) -> dict:
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {"items": {}}


def save(data: dict, path: Path = NEWS) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def main(lakes: list, now=None) -> dict:
    now = now or datetime.now(TW)
    scenarios = [json.loads(p.read_text(encoding="utf-8")) for p in SCENARIOS.glob("*.json")]
    places = targets(lakes, scenarios)
    data = load()
    items = data["items"]
    new = 0
    for q in QUERIES:
        for it in fetch_rss(q):
            iid = hashlib.sha1(it["url"].encode()).hexdigest()[:10]
            if iid in items:
                continue
            kind, word = classify(it["title"] + " " + it["summary"])
            items[iid] = {**it, "id": iid, "kind": kind, "keyword": word,
                          "matches": match(it, places), "status": "candidate", "fetchedAt": now.isoformat(timespec="minutes")}
            new += 1
    # 監看窗格每天會變，待確認的候選每次都重新比對地點
    for v in items.values():
        if v["status"] == "candidate":
            v["matches"] = match(v, places)
    # 過期的未處理候選清掉；已確認／排除的留著當紀錄
    cutoff = now - timedelta(days=KEEP_DAYS)
    data["items"] = {k: v for k, v in items.items()
                     if v["status"] != "candidate" or datetime.fromisoformat(v["time"]) >= cutoff}
    data["updatedAt"] = now.isoformat(timespec="minutes")
    save(data)
    cand = [v for v in data["items"].values() if v["status"] == "candidate"]
    print(f"新聞：新增 {new} 筆，待確認候選 {len(cand)} 筆（其中對到地點 {sum(1 for v in cand if v['matches'])} 筆）")
    return {"new": new, "candidates": len(cand)}


def accept(iid: str, scenario_id=None, kind=None, radius_m: int = 1000) -> Path:
    """把候選寫進情境檔 externalEvidence。位置用情境中心（新聞通常只有溪名，半徑放寬到 1 km）。"""
    data = load()
    it = data["items"][iid]
    sid = scenario_id or next((m["scenarioId"] for m in it["matches"] if m["scenarioId"]), None)
    if not sid:
        raise SystemExit("這筆候選沒有對到情境，請用 --scenario 指定")
    path = SCENARIOS / f"{sid}.json"
    sc = json.loads(path.read_text(encoding="utf-8"))
    ev = {"time": it["time"], "kind": kind or it["kind"], "lonLat": sc["center"], "radiusM": radius_m,
          "text": it["title"], "source": it["source"], "url": it["url"],
          "note": f"每日新聞候選 {iid} 人工確認（關鍵字：{it['keyword'] or '無'}）"}
    sc.setdefault("externalEvidence", []).append(ev)
    path.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    it.update(status="accepted", scenarioId=sid)
    save(data)
    return path


def cli() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("list")
    a = sub.add_parser("accept")
    a.add_argument("id")
    a.add_argument("--scenario")
    a.add_argument("--kind", choices=["optical", "aerial", "satellite", "field", "official"],
                   help="關鍵字分類有誤時人工改正")
    r = sub.add_parser("reject")
    r.add_argument("id")
    args = ap.parse_args()
    data = load()
    if args.cmd == "list":
        for v in sorted(data["items"].values(), key=lambda v: v["time"], reverse=True):
            if v["status"] == "candidate":
                where = "、".join(m["name"] for m in v["matches"]) or "（未對到地點）"
                print(f"{v['id']}  {v['time'][:16]}  [{v['kind']}] {v['title']}  → {where}")
    elif args.cmd == "accept":
        print(f"已寫入 {accept(args.id, args.scenario, args.kind)}，接著跑 python -m pipeline.events.build")
    else:
        data["items"][args.id]["status"] = "rejected"
        save(data)
        print("已排除")


if __name__ == "__main__":
    cli()
