#!/usr/bin/env python3
"""
從農村水保署網站下載最新堰塞湖清冊（XLSX），轉成 data/raw/taiwan-barrier-lakes.csv。

網站的「下載歷史堰塞湖案例清冊」是帶防偽 token 的表單：先 GET 頁面拿 token 與 cookie，
再 POST 下載。XLSX 欄位與既有 CSV（DBF 匯出格式）相同，轉檔後交給 pipeline.ingest.inventory。
內容沒變就不覆寫檔案。

    python -m pipeline.daily.inventory_fetch     # 在 code/ 底下
"""

from __future__ import annotations

import csv
import http.cookiejar
import io
import re
import urllib.parse
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
CSV_PATH = REPO / "data" / "raw" / "taiwan-barrier-lakes.csv"
PAGE = "https://tech.ardswc.gov.tw/Results/BarrierLakeInfo"
EXPORT = "https://tech.ardswc.gov.tw/Results/ExportBarrierLakeInfoFile"


def download_xlsx(timeout: int = 120) -> bytes:
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    op.addheaders = [("User-Agent", "Mozilla/5.0")]
    html = op.open(PAGE, timeout=timeout).read().decode("utf-8")
    m = re.search(r'ExportBarrierLakeInfoFile".*?name="__RequestVerificationToken"[^>]*value="([^"]+)"', html, re.S)
    if not m:
        raise RuntimeError("清冊頁面找不到下載表單（網站改版？）")
    data = urllib.parse.urlencode({"__RequestVerificationToken": m.group(1)}).encode()
    body = op.open(EXPORT, data=data, timeout=timeout).read()
    if not body.startswith(b"PK"):
        raise RuntimeError("下載到的不是 XLSX（網站改版或被擋）")
    return body


def cell(v) -> str:
    """XLSX 儲存格 → CSV 字串，數字格式比照原本 DBF 匯出（整數不帶 .0）。

    >>> cell(None), cell(216568), cell(4000.0), cell(0.6), cell(" 草嶺 ")
    ('', '216568', '4000', '0.6', ' 草嶺 ')
    """
    if v is None:
        return ""
    if isinstance(v, float):
        return str(int(v)) if v.is_integer() else repr(v)
    return str(v)


def xlsx_to_csv(body: bytes) -> str:
    import openpyxl
    wb = openpyxl.load_workbook(io.BytesIO(body), read_only=True)
    rows = list(wb.active.iter_rows(values_only=True))
    if not rows or not str(rows[0][0]).startswith("項次"):
        raise RuntimeError(f"清冊欄位與預期不同：{rows[0] if rows else '空檔'}")
    buf = io.StringIO()
    w = csv.writer(buf, lineterminator="\n")
    for r in rows:
        w.writerow([cell(v) for v in r])
    return buf.getvalue()


def normalized(text: str) -> list:
    """比較用：數字去千分位、統一格式，其餘去頭尾空白。原 CSV 寫「4,000.00」，XLSX 是 4000。

    >>> normalized('1,草嶺,"4,000.00",0.60\\n') == normalized('1,草嶺,4000,0.6\\n')
    True
    """
    def norm(v):
        v = v.strip()
        try:
            return float(v.replace(",", ""))
        except ValueError:
            return v
    return [[norm(v) for v in row] for row in csv.reader(io.StringIO(text)) if any(c.strip() for c in row)]


def main(path: Path = CSV_PATH) -> dict:
    text = xlsx_to_csv(download_xlsx())
    n = sum(1 for line in text.splitlines() if re.match(r"^\d+,", line))
    old = path.read_text(encoding="utf-8-sig") if path.exists() else ""
    changed = normalized(text) != normalized(old)
    if changed:
        path.write_text(text, encoding="utf-8")
    print(f"清冊 {n} 筆，{'有更新，已寫入' if changed else '沒有變動'} {path.name}")
    return {"rows": n, "changed": changed}


if __name__ == "__main__":
    main()
