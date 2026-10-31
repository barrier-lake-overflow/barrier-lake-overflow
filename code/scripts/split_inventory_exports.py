#!/usr/bin/env python3
"""
把 GEE 網頁版匯出的全清冊回放多波段 GeoTIFF（scripts/gee_export_inventory.js）拆成
run_inventory_replay.py 要的單張檔案：

    data/raw/sentinel1/replay_exports/inv_<lakeId>.tif
      → data/raw/sentinel1/replay/S1_VV_inv_<lakeId>_pre.tif
        data/raw/sentinel1/replay/NASADEM_inv_<lakeId>.tif
        data/raw/sentinel1/replay/S1_VV_inv_<lakeId>_YYYYMMDD.tif

波段順序（pre、dem、逐期）以 data/raw/replay_manifest.json 為準，波段數不符就停下來不寫。
匯出時沒有影像的像元填 NODATA，這裡寫成 GeoTIFF 的 nodata，load_s1_geotiff 讀進來是 nan。
已存在的單張檔案會略過（--force 覆寫）。

在 code/ 底下：

    python scripts/split_inventory_exports.py
    python scripts/run_inventory_replay.py --rerun
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))

from pipeline.events import replay as R  # noqa: E402

S1 = CODE.parent / "data" / "raw" / "sentinel1"
EXPORTS = S1 / "replay_exports"
RAW = S1 / "replay"
NODATA = -32768.0   # 與 gee_codeeditor_inventory.py 相同


def band_files(scenario_id: str, days: list) -> list:
    """
    >>> band_files("inv_bl070", ["20250708"])
    ['S1_VV_inv_bl070_pre.tif', 'NASADEM_inv_bl070.tif', 'S1_VV_inv_bl070_20250708.tif']
    """
    return ([f"S1_VV_{scenario_id}_pre.tif", f"NASADEM_{scenario_id}.tif"]
            + [f"S1_VV_{scenario_id}_{d}.tif" for d in days])


def split_one(src_path: Path, names: list, out_dir: Path, force: bool) -> int:
    import rasterio
    written = 0
    with rasterio.open(src_path) as src:
        if src.count != len(names):
            raise ValueError(f"{src_path.name} 有 {src.count} 個波段，manifest 預期 {len(names)} 個")
        profile = {**src.profile, "count": 1, "dtype": "float32", "nodata": NODATA, "compress": "deflate"}
        profile.pop("photometric", None)
        for i, name in enumerate(names, start=1):
            out = out_dir / name
            if out.exists() and not force:
                continue
            with rasterio.open(out, "w", **profile) as dst:
                dst.write(src.read(i).astype("float32"), 1)
            written += 1
    return written


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--exports", default=str(EXPORTS))
    ap.add_argument("--out", default=str(RAW))
    ap.add_argument("--force", action="store_true", help="單張檔案已存在也覆寫")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    exports, out_dir = Path(args.exports), Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest = R.load_manifest().get("lakes", {})
    done, missing, failed = 0, [], []
    for lake_id, m in manifest.items():
        if m.get("status") != "ok":
            continue
        sid = m["scenarioId"]
        src = exports / f"{sid}.tif"
        if not src.exists():
            missing.append(sid)
            continue
        try:
            n = split_one(src, band_files(sid, [s["day"] for s in m["scenes"]]), out_dir, args.force)
        except ValueError as e:
            print(f"  {sid}：{e}")
            failed.append(sid)
            continue
        print(f"  {sid}：寫出 {n} 張")
        done += 1
    print(f"完成 {done} 座湖 → {out_dir}"
          + (f"；找不到匯出檔 {len(missing)} 座：{' '.join(missing)}" if missing else "")
          + (f"；波段數不符 {len(failed)} 座：{' '.join(failed)}" if failed else ""))


if __name__ == "__main__":
    main()
