#!/usr/bin/env python3
"""
每日自動更新（排程呼叫這支）。在 code/ 底下：

    python -m pipeline.daily.run --project <GCP 專案 ID>
    python -m pipeline.daily.run --project <ID> --skip news,sentinel     # 略過部分步驟
    python -m pipeline.daily.run --project <ID> --commit [--push]       # 結果 commit（並推上 GitHub）

步驟（每步獨立，失敗會記在狀態裡，不擋後面的步驟）：

    inventory  農村水保署清冊 XLSX → CSV → lakes.js、成因敘述
    alerts     土石流／大規模崩塌警戒
    rain       94 處大規模崩塌潛勢區的 GSMaP 72 小時雨量
    risk       風險模型（各湖 GSMaP 1／3／7／30 天雨量）→ risk.js
    watchlist  監看窗格：清冊監測中＋警戒＋雨量熱區（data/live/state.json）
    sentinel   各窗格新過境 → 下載 → 偵測 → 情境檔
    passrain   各情境每期過境前的 GSMaP 雨量（缺的才補）
    basemap    各情境小地圖的事件前光學底圖（缺的才做）
    news       Google 新聞 → 外部證據候選（data/live/news.json）
    build      事件佇列 events.js、全清冊回放 replay.js、每日狀態 daily.js

雨量全部來自 GSMaP（Google Earth Engine），不需要 CWA 金鑰。排程設定見 docs/daily.md。
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
import traceback
from datetime import datetime, timedelta, timezone
from pathlib import Path

CODE = Path(__file__).resolve().parents[2]
REPO = CODE.parent
LIVE = REPO / "data" / "live"
STATUS = LIVE / "status.json"
DAILY_JS = CODE / "dashboard" / "data" / "daily.js"
LOCK = LIVE / ".lock"
TW = timezone(timedelta(hours=8))

STEPS = ["inventory", "alerts", "rain", "risk", "watchlist", "sentinel", "passrain", "basemap", "news", "build"]
GIT_PATHS = ["data/raw/taiwan-barrier-lakes.csv", "code/dashboard/data/basemaps", "data/raw/scenarios", "data/derived",
             "data/live/state.json", "data/live/news.json", "data/live/status.json", "code/dashboard/data"]


class Runner:
    def __init__(self, skip: set):
        self.skip = skip
        self.steps = []

    def step(self, name: str, fn, *args):
        """執行一步；回傳結果，失敗或略過回傳 None。"""
        if name in self.skip:
            self.steps.append({"name": name, "status": "skipped"})
            return None
        print(f"\n== {name} ==", flush=True)
        t0 = time.time()
        try:
            out = fn(*args)
            self.steps.append({"name": name, "status": "ok", "seconds": round(time.time() - t0, 1),
                               "summary": summarize(out)})
            return out
        except (Exception, SystemExit) as e:   # 有些模組缺套件時呼叫 sys.exit()，也只算這一步失敗
            traceback.print_exc()
            self.steps.append({"name": name, "status": "error", "seconds": round(time.time() - t0, 1),
                               "error": f"{type(e).__name__}: {e}"[:500]})
            return None


def summarize(out) -> object:
    """狀態檔只記小的摘要。"""
    if isinstance(out, list):
        return {"count": len(out)}
    if isinstance(out, dict):
        return {k: v for k, v in out.items() if not isinstance(v, (list, dict)) or len(str(v)) < 300}
    return None


def run_inventory() -> dict:
    from pipeline.attribution import annotate
    from pipeline.ingest import inventory
    from . import inventory_fetch
    r = inventory_fetch.main()
    inventory.main(str(inventory_fetch.CSV_PATH), str(CODE / "dashboard" / "data" / "lakes.js"))
    annotate.main()
    return r


def run_risk(project) -> dict:
    from pipeline.ingest import risk
    data = CODE / "dashboard" / "data"
    rain, as_of = risk.gsmap_rain(risk.load_lakes(str(data / "lakes.js")), project)
    risk.main(str(data / "lakes.js"), str(data / "risk.js"), rain, as_of)
    return {"lakes": len(rain), "asOf": as_of}


def load_lakes() -> list:
    from pipeline.attribution.annotate import read_lakes
    return read_lakes(CODE / "dashboard" / "data" / "lakes.js")


def write_status(runner: Runner, started: datetime, rain_as_of=None) -> dict:
    from . import news, watchlist
    state = watchlist.load_state()
    windows = [{"id": w["id"], "name": w["name"], "center": w["center"], "activatedAt": w["activatedAt"],
                "sources": [s["label"] for s in w["sources"].values()],
                "orbits": [f"{'降' if o['pass'] == 'DESCENDING' else '升'}軌 {o['orbit']}"
                           for o in (w.get("orbits") or {}).values()],
                "lastScene": max((sc["day"] for o in (w.get("orbits") or {}).values() for sc in o.get("scenes", [])),
                                 default=None)}
               for w in state.get("windows", {}).values() if w["active"]]
    cands = sorted((v for v in news.load()["items"].values() if v["status"] == "candidate"),
                   key=lambda v: v["time"], reverse=True)
    status = {
        "startedAt": started.isoformat(timespec="minutes"),
        "finishedAt": datetime.now(TW).isoformat(timespec="minutes"),
        "steps": runner.steps,
        "alerts": state.get("alerts", []),
        "windows": windows,
        "newsCandidates": [{k: v[k] for k in ("id", "time", "title", "source", "url", "kind", "matches")}
                           for v in cands[:30]],
        "newsCandidateCount": len(cands),
        # GSMaP 在 GEE 上通常落後 1～2 天；儀表板據此顯示雨量資料的新舊
        "rainAsOf": rain_as_of,
    }
    LIVE.mkdir(parents=True, exist_ok=True)
    STATUS.write_text(json.dumps(status, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    DAILY_JS.write_text(
        "/* 由 pipeline/daily/run.py 產生，請勿手動編輯。每日自動更新的執行狀態、監看窗格、待確認的新聞候選。 */\n"
        f"window.DAILY_STATUS = {json.dumps(status, ensure_ascii=False, indent=1)};\n", encoding="utf-8")
    return status


def git_commit(push: bool) -> None:
    def git(*a):
        return subprocess.run(["git", *a], cwd=REPO, check=True, capture_output=True, text=True).stdout
    git("add", "--", *GIT_PATHS)
    if not git("diff", "--cached", "--name-only").strip():
        print("沒有變動，不 commit")
        return
    git("commit", "-m", f"每日自動更新 {datetime.now(TW):%Y-%m-%d}")
    print("已 commit")
    if push:
        git("pull", "--rebase", "--autostash")
        git("push")
        print("已推上遠端")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project", default=os.environ.get("GEE_PROJECT"), help="GCP 專案 ID（或環境變數 GEE_PROJECT）")
    ap.add_argument("--skip", default="", help=f"逗號分隔，可略過：{','.join(STEPS)}")
    ap.add_argument("--commit", action="store_true", help="結果 git commit")
    ap.add_argument("--push", action="store_true", help="commit 後推上遠端（CI 用）")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    skip = {s.strip() for s in args.skip.split(",") if s.strip()}
    if unknown := skip - set(STEPS):
        ap.error(f"不認得的步驟：{','.join(unknown)}")

    LIVE.mkdir(parents=True, exist_ok=True)
    if LOCK.exists() and time.time() - LOCK.stat().st_mtime < 6 * 3600:
        print(f"另一個每日更新正在執行（{LOCK}），略過")
        return 0
    LOCK.write_text(str(os.getpid()))
    started = datetime.now(TW)
    run = Runner(skip)
    try:
        from . import basemap, gee, news, rain, sentinel, watchlist
        run.step("inventory", run_inventory)
        lakes = load_lakes()
        alerts = run.step("alerts", watchlist.fetch_alerts)
        hotspots = watchlist.load_hotspots()
        need_gee = {"rain", "risk", "sentinel", "passrain", "basemap"} - skip
        ee = run.step("gee-login", gee.init, args.project) if need_gee else None
        hot_rain = run.step("rain", rain.hotspot_rain, ee, hotspots) if ee else None
        rain_as_of = next(iter(hot_rain.values()), {}).get("asOf") if hot_rain else None
        if ee:
            run.step("risk", run_risk, args.project)
        run.step("watchlist", watchlist.main, lakes, hot_rain, alerts)
        state = watchlist.load_state()
        state["alerts"] = alerts if alerts is not None else state.get("alerts", [])
        if ee:
            run.step("sentinel", sentinel.main, state, args.project)
            run.step("passrain", rain.fill_pass_rain, ee)
            run.step("basemap", basemap.main, ee)
        watchlist.save_state(state)
        run.step("news", news.main, lakes)
        from pipeline.events import build
        run.step("build", lambda: {"scenarios": len(build.main())})
        write_status(run, started, rain_as_of)
        if args.commit:
            run.step("git", git_commit, args.push)
            write_status(run, started, rain_as_of)
    finally:
        LOCK.unlink(missing_ok=True)
    failed = [s["name"] for s in run.steps if s["status"] == "error"]
    print(f"\n完成：{len(run.steps)} 步，失敗 {len(failed)}" + (f"（{'、'.join(failed)}）" if failed else ""))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
