#!/usr/bin/env python3
"""
坡度雙門檻（hysteresis）在全清冊回放上的成績，跟現行固定 35° 比。

    cd code
    python scripts/hysteresis_replay.py           # → docs/hysteresis.json、終端機表格
    python scripts/hysteresis_replay.py --jobs 8

雙門檻：新增水體照寬鬆坡度（35°／45°）判，每塊至少要有一定面積落在坡度 ≤ 20° 才保留，
保留時整塊留下（detect/barrier_lake.py 的 seed_filter）。其餘參數全部維持現行值。

主要比較的一組（起始 20° ≥ 0.2 公頃、延伸到 35°）是在看回放結果之前定的；其他組是敏感度。
另外在各組之間做留一（每次拿掉一湖，用其餘湖挑一組，再看被拿掉那湖），
估計「從這幾組裡挑」在沒看過的湖上的表現。計分口徑同 tune_replay.py。
"""

from __future__ import annotations

import argparse
import json
import os
import pickle
import sys
from datetime import datetime
from multiprocessing import Pool
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

import sensitivity_replay as S  # noqa: E402
import tune_replay as TR  # noqa: E402
from pipeline.detect.barrier_lake import classify  # noqa: E402
from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402

CACHE = S.REPO / "data" / "cache" / "hysteresis_results.pkl"
OUT = S.REPO / "docs" / "hysteresis.json"
PRIMARY = "seed20_0.2ha_35"
# 名稱 → run_sar_chain 參數（崩塌門檻等其餘參數用現行值）
VARIANTS = {
    "current_35": {"max_water_slope_deg": 35.0},
    PRIMARY: {"max_water_slope_deg": 35.0, "seed_slope_deg": 20.0, "seed_min_area_m2": 2000.0},
    "seed20_any_35": {"max_water_slope_deg": 35.0, "seed_slope_deg": 20.0, "seed_min_area_m2": 0.0},
    "seed20_0.5ha_35": {"max_water_slope_deg": 35.0, "seed_slope_deg": 20.0, "seed_min_area_m2": 5000.0},
    "seed20_0.2ha_45": {"max_water_slope_deg": 45.0, "seed_slope_deg": 20.0, "seed_min_area_m2": 2000.0},
}
LABEL = {
    "current_35": "現行：固定 35°",
    PRIMARY: "起始 20° ≥ 0.2 公頃，延伸到 35°（主要）",
    "seed20_any_35": "起始 20° ≥ 1 像元，延伸到 35°",
    "seed20_0.5ha_35": "起始 20° ≥ 0.5 公頃，延伸到 35°",
    "seed20_0.2ha_45": "起始 20° ≥ 0.2 公頃，延伸到 45°",
}


def run_scenario(job: tuple) -> tuple:
    """一個情境 → {變體: [(pass, 候選結果)]}。"""
    sid, scenario, orbit = job
    out = {v: [] for v in VARIANTS}
    for p, chains, dem, tr, cell, n_later in S.prepare(scenario, orbit, list(VARIANTS),
                                                        kwargs_of=lambda v: VARIANTS[v]):
        for v, ch in chains.items():
            cands = classify(ch["new_water"], ch["landslide"], ch["river"], cell, dem=dem,
                             later_new_water=ch["later_new_water"], transform=tr,
                             min_area_m2=S.BASE["min_area_m2"], river_buffer_px=S.BASE["river_buffer_px"],
                             search_radius_m=S.BASE["search_radius_m"],
                             dam_elev_tolerance_m=S.BASE["dam_elev_tolerance_m"],
                             persistence_iou=S.BASE["persistence_iou"])
            rows = []
            for c in cands:
                d = c.to_dict()
                d["centroidLonLat"] = [round(x, 6) for x in c.centroid_xy]
                rows.append(d)
            out[v].append((p, {"laterScenes": n_later, "candidates": rows}))
    print(f"完成 {sid}", flush=True)
    return sid, out


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) - 1))
    args = ap.parse_args()

    ctx = TR.load_ctx()
    entries = R.load_manifest().get("lakes", {})
    want = [t["scenarioId"] for t in ctx["targets"]] + [TR.NEG]
    meta = {"VARIANTS": VARIANTS, "want": want}

    results = None
    if CACHE.exists():
        with CACHE.open("rb") as f:
            saved = pickle.load(f)
        if saved["meta"] == meta:
            print(f"讀取快取 {CACHE}")
            results = saved["results"]
    if results is None:
        jobs = []
        for sid in want:
            lake = next((t["lakeId"] for t in ctx["targets"] if t["scenarioId"] == sid), None)
            jobs.append((sid, ctx["scenarios"][sid], entries.get(lake, {}).get("pass") or "DESCENDING"))
        results = {v: {} for v in VARIANTS}
        with Pool(args.jobs) as pool:
            for sid, out in pool.imap_unordered(run_scenario, jobs):
                for v in VARIANTS:
                    results[v][sid] = out[v]
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        with CACHE.open("wb") as f:
            pickle.dump({"meta": meta, "results": results}, f)

    stdout = sys.stdout
    sys.stdout = open(os.devnull, "w", encoding="utf-8")    # build_scenario 的進度訊息
    try:
        scored = [{"params": {"variant": v}, **TR.score_results(results[v], ctx)} for v in VARIANTS]
    finally:
        sys.stdout = stdout
    lakes = sorted(scored[0]["lakes"])

    report = {"generated": datetime.now(R.TW).isoformat(timespec="minutes"),
              "note": "scripts/hysteresis_replay.py 產生；超出隨機＝Σ(偵測到 − 隨機命中機率)",
              "primary": PRIMARY, "variants": VARIANTS, "lakes": lakes, "results": []}
    print(f"\n可評估的湖：{len(lakes)}")
    print("變體                                   偵測／隨機  超出   高優先／隨機  其他事件  負案例事件／高")
    for e in scored:
        v = e["params"]["variant"]
        t = TR.totals(e, lakes)
        ex = TR.excess(e, lakes, "all")
        det = sorted(l for l in lakes if e["lakes"][l][0])
        report["results"].append({"variant": v, "label": LABEL[v], "excess": round(ex, 2),
                                  "excessHigh": round(TR.excess(e, lakes, "high"), 2), **t, "detectedLakes": det})
        print(f"{LABEL[v]:34s} {t['detected']:3d}／{t['expectedChance']:4.1f}  {ex:+5.2f}   "
              f"{t['detectedHigh']:3d}／{t['expectedChanceHigh']:4.1f}   {t['otherEvents']:5d}      "
              f"{t['negEvents']}／{t['negHighEvents']}")

    # 各組之間留一：同分時取負案例誤報少、再取表上順序在前（現行優先）
    order = {v: i for i, v in enumerate(VARIANTS)}
    for kind in ("all", "high"):
        i = 0 if kind == "all" else 2
        det = chance = 0.0
        picks = []
        for held in lakes:
            rest = [l for l in lakes if l != held]
            best = min(scored, key=lambda e: (-round(TR.excess(e, rest, kind), 6), e["negHighEvents"],
                                              e["negEvents"], order[e["params"]["variant"]]))
            det += best["lakes"][held][i]
            chance += best["lakes"][held][i + 1]
            picks.append(best["params"]["variant"])
        counts = {v: picks.count(v) for v in VARIANTS if picks.count(v)}
        report[f"loo_{kind}"] = {"detected": int(det), "expectedChance": round(chance, 2),
                                 "excess": round(det - chance, 2), "picks": counts}
        print(f"\n留一（{'全部事件' if kind == 'all' else '只算高優先'}）：{int(det)}／{chance:.1f}，"
              f"超出 {det - chance:+.2f}；各折挑到 " + "、".join(f"{LABEL[v]}×{n}" for v, n in counts.items()))

    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"\n寫入 {OUT}")


if __name__ == "__main__":
    main()
