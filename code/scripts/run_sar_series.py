#!/usr/bin/env python3
"""
一個地點的逐期 SAR 影像 → 每期跑 analyze_sar_change.py（下一期當複核）→ 寫事件研判情境。

配合 scripts/gee_export_series_s1.js 的匯出檔名：
    data/raw/sentinel1/S1_VV_<name>_pre.tif
    data/raw/sentinel1/NASADEM_<name>.tif
    data/raw/sentinel1/S1_VV_<name>_YYYYMMDD.tif   （逐期，UTC 日期）

在 code/ 底下執行（預設是 2026 低災年負案例，參數與馬太鞍溪正案例相同）：

    python scripts/run_sar_series.py --name neg2026_matai_an --lon 121.29752 --lat 23.70061 \\
        --scenario-name "馬太鞍溪 · 2026 汛期（負案例）" --kind negative
    python -m pipeline.events.build

產出：data/derived/final_<name>_<YYYYMMDD>.json、data/raw/scenarios/<name>.json。
參數（坡度門檻 35°、D8 填窪）跟 run_sar_all.bat 一致，負案例不另外調。
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
RAW = REPO / "data" / "raw" / "sentinel1"
DERIVED = REPO / "data" / "derived"
SCENARIOS = REPO / "data" / "raw" / "scenarios"

MAX_WATER_SLOPE_DEG = "35"   # 與 run_sar_all.bat 相同，不為負案例調整

# 重跑時從既有情境檔保留的人工整理欄位（說明、外部證據、事後查證等），
# 只有影像期別（passes）與地點等由程式重新產生。
CURATED_KEYS = ("description", "context", "trigger", "externalEvidence", "exposure", "hindsight",
                "observationsLakeId", "referenceLakeId", "referenceLabel", "basemap")


def merge_scenario(new: dict, old: Optional[dict], description_given: bool) -> dict:
    """
    把既有情境檔裡人工整理的欄位併進新產生的情境；passes 的 evidenceImage 依檔名保留。

    >>> old = {"description": "人工說明", "hindsight": [{"text": "誤報"}],
    ...        "passes": [{"file": "a.json", "evidenceImage": "docs/evidence/x.png"}]}
    >>> new = {"description": "自動", "passes": [{"file": "a.json", "evidenceImage": None}]}
    >>> m = merge_scenario(new, old, description_given=False)
    >>> m["description"], m["hindsight"][0]["text"], m["passes"][0]["evidenceImage"]
    ('人工說明', '誤報', 'docs/evidence/x.png')
    >>> merge_scenario(new, old, description_given=True)["description"]
    '自動'
    """
    if not old:
        return new
    out = dict(new)
    for k in CURATED_KEYS:
        if k == "description" and description_given:
            continue
        if old.get(k) not in (None, "", []):
            out[k] = old[k]
    prev = {p["file"]: p for p in old.get("passes", [])}
    out["passes"] = []
    for p in new.get("passes", []):
        q = prev.get(p["file"], {})
        p = {**p, "evidenceImage": p.get("evidenceImage") or q.get("evidenceImage")}
        if q.get("rain") and not p.get("rain"):   # 每日排程補上的過境前雨量
            p["rain"] = q["rain"]
        out["passes"].append(p)
    return out


def scene_files(name: str, raw: Path) -> list:
    """[(YYYYMMDD, path)]，依日期排序。"""
    pat = re.compile(rf"S1_VV_{re.escape(name)}_(\d{{8}})\.tif$")
    out = [(m.group(1), p) for p in raw.glob(f"S1_VV_{name}_*.tif") if (m := pat.search(p.name))]
    return sorted(out)


def pass_time(day: str, hhmm: str) -> datetime:
    return datetime.strptime(f"{day} {hhmm}", "%Y%m%d %H:%M").replace(tzinfo=timezone.utc)


def needs_run(out: Path, has_later: bool, skip_existing: bool) -> bool:
    """
    結果檔要不要（重）跑。skip_existing 時：沒有結果檔要跑；結果檔當時沒有複核期、
    現在有下一期了，也要重跑（不然那一期永遠停在「待複核」）。
    """
    if not skip_existing or not out.exists():
        return True
    if not has_later:
        return False
    try:
        return json.loads(out.read_text(encoding="utf-8")).get("laterScenes", 0) == 0
    except (OSError, ValueError):
        return True


def series_plan(name: str, days: list, skip_existing: bool) -> list:
    """
    回傳要跑偵測的期別 [(day, later_day or None)]。每日排程據此只下載需要的影像。

    >>> series_plan("x_nonexistent", ["20260101", "20260107"], skip_existing=True)
    [('20260101', '20260107'), ('20260107', None)]
    """
    out = []
    for i, day in enumerate(days):
        later = days[i + 1] if i + 1 < len(days) else None
        if needs_run(DERIVED / f"final_{name}_{day}.json", later is not None, skip_existing):
            out.append((day, later))
    return out


def run_series(name: str, lon: float, lat: float, orbit: str, raw_dir: Path,
               pass_times: dict, pre_label: str = "事件前中位數", skip_existing: bool = False,
               days: Optional[list] = None) -> list:
    """
    逐期跑 analyze_sar_change.py（下一期當複核），回傳情境檔的 passes。
    pass_times：{YYYYMMDD: "HH:MM"（UTC）}；沒列到的日期用 "default" 的值。
    skip_existing：結果檔已存在就不重跑（批次中斷後續跑用）；當時沒有複核期的會重跑。
    days：指定期別（YYYYMMDD）；不給就用 raw_dir 裡找得到的影像。指定時只有真的要跑的
          期別需要影像在本機（每日排程在乾淨環境執行，不會留著舊影像）。
    """
    pre = raw_dir / f"S1_VV_{name}_pre.tif"
    dem = raw_dir / f"NASADEM_{name}.tif"
    if days is None:
        scenes = scene_files(name, raw_dir)
    else:
        scenes = [(d, raw_dir / f"S1_VV_{name}_{d}.tif") for d in sorted(days)]
    todo = {d for d, _ in series_plan(name, [d for d, _ in scenes], skip_existing)}
    need = [pre, dem] + [p for i, (d, p) in enumerate(scenes) if d in todo]         + [scenes[i + 1][1] for i, (d, _) in enumerate(scenes) if d in todo and i + 1 < len(scenes)]
    missing = [p for p in need if not p.exists()] if todo else []
    if missing or not scenes:
        raise FileNotFoundError(f"缺少影像：{', '.join(map(str, missing)) or '沒有任何逐期影像'}")

    def when(day):
        return pass_time(day, pass_times.get(day) or pass_times["default"])

    DERIVED.mkdir(parents=True, exist_ok=True)
    passes = []
    for i, (day, path) in enumerate(scenes):
        later = scenes[i + 1] if i + 1 < len(scenes) else None
        t = when(day)
        out = DERIVED / f"final_{name}_{day}.json"
        print(f"[{i + 1}/{len(scenes)}] {day}" + (f" + 複核 {later[0]}" if later else "（無複核期）"))
        if day in todo:
            cmd = [sys.executable, str(CODE / "scripts" / "analyze_sar_change.py"),
                   "--pre", str(pre), "--post", str(path), "--dem", str(dem),
                   "--orbit", orbit, "--lon", str(lon), "--lat", str(lat),
                   "--lake-id", name, "--pre-label", pre_label,
                   "--post-label", f"post {t:%Y-%m-%d %H:%M} UTC",
                   "--max-water-slope-deg", MAX_WATER_SLOPE_DEG, "--out", str(out)]
            if later:
                cmd += ["--post-later", str(later[1])]
            log = out.with_suffix(".log")
            # 輸出導到檔案時，Windows 的 Python 預設用 cp950 編碼，印到「σ⁰」這類字元會
            # UnicodeEncodeError 而回傳失敗（結果檔其實已寫出）。強制子程序用 UTF-8。
            env = {**os.environ, "PYTHONIOENCODING": "utf-8"}
            with open(log, "w", encoding="utf-8") as f:
                r = subprocess.run(cmd, cwd=CODE, stdout=f, stderr=subprocess.STDOUT, env=env)
            if r.returncode != 0:
                print(f"  失敗，見 {log}")
                continue
        passes.append({
            "file": out.name,
            "time": t.isoformat(),
            "recheckTime": when(later[0]).isoformat() if later else None,
            "evidenceImage": None,
        })
    return passes


def write_scenario(scenario: dict, description_given: bool) -> Path:
    """寫情境檔；既有檔案裡人工整理的欄位保留（見 merge_scenario）。"""
    SCENARIOS.mkdir(parents=True, exist_ok=True)
    path = SCENARIOS / f"{scenario['id']}.json"
    old = json.loads(path.read_text(encoding="utf-8")) if path.exists() else None
    scenario = merge_scenario(scenario, old, description_given=description_given)
    if old:
        print("保留既有情境檔中人工整理的欄位（說明、事後查證、外部證據等）")
    path.write_text(json.dumps(scenario, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--name", required=True)
    ap.add_argument("--lon", type=float, required=True)
    ap.add_argument("--lat", type=float, required=True)
    ap.add_argument("--orbit", default="DESCENDING", choices=["ASCENDING", "DESCENDING"])
    ap.add_argument("--pass-time", default="21:52", help="過境時間 HH:MM（UTC），見 GEE Console")
    ap.add_argument("--pre-label", default="事件前中位數")
    ap.add_argument("--scenario-name", required=True)
    ap.add_argument("--kind", default="negative", choices=["positive", "negative"])
    ap.add_argument("--description", default="")
    ap.add_argument("--raw-dir", type=Path, default=RAW)
    args = ap.parse_args()

    try:
        passes = run_series(args.name, args.lon, args.lat, args.orbit, args.raw_dir,
                            {"default": args.pass_time}, args.pre_label)
    except FileNotFoundError as e:
        sys.exit(f"{e}（見 gee_export_series_s1.js）")

    scenario = {
        "id": args.name,
        "name": args.scenario_name,
        "kind": args.kind,
        "description": args.description or f"{len(passes)} 期 Sentinel-1（{args.orbit}），參數與正案例相同。",
        "center": [args.lon, args.lat],
        "windowKm": 4.0,
        "revisitDays": 6 if args.orbit == "DESCENDING" else 12,
        "context": [],
        "observationsLakeId": None,
        "referenceLakeId": None,
        "passes": passes,
    }
    path = write_scenario(scenario, description_given=bool(args.description))
    print(f"已寫出 {path}，接著跑 python -m pipeline.events.build")


if __name__ == "__main__":
    main()
