#!/usr/bin/env python3
"""
把航照放進值班佇列：小地圖航照圖層＋情境檔的外部證據（航拍）。

在 code/ 底下執行，需要先跑 scripts/prepare_aerial.py 與 scripts/aerial_lake_check.py：

    python scripts/aerial_dashboard.py
    python -m pipeline.events.build

做三件事：
1. 每個日期一張小地圖圖層 dashboard/data/basemaps/aerial_<情境 id>_<YYYYMMDD>.png，
   範圍與小地圖相同（經緯度方框，pipeline.daily.basemap.window_box），沒拍到的地方透明。
2. 情境檔 aerial 欄位：各張圖層的拍攝日、可取得時間、出處。小地圖只顯示該時點已可取得的最新一張。
3. 情境檔 externalEvidence：航遙分署航拍逐日一筆（kind=aerial），時間用可取得時間，
   內容只寫照片看得到的事（湖面範圍，由 aerial_lake_check.py 算出），不另外引用其他數字。
   外部證據在研判裡算「支持有湖」，所以只收照片上看得到湖面（≥ MIN_LAKE_HA）的日期；
   9/23 溢流後的 9/30、10/13 只剩零星水體，只放圖層、不當證據。

可取得時間：實際提供給值班人員的時間不明，保守取拍攝日隔天 23:59（台灣時間）。

航照：農業部林業及自然保育署航測及遙測分署 提供。
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image
from rasterio.enums import Resampling
from rasterio.transform import from_bounds
from rasterio.warp import reproject

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
sys.path.insert(0, str(CODE))
from pipeline.daily.basemap import SIZE, window_box  # noqa: E402

AERIAL = REPO / "data" / "raw" / "aerial"
DERIVED = REPO / "data" / "derived"
SCENARIO = REPO / "data" / "raw" / "scenarios" / "matai_an_2025.json"
OUT = CODE / "dashboard" / "data" / "basemaps"
ATTRIBUTION = "農業部林業及自然保育署航測及遙測分署 提供"
SOURCE_TEXT = f"{ATTRIBUTION}（航拍影像）"
MIN_LAKE_HA = 5.0   # 研判信心的「外部來源」取全形括號前的機關名


def to_minimap(tif: Path, box: list) -> np.ndarray:
    """1 m 拼接圖 → 小地圖經緯度方框（SIZE×SIZE）的 RGBA，各原始檔分開拉伸。"""
    dst_tr = from_bounds(*box, SIZE, SIZE)
    with rasterio.open(tif) as s:
        a = s.read()
        out = np.zeros((5, SIZE, SIZE), dtype=np.float32)
        for b in range(4):
            reproject(a[b], out[b], src_transform=s.transform, src_crs=s.crs, src_nodata=0,
                      dst_transform=dst_tr, dst_crs="EPSG:4326", dst_nodata=0, resampling=Resampling.average)
        reproject(a[4], out[4], src_transform=s.transform, src_crs=s.crs, src_nodata=0,
                  dst_transform=dst_tr, dst_crs="EPSG:4326", dst_nodata=0, resampling=Resampling.nearest)
    rgba = np.zeros((SIZE, SIZE, 4), dtype=np.uint8)
    for k in np.unique(out[4][out[4] > 0]):
        part = (out[4] == k) & (out[:3] > 0).all(axis=0)
        for b in range(3):
            lo, hi = np.percentile(out[b][part], [2, 98])
            rgba[..., b][part] = (np.clip((out[b][part] - lo) / (hi - lo + 1e-9), 0, 1) * 255).astype(np.uint8)
        rgba[..., 3][part] = 255
    return rgba


def evidence_text(row: dict) -> str:
    """
    >>> evidence_text({"shotDate": "2025-07-27", "lakeHectare": 12.3, "lakeTruncated": True})
    '航遙分署 7/27 航拍：壩址上游可見湖面，航照判讀至少 12 公頃（部分在照片範圍外）'
    >>> evidence_text({"shotDate": "2025-08-18", "lakeHectare": 90.6, "lakeTruncated": False})
    '航遙分署 8/18 航拍：壩址上游可見湖面，航照判讀約 91 公頃'
    """
    m, d = (int(x) for x in row["shotDate"].split("-")[1:])
    head = f"航遙分署 {m}/{d} 航拍：壩址上游可見湖面，航照判讀"
    if row["lakeTruncated"]:
        return head + f"至少 {row['lakeHectare']:.0f} 公頃（部分在照片範圍外）"
    return head + f"約 {row['lakeHectare']:.0f} 公頃"


def main() -> None:
    sc = json.loads(SCENARIO.read_text(encoding="utf-8"))
    box = window_box(tuple(sc["center"]), sc["windowKm"])
    manifest = json.loads((AERIAL / "manifest.json").read_text(encoding="utf-8"))
    validation = json.loads((DERIVED / "aerial_validation.json").read_text(encoding="utf-8"))
    trigger = sc["trigger"]["time"][:10]

    layers, evidence = [], []
    for key, d in sorted(manifest["dates"].items()):
        name = f"aerial_{sc['id']}_{key}.png"
        Image.fromarray(to_minimap(AERIAL / d["file"], box), "RGBA").save(OUT / name, optimize=True)
        layers.append({"file": f"data/basemaps/{name}", "shotDate": d["shotDate"], "available": d["available"],
                       "source": SOURCE_TEXT})
        row = validation["dates"].get(key)
        if row and d["shotDate"] >= trigger and row["lakeHectare"] >= MIN_LAKE_HA:
            evidence.append({"time": d["available"], "kind": "aerial", "lonLat": list(sc["center"]),
                             "radiusM": 600, "text": evidence_text(row), "source": SOURCE_TEXT})
        print(f"[{key}] {name}")

    # 舊的航拍條目（出處為維基百科）換成航遙分署原始影像；其他種類不動
    others = [x for x in sc.get("externalEvidence", []) if x["kind"] != "aerial"]
    sc["externalEvidence"] = sorted(others + evidence, key=lambda x: x["time"])
    sc["aerial"] = layers
    # 情境檔進版控，固定用 LF 換行，在 Windows 上跑也不會讓整個檔案顯示為改動
    SCENARIO.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(f"情境檔：航照圖層 {len(layers)} 張、航拍證據 {len(evidence)} 筆")


if __name__ == "__main__":
    main()
