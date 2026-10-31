#!/usr/bin/env python3
"""
A1 崩塌堆積提醒（第二版）的門檻：看「候選落在既有崩塌堆積區的比例」（oldLandslidePct）在真湖與
誤報上的分布。既有崩塌堆積區 = 一年前基準 → 事件前基準之間新出現的崩塌（run_sar_chain 的 prior_db）。

門檻規則（看結果前就訂好，與第一版相同）：T 取「所有已確認的真湖都不會被提醒」的最小值，也就是
真湖最大值往上取到下一個 5% 刻度；再檢查 2026 負案例 E1 與 2025 馬太鞍溪的誤報有沒有被提醒到。
E1 提醒不到就不上線。

分組：
    真湖     馬太鞍溪的湖；全清冊回放判為偵測到的事件（保守：其中可能有碰巧命中，當成真湖會讓 T 偏高）
    已知誤報 2026 負案例全部事件（E1 已用 Sentinel-2 查證不是水）；2025 馬太鞍溪湖以外的事件
    其他     全清冊回放窗格內的其他事件（大多是誤報，但沒有查證）

在 code/ 底下（先跑 run_experiment.py --name a1_prior --with-prior）：

    python scripts/old_landslide_threshold.py --derived ../data/experiments/a1_prior/derived
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))

from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402

MATAI_LAKE = (121.29752, 23.70061)   # 用位置找湖：最後一次出現離壩址 600 m 內、面積最大的事件
NEGATIVE = "neg2026_matai_an"


def detected_events(replay_js: Path) -> dict:
    t = replay_js.read_text(encoding="utf-8")
    rows = json.loads(t[t.index("{"):t.rstrip().rstrip(";").rindex("}") + 1])["rows"]
    out: dict = {}
    for r in rows:
        if r.get("outcome") == "detected" and r.get("eventId") and r["lakeId"] != "bl071":
            out.setdefault(R.scenario_id(r["lakeId"]), set()).add(r["eventId"])
    return out


def collect(derived: Path, replay_js: Path) -> list:
    true_ids = detected_events(replay_js)
    rows = []
    for path in sorted(B.SCENARIOS.glob("*.json")):
        sc = json.loads(path.read_text(encoding="utf-8"))
        if sc.get("kind") == "live":
            continue
        events = B.track(B.load_passes(sc, derived))
        lake = None
        if sc["id"] == "matai_an_2025":
            near = [e for e in events if B.distance_m(e["detections"][-1].lon_lat, MATAI_LAKE) <= 600]
            lake = max(near, key=lambda e: max(d.area_ha for d in e["detections"]))["id"] if near else None
        for ev in events:
            if sc["id"] == NEGATIVE or (sc["id"] == "matai_an_2025" and ev["id"] != lake):
                group = "known_false"
            elif ev["id"] == lake or ev["id"] in true_ids.get(sc["id"], set()):
                group = "true_lake"
            else:
                group = "other"
            for d in ev["detections"]:
                pct = d.cand.get("oldLandslidePct")
                rows.append({"scenario": sc["id"], "event": ev["id"], "group": group,
                             "pass": d.pass_time.isoformat()[:10], "areaHa": d.area_ha, "pct": pct})
    return rows


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--derived", default=str(CODE.parent / "data" / "experiments" / "a1_prior" / "derived"))
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    derived = Path(args.derived)
    rows = collect(derived, derived.parent / "replay.js")
    no_prior = sorted({r["scenario"] for r in rows if r["pct"] is None})
    rows = [r for r in rows if r["pct"] is not None]
    by = {g: [r for r in rows if r["group"] == g] for g in ("true_lake", "known_false", "other")}
    for g, rs in by.items():
        v = sorted(r["pct"] for r in rs)
        print(f"{g}: {len(rs)} 筆偵測" + (f"，oldLandslidePct {v[0]}～{v[-1]}" if v else ""))
        if g != "other":
            for r in sorted(rs, key=lambda r: -r["pct"]):
                print(f"   {r['scenario']:<18} {r['event']:<4} {r['pass']}  {r['areaHa']:6.2f} ha  {r['pct']:5.1f}%")
    if no_prior:
        print(f"沒有一年前基準（不加提醒）：{' '.join(no_prior)}")

    true_max = max(r["pct"] for r in by["true_lake"])
    t = math.floor(true_max / 5.0) * 5.0 + 5.0
    hit = lambda rs: [r for r in rs if r["pct"] >= t]  # noqa: E731
    e1 = [r for r in by["known_false"] if r["scenario"] == NEGATIVE]
    fp25 = [r for r in by["known_false"] if r["scenario"] == "matai_an_2025"]
    summary = {
        "trueLakeMaxPct": true_max, "thresholdPct": t,
        "trueLakeFlagged": len(hit(by["true_lake"])),
        "neg2026E1": f"{len(hit(e1))}／{len(e1)} 筆偵測被提醒",
        "fp2025": f"{len(hit(fp25))}／{len(fp25)} 筆偵測被提醒",
        "otherEvents": f"{len(hit(by['other']))}／{len(by['other'])} 筆偵測被提醒",
        "ship": bool(hit(e1)) and t <= 100.0,
        "scenariosWithoutPrior": no_prior,
    }
    print("\n" + json.dumps(summary, ensure_ascii=False, indent=1))
    out = CODE.parent / "docs" / "results" / "old_landslide_threshold.json"
    out.write_text(json.dumps({"summary": summary, "detections": rows}, ensure_ascii=False, indent=1) + "\n",
                   encoding="utf-8")
    print(f"寫出 {out}")


if __name__ == "__main__":
    main()
