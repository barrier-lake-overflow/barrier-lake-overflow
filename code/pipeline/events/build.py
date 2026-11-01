#!/usr/bin/env python3
"""
把逐期 SAR 偵測結果（data/derived/final_*.json）整理成事件，再依時間逐期回放研判結果。

    python -m pipeline.events.build        # → dashboard/data/events.js

情境設定在 data/raw/scenarios/*.json，一個檔案一個情境（地點＋影像期別）。
偵測結果檔不存在的期別會略過；整個情境都沒有結果就整個略過，不會失敗。

跨期追蹤：新一期候選的中心點跟既有事件最新位置相距 TRACK_RADIUS_M 以內，
視為同一事件；否則開新事件。事件代號依首次出現順序編 E1、E2…。

回放時點：每一期影像（含只拿來複核的影像）各是一個時點。某時點只用到
當時已經拿到的影像，不會用到未來的複核結果。

事後查證（情境檔 hindsight）：回放結束後才做的查證，例如負案例用光學影像確認誤報。
依位置附到事件卡上供展示，不參與優先等級、信心等研判（回放當下系統不知道這些結果）。

光學影像判讀（情境檔 optical，只有監看窗格有，見 pipeline/daily/optical.py）：同樣依位置附到事件卡，
只供參考、不進研判；每個時點只放下一期 SAR 之前拍到的影像。
"""

from __future__ import annotations

import json
import math
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

from pipeline.attribution.annotate import read_lakes
from pipeline.ingest.observations import load_observations_table

from . import replay as R
from . import triage as T

CODE_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = CODE_ROOT.parent
SCENARIOS = REPO_ROOT / "data" / "raw" / "scenarios"
DERIVED = REPO_ROOT / "data" / "derived"
LAKES_JS = CODE_ROOT / "dashboard" / "data" / "lakes.js"
OUT = CODE_ROOT / "dashboard" / "data" / "events.js"

TRACK_RADIUS_M = 250.0
INGEST_LAG_DAYS = 1   # 過境後這麼久還查不到影像，視為衛星沒拍（GEE 上的 Sentinel-1 通常一天內上架）


def distance_m(a: tuple, b: tuple) -> float:
    """經緯度近似距離（等距圓柱投影，幾公里內誤差可忽略）。

    >>> round(distance_m((121.0, 23.7), (121.0, 23.701)))
    111
    """
    lat = math.radians((a[1] + b[1]) / 2)
    dx = (a[0] - b[0]) * 111_320 * math.cos(lat)
    dy = (a[1] - b[1]) * 110_540
    return math.hypot(dx, dy)


def _t(s: Optional[str]) -> Optional[datetime]:
    return datetime.fromisoformat(s) if s else None


def load_passes(scenario: dict, derived: Path) -> list:
    """回傳 [(pass 設定, final json)]，結果檔不存在的期別略過。"""
    out = []
    for p in scenario["passes"]:
        path = derived / p["file"]
        if not path.exists():
            print(f"  略過 {p['file']}：找不到結果檔")
            continue
        out.append((p, json.loads(path.read_text(encoding="utf-8"))))
    return out


def track(passes: list) -> list:
    """把各期候選串成事件。回傳 [{"id": "E1", "detections": [Detection…]}]。"""
    events: list = []
    for p, result in sorted(passes, key=lambda x: _t(x[0]["time"])):
        for cand in result.get("candidates", []):
            det = T.Detection(
                pass_time=_t(p["time"]),
                recheck_time=_t(p.get("recheckTime")),
                cand=cand,
                evidence_image=p.get("evidenceImage"),
            )
            match = None
            for ev in events:
                if distance_m(ev["detections"][-1].lon_lat, det.lon_lat) <= TRACK_RADIUS_M:
                    match = ev
                    break
            if match:
                match["detections"].append(det)
            else:
                events.append({"id": f"E{len(events) + 1}", "detections": [det]})
    return events


def snapshot_times(scenario: dict, passes: list) -> list:
    """每一期影像（偵測期＋複核期）各一個時點，依時間排序。"""
    times = set()
    for p, _ in passes:
        times.add(_t(p["time"]))
        if p.get("recheckTime"):
            times.add(_t(p["recheckTime"]))
    return sorted(times)


def rain_line(rain: dict) -> str:
    """
    >>> rain_line({"h24": 12.3, "h72": 249.1, "source": "GSMaP"})
    '過境前雨量 72 小時 249 mm、24 小時 12 mm（GSMaP）'
    """
    h24 = f"、24 小時 {rain['h24']:.0f} mm" if rain.get("h24") is not None else ""
    return f"過境前雨量 72 小時 {rain['h72']:.0f} mm{h24}（{rain.get('source', '衛星估計')}）"


def nearby_history(lakes: list, lon_lat: tuple, before: datetime,
                   exclude_id: Optional[str]) -> list:
    """清冊中、在 before 之前形成、距離 HISTORY_RADIUS_KM 內的堰塞湖。"""
    out = []
    for lake in lakes:
        if lake.get("id") == exclude_id or lake.get("lon") is None:
            continue
        year = lake.get("year")
        if not year or year > before.year:
            continue
        d = distance_m(lon_lat, (lake["lon"], lake["lat"])) / 1000
        if d <= T.HISTORY_RADIUS_KM:
            out.append({"name": lake["name"], "year": year, "distanceKm": round(d, 1)})
    return sorted(out, key=lambda h: h["year"])


def matching_external(scenario: dict, lon_lat: tuple, as_of: datetime) -> list:
    """情境檔 externalEvidence 中，as_of 以前已發布、且位置在 radiusM 內的他單位成果。"""
    out = []
    for x in scenario.get("externalEvidence", []):
        t = _t(x["time"])
        if t > as_of or distance_m(lon_lat, tuple(x["lonLat"])) > x.get("radiusM", 600):
            continue
        out.append({**x, "time": t})
    return sorted(out, key=lambda x: x["time"])


def matching_hindsight(scenario: dict, lon_lat: tuple) -> list:
    """情境檔 hindsight 中，位置在 radiusM 內的事後查證。只供展示，不進研判。"""
    return [h for h in scenario.get("hindsight", [])
            if distance_m(lon_lat, tuple(h["lonLat"])) <= h.get("radiusM", 300)]


def matching_optical(scenario: dict, lon_lat: tuple, until: Optional[datetime]) -> list:
    """
    情境檔 optical.checks（pipeline/daily/optical.py）中位置最近、且在 TRACK_RADIUS_M 內的事件，
    取 until 以前拍的影像（None＝不限），新的在前。只供展示，不進研判。

    >>> sc = {"optical": {"checks": [{"lonLat": [121.0, 23.7], "results": [
    ...     {"time": "2026-10-29T10:30+08:00", "verdict": "water"}, {"time": "2026-10-19T10:30+08:00", "verdict": "cloud"}]}]}}
    >>> [r["verdict"] for r in matching_optical(sc, (121.0, 23.7005), None)]
    ['water', 'cloud']
    >>> [r["verdict"] for r in matching_optical(sc, (121.0, 23.7005), datetime.fromisoformat("2026-10-26T18:00+08:00"))]
    ['cloud']
    >>> matching_optical(sc, (121.1, 23.7), None)
    []
    """
    near = [(distance_m(lon_lat, tuple(c["lonLat"])), c) for c in (scenario.get("optical") or {}).get("checks", [])]
    near = [x for x in near if x[0] <= TRACK_RADIUS_M]
    if not near:
        return []
    c = min(near, key=lambda x: x[0])[1]
    return [r for r in c["results"] if until is None or _t(r["time"]) <= until]


def next_sar_pass(t: datetime, orbits: list, revisit: timedelta,
                  floor: Optional[datetime] = None) -> tuple:
    """
    t 之後（且晚於 floor）最早的一次 SAR 過境：(時間, 軌道名稱)。orbits 每筆是一軌的一顆衛星
    （daily/sentinel.py），從它最近一次取得時間 last 往前或往後推整數個週期 cycleDays。
    沒有軌道資料（回放情境）時沿用 t + revisit。
    floor：最新一期用「最近一次成功查詢 − INGEST_LAG_DAYS」，比它早卻沒有影像的過境視為衛星沒拍。

    >>> orbits = [{"label": "降軌 105", "satellite": "S1C", "cycleDays": 12, "last": "2026-10-23T05:51+08:00"},
    ...           {"label": "降軌 105", "satellite": "S1D", "cycleDays": 12, "last": "2026-10-17T05:51+08:00"},
    ...           {"label": "升軌 69", "satellite": "S1D", "cycleDays": 12, "last": "2026-10-26T18:00+08:00"}]
    >>> t = datetime.fromisoformat("2026-10-26T18:00+08:00")
    >>> n, o = next_sar_pass(t, orbits, timedelta(days=4)); n.isoformat(), o
    ('2026-10-29T05:51:00+08:00', '降軌 105')
    >>> n, o = next_sar_pass(t, orbits, timedelta(days=4), datetime.fromisoformat("2026-10-31T09:38+08:00"))
    >>> n.isoformat(), o
    ('2026-11-04T05:51:00+08:00', '降軌 105')
    >>> next_sar_pass(datetime.fromisoformat("2026-10-17T05:51+08:00"), orbits, timedelta(days=4))[0].isoformat()
    '2026-10-23T05:51:00+08:00'
    >>> next_sar_pass(t, [], timedelta(days=6))
    (datetime.datetime(2026, 11, 1, 18, 0, tzinfo=datetime.timezone(datetime.timedelta(seconds=28800))), None)
    """
    if not orbits:
        return t + revisit, None
    after = max(t, floor) if floor else t
    best = None
    for o in orbits:
        last, cycle = _t(o["last"]), timedelta(days=o["cycleDays"])
        k = (after - last) // cycle + 1      # 第一個晚於 after 的整數週期（after 早於 last 時 k ≤ 0）
        nxt = last + k * cycle
        if best is None or nxt < best[0]:
            best = (nxt, o["label"])
    return best


def _snapshot_label(t: datetime, analyzed: set, rechecks: dict, trigger: Optional[datetime]) -> dict:
    parts = []
    if t in analyzed:
        parts.append("新一期 SAR 全幅偵測")
    if t in rechecks:
        parts.append(f"複核 {'、'.join(rechecks[t])} 的候選")
    since = ""
    if trigger:
        h = (t - trigger).total_seconds() / 3600
        if h < 0:   # 全清冊回放含形成前幾期
            since = f"觸發前約 {-h / 24:.0f} 天" if -h >= 24 else f"觸發前約 {-h:.0f} 小時"
        else:
            since = f"距觸發約 {h:.0f} 小時" if h < 72 else f"距觸發約 {h / 24:.0f} 天"
    return {"what": "＋".join(parts), "since": since}


def build_scenario(scenario: dict, derived: Path = DERIVED,
                   lakes: Optional[list] = None, observations: Optional[dict] = None) -> Optional[dict]:
    passes = load_passes(scenario, derived)
    if not passes:
        return None
    lakes = lakes or []
    observations = observations or {}

    events = track(passes)
    analyzed = {_t(p["time"]) for p, _ in passes}
    rechecks: dict = {}
    for p, _ in passes:
        if p.get("recheckTime"):
            rechecks.setdefault(_t(p["recheckTime"]), []).append(T.tw_date(_t(p["time"])))
    trigger = _t(scenario.get("trigger", {}).get("time"))

    obs = observations.get(scenario.get("observationsLakeId"))
    station_rain = bool(obs and obs.rain_24h_mm is not None)
    pass_rain = {_t(p["time"]): p.get("rain") for p, _ in passes}

    ref = next((l for l in lakes if l.get("id") == scenario.get("referenceLakeId")), None)
    reference = ({"lakeId": ref["id"], "name": ref["name"], "lonLat": [ref["lon"], ref["lat"]],
                  "label": scenario.get("referenceLabel", "")} if ref else None)

    revisit = timedelta(days=scenario.get("revisitDays", 6))
    checked = _t(scenario.get("sarCheckedAt"))
    snapshots = []
    times = snapshot_times(scenario, passes)
    for i, t in enumerate(times):
        is_last = i + 1 == len(times)
        # 光學影像：到下一期 SAR 之前拍到的都算這個時點看得到（最新一期不限）
        optical_until = None if is_last else times[i + 1]
        # 下一期：各軌依自己的週期推；最新一期已查過卻沒有影像的過境跳過（衛星沒拍）
        floor = checked - timedelta(days=INGEST_LAG_DAYS) if is_last and checked else None
        next_pass, next_orbit = next_sar_pass(t, scenario.get("orbits") or [], revisit, floor)
        latest_analyzed = max((a for a in analyzed if a <= t), default=None)
        rain = pass_rain.get(latest_analyzed)   # 該期過境前的衛星雨量，不用到未來
        ctx_base = dict(
            as_of=t,
            latest_analyzed_pass=latest_analyzed,
            next_pass=next_pass,
            rain_available=station_rain or bool(rain),
            trigger_label=scenario.get("trigger", {}).get("label", ""),
            context_lines=scenario.get("context", []) + ([rain_line(rain)] if rain else []),
        )
        cards = []
        for ev in events:
            dets = [d for d in ev["detections"] if d.pass_time <= t]
            if not dets:
                continue
            latest = dets[-1]
            ctx = T.Context(
                **ctx_base,
                history=nearby_history(lakes, latest.lon_lat, t, scenario.get("referenceLakeId")),
                external=matching_external(scenario, latest.lon_lat, t),
                exposure=scenario.get("exposure"),
            )
            a = T.assess(ev["id"], dets, ctx)
            card = {
                "id": ev["id"],
                "firstSeen": T.tw_label(dets[0].pass_time),
                "lastSeen": T.tw_label(latest.pass_time),
                "lastSeenAt": latest.pass_time.isoformat(),
                "isNew": latest.pass_time == t and len(dets) == 1,
                "lonLat": list(latest.lon_lat),
                "distanceFromReferenceM": (round(distance_m(latest.lon_lat, tuple(reference["lonLat"])))
                                           if reference else None),
                "areaHectare": round(latest.area_ha, 2),
                "areaNote": "SAR 陡坡與陰影遮罩會擋掉部分湖面，面積偏低，視為下限",
                "lakeFloorM": latest.cand.get("lakeFloorM"),
                "polygonLonLat": latest.cand.get("polygonLonLat") or [],
                "detections": [{
                    "passTime": T.tw_label(d.pass_time),
                    "areaHectare": round(d.area_ha, 2),
                    "recheck": d.recheck_state(t),
                    "recheckTime": T.tw_label(d.recheck_time) if d.recheck_time else None,
                    "iou": d.iou if d.recheck_state(t) != "pending" else None,
                    "evidenceImage": d.evidence_image,
                    "reasons": [r for r in d.cand.get("reasons", [])
                                if d.recheck_state(t) != "pending" or "IoU" not in r],
                } for d in dets],
                **a.to_dict(),
                # 事後查證：回放當下系統不知道，只供展示，不影響上面的研判
                "hindsight": matching_hindsight(scenario, latest.lon_lat),
                # 光學影像自動判讀（監看窗格）：只供參考，不影響上面的研判
                "optical": matching_optical(scenario, latest.lon_lat, optical_until),
            }
            cards.append(card)
        cards.sort(key=lambda c: (T.PRIORITY_RANK[c["priority"]], -c["areaHectare"]))

        counts = {k: sum(1 for c in cards if c["priority"] == k) for k in T.PRIORITY_RANK}
        label = _snapshot_label(t, analyzed, rechecks, trigger)
        snapshots.append({
            "asOf": t.isoformat(),
            "label": T.tw_label(t),
            "what": label["what"],
            "since": label["since"],
            "nextPass": T.tw_date(next_pass),
            "nextPassOrbit": next_orbit,
            "counts": counts,
            "newCount": sum(1 for c in cards if c["isNew"]),
            "events": cards,
        })

    return {
        "id": scenario["id"],
        "name": scenario["name"],
        "kind": scenario.get("kind", "positive"),
        "active": scenario.get("active"),
        "description": scenario.get("description", ""),
        "center": scenario["center"],
        "windowKm": scenario.get("windowKm", 4.0),
        "reference": reference,
        "basemap": scenario.get("basemap"),   # 事件前光學底圖（pipeline/daily/basemap.py）
        "aerial": scenario.get("aerial", []),  # 航遙分署航照圖層（scripts/aerial_dashboard.py），依可取得時間顯示
        # 監看窗格最近的光學影像雲量與下一次預計過境（pipeline/daily/optical.py）；事件判讀已附在各事件卡
        "optical": ({k: scenario["optical"][k] for k in ("checkedAt", "scenes", "next")}
                    if scenario.get("optical") else None),
        "trigger": scenario.get("trigger"),
        "snapshots": snapshots,
    }


def write_js(scenarios: list, path: Path = OUT) -> None:
    body = json.dumps(scenarios, ensure_ascii=False, indent=1)
    path.write_text(
        "/* 由 pipeline/events/build.py 產生，請勿手動編輯。\n"
        "   每個情境逐期回放：某時點只用當時已取得的影像，不含未來的複核結果。 */\n"
        f"window.EVENT_SCENARIOS = {body};\n",
        encoding="utf-8",
    )


def main(scenario_dir: Path = SCENARIOS, derived: Path = DERIVED, out: Path = OUT,
         replay_out: Path = R.OUT) -> list:
    lakes = read_lakes(LAKES_JS) if LAKES_JS.exists() else []
    observations = load_observations_table()
    built, scenarios = [], {}
    for path in sorted(scenario_dir.glob("*.json")):
        scenario = json.loads(path.read_text(encoding="utf-8"))
        scenarios[scenario["id"]] = scenario
        if scenario.get("hidden"):   # 停用很久的每日監看窗格
            continue
        print(f"情境 {scenario['id']}（{scenario['name']}）")
        result = build_scenario(scenario, derived, lakes, observations)
        if result is None:
            print("  沒有任何偵測結果，略過")
            continue
        for s in result["snapshots"]:
            c = s["counts"]
            print(f"  {s['label']}  高 {c['high']}／中 {c['medium']}／低 {c['low']}  {s['what']}")
        built.append(result)
    write_js(built, out)
    print(f"已寫出 {out}（{len(built)} 個情境）")

    if lakes:
        targets, skipped, before = R.select_targets(lakes)
        summary = R.summarize(targets, skipped, before, built, scenarios, R.load_manifest())
        R.write_js(summary, replay_out)
        tot = summary["totals"]
        print(f"全清冊回放：{tot['targets']} 筆，偵測到 {tot['detected']}／漏報 {tot['missed']}"
              f"／期間無過境 {tot['no_pass']}／尚無資料 {tot['no_data']} → {replay_out}")
    return built


if __name__ == "__main__":
    main()
