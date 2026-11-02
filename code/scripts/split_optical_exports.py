#!/usr/bin/env python3
"""
把 GEE 網頁版匯出的光學實驗檔（scripts/gee_export_optical.js）拆成 optical_replay.py 要的檔案，
並寫出與 gee_fetch_optical.py 相同格式的 manifest：

    data/raw/optical/exports/<情境>.tif、optical_scenes.csv
      → data/raw/optical/replay/OPT_<情境>_pre.tif（water、clear、ndvi×1000、count）
        data/raw/optical/replay/NASADEM_<情境>.tif
        data/raw/optical/replay/OPT_<情境>_<YYYYMMDD>_<衛星>.tif（water、clear、ndvi×1000）
        data/raw/optical_replay_manifest.json

逐期波段的順序依 CSV：晴空過半的景依取像時間排序。波段數對不上就停下來不寫。
已存在的單張檔案會略過（--force 覆寫）。

在 code/ 底下：

    python scripts/split_optical_exports.py
    python scripts/optical_replay.py
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

import gee_fetch_optical as F  # noqa: E402

EXPORTS = F.RAW.parent / "exports"
FIXED_BANDS = 3   # pre、precount、dem


def decode(v: np.ndarray) -> tuple:
    """
    編碼值 → (water, clear, ndvi×1000)。非晴空：clear 0、water 0、ndvi −9999。

    >>> w, c, n = decode(np.array([-1, (700 + 1000) * 2 + 0, (-200 + 1000) * 2 + 1]))
    >>> w.tolist(), c.tolist(), n.tolist()
    ([0, 0, 1], [0, 1, 1], [-9999, 700, -200])
    """
    v = np.asarray(v).astype("int32")
    clear = (v >= 0).astype("int16")
    water = np.where(v >= 0, v % 2, 0).astype("int16")
    ndvi = np.where(v >= 0, v // 2 - 1000, -9999).astype("int16")
    return water, clear, ndvi


def read_csv(path: Path) -> dict:
    """{情境: {"pre": 事件前影像數, "scenes": [列…]}}，scenes 依取像時間排序。"""
    out: dict = {}
    with open(path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            lake = out.setdefault(row["lake"], {"pre": 0, "scenes": []})
            if row["type"] == "pre":
                lake["pre"] = int(float(row["n"] or 0))
            else:
                lake["scenes"].append(row)
    for lake in out.values():
        lake["scenes"].sort(key=lambda r: float(r["ms"]))
    return out


def scene_entries(rows: list) -> list:
    """CSV 列 → manifest 的 scenes（與 gee_fetch_optical.py 相同欄位）。"""
    out = []
    for r in rows:
        t = datetime.fromtimestamp(float(r["ms"]) / 1000, tz=timezone.utc)
        clear = float(r["clear"]) if r.get("clear") not in (None, "") else None
        out.append({"key": r["key"], "sensor": r["sat"], "day": t.strftime("%Y%m%d"),
                    "timeUTC": t.isoformat(timespec="minutes"),
                    "clearPct": None if clear is None else round(100 * clear, 1),
                    "usable": clear is not None and clear >= F.CLEAR_FRAC})
    return out


def write(path: Path, profile: dict, bands: list, names: list, force: bool) -> None:
    import rasterio
    if path.exists() and not force:
        return
    p = {**profile, "count": len(bands), "dtype": bands[0].dtype.name, "nodata": None, "compress": "deflate"}
    p.pop("photometric", None)
    with rasterio.open(path, "w", **p) as dst:
        for i, (b, n) in enumerate(zip(bands, names), start=1):
            dst.write(b, i)
            dst.set_band_description(i, n)


def split_one(src_path: Path, target: dict, info: dict, force: bool) -> dict:
    import rasterio
    sid = target["scenarioId"]
    scenes = scene_entries(info["scenes"])
    usable = [s for s in scenes if s["usable"]]
    with rasterio.open(src_path) as src:
        if src.count != FIXED_BANDS + len(usable):
            raise ValueError(f"{src_path.name} 有 {src.count} 個波段，CSV 預期 {FIXED_BANDS + len(usable)} 個"
                             f"（3 個固定＋{len(usable)} 景）")
        profile = src.profile
        pre_w, pre_c, pre_n = decode(src.read(1))
        write(F.RAW / f"OPT_{sid}_pre.tif", profile, [pre_w, pre_c, pre_n, src.read(2).astype("int16")],
              ["water", "clear", "ndvi", "count"], force)
        write(F.RAW / f"NASADEM_{sid}.tif", profile, [src.read(3).astype("float32")], ["elevation"], force)
        for i, s in enumerate(usable):
            s["file"] = f"OPT_{sid}_{s['day']}_{F.sensor_tag(s['sensor'])}.tif"
            write(F.RAW / s["file"], profile, list(decode(src.read(FIXED_BANDS + 1 + i))),
                  ["water", "clear", "ndvi"], force)
    entry = {k: target.get(k) for k in ("lakeId", "scenarioId", "name", "formed", "breach",
                                       "preStart", "preEnd", "postStart", "postEnd")}
    entry.update(preImages=info["pre"], scenes=scenes)
    if info["pre"] == 0:
        return {**entry, "status": "no_pre", "reasonText": "事件前沒有任何光學影像"}
    return {**entry, "status": "ok"}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--exports", default=str(EXPORTS))
    ap.add_argument("--force", action="store_true", help="單張檔案已存在也覆寫")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    exports = Path(args.exports)
    table = exports / "optical_scenes.csv"
    if not table.exists():
        sys.exit(f"找不到 {table}：把 Drive 上 {exports.name} 對應的資料夾（replay_optical/）下載到這裡")
    rows = read_csv(table)
    F.RAW.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(F.MANIFEST.read_text(encoding="utf-8")) if F.MANIFEST.exists() else {}
    lakes = manifest.get("lakes", {})
    done, missing, failed = 0, [], []
    for t in F.targets_all():
        sid = t["scenarioId"]
        src = exports / f"{sid}.tif"
        if sid not in rows or not src.exists():
            if sid in rows or src.exists():
                missing.append(sid)
            continue
        try:
            lakes[sid] = split_one(src, t, rows[sid], args.force)
        except ValueError as e:
            print(f"  {sid}：{e}")
            failed.append(sid)
            continue
        usable = sum(1 for s in lakes[sid]["scenes"] if s["usable"])
        print(f"  {sid}：事件前 {lakes[sid]['preImages']} 景，逐期 {len(lakes[sid]['scenes'])} 景，晴空過半 {usable} 景")
        done += 1
    F.MANIFEST.write_text(json.dumps({"rules": "見 code/scripts/gee_fetch_optical.py（網頁版匯出，"
                                      "split_optical_exports.py 拆檔）", "lakes": lakes},
                                     ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"完成 {done} 座湖 → {F.RAW}"
          + (f"；影像或 CSV 缺一 {len(missing)} 座：{' '.join(missing)}" if missing else "")
          + (f"；波段數不符 {len(failed)} 座：{' '.join(failed)}" if failed else "")
          + "。接著跑 python scripts/optical_replay.py")


if __name__ == "__main__":
    main()
