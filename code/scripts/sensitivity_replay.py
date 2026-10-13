#!/usr/bin/env python3
"""
參數敏感度分析：全清冊回放＋負案例，每次只動一個參數，看「偵測數」比「隨機命中期望值」多多少。

    cd code
    python scripts/sensitivity_replay.py                  # → docs/sensitivity.json、終端機表格

用本機已下載的回放影像（data/raw/sentinel1/replay/、馬太鞍溪正負案例），不重新下載；
不覆寫 data/derived/ 的結果檔，也不改儀表板。

- 每一期影像的前處理（濾波、判水、河網）只做一次；崩塌門檻每個值各做一次；
  其餘參數（最小面積、崩塌搜尋半徑、壩體高程容許值、持續 IoU）只重跑 classify。
- 每組參數的候選照正式流程串成事件、研判優先等級（build.build_scenario），
  再用 replay.summarize 算偵測數與隨機基準，口徑與儀表板「全清冊回放」完全相同。
- 「高優先」欄：只保留研判為高優先的事件，重算偵測數與隨機基準。
- 負案例欄：2026 汛期馬太鞍溪（清冊沒有新湖）整季出現的事件數／高優先事件數，越少越好。

這是看過回放結果之後做的分析，用來說明門檻的敏感程度，不是用來挑參數。
"""

from __future__ import annotations

import copy
import json
import sys
from datetime import datetime
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from analyze_ndwi_change import crop_window  # noqa: E402
from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.detect.barrier_lake import classify, run_sar_chain  # noqa: E402
from pipeline.detect.landslide import LANDSLIDE_THRESHOLD_DB  # noqa: E402
from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
from pipeline.ingest.observations import load_observations_table  # noqa: E402
from pipeline.preprocess.mask import S1_LOOK_AZIMUTH_DEG  # noqa: E402
from pipeline.preprocess.sar import cell_size_xy_m, load_s1_geotiff  # noqa: E402

REPO = CODE.parent
S1 = REPO / "data" / "raw" / "sentinel1"
OUT = REPO / "docs" / "sensitivity.json"
MAX_WATER_SLOPE_DEG = 35.0   # 與 run_sar_series.py 相同
HALF_WIDTH_KM = 2.0

BASE = {"min_area_m2": 5000.0, "search_radius_m": 500.0, "dam_elev_tolerance_m": 5.0,
        "persistence_iou": 0.3, "landslide_threshold_db": LANDSLIDE_THRESHOLD_DB}
VARY = {
    "min_area_m2": [2000.0, 5000.0, 10000.0, 20000.0],
    "search_radius_m": [200.0, 500.0, 1000.0],
    "dam_elev_tolerance_m": [0.0, 5.0, 20.0],
    "persistence_iou": [0.1, 0.3, 0.5],
    "landslide_threshold_db": [2.0, 3.0, 4.0],
}
LABEL = {"min_area_m2": "最小面積（m²）", "search_radius_m": "崩塌搜尋半徑（m）",
         "dam_elev_tolerance_m": "壩體高程容許值（m）", "persistence_iou": "持續 IoU",
         "landslide_threshold_db": "崩塌門檻（dB）"}

# 馬太鞍溪正案例的影像檔名沿用早期手動匯出（見 scripts/run_sar_all.bat）
MATAI_AN = {"final_0722.json": ("S1_VV_post_matai_an.tif", "S1_VV_post2_matai_an.tif"),
            "final_0728.json": ("S1_VV_post0728_matai_an.tif", "S1_VV_post0803_matai_an.tif"),
            "final_0821.json": ("S1_VV_post0821_matai_an.tif", "S1_VV_post0827_matai_an.tif"),
            "final_0827.json": ("S1_VV_post0827_matai_an.tif", None)}


def pass_rasters(scenario: dict, orbit: str) -> list:
    """[(pass, pre, post, later or None, dem, orbit)]，找不到影像的期別略過。"""
    sid = scenario["id"]
    out = []
    if sid == "matai_an_2025":
        for p in scenario["passes"]:
            post, later = MATAI_AN[p["file"]]
            out.append((p, S1 / "S1_VV_pre_matai_an.tif", S1 / post, S1 / later if later else None,
                        S1 / "NASADEM_matai_an.tif"))
        return out
    raw = S1 / "replay" if sid.startswith("inv_") else S1
    days = [p["file"][len(f"final_{sid}_"):-5] for p in scenario["passes"]]
    for i, p in enumerate(scenario["passes"]):
        later = raw / f"S1_VV_{sid}_{days[i + 1]}.tif" if p.get("recheckTime") and i + 1 < len(days) else None
        out.append((p, raw / f"S1_VV_{sid}_pre.tif", raw / f"S1_VV_{sid}_{days[i]}.tif", later,
                    raw / f"NASADEM_{sid}.tif"))
    return [x for x in out if all(f.exists() for f in (x[1], x[2], x[4]) + ((x[3],) if x[3] else ()))]


def prepare(scenario: dict, orbit: str, thresholds: list) -> list:
    """每期一次前處理；回傳 [(pass, {崩塌門檻: chain 結果}, dem, transform, cell, later 數)]。"""
    lon, lat = scenario["center"]
    out = []
    for p, pre, post, later, dem_path in pass_rasters(scenario, orbit):
        scenes = [load_s1_geotiff(str(pre)), load_s1_geotiff(str(post))]
        if later:
            scenes.append(load_s1_geotiff(str(later)))
        dem = load_s1_geotiff(str(dem_path))
        wins = []
        for sc in scenes:
            win, row0, col0 = crop_window(sc, lon, lat, HALF_WIDTH_KM, key="db")
            wins.append(win)
        dem_win = crop_window(dem, lon, lat, HALF_WIDTH_KM, key="db")[0]
        a, b, c, d, e, f = scenes[0]["transform"]
        tr = (a, b, c + col0 * a + row0 * b, d, e, f + col0 * d + row0 * e)
        cell = cell_size_xy_m(scenes[0]["transform"], True, center_lat=lat)
        chains = {}
        for thr in thresholds:
            r = run_sar_chain(wins[0], wins[1], cell, dem=dem_win, later_post_dbs=wins[2:], transform=tr,
                              look_azimuth_deg=S1_LOOK_AZIMUTH_DEG[orbit], landslide_threshold_db=thr,
                              max_water_slope_deg=MAX_WATER_SLOPE_DEG, min_area_m2=1e12)   # 不分類，只要中間結果
            chains[thr] = {k: r[k] for k in ("new_water", "river", "later_new_water")}
            chains[thr]["landslide"] = r["landslides"].mask
        out.append((p, chains, dem_win, tr, cell, len(wins) - 2))
    return out


def candidates(prepared_pass, params: dict) -> dict:
    p, chains, dem, tr, cell, n_later = prepared_pass
    ch = chains[params["landslide_threshold_db"]]
    cands = classify(ch["new_water"], ch["landslide"], ch["river"], cell, dem=dem,
                     later_new_water=ch["later_new_water"], transform=tr,
                     min_area_m2=params["min_area_m2"], search_radius_m=params["search_radius_m"],
                     dam_elev_tolerance_m=params["dam_elev_tolerance_m"],
                     persistence_iou=params["persistence_iou"])
    out = []
    for c in cands:
        d = c.to_dict()
        d["centroidLonLat"] = [round(v, 6) for v in c.centroid_xy]
        out.append(d)
    return {"laterScenes": n_later, "candidates": out}


def high_only(built: list) -> list:
    out = copy.deepcopy(built)
    for b in out:
        for s in b["snapshots"]:
            s["events"] = [e for e in s["events"] if e["priority"] == "high"]
    return out


def evaluate(prepared: dict, scenarios: dict, params: dict, ctx: dict) -> dict:
    results = {sid: [(pp[0], candidates(pp, params)) for pp in passes] for sid, passes in prepared.items()}
    orig = B.load_passes
    B.load_passes = lambda scenario, derived: results.get(scenario["id"], [])
    try:
        built = [b for sid in prepared
                 if (b := B.build_scenario(scenarios[sid], lakes=ctx["lakes"], observations=ctx["obs"]))]
    finally:
        B.load_passes = orig
    replay = [b for b in built if b["id"] != "neg2026_matai_an"]
    s_all = R.summarize(ctx["targets"], [], 0, replay, scenarios, ctx["manifest"])
    s_high = R.summarize(ctx["targets"], [], 0, high_only(replay), scenarios, ctx["manifest"])
    neg = next((b for b in built if b["id"] == "neg2026_matai_an"), None)
    neg_events = neg_high = None
    if neg:
        ids, high = set(), set()
        for s in neg["snapshots"]:
            for e in s["events"]:
                ids.add(e["id"])
                if e["priority"] == "high":
                    high.add(e["id"])
        neg_events, neg_high = len(ids), len(high)
    tot = s_all["totals"]
    return {
        "params": params,
        "detected": tot["detected"], "observable": tot["observable"],
        "expectedChance": tot["expectedChanceHits"],
        "detectedHigh": s_high["totals"]["detected"], "expectedChanceHigh": s_high["totals"]["expectedChanceHits"],
        "otherEvents": sum(r["otherEvents"] for r in s_all["rows"]),
        "negEvents": neg_events, "negHighEvents": neg_high,
        "detectedLakes": sorted(r["lakeId"] for r in s_all["rows"] if r["outcome"] == "detected"),
        "detectedHighLakes": sorted(r["lakeId"] for r in s_high["rows"] if r["outcome"] == "detected"),
    }


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    lakes = read_lakes(CODE / "dashboard" / "data" / "lakes.js")
    targets = R.select_targets(lakes)[0]
    manifest = R.load_manifest()
    entries = manifest.get("lakes", {})
    scenarios = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in B.SCENARIOS.glob("*.json")}
    ctx = {"lakes": lakes, "obs": load_observations_table(), "targets": targets, "manifest": manifest}

    want = [t["scenarioId"] for t in targets] + ["neg2026_matai_an"]
    thresholds = VARY["landslide_threshold_db"]
    prepared = {}
    for sid in want:
        sc = scenarios.get(sid)
        if not sc:
            continue
        lake = next((t["lakeId"] for t in targets if t["scenarioId"] == sid), None)
        orbit = entries.get(lake, {}).get("pass") or "DESCENDING"
        print(f"前處理 {sid}（{orbit}）", flush=True)
        prepared[sid] = prepare(sc, orbit, thresholds)

    runs = [("基準", None, evaluate(prepared, scenarios, BASE, ctx))]
    for key, values in VARY.items():
        for v in values:
            if v == BASE[key]:
                continue
            params = {**BASE, key: v}
            runs.append((LABEL[key], v, evaluate(prepared, scenarios, params, ctx)))

    print("\n參數                      值        偵測／期望(隨機)  高優先偵測／期望  其他事件  負案例事件／高")
    for name, v, r in runs:
        val = "" if v is None else f"{v:g}"
        print(f"{name:20s} {val:>8s}   {r['detected']:2d}／{r['expectedChance']:4.1f}"
              f"        {r['detectedHigh']:2d}／{r['expectedChanceHigh']:4.1f}"
              f"      {r['otherEvents']:4d}      {r['negEvents']}／{r['negHighEvents']}")

    OUT.write_text(json.dumps({
        "generated": datetime.now(R.TW).isoformat(timespec="minutes"),
        "note": "scripts/sensitivity_replay.py 產生；每次只動一個參數，其餘維持基準值",
        "base": BASE,
        "runs": [{"name": n, "value": v, **r} for n, v, r in runs],
    }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"\n寫入 {OUT}")


if __name__ == "__main__":
    main()
