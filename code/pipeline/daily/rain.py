#!/usr/bin/env python3
"""
GSMaP 衛星雨量（Google Earth Engine，JAXA GSMaP v8 雨量計校正版）。

兩個用途：
1. 每日：94 處大規模崩塌潛勢區的 24／72 小時累積雨量，給 watchlist 判斷雨量熱區。
2. 每一期過境：在窗格中心算「過境前 24／72 小時」雨量，寫進情境檔 passes[].rain。
   回放時點只用該期過境以前的雨量，不偷看未來；補上後事件卡的「形成期間雨量」缺口會消失。
   既有的回放情境（含全清冊回放）缺的也一起補，GSMaP 從 1998 年起都有資料。

衛星雨量在山區有誤差，事件卡上標示為「衛星估計」，不當成測站值。
風險模型（pipeline.ingest.risk）的 1／3／7／30 天雨量也用 GSMaP，不再呼叫 CWA。
人工查證的測站值（data/raw/observations.csv）有填時，事件卡優先用測站值。
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from . import gee

REPO = Path(__file__).resolve().parents[3]
SCENARIOS = REPO / "data" / "raw" / "scenarios"


def hotspot_rain(ee, hotspots: dict) -> dict:
    """{崩塌區編號: {"h24", "h72"}}，以 GSMaP 最新一筆為終點。"""
    end = gee.gsmap_latest(ee)
    pts = {k: tuple(v["lonLat"]) for k, v in hotspots["landslide"].items()}
    out = gee.gsmap_totals(ee, pts, end)
    for v in out.values():
        v["asOf"] = end.isoformat(timespec="minutes")
    return out


def fill_pass_rain(ee, batch: int = 100) -> dict:
    """所有情境檔中缺雨量的過境補上 GSMaP（伺服器端分批計算）；回傳 {情境: 補了幾期}。"""
    latest = gee.gsmap_latest(ee)
    files = {p: json.loads(p.read_text(encoding="utf-8")) for p in sorted(SCENARIOS.glob("*.json"))}
    todo = []   # (key, lon, lat, end)；key = 檔案序號:過境序號
    paths = list(files)
    for i, path in enumerate(paths):
        sc = files[path]
        for j, p in enumerate(sc.get("passes", [])):
            t = datetime.fromisoformat(p["time"])
            if not p.get("rain") and t <= latest:   # GSMaP 還沒涵蓋到的過境，明天再補
                todo.append((f"{i}:{j}", sc["center"][0], sc["center"][1], t))
    got: dict = {}
    for k in range(0, len(todo), batch):
        got.update(gee.gsmap_at(ee, todo[k:k + batch]))
    done: dict = {}
    for key, v in got.items():
        if v.get("h72") is None:
            continue
        i, j = map(int, key.split(":"))
        sc = files[paths[i]]
        sc["passes"][j]["rain"] = {**v, "source": gee.GSMAP_LABEL}
        done[sc["id"]] = done.get(sc["id"], 0) + 1
    for path, sc in files.items():
        if sc["id"] in done:
            path.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"過境前雨量：補了 {sum(done.values())} 期（{len(done)} 個情境）")
    return done
