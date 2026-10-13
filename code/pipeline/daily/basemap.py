#!/usr/bin/env python3
"""
事件佇列小地圖的底圖：每個情境一張「事件前」的光學影像（Google Earth Engine），範圍與小地圖完全相同。

    python -m pipeline.daily.basemap --project <GCP 專案 ID>          # 補缺的
    python -m pipeline.daily.basemap --project <ID> --force           # 全部重做

- 範圍：情境中心 ±windowKm/2，經緯度換算與 dashboard/duty.js 的 renderMinimap 相同
  （kx = 111.32·cos(lat)、ky = 110.54 km/度），所以底圖與事件多邊形、壩址標記會對齊。
- 時間：只用「事件前」的影像，回放不偷看答案。回放情境取觸發日前 GAP_DAYS 天往前；
  沒有觸發日的（負案例）取第一期過境前；自動監看窗格取啟用日前。
- 影像：Sentinel-2（Cloud Score+ 去雲）事件前 6 個月中位數為主；空白處依序用事件前 2 年的
  Sentinel-2、Landsat 8/9 補（2015～2016 年 Sentinel-2 影像很少）。
- 產出 code/dashboard/data/basemaps/<情境 id>.jpg，情境檔記 basemap 欄位（檔名、期間、來源）。
"""

from __future__ import annotations

import argparse
import json
import math
import sys
import urllib.request
from datetime import date, datetime, timedelta
from pathlib import Path

from . import gee

CODE = Path(__file__).resolve().parents[2]
REPO = CODE.parent
SCENARIOS = REPO / "data" / "raw" / "scenarios"
OUT = CODE / "dashboard" / "data" / "basemaps"

GAP_DAYS = 7          # 與 SAR 事件前基準的間隔一致
NEAR_DAYS = 183       # 主要：事件前半年
FAR_DAYS = 730        # 補空白：事件前兩年
CS_THRESHOLD = 0.65   # Cloud Score+ cs_cdf，越高越嚴格
SIZE = 512


def window_box(center: tuple, window_km: float) -> list:
    """[west, south, east, north]，與 duty.js renderMinimap 的換算相同。

    >>> [round(v, 5) for v in window_box((121.0, 23.7), 4.0)]
    [120.98038, 23.68191, 121.01962, 23.71809]
    """
    lon0, lat0 = center
    half = window_km / 2
    kx = 111.32 * math.cos(math.radians(lat0))
    ky = 110.54
    return [lon0 - half / kx, lat0 - half / ky, lon0 + half / kx, lat0 + half / ky]


def before_date(sc: dict) -> date:
    """這張底圖只能用這天以前的影像。

    >>> before_date({"trigger": {"time": "2025-07-21T17:54:00+08:00"}, "passes": []})
    datetime.date(2025, 7, 14)
    >>> before_date({"kind": "live", "trigger": {"time": "2026-10-11T08:00+08:00"}, "passes": []})
    datetime.date(2026, 10, 11)
    >>> before_date({"passes": [{"time": "2026-06-05T21:52:00+00:00"}]})
    datetime.date(2026, 5, 29)
    """
    if sc.get("kind") == "live" and sc.get("trigger", {}).get("time"):
        return datetime.fromisoformat(sc["trigger"]["time"]).date()   # 監看窗格：啟用日
    if sc.get("trigger", {}).get("time"):
        t = datetime.fromisoformat(sc["trigger"]["time"]).date()
    else:
        t = min(datetime.fromisoformat(p["time"]).date() for p in sc["passes"])
    return t - timedelta(days=GAP_DAYS)


def composite(ee, box, end: date):
    """事件前合成影像（S2 數值尺度，B4/B3/B2）。"""
    cs = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED")
    # 空集合的 median() 沒有波段；用全遮罩的影像代替，讓下一層去補（2015 年 Sentinel-2 還沒有影像）
    empty = ee.Image.constant([0, 0, 0]).rename(["B4", "B3", "B2"]).updateMask(0)

    def med(col):
        return ee.Image(ee.Algorithms.If(col.size().gt(0), col.median().select(["B4", "B3", "B2"]), empty))

    def s2(days):
        col = (ee.ImageCollection("COPERNICUS/S2_HARMONIZED").filterBounds(box)
                .filterDate((end - timedelta(days=days)).isoformat(), end.isoformat())
                .linkCollection(cs, ["cs_cdf"])
                .map(lambda i: i.updateMask(i.select("cs_cdf").gte(CS_THRESHOLD))))
        return med(col)

    def landsat():
        def prep(i):
            qa = i.select("QA_PIXEL")   # bit 3 雲、bit 4 雲影
            ok = qa.bitwiseAnd(1 << 3).eq(0).And(qa.bitwiseAnd(1 << 4).eq(0))
            return i.select(["B4", "B3", "B2"]).multiply(10000).updateMask(ok)
        col = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA").merge(ee.ImageCollection("LANDSAT/LC09/C02/T1_TOA"))
        return med(col.filterBounds(box).filterDate((end - timedelta(days=FAR_DAYS)).isoformat(), end.isoformat())
                   .map(prep))

    # 後面的蓋在前面上：近期 S2 優先，再來遠期 S2，最後 Landsat 補洞
    return ee.ImageCollection([landsat(), s2(FAR_DAYS), s2(NEAR_DAYS)]).mosaic()


def make(ee, sc: dict, out_dir: Path = OUT) -> dict:
    w, s, e, n = window_box(sc["center"], sc.get("windowKm", 4.0))
    box = ee.Geometry.Rectangle([w, s, e, n], "EPSG:4326", False)
    end = before_date(sc)
    img = composite(ee, box, end)
    url = img.getThumbURL({"region": box, "dimensions": SIZE, "crs": "EPSG:4326",
                           "min": 300, "max": 2500, "gamma": 1.2, "format": "jpg"})
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"{sc['id']}.jpg"
    with urllib.request.urlopen(url, timeout=120) as r:
        path.write_bytes(r.read())
    return {"file": f"data/basemaps/{path.name}", "before": end.isoformat(),
            "source": f"Sentinel-2（Cloud Score+ 去雲）事件前合成，{end.isoformat()} 以前；缺漏處以 Landsat 8/9 補"}


def main(ee=None, project=None, force: bool = False) -> dict:
    ee = ee or gee.init(project)
    done, failed = [], []
    for path in sorted(SCENARIOS.glob("*.json")):
        sc = json.loads(path.read_text(encoding="utf-8"))
        bm = sc.get("basemap")
        if not force and bm and (CODE / "dashboard" / bm["file"]).exists() and bm.get("before") == before_date(sc).isoformat():
            continue
        try:
            sc["basemap"] = make(ee, sc)
        except Exception as e:   # 單一情境失敗不影響其他
            print(f"  {sc['id']} 底圖失敗：{e}")
            failed.append(sc["id"])
            continue
        path.write_text(json.dumps(sc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        done.append(sc["id"])
    print(f"底圖：新做 {len(done)} 張" + (f"，失敗 {len(failed)}：{'、'.join(failed)}" if failed else ""))
    return {"made": len(done), "failed": len(failed)}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project")
    ap.add_argument("--force", action="store_true", help="全部重做")
    a = ap.parse_args()
    main(project=a.project, force=a.force)
