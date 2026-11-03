#!/usr/bin/env python3
"""
漏報診斷：全清冊回放中某一期為什麼沒有候選。只讀影像與結果檔，不改偵測程式。

兩件事：
1. 逐關拆解：事件後「背向散射低於門檻、事件前沒有」的像元，分別被哪一關擋掉
   （疊置、陰影、陡坡、DEM 無資料 → 坡度雙門檻 → 最小面積 → 貼河道）。
   每一關都用 run_sar_chain 同一套函式與參數，最後一關的結果要和結果檔一致。
2. 推估湖面：用事件前 DEM 從壩址往上游淹水，水位調到清冊蓄水量，得到「湖應該在哪裡」的範圍，
   再看這個範圍內的 σ⁰、遮罩。只限壩址的上游集水區，不往下游淹。
   這是粗估：事件前 DEM 沒有壩體、30 m DEM 重採樣到 10 m、清冊蓄水量本身也是估計。

在 code/ 底下：

    python scripts/diagnose_missed_lake.py --lake bl070 --day 20250708 --later 20250720

輸出：終端機摘要、docs/evidence/<lake>_diagnosis_<day>.png（需要 matplotlib）、
docs/results/<lake>_diagnosis_<day>.json。
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from collections import deque
from pathlib import Path

import numpy as np
from scipy import ndimage

CODE = Path(__file__).resolve().parents[1]
REPO = CODE.parent
sys.path.insert(0, str(CODE))
sys.path.insert(0, str(CODE / "scripts"))

from pipeline.preprocess.raster import crop_window  # noqa: E402
from pipeline.attribution.annotate import read_lakes  # noqa: E402
from pipeline.detect.barrier_lake import (EIGHT, fill_depressions,  # noqa: E402
                                          run_sar_chain, seed_filter)
from pipeline.detect.water import SAR_WATER_DB_DEFAULT  # noqa: E402
from pipeline.events import replay as R  # noqa: E402
from pipeline.preprocess.mask import S1_LOOK_AZIMUTH_DEG  # noqa: E402
from pipeline.preprocess.sar import cell_size_xy_m, lee_filter, load_s1_geotiff  # noqa: E402

RAW = REPO / "data" / "raw" / "sentinel1" / "replay"
DERIVED = REPO / "data" / "derived"
LAKES_JS = CODE / "dashboard" / "data" / "lakes.js"

# 與 run_sar_series.py／analyze_sar_change.py 正式流程相同
MAX_WATER_SLOPE_DEG = 35.0
SEED_SLOPE_DEG = 20.0
MIN_AREA_M2 = 5000.0
HALF_WIDTH_KM = 2.0
THR = SAR_WATER_DB_DEFAULT
SNAP_RADIUS_M = 200.0

_D8 = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def d8_receivers(z: np.ndarray) -> np.ndarray:
    """每個像元流向的下游像元（攤平索引），沒有就 -1。和 barrier_lake.flow_accumulation_d8 同一套規則。"""
    rows, cols = z.shape
    padded = np.pad(z, 1, constant_values=np.nan)
    best = np.zeros_like(z)
    recv = np.full(z.shape, -1, dtype=np.int64)
    rr, cc = np.mgrid[0:rows, 0:cols]
    for dr, dc in _D8:
        neigh = padded[1 + dr:1 + dr + rows, 1 + dc:1 + dc + cols]
        with np.errstate(invalid="ignore"):
            drop = np.nan_to_num((z - neigh) / math.hypot(dr, dc), nan=0.0)
        better = drop > best
        best = np.where(better, drop, best)
        recv = np.where(better, (rr + dr) * cols + (cc + dc), recv)
    return recv.ravel()


def upstream_of(recv: np.ndarray, shape: tuple, outlet: int) -> np.ndarray:
    """流經 outlet 的所有像元（outlet 的集水區）。"""
    children: dict = {}
    for i, r in enumerate(recv):
        if r >= 0:
            children.setdefault(int(r), []).append(i)
    seen = np.zeros(recv.size, dtype=bool)
    q = deque([outlet])
    seen[outlet] = True
    while q:
        for ch in children.get(q.popleft(), []):
            if not seen[ch]:
                seen[ch] = True
                q.append(ch)
    return seen.reshape(shape)


def lake_footprint(dem: np.ndarray, dam_rc: tuple, catchment: np.ndarray, cell_m2: float,
                   volume_wan: float) -> tuple:
    """從壩址往上游淹到清冊蓄水量：回傳 (遮罩, 水位, 實際容積 萬m³)。只算集水區內、與壩址連通的像元。"""
    floor = float(dem[dam_rc])
    allowed = catchment & np.isfinite(dem)
    level, mask, vol = floor, None, 0.0
    for level in np.arange(floor + 1, floor + 400, 1.0):
        lab, _ = ndimage.label(allowed & (dem <= level), structure=EIGHT)
        if lab[dam_rc] == 0:
            continue
        mask = lab == lab[dam_rc]
        # 填窪後的平坦區會讓 D8 集水區沿著列方向拉出 1 像元寬的細線，開運算去掉
        opened = ndimage.binary_opening(mask, structure=EIGHT)
        if opened.any():
            ol, on = ndimage.label(opened, structure=EIGHT)
            sizes = ndimage.sum(opened, ol, index=np.arange(1, on + 1))
            mask = ol == (int(np.argmax(sizes)) + 1)
        vol = float(np.sum(level - dem[mask])) * cell_m2 / 1e4
        if vol >= volume_wan:
            break
    return mask, float(level), vol


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--lake", required=True, help="清冊編號，例如 bl070")
    ap.add_argument("--day", required=True, help="要診斷的那一期 YYYYMMDD")
    ap.add_argument("--later", default=None, help="複核期 YYYYMMDD（給的話一起比對持續性）")
    ap.add_argument("--no-figure", action="store_true")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    manifest = R.load_manifest()["lakes"][args.lake]
    sid = manifest["scenarioId"]
    lake = next(x for x in read_lakes(LAKES_JS) if x["id"] == args.lake)
    lon, lat = lake["lon"], lake["lat"]
    orbit = manifest["pass"]

    full = {k: load_s1_geotiff(str(p)) for k, p in {
        "pre": RAW / f"S1_VV_{sid}_pre.tif", "post": RAW / f"S1_VV_{sid}_{args.day}.tif",
        "dem": RAW / f"NASADEM_{sid}.tif",
        **({"later": RAW / f"S1_VV_{sid}_{args.later}.tif"} if args.later else {})}.items()}
    win = {}
    for k, v in full.items():
        win[k], row0, col0 = crop_window(v, lon, lat, HALF_WIDTH_KM, key="db")
    dx, dy = cell_size_xy_m(full["pre"]["transform"], True, center_lat=lat)
    px_ha = dx * dy / 1e4
    a, _, c, _, e, f = full["pre"]["transform"]
    wt = (a, 0.0, c + col0 * a, 0.0, e, f + row0 * e)
    dam_rc0 = (int(round((lat - wt[5]) / e - 0.5)), int(round((lon - wt[2]) / a - 0.5)))

    # 正式流程：結果要和 final_*.json 一致
    out = run_sar_chain(win["pre"], win["post"], (dx, dy), dem=win["dem"],
                        later_post_dbs=[win["later"]] if args.later else [], transform=wt,
                        look_azimuth_deg=S1_LOOK_AZIMUTH_DEG[orbit],
                        max_water_slope_deg=MAX_WATER_SLOPE_DEG, seed_slope_deg=SEED_SLOPE_DEG,
                        min_area_m2=MIN_AREA_M2)
    inv = out["invalid"]

    # ── 1. 逐關拆解
    pre_w, post_w = lee_filter(win["pre"], size=3), lee_filter(win["post"], size=3)
    with np.errstate(invalid="ignore"):
        dark_new = (post_w < THR) & ~(pre_w < THR)
    nodata = np.isnan(win["dem"])
    lay, sh = inv["layover"], inv["shadow"]
    steep = inv["water"] & ~(lay | sh | nodata)
    after_mask = dark_new & ~inv["water"]
    gentle = np.nan_to_num(inv["slope_deg"], nan=np.inf) <= SEED_SLOPE_DEG
    after_seed = seed_filter(after_mask, gentle, 1)
    assert np.array_equal(after_seed, out["new_water"]), "逐關拆解和 run_sar_chain 不一致"

    groups, n = ndimage.label(ndimage.binary_dilation(after_seed, EIGHT, iterations=3), structure=EIGHT)
    labeled = np.where(after_seed, groups, 0)
    river = out["river"]
    river_zone = ndimage.binary_dilation(river, EIGHT, iterations=2)
    min_px = int(math.ceil(MIN_AREA_M2 / (dx * dy)))
    small = np.zeros_like(after_seed)
    off_river = np.zeros_like(after_seed)
    comps = []
    for lab in range(1, n + 1):
        comp = labeled == lab
        npx = int(comp.sum())
        if npx == 0:
            continue
        on = bool((comp & river_zone).any() or (ndimage.binary_dilation(comp, EIGHT) & river).any())
        comps.append(npx)
        if npx < min_px:
            small |= comp
        elif not on:
            off_river |= comp
    stages = {
        "darkNewBeforeMask": dark_new.sum(),
        "maskedLayover": (dark_new & lay).sum(),
        "maskedShadow": (dark_new & sh & ~lay).sum(),
        "maskedSteepOnly": (dark_new & steep).sum(),
        "maskedNoData": (dark_new & nodata & ~lay & ~sh).sum(),
        "afterMask": after_mask.sum(),
        "droppedBySeedSlope": (after_mask & ~after_seed).sum(),
        "afterSeed": after_seed.sum(),
        "droppedTooSmall": small.sum(),
        "droppedOffRiver": off_river.sum(),
    }
    stages_ha = {k: round(float(v) * px_ha, 2) for k, v in stages.items()}
    largest_ha = round(max(comps) * px_ha, 3) if comps else 0.0

    # ── 2. 推估湖面（全幅 DEM，避免湖超出 4 km 窗格被切掉）
    dem_full = full["dem"]["db"]
    filled = fill_depressions(dem_full)
    recv = d8_receivers(filled)
    from pipeline.detect.barrier_lake import flow_accumulation_d8
    acc = flow_accumulation_d8(filled)
    fa, _, fc, _, fe, ff = full["dem"]["transform"]
    r0 = int((lat - ff) / fe)
    c0 = int((lon - fc) / fa)
    rad = int(math.ceil(SNAP_RADIUS_M / min(dx, dy)))
    sub = acc[r0 - rad:r0 + rad + 1, c0 - rad:c0 + rad + 1]
    sr, sc = np.unravel_index(int(np.argmax(sub)), sub.shape)
    dam_full = (r0 - rad + sr, c0 - rad + sc)
    snap_m = math.hypot((dam_full[0] - r0) * dy, (dam_full[1] - c0) * dx)
    catch = upstream_of(recv, dem_full.shape, dam_full[0] * dem_full.shape[1] + dam_full[1])
    foot_full, level, vol = lake_footprint(dem_full, dam_full, catch, dx * dy, lake["volume"])
    foot = foot_full[row0:row0 + win["pre"].shape[0], col0:col0 + win["pre"].shape[1]]
    extends_out = int(foot_full.sum() - foot.sum())

    fp = foot
    post_vals, pre_vals = post_w[fp], pre_w[fp]
    foot_stats = {
        "areaHectare": round(float(fp.sum()) * px_ha, 1),
        "waterLevelM": round(level, 0),
        "damFloorM": round(float(dem_full[dam_full]), 0),
        "volumeWanM3": round(vol, 0),
        "pixelsOutsideWindow": extends_out,
        "damSnapM": round(snap_m, 0),
        "maskedPct": {
            "layover": round(100 * float(lay[fp].mean()), 1),
            "shadow": round(100 * float((sh & ~lay)[fp].mean()), 1),
            "steepOnly": round(100 * float(steep[fp].mean()), 1),
            "any": round(100 * float(inv["water"][fp].mean()), 1),
        },
        "slopeMedianDeg": round(float(np.nanmedian(inv["slope_deg"][fp])), 1),
        "gentlePct": round(100 * float(gentle[fp].mean()), 1),
        "postBelowThrPct": round(100 * float(np.mean(post_vals < THR)), 1),
        "preBelowThrPct": round(100 * float(np.mean(pre_vals < THR)), 1),
        "postMedianDb": round(float(np.nanmedian(post_vals)), 1),
        "preMedianDb": round(float(np.nanmedian(pre_vals)), 1),
        "medianChangeDb": round(float(np.nanmedian(post_vals - pre_vals)), 1),
        "darkenedBy3dbPct": round(100 * float(np.mean((post_vals - pre_vals) <= -3)), 1),
        "darkNewInsideHa": round(float((dark_new & fp).sum()) * px_ha, 2),
        "darkNewInsideUnmaskedHa": round(float((after_mask & fp).sum()) * px_ha, 2),
    }
    if args.later:
        later_w = lee_filter(win["later"], size=3)
        foot_stats["laterBelowThrPct"] = round(100 * float(np.mean(later_w[fp] < THR)), 1)
        foot_stats["laterMedianDb"] = round(float(np.nanmedian(later_w[fp])), 1)

    summary = {
        "lake": args.lake, "name": lake["name"], "day": args.day, "later": args.later,
        "orbit": f"{orbit} {manifest['orbit']}", "inventory": {
            "formed": lake["formed"], "breach": lake.get("breachDate"), "durationDays": lake.get("duration"),
            "volumeWanM3": lake["volume"]},
        "thresholdDb": THR, "stagesHectare": stages_ha, "largestComponentHectare": largest_ha,
        "minAreaHectare": MIN_AREA_M2 / 1e4,
        "candidates": [c.to_dict() | {"centroidXY": None} for c in out["candidates"]],
        "expectedLake": foot_stats,
        "note": "推估湖面是用事件前 DEM 與清冊蓄水量的粗估，只供判斷湖大概在哪裡、多大",
    }
    json_path = REPO / "docs" / "results" / f"{args.lake}_diagnosis_{args.day}.json"
    json_path.write_text(json.dumps(summary, ensure_ascii=False, indent=1, default=float) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=1, default=float))
    print(f"\n寫出 {json_path}")

    if args.no_figure:
        return
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.colors import ListedColormap
    from matplotlib import font_manager
    have = {x.name for x in font_manager.fontManager.ttflist}
    matplotlib.rcParams["font.family"] = [n for n in ("Microsoft JhengHei", "Noto Sans CJK TC", "PingFang TC")
                                          if n in have][:1] + ["sans-serif"]
    matplotlib.rcParams["axes.unicode_minus"] = False

    h, w = win["pre"].shape
    ext = (wt[2], wt[2] + w * a, wt[5] + h * e, wt[5])
    fig, axs = plt.subplots(2, 3, figsize=(16, 11), constrained_layout=True)

    def deco(ax, title):
        ax.contour(np.linspace(ext[0], ext[1], w), np.linspace(ext[3], ext[2], h), fp.astype(float),
                   levels=[0.5], colors="#00e5ff", linewidths=1.4)
        ax.plot(lon, lat, "o", ms=7, mfc="none", mec="red", mew=2)
        ax.set_title(title, fontsize=11)
        ax.set_xticks([]); ax.set_yticks([])

    for ax, arr, t in ((axs[0, 0], pre_w, "事件前中位數 σ⁰ VV（dB）"),
                       (axs[0, 1], post_w, f"{args.day[4:6]}/{args.day[6:]} σ⁰ VV（dB）")):
        im = ax.imshow(arr, extent=ext, cmap="gray", vmin=-25, vmax=0)
        deco(ax, t)
    fig.colorbar(im, ax=axs[0, :2], shrink=0.6, label="dB（背向散射低＝深色）")
    im = axs[0, 2].imshow(post_w - pre_w, extent=ext, cmap="RdBu", vmin=-8, vmax=8)
    deco(axs[0, 2], "變化（事件後 − 事件前，dB）")
    fig.colorbar(im, ax=axs[0, 2], shrink=0.6)

    mask_cls = np.zeros((h, w), dtype=int)
    mask_cls[steep] = 1
    mask_cls[sh & ~lay] = 2
    mask_cls[lay] = 3
    axs[1, 0].imshow(mask_cls, extent=ext, cmap=ListedColormap(["#202020", "#7f8c8d", "#2c3e50", "#d35400"]),
                     vmin=0, vmax=3, interpolation="nearest")
    deco(axs[1, 0], "判水遮罩：灰＝坡度 > 35°、藍黑＝陰影、橘＝疊置")

    fate = np.zeros((h, w), dtype=int)
    fate[dark_new & inv["water"]] = 1
    fate[after_mask & ~after_seed] = 2
    fate[small] = 3
    fate[off_river] = 4
    axs[1, 1].imshow(np.where(np.isnan(post_w), np.nan, post_w), extent=ext, cmap="gray", vmin=-25, vmax=0, alpha=0.5)
    axs[1, 1].imshow(np.ma.masked_equal(fate, 0), extent=ext,
                     cmap=ListedColormap(["#e74c3c", "#f1c40f", "#9b59b6", "#3498db"]), vmin=1, vmax=4,
                     interpolation="nearest")
    deco(axs[1, 1], "低於門檻的新像元：紅＝被遮罩、黃＝雙門檻、紫＝面積不足、藍＝未貼河道")

    im = axs[1, 2].imshow(win["dem"], extent=ext, cmap="terrain")
    axs[1, 2].contour(np.linspace(ext[0], ext[1], w), np.linspace(ext[3], ext[2], h), river.astype(float),
                      levels=[0.5], colors="#1f4e79", linewidths=0.6)
    deco(axs[1, 2], f"事件前 DEM、河網；青框＝推估湖面（水位 {level:.0f} m，{foot_stats['areaHectare']} 公頃）")
    fig.colorbar(im, ax=axs[1, 2], shrink=0.6, label="m")
    fig.suptitle(f"{lake['name']}（{args.lake}）{args.day[:4]}-{args.day[4:6]}-{args.day[6:]} 漏報診斷"
                 f"　紅圈＝清冊壩址　{orbit} {manifest['orbit']}　4 km 窗格", fontsize=13)
    png = REPO / "docs" / "evidence" / f"{args.lake}_diagnosis_{args.day}.png"
    fig.savefig(png, dpi=110)
    print(f"寫出 {png}")


if __name__ == "__main__":
    main()
