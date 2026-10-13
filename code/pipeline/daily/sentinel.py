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
    images = gee.s1_images(ee, region, pre0.strftime("%Y-%m-%d"), (now + timedelta(days=1)).strftime("%Y-%m-%d"))
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
        ps, a, n = process_orbit(ee, w, o, images, region, post0)
        passes += ps
        added += a
        analyzed += n
    if not passes:
        return {"id": w["id"], "status": "no_scene", "added": 0}
    passes.sort(key=lambda p: p["time"])
    S.write_scenario(scenario_for(w, passes, now), description_given=True)
    return {"id": w["id"], "status": "ok", "orbits": "＋".join(orbit_label(o) for o in w["orbits"].values()),
            "added": added, "analyzed": analyzed, "passes": len(passes)}


def main(state: dict, project=None, now=None) -> dict:
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
            r = {"id": w["id"], "status": "error", "error": str(e)}
        print(f"  {r}")
        results.append(r)
    return {"windows": results}
