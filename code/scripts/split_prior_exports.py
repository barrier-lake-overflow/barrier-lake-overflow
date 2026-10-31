#!/usr/bin/env python3
"""
A1 崩塌堆積提醒：把 GEE 網頁版匯出的一年前基準（scripts/gee_export_prior.js）改名，放到
與事件前基準相同的資料夾（馬太鞍溪、負案例在 data/raw/sentinel1/，全清冊回放在 replay/），
檔名見 gee_codeeditor_prior.prior_file。
整張都是 NODATA 的（一年前還沒有 Sentinel-1）不寫，之後視為沒有一年前資料。

在 code/ 底下：

    python scripts/split_prior_exports.py
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE / "scripts"))

from gee_codeeditor_prior import NODATA, prior_file  # noqa: E402
from gee_codeeditor_vh import cases  # noqa: E402
from split_inventory_exports import split_one  # noqa: E402

S1 = CODE.parent / "data" / "raw" / "sentinel1"
EXPORTS = S1 / "prior_exports"


def out_dir(name: str) -> Path:
    return S1 if name in ("matai_an_2025", "neg2026_matai_an") else S1 / "replay"


def main() -> None:
    import rasterio
    sys.stdout.reconfigure(encoding="utf-8")
    done, empty, missing = [], [], []
    for c in cases():
        src = EXPORTS / f"PRIOR_{c['name']}.tif"
        if not src.exists():
            missing.append(c["name"])
            continue
        with rasterio.open(src) as s:
            if np.all(s.read(1) == NODATA):
                empty.append(c["name"])
                continue
        dest = out_dir(c["name"])
        dest.mkdir(parents=True, exist_ok=True)
        split_one(src, [prior_file(c["name"])], dest, force=True)
        done.append(c["name"])
    print(f"寫出 {len(done)} 張（馬太鞍溪、負案例 → {S1}，回放 → {S1 / 'replay'}）"
          + (f"；一年前沒有影像 {len(empty)} 個：{' '.join(empty)}" if empty else "")
          + (f"；找不到匯出檔 {len(missing)} 個：{' '.join(missing)}" if missing else ""))


if __name__ == "__main__":
    main()
