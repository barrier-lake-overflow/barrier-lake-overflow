#!/usr/bin/env python3
"""
全清冊回放：清冊中 Sentinel-1 時代、形成日期完整的堰塞湖，每一筆都用同一套流程、
同一組參數跑一次逐期回放，再統計偵測到幾筆、多快、漏掉的原因。

流程（都在 code/ 底下）：

    python scripts/gee_fetch_inventory.py --project <GCP 專案>   # 選湖、挑軌道、下載影像
    python scripts/run_inventory_replay.py                         # 逐湖逐期偵測、寫情境檔
    python -m pipeline.events.build                                # 回放＋統計 → dashboard/data/

規則全部寫死在這支模組，選湖與時間窗不看偵測結果、不逐湖調整：

- 選湖：形成日期完整到日、在 REPLAY_START 以後。馬太鞍溪（bl071）已有完整正案例，
  直接沿用該情境，不另外下載。
- 事件前基準：形成前 PRE_GAP_DAYS～PRE_GAP_DAYS+PRE_DAYS 天的中位數。清冊形成日
  多半是發現或登載日，往前留 7 天，避免基準裡已經有湖。
- 逐期影像：形成前 POST_BEFORE_DAYS 天到形成後 POST_AFTER_DAYS 天。形成前的幾期用來
  看同窗格平常會不會亂報，也容許清冊日期有誤差。
- 軌道：形成日以後最早有影像的軌道（值班最在乎第一時間看得到）；同時間取期數多的。
  事件前基準少於 MIN_PRE 張的軌道，只在沒有其他軌道可選時才用。
- 判定偵測到：形成前 1 天起、到潰決（或形成後 POST_AFTER_DAYS 天）為止，
  有事件在清冊壩址 MATCH_RADIUS_M 內被偵測到。清冊座標是壩體位置，湖面在其上游，
  所以半徑取 1 km；距離照實列出。
"""

from __future__ import annotations

import json
import math
import re
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from typing import Optional

from . import triage as T

CODE_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = CODE_ROOT.parent
MANIFEST = REPO_ROOT / "data" / "raw" / "replay_manifest.json"
OUT = CODE_ROOT / "dashboard" / "data" / "replay.js"

REPLAY_START = date(2015, 1, 1)
PRE_GAP_DAYS = 7
PRE_DAYS = 60
POST_BEFORE_DAYS = 7
POST_AFTER_DAYS = 60
MATCH_RADIUS_M = 1000.0
MIN_PRE = 3   # 事件前基準至少幾張才算「足夠」；不足的軌道只在別無選擇時才用

# 已有人工整理完整情境的湖：lakeId → 情境 id
EXISTING = {"bl071": "matai_an_2025"}

TW = timezone(timedelta(hours=8))


def parse_date(s: str) -> Optional[date]:
    """清冊的形成／潰決時間，只接受完整到日的寫法。

    >>> parse_date("2025/7/21"), parse_date("2026/04/07")
    (datetime.date(2025, 7, 21), datetime.date(2026, 4, 7))
    >>> parse_date("2014/10/21至26間") is None, parse_date("1993") is None, parse_date("") is None
    (True, True, True)
    """
    m = re.fullmatch(r"\s*(\d{4})/(\d{1,2})/(\d{1,2})\s*", s or "")
    return date(*map(int, m.groups())) if m else None


def scenario_id(lake_id: str) -> str:
    return EXISTING.get(lake_id, f"inv_{lake_id}")


def select_targets(lakes: list) -> tuple:
    """
    回傳 (targets, skipped, before_count)。targets 依清冊項次排序；skipped 是 2015 年以後
    但沒選進來的湖與原因；before_count 是 2015 年以前、Sentinel-1 還沒有的湖數。

    >>> lakes = [{"id": "a", "seq": 1, "name": "甲", "formed": "2016/3/7", "lon": 121.0, "lat": 23.0},
    ...          {"id": "b", "seq": 2, "name": "乙", "formed": "2009/8/9", "lon": 121.0, "lat": 23.0},
    ...          {"id": "c", "seq": 3, "name": "丙", "year": 2018, "formed": "", "lon": 121.0, "lat": 23.0}]
    >>> t, s, n = select_targets(lakes)
    >>> [x["lakeId"] for x in t], t[0]["preStart"], t[0]["postEnd"], [x["reason"] for x in s], n
    (['a'], '2015-12-31', '2016-05-06', ['形成日期不完整'], 1)
    """
    targets, skipped, before = [], [], 0
    for lake in sorted(lakes, key=lambda l: l.get("seq", 0)):
        formed = parse_date(lake.get("formed", ""))
        year = formed.year if formed else (lake.get("year") or 0)
        if year < REPLAY_START.year:
            before += 1
            continue
        reason = "沒有座標" if lake.get("lon") is None else "形成日期不完整" if formed is None else None
        if reason:
            skipped.append({"lakeId": lake["id"], "name": lake["name"],
                            "formed": lake.get("formed", ""), "reason": reason})
            continue
        breach = parse_date(lake.get("breachDate", ""))
        targets.append({
            "lakeId": lake["id"],
            "scenarioId": scenario_id(lake["id"]),
            "name": lake["name"],
            "county": lake.get("county", ""),
            "lon": lake["lon"],
            "lat": lake["lat"],
            "formed": formed.isoformat(),
            "breach": breach.isoformat() if breach else None,
            "volume": lake.get("volume"),
            "cause": lake.get("cause", ""),
            "preStart": (formed - timedelta(days=PRE_GAP_DAYS + PRE_DAYS)).isoformat(),
            "preEnd": (formed - timedelta(days=PRE_GAP_DAYS)).isoformat(),
            "postStart": (formed - timedelta(days=POST_BEFORE_DAYS)).isoformat(),
            "postEnd": (formed + timedelta(days=POST_AFTER_DAYS)).isoformat(),
        })
    return targets, skipped, before


def choose_orbit(images: list, target: dict) -> Optional[dict]:
    """
    images：[(pass, relativeOrbit, epoch_ms)]，GEE 查到的窗格內影像。
    回傳選定軌道 {"pass", "orbit", "preCount", "scenes": [{"day", "timeUTC"}], "firstAfterFormed"}；
    事件前沒有影像、或形成後沒有影像的軌道不選。都不符合回傳 None。

    >>> ms = lambda s: datetime.fromisoformat(s).replace(tzinfo=timezone.utc).timestamp() * 1000
    >>> tg = {"preStart": "2025-05-01", "preEnd": "2025-07-14", "postStart": "2025-07-14",
    ...       "postEnd": "2025-09-19", "formed": "2025-07-21"}
    >>> imgs = [("DESCENDING", 105, ms("2025-06-04T21:52")), ("DESCENDING", 105, ms("2025-07-22T21:52")),
    ...         ("DESCENDING", 105, ms("2025-07-28T21:52")), ("ASCENDING", 69, ms("2025-06-10T10:00")),
    ...         ("ASCENDING", 69, ms("2025-08-01T10:00"))]
    >>> o = choose_orbit(imgs, tg)
    >>> o["pass"], o["orbit"], o["preCount"], [s["day"] for s in o["scenes"]], o["firstAfterFormed"]
    ('DESCENDING', 105, 1, ['20250722', '20250728'], '2025-07-22T21:52:00+00:00')
    """
    def utc(ms):
        return datetime.fromtimestamp(ms / 1000, tz=timezone.utc)

    def bound(d):   # 日期當作台灣時間 00:00
        return datetime.combine(date.fromisoformat(d), time(), tzinfo=TW)

    pre0, pre1 = bound(target["preStart"]), bound(target["preEnd"])
    post0, post1 = bound(target["postStart"]), bound(target["postEnd"])
    formed = bound(target["formed"])
    groups: dict = {}
    for p, orbit, ms in images:
        groups.setdefault((p, int(orbit)), []).append(utc(ms))
    best = None
    for (p, orbit), times in groups.items():
        times.sort()
        pre = [t for t in times if pre0 <= t < pre1]
        post = [t for t in times if post0 <= t < post1]
        after = [t for t in post if t >= formed]
        if not pre or not after:
            continue
        days: dict = {}
        for t in post:   # 同一次過境相鄰 frame 都蓋到窗格時，同日只算一期（下載時 mosaic）
            days.setdefault(t.strftime("%Y%m%d"), t)
        cand = {"pass": p, "orbit": orbit, "preCount": len(pre),
                "scenes": [{"day": d, "timeUTC": t.strftime("%H:%M")} for d, t in sorted(days.items())],
                "firstAfterFormed": after[0].isoformat()}
        # 事件前不足 MIN_PRE 張的軌道排後面：單張基準斑點雜訊大，假暗區多
        key = (len(pre) < MIN_PRE, after[0], -len(days))
        if best is None or key < best[0]:
            best = (key, cand)
    return best[1] if best else None


# ── 統計 ──

def chance_hit_prob(points, center: tuple, window_km: float = 4.0, n: int = 41) -> float:
    """
    隨機基準：把壩址換成窗格內任一位置，MATCH_RADIUS_M 內剛好有事件的機率
    （窗格內 n×n 格點中，離任一事件點 MATCH_RADIUS_M 以內的比例）。
    窗格裡事件越多，「偵測到」越可能只是碰巧，這個數字讓看的人自己判斷。

    >>> chance_hit_prob([], (121.0, 23.7))
    0.0
    >>> 0.15 < chance_hit_prob([(121.0, 23.7)], (121.0, 23.7)) < 0.25   # π·1² / 4² ≈ 0.196
    True
    """
    from .build import distance_m   # build 會 import 本模組，延後載入避免循環
    if not points:
        return 0.0
    half = window_km * 1000 / 2
    cx, cy = center
    kx = 111_320 * math.cos(math.radians(cy))
    hit = 0
    for i in range(n):
        for j in range(n):
            p = (cx + (2 * i / (n - 1) - 1) * half / kx, cy + (2 * j / (n - 1) - 1) * half / 110_540)
            hit += any(distance_m(p, q) <= MATCH_RADIUS_M for q in points)
    return hit / (n * n)


def size_group(volume) -> str:
    """描述性分組（看到結果後才分的，不是事先定的門檻）。清冊蓄水量 0 多半是未登載。"""
    if not volume:
        return "未登載"
    return "≥ 20 萬 m³" if volume >= 20 else "< 20 萬 m³"


def _hit_window(target: dict) -> tuple:
    formed = datetime.combine(date.fromisoformat(target["formed"]), time(), tzinfo=TW)
    end = formed + timedelta(days=POST_AFTER_DAYS)
    if target.get("breach"):
        end = min(end, datetime.combine(date.fromisoformat(target["breach"]), time(23, 59), tzinfo=TW))
    return formed - timedelta(days=1), formed, end


def summarize_lake(target: dict, built: Optional[dict], scenario: Optional[dict],
                   manifest_entry: Optional[dict]) -> dict:
    """一筆湖的回放結果。built 是 build_scenario 的輸出；scenario 是情境檔。"""
    start, formed, end = _hit_window(target)
    row = {
        "lakeId": target["lakeId"], "scenarioId": target["scenarioId"], "name": target["name"],
        "county": target.get("county", ""), "formed": target["formed"], "breach": target.get("breach"),
        "volume": target.get("volume"), "cause": target.get("cause", ""),
        "orbit": None, "passCount": 0, "firstPassLagDays": None,
        "outcome": None, "reason": "", "detectedAt": None, "detectLagDays": None,
        "eventId": None, "priority": None, "maxPriority": None, "confidence": None,
        "distanceM": None, "areaHectare": None, "otherHighEvents": 0, "otherEvents": 0,
        "chanceHitProb": None, "sizeGroup": size_group(target.get("volume")),
    }
    if manifest_entry:
        if manifest_entry.get("pass"):
            row["orbit"] = f"{'降' if manifest_entry['pass'] == 'DESCENDING' else '升'}軌 {manifest_entry['orbit']}"
            row["preCount"] = manifest_entry.get("preCount")
    elif scenario:
        row["orbit"] = scenario.get("orbitLabel")

    passes = (scenario or {}).get("passes", [])
    times = sorted(datetime.fromisoformat(p["time"]) for p in passes)
    row["passCount"] = len(times)
    after = [t for t in times if t >= formed]
    if after:
        row["firstPassLagDays"] = round((after[0] - formed).total_seconds() / 86400, 1)

    if built is None:
        row["outcome"] = "no_data"
        row["reason"] = (manifest_entry or {}).get("reasonText") or "尚未下載影像或尚未跑偵測"
        return row
    if not [t for t in times if start <= t <= end]:
        row["outcome"] = "no_pass"
        row["reason"] = "形成到消失之間沒有衛星過境" if target.get("breach") else "形成後窗格內沒有可用影像"
        return row

    hit_ids: set = set()
    other: dict = {}
    points: set = set()
    for snap in built["snapshots"]:
        t = datetime.fromisoformat(snap["asOf"])
        if not (start <= t <= end):
            continue
        for c in snap["events"]:
            seen = datetime.fromisoformat(c["lastSeenAt"])
            if seen >= start:
                points.add(tuple(c["lonLat"]))
            near = c.get("distanceFromReferenceM") is not None and c["distanceFromReferenceM"] <= MATCH_RADIUS_M
            if near and seen >= start:
                if row["detectedAt"] is None:
                    row.update(detectedAt=snap["label"], eventId=c["id"], priority=c["priority"],
                               confidence=c["confidence"], distanceM=c["distanceFromReferenceM"],
                               areaHectare=c["areaHectare"],
                               detectLagDays=round((t - formed).total_seconds() / 86400, 1))
                hit_ids.add(c["id"])
                if row["maxPriority"] is None or T.PRIORITY_RANK[c["priority"]] < T.PRIORITY_RANK[row["maxPriority"]]:
                    row["maxPriority"] = c["priority"]
            elif c["id"] not in hit_ids:
                rank = other.get(c["id"], "low")
                other[c["id"]] = c["priority"] if T.PRIORITY_RANK[c["priority"]] < T.PRIORITY_RANK[rank] else rank
    other = {k: v for k, v in other.items() if k not in hit_ids}
    row["chanceHitProb"] = round(chance_hit_prob(points, built["center"]), 2)
    row["otherEvents"] = len(other)
    row["otherHighEvents"] = sum(1 for v in other.values() if v == "high")
    if row["detectedAt"]:
        row["outcome"] = "detected"
    else:
        row["outcome"] = "missed"
        row["reason"] = f"有影像，但壩址 {MATCH_RADIUS_M / 1000:g} km 內沒有候選"
    return row


def summarize(targets: list, skipped: list, before_count: int, built: list, scenarios: dict,
              manifest: Optional[dict] = None) -> dict:
    """targets 全部的結果與總計。built 是 build.py 各情境輸出；scenarios 是 id → 情境檔。"""
    by_id = {b["id"]: b for b in built}
    entries = (manifest or {}).get("lakes", {})
    rows = [summarize_lake(t, by_id.get(t["scenarioId"]), scenarios.get(t["scenarioId"]),
                           entries.get(t["lakeId"])) for t in targets]
    count = {k: sum(1 for r in rows if r["outcome"] == k) for k in ("detected", "missed", "no_pass", "no_data")}
    observable = count["detected"] + count["missed"]
    by_size = []
    for g in ("≥ 20 萬 m³", "< 20 萬 m³", "未登載"):
        rs = [r for r in rows if r["sizeGroup"] == g and r["outcome"] in ("detected", "missed")]
        by_size.append({"group": g, "observable": len(rs),
                        "detected": sum(1 for r in rs if r["outcome"] == "detected"),
                        "expectedChance": round(sum(r["chanceHitProb"] or 0 for r in rs), 1)})
    return {
        "generated": datetime.now(TW).isoformat(timespec="minutes"),
        "rules": {
            "start": REPLAY_START.isoformat(), "preGapDays": PRE_GAP_DAYS, "preDays": PRE_DAYS,
            "postBeforeDays": POST_BEFORE_DAYS, "postAfterDays": POST_AFTER_DAYS,
            "matchRadiusM": MATCH_RADIUS_M,
        },
        "totals": {**count, "targets": len(rows), "observable": observable,
                   "highAmongDetected": sum(1 for r in rows if r["maxPriority"] == "high"),
                   "expectedChanceHits": round(sum(r["chanceHitProb"] or 0 for r in rows), 1)},
        "bySize": by_size,
        "rows": rows,
        "skipped": skipped,
        "beforeStartCount": before_count,
    }


def load_manifest(path: Path = MANIFEST) -> dict:
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def write_js(summary: dict, path: Path = OUT) -> None:
    body = json.dumps(summary, ensure_ascii=False, indent=1)
    path.write_text(
        "/* 由 pipeline/events/build.py（replay.py）產生，請勿手動編輯。\n"
        "   全清冊回放：每筆堰塞湖用同一套流程、同一組參數逐期回放的結果。 */\n"
        f"window.REPLAY_SUMMARY = {body};\n",
        encoding="utf-8",
    )
