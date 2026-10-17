#!/usr/bin/env python3
"""
用航照檢查 SAR 誤報的位置實際上是什麼地表（水、裸露土石、植被），並畫出事件後的裸露範圍。

在 code/ 底下執行，需要先跑 scripts/prepare_aerial.py：

    python scripts/aerial_deposit_check.py

規則（先寫死，不看 SAR 結果調整）：
- 逐張原始檔判斷水、裸露地、植被（prepare_aerial.py 第 7～9 波段的票數，門檻見該檔說明）。
- 事件後地表：7/27、8/6、8/16、8/18 四天所有照片的票數加總，票數最多的類別；總票數不到 2 張算無法判斷。
  雲在各日期位置不同，加總多日可以減少把雲當成裸地。
- 原本想用 3/27 事件前航照區分「崩塌後才裸露」與「原本就裸露（舊河床）」，但 3/27 的近紅外線數值
  分不出植被與裸地（森林與河床的 NDVI 都在 −0.05～+0.12），所以只能判斷事件後是什麼，無法判斷是不是新的。

檢查的 SAR 候選：
- 2025 誤報：7/22 的 2 個、8/21 的 2 個 B 級（下一期複核未持續）
- 2026 負案例 E1：各期候選（航照是 2025 年拍的，假設堆積區到 2026 年沒有大變化）
- 對照：2025 真湖（7/28、8/21 的 A 級）

產出：data/derived/aerial_deposit.json、aerial_bare.geojson、docs/evidence/aerial_deposit.png

航照：農業部林業及自然保育署航測及遙測分署 提供。
"""

from __future__ import annotations

import glob
import json
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image, ImageDraw
from rasterio import features
from scipy import ndimage

from aerial_lake_check import (AERIAL, ATTRIBUTION, DERIVED, EVIDENCE, TO_WGS84, outline, rasterize_polygon,
                               stretch_rgb)

POST = ("20250727", "20250806", "20250816", "20250818")
CLASSES = ("water", "bare", "veg")
CLASS_TEXT = {"water": "水", "bare": "裸露土石", "veg": "植被"}
MIN_VOTES = 2
MIN_PIECE_PX = 200           # 1 m 格網，小於 200 m² 的零碎裸地不畫進範圍圖（統計仍用逐像元）


def load(key: str) -> tuple:
    with rasterio.open(AERIAL / f"aerial_matai_an_{key}_1m.tif") as s:
        return s.read(), s.transform


def surface(votes: np.ndarray) -> np.ndarray:
    """
    votes：(3, H, W) 水、裸露、植被的票數加總。回傳類別編號（0 水、1 裸露、2 植被），票數不足為 -1。
    同票時依水 > 裸露 > 植被的順序取前者。

    >>> v = np.array([[[3, 0, 1]], [[1, 1, 0]], [[0, 4, 0]]])
    >>> surface(v).tolist()
    [[0, 2, -1]]
    """
    cls = np.argmax(votes, axis=0)
    cls[votes.sum(axis=0) < MIN_VOTES] = -1
    return cls


def candidates() -> list:
    """(群組, 標籤, polygonLonLat)。"""
    out = []
    for key, ids, group in (("0722", ("cand1", "cand2"), "2025 誤報"), ("0821", ("cand2", "cand3"), "2025 誤報"),
                            ("0728", ("cand1",), "2025 真湖"), ("0821", ("cand1",), "2025 真湖")):
        d = json.loads((DERIVED / f"final_{key}.json").read_text(encoding="utf-8"))
        out += [(group, f"{key} {c['id']}", c["polygonLonLat"]) for c in d["candidates"] if c["id"] in ids]
    for f in sorted(glob.glob(str(DERIVED / "final_neg2026_matai_an_*.json"))):
        d = json.loads(Path(f).read_text(encoding="utf-8"))
        out += [("2026 E1", f"{Path(f).stem[-8:]} {c['id']}", c["polygonLonLat"]) for c in d["candidates"]]
    return out


def main() -> None:
    votes = None
    for key in POST:
        a, tr = load(key)
        v = a[6:9].astype(np.int32)
        votes = v if votes is None else votes + v
    cls = surface(votes)
    px = tr.a * -tr.e

    rows = []
    for group, label, poly in candidates():
        m = rasterize_polygon(poly, tr, cls.shape)
        judged = m & (cls >= 0)
        n = max(judged.sum(), 1)
        pct = {c: round((judged & (cls == i)).sum() / n * 100, 1) for i, c in enumerate(CLASSES)}
        rows.append({"group": group, "candidate": label, "judgedPct": round(judged.sum() / max(m.sum(), 1) * 100, 1),
                     **{f"{c}Pct": pct[c] for c in CLASSES}})
        print(f"{group:8s} {label:18s} 可判斷 {rows[-1]['judgedPct']:5.1f}%  "
              + "  ".join(f"{CLASS_TEXT[c]} {pct[c]:5.1f}%" for c in CLASSES))

    groups = {}
    for g in dict.fromkeys(r["group"] for r in rows):
        rs = [r for r in rows if r["group"] == g]
        groups[g] = {f"{c}PctMean": round(float(np.mean([r[f"{c}Pct"] for r in rs])), 1) for c in CLASSES}
        groups[g]["n"] = len(rs)

    bare = cls == 1
    result = {"attribution": ATTRIBUTION, "postDates": list(POST), "minVotes": MIN_VOTES,
              "judgedHectare": round((cls >= 0).sum() * px / 1e4, 1),
              "bareHectare": round(bare.sum() * px / 1e4, 1),
              "note": "百分比以候選範圍內可判斷的部分為分母；無法區分崩塌後新裸露與原本就裸露的河床（3/27 航照無法判斷植被）",
              "groups": groups, "candidates": rows}
    (DERIVED / "aerial_deposit.json").write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")

    lab, k = ndimage.label(bare)
    sizes = ndimage.sum(bare, lab, range(1, k + 1))
    keep = np.zeros(k + 1, bool)
    keep[1:] = sizes >= MIN_PIECE_PX
    big = keep[lab]
    feats = [{"type": "Feature", "properties": {},
              "geometry": {"type": "Polygon", "coordinates": [[[round(c, 6) for c in TO_WGS84.transform(x, y)]
                                                               for x, y in ring] for ring in g["coordinates"]]}}
             for g, _ in features.shapes(big.astype("uint8"), mask=big, transform=tr)]
    (DERIVED / "aerial_bare.geojson").write_text(json.dumps(
        {"type": "FeatureCollection", "properties": {"attribution": ATTRIBUTION}, "features": feats},
        ensure_ascii=False), encoding="utf-8")
    print(f"可判斷 {result['judgedHectare']} ha，其中事件後裸露 {result['bareHectare']} ha")

    # 對照圖：8/18 真色，紅＝事件後裸露（半透明），藍＝水，暗＝無法判斷；
    # 橘＝2025 誤報、洋紅＝2026 E1、綠＝真湖
    a, _ = load("20250818")
    rgb = stretch_rgb(a.astype(np.float32)).astype(np.float32)
    rgb[bare] = rgb[bare] * 0.55 + np.array([255, 40, 40]) * 0.45
    rgb[cls == 0] = rgb[cls == 0] * 0.55 + np.array([40, 120, 255]) * 0.45
    rgb[cls < 0] *= 0.35
    rgb = rgb.astype(np.uint8)
    colors = {"2025 誤報": (255, 150, 0), "2026 E1": (255, 0, 255), "2025 真湖": (60, 220, 60)}
    for group, _, poly in candidates():
        rgb[outline(rasterize_polygon(poly, tr, cls.shape))] = colors[group]
    img = Image.fromarray(rgb)
    img = img.resize((img.width // 4, img.height // 4), Image.Resampling.BOX)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, img.width, 34], fill=(0, 0, 0))
    d.text((6, 4), "surface after event (aerial 7/27-8/18): red=bare ground  blue=water  dim=not judged",
           fill=(255, 255, 255))
    d.text((6, 19), "orange=2025 false alarms  magenta=2026 E1  green=real lake   "
           "Aerial photo: Aerial Survey and Remote Sensing Branch, Forestry and Nature Conservation Agency",
           fill=(200, 200, 200))
    img.save(EVIDENCE / "aerial_deposit.png")


if __name__ == "__main__":
    main()
