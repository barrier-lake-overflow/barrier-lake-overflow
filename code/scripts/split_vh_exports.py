#!/usr/bin/env python3
"""
VH 補判實驗：把 GEE 網頁版匯出的 VH 多波段 GeoTIFF（scripts/gee_export_vh.js）拆成單張，
放到 data/raw/sentinel1/vh/（不進版控）。波段順序與檔名照 data/raw/sentinel1/vh_manifest.json
（gee_codeeditor_vh.py 產生），波段數不符就停下來不寫。

在 code/ 底下：

    python scripts/split_vh_exports.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

CODE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(CODE / "scripts"))

from split_inventory_exports import NODATA  # noqa: E402,F401  與 VV 拆檔相同的 nodata
from split_inventory_exports import split_one  # noqa: E402

S1 = CODE.parent / "data" / "raw" / "sentinel1"
EXPORTS = S1 / "vh_exports"
OUT = S1 / "vh"


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    manifest = json.loads((S1 / "vh_manifest.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    done, missing, failed = 0, [], []
    for name, files in manifest.items():
        src = EXPORTS / f"VH_{name}.tif"
        if not src.exists():
            missing.append(name)
            continue
        # 一個波段可能對到兩個檔名（馬太鞍溪 7/28 同時是 7/22 的複核期），先寫第一個再複製
        firsts = [fs[0] for fs in files]
        try:
            n = split_one(src, firsts, OUT, force=False)
        except ValueError as e:
            print(f"  {name}：{e}")
            failed.append(name)
            continue
        for fs in files:
            for extra in fs[1:]:
                if not (OUT / extra).exists():
                    (OUT / extra).write_bytes((OUT / fs[0]).read_bytes())
                    n += 1
        print(f"  {name}：寫出 {n} 張")
        done += 1
    print(f"完成 {done} 個案例 → {OUT}"
          + (f"；找不到匯出檔 {len(missing)} 個：{' '.join(missing)}" if missing else "")
          + (f"；波段數不符 {len(failed)} 個：{' '.join(failed)}" if failed else ""))


if __name__ == "__main__":
    main()
