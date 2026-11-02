#!/usr/bin/env python3
"""
光學偵測來源的全清冊回放影像：每一筆湖（加上 2026 負案例）從 Google Earth Engine 下載
Sentinel-2／Landsat 8/9 的判水結果到本機，給 scripts/optical_replay.py 偵測與評分。

本機無法登入 GEE 時改用網頁版：scripts/gee_codeeditor_optical.py → GEE Code Editor →
scripts/split_optical_exports.py（同一套規則，產出相同格式的檔案與 manifest）。

規則（GEE 端與每日監看共用 pipeline/daily/optical_detect.py，偵測規則見 pipeline/detect/optical.py）：

- 選湖、時間窗與 SAR 回放相同（pipeline/events/replay.py）：事件前基準為形成前 7～67 天，
  逐期影像為形成前 7 天到形成後 60 天。負案例用 2026-06-04 當「形成日」套同一套時間窗。
- 4 km 窗格內晴空像元未過半的景不下載、不算一期（雲量清單仍記在 manifest，供統計可用景數）。
- 下載網格：與 SAR 回放相同的 EPSG:4326、10 m；範圍是壩址外推 2.5 km 的方框（偵測時再裁 4 km）。

第一次使用（與 gee_fetch_inventory.py 相同，只要做一次）：

    pip install earthengine-api
    earthengine authenticate

在 code/ 底下執行：

    python scripts/gee_fetch_optical.py --project ossint2026
    python scripts/gee_fetch_optical.py --project ossint2026 --only bl071 bl065
    python scripts/gee_fetch_optical.py --project ossint2026 --dry-run     # 只列各期雲量，不下載

產出：
    data/raw/optical/replay/OPT_<情境>_pre.tif（波段 water、clear、ndvi×1000、count）
    data/raw/optical/replay/OPT_<情境>_<YYYYMMDD>_<衛星>.tif（波段 water、clear、ndvi×1000）
    data/raw/optical/replay/NASADEM_<情境>.tif
    data/raw/optical_replay_manifest.json（各期時間、衛星、窗格晴空比例、有沒有下載）

已下載的檔案會略過，中斷後重跑即可續傳。接著跑 python scripts/optical_replay.py。
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))

from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.daily import optical_detect as D  # noqa: E402
from pipeline.daily.basemap import CS_THRESHOLD  # noqa: E402,F401  （gee_codeeditor_optical.py 用）
from pipeline.detect import optical as OD  # noqa: E402
from pipeline.events import replay as R  # noqa: E402

REPO = CODE.parent
RAW = REPO / "data" / "raw" / "optical" / "replay"
MANIFEST = REPO / "data" / "raw" / "optical_replay_manifest.json"
LAKES_JS = CODE / "dashboard" / "data" / "lakes.js"

CLEAR_FRAC = OD.CLEAR_FRAC
BUFFER_M = D.BUFFER_M
WINDOW_M = D.WINDOW_M
sensor_tag = OD.sensor_tag

# 2026 負案例（馬太鞍溪同地點汛期，SAR 負案例的第一期是 2026-06-05）
NEGATIVE = {"lakeId": None, "scenarioId": "neg2026_matai_an", "name": "馬太鞍溪 · 2026 汛期（負案例）",
            "lon": 121.29752, "lat": 23.70061, "formed": "2026-06-04", "breach": None,
            "preStart": "2026-03-29", "preEnd": "2026-05-28", "postStart": "2026-05-28", "postEnd": "2026-09-30"}


def fetch_one(ee, target: dict, dry_run: bool) -> dict:
    name = target["scenarioId"]
    region, window = D.regions(ee, target["lon"], target["lat"])
    entry = {k: target.get(k) for k in ("lakeId", "scenarioId", "name", "formed", "breach",
                                       "preStart", "preEnd", "postStart", "postEnd")}
    scenes = D.list_scenes(ee, region, window, target["postStart"], target["postEnd"])
    entry["scenes"] = scenes
    usable = [s for s in scenes if s["usable"]]
    print(f"  逐期 {len(scenes)} 景，窗格晴空過半 {len(usable)} 景")
    if dry_run:
        return {**entry, "status": "dry_run"}
    RAW.mkdir(parents=True, exist_ok=True)
    entry["preImages"] = D.download_baseline(ee, region, target["preStart"], target["preEnd"],
                                             RAW / f"OPT_{name}_pre.tif", RAW / f"NASADEM_{name}.tif")
    if not entry["preImages"]:
        return {**entry, "status": "no_pre", "reasonText": "事件前沒有任何光學影像"}
    for s in usable:
        s["file"] = D.scene_file(name, s)
        D.download_scene(ee, region, s, RAW / s["file"])
        print(f"    {s['day']} {s['sensor']} 晴空 {s['clearPct']}% ✓")
    return {**entry, "status": "ok"}


def targets_all() -> list:
    targets = R.select_targets(read_lakes(LAKES_JS))[0]
    return targets + [NEGATIVE]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project", required=True, help="啟用 Earth Engine 的 Google Cloud 專案 ID")
    ap.add_argument("--only", nargs="*", default=None, help="只跑這些清冊編號（例如 bl071）或情境 id")
    ap.add_argument("--dry-run", action="store_true", help="只列各期雲量，不下載")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    import ee
    ee.Initialize(project=args.project)

    targets = targets_all()
    if args.only:
        targets = [t for t in targets if t["lakeId"] in args.only or t["scenarioId"] in args.only]
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    lakes = manifest.get("lakes", {})
    for i, t in enumerate(targets, 1):
        print(f"[{i}/{len(targets)}] {t['scenarioId']} {t['name']}（形成 {t['formed']}）")
        try:
            lakes[t["scenarioId"]] = fetch_one(ee, t, args.dry_run)
        except Exception as e:
            print(f"  失敗：{e}")
            lakes[t["scenarioId"]] = {"lakeId": t["lakeId"], "scenarioId": t["scenarioId"], "name": t["name"],
                                      "status": "error", "reasonText": f"下載失敗：{e}"}
        if lakes[t["scenarioId"]]["status"] not in ("ok", "dry_run"):
            print(f"  略過：{lakes[t['scenarioId']]['reasonText']}")
        MANIFEST.write_text(json.dumps({"rules": "見 code/scripts/gee_fetch_optical.py", "lakes": lakes},
                                       ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"已寫出 {MANIFEST}，接著跑 python scripts/optical_replay.py")


if __name__ == "__main__":
    main()
