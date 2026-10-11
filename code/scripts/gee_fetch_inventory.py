#!/usr/bin/env python3
"""
全清冊回放：選湖 → 每湖自動挑軌道 → 直接從 Google Earth Engine 下載影像到本機。

不用在 Code Editor 逐一按 Run，也不經過 Google Drive。選湖、時間窗、軌道規則見
pipeline/events/replay.py，這支只負責查詢與下載。

第一次使用（只要做一次）：

    pip install earthengine-api
    earthengine authenticate          # 會開瀏覽器登入 Google 帳號

在 code/ 底下執行：

    python scripts/gee_fetch_inventory.py --project <GCP 專案 ID>
    python scripts/gee_fetch_inventory.py --project <ID> --only bl065 bl066   # 只跑指定的湖
    python scripts/gee_fetch_inventory.py --project <ID> --dry-run            # 只選軌道、不下載

產出：
    data/raw/sentinel1/replay/S1_VV_inv_<lakeId>_pre.tif、NASADEM_inv_<lakeId>.tif、
        S1_VV_inv_<lakeId>_YYYYMMDD.tif（約 5 MB／張，不進 git）
    data/raw/replay_manifest.json（每湖選了哪一軌、哪幾期、沒選的原因；進 git）

已下載的檔案會略過，中斷後重跑即可續傳。匯出設定（10 km 方框、10 m、EPSG:4326、
同日相鄰 frame 先 mosaic）與 gee_export_series_s1.js 相同。
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.request
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))

from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.events import replay as R  # noqa: E402

REPO = CODE.parent
RAW = REPO / "data" / "raw" / "sentinel1" / "replay"
LAKES_JS = CODE / "dashboard" / "data" / "lakes.js"
BUFFER_M = 5000   # 與 gee_export_series_s1.js 相同：中心外推 5 km 的方框


def download(img, region, path: Path, tries: int = 3) -> None:
    if path.exists() and path.stat().st_size > 0:
        return
    url = img.toFloat().getDownloadURL(
        {"region": region, "scale": 10, "crs": "EPSG:4326", "format": "GEO_TIFF"})
    for k in range(tries):
        try:
            tmp = path.with_suffix(".part")
            with urllib.request.urlopen(url, timeout=300) as r, open(tmp, "wb") as f:
                f.write(r.read())
            tmp.replace(path)
            return
        except Exception as e:   # 網路或 GEE 暫時性錯誤，稍等重試
            if k == tries - 1:
                raise
            print(f"    重試（{e}）")
            time.sleep(5 * (k + 1))


def fetch_one(ee, target: dict, dry_run: bool) -> dict:
    name = target["scenarioId"]
    lon, lat = target["lon"], target["lat"]
    aoi = ee.Geometry.Point([lon, lat]).buffer(BUFFER_M).bounds()
    s1 = (ee.ImageCollection("COPERNICUS/S1_GRD")
          .filterBounds(aoi)
          .filter(ee.Filter.eq("instrumentMode", "IW"))
          .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV")))
    window = s1.filterDate(target["preStart"], target["postEnd"])
    rows = window.reduceColumns(
        ee.Reducer.toList(3), ["orbitProperties_pass", "relativeOrbitNumber_start", "system:time_start"]
    ).get("list").getInfo()
    entry = {"lakeId": target["lakeId"], "scenarioId": name, "name": target["name"],
             "imagesInWindow": len(rows)}
    if not rows:
        return {**entry, "status": "no_images", "reasonText": "時間窗內沒有任何 Sentinel-1 影像"}
    choice = R.choose_orbit(rows, target)
    if choice is None:
        return {**entry, "status": "no_orbit",
                "reasonText": "沒有任何軌道同時具備事件前基準與形成後影像"}
    entry.update(status="ok", **choice)
    print(f"  {'降' if choice['pass'] == 'DESCENDING' else '升'}軌 {choice['orbit']}：事件前 {choice['preCount']} 張，"
          f"逐期 {len(choice['scenes'])} 期，形成後第一張 {choice['firstAfterFormed'][:16]} UTC")
    if dry_run:
        return entry

    RAW.mkdir(parents=True, exist_ok=True)
    s = (s1.filter(ee.Filter.eq("orbitProperties_pass", choice["pass"]))
           .filter(ee.Filter.eq("relativeOrbitNumber_start", choice["orbit"]))
           .select("VV"))
    pre = s.filterDate(target["preStart"], target["preEnd"]).median()
    dem = ee.Image("NASA/NASADEM_HGT/001").select("elevation").resample("bilinear")
    download(pre, aoi, RAW / f"S1_VV_{name}_pre.tif")
    download(dem, aoi, RAW / f"NASADEM_{name}.tif")
    for sc in choice["scenes"]:
        d = sc["day"]
        start = ee.Date(f"{d[:4]}-{d[4:6]}-{d[6:]}")
        download(s.filterDate(start, start.advance(1, "day")).mosaic(), aoi, RAW / f"S1_VV_{name}_{d}.tif")
        print(f"    {d} ✓")
    return entry


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project", required=True, help="啟用 Earth Engine 的 Google Cloud 專案 ID")
    ap.add_argument("--only", nargs="*", default=None, help="只跑這些清冊編號（例如 bl065）")
    ap.add_argument("--dry-run", action="store_true", help="只查詢、選軌道，不下載")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")   # Windows 主控台預設 cp950，印不出部分符號

    import ee
    ee.Initialize(project=args.project)

    targets, skipped, before = R.select_targets(read_lakes(LAKES_JS))
    targets = [t for t in targets if t["lakeId"] not in R.EXISTING]
    if args.only:
        targets = [t for t in targets if t["lakeId"] in args.only]
    print(f"回放 {len(targets)} 筆（另有 {len(R.EXISTING)} 筆沿用既有情境、"
          f"{len(skipped)} 筆日期不完整、{before} 筆早於 {R.REPLAY_START.year}）")

    manifest = R.load_manifest()
    lakes = manifest.get("lakes", {})
    for i, t in enumerate(targets, 1):
        print(f"[{i}/{len(targets)}] {t['lakeId']} {t['name']}（形成 {t['formed']}）")
        try:
            lakes[t["lakeId"]] = fetch_one(ee, t, args.dry_run)
        except Exception as e:
            print(f"  失敗：{e}")
            lakes[t["lakeId"]] = {"lakeId": t["lakeId"], "scenarioId": t["scenarioId"], "name": t["name"],
                                  "status": "error", "reasonText": f"下載失敗：{e}"}
        if lakes[t["lakeId"]]["status"] != "ok":
            print(f"  略過：{lakes[t['lakeId']]['reasonText']}")
        R.MANIFEST.write_text(json.dumps({"rules": "見 code/pipeline/events/replay.py", "lakes": lakes},
                                         ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"已寫出 {R.MANIFEST}，接著跑 python scripts/run_inventory_replay.py")


if __name__ == "__main__":
    main()
