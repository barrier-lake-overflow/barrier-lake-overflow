#!/usr/bin/env python3
"""
把福衛八號的堆積區與水面範圍放上小地圖：docs/results/fs8_cover_matai_an_2026.geojson → dashboard/data/fs8.js。

在 code/ 底下執行（先跑 scripts/fs8_validate.py 產生 geojson）：

    python scripts/fs8_dashboard.py

- 只放向量範圍（衍生產品，授權 2.1(i) 可公開），不放影像。
- 簡化到約 2 m（福衛八號原生解析度），座標取 6 位小數，檔案才不會太大。
- available 是團隊收到影像的日期（data/inventory.csv received）。小地圖在這之前的時點只當「事後資料」顯示，
  預設不開，與事件卡的「事後查證」一樣不影響研判。
"""

from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

from shapely.geometry import mapping, shape

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
SRC = REPO / "docs" / "results" / "fs8_cover_matai_an_2026.geojson"
INVENTORY = REPO / "data" / "inventory.csv"
OUT = CODE / "dashboard" / "data" / "fs8.js"

CENTER = [121.29752, 23.70061]   # 與 fs8_validate.py 的窗格中心相同（壩址）
WINDOW_KM = 4.0
TOLERANCE_DEG = 0.00002          # 約 2 m
CLASSES = {"水": "water", "裸露地": "bare"}


def received() -> str:
    with open(INVENTORY, encoding="utf-8") as f:
        row = next(r for r in csv.DictReader(f) if "福衛八號" in r["item"])
    return row["received"]


def rings(geom) -> list:
    """MultiPolygon → [[[lon, lat], ...], ...]（外環與內環都列，前端用 evenodd 填色）。"""
    out = []
    for poly in mapping(geom)["coordinates"]:
        for ring in poly:
            out.append([[round(x, 6), round(y, 6)] for x, y in ring])
    return out


def main() -> None:
    src = json.loads(SRC.read_text(encoding="utf-8"))
    layers = []
    for f in src["features"]:
        geom = shape(f["geometry"]).simplify(TOLERANCE_DEG, preserve_topology=True)
        layers.append({"class": CLASSES[f["properties"]["class"]], "label": f["properties"]["class"],
                       "areaHa": f["properties"]["area_ha"], "rings": rings(geom)})
    data = [{
        "center": CENTER, "windowKm": WINDOW_KM,
        "shot": "2026-03-31／04-15", "available": f"{received()}T23:59:00+08:00",
        "source": "© 國家太空中心 福衛八號影像衍生（只有範圍，不含影像）",
        "rule": src["features"][0]["properties"]["rule"],
        "layers": layers,
    }]
    OUT.write_text(
        "/* 由 scripts/fs8_dashboard.py 產生，請勿手動編輯。\n"
        "   福衛八號判出的水面與裸露堆積範圍（衍生產品），小地圖圖層用。 */\n"
        f"window.FS8_COVER = {json.dumps(data, ensure_ascii=False, separators=(',', ':'))};\n",
        encoding="utf-8")
    n = sum(len(r) for l in layers for r in l["rings"])
    print(f"已寫出 {OUT}（{len(layers)} 類、{n} 個頂點、{OUT.stat().st_size // 1024} KB）")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
