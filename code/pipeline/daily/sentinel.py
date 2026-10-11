#!/usr/bin/env python3
"""
監看窗格的 Sentinel-1 每日處理：找新過境 → 只下載需要的影像 → 偵測 → 寫情境檔（kind=live）。

規則（與全清冊回放一致，參數不調整）：
- 事件前基準：窗格啟用日往前 PRE_GAP_DAYS～PRE_GAP_DAYS+PRE_DAYS 天的中位數，啟用時固定。
- 軌道：事件前基準張數最多的一軌（同數取降軌），啟用時固定；不同軌道的幾何不同，不能混用。
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
HIDE_AFTER_DAYS = 60   # 停用超過這麼久的窗格不放進儀表板


def choose_baseline_orbit(images: list, pre0: datetime, pre1: datetime):
    """
    images：[(pass, orbit, epoch_ms)]。回傳 (pass, orbit, 事件前張數) 或 None。

    >>> ms = lambda s: datetime.fromisoformat(s).replace(tzinfo=timezone.utc).timestamp() * 1000
    >>> imgs = [("ASCENDING", 69, ms("2026-05-01T10:00")), ("DESCENDING", 105, ms("2026-05-02T21:52")),
    ...         ("DESCENDING", 105, ms("2026-05-14T21:52"))]
    >>> choose_baseline_orbit(imgs, datetime(2026, 4, 1, tzinfo=TW), datetime(2026, 6, 1, tzinfo=TW))
    ('DESCENDING', 105, 2)
    """
    count: dict = {}
    for p, orbit, ms in images:
        t = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
        if pre0 <= t < pre1:
            count[(p, int(orbit))] = count.get((p, int(orbit)), 0) + 1
    if not count:
        return None
    (p, orbit), n = max(count.items(), key=lambda kv: (kv[1], kv[0][0] == "DESCENDING"))
    return p, orbit, n


def new_scenes(images: list, orbit_pass: str, orbit: int, start: datetime) -> list:
    """選定軌道、start 以後的過境，同 UTC 日只算一期：[{"day", "timeUTC"}]。"""
    days: dict = {}
    for p, o, ms in images:
        t = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
        if p == orbit_pass and int(o) == orbit and t >= start:
            days.setdefault(t.strftime("%Y%m%d"), t)
    return [{"day": d, "timeUTC": t.strftime("%H:%M")} for d, t in sorted(days.items())]


def scenario_for(w: dict, passes: list, now: datetime) -> dict:
    side = "降軌" if w["orbit"]["pass"] == "DESCENDING" else "升軌"
    labels = [s["label"] for s in w["sources"].values()]
    hidden = (not w["active"] and w.get("deactivatedAt")
              and now - datetime.fromisoformat(w["deactivatedAt"]) > timedelta(days=HIDE_AFTER_DAYS))
    return {
        "id": w["id"],
        "name": w["name"],
        "kind": "live",
        "active": w["active"],
        "hidden": bool(hidden),
        "description": (f"每日監看（{'監看中' if w['active'] else '已停止，' + w.get('deactivatedAt', '')[:10]}）："
                        f"{'；'.join(labels)}。窗格自 {w['activatedAt'][:10]} 啟用，Sentinel-1 {side} {w['orbit']['orbit']}，"
                        f"事件前基準 {w['orbit']['preCount']} 張，參數與全清冊回放相同。"),
        "center": w["center"],
        "windowKm": 4.0,
        "revisitDays": w["orbit"].get("revisitDays", 12),
        "orbitLabel": f"{side} {w['orbit']['orbit']}",
        "trigger": {"label": labels[0] if labels else "", "time": w["activatedAt"], "source": "每日監看"},
        "context": labels,
        "observationsLakeId": w.get("lakeId"),
        "referenceLakeId": w.get("lakeId"),
        "referenceLabel": "清冊壩址" if w.get("lakeId") else "",
        "passes": passes,
    }


def process_window(ee, w: dict, now: datetime) -> dict:
    """處理一個窗格；回傳摘要。會直接修改 w（軌道、影像清單）。"""
    lon, lat = w["center"]
    region = gee.aoi(ee, lon, lat)
    act = datetime.fromisoformat(w["activatedAt"])
    pre0, pre1 = act - timedelta(days=PRE_GAP_DAYS + PRE_DAYS), act - timedelta(days=PRE_GAP_DAYS)
    post0 = max(act - timedelta(days=POST_BEFORE_DAYS), now - timedelta(days=KEEP_SCENE_DAYS))
    images = gee.s1_images(ee, region, pre0.strftime("%Y-%m-%d"), (now + timedelta(days=1)).strftime("%Y-%m-%d"))
    if not w.get("orbit"):
        o = choose_baseline_orbit(images, pre0, pre1)
        if o is None:
            return {"id": w["id"], "status": "no_baseline"}
        w["orbit"] = {"pass": o[0], "orbit": o[1], "preCount": o[2],
                      "preStart": pre0.strftime("%Y-%m-%d"), "preEnd": pre1.strftime("%Y-%m-%d")}
    o = w["orbit"]
    scenes = new_scenes(images, o["pass"], o["orbit"], post0)
    known = {s["day"] for s in w.get("scenes", [])}
    added = [s for s in scenes if s["day"] not in known]
    w["scenes"] = scenes
    if len(scenes) >= 2:
        gaps = sorted((datetime.strptime(b["day"], "%Y%m%d") - datetime.strptime(a["day"], "%Y%m%d")).days
                      for a, b in zip(scenes, scenes[1:]))
        o["revisitDays"] = gaps[len(gaps) // 2]
    if not scenes:
        return {"id": w["id"], "status": "no_scene", "added": 0}

    name = w["id"]
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
    S.write_scenario(scenario_for(w, passes, now), description_given=True)
    return {"id": w["id"], "status": "ok", "added": len(added), "analyzed": len(plan), "passes": len(passes)}


def main(state: dict, project=None, now=None) -> dict:
    now = now or datetime.now(TW)
    ee = gee.init(project)
    results = []
    for w in state.get("windows", {}).values():
        if not w["active"]:
            # 停用的窗格不再抓影像，但情境檔要更新狀態（停止日期、是否隱藏）
            if w.get("orbit"):
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
