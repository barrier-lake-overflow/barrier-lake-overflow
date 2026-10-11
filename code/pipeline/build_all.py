#!/usr/bin/env python3
"""
重建儀表板資料：清冊 → lakes.js、風險 → risk.js、成因敘述寫回 lakes.js、SAR 結果 → events.js。

    python -m pipeline.build_all                         # 風險用訓練平均值佔位，不連網
    python -m pipeline.build_all --project <GCP 專案 ID>  # 風險改用 GSMaP 衛星雨量（Google Earth Engine）

每天自動抓最新資料用 pipeline.daily.run（見 docs/daily.md）。各步驟也可以單獨跑，見 README。
"""

from __future__ import annotations

import argparse
from typing import Optional

from pipeline.ingest import inventory, risk
from pipeline.attribution import annotate
from pipeline.events import build as events

RAW = "../data/raw"
DASHBOARD_DATA = "dashboard/data"


def main(project: Optional[str] = None) -> None:
    print("== [1/4] 轉換清冊 CSV → lakes.js ==")
    inventory.main(f"{RAW}/taiwan-barrier-lakes.csv", f"{DASHBOARD_DATA}/lakes.js")

    print("\n== [2/4] 風險模型（package）→ risk.js ==")
    lakes_js = f"{DASHBOARD_DATA}/lakes.js"
    rain, as_of = risk.gsmap_rain(risk.load_lakes(lakes_js), project) if project else (None, None)
    risk.main(lakes_js, f"{DASHBOARD_DATA}/risk.js", rain, as_of)

    print("\n== [3/4] 產生成因敘述，加註回 lakes.js ==")
    annotate.main()

    print("\n== [4/4] SAR 偵測結果 → 事件佇列 events.js ==")
    events.main()

    print("\n完成。dashboard/data/ 已是最新資料。")


def cli() -> None:
    ap = argparse.ArgumentParser(description="一鍵重建前端所需的所有資料")
    ap.add_argument("--project", default=None,
                     help="GCP 專案 ID：風險模型改用 GSMaP 衛星雨量（見 pipeline.ingest.risk）")
    args = ap.parse_args()
    main(project=args.project)


if __name__ == "__main__":
    cli()
