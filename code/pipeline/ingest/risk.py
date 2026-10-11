#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
風險模型 → dashboard/data/risk.js

邏輯迴歸係數與特徵平均值寫死在下方（來自 make_risk_snapshot.py，以 ERA5-Land 網格雨量訓練）。
雨量取 GSMaP v8 雨量計校正版（Google Earth Engine）在各湖位置的 1／3／7／30 天累積，
同樣是網格雨量、四個時間窗都是實際值。沒給 --project（或 GEE 失敗）時用訓練平均值佔位，
RISK_MODEL_META.mode 會標明。每日排程（pipeline.daily.run）會自動帶入 GSMaP。

data/raw/risk/ 底下的舊檔已不再讀取。

    python -m pipeline.ingest.risk --project <GCP 專案 ID> [--lakes ...] [--out ...]
    python -m pipeline.ingest.risk            # 不連網，訓練平均值佔位
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import os
import re
import sys

from typing import Optional

DEFAULT_LAKES = "dashboard/data/lakes.js"
DEFAULT_OUT = "dashboard/data/risk.js"

# ── ERA5 訓練的 Logistic 公式（原始尺度，直接代未標準化雨量）──
# 數字照抄自 package 的 make_risk_snapshot.py，係數已固化，不用碰。
LOGIT_INTERCEPT = -3.0259088850754257
LOGIT_COEF_RAW = {
    "rain_7d": 0.03584177519291969, "rain_30d": -0.004287918499608312,
    "formed_by_rain": 0.8962255211119667, "rain_3d": -0.009245420542333044,
    "formed_by_quake": 0.7759403879983273, "volume": -0.327464903294034,
    "rain_1d": 0.007929487298660217,
}
FEATURE_MEANS = {
    "rain_7d": 51.235, "rain_30d": 218.283, "formed_by_rain": 0.584,
    "rain_3d": 21.968, "formed_by_quake": 0.264, "volume": 0.288,
    "rain_1d": 7.322,
}
N_POSITIVES = 12
DISCLAIMER = ("風險為模型推估，非現地實測；模型正例極少，"
              "泛化未驗證，僅供輔助判斷。")


def logit_prob(features: dict) -> float:
    z = LOGIT_INTERCEPT
    for key, coef in LOGIT_COEF_RAW.items():
        x = features.get(key)
        z += coef * (float(x) if x is not None else FEATURE_MEANS.get(key, 0.0))
    return 1.0 / (1.0 + math.exp(-z))


def zh_level(p: float) -> str:
    return "高" if p >= 0.5 else "低"


def alert_level(p: float) -> str:
    if p >= 0.80:
        return "IMMEDIATE"
    if p >= 0.50:
        return "URGENT"
    if p >= 0.30:
        return "WATCH"
    return "STABLE"


# ── 讀清冊（沿用本專案已產生的 lakes.js，不需另一份湖泊清單檔）──

def load_lakes(lakes_js_path: str) -> list[dict]:
    """從 dashboard/data/lakes.js 取出全部湖泊，轉成套公式需要的特徵。

    causeKey 已由 pipeline.ingest.inventory 標好（rain/quake），
    不需要像 package 原版那樣用文字比對猜測誘因。
    volume 清冊單位是萬 m³，公式要的是百萬 m³ → 除以 100
    （與 package 的 make_lakes_static.py 相同換算）。
    """
    with open(lakes_js_path, encoding="utf-8") as f:
        text = f.read()
    m = re.search(r"window\.BARRIER_LAKES\s*=\s*(\[.*?\]);", text, re.S)
    if not m:
        raise SystemExit(f"✗ 在 {lakes_js_path} 找不到 window.BARRIER_LAKES = [...]")
    lakes = json.loads(m.group(1))

    out = []
    for lk in lakes:
        name, lat, lon = lk.get("name"), lk.get("lat"), lk.get("lon")
        if not name or lat is None or lon is None:
            continue
        vol_wan = lk.get("volume")
        out.append({
            "name": name,
            "lat": float(lat),
            "lon": float(lon),
            "volume": (float(vol_wan) / 100.0) if vol_wan not in (None, "") else None,
            "formed_by_rain": 1 if lk.get("causeKey") == "rain" else 0,
            "formed_by_quake": 1 if lk.get("causeKey") == "quake" else 0,
        })
    return out


def write_risk_js(path: str, risk: dict, meta: dict) -> None:
    body = json.dumps(risk, ensure_ascii=False, indent=1)
    meta_body = json.dumps(meta, ensure_ascii=False, indent=1)
    out = (
        "/* 由 pipeline/ingest/risk.py 產生，請勿手動編輯。\n"
        "   模型與係數採用 package（make_risk_snapshot.py）版本，\n"
        "   雨量特徵來自 GSMaP v8 雨量計校正版（或 offline 平均值佔位，\n"
        "   見 RISK_MODEL_META.mode）。\n"
        "   注意：n_positives 極少（見 RISK_MODEL_META.nPositives），\n"
        "   模型驗證方式與泛化能力尚待確認，前端須如實揭露此限制，\n"
        "   不可把風險分數當成已驗證的預測值呈現。 */\n\n"
        f"window.LAKE_RISK = {body};\n\n"
        f"window.RISK_MODEL_META = {meta_body};\n"
    )
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(out)


RAIN_KEYS = ("rain_1d", "rain_3d", "rain_7d", "rain_30d")
RAIN_HOURS = {"rain_1d": 24, "rain_3d": 72, "rain_7d": 168, "rain_30d": 720}


def gsmap_rain(lakes: list, project: Optional[str] = None) -> tuple:
    """各湖 GSMaP 1／3／7／30 天累積（以 GSMaP 最新一筆為終點）。回傳 ({湖名: {rain_*}}, 終點時間)。"""
    from pipeline.daily import gee
    ee = gee.init(project)
    end = gee.gsmap_latest(ee)
    pts = {lk["name"]: (lk["lon"], lk["lat"]) for lk in lakes}
    got = gee.gsmap_totals(ee, pts, end, hours=tuple(RAIN_HOURS.values()))
    return ({name: {k: v.get(f"h{h}") for k, h in RAIN_HOURS.items()} for name, v in got.items()},
            end.isoformat(timespec="minutes"))


def main(lakes_path: str, out_path: str, rain_by_lake: Optional[dict] = None,
         rain_as_of: Optional[str] = None) -> None:
    """rain_by_lake：{湖名: {rain_1d, rain_3d, rain_7d, rain_30d}}；None 時用訓練平均值佔位。"""
    lakes = load_lakes(lakes_path)
    if rain_by_lake is None:
        print("⚠ 沒有雨量資料 → 用訓練平均值佔位（僅測流程，非真雨量）")

    risk = {}
    n_hi = 0
    for lk in lakes:
        got = (rain_by_lake or {}).get(lk["name"]) or {}
        # 個別缺值（例如 GSMaP 在該點無資料）用訓練平均值補
        rain = {k: got[k] if got.get(k) is not None else FEATURE_MEANS[k] for k in RAIN_KEYS}

        features = dict(rain)
        features["volume"] = lk["volume"] if lk["volume"] is not None else FEATURE_MEANS["volume"]
        features["formed_by_rain"] = lk["formed_by_rain"]
        features["formed_by_quake"] = lk["formed_by_quake"]

        p = logit_prob(features)
        if p >= 0.5:
            n_hi += 1
        risk[lk["name"]] = {
            "date": dt.date.today().isoformat(),
            "rain_1d": rain["rain_1d"], "rain_3d": rain["rain_3d"],
            "rain_7d": rain["rain_7d"], "rain_30d": rain["rain_30d"],
            "volume": features["volume"],
            "formed_by_quake": features["formed_by_quake"],
            "formed_by_rain": features["formed_by_rain"],
            "risk_prob": round(p, 4),
            "risk_level": zh_level(p),
            "alert": alert_level(p),
        }

    meta = {
        "model": "Logistic (package: make_risk_snapshot.py)",
        "mode": (f"GSMaP v8 雨量計校正（衛星估計，至 {rain_as_of}）" if rain_by_lake is not None
                 else "OFFLINE(訓練平均值佔位)"),
        "updated": dt.datetime.now().isoformat(),
        "nPositives": N_POSITIVES,
        "rocAuc": None,
        "coefficients": {"intercept": LOGIT_INTERCEPT, **LOGIT_COEF_RAW},
        "disclaimer": DISCLAIMER,
    }

    write_risk_js(out_path, risk, meta)

    print(f"✓ 已寫入 {out_path}｜{len(risk)} 座湖｜判高 {n_hi}｜"
          f"{'GSMaP' if rain_by_lake is not None else 'offline'}")


def cli() -> None:
    ap = argparse.ArgumentParser(
        description="用 package 的模型與 GSMaP 衛星雨量產生 risk.js")
    ap.add_argument("--lakes", default=DEFAULT_LAKES)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--project", default=os.environ.get("GEE_PROJECT"),
                     help="GCP 專案 ID；不給就不連網，用訓練平均值佔位")
    args = ap.parse_args()
    rain, as_of = gsmap_rain(load_lakes(args.lakes), args.project) if args.project else (None, None)
    main(args.lakes, args.out, rain, as_of)


if __name__ == "__main__":
    cli()
