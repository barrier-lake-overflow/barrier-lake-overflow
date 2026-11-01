"""
抓取臺灣通用電子地圖水系資料（國土測繪中心 NLSC WFS），存成 GeoPackage。

用途：作為官方河道，與 DEM D8 河網疊合比對、計算堰塞湖候選點到最近河道的距離。

抓取的圖層
  WFS:EMAP_RIVERL  河川中線（線）  -> river_line
  WFS:EMAP_RIVERA  河川（面）      -> river_area
  WFS:EMAP_WATERA  面狀水域（面）  -> water_area

輸出
  data/cache/nlsc_water_mataian.gpkg（EPSG:3826, TWD97 二度分帶）
    river_line / river_area / water_area / aoi（實際裁切範圍）
  data/cache/raw/*.gml  原始回應（除錯用）

金鑰
  從 .env 的 NLSC_WFS_KEY 讀取，放在 HTTP Header 的 Authorization。
  沒帶金鑰時伺服器回 "Permission Denied"；村里界（VILLAGE_NLSC）是公開圖層，不需金鑰。

伺服器限制（見「國土測繪圖資服務雲介接服務技術手冊（WFS及API）」）
  矩形查詢要用 FILTER=<ogc:PropertyIsEqualTo> 搭配 PropertyName=box，
  單次範圍一般圖層最大 1000m x 1000m、村里界最大 10000m x 10000m，
  所以程式會依圖層自動把方框切成小塊。

執行
  pip install geopandas pyogrio requests python-dotenv truststore
  python code/scripts/fetch_nlsc_water.py

  若花蓮縣界無法從 WFS 取得，可另外指定縣市界檔案：
  python code/scripts/fetch_nlsc_water.py --county-file path/to/COUNTY_MOI.shp
"""

from __future__ import annotations

import argparse
import math
import os
import ssl
import sys
import time
from pathlib import Path

import geopandas as gpd
import pandas as pd
import requests
import truststore
from dotenv import find_dotenv, load_dotenv
from requests.adapters import HTTPAdapter
from shapely.geometry import box
from shapely.ops import transform as shp_transform

WFS_URL = "https://wfs.nlsc.gov.tw/WFS"

# 馬太鞍溪上游堰塞湖壩址，中心 (121.29752, 23.70061)，周圍約 7 km
DEFAULT_BBOX = (121.22885, 23.63755, 121.36619, 23.76367)  # minx, miny, maxx, maxy (EPSG:4326)

LAYERS = {
    "river_line": "WFS:EMAP_RIVERL",
    "river_area": "WFS:EMAP_RIVERA",
    "water_area": "WFS:EMAP_WATERA",
}
COUNTY_LAYER = "WFS:VILLAGE_NLSC"  # 村里界，用來組出花蓮縣界
COUNTY_NAME = "花蓮縣"
TARGET_CRS = "EPSG:3826"

# 單次查詢範圍上限（公尺），超過伺服器回「請求範圍過大」
MAX_TILE_M = {COUNTY_LAYER: 10000}
DEFAULT_MAX_TILE_M = 1000
TILE_MARGIN = 0.9  # 每塊只用上限的 90%，避免經緯度換算誤差踩線

# 伺服器若有單次筆數上限，回傳筆數剛好是這些數字時要縮小 --tile-scale
SUSPICIOUS_COUNTS = {100, 200, 500, 1000, 2000, 5000, 10000}


# ---------------------------------------------------------------- HTTP

class _NlscAdapter(HTTPAdapter):
    """NLSC 的政府憑證缺 Subject Key Identifier，Python 3.13+ 的 OpenSSL 驗證會拒絕。
    改用 truststore 交給作業系統（Windows / macOS）的憑證驗證，curl 與瀏覽器也是這樣通過的。"""

    def init_poolmanager(self, *args, **kwargs):
        kwargs["ssl_context"] = truststore.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        return super().init_poolmanager(*args, **kwargs)


SESSION = requests.Session()
SESSION.mount("https://", _NlscAdapter())


def get_key() -> str:
    load_dotenv(find_dotenv(usecwd=True))
    key = os.getenv("NLSC_WFS_KEY", "").strip()
    if not key:
        sys.exit("找不到 NLSC_WFS_KEY，請在專案根目錄的 .env 加上：NLSC_WFS_KEY=你的金鑰")
    return key


def box_filter(bbox: tuple[float, float, float, float]) -> str:
    """NLSC 的矩形查詢：PropertyName=box，值為「左下經度,左下緯度 右上經度,右上緯度」。"""
    minx, miny, maxx, maxy = bbox
    return ('<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:PropertyIsEqualTo>'
            '<ogc:PropertyName>box</ogc:PropertyName>'
            f'<ogc:Literal>{minx:.6f},{miny:.6f} {maxx:.6f},{maxy:.6f}</ogc:Literal>'
            '</ogc:PropertyIsEqualTo></ogc:Filter>')


def fetch_gml(typename: str, bbox: tuple[float, float, float, float], key: str,
              out_path: Path, retries: int = 3) -> Path | None:
    """抓一個 bbox 的 GetFeature，存成 .gml。沒有資料時回傳 None。"""
    params = {
        "SERVICE": "WFS",
        "VERSION": "1.0.0",
        "REQUEST": "GetFeature",
        "TYPENAME": typename,
        "SRSNAME": "EPSG:4326",
        "FILTER": box_filter(bbox),
    }
    headers = {"Authorization": key}

    last_err = None
    for attempt in range(1, retries + 1):
        try:
            r = SESSION.get(WFS_URL, params=params, headers=headers, timeout=180)
            if r.status_code in (401, 403) or r.content.strip() == b"Permission Denied":
                sys.exit(f"[{typename}] 伺服器拒絕存取：金鑰無效、沒有此圖層權限，"
                         f"或這台電腦的 IP 不在白名單內。")
            r.raise_for_status()
            text = r.content
            head = text[:3000].decode("utf-8", errors="ignore")
            if "ServiceException" in head or "ExceptionReport" in head:
                raise RuntimeError(f"WFS 回傳錯誤：{head[:800]}")
            if head.lstrip().lower().startswith("<!doctype html") or "<html" in head.lower()[:200]:
                raise RuntimeError(f"回傳的是網頁而不是 GML：{head[:300]}")
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(text)
            if b"featureMember" not in text and b"member>" not in text:
                return None  # 這塊沒有資料
            return out_path
        except (requests.RequestException, RuntimeError) as e:
            last_err = e
            print(f"  第 {attempt} 次失敗：{e}")
            time.sleep(3 * attempt)
    raise RuntimeError(f"[{typename}] 抓取失敗：{last_err}")


# ---------------------------------------------------------------- 讀取與整理

def _swap_xy(geom):
    return shp_transform(lambda x, y, z=None: (y, x), geom)


def read_gml(path: Path) -> gpd.GeoDataFrame:
    gdf = gpd.read_file(path)
    if gdf.crs is None:
        gdf = gdf.set_crs("EPSG:4326")
    gdf = gdf.to_crs("EPSG:4326") if gdf.crs.to_epsg() != 4326 else gdf
    # 有些伺服器 EPSG:4326 會給「緯度, 經度」，偵測到就對調
    if len(gdf):
        minx, miny, maxx, maxy = gdf.total_bounds
        if 20 <= minx <= 27 and 118 <= miny <= 124:
            print("  偵測到座標順序為 緯度,經度，自動對調")
            gdf["geometry"] = gdf.geometry.apply(_swap_xy)
    return gdf


def split_bbox(bbox, max_m: float):
    """把經緯度方框切成每塊邊長不超過 max_m 公尺的小塊。"""
    minx, miny, maxx, maxy = bbox
    coslat = math.cos(math.radians((miny + maxy) / 2))
    nx = max(1, math.ceil((maxx - minx) * 111320 * coslat / max_m))
    ny = max(1, math.ceil((maxy - miny) * 110574 / max_m))
    dx, dy = (maxx - minx) / nx, (maxy - miny) / ny
    for i in range(nx):
        for j in range(ny):
            yield i, j, nx * ny, (minx + i * dx, miny + j * dy, minx + (i + 1) * dx, miny + (j + 1) * dy)


def fetch_layer(typename: str, bbox, key: str, raw_dir: Path, tile_scale: float = 1.0) -> gpd.GeoDataFrame:
    parts = []
    tag = typename.split(":")[-1]
    max_m = MAX_TILE_M.get(typename, DEFAULT_MAX_TILE_M) * TILE_MARGIN * tile_scale
    for i, j, n, tb in split_bbox(bbox, max_m):
        if i == 0 and j == 0:
            print(f"  分成 {n} 塊（每塊約 {max_m:.0f} m）")
        p = fetch_gml(typename, tb, key, raw_dir / f"{tag}_{i}_{j}.gml")
        if p is None:
            continue
        g = read_gml(p)
        if len(g) in SUSPICIOUS_COUNTS:
            print(f"  ⚠ {tag} 第 ({i},{j}) 塊剛好 {len(g)} 筆，可能被伺服器截斷，請用較小的 --tile-scale 再跑一次")
        parts.append(g)
    if not parts:
        return gpd.GeoDataFrame(geometry=[], crs="EPSG:4326")
    gdf = gpd.GeoDataFrame(pd.concat(parts, ignore_index=True), crs="EPSG:4326")

    # 分塊抓取時，跨塊的圖徵會重複出現 -> 去重
    # 伺服器回傳完整圖徵（不在塊邊界截斷），同一圖徵的幾何完全相同，所以用幾何去重。
    # 不能用 gml_id：每次回應都從 1 重新編號；各圖層自己的 ID（如 EMAP_RIVERA 的 ID）也不保證唯一。
    before = len(gdf)
    gdf = gdf.loc[~gdf.geometry.to_wkb().duplicated()]
    if before != len(gdf):
        print(f"  去除跨塊重複 {before - len(gdf)} 筆")
    return gdf.reset_index(drop=True)


# ---------------------------------------------------------------- 花蓮縣界

def _pick_county(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame | None:
    """在任一文字欄位中找含有「花蓮縣」的列，合併成單一面。"""
    for col in gdf.columns:
        if col == "geometry" or not (pd.api.types.is_object_dtype(gdf[col])
                                     or pd.api.types.is_string_dtype(gdf[col])):
            continue
        s = gdf[col].astype(str).str.replace("台", "臺")
        hit = s.str.startswith("花蓮縣") | (s == "花蓮")
        if hit.any():
            sel = gdf.loc[hit]
            print(f"  以欄位「{col}」篩選花蓮縣（{len(sel)} 筆）")
            geom = sel.geometry.union_all() if hasattr(sel.geometry, "union_all") else sel.geometry.unary_union
            return gpd.GeoDataFrame(geometry=[geom], crs=gdf.crs)
    return None


def get_hualien(bbox, key: str, raw_dir: Path, county_file: str | None):
    if county_file:
        print(f"使用指定的縣市界檔案：{county_file}")
        g = gpd.read_file(county_file)
        g = g.to_crs("EPSG:4326")
        hl = _pick_county(g)
        if hl is None:
            sys.exit("指定的縣市界檔案中找不到「花蓮縣」")
        return hl

    print(f"抓取村里界 {COUNTY_LAYER} 以組出花蓮縣界…")
    try:
        g = fetch_layer(COUNTY_LAYER, bbox, key, raw_dir)
    except (SystemExit, RuntimeError) as e:
        print(f"  無法取得村里界：{e}")
        return None
    if g.empty:
        return None
    return _pick_county(g)


# ---------------------------------------------------------------- 主程式

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--bbox", nargs=4, type=float, default=DEFAULT_BBOX,
                    metavar=("MINLON", "MINLAT", "MAXLON", "MAXLAT"))
    ap.add_argument("--tile-scale", type=float, default=1.0,
                    help="分塊大小倍率（預設 1，即伺服器上限的 90%%；資料被截斷時改成 0.5）")
    ap.add_argument("--out", default="data/cache/nlsc_water_mataian.gpkg")
    ap.add_argument("--county-file", default=None, help="縣市界檔案（WFS 取不到村里界時使用）")
    ap.add_argument("--no-county-clip", action="store_true", help="不裁切花蓮縣界")
    args = ap.parse_args()
    if not 0 < args.tile_scale <= 1:
        ap.error("--tile-scale 要介於 0 與 1 之間")

    key = get_key()
    bbox = tuple(args.bbox)
    out = Path(args.out)
    raw_dir = out.parent / "raw"
    out.parent.mkdir(parents=True, exist_ok=True)

    # 裁切範圍：方框 ∩ 花蓮縣
    aoi = gpd.GeoDataFrame(geometry=[box(*bbox)], crs="EPSG:4326")
    if not args.no_county_clip:
        hl = get_hualien(bbox, key, raw_dir, args.county_file)
        if hl is None:
            sys.exit("無法取得花蓮縣界，請用 --county-file 指定縣市界檔案"
                     "（例如政府資料開放平臺「直轄市、縣市界線」），或加 --no-county-clip 略過。")
        aoi = gpd.GeoDataFrame(geometry=[aoi.geometry[0].intersection(hl.geometry[0])], crs="EPSG:4326")
        pct = aoi.to_crs(TARGET_CRS).area[0] / gpd.GeoSeries([box(*bbox)], crs="EPSG:4326").to_crs(TARGET_CRS).area[0]
        print(f"方框中屬於花蓮縣的面積比例：{pct:.1%}")

    if out.exists():
        out.unlink()

    for out_layer, typename in LAYERS.items():
        print(f"抓取 {typename} -> {out_layer}")
        gdf = fetch_layer(typename, bbox, key, raw_dir, args.tile_scale)
        if gdf.empty:
            print("  這個範圍沒有資料")
            continue
        gdf = gpd.clip(gdf, aoi)
        gdf = gdf.loc[~gdf.geometry.is_empty].copy()
        gdf["source_layer"] = typename
        gdf = gdf.to_crs(TARGET_CRS)
        gdf.to_file(out, layer=out_layer, driver="GPKG")
        if gdf.geom_type.str.contains("Line").any():
            print(f"  {len(gdf)} 筆，總長 {gdf.length.sum() / 1000:.2f} km")
        else:
            print(f"  {len(gdf)} 筆，總面積 {gdf.area.sum() / 1e6:.3f} km²")

    aoi.to_crs(TARGET_CRS).to_file(out, layer="aoi", driver="GPKG")
    print(f"\n完成：{out}")
    print("圖層：", ", ".join(gpd.list_layers(out)["name"]))


if __name__ == "__main__":
    main()
