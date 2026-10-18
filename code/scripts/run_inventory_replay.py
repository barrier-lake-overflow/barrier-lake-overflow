#!/usr/bin/env python3
"""
全清冊回放：依 data/raw/replay_manifest.json，每湖逐期跑偵測、寫情境檔。

先跑 scripts/gee_fetch_inventory.py 下載影像。在 code/ 底下執行：

    python scripts/run_inventory_replay.py              # 全部
    python scripts/run_inventory_replay.py --only bl065
    python scripts/run_inventory_replay.py --rerun      # 結果檔已存在也重跑
    python -m pipeline.events.build                     # 回放＋統計

參數與馬太鞍溪正案例、負案例完全相同（坡度 35°、起始坡度 20°、D8 填窪），不逐湖調整。
情境檔 data/raw/scenarios/inv_<lakeId>.json；重跑時保留人工整理的欄位（事後查證等）。
"""

from __future__ import annotations

import argparse
import statistics
import sys
from datetime import datetime
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
import run_sar_series as S  # noqa: E402

RAW = CODE.parent / "data" / "raw" / "sentinel1" / "replay"
LAKES_JS = CODE / "dashboard" / "data" / "lakes.js"


def revisit_days(scenes: list) -> int:
    """逐期影像的典型間隔（中位數，天）。

    >>> revisit_days([{"day": "20250722"}, {"day": "20250728"}, {"day": "20250803"}, {"day": "20250815"}])
    6
    """
    days = [datetime.strptime(s["day"], "%Y%m%d") for s in scenes]
    gaps = [(b - a).days for a, b in zip(days, days[1:])]
    return int(statistics.median(gaps)) if gaps else 12


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", nargs="*", default=None)
    ap.add_argument("--rerun", action="store_true", help="結果檔已存在也重跑")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    manifest = R.load_manifest().get("lakes", {})
    if not manifest:
        sys.exit("找不到 data/raw/replay_manifest.json，先跑 scripts/gee_fetch_inventory.py")
    targets = {t["lakeId"]: t for t in R.select_targets(read_lakes(LAKES_JS))[0]}

    done, failed = 0, []
    for lake_id, m in manifest.items():
        if args.only and lake_id not in args.only:
            continue
        if m.get("status") != "ok" or lake_id not in targets:
            continue
        t = targets[lake_id]
        side = "降軌" if m["pass"] == "DESCENDING" else "升軌"
        print(f"== {lake_id} {t['name']}（形成 {t['formed']}，{side} {m['orbit']}）")
        times = {s["day"]: s["timeUTC"] for s in m["scenes"]}
        times["default"] = m["scenes"][0]["timeUTC"]
        try:
            passes = S.run_series(m["scenarioId"], t["lon"], t["lat"], m["pass"], RAW, times,
                                  skip_existing=not args.rerun)
        except FileNotFoundError as e:
            print(f"  略過：{e}")
            failed.append(lake_id)
            continue
        vol = f"，清冊蓄水量 {t['volume']:g} 萬 m³" if t.get("volume") else ""
        scenario = {
            "id": m["scenarioId"],
            "name": f"{t['name']} · {t['formed'][:4]}",
            "kind": "replay",
            "description": (f"全清冊回放：清冊登載 {t['formed']} 形成{vol}。以清冊壩址為中心 4 km 窗格，"
                            f"Sentinel-1 {side} {m['orbit']} 共 {len(passes)} 期（形成前 {R.POST_BEFORE_DAYS} 天到"
                            f"形成後 {R.POST_AFTER_DAYS} 天），參數與馬太鞍溪相同，未逐湖調整。"),
            "center": [t["lon"], t["lat"]],
            "windowKm": 4.0,
            "revisitDays": revisit_days(m["scenes"]),
            "orbitLabel": f"{side} {m['orbit']}",
            "trigger": {"label": "清冊登載形成日", "time": f"{t['formed']}T00:00:00+08:00",
                        "source": "農村水保署堰塞湖清冊"},
            "context": [],
            "observationsLakeId": lake_id,
            "referenceLakeId": lake_id,
            "referenceLabel": "清冊壩址（事後登載，僅供對照）",
            "passes": passes,
        }
        S.write_scenario(scenario, description_given=True)
        done += 1
    print(f"完成 {done} 筆" + (f"，缺影像 {len(failed)} 筆：{' '.join(failed)}" if failed else "")
          + "。接著跑 python -m pipeline.events.build")


if __name__ == "__main__":
    main()
