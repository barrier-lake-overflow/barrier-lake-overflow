#!/usr/bin/env python3
"""
實驗性修改（B1、B2）的執行與比較：用跟正式流程完全相同的參數，對全部案例（馬太鞍溪 2025、
2026 負案例、全清冊回放）各跑一次 analyze_sar_change.py，只多加實驗開關；結果寫到
data/experiments/<name>/，**不覆蓋正式結果**。接著用同一套事件研判算出比較指標，與正式結果並排。

在 code/ 底下：

    python scripts/run_experiment.py --name b1_raytrace --extra=--ray-trace-shadow
    python scripts/run_experiment.py --name b2_vh --with-vh --extra=--use-vh
    python scripts/run_experiment.py --name b1_raytrace --compare-only     # 只重算比較表

產出：data/experiments/<name>/derived/final_*.json、events.js、replay.js、metrics.json，
以及終端機的比較表（正式 vs 實驗）。採用標準見程式修改設計 0.3：全部指標都沒有變差、至少一項變好。
"""

from __future__ import annotations

import argparse
import json
import os
import shlex
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
from typing import Optional

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
from run_sar_series import MAX_WATER_SLOPE_DEG, SEED_SLOPE_DEG  # noqa: E402

S1 = REPO / "data" / "raw" / "sentinel1"
VH = S1 / "vh"
EXP = REPO / "data" / "experiments"
DAM = (121.29752, 23.70061)

# 馬太鞍溪 2025：與 scripts/run_sar_all.bat 相同（結果檔 → 事件後、複核期）
MATAI = {
    "final_0722.json": ("S1_VV_post_matai_an.tif", "S1_VV_post2_matai_an.tif"),
    "final_0728.json": ("S1_VV_post0728_matai_an.tif", "S1_VV_post0803_matai_an.tif"),
    "final_0821.json": ("S1_VV_post0821_matai_an.tif", "S1_VV_post0827_matai_an.tif"),
    "final_0827.json": ("S1_VV_post0827_matai_an.tif", None),
}


def jobs() -> list:
    """每一筆：(結果檔名, analyze_sar_change.py 的參數)。"""
    common = ["--max-water-slope-deg", MAX_WATER_SLOPE_DEG, "--seed-slope-deg", SEED_SLOPE_DEG]
    out = []
    for f, (post, later) in MATAI.items():
        args = ["--pre", str(S1 / "S1_VV_pre_matai_an.tif"), "--post", str(S1 / post),
                "--dem", str(S1 / "NASADEM_matai_an.tif"), "--orbit", "DESCENDING",
                "--lon", str(DAM[0]), "--lat", str(DAM[1]), "--lake-id", "bl071"] + common
        if later:
            args += ["--post-later", str(S1 / later)]
        out.append((f, args))

    manifest = R.load_manifest().get("lakes", {})
    orbit_of = {m["scenarioId"]: m["pass"] for m in manifest.values() if m.get("status") == "ok"}
    for path in sorted(B.SCENARIOS.glob("*.json")):
        sc = json.loads(path.read_text(encoding="utf-8"))
        if sc["id"] == "neg2026_matai_an":
            raw, orbit = S1, "DESCENDING"
        elif sc["id"] in orbit_of:
            raw, orbit = S1 / "replay", orbit_of[sc["id"]]
        else:
            continue
        name = sc["id"]
        days = [p["file"][len(f"final_{name}_"):-len(".json")] for p in sc["passes"]]
        for i, (p, day) in enumerate(zip(sc["passes"], days)):
            args = ["--pre", str(raw / f"S1_VV_{name}_pre.tif"), "--post", str(raw / f"S1_VV_{name}_{day}.tif"),
                    "--dem", str(raw / f"NASADEM_{name}.tif"), "--orbit", orbit,
                    "--lon", str(sc["center"][0]), "--lat", str(sc["center"][1]), "--lake-id", name] + common
            if p.get("recheckTime") and i + 1 < len(days):
                args += ["--post-later", str(raw / f"S1_VV_{name}_{days[i + 1]}.tif")]
            out.append((p["file"], args))
    return out


def with_vh(args: list) -> list:
    """把 --pre/--post/--post-later 的 VV 檔對應到 data/raw/sentinel1/vh/ 的 VH 檔。"""
    vh = lambda p: str(VH / Path(p).name.replace("S1_VV_", "S1_VH_"))  # noqa: E731
    extra = []
    for flag, vflag in (("--pre", "--pre-vh"), ("--post", "--post-vh"), ("--post-later", "--post-later-vh")):
        if flag in args:
            extra += [vflag, vh(args[args.index(flag) + 1])]
    missing = [p for p in extra[1::2] if not Path(p).exists()]
    if missing:
        raise FileNotFoundError(f"缺 VH 影像：{missing[0]}（先跑 scripts/split_vh_exports.py）")
    return args + extra


def with_prior(args: list) -> list:
    """加上一年前基準（與事件前基準同一個資料夾）；該案例沒有一年前影像（2015 年）就不加。"""
    pre = Path(args[args.index("--pre") + 1])
    name = "S1_VV_prior_matai_an.tif" if pre.name == "S1_VV_pre_matai_an.tif" else pre.name.replace("_pre.tif", "_prior.tif")
    p = pre.parent / name
    return args + ["--prior-baseline", str(p)] if p.exists() else args


def run_all(name: str, extra: list, use_vh: bool, workers: int, use_prior: bool = False) -> None:
    derived = EXP / name / "derived"
    derived.mkdir(parents=True, exist_ok=True)
    env = {**os.environ, "PYTHONIOENCODING": "utf-8"}
    todo = jobs()

    def one(job):
        f, args = job
        args = with_vh(args) if use_vh else args
        args = (with_prior(args) if use_prior else args) + extra + ["--out", str(derived / f)]
        r = subprocess.run([sys.executable, str(CODE / "scripts" / "analyze_sar_change.py"), *args],
                           cwd=CODE, env=env, capture_output=True, text=True, encoding="utf-8")
        return f, r.returncode, r.stdout[-400:] + r.stderr[-400:]

    t0 = datetime.now()
    failed = []
    with ThreadPoolExecutor(max_workers=workers) as ex:
        for i, (f, code, log) in enumerate(ex.map(one, todo), 1):
            if code != 0:
                failed.append(f)
                print(f"  失敗 {f}：{log.strip()[-300:]}")
            if i % 20 == 0 or i == len(todo):
                print(f"  {i}/{len(todo)}（{(datetime.now() - t0).seconds // 60} 分）", flush=True)
    if failed:
        raise SystemExit(f"{len(failed)} 筆失敗，不做比較")


MATAI_LAKE_MATCH_M = 500.0


def lake_event_id(snapshots: list, lake_lonlat: Optional[tuple]) -> Optional[str]:
    """
    馬太鞍溪的湖在這次結果裡的事件代號。代號依首次出現順序編，實驗多出或少了候選時會變，
    所以用位置找：最後一次出現時離湖（正式結果 E3 的位置）最近、且在 MATAI_LAKE_MATCH_M 內的事件。
    """
    if lake_lonlat is None:
        return "E3"
    last = {}
    for s in snapshots:
        for e in s["events"]:
            last[e["id"]] = tuple(e["lonLat"])
    best = min(last.items(), key=lambda kv: B.distance_m(kv[1], lake_lonlat), default=None)
    return best[0] if best and B.distance_m(best[1], lake_lonlat) <= MATAI_LAKE_MATCH_M else None


def metrics(derived: Path, out_dir: Path, lake_lonlat: Optional[tuple] = None) -> dict:
    """用正式的事件研判與回放統計算出比較指標。lake_lonlat：馬太鞍溪湖的位置（找事件代號用）。"""
    out_dir.mkdir(parents=True, exist_ok=True)
    built = B.main(B.SCENARIOS, derived, out_dir / "events.js", out_dir / "replay.js")
    t = (out_dir / "replay.js").read_text(encoding="utf-8")
    rep = json.loads(t[t.index("{"):t.rstrip().rstrip(";").rindex("}") + 1])
    rows = rep["rows"]
    by = {s["id"]: s for s in built}

    def last_events(sid):
        snaps = by[sid]["snapshots"] if sid in by else []
        return snaps[-1]["events"] if snaps else []

    matai = by.get("matai_an_2025", {"snapshots": []})
    lake_id = lake_event_id(matai["snapshots"], lake_lonlat)
    e3, lake_pos = {}, None
    for s in matai["snapshots"]:
        for e in s["events"]:
            if e["id"] == lake_id:
                lake_pos = tuple(e["lonLat"])
                for d in e["detections"]:
                    e3[d["passTime"][:5].strip()] = d["areaHectare"]
    matai_others = [e for e in last_events("matai_an_2025") if e["id"] != lake_id]
    matai_high_others = {e["id"] for s in matai["snapshots"] for e in s["events"]
                         if e["id"] != lake_id and e["priority"] == "high"}
    neg = by.get("neg2026_matai_an", {"snapshots": []})
    neg_ids = {e["id"] for s in neg["snapshots"] for e in s["events"]}
    neg_conf = {e["confidence"] for s in neg["snapshots"] for e in s["events"]}
    neg_high = sum(1 for s in neg["snapshots"] if s["counts"]["high"])
    big = next((g for g in rep["bySize"] if g["group"].startswith("≥")), {})
    m = {
        "replayDetected": rep["totals"]["detected"],
        "replayExpectedChance": rep["totals"]["expectedChanceHits"],
        "replayExcess": round(rep["totals"]["detected"] - rep["totals"]["expectedChanceHits"], 1),
        "replayHighAmongDetected": rep["totals"]["highAmongDetected"],
        "replayBigDetected": big.get("detected"),
        "replayOtherEvents": sum(r.get("otherEvents") or 0 for r in rows),
        "replayOtherHigh": sum(r.get("otherHighEvents") or 0 for r in rows),
        "replayDetectedLakes": sorted(r["lakeId"] for r in rows if r["outcome"] == "detected"),
        "mataiLakeEventId": lake_id,
        "mataiLakeLonLat": lake_pos,
        "mataiE3AreaHa": e3,
        "mataiFalsePositives": len(matai_others),
        "mataiFalsePositivesEverHigh": len(matai_high_others),
        "negEvents": len(neg_ids),
        "negConfidences": sorted(neg_conf),
        "negSnapshotsWithHigh": neg_high,
    }
    (out_dir / "metrics.json").write_text(json.dumps(m, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return m


ROWS = [
    ("全清冊回放：偵測到", "replayDetected", +1),
    ("　隨機期望", "replayExpectedChance", 0),
    ("　超出隨機", "replayExcess", +1),
    ("　偵測到且曾列高優先", "replayHighAmongDetected", +1),
    ("　大型湖（≥ 20 萬 m³）", "replayBigDetected", +1),
    ("　窗格內其他事件（誤報上限）", "replayOtherEvents", -1),
    ("　其中高優先", "replayOtherHigh", -1),
    ("馬太鞍溪：誤報", "mataiFalsePositives", -1),
    ("　誤報曾列高優先", "mataiFalsePositivesEverHigh", -1),
    ("2026 負案例：事件數", "negEvents", -1),
    ("　有高優先的時點數", "negSnapshotsWithHigh", -1),
]


def compare(base: dict, exp: dict) -> list:
    """回傳 [(指標, 正式, 實驗, 判斷)]；判斷：變好／變差／相同／參考。"""
    out = []
    for label, key, better in ROWS:
        a, b = base[key], exp[key]
        verdict = "相同" if a == b else ("參考" if better == 0 else
                                         ("變好" if (b - a) * better > 0 else "變差"))
        out.append((label, a, b, verdict))
    out.append(("馬太鞍溪湖的事件代號", base["mataiLakeEventId"], exp["mataiLakeEventId"], "參考"))
    for day, area in sorted(base["mataiE3AreaHa"].items()):
        b = exp["mataiE3AreaHa"].get(day)
        verdict = "相同" if b == area else ("變差" if b is None or b < area else "變好")
        out.append((f"馬太鞍溪湖面積 {day}（公頃，愈大愈接近航照）", area, b, verdict))
    for extra in sorted(set(exp["mataiE3AreaHa"]) - set(base["mataiE3AreaHa"])):
        out.append((f"馬太鞍溪湖面積 {extra}（新出現）", None, exp["mataiE3AreaHa"][extra], "變好"))
    lost = sorted(set(base["replayDetectedLakes"]) - set(exp["replayDetectedLakes"]))
    gained = sorted(set(exp["replayDetectedLakes"]) - set(base["replayDetectedLakes"]))
    out.append(("回放：偵測到的湖變動", "", f"少 {lost or '無'}／多 {gained or '無'}",
                "變差" if lost else ("變好" if gained else "相同")))
    ca, cb = base["negConfidences"], exp["negConfidences"]
    out.append(("2026 負案例：出現過的研判信心", "、".join(ca), "、".join(cb),
                "變差" if "高" in cb and "高" not in ca else ("相同" if ca == cb else "參考")))
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--name", required=True)
    ap.add_argument("--extra", default="", help="加給 analyze_sar_change.py 的實驗參數（例如 --extra=--ray-trace-shadow）")
    ap.add_argument("--with-vh", action="store_true", help="同時傳入 VH 影像（data/raw/sentinel1/vh/）")
    ap.add_argument("--with-prior", action="store_true",
                    help="同時傳入一年前基準（S1_VV_*_prior.tif，與事件前基準同資料夾），A1 崩塌堆積提醒用")
    ap.add_argument("--compare-only", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    if not args.compare_only:
        run_all(args.name, shlex.split(args.extra), args.with_vh, args.workers, args.with_prior)
    base = metrics(B.DERIVED, EXP / "_production")
    exp = metrics(EXP / args.name / "derived", EXP / args.name, lake_lonlat=base["mataiLakeLonLat"])
    rows = compare(base, exp)
    lines = ["| 指標 | 正式 | 實驗 | 判斷 |", "|---|---|---|---|"]
    lines += [f"| {a} | {b} | {c} | {d} |" for a, b, c, d in rows]
    worse = [r for r in rows if r[3] == "變差"]
    better = [r for r in rows if r[3] == "變好"]
    verdict = ("**採用**：全部指標沒有變差，且有變好" if better and not worse else
               "**不採用**：" + ("有指標變差" if worse else "沒有任何指標變好"))
    table = "\n".join(lines) + f"\n\n依採用標準（0.3）：{verdict}\n"
    (EXP / args.name / "comparison.md").write_text(table, encoding="utf-8")
    print("\n" + table)


if __name__ == "__main__":
    main()
