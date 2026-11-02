#!/usr/bin/env python3
"""
事件研判：輸入一個事件在某時點的狀態，輸出優先等級、研判信心、證據、證據缺口與建議任務。

衛星偵測只當證據來源之一，不直接下結論。規則全部寫死在這裡，每項判斷都記進
rules_fired，跟 attribution 一樣可以對回是哪條規則產生的。

偵測來源有兩種，走同一張決策表（Detection.source）：
    SAR     Sentinel-1 雷達，不受雲影響（detect/barrier_lake.py）
    光學    Sentinel-2／Landsat 晴空影像（detect/optical.py），雲散後才看得到
兩者在同一位置都看到，不算「多源一致」：都是系統自動偵測，要人工確認或他單位成果才算獨立證據。
只有光學看到（SAR 從沒看到、也沒有他單位成果）的事件，優先最高到「中」：新崩塌地上的濕泥、積水
也會被光學判成持續的水，要人工打開影像確認（馬太鞍溪 E4、E5）。

優先等級（決策表，依序比對）：
    持續性中斷   前期已確認蓄水、同軌道連續兩期都未見     → 高　建議立即查證（可能潰決或排空）
    最新一期未見 前期已確認蓄水、同軌道只漏看一期         → 中　建議人工確認（等下一期）
    已確認持續   多期偵測一致且附近有崩塌（A 級）         → 高　建議立即查證
    多源一致     單期偵測（B 級）＋他單位獨立觀測          → 高　建議立即查證
    待複核       單期偵測，空間條件符合（B 級）            → 中　建議人工確認
    待複核       單期偵測，附近無崩塌訊號（C 級）          → 低　暫時觀察
    複核未持續   下一期同位置水體 IoU 未達門檻              → 低　暫時觀察
同一等級內依面積由大到小排。

「未見」只算跟最後一次看到它同一軌道的 SAR 影像：升軌、降軌照射方向相反，同一片陡坡的陰影
不一樣，湖在一軌看得到、另一軌看不到很常見，不能拿來判斷湖不見了。複核時同位置仍有水
（IoU 達門檻）也算看到，即使那一期的水體太小、沒有成為候選。光學每一期各自算一個「軌道」：
光學某一期沒看到可能只是局部雲遮，不拿來判斷湖不見了；SAR 也不拿來判斷只有光學看到的湖不見了。

光學自動判讀（監看窗格，pipeline/daily/optical.py）只會壓低、不會拉高：
    事件出現後，晴空光學至少 OPTICAL_DRY_MIN 次判為沒有水、且沒有一次看得到水 → 最高到「中」
    SAR 未見（最新一期未見／持續性中斷），但之後的晴空光學仍看得到水        → 最高到「中」，不說潰決
自動判讀沒有人工確認，所以不算獨立證據，不會讓優先或信心升高。

研判信心（高／中／低）：
    證據只有衛星自動偵測（SAR、光學）時最高到「中」。要到「高」需要獨立證據：
    他單位已發布的光學、航拍、衛星判釋或現地勘查／目視通報（情境檔 externalEvidence，
    種類見 INDEPENDENT_KINDS），或值班人員在儀表板上記錄的人工查證。

提醒（cautions）：跟證據衝突分開，只提醒值班人員，不改優先、信心、證據強度。
    崩塌堆積：最新一筆偵測有 OLD_LANDSLIDE_CAUTION_PCT 以上的面積落在既有崩塌堆積區
    （一年前到事件前之間新出現的崩塌，偵測端 oldLandslidePct；沒有一年前基準的偵測不判斷）。
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from typing import Optional

TW = timezone(timedelta(hours=8))

# 門檻常數（專案自訂，對外須註明）
SCALE_LARGE_HA = 10.0          # SAR 面積 ≥ 此值視為「大」
SCALE_MEDIUM_HA = 1.0          # 1～10 公頃為「中」，以下為「小」
GROWING_RATIO = 1.5            # 最新面積 ≥ 首次 × 此值視為擴大
SHRINKING_RATIO = 0.67
HISTORY_RADIUS_KM = 10.0       # 歷史災害的搜尋半徑
# 崩塌堆積提醒：疑似水體落在既有崩塌堆積區的面積比例門檻（%）。依事先訂好的規則，取「所有已確認
# 真湖都不會被提醒」的最小 5% 刻度：真湖最高 5.6%，2026 負案例 E1 為 39～80%（docs/parameters.md）
OLD_LANDSLIDE_CAUTION_PCT = 10.0
# 算「SAR 以外的獨立證據」的外部成果種類：光學、航拍、他單位衛星判釋（未註明感測器）、
# 現地勘查或目視通報。只有新聞稿或未說明方法的估算（official）只算背景。
INDEPENDENT_KINDS = ("optical", "aerial", "satellite", "field")
# 已確認的事件，同軌道連續幾期未見才判「持續性中斷」；只漏一期常是陰影或水位小幅變化
LOST_MISSES = 2
# 光學自動判讀：晴空判為沒有水至少幾次（且沒有一次看得到水）才壓低優先
OPTICAL_DRY_MIN = 2
OPTICAL_WET = ("water", "partial")

PRIORITY_TEXT = {"high": "高優先", "medium": "中優先", "low": "低優先"}
PRIORITY_RANK = {"high": 0, "medium": 1, "low": 2}
ACTION_TEXT = {"high": "建議立即查證", "medium": "建議人工確認", "low": "暫時觀察"}
PERSISTENCE_TEXT = {
    "confirmed": "已確認持續",
    "pending": "待複核",
    "failed": "複核未持續",
    "missing": "最新一期未見",
    "lost": "持續性中斷",
}
SOURCE_ORDER = ("sar", "optical")
SOURCE_NAME = {"sar": "SAR", "optical": "光學"}
OPTICAL_ORBIT_PREFIX = "光學"   # 與 detect/optical.py ORBIT_PREFIX 相同：光學每一期各自一個「軌道」
SHORT_NAME = {"sar": "SAR 新增水體", "optical_det": "光學新增水體", "persistence": "跨期持續", "river": "貼河道",
              "landslide": "附近崩塌", "terrain": "堵塞型態", "trend": "面積擴大",
              "optical": "他單位光學影像", "aerial": "他單位航拍",
              "satellite": "他單位衛星判釋", "field": "現地勘查或通報",
              "optical_auto": "光學自動判讀"}


# 時間

def tw_label(t: datetime) -> str:
    """
    >>> tw_label(datetime(2025, 7, 22, 21, 52, tzinfo=timezone.utc))
    '7/23 05:52'
    """
    t = t.astimezone(TW)
    return f"{t.month}/{t.day} {t:%H:%M}"


def tw_date(t: datetime) -> str:
    t = t.astimezone(TW)
    return f"{t.month}/{t.day}"


# 資料結構

@dataclass
class Detection:
    """某一期偵測到的一個候選水體（final_*.json 的 candidates 一筆）。"""
    pass_time: datetime
    recheck_time: Optional[datetime]     # 該期排定的複核影像時間；沒有複核期為 None
    cand: dict
    evidence_image: Optional[str] = None
    orbit: Optional[str] = None          # 軌道（例如「降軌 105」、「光學 Sentinel-2B 20250814」）；None＝不分軌道
    source: str = "sar"                  # sar／optical
    sensor: Optional[str] = None         # 光學的衛星（例如 Sentinel-2B）

    @property
    def area_ha(self) -> float:
        return float(self.cand["areaHectare"])

    @property
    def lon_lat(self) -> tuple:
        return tuple(self.cand["centroidLonLat"])

    @property
    def iou(self) -> Optional[float]:
        """複核 IoU。偵測端只寫在 reasons 文字裡，從那裡取。"""
        for r in self.cand.get("reasons", []):
            m = re.search(r"IoU 最高 ([\d.]+)", r)
            if m:
                return float(m.group(1))
        return None

    def recheck_state(self, as_of: datetime) -> str:
        """as_of 當下這筆偵測的複核狀態：persistent / not_persistent / pending。"""
        if (self.recheck_time is None or self.recheck_time > as_of
                or not self.cand.get("laterScenesChecked")):
            return "pending"
        return "persistent" if self.cand.get("persistent") else "not_persistent"


@dataclass
class Context:
    """跟單一事件無關、整個時點共用的背景。"""
    as_of: datetime
    latest_analyzed_pass: Optional[datetime]   # as_of 以前最近一期有跑全幅偵測的影像
    next_pass: Optional[datetime]              # 下一期預計過境
    rain_available: bool = False
    trigger_label: str = ""
    context_lines: list = field(default_factory=list)
    history: list = field(default_factory=list)   # [{"name", "year", "distanceKm"}]
    reference_lon_lat: Optional[tuple] = None
    # 他單位已發布、時間在 as_of 以前且位置對得上的成果：[{"time", "kind", "text", "source", "url"}]
    external: list = field(default_factory=list)
    exposure: Optional[dict] = None               # 下游保全對象：{"text", "source", "url"}
    # as_of 以前跑過全幅偵測的每一期：[(時間, 軌道)]；空的時候只看 latest_analyzed_pass、不分軌道
    analyzed: list = field(default_factory=list)
    # 事件範圍的光學自動判讀，當下已經拍到的（回放為 as_of 以前，即時監看最新一期為到今天）：
    # [{"time", "sensor", "verdict", "clearPct", "waterPct"}]
    optical: list = field(default_factory=list)


# 判定

def last_seen(dets: list, as_of: datetime) -> datetime:
    """最後一次看到水的時間：最新一筆偵測，或它的複核期仍有水時算到複核期。"""
    latest = dets[-1]
    if latest.recheck_state(as_of) == "persistent":
        return latest.recheck_time
    return latest.pass_time


def _analyzed(ctx: Context) -> list:
    return ctx.analyzed or ([(ctx.latest_analyzed_pass, None)] if ctx.latest_analyzed_pass else [])


def is_optical_orbit(orbit: Optional[str]) -> bool:
    return bool(orbit) and orbit.startswith(OPTICAL_ORBIT_PREFIX)


def same_orbit(orbit: Optional[str], dets: list) -> bool:
    """
    這一期的軌道跟事件被 SAR 看到過的軌道一樣（不分軌道的 SAR 資料一律算一樣）。
    光學每一期各自一個軌道，只跟自己那一期相同；只有光學看到的事件，SAR 各期都不算同軌道。

    >>> sar = Detection(datetime(2025, 7, 29), None, {}, orbit=None)
    >>> opt = Detection(datetime(2025, 8, 14), None, {}, orbit="光學 Sentinel-2A 20250814", source="optical")
    >>> same_orbit("降軌 105", [sar]), same_orbit("光學 Sentinel-2B 20250817", [sar, opt]), same_orbit("降軌 105", [opt])
    (True, False, False)
    """
    seen = {d.orbit for d in dets}
    if is_optical_orbit(orbit):
        return orbit in seen
    seen_sar = {o for o in seen if not is_optical_orbit(o)}
    if not seen_sar and any(is_optical_orbit(o) for o in seen):
        return False
    return orbit is None or None in seen_sar or orbit in seen_sar


def source_text(d: Detection) -> str:
    """
    >>> source_text(Detection(datetime(2025, 8, 14), None, {}, source="optical", sensor="Sentinel-2A"))
    '光學（Sentinel-2A）'
    """
    return f"光學（{d.sensor}）" if d.source == "optical" and d.sensor else SOURCE_NAME[d.source]


def sources_text(dets: list) -> str:
    """
    >>> sources_text([Detection(datetime(2025, 8, 14), None, {}, source="optical")])
    '光學'
    """
    return "、".join(SOURCE_NAME[s] for s in SOURCE_ORDER if any(d.source == s for d in dets))


def missed_passes(dets: list, ctx: Context) -> int:
    """
    最後一次看到之後，同軌道已經分析過、卻沒再看到的期數。SAR 複核明確未持續也算一期；
    光學複核沒對上可能只是局部雲遮，不算。
    """
    latest = dets[-1]
    seen = last_seen(dets, ctx.as_of)
    missed = {t for t, orbit in _analyzed(ctx) if seen < t <= ctx.as_of and same_orbit(orbit, dets)}
    if latest.recheck_state(ctx.as_of) == "not_persistent" and latest.source == "sar":
        missed.add(latest.recheck_time)
    return len(missed)


def radar_history(dets: list, ctx: Context) -> list:
    """
    事件首次出現以後，每一期偵測對這個事件的意義（跟持續性判定同一套規則），給事件卡時間軸照實顯示：
        hit    偵測到
        wet    複核：同位置仍有水（水體太小，沒成為新的候選）
        miss   同軌道、沒看到（複核未持續也是）
        other  拍攝方向不同的軌道，陰影不同，不拿來比
    光學各期只列偵測到、複核仍有水的（沒看到可能只是雲遮，見 same_orbit）；source 標 sar／optical。
    """
    by_pass = {d.pass_time: d for d in dets}
    rechecks = {d.recheck_time: d.recheck_state(ctx.as_of) for d in dets
                if d.recheck_state(ctx.as_of) != "pending"}
    # 只拿來複核、沒跑全幅偵測的期別也列（回放常見），軌道跟被複核的那筆偵測一樣
    passes = dict(_analyzed(ctx))
    for d in dets:
        if d.recheck_time is not None:
            passes.setdefault(d.recheck_time, d.orbit)
    out = []
    for t, orbit in sorted(passes.items(), key=lambda x: x[0]):
        if t < dets[0].pass_time or t > ctx.as_of:
            continue
        optical = is_optical_orbit(orbit)
        d = by_pass.get(t)
        if d:
            status, text = "hit", f"偵測到 {d.area_ha:.2f} 公頃"
        elif rechecks.get(t) == "persistent":
            status, text = "wet", "複核：同位置仍有水（水體較小，沒列為新目標）"
        elif optical:
            continue
        elif not same_orbit(orbit, dets):
            status, text = ("other", "只有光學看到，雷達這期不拿來比對" if not any(x.source == "sar" for x in dets)
                            else "拍攝方向不同，陰影不同，不拿來比對")
        elif rechecks.get(t) == "not_persistent":
            status, text = "miss", "複核：同位置沒有水"
        else:
            status, text = "miss", "同位置沒看到"
        entry = {"time": t.isoformat(), "orbit": None if optical else orbit, "status": status,
                 "source": "optical" if optical else "sar",
                 "text": ("首次出現 · " if t == dets[0].pass_time else "") + text}
        if optical:
            entry["sensor"] = d.sensor if d else orbit.split(" ")[1]
        out.append(entry)
    return out


def persistence(dets: list, ctx: Context) -> str:
    """
    事件層級的持續性。曾經被複核確認，或在兩期以上都被偵測到，就算確認過。
    確認過之後，同軌道漏看一期改判「最新一期未見」，連續 LOST_MISSES 期才判「持續性中斷」。
    """
    states = [d.recheck_state(ctx.as_of) for d in dets]
    # SAR 複核未持續之後又在同位置出現，不直接算確認，回到待複核（光學複核沒對上可能只是雲遮，不算）
    redetected = len({d.pass_time for d in dets}) >= 2 and not any(
        s == "not_persistent" and d.source == "sar" for s, d in zip(states, dets))
    confirmed_ever = "persistent" in states or redetected
    if confirmed_ever:
        misses = missed_passes(dets, ctx)
        if misses >= LOST_MISSES:
            return "lost"
        return "missing" if misses else "confirmed"
    return "failed" if states[-1] == "not_persistent" else "pending"


def optical_after(ctx: Context, since: datetime) -> tuple:
    """since 以後的晴空光學判讀：(看得到水的，判為沒有水的)，新的在前。ctx.optical 已由呼叫端截好時間。"""
    rs = sorted((r for r in ctx.optical if since <= datetime.fromisoformat(r["time"])),
                key=lambda r: r["time"], reverse=True)
    return ([r for r in rs if r["verdict"] in OPTICAL_WET],
            [r for r in rs if r["verdict"] == "no_water"])


def _optical_dates(rs: list) -> str:
    return "、".join(dict.fromkeys(tw_date(datetime.fromisoformat(r["time"])) for r in rs))


def sar_grade(landslide: bool, pers: str) -> str:
    """跟 detect.barrier_lake._grade 同一套：崩塌＋持續為 A、只有崩塌為 B、其餘為 C。"""
    if landslide and pers in ("confirmed", "missing", "lost"):
        return "A"
    return "B" if landslide else "C"


def scale_of(area_ha: float) -> str:
    """
    >>> scale_of(26.3), scale_of(5.8), scale_of(0.5)
    ('大', '中', '小')
    """
    if area_ha >= SCALE_LARGE_HA:
        return "大"
    if area_ha >= SCALE_MEDIUM_HA:
        return "中"
    return "小"


def trend_of(dets: list) -> Optional[str]:
    if len(dets) < 2:
        return None
    first, last = dets[0].area_ha, dets[-1].area_ha
    if last >= first * GROWING_RATIO:
        return "growing"
    if last <= first * SHRINKING_RATIO:
        return "shrinking"
    return "stable"


def _iou_text(d: Detection) -> str:
    return f"IoU {d.iou:.2f}" if d.iou is not None else "IoU 未記錄"


def _orbit_text(d: Detection) -> str:
    return f"{d.orbit} " if d.orbit else ""


@dataclass
class Assessment:
    priority: str
    action: str
    confidence: str
    confidence_reasons: list
    persistence: str
    grade: str
    scale: str
    summary: str
    evidence: list
    gaps: list
    conflicts: list
    tasks: list
    rules_fired: list
    cautions: list = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "priority": self.priority,
            "priorityText": PRIORITY_TEXT[self.priority],
            "action": self.action,
            "confidence": self.confidence,
            "confidenceReasons": self.confidence_reasons,
            "persistence": self.persistence,
            "persistenceText": PERSISTENCE_TEXT[self.persistence],
            "grade": self.grade,
            "scale": self.scale,
            "summary": self.summary,
            "evidence": self.evidence,
            "gaps": self.gaps,
            "conflicts": self.conflicts,
            "cautions": self.cautions,
            "tasks": self.tasks,
            "rulesFired": self.rules_fired,
        }


def assess(label: str, dets: list, ctx: Context) -> Assessment:
    """
    label：事件代號（例如 E2）
    dets：as_of 以前的偵測，依時間排序
    """
    if not dets:
        raise ValueError("事件至少要有一筆偵測")
    rules: list = []
    latest = dets[-1]
    c = latest.cand
    pers = persistence(dets, ctx)
    grade = sar_grade(bool(c.get("landslideNearby")), pers)
    rules.append(f"persistence.{pers}")
    trend = trend_of(dets)
    next_pass = tw_date(ctx.next_pass) if ctx.next_pass else "下一期"
    optical_latest = latest.source == "optical"
    src = source_text(latest)          # 最近一次偵測的來源，例如「SAR」「光學（Sentinel-2B）」
    srcs = sources_text(dets)          # 偵測過這個事件的全部來源，例如「SAR、光學」
    opt_dets = [d for d in dets if d.source == "optical"]

    # ── 證據（status：support 支持／against 不支持／context 背景）
    # 最近一次偵測在前；另一種來源也看到過的話，列它最近的一次
    evidence = [{
        "kind": "optical_det" if optical_latest else "sar", "status": "support",
        "text": f"{tw_label(latest.pass_time)} {src} 新增水體 {latest.area_ha:.2f} 公頃（證據強度 {grade} 級）",
    }]
    other = [d for d in dets if d.source != latest.source]
    if other:
        d = other[-1]
        evidence.append({"kind": "optical_det" if d.source == "optical" else "sar", "status": "support",
                         "text": f"{tw_label(d.pass_time)} {source_text(d)} 也在同位置偵測到 {d.area_ha:.2f} 公頃"})

    persistent_dets = [d for d in dets if d.recheck_state(ctx.as_of) == "persistent"]
    if pers == "confirmed":
        if persistent_dets:
            d = persistent_dets[-1]
            text = (f"{tw_date(d.recheck_time)} 複核同位置仍有水體（{_iou_text(d)}），"
                    f"共 {len(dets)} 期偵測到")
        else:
            text = f"連續 {len(dets)} 期在同位置偵測到"
        evidence.append({"kind": "persistence", "status": "support", "text": text})
    elif pers == "failed":
        evidence.append({"kind": "persistence", "status": "against",
                         "text": f"{tw_date(latest.recheck_time)} 複核同位置水體 {_iou_text(latest)}，未持續"})
    elif pers == "missing":
        evidence.append({"kind": "persistence", "status": "against",
                         "text": f"前期已確認蓄水，{_orbit_text(latest)}最新一期同位置未見；只漏一期，等下一期確認"})
    elif pers == "lost":
        evidence.append({"kind": "persistence", "status": "against",
                         "text": f"前期已確認蓄水，{_orbit_text(latest)}連續 {missed_passes(dets, ctx)} 期同位置未見"})

    # 光學自動判讀：只看事件出現以後、as_of 以前的晴空影像
    wet, dry = optical_after(ctx, dets[0].pass_time)
    if wet:
        rules.append("optical_auto.water")
        evidence.append({"kind": "optical_auto", "status": "support",
                         "text": f"光學自動判讀 {_optical_dates(wet)} 看得到水（未經人工確認，只會壓低、不會提高研判）"})
    if dry:
        rules.append("optical_auto.no_water")
        evidence.append({"kind": "optical_auto", "status": "against",
                         "text": f"光學自動判讀 {_optical_dates(dry)} 晴空、判為沒有水"})
    seen = last_seen(dets, ctx.as_of)
    # SAR 沒再看到，但之後的光學還看得到水：比較可能是雷達幾何或陰影，不是潰決
    optical_still_wet = pers in ("missing", "lost") and bool(wet) and datetime.fromisoformat(wet[0]["time"]) > seen
    optical_dry = len(dry) >= OPTICAL_DRY_MIN and not wet

    if c.get("onRiver"):
        rules.append("spatial.on_river")
        evidence.append({"kind": "river", "status": "support",
                         "text": "緊貼事件前河道（DEM 填窪後 D8 河網）"})
    if c.get("landslideNearby"):
        rules.append("spatial.landslide")
        ls_ha = float(c.get('landslideAreaHectare') or 0)
        evidence.append({"kind": "landslide", "status": "support",
                         "text": f"500 m 內有植生消失（光學判為崩塌）{ls_ha:.1f} 公頃" if optical_latest
                         else f"500 m 內有 SAR 崩塌訊號 {ls_ha:.1f} 公頃"})
    if c.get("damDownstream"):
        rules.append("spatial.blockage")
        evidence.append({"kind": "terrain", "status": "support",
                         "text": f"崩塌延伸到水體下游、湖底高程（{c.get('lakeFloorM'):.0f} m）以下，符合堵塞型態"})

    if trend == "growing":
        rules.append("trend.growing")
        evidence.append({"kind": "trend", "status": "support",
                         "text": f"面積 {dets[0].area_ha:.1f} → {latest.area_ha:.1f} 公頃，擴大中"})
    elif trend == "shrinking":
        rules.append("trend.shrinking")
        evidence.append({"kind": "trend", "status": "context",
                         "text": f"面積 {dets[0].area_ha:.1f} → {latest.area_ha:.1f} 公頃，縮小中"})

    if ctx.history:
        rules.append("history.nearby")
        items = "、".join(f"{h['year']} {h['name']}（{h['distanceKm']:.1f} km）" for h in ctx.history)
        evidence.append({"kind": "history", "status": "context",
                         "text": f"{HISTORY_RADIUS_KM:.0f} km 內清冊另有 {len(ctx.history)} 筆堰塞湖：{items}"})
    for line in ctx.context_lines:
        evidence.append({"kind": "context", "status": "context", "text": line})

    # 他單位既有成果：光學、航拍算獨立證據，其餘（官方估算等）列為背景
    for x in ctx.external:
        rules.append(f"external.{x['kind']}")
        evidence.append({"kind": x["kind"],
                         "status": "support" if x["kind"] in INDEPENDENT_KINDS else "context",
                         "text": f"{tw_date(x['time'])} {x['text']}",
                         "source": x.get("source"), "url": x.get("url")})
    corroborated = any(x["kind"] in INDEPENDENT_KINDS for x in ctx.external)
    if ctx.exposure:
        rules.append("exposure.known")
        evidence.append({"kind": "exposure", "status": "context", "text": ctx.exposure["text"],
                         "source": ctx.exposure.get("source"), "url": ctx.exposure.get("url")})

    # ── 證據缺口
    gaps = []
    if pers == "pending" and not corroborated:
        gaps.append({"kind": "persistence", "text":
                     f"尚未複核：單期光學無法排除雲影、濕泥或河道變寬誤判（下一期雷達 {next_pass}，或下一個晴空光學）"
                     if optical_latest else f"尚未複核：單期影像無法排除陰影或濕土誤判（下一期 {next_pass}）"})
    if not ctx.rain_available:
        rules.append("gap.rain")
        gaps.append({"kind": "rain", "text": "形成期間雨量：尚未取得（測站值未填、衛星雨量尚未涵蓋此期）"})
    if not corroborated:
        rules.append("gap.optical")
        auto = sorted(wet + dry + [{"time": d.pass_time.isoformat()} for d in opt_dets],
                      key=lambda r: r["time"], reverse=True)
        gaps.append({"kind": "optical", "text":
                     f"光學影像：系統已自動{'偵測' if opt_dets else '判讀'}（{_optical_dates(auto)}），尚待人工打開影像確認"
                     if auto else "光學影像：尚未調閱（颱風期間多雲，雲散後可調 Sentinel-2）"})
    if not ctx.exposure:
        rules.append("gap.exposure")
        gaps.append({"kind": "exposure", "text": "下游保全對象：尚未串接（可接 BigGIS、內政部道路與聚落圖層）"})
    gaps.append({"kind": "field", "text": "人工查證：尚未進行"})

    # ── 證據衝突
    conflicts = []
    spatial_ok = all(c.get(k) for k in ("onRiver", "landslideNearby", "damDownstream"))
    if pers == "failed" and spatial_ok:
        rules.append("conflict.spatial_vs_persistence")
        conflicts.append("空間條件（河道、崩塌、堵塞型態）都符合，但下一期複核未持續。以持續性為準：" + (
            "單期光學疑似水體常見成因是雲影、濕泥或豪雨後河道暫時變寬；下一景若局部有雲，也可能只是沒看到。"
            if optical_latest else
            "單期疑似水體常見成因是崩塌後新陡崖的雷達陰影或濕土使背向散射暫時降低。"))
    if optical_still_wet:
        rules.append("conflict.sar_missing_optical_wet")
        conflicts.append(f"SAR 最新一期未見，但光學 {tw_date(datetime.fromisoformat(wet[0]['time']))} 仍看得到水："
                         "湖多半還在，SAR 沒看到比較可能是陰影或雷達幾何，不是潰決。請打開光學影像確認。")
    elif pers == "lost":
        conflicts.append("前期多期一致，同軌道連續兩期卻都未見：可能是潰決、排空，也可能是陰影遮罩擋掉湖面，需人工判斷。")
    elif pers == "missing":
        conflicts.append("前期多期一致，最新一期未見：只漏一期，常見原因是陰影或水位小幅變化，先等下一期確認。")
    if optical_dry:
        rules.append("conflict.sar_vs_optical_dry")
        conflicts.append(f"光學 {_optical_dates(dry)} 晴空都判為沒有水：{srcs}看到的可能是崩塌堆積或陰影，"
                         "不一定是湖。請打開光學影像確認。")

    # ── 提醒（不影響優先、信心、證據強度）
    cautions = []
    old_pct = c.get("oldLandslidePct")
    if old_pct is not None and old_pct >= OLD_LANDSLIDE_CAUTION_PCT:
        rules.append("caution.old_landslide")
        cautions.append(f"疑似水體有 {old_pct:.0f}% 落在前一年新出現的崩塌範圍內，可能是崩塌堆積上的雷達陰影或"
                        "平滑泥砂，不一定是水；建議以光學影像確認是否為水。")

    # ── 優先等級、行動、任務
    tasks = []
    area_note = f"{latest.area_ha:.1f} 公頃"
    if pers == "lost" and not optical_still_wet:
        priority = "high"
        rules.append("priority.high.lost")
        tasks += [
            {"label": "立即查證是否潰決或排空", "reason": "前期已確認蓄水，同軌道連續兩期未見；潰決會直接影響下游"},
            {"label": "調閱最新光學影像", "reason": "確認湖面是否仍在，排除 SAR 遮罩造成的漏偵"},
            {"label": "通報主管機關（農村水保署）", "reason": "下游保全對象尚未串接，需由主管機關評估"},
        ]
    elif pers in ("missing", "lost"):
        priority = "medium"
        rules.append("priority.medium." + ("optical_wet" if optical_still_wet else "missing"))
        tasks += [
            {"label": "打開最新光學影像確認湖面是否仍在",
             "reason": "光學自動判讀仍看得到水，需人工確認" if optical_still_wet else "排除 SAR 陰影或遮罩造成的漏看"},
            {"label": f"排下一期 SAR 複核（{next_pass}）",
             "reason": "同軌道再看不到才判持續性中斷" if pers == "missing" else "確認 SAR 是否重新看到湖面"},
        ]
    elif (pers == "confirmed" and grade == "A") or (pers == "pending" and grade == "B" and corroborated):
        priority = "high"
        rules.append("priority.high." + ("confirmed" if pers == "confirmed" else "corroborated"))
        optical_task = (
            {"label": "取得他單位既有光學判釋與航拍成果", "reason": "已有其他單位發布的成果，直接串接，不重做"}
            if corroborated else
            {"label": "打開光學影像確認湖面", "reason": "光學偵測是系統自動判斷，需人工看過影像才算確認"}
            if opt_dets else
            {"label": "調閱最新光學影像", "reason": "SAR 陡坡遮罩會擋掉約四成湖面，面積偏低，需光學影像確認範圍"})
        tasks += [
            {"label": "UAV／現地查證壩體與湖面", "reason": "衛星只能看到水面，壩體高度、材料與溢流風險要現地確認"},
            optical_task,
            {"label": "通報主管機關（農村水保署）並評估下游保全對象",
             "reason": "下游已有聚落與橋梁" if ctx.exposure else "下游聚落、道路圖層尚未串接"},
            {"label": f"持續 SAR 監測（下一期 {next_pass}）",
             "reason": ("追蹤湖面變化" + ("；目前面積擴大中" if trend == "growing" else ""))
             if pers == "confirmed" else "同時完成 SAR 持續性複核"},
        ]
    elif pers == "pending" and grade == "B":
        priority = "medium"
        rules.append("priority.medium.pending")
        if optical_latest:
            tasks += [
                {"label": "值班人員打開光學影像確認", "reason": "確認疑似水體是否在河谷底、是否為雲影、濕泥或變寬的河道"},
                {"label": f"等下一期複核（雷達 {next_pass}，或下一個晴空光學）",
                 "reason": "A 級需要兩期一致；單期出現的疑似水體多數會在複核時消失"},
                {"label": "暫不派遣 UAV", "reason": f"目前只有單期{src}，先以複核過濾誤報，避免浪費現地人力"},
            ]
        else:
            tasks += [
                {"label": "值班人員判讀 SAR 證據圖", "reason": "確認疑似水體是否在河谷底、是否為崩塌坡面陰影"},
                {"label": f"排下一期 SAR 複核（{next_pass}）", "reason": "A 級需要兩期一致；單期出現的疑似水體多數會在複核時消失"},
                {"label": "調閱光學影像（雲況許可時）", "reason": "SAR 以外的另一種來源，人工看過才算獨立證據"},
                {"label": "暫不派遣 UAV", "reason": "目前只有單期 SAR，先以複核過濾誤報，避免浪費現地人力"},
            ]
    else:
        priority = "low"
        rules.append("priority.low." + ("failed" if pers == "failed" else "no_landslide"))
        if pers == "failed":
            reason = f"下一期複核同位置水體 {_iou_text(latest)}，未持續"
        else:
            reason = "附近沒有崩塌訊號，不符合堵塞成湖的型態"
        tasks += [
            {"label": "暫時觀察，不派遣任務", "reason": reason},
            {"label": "若同位置再次出現，重新列入待複核", "reason": "跨期追蹤以 250 m 內為同一事件"},
        ]
    # 光學多次晴空都沒有水：SAR 訊號可能不是水，先不派人，最高到「中」
    if optical_dry and priority == "high":
        priority = "medium"
        rules.append("priority.capped.optical_dry")
        tasks = [
            {"label": "打開光學影像確認是否為水", "reason": f"光學 {_optical_dates(dry)} 晴空都判為沒有水"},
            {"label": f"持續 SAR 監測（下一期 {next_pass}）", "reason": "光學確認是水再升高優先"},
            {"label": "暫不派遣 UAV", "reason": f"{srcs}偵測與光學判讀結果衝突，先以影像確認，避免浪費現地人力"},
        ]
    # 只有光學看到（SAR 沒看到過、也沒有他單位成果）：新崩塌地上的濕泥、積水也會被判成持續的水，最高到「中」，
    # 人工打開影像確認是湖再升高（docs/validation.md「光學偵測來源」：馬太鞍溪 E4、E5）
    optical_only = not any(d.source == "sar" for d in dets)
    if optical_only and priority == "high" and not corroborated:
        priority = "medium"
        rules.append("priority.capped.optical_only")
        tasks = [
            {"label": "打開光學影像確認湖面", "reason": "只有光學自動偵測；雲影、濕泥、新崩塌地上的積水都可能被判成水。確認是湖就記人工查證，由值班人員決定是否派遣"},
            {"label": f"排下一期 SAR 複核（{next_pass}）", "reason": "雷達也看到（或有他單位成果）時，系統才會列高優先"},
            {"label": "影像確認前暫不派遣 UAV", "reason": "先以影像確認，避免浪費現地人力"},
        ]
    if not ctx.rain_available and priority != "low":
        tasks.append({"label": "補查形成期間雨量", "reason": "確認觸發條件；目前觀測表此欄空白"})

    # ── 研判信心
    if corroborated and pers in ("confirmed", "pending"):
        confidence = "高"
        sources = "、".join(sorted({x["source"].split("（")[0] for x in ctx.external
                                    if x["kind"] in INDEPENDENT_KINDS and x.get("source")}))
        conf_reasons = [f"{srcs}與他單位獨立觀測一致（光學、航拍、衛星判釋或現地勘查）"] + ([f"外部來源：{sources}"] if sources else [])
    elif pers == "confirmed":
        confidence = "中"
        conf_reasons = [f"{srcs} {len(dets)} 期一致",
                        "證據只有衛星自動偵測，最高到「中」；需人工看過影像、他單位成果或現地證據才能到「高」"]
    elif pers == "failed":
        confidence = "中"
        conf_reasons = [f"複核結果明確（{_iou_text(latest)}）", "證據只有衛星自動偵測，最高到「中」"]
    else:
        confidence = "低"
        conf_reasons = ([f"只有單期{src}，尚未複核"] if pers == "pending"
                        else ["前後期結果不一致，需人工判斷"])
    if optical_dry and not corroborated:
        confidence = "低"
        conf_reasons = [f"{srcs}與光學判讀衝突：光學 {_optical_dates(dry)} 晴空都判為沒有水"]

    # ── 一句話摘要
    support = list(dict.fromkeys(SHORT_NAME[e["kind"]] for e in evidence if e["status"] == "support"))
    if optical_dry and "priority.capped.optical_dry" in rules:
        summary = (f"{label} 需要人工確認：{srcs}多期看到疑似水體，但光學 {_optical_dates(dry)} 晴空都判為沒有水，"
                   f"可能是崩塌堆積或陰影；請先打開光學影像確認，暫不派遣 UAV。")
    elif "priority.capped.optical_only" in rules:
        summary = (f"{label} 需要人工確認：只有光學看到疑似水體（{len(dets)} 期，{PERSISTENCE_TEXT[pers]}），"
                   f"空間條件符合，但光學在新崩塌地上的濕泥、積水也會誤判；請先打開光學影像確認是湖，"
                   f"影像確認前暫不派遣 UAV。")
    elif optical_still_wet:
        summary = (f"{label} 需要人工確認：SAR 最新一期未見，但光學 {tw_date(datetime.fromisoformat(wet[0]['time']))} "
                   f"仍看得到水，湖多半還在；請打開光學影像確認，下一期 {next_pass} 再複核。")
    elif pers == "missing":
        summary = (f"{label} 需要人工確認：前期已確認蓄水，最新一期未見，只漏一期；"
                   f"建議調閱光學影像，下一期 {next_pass} 再看不到才判持續性中斷。")
    elif priority == "high" and corroborated:
        summary = (f"{label} 值得優先查證：{len(support)} 項證據一致（{'、'.join(support)}），"
                   f"其中他單位的觀測與衛星自動偵測互相獨立；"
                   f"{'已有現地勘查或通報，' if any(x['kind'] == 'field' for x in ctx.external) else '目前缺少現地證據，'}"
                   f"建議下一步 UAV 現地查證並取得他單位既有判釋成果。")
    elif priority == "high" and pers == "confirmed":
        missing = ("光學自動偵測看得到水但還沒人工確認，也缺少現地證據" if opt_dets
                   else "光學自動判讀看得到水但還沒人工確認，也缺少現地證據" if wet else "目前缺少光學影像與現地證據")
        summary = (f"{label} 值得優先查證：{len(support)} 項證據一致（{'、'.join(support)}）；"
                   f"{missing}，建議下一步 UAV 現地查證並調閱光學影像。")
    elif priority == "high":
        summary = f"{label} 需要立即查證：前期已確認蓄水，最新一期未再出現，可能已潰決或排空。"
    elif priority == "medium":
        summary = (f"{label} 需要人工確認：單期{src}出現約 {area_note}的疑似新增水體，空間條件符合，但尚未複核；"
                   + ("建議先打開光學影像確認，等下一期雷達或下一個晴空光學複核，暫不派遣 UAV。" if optical_latest
                      else f"建議 {next_pass} 下一期過境複核，暫不派遣 UAV。"))
    elif pers == "failed":
        summary = f"{label} 暫時觀察：空間條件符合，但下一期複核未持續（{_iou_text(latest)}），不建議派遣任務。"
    else:
        summary = f"{label} 暫時觀察：附近沒有崩塌訊號，不符合堵塞成湖的型態。"

    return Assessment(
        priority=priority, action=ACTION_TEXT[priority],
        confidence=confidence, confidence_reasons=conf_reasons,
        persistence=pers, grade=grade, scale=scale_of(latest.area_ha),
        summary=summary, evidence=evidence, gaps=gaps, conflicts=conflicts,
        tasks=tasks, rules_fired=rules, cautions=cautions,
    )
