#!/usr/bin/env python3
"""
全清冊回放（與 2026 負案例）的光學偵測來源：每湖逐期跑光學偵測（pipeline/detect/optical.py），
結果寫 data/derived/final_opt_*.json、情境檔 opticalDetection 欄位，再比較「只有 SAR」「只有光學」
「SAR＋光學」三種做法偵測到幾筆、多快、多出多少誤報，寫到 docs/results/optical_replay.{json,md}。

先下載影像（擇一）：

    python scripts/gee_fetch_optical.py --project <ID>              # 本機能登入 GEE
    python scripts/gee_codeeditor_optical.py → GEE 網頁版 → python scripts/split_optical_exports.py

在 code/ 底下：

    python scripts/optical_replay.py              # 偵測＋寫情境檔＋評分
    python scripts/optical_replay.py --rerun      # 偵測結果已存在也重跑
    python -m pipeline.events.build               # 重產儀表板（events.js、replay.js）

規則見 pipeline/detect/optical.py 檔頭；事件追蹤、優先等級、判定偵測到都與 SAR 回放相同
（events/build.py、triage.py、replay.py summarize_lake）。結論寫在 docs/validation.md。
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import sys
from datetime import date, datetime, time, timedelta
from pathlib import Path
from typing import Optional

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.detect import optical as OD  # noqa: E402
from pipeline.events import build as B  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
from pipeline.events import triage as T  # noqa: E402
from pipeline.ingest.observations import load_observations_table  # noqa: E402

import gee_fetch_optical as F  # noqa: E402
import run_sar_series as S  # noqa: E402

REPO = CODE.parent
RESULTS = REPO / "docs" / "results"
VARIANTS = {"sar": "只有 SAR", "optical": "只有光學", "combined": "SAR＋光學"}


# ── 偵測、寫情境檔 ──

def detection_for(entry: dict, rerun: bool) -> Optional[dict]:
    """一筆湖的光學偵測 → 情境檔 opticalDetection；沒有下載資料回傳 None。"""
    if entry.get("status") != "ok":
        return None
    periods = [s for s in entry.get("scenes", []) if s.get("usable") and s.get("file")]
    passes = OD.run_series(entry["scenarioId"], entry["lon"], entry["lat"], periods, F.RAW, B.DERIVED, rerun)
    return {"preStart": entry["preStart"], "preEnd": entry["preEnd"], "preImages": entry.get("preImages"),
            "scenes": [{"time": s["timeUTC"], "sensor": OD.sensor_label(s["sensor"]), "clearPct": s["clearPct"],
                        "usable": s["usable"]} for s in entry.get("scenes", [])],
            "passes": passes}


def write_detection(sid: str, det: dict) -> Optional[dict]:
    """寫進既有情境檔（保留其他欄位）；情境檔不存在回傳 None。"""
    path = S.SCENARIOS / f"{sid}.json"
    if not path.exists():
        return None
    sc = json.loads(path.read_text(encoding="utf-8"))
    sc["opticalDetection"] = det
    # 情境說明補一句光學偵測（重跑時先拿掉舊的那句）
    desc = re.sub(r"另有光學偵測：[^。]*。", "", sc.get("description", ""))
    sc["description"] = desc + f"另有光學偵測：Sentinel-2／Landsat 晴空過半 {len(det['passes'])} 景，規則見 detect/optical.py。"
    path.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return sc


# ── 三種做法的比較 ──

def variant(sc: dict, kind: str) -> Optional[dict]:
    """依做法組出情境（只在記憶體裡）。"""
    v = copy.deepcopy(sc)
    if kind == "sar":
        v.pop("opticalDetection", None)
    elif kind == "optical":
        v["passes"] = []
    return v if B.scenario_passes(v) else None


def tw_bound(d: str) -> datetime:
    return datetime.combine(date.fromisoformat(d), time(), tzinfo=R.TW)


def clear_stats(entry: dict) -> dict:
    """形成後（到潰決或 60 天）光學有幾景、晴空過半幾景、第一個晴空景在第幾天。"""
    formed = tw_bound(entry["formed"])
    end = formed + timedelta(days=R.POST_AFTER_DAYS)
    if entry.get("breach"):
        end = min(end, tw_bound(entry["breach"]) + timedelta(hours=23, minutes=59))
    after = [s for s in entry.get("scenes", []) if formed <= datetime.fromisoformat(s["timeUTC"]) <= end]
    usable = [s for s in after if s["usable"]]
    first = (round((datetime.fromisoformat(usable[0]["timeUTC"]) - formed).total_seconds() / 86400, 1)
             if usable else None)
    return {"scenesAfter": len(after), "usableAfter": len(usable), "firstUsableLagDays": first}


def pre_formation_events(built: Optional[dict], formed: str) -> int:
    """形成 1 天以前就出現的事件數（平常會不會亂報）。"""
    if not built:
        return 0
    start = tw_bound(formed) - timedelta(days=1)
    return len({c["id"] for s in built["snapshots"] if datetime.fromisoformat(s["asOf"]) < start
                for c in s["events"]})


def negative_summary(built: Optional[dict]) -> dict:
    if not built:
        return {"events": 0, "highEvents": 0, "highSnapshots": 0, "snapshots": 0, "maxConfidence": None}
    worst: dict = {}
    conf = None
    order = ["低", "中", "高"]
    for s in built["snapshots"]:
        for c in s["events"]:
            p = worst.get(c["id"], "low")
            worst[c["id"]] = c["priority"] if T.PRIORITY_RANK[c["priority"]] < T.PRIORITY_RANK[p] else p
            if c.get("confidence") in order and (conf is None or order.index(c["confidence"]) > order.index(conf)):
                conf = c["confidence"]
    return {"events": len(worst), "highEvents": sum(1 for v in worst.values() if v == "high"),
            "highSnapshots": sum(1 for s in built["snapshots"] if s["counts"]["high"] > 0),
            "snapshots": len(built["snapshots"]), "maxConfidence": conf}


def totals(rows: list) -> dict:
    obs = [r for r in rows if r["outcome"] in ("detected", "missed")]
    out = {
        "detected": sum(1 for r in rows if r["outcome"] == "detected"),
        "observable": len(obs),
        "expectedChanceHits": round(sum(r["chanceHitProb"] or 0 for r in obs), 1),
        "highAmongDetected": sum(1 for r in rows if r["maxPriority"] == "high"),
        "otherEvents": sum(r["otherEvents"] for r in rows),
        "otherHighEvents": sum(r["otherHighEvents"] for r in rows),
        "preFormationEvents": sum(r.get("preFormationEvents", 0) for r in rows),
        "bySize": {},
    }
    for g in ("≥ 20 萬 m³", "< 20 萬 m³", "未登載"):
        rs = [r for r in obs if r["sizeGroup"] == g]
        out["bySize"][g] = {"detected": sum(1 for r in rs if r["outcome"] == "detected"), "observable": len(rs),
                            "expectedChance": round(sum(r["chanceHitProb"] or 0 for r in rs), 1)}
    return out


def fmt_lag(r: dict) -> str:
    return f"{r['detectLagDays']:g} 天" if r.get("detectLagDays") is not None else "—"


def write_markdown(res: dict, path: Path) -> None:
    L = ["# 光學偵測來源：全清冊回放比較", "",
         f"產生時間 {res['generated']}，由 `code/scripts/optical_replay.py` 產生，請勿手動編輯。"
         "規則見 `code/pipeline/detect/optical.py` 檔頭；結論寫在 `docs/validation.md`。", "",
         "## 總計", "",
         "| 做法 | 偵測到 | 隨機期望 | 偵測到中曾列高優先 | 同窗格其他事件（高優先） | 形成前就出現的事件 | ≥ 20 萬 m³ | < 20 萬 m³ | 未登載 |",
         "|---|---|---|---|---|---|---|---|---|"]
    for k, label in VARIANTS.items():
        t = res["totals"][k]
        bs = t["bySize"]
        L.append(f"| {label} | {t['detected']}／{t['observable']} | {t['expectedChanceHits']} | {t['highAmongDetected']} | "
                 f"{t['otherEvents']}（{t['otherHighEvents']}） | {t['preFormationEvents']} | "
                 + " | ".join(f"{bs[g]['detected']}／{bs[g]['observable']}（{bs[g]['expectedChance']}）"
                              for g in ("≥ 20 萬 m³", "< 20 萬 m³", "未登載")) + " |")
    n = res["negative"]
    L += ["", "## 2026 負案例（馬太鞍溪同地點汛期）", "",
          "| 做法 | 事件數 | 曾列高優先的事件 | 有高優先的時點／全部時點 | 最高信心 |", "|---|---|---|---|---|"]
    for k, label in VARIANTS.items():
        v = n.get(k)
        if v is None:
            L.append(f"| {label} | 未跑 | | | |")
            continue
        L.append(f"| {label} | {v['events']} | {v['highEvents']} | {v['highSnapshots']}／{v['snapshots']} | {v['maxConfidence'] or '—'} |")
    L += ["", "## 逐湖", "",
          "| 堰塞湖 | 蓄水量（萬 m³） | 形成後光學（晴空過半） | 第一個晴空景 | 只有 SAR | 只有光學 | SAR＋光學 | 合併後最高優先 | 合併後其他事件（高） | 合併碰巧命中機率 |",
          "|---|---|---|---|---|---|---|---|---|---|"]
    for lake in res["lakes"]:
        rs = lake["results"]
        cs = lake["clear"]

        def cell(r):
            return "**偵測到** " + fmt_lag(r) if r["outcome"] == "detected" else {
                "missed": "漏報", "no_pass": "期間無影像", "no_data": "無資料"}.get(r["outcome"], r["outcome"])
        c = rs["combined"]
        L.append(f"| {lake['name']}（{lake['formed'][:4]}） | {lake['volume'] or '—'} | {cs['scenesAfter']}（{cs['usableAfter']}） | "
                 f"{'第 %g 天' % cs['firstUsableLagDays'] if cs['firstUsableLagDays'] is not None else '—'} | "
                 f"{cell(rs['sar'])} | {cell(rs['optical'])} | {cell(c)} | {c['maxPriority'] or '—'} | "
                 f"{c['otherEvents']}（{c['otherHighEvents']}） | "
                 f"{'%d%%' % round(100 * c['chanceHitProb']) if c['chanceHitProb'] is not None else '—'} |")
    path.write_text("\n".join(L) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", nargs="*", default=None, help="只跑這些清冊編號或情境 id（不寫比較報表）")
    ap.add_argument("--rerun", action="store_true", help="偵測結果檔已存在也重跑")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    if not F.MANIFEST.exists():
        sys.exit(f"找不到 {F.MANIFEST}，先下載影像（見檔頭）")
    manifest = json.loads(F.MANIFEST.read_text(encoding="utf-8"))["lakes"]
    lakes_js = read_lakes(B.LAKES_JS)
    observations = load_observations_table()
    sar_manifest = R.load_manifest().get("lakes", {})

    res = {"generated": datetime.now(R.TW).isoformat(timespec="minutes"), "lakes": [], "negative": {}}
    for t in F.targets_all():
        sid = t["scenarioId"]
        if args.only and sid not in args.only and t["lakeId"] not in args.only:
            continue
        print(f"== {sid} {t['name']}")
        entry = {**manifest.get(sid, {}), "lon": t["lon"], "lat": t["lat"]}
        det = None
        try:
            det = detection_for(entry, args.rerun)
        except (FileNotFoundError, ValueError) as e:
            print(f"  光學略過：{e}")
        if det is None and entry.get("status") != "ok":
            print(f"  光學略過：{entry.get('reasonText') or '尚未下載'}")
        sc = write_detection(sid, det) if det is not None else None
        if sc is None:
            path = S.SCENARIOS / f"{sid}.json"
            sc = json.loads(path.read_text(encoding="utf-8")) if path.exists() else None
        if sc is None:
            print("  沒有情境檔，略過")
            continue
        built = {k: (B.build_scenario(v, B.DERIVED, lakes_js, observations) if (v := variant(sc, k)) else None)
                 for k in VARIANTS}
        if t["lakeId"] is None:   # 負案例
            res["negative"] = {k: negative_summary(built[k]) for k in VARIANTS}
            print("  " + "；".join(f"{VARIANTS[k]} 事件 {v['events']}（高 {v['highEvents']}）"
                                   for k, v in res["negative"].items()))
            continue
        rows = {}
        for k in VARIANTS:
            v = variant(sc, k) or {**sc, "passes": [], "opticalDetection": None}
            row = R.summarize_lake(t, built[k], v, sar_manifest.get(t["lakeId"]) if k != "optical" else None)
            row["preFormationEvents"] = pre_formation_events(built[k], t["formed"])
            rows[k] = row
        cs = clear_stats(entry) if entry.get("scenes") else {"scenesAfter": 0, "usableAfter": 0,
                                                              "firstUsableLagDays": None}
        res["lakes"].append({"lakeId": t["lakeId"], "scenarioId": sid, "name": t["name"], "formed": t["formed"],
                             "volume": t.get("volume"), "clear": cs, "opticalPeriods": len((det or {}).get("passes", [])),
                             "results": rows})
        print("  " + "；".join(f"{VARIANTS[k]} {r['outcome']}" + (f" {r['detectLagDays']:g} 天" if r["detectLagDays"] is not None else "")
                               for k, r in rows.items())
              + f"；形成後光學 {cs['scenesAfter']} 景、晴空過半 {cs['usableAfter']} 景")

    res["totals"] = {k: totals([l["results"][k] for l in res["lakes"]]) for k in VARIANTS}
    if args.only:
        print("（--only：只跑部分湖，不寫比較報表）")
    else:
        RESULTS.mkdir(parents=True, exist_ok=True)
        (RESULTS / "optical_replay.json").write_text(json.dumps(res, ensure_ascii=False, indent=1) + "\n",
                                                     encoding="utf-8")
        write_markdown(res, RESULTS / "optical_replay.md")
        print(f"已寫出 {RESULTS / 'optical_replay.md'}")
    for k, label in VARIANTS.items():
        tt = res["totals"][k]
        print(f"{label}：偵測到 {tt['detected']}／{tt['observable']}（隨機期望 {tt['expectedChanceHits']}），"
              f"其他事件 {tt['otherEvents']}（高優先 {tt['otherHighEvents']}）")
    print("接著跑 python -m pipeline.events.build 重產儀表板")


if __name__ == "__main__":
    main()
