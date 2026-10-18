#!/usr/bin/env python3
"""
在全清冊回放的湖上調偵測參數，用留一交叉驗證（leave-one-out）估計「調參」在沒看過的湖上的表現。

    cd code
    python scripts/tune_replay.py                  # → docs/tuning.json、終端機表格
    python scripts/tune_replay.py --jobs 4         # 第 2 步平行處理
    python scripts/tune_replay.py --only inv_bl075 # 只跑一個情境（測試用，不寫檔）

1. 每期影像、每組前處理參數（判水最大坡度 × 崩塌門檻）跑一次 run_sar_chain；每個貼河道外擴值
   跑一次 classify（最小面積取網格最小值），再替每塊候選先算好各搜尋半徑、高程容許值下的
   崩塌條件與跨期 IoU。結果快取在 data/cache/，重跑時不再前處理。
   每期隨機抽 --verify 組（預設 2）參數直接跑 classify，比對組出來的候選是否一致。
2. 網格內每組參數：組出候選，照正式流程串事件、研判、比對清冊壩址（同 sensitivity_replay.py），
   得到每一湖「偵測到與否」與「隨機命中機率」。
3. 目標：超出隨機的偵測數 = Σ(偵測到 − 隨機命中機率)，分「全部事件」「只算高優先」兩種口徑。
   同分時依序取：負案例高優先事件少、負案例事件少、跟現行參數不同的項目少、離現行值近。
4. 留一：每次拿掉一湖，用其餘湖挑參數，再看被拿掉那湖的結果。加總就是調參這個做法在
   沒看過的湖上的表現，可以跟現行參數直接比。全部湖一起挑出的參數另外列出，但它的成績是
   樣本內的，會偏樂觀。

網格是 sensitivity_replay.VARY 各值的全部組合。
"""

from __future__ import annotations

import argparse
import itertools
import json
import math
import os
import pickle
import random
import sys
from collections import Counter
from datetime import datetime
from multiprocessing import Pool
from pathlib import Path

import numpy as np
from scipy import ndimage

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

import sensitivity_replay as S  # noqa: E402
from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.detect.barrier_lake import EIGHT, _area_cell, _grade, _iou_with, _sampling, classify  # noqa: E402
from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
from pipeline.ingest.observations import load_observations_table  # noqa: E402

CACHE = S.REPO / "data" / "cache" / "tune_candidates.pkl"
OUT = S.REPO / "docs" / "tuning.json"
NEG = "neg2026_matai_an"
KEYS = list(S.VARY)
COMPARE = ("grade", "areaHectare", "centroidLonLat", "onRiver", "landslideNearby", "damDownstream",
           "persistent", "landslideAreaHectare", "laterScenesChecked")


def grid() -> list:
    return [dict(zip(KEYS, vals)) for vals in itertools.product(*(S.VARY[k] for k in KEYS))]


def chain_combos() -> list:
    return list(itertools.product(*(S.VARY[k] for k in S.CHAIN_KEYS)))


# 1. 前處理與候選特徵

def precompute(prepared_pass) -> dict:
    """一期影像 → 每組 (坡度, 崩塌門檻, 外擴) 的候選，附各崩塌參數下的條件與跨期 IoU。"""
    p, chains, dem, tr, cell, n_later = prepared_pass
    sampling = _sampling(cell)
    a_cell = _area_cell(cell)
    dem_arr = np.asarray(dem, dtype="float64")
    by_chain = {}
    for combo, ch in chains.items():
        ls = ch["landslide"]
        ls_labeled, _ = ndimage.label(ls, structure=EIGHT)
        # classify 同等級、同面積時依連通塊編號排序；同樣分塊（merge_gap_px 預設 3）取出編號
        groups, _ = ndimage.label(ndimage.binary_dilation(ch["new_water"], EIGHT, iterations=3),
                                  structure=EIGHT)
        for rb in S.VARY["river_buffer_px"]:
            cands = classify(ch["new_water"], ls, ch["river"], cell, dem=dem,
                             later_new_water=ch["later_new_water"], transform=tr,
                             min_area_m2=min(S.VARY["min_area_m2"]), river_buffer_px=rb)
            rows = []
            for c in cands:
                d = c.to_dict()
                d["centroidLonLat"] = [round(v, 6) for v in c.centroid_xy]
                dist = ndimage.distance_transform_edt(~c.mask, sampling=sampling)
                floor = c.lake_floor_m
                ls_by = {}
                for sr in S.VARY["search_radius_m"]:
                    near = ls & (dist <= sr)
                    nearby = bool(near.any())
                    ids = np.unique(ls_labeled[near])
                    ls_full = np.isin(ls_labeled, ids[ids > 0])
                    area = float(ls_full.sum()) * a_cell ** 2
                    ls_low = None
                    if nearby and floor is not None:
                        vals = dem_arr[ls_full]
                        ls_low = float(np.nanmin(vals)) if np.isfinite(vals).any() else math.inf
                    for dt in S.VARY["dam_elev_tolerance_m"]:
                        if nearby and floor is not None:
                            dam = ls_low <= floor + dt
                        elif floor is not None:
                            dam = False
                        else:
                            dam = None
                        ls_by[(sr, dt)] = (nearby, dam, area)
                rows.append({"base": d, "nPx": int(c.mask.sum()), "label": int(groups[c.mask][0]),
                             "ious": [_iou_with(c.mask, m) for m in ch["later_new_water"]], "ls": ls_by})
            by_chain[combo + (rb,)] = rows
    return {"pass": p, "cell": cell, "nLater": n_later, "byChain": by_chain}


def assemble(pc: dict, params: dict) -> dict:
    """組出 params 下這一期的候選，等同直接跑 classify 再轉成 final json 的 candidates。"""
    combo = tuple(params[k] for k in S.CHAIN_KEYS) + (params["river_buffer_px"],)
    a_cell = _area_cell(pc["cell"])
    min_px = max(1, int(math.ceil(params["min_area_m2"] / a_cell ** 2)))
    sr, dt, thr = params["search_radius_m"], params["dam_elev_tolerance_m"], params["persistence_iou"]
    cands = []
    for row in pc["byChain"][combo]:
        if row["nPx"] < min_px:
            continue
        nearby, dam, ls_area = row["ls"][(sr, dt)]
        ious = row["ious"]
        persistent = any(v >= thr for v in ious)
        grade = _grade(True, nearby and dam is not False, persistent)
        reasons = [row["base"]["reasons"][0]]
        if ious:
            reasons.append(f"後續 {len(ious)} 期影像同位置水體 IoU 最高 {max(ious):.2f}"
                           + ("，持續蓄水" if persistent else "，未確認持續"))
        d = dict(row["base"], grade=grade, landslideNearby=nearby, damDownstream=dam, persistent=persistent,
                 landslideAreaHectare=round(ls_area / 1e4, 3), reasons=reasons)
        cands.append((grade, -row["nPx"] * a_cell ** 2, row["label"], d))
    cands.sort(key=lambda x: x[:3])
    out = []
    for i, (*_, d) in enumerate(cands, start=1):
        d["id"] = f"cand{i}"
        out.append(d)
    return {"laterScenes": pc["nLater"], "candidates": out}


def verify(prepared_pass, pc: dict, rng: random.Random, n: int = 2) -> int:
    """隨機抽 n 組參數，直接跑 classify 跟 assemble 比對，回傳不一致的組數。"""
    bad = 0
    for _ in range(n):
        params = {k: rng.choice(v) for k, v in S.VARY.items()}
        direct = S.candidates(prepared_pass, params)["candidates"]
        built = assemble(pc, params)["candidates"]
        if [[c[k] for k in COMPARE] for c in direct] != [[c[k] for k in COMPARE] for c in built]:
            bad += 1
            print(f"  ✗ 不一致：{pc['pass']['file']} {params}", flush=True)
    return bad


def stage1(want: list, scenarios: dict, entries: dict, targets: list, cache: Path, n_verify: int) -> dict:
    meta = {"VARY": S.VARY, "CHAIN_KEYS": S.CHAIN_KEYS, "want": want, "seed": S.SEED_SLOPE_DEG}
    if cache.exists():
        with cache.open("rb") as f:
            saved = pickle.load(f)
        if saved["meta"] == meta:
            print(f"讀取快取 {cache}")
            return saved["pre"]
    combos = chain_combos()
    rng = random.Random(0)
    pre, n_checked, n_bad = {}, 0, 0
    for sid in want:
        sc = scenarios.get(sid)
        if not sc:
            continue
        lake = next((t["lakeId"] for t in targets if t["scenarioId"] == sid), None)
        orbit = entries.get(lake, {}).get("pass") or "DESCENDING"
        print(f"前處理 {sid}（{orbit}）", flush=True)
        pcs = []
        for pp in S.prepare(sc, orbit, combos):
            pc = precompute(pp)
            n_bad += verify(pp, pc, rng, n_verify)
            n_checked += n_verify
            pcs.append(pc)
        pre[sid] = pcs
    print(f"比對直接跑 classify：{n_checked} 組中 {n_bad} 組不一致", flush=True)
    if n_bad:
        raise SystemExit("組出的候選跟 classify 不一致，停止")
    cache.parent.mkdir(parents=True, exist_ok=True)
    with cache.open("wb") as f:
        pickle.dump({"meta": meta, "pre": pre}, f)
    return pre


# 2. 每組參數的回放成績

_W: dict = {}


def load_ctx(only: list = ()) -> dict:
    lakes = read_lakes(CODE / "dashboard" / "data" / "lakes.js")
    targets = R.select_targets(lakes)[0]
    if only:
        targets = [t for t in targets if t["scenarioId"] in only]
    return {"lakes": lakes, "obs": load_observations_table(), "targets": targets,
            "manifest": R.load_manifest(),
            "scenarios": {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in B.SCENARIOS.glob("*.json")}}


def _init(cache: Path, only: list) -> None:
    sys.stdout = open(os.devnull, "w", encoding="utf-8")    # build_scenario 的進度訊息
    with cache.open("rb") as f:
        _W["pre"] = pickle.load(f)["pre"]
    _W["ctx"] = load_ctx(only)


def score(params: dict) -> dict:
    pre = _W["pre"]
    results = {sid: [(pc["pass"], assemble(pc, params)) for pc in pcs] for sid, pcs in pre.items()}
    return {"params": params, **score_results(results, _W["ctx"])}


def score_results(results: dict, ctx: dict) -> dict:
    """results：{情境 id: [(pass, {"laterScenes", "candidates"})]} → 每湖成績與負案例事件數。"""
    orig = B.load_passes
    B.load_passes = lambda scenario, derived: results.get(scenario["id"], [])
    try:
        built = [b for sid in results
                 if (b := B.build_scenario(ctx["scenarios"][sid], lakes=ctx["lakes"], observations=ctx["obs"]))]
    finally:
        B.load_passes = orig
    replay = [b for b in built if b["id"] != NEG]
    rows = R.summarize(ctx["targets"], [], 0, replay, ctx["scenarios"], ctx["manifest"])["rows"]
    rows_high = R.summarize(ctx["targets"], [], 0, S.high_only(replay), ctx["scenarios"], ctx["manifest"])["rows"]
    high = {r["lakeId"]: r for r in rows_high}
    lakes = {}
    for r in rows:
        if r["outcome"] not in ("detected", "missed"):
            continue
        h = high[r["lakeId"]]
        lakes[r["lakeId"]] = (int(r["outcome"] == "detected"), r["chanceHitProb"] or 0.0,
                              int(h["outcome"] == "detected"), h["chanceHitProb"] or 0.0)
    neg = next((b for b in built if b["id"] == NEG), None)
    neg_events = neg_high = 0
    if neg:
        ids, hi = set(), set()
        for s in neg["snapshots"]:
            for e in s["events"]:
                ids.add(e["id"])
                if e["priority"] == "high":
                    hi.add(e["id"])
        neg_events, neg_high = len(ids), len(hi)
    return {"lakes": lakes, "otherEvents": sum(r["otherEvents"] for r in rows),
            "negEvents": neg_events, "negHighEvents": neg_high}


# 3–4. 挑參數與留一

def excess(entry: dict, lakes, kind: str) -> float:
    i = 0 if kind == "all" else 2
    return sum(entry["lakes"][l][i] - entry["lakes"][l][i + 1] for l in lakes)


def distance_from_base(params: dict) -> tuple:
    changed = sum(params[k] != S.BASE[k] for k in KEYS)
    steps = sum(abs(S.VARY[k].index(params[k]) - S.VARY[k].index(S.BASE[k])) for k in KEYS)
    return changed, steps


def pick(entries: list, lakes, kind: str) -> dict:
    return min(entries, key=lambda e: (-round(excess(e, lakes, kind), 6), e["negHighEvents"],
                                       e["negEvents"], distance_from_base(e["params"])))


def totals(entry: dict, lakes) -> dict:
    v = [entry["lakes"][l] for l in lakes]
    return {"detected": sum(x[0] for x in v), "expectedChance": round(sum(x[1] for x in v), 2),
            "detectedHigh": sum(x[2] for x in v), "expectedChanceHigh": round(sum(x[3] for x in v), 2),
            "otherEvents": entry["otherEvents"], "negEvents": entry["negEvents"],
            "negHighEvents": entry["negHighEvents"]}


def loo(entries: list, lakes: list, kind: str) -> dict:
    i = 0 if kind == "all" else 2
    folds, det, chance = [], 0, 0.0
    for held in lakes:
        best = pick(entries, [l for l in lakes if l != held], kind)
        d, c = best["lakes"][held][i], best["lakes"][held][i + 1]
        det += d
        chance += c
        folds.append({"heldOut": held, "params": best["params"], "detected": d, "chance": c})
    stability = {k: dict(Counter(str(f["params"][k]) for f in folds)) for k in KEYS}
    return {"detected": det, "expectedChance": round(chance, 2), "excess": round(det - chance, 2),
            "folds": folds, "stability": stability}


def fmt(params: dict) -> str:
    return "、".join(f"{S.LABEL[k]} {params[k]:g}" for k in KEYS if params[k] != S.BASE[k]) or "（同現行）"


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) - 1))
    ap.add_argument("--only", default="", help="只跑這些情境（逗號分隔，測試用，不寫 docs/tuning.json）")
    ap.add_argument("--verify", type=int, default=2, help="每期抽幾組參數跟直接跑 classify 比對")
    args = ap.parse_args()
    only = [s for s in args.only.split(",") if s]

    lakes_list = read_lakes(CODE / "dashboard" / "data" / "lakes.js")
    targets = R.select_targets(lakes_list)[0]
    manifest = R.load_manifest()
    scenarios = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in B.SCENARIOS.glob("*.json")}
    want = only or [t["scenarioId"] for t in targets] + [NEG]
    cache = CACHE.with_name("tune_candidates_test.pkl") if only else CACHE
    stage1(want, scenarios, manifest.get("lakes", {}), targets, cache, args.verify)

    params_list = grid()
    print(f"評分 {len(params_list)} 組參數（{args.jobs} 個行程）", flush=True)
    entries = []
    with Pool(args.jobs, initializer=_init, initargs=(cache, only)) as pool:
        for i, e in enumerate(pool.imap(score, params_list, chunksize=8), start=1):
            entries.append(e)
            if i % 200 == 0 or i == len(params_list):
                print(f"  {i}/{len(params_list)}", flush=True)

    base = next(e for e in entries if e["params"] == S.BASE)
    lakes = sorted(base["lakes"])
    report = {"generated": datetime.now(R.TW).isoformat(timespec="minutes"),
              "note": "scripts/tune_replay.py 產生；目標＝Σ(偵測到 − 隨機命中機率)，留一交叉驗證",
              "lakes": lakes, "grid": S.VARY, "gridSize": len(entries),
              "base": {"params": S.BASE, **totals(base, lakes)}}
    print(f"\n可評估的湖：{len(lakes)}")
    print(f"現行參數：偵測 {totals(base, lakes)['detected']}／隨機 {totals(base, lakes)['expectedChance']:.1f}"
          f"，高優先 {totals(base, lakes)['detectedHigh']}／{totals(base, lakes)['expectedChanceHigh']:.1f}"
          f"，負案例 {base['negEvents']}／{base['negHighEvents']}")
    for kind, name in (("all", "全部事件"), ("high", "只算高優先")):
        best = pick(entries, lakes, kind)
        cv = loo(entries, lakes, kind)
        base_ex = excess(base, lakes, kind)
        top = sorted(entries, key=lambda e: (-round(excess(e, lakes, kind), 6), e["negHighEvents"],
                                             e["negEvents"], distance_from_base(e["params"])))[:20]
        report[kind] = {
            "baseExcess": round(base_ex, 2),
            "best": {"params": best["params"], "excess": round(excess(best, lakes, kind), 2), **totals(best, lakes)},
            "looExcess": cv["excess"], "loo": cv,
            "top": [{"params": e["params"], "excess": round(excess(e, lakes, kind), 2), **totals(e, lakes)}
                    for e in top],
        }
        t = totals(best, lakes)
        print(f"\n【{name}】超出隨機：現行 {base_ex:+.2f}；全部湖一起挑 {excess(best, lakes, kind):+.2f}（樣本內）；"
              f"留一 {cv['excess']:+.2f}（{cv['detected']}／{cv['expectedChance']:.1f}）")
        print(f"  全部湖一起挑出的參數：{fmt(best['params'])}")
        print(f"  該組：偵測 {t['detected']}／{t['expectedChance']:.1f}，高優先 {t['detectedHigh']}／"
              f"{t['expectedChanceHigh']:.1f}，其他事件 {t['otherEvents']}，負案例 {t['negEvents']}／{t['negHighEvents']}")
        print("  留一各折挑到的值（次數）：")
        for k in KEYS:
            print(f"    {S.LABEL[k]:16s} " + "  ".join(f"{v}×{n}" for v, n in sorted(cv["stability"][k].items())))

    if only:
        print("\n（--only 測試，不寫檔）")
        return
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"\n寫入 {OUT}")


if __name__ == "__main__":
    main()
