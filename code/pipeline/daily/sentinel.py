#!/usr/bin/env python3
"""
監看窗格的 Sentinel-1 每日處理：找新過境 → 只下載需要的影像 → 偵測 → 寫情境檔（kind=live）。

規則（與全清冊回放一致，參數不調整）：
- 事件前基準：窗格啟用日往前 PRE_GAP_DAYS～PRE_GAP_DAYS+PRE_DAYS 天的中位數，啟用時固定。
- 軌道：事件前基準 ≥ MIN_PRE 張的軌道全部都抓（花蓮一帶是升軌 69＋降軌 105），啟用時固定；
  都不足時只抓張數最多的一軌。各軌道獨立：自己的事件前基準、自己的複核期（升降軌照射方向相反，
  陰影與疊置位置不同，不能互相複核）。偵測結果合併成同一個情境，事件追蹤跨軌道（250 m 內視為同一事件），
  兩軌交錯讓重訪從約 12 天縮短到約 6 天。
- 逐期影像：啟用前 POST_BEFORE_DAYS 天起的每一次過境，只保留最近 KEEP_SCENE_DAYS 天。
- 前一期當時沒有複核期的，新影像到了會拿來重跑（run_sar_series.needs_run）。

影像暫存在 data/raw/sentinel1/live/（不進版控）；結果 data/derived/final_live_*.json 進版控，
所以 CI 每次在乾淨環境執行也能接續。
"""

from __future__ import annotations

import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

from pipeline.events import replay as R

from . import gee

CODE = Path(__file__).resolve().parents[2]
REPO = CODE.parent
RAW = REPO / "data" / "raw" / "sentinel1" / "live"
sys.path.insert(0, str(CODE / "scripts"))
import run_sar_series as S  # noqa: E402

TW = timezone(timedelta(hours=8))
PRE_GAP_DAYS = R.PRE_GAP_DAYS
PRE_DAYS = R.PRE_DAYS
POST_BEFORE_DAYS = R.POST_BEFORE_DAYS
KEEP_SCENE_DAYS = 90
MIN_PRE = R.MIN_PRE   # 事件前基準至少幾張才抓這一軌
HIDE_AFTER_DAYS = 60   # 停用超過這麼久的窗格不放進儀表板
S1_REPEAT_DAYS = 12    # 每顆 Sentinel-1 同一軌的重複週期（衛星軌道設計值）
S1_ACTIVE_DAYS = 36    # 三個週期內在這一軌拍過，才當作還在拍、拿來推下一期


def orbit_key(orbit_pass: str, orbit: int) -> str:
    """
    >>> orbit_key("ASCENDING", 69), orbit_key("DESCENDING", 105)
    ('A69', 'D105')
    """
    return f"{orbit_pass[0]}{orbit}"


def orbit_label(o: dict) -> str:
    return f"{'降' if o['pass'] == 'DESCENDING' else '升'}軌 {o['orbit']}"


def choose_baseline_orbits(images: list, pre0: datetime, pre1: datetime, min_pre: int = MIN_PRE) -> list:
    """
    images：[(pass, orbit, epoch_ms)]。回傳 [(pass, orbit, 事件前張數)]：事件前 ≥ min_pre 張的軌道全部；
    都不足時只回傳張數最多的一軌（同數取降軌）；完全沒有回傳 []。

    >>> ms = lambda s: datetime.fromisoformat(s).replace(tzinfo=timezone.utc).timestamp() * 1000
    >>> a = [("ASCENDING", 69, ms(f"2026-05-{d:02d}T10:00")) for d in (1, 13, 25)]
    >>> d = [("DESCENDING", 105, ms(f"2026-05-{x:02d}T21:52")) for x in (2, 8, 14, 20)]
    >>> t0, t1 = datetime(2026, 4, 1, tzinfo=TW), datetime(2026, 6, 1, tzinfo=TW)
    >>> choose_baseline_orbits(a + d, t0, t1)
    [('DESCENDING', 105, 4), ('ASCENDING', 69, 3)]
    >>> choose_baseline_orbits(a[:2] + d[:1], t0, t1)
    [('ASCENDING', 69, 2)]
    """
    count: dict = {}
    for p, orbit, ms in images:
        t = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
        if pre0 <= t < pre1:
            count[(p, int(orbit))] = count.get((p, int(orbit)), 0) + 1
    ranked = sorted(count.items(), key=lambda kv: (kv[1], kv[0][0] == "DESCENDING"), reverse=True)
    enough = [(p, o, n) for (p, o), n in ranked if n >= min_pre]
    return enough or [(p, o, n) for (p, o), n in ranked[:1]]


def new_scenes(images: list, orbit_pass: str, orbit: int, start: datetime) -> list:
    """選定軌道、start 以後的過境，同 UTC 日只算一期：[{"day", "timeUTC"}]。"""
    days: dict = {}
    for p, o, ms in images:
        t = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
        if p == orbit_pass and int(o) == orbit and t >= start:
            days.setdefault(t.strftime("%Y%m%d"), t)
    return [{"day": d, "timeUTC": t.strftime("%H:%M")} for d, t in sorted(days.items())]


def orbit_satellites(images: list, orbit_pass: str, orbit: int, now: datetime) -> dict:
    """
    這一軌最近有在拍的衛星：{"C": 最近一次取得時間 ISO, …}。每顆 Sentinel-1 同一軌固定 S1_REPEAT_DAYS 天重複一次，
    但哪幾顆衛星拍哪一軌會變（例如升軌 69 原本 S1A，後來只剩 S1D），所以只留 S1_ACTIVE_DAYS 內拍過的；
    都太久沒拍時留最近的一顆。images：[(pass, orbit, epoch_ms, platform)]。

    >>> ms = lambda s: datetime.fromisoformat(s).replace(tzinfo=timezone.utc).timestamp() * 1000
    >>> imgs = [("DESCENDING", 105, ms("2026-10-10T21:51"), "C"), ("DESCENDING", 105, ms("2026-10-22T21:51"), "C"),
    ...         ("DESCENDING", 105, ms("2026-10-16T21:51"), "D"), ("DESCENDING", 105, ms("2026-06-06T21:51"), "A"),
    ...         ("ASCENDING", 69, ms("2026-08-09T10:00"), "C"), ("ASCENDING", 69, ms("2026-10-26T10:00"), "D")]
    >>> now = datetime(2026, 11, 1, 9, 38, tzinfo=TW)
    >>> orbit_satellites(imgs, "DESCENDING", 105, now)
    {'C': '2026-10-23T05:51+08:00', 'D': '2026-10-17T05:51+08:00'}
    >>> orbit_satellites(imgs, "ASCENDING", 69, now)
    {'D': '2026-10-26T18:00+08:00'}
    >>> orbit_satellites(imgs[3:4], "DESCENDING", 105, now)
    {'A': '2026-06-07T05:51+08:00'}
    """
    last: dict = {}
    for p, o, ms, sat in images:
        if p == orbit_pass and int(o) == orbit:
            t = datetime.fromtimestamp(ms / 1000, tz=TW).replace(second=0, microsecond=0)
            last[sat] = max(last.get(sat, t), t)
    active = {s: t for s, t in last.items() if now - t <= timedelta(days=S1_ACTIVE_DAYS)}
    if not active and last:
        s = max(last, key=last.get)
        active = {s: last[s]}
    return {s: t.isoformat(timespec="minutes") for s, t in sorted(active.items())}


def scenario_for(w: dict, passes: list, now: datetime) -> dict:
    orbits = list(w.get("orbits", {}).values())
    obs = "＋".join(orbit_label(o) for o in orbits)
    base = "、".join(f"{orbit_label(o)} {o['preCount']} 張" for o in orbits)
    labels = [s["label"] for s in w["sources"].values()]
    hidden = (not w["active"] and w.get("deactivatedAt")
              and now - datetime.fromisoformat(w["deactivatedAt"]) > timedelta(days=HIDE_AFTER_DAYS))
    days = sorted({p["time"][:10] for p in passes})
    gaps = sorted((datetime.fromisoformat(b) - datetime.fromisoformat(a)).days for a, b in zip(days, days[1:]))
    return {
        "id": w["id"],
        "name": w["name"],
        "kind": "live",
        "active": w["active"],
        "hidden": bool(hidden),
        "description": (f"自動監看（{'監看中' if w['active'] else '已停止，' + w.get('deactivatedAt', '')[:10]}）："
                        f"{'；'.join(labels)}。窗格自 {w['activatedAt'][:10]} 啟用，Sentinel-1 {obs}，"
                        f"事件前基準 {base}；各軌道獨立複核，參數與全清冊回放相同。"),
        "center": w["center"],
        "windowKm": 4.0,
        # 合併後相鄰兩期的典型間隔（兩軌交錯約 6 天）
        "revisitDays": gaps[len(gaps) // 2] if gaps else min((o.get("revisitDays", 12) for o in orbits), default=12),
        "orbitLabel": obs,
        # 各軌各衛星最近一次取得時間，build 依此推下一期（events/build.py next_sar_pass）
        "orbits": [{"label": orbit_label(o), "satellite": f"S1{sat}", "cycleDays": S1_REPEAT_DAYS, "last": last}
                   for o in orbits for sat, last in (o.get("satellites") or {}).items()],
        # 最近一次成功查過新影像的時間：之前該到卻沒有影像的過境，視為衛星沒拍
        "sarCheckedAt": w.get("sarCheckedAt"),
        "trigger": {"label": labels[0] if labels else "", "time": w["activatedAt"], "source": "自動監看"},
        "context": labels,
        "observationsLakeId": w.get("lakeId"),
        "referenceLakeId": w.get("lakeId"),
        "referenceLabel": "清冊壩址" if w.get("lakeId") else "",
        "passes": passes,
    }


def process_orbit(ee, w: dict, o: dict, images: list, region, post0: datetime) -> tuple:
    """處理窗格的一個軌道；回傳 (passes, 新增期數, 分析期數)。會更新 o 的影像清單與重訪間隔。"""
    lon, lat = w["center"]
    scenes = new_scenes(images, o["pass"], o["orbit"], post0)
    known = {s["day"] for s in o.get("scenes", [])}
    added = sum(1 for s in scenes if s["day"] not in known)
    o["scenes"] = scenes
    if len(scenes) >= 2:
        gaps = sorted((datetime.strptime(b["day"], "%Y%m%d") - datetime.strptime(a["day"], "%Y%m%d")).days
                      for a, b in zip(scenes, scenes[1:]))
        o["revisitDays"] = gaps[len(gaps) // 2]
    if not scenes:
        return [], 0, 0
    name = f"{w['id']}_{orbit_key(o['pass'], o['orbit'])}"   # 每軌一個序列：各自的基準與複核
    days = [s["day"] for s in scenes]
    plan = S.series_plan(name, days, skip_existing=True)
    if plan:   # 只下載要跑的期別與其複核期
        gee.download_baseline(ee, region, o["pass"], o["orbit"], o["preStart"], o["preEnd"],
                              RAW / f"S1_VV_{name}_pre.tif", RAW / f"NASADEM_{name}.tif")
        for d in sorted({d for d, _ in plan} | {l for _, l in plan if l}):
            gee.download_scene(ee, region, o["pass"], o["orbit"], d, RAW / f"S1_VV_{name}_{d}.tif")
    times = {s["day"]: s["timeUTC"] for s in scenes}
    times["default"] = scenes[0]["timeUTC"]
    passes = S.run_series(name, lon, lat, o["pass"], RAW, times, skip_existing=True, days=days)
    for p in passes:
        p["orbitLabel"] = orbit_label(o)
    return passes, added, len(plan)


def process_window(ee, w: dict, now: datetime) -> dict:
    """處理一個窗格的所有軌道；回傳摘要。會直接修改 w（軌道、影像清單）。"""
    lon, lat = w["center"]
    region = gee.aoi(ee, lon, lat)
    act = datetime.fromisoformat(w["activatedAt"])
    pre0, pre1 = act - timedelta(days=PRE_GAP_DAYS + PRE_DAYS), act - timedelta(days=PRE_GAP_DAYS)
    post0 = max(act - timedelta(days=POST_BEFORE_DAYS), now - timedelta(days=KEEP_SCENE_DAYS))
    with_sat = gee.s1_images(ee, region, pre0.strftime("%Y-%m-%d"), (now + timedelta(days=1)).strftime("%Y-%m-%d"),
                             platform=True)
    images = [(p, o, ms) for p, o, ms, _ in with_sat]
    if not w.get("orbits"):
        w.pop("orbit", None)   # 舊版單軌欄位
        w.pop("scenes", None)
        chosen = choose_baseline_orbits(images, pre0, pre1)
        if not chosen:
            return {"id": w["id"], "status": "no_baseline"}
        w["orbits"] = {orbit_key(p, o): {"pass": p, "orbit": o, "preCount": n, "scenes": [],
                                         "preStart": pre0.strftime("%Y-%m-%d"), "preEnd": pre1.strftime("%Y-%m-%d")}
                       for p, o, n in chosen}
    passes, added, analyzed = [], 0, 0
    for o in w["orbits"].values():
        o["satellites"] = orbit_satellites(with_sat, o["pass"], o["orbit"], now) or o.get("satellites", {})
        ps, a, n = process_orbit(ee, w, o, images, region, post0)
        passes += ps
        added += a
        analyzed += n
    w["sarCheckedAt"] = now.isoformat(timespec="minutes")   # 查詢與下載都成功才更新
    if not passes:
        return {"id": w["id"], "status": "no_scene", "added": 0}
    passes.sort(key=lambda p: p["time"])
    S.write_scenario(scenario_for(w, passes, now), description_given=True)
    return {"id": w["id"], "status": "ok", "orbits": "＋".join(orbit_label(o) for o in w["orbits"].values()),
            "added": added, "analyzed": analyzed, "passes": len(passes)}


def failure_message(results: list) -> str | None:
    """
    有窗格失敗時回傳一行摘要（給狀態檔與儀表板），全部成功回傳 None。

    >>> failure_message([{"id": "a", "status": "ok"}]) is None
    True
    >>> failure_message([{"id": "a", "status": "error", "error": "denied"}, {"id": "b", "status": "ok"}])
    '1／2 個窗格失敗：denied'
    """
    failed = [r for r in results if r.get("status") == "error"]
    if not failed:
        return None
    return f"{len(failed)}／{len(results)} 個窗格失敗：{failed[0].get('error', '')}"[:500]


def main(state: dict, project=None, now=None) -> dict:
    """
    處理所有監看中的窗格。單一窗格失敗不影響其他窗格；全部跑完後只要有窗格失敗就拋出錯誤，
    讓這一步在狀態檔記為失敗（之前只寫在回傳的清單裡，狀態檔一長就被摘要丟掉，失敗看起來像成功）。
    每個窗格最近一次的錯誤記在 state 的 lastError，成功後清掉，儀表板據此顯示哪個窗格壞了。
    """
    now = now or datetime.now(TW)
    ee = gee.init(project)
    results = []
    for w in state.get("windows", {}).values():
        if not w["active"]:
            # 停用的窗格不再抓影像，但情境檔要更新狀態（停止日期、是否隱藏）
            if w.get("orbits"):
                path = S.SCENARIOS / f"{w['id']}.json"
                if path.exists():
                    import json
                    old = json.loads(path.read_text(encoding="utf-8"))
                    S.write_scenario(scenario_for(w, old.get("passes", []), now), description_given=True)
            continue
        print(f"== {w['id']} {w['name']}")
        try:
            r = process_window(ee, w, now)
        except Exception as e:   # 單一窗格失敗不影響其他窗格
            r = {"id": w["id"], "status": "error", "error": gee.redact(str(e))}
        if r["status"] == "error":
            w["lastError"] = {"at": now.isoformat(timespec="minutes"), "error": r["error"][:300]}
        else:
            w.pop("lastError", None)
        print(f"  {r}")
        results.append(r)
    msg = failure_message(results)
    if msg:
        raise RuntimeError(msg)
    return {"windows": results}
