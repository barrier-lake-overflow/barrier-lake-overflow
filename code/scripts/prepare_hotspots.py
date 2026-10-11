#!/usr/bin/env python3
"""
把農村水保署的土石流潛勢溪流、大規模崩塌潛勢區 shp 轉成精簡 JSON（編號 → 經緯度），
給每日排程對應警戒位置、挑雨量熱區用。圖資每年更新一次，有新版時重跑即可。

在 code/ 底下執行（需要網路與 pyshp、pyproj）：

    python scripts/prepare_hotspots.py

產出 data/raw/hotspots.json（進版控）。來源：
    114 年度 1745 條土石流潛勢溪流圖   https://data.gov.tw/dataset/172537
    115 年度 94 處大規模崩塌潛勢區影響範圍 https://data.gov.tw/dataset/176528
"""

from __future__ import annotations

import io
import json
import math
import tempfile
import urllib.request
import zipfile
from pathlib import Path

import shapefile
from pyproj import Transformer

REPO = Path(__file__).resolve().parents[2]
OUT = REPO / "data" / "raw" / "hotspots.json"
TO_WGS84 = Transformer.from_crs("EPSG:3826", "EPSG:4326", always_xy=True)

SOURCES = {
    "debris": ("114 年度 1745 條土石流潛勢溪流圖", "https://data.gov.tw/dataset/172537",
               "https://data.moa.gov.tw/OpenData/GetOpenDataFile.aspx?id=J23&FileType=SHP&RID=41698"),
    "landslide": ("115 年度 94 處大規模崩塌潛勢區影響範圍", "https://data.gov.tw/dataset/176528",
                  "https://data.moa.gov.tw/OpenData/GetOpenDataFile.aspx?id=J75&FileType=SHP&RID=66657"),
}


def line_midpoint(points: list) -> tuple:
    """折線上走到一半長度的點（TWD97 公尺座標）。

    >>> line_midpoint([(0, 0), (10, 0), (10, 10)])
    (10.0, 0.0)
    """
    seg = [math.dist(a, b) for a, b in zip(points, points[1:])]
    half, acc = sum(seg) / 2, 0.0
    for (a, b), d in zip(zip(points, points[1:]), seg):
        if acc + d >= half and d > 0:
            t = (half - acc) / d
            return (a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]))
        acc += d
    return tuple(map(float, points[-1]))


def read_shp(url: str, tmp: Path) -> shapefile.Reader:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=300) as r:
        zipfile.ZipFile(io.BytesIO(r.read())).extractall(tmp)
    shp = next(tmp.rglob("*.shp"))
    # 地址欄位偶有被截斷的多位元組字，用 replace 避免整筆讀不出來
    return shapefile.Reader(str(shp), encoding="utf-8", encodingErrors="replace")


def lonlat(x: float, y: float) -> list:
    lon, lat = TO_WGS84.transform(x, y)
    return [round(lon, 5), round(lat, 5)]


def main() -> None:
    out = {"sources": {k: {"title": v[0], "url": v[1]} for k, v in SOURCES.items()}}
    with tempfile.TemporaryDirectory() as d:
        r = read_shp(SOURCES["debris"][2], Path(d) / "debris")
        out["debris"] = {}
        for sr in r.iterShapeRecords():
            rec = sr.record.as_dict()
            x, y = line_midpoint(sr.shape.points)
            out["debris"][rec["Debrisno"].strip()] = {
                "lonLat": lonlat(x, y), "name": rec["Name"].strip(),
                "place": f"{rec['County01']}{rec['Town01']}{rec['Vill01']}".strip()}
        r.close()   # Windows 上檔案開著會刪不掉暫存資料夾
        r = read_shp(SOURCES["landslide"][2], Path(d) / "landslide")
        out["landslide"] = {}
        for rec in r.records():
            rec = rec.as_dict()
            out["landslide"][rec["Islno"].strip()] = {
                "lonLat": lonlat(float(rec["Twd97_X"]), float(rec["Twd97_Y"])),
                "name": rec["lslno_old"].strip(), "place": f"{rec['County']}{rec['Town']}{rec['Vill']}".strip()}
        r.close()
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    print(f"土石流潛勢溪流 {len(out['debris'])} 條、大規模崩塌潛勢區 {len(out['landslide'])} 處 → {OUT}")


if __name__ == "__main__":
    main()
