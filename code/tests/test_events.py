#!/usr/bin/env python3
"""事件研判測試。合成情境測規則本身，馬太鞍溪真實結果測整條回放。"""

from __future__ import annotations

import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from pipeline.events import build as B
from pipeline.events import triage as T

UTC = timezone.utc
T0 = datetime(2025, 7, 22, 21, 52, tzinfo=UTC)
DAY6 = timedelta(days=6)


def cand(lon=121.30, lat=23.70, area=3.0, landslide=True, persistent=False, checked=1, iou=0.1):
    return {
        "id": "cand1", "grade": "B", "areaHectare": area,
        "centroidLonLat": [lon, lat], "onRiver": True, "landslideNearby": landslide,
        "damDownstream": landslide, "persistent": persistent, "laterScenesChecked": checked,
        "landslideAreaHectare": 100.0, "lakeFloorM": 900.0,
        "reasons": [f"後續 1 期影像同位置水體 IoU 最高 {iou:.2f}，"
                    + ("持續蓄水" if persistent else "未確認持續")],
        "polygonLonLat": [],
    }


def det(t, c, recheck=True):
    return T.Detection(pass_time=t, recheck_time=t + DAY6 if recheck else None, cand=c)


def ctx(as_of, latest_pass=None, rain=False, analyzed=(), optical=()):
    return T.Context(as_of=as_of, latest_analyzed_pass=latest_pass or as_of,
                     next_pass=as_of + DAY6, rain_available=rain,
                     analyzed=list(analyzed), optical=list(optical))


def opt(t, verdict):
    return {"time": t.isoformat(), "sensor": "Sentinel-2B", "verdict": verdict, "clearPct": 100, "waterPct": None}


class TestTriageRules(unittest.TestCase):

    def test_single_pass_is_medium_and_does_not_dispatch_uav(self):
        a = T.assess("E1", [det(T0, cand())], ctx(T0))
        self.assertEqual((a.priority, a.persistence, a.grade, a.confidence),
                         ("medium", "pending", "B", "低"))
        labels = [t["label"] for t in a.tasks]
        self.assertIn("暫不派遣 UAV", labels)
        self.assertTrue(any("複核" in l for l in labels))

    def test_future_recheck_is_not_used(self):
        # 複核結果在 json 裡已經有，但時點還沒到複核影像，不能用
        d = det(T0, cand(persistent=True))
        self.assertEqual(d.recheck_state(T0), "pending")
        self.assertEqual(d.recheck_state(T0 + DAY6), "persistent")
        self.assertEqual(T.assess("E1", [d], ctx(T0)).priority, "medium")

    def test_confirmed_with_landslide_is_high(self):
        d = det(T0, cand(persistent=True, iou=0.52))
        a = T.assess("E1", [d], ctx(T0 + DAY6, latest_pass=T0))
        self.assertEqual((a.priority, a.grade, a.action), ("high", "A", "建議立即查證"))
        self.assertIn("priority.high.confirmed", a.rules_fired)
        self.assertTrue(any("UAV" in t["label"] for t in a.tasks))

    def test_old_landslide_caution_does_not_change_judgement(self):
        base = T.assess("E1", [det(T0, cand())], ctx(T0))
        on_deposit = T.assess("E1", [det(T0, {**cand(), "oldLandslidePct": 64.2})], ctx(T0))
        self.assertEqual(base.cautions, [])
        self.assertEqual(len(on_deposit.cautions), 1)
        self.assertIn("64%", on_deposit.cautions[0])
        self.assertIn("caution.old_landslide", on_deposit.rules_fired)
        for k in ("priority", "confidence", "grade", "persistence", "tasks", "conflicts"):
            self.assertEqual(getattr(base, k), getattr(on_deposit, k))
        self.assertIn("cautions", on_deposit.to_dict())

    def test_old_landslide_below_threshold_or_missing_has_no_caution(self):
        low = T.assess("E1", [det(T0, {**cand(), "oldLandslidePct": 5.6})], ctx(T0))
        self.assertEqual(low.cautions, [])
        self.assertEqual(T.assess("E1", [det(T0, cand())], ctx(T0)).cautions, [])

    def test_sar_only_confidence_caps_at_medium(self):
        d1 = det(T0, cand(persistent=True))
        d2 = det(T0 + DAY6, cand(persistent=True))
        a = T.assess("E1", [d1, d2], ctx(T0 + 2 * DAY6, latest_pass=T0 + DAY6))
        self.assertEqual(a.confidence, "中")

    def test_failed_recheck_is_low_and_flags_conflict(self):
        d = det(T0, cand(persistent=False, iou=0.01))
        a = T.assess("E1", [d], ctx(T0 + DAY6))
        self.assertEqual((a.priority, a.persistence, a.action), ("low", "failed", "暫時觀察"))
        self.assertTrue(a.conflicts)
        self.assertIn("IoU 0.01", a.summary)

    def test_no_landslide_pending_is_low(self):
        a = T.assess("E1", [det(T0, cand(landslide=False))], ctx(T0))
        self.assertEqual((a.priority, a.grade), ("low", "C"))

    def test_confirmed_then_one_miss_is_medium_missing(self):
        d1 = det(T0, cand(persistent=True))
        later_pass = T0 + 2 * DAY6
        a = T.assess("E1", [d1], ctx(later_pass, latest_pass=later_pass))
        self.assertEqual((a.persistence, a.priority), ("missing", "medium"))
        self.assertNotIn("立即查證是否潰決或排空", [t["label"] for t in a.tasks])

    def test_confirmed_then_two_misses_is_high_lost(self):
        d1 = det(T0, cand(persistent=True))
        misses = [(T0 + 2 * DAY6, None), (T0 + 3 * DAY6, None)]
        a = T.assess("E1", [d1], ctx(T0 + 3 * DAY6, analyzed=misses))
        self.assertEqual((a.persistence, a.priority), ("lost", "high"))

    def test_other_orbit_does_not_count_as_miss(self):
        # 降軌看得到、升軌看不到：陰影方向不同，不算湖不見了
        d1 = T.Detection(T0, T0 + DAY6, cand(persistent=True), orbit="降軌 105")
        d2 = T.Detection(T0 + DAY6, None, cand(), orbit="降軌 105")
        asc = [(T0 + DAY6 + timedelta(days=2), "升軌 69"), (T0 + DAY6 + timedelta(days=4), "升軌 69")]
        a = T.assess("E1", [d1, d2], ctx(asc[-1][0], analyzed=[(T0, "降軌 105"), (T0 + DAY6, "降軌 105")] + asc))
        self.assertEqual((a.persistence, a.priority), ("confirmed", "high"))

    def test_radar_history_matches_persistence_rules(self):
        d1 = T.Detection(T0, T0 + DAY6, cand(persistent=True), orbit="降軌 105")
        asc, d105b, d105c = T0 + timedelta(days=3), T0 + DAY6, T0 + 2 * DAY6
        analyzed = [(T0 - DAY6, "降軌 105"), (T0, "降軌 105"), (asc, "升軌 69"), (d105b, "降軌 105"), (d105c, "降軌 105")]
        c = ctx(d105c, analyzed=analyzed)
        rows = T.radar_history([d1], c)
        self.assertEqual([r["status"] for r in rows], ["hit", "other", "wet", "miss"])   # 首次出現以前不列
        self.assertTrue(rows[0]["text"].startswith("首次出現"))
        self.assertEqual(T.persistence([d1], c), "missing")   # 時間軸上的 miss 數跟研判一致

    def test_persistent_recheck_counts_as_seen(self):
        # 複核期同位置仍有水（只是沒成為候選），那一期不算漏看
        d1 = det(T0, cand(persistent=True))
        a = T.assess("E1", [d1], ctx(T0 + DAY6, analyzed=[(T0, None), (T0 + DAY6, None)]))
        self.assertEqual(a.persistence, "confirmed")

    def test_repeated_dry_optical_caps_at_medium(self):
        d1 = det(T0, cand(persistent=True))
        dry = [opt(T0 + timedelta(days=2), "no_water"), opt(T0 + timedelta(days=5), "no_water")]
        a = T.assess("E1", [d1], ctx(T0 + DAY6, latest_pass=T0, optical=dry))
        self.assertEqual((a.persistence, a.priority, a.confidence), ("confirmed", "medium", "低"))
        self.assertIn("priority.capped.optical_dry", a.rules_fired)
        self.assertIn("暫不派遣 UAV", [t["label"] for t in a.tasks])

    def test_one_dry_or_any_wet_optical_does_not_cap(self):
        d1 = det(T0, cand(persistent=True))
        one = [opt(T0 + timedelta(days=2), "no_water")]
        mixed = one + [opt(T0 + timedelta(days=3), "no_water"), opt(T0 + timedelta(days=4), "water")]
        for o in (one, mixed):
            self.assertEqual(T.assess("E1", [d1], ctx(T0 + DAY6, latest_pass=T0, optical=o)).priority, "high")

    def test_optical_before_event_is_ignored(self):
        d1 = det(T0, cand(persistent=True))
        dry = [opt(T0 - timedelta(days=5), "no_water"), opt(T0 - timedelta(days=2), "no_water")]
        self.assertEqual(T.assess("E1", [d1], ctx(T0 + DAY6, latest_pass=T0, optical=dry)).priority, "high")

    def test_wet_optical_after_sar_lost_is_not_breach(self):
        d1 = det(T0, cand(persistent=True))
        misses = [(T0 + 2 * DAY6, None), (T0 + 3 * DAY6, None)]
        wet = [opt(T0 + 3 * DAY6 - timedelta(days=1), "water")]
        a = T.assess("E1", [d1], ctx(T0 + 3 * DAY6, analyzed=misses, optical=wet))
        self.assertEqual((a.persistence, a.priority), ("lost", "medium"))
        self.assertIn("conflict.sar_missing_optical_wet", a.rules_fired)
        self.assertNotIn("可能已潰決", a.summary)

    def test_failed_then_reappears_goes_back_to_pending(self):
        d1 = det(T0, cand(persistent=False))
        d2 = det(T0 + 2 * DAY6, cand(), recheck=False)
        a = T.assess("E1", [d1, d2], ctx(T0 + 2 * DAY6))
        self.assertEqual((a.persistence, a.priority), ("pending", "medium"))

    def test_growing_area(self):
        d1 = det(T0, cand(area=5.8, persistent=True))
        d2 = det(T0 + DAY6, cand(area=26.3), recheck=False)
        a = T.assess("E1", [d1, d2], ctx(T0 + DAY6))
        self.assertIn("trend.growing", a.rules_fired)
        self.assertEqual(a.scale, "大")

    def test_rain_gap_only_when_missing(self):
        d = det(T0, cand())
        self.assertIn("gap.rain", T.assess("E1", [d], ctx(T0)).rules_fired)
        self.assertNotIn("gap.rain", T.assess("E1", [d], ctx(T0, rain=True)).rules_fired)

    def test_external_optical_corroborates_single_pass(self):
        c = ctx(T0)
        c.external = [{"time": T0, "kind": "optical", "text": "光學影像可見湖面", "source": "某單位"}]
        a = T.assess("E1", [det(T0, cand())], c)
        self.assertEqual((a.priority, a.confidence), ("high", "高"))
        self.assertNotIn("gap.optical", a.rules_fired)
        self.assertNotIn("暫不派遣 UAV", [t["label"] for t in a.tasks])

    def test_official_estimate_alone_is_not_independent(self):
        c = ctx(T0)
        c.external = [{"time": T0, "kind": "official", "text": "官方估蓄水量", "source": "某單位"}]
        a = T.assess("E1", [det(T0, cand())], c)
        self.assertEqual((a.priority, a.confidence), ("medium", "低"))

    def test_external_does_not_rescue_failed_recheck(self):
        c = ctx(T0 + DAY6)
        c.external = [{"time": T0, "kind": "optical", "text": "x", "source": "y"}]
        a = T.assess("E1", [det(T0, cand(persistent=False))], c)
        self.assertEqual(a.priority, "low")

    def test_exposure_replaces_gap(self):
        c = ctx(T0)
        c.exposure = {"text": "下游有聚落", "source": "s"}
        a = T.assess("E1", [det(T0, cand())], c)
        self.assertNotIn("gap.exposure", a.rules_fired)
        self.assertIn("exposure.known", a.rules_fired)

    def test_empty_detections(self):
        with self.assertRaises(ValueError):
            T.assess("E1", [], ctx(T0))


class TestTracking(unittest.TestCase):

    def _pass(self, t, cands, recheck=True):
        p = {"file": "x", "time": t.isoformat(),
             "recheckTime": (t + DAY6).isoformat() if recheck else None}
        return p, {"candidates": cands}

    def test_nearby_candidates_merge(self):
        passes = [self._pass(T0, [cand(121.2935, 23.6982)]),
                  self._pass(T0 + DAY6, [cand(121.2947, 23.6983)])]   # 約 120 m
        events = B.track(passes)
        self.assertEqual(len(events), 1)
        self.assertEqual(len(events[0]["detections"]), 2)

    def test_far_candidates_split(self):
        passes = [self._pass(T0, [cand(121.3075, 23.7092)]),
                  self._pass(T0 + DAY6, [cand(121.3104, 23.7079)])]   # 約 330 m
        self.assertEqual(len(B.track(passes)), 2)


class TestMatchingExternal(unittest.TestCase):

    SCEN = {"externalEvidence": [
        {"time": T0.isoformat(), "kind": "optical", "lonLat": [121.30, 23.70], "radiusM": 600, "text": "a"},
    ]}

    def test_time_and_radius(self):
        self.assertEqual(len(B.matching_external(self.SCEN, (121.30, 23.70), T0)), 1)
        self.assertEqual(B.matching_external(self.SCEN, (121.30, 23.70), T0 - DAY6), [])
        self.assertEqual(B.matching_external(self.SCEN, (121.31, 23.70), T0), [])   # 約 1 km


class TestNegativeScenario(unittest.TestCase):

    def test_no_candidates_builds_empty_snapshots(self):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            (d / "final_a.json").write_text(json.dumps({"candidates": []}), encoding="utf-8")
            scenario = {
                "id": "neg", "name": "負案例", "kind": "negative", "center": [121.3, 23.7],
                "referenceLakeId": None, "observationsLakeId": None,
                "passes": [{"file": "final_a.json", "time": T0.isoformat(),
                            "recheckTime": (T0 + DAY6).isoformat()},
                           {"file": "missing.json", "time": (T0 + DAY6).isoformat()}],
            }
            r = B.build_scenario(scenario, d)
            self.assertIsNone(r["reference"])
            self.assertEqual(len(r["snapshots"]), 2)
            self.assertTrue(all(s["events"] == [] for s in r["snapshots"]))

    def test_all_missing_returns_none(self):
        with tempfile.TemporaryDirectory() as d:
            scenario = {"id": "x", "name": "x", "center": [0, 0],
                        "passes": [{"file": "nope.json", "time": T0.isoformat()}]}
            self.assertIsNone(B.build_scenario(scenario, Path(d)))


class TestMataiAnReplay(unittest.TestCase):
    """馬太鞍溪真實結果（只看 SAR）：湖在 7/29 出現、8/4 複核後升高優先；三個誤報複核後都降為低優先。
    加上光學偵測的結果見 TestMataiAnOptical。"""

    @classmethod
    def setUpClass(cls):
        scenario = json.loads((B.SCENARIOS / "matai_an_2025.json").read_text(encoding="utf-8"))
        scenario.pop("opticalDetection", None)
        if not all((B.DERIVED / p["file"]).exists() for p in scenario["passes"]):
            raise unittest.SkipTest("data/derived/final_*.json 不在，先跑 scripts/run_sar_all.bat")
        cls.result = B.build_scenario(scenario, B.DERIVED, B.read_lakes(B.LAKES_JS),
                                      B.load_observations_table())
        cls.snaps = {s["label"]: s for s in cls.result["snapshots"]}

    def _by_priority(self, label):
        s = self.snaps[label]
        return {k: [e["id"] for e in s["events"] if e["priority"] == k] for k in T.PRIORITY_RANK}

    def test_snapshot_timeline(self):
        self.assertEqual(list(self.snaps),
                         ["7/23 05:52", "7/29 05:51", "8/4 05:52", "8/22 05:51", "8/28 05:52"])

    def test_first_pass_has_no_high(self):
        p = self._by_priority("7/23 05:52")
        self.assertEqual(p["high"], [])
        self.assertEqual(len(p["medium"]), 2)

    def test_lake_high_on_first_sar_pass_because_of_external_evidence(self):
        # 7/29 SAR 首次偵測，尚未複核；但 7/24 光學、7/27 航拍已發布，多源一致
        e3 = next(e for e in self.snaps["7/29 05:51"]["events"] if e["id"] == "E3")
        self.assertEqual((e3["priority"], e3["persistence"], e3["confidence"]), ("high", "pending", "高"))
        self.assertIn("priority.high.corroborated", e3["rulesFired"])
        self.assertEqual(self._by_priority("8/4 05:52")["high"], ["E3"])

    def test_external_evidence_not_used_before_published(self):
        # 7/23 時光學（7/24）還沒發布；E1、E2 也離壩址太遠，不會對到
        for e in self.snaps["7/23 05:52"]["events"]:
            self.assertFalse(any(r.startswith("external.") for r in e["rulesFired"]))

    def test_lake_is_near_reference_dam(self):
        e3 = self.snaps["8/22 05:51"]["events"][0]
        self.assertEqual(e3["id"], "E3")
        self.assertLess(e3["distanceFromReferenceM"], 600)
        self.assertIn("trend.growing", e3["rulesFired"])

    def test_false_alarms_end_low(self):
        p = self._by_priority("8/28 05:52")
        self.assertEqual(p["high"], ["E3"])
        self.assertEqual(sorted(p["low"]), ["E1", "E2", "E4"])

    def test_reference_lake_not_counted_as_history(self):
        e3 = self.snaps["8/4 05:52"]["events"][0]
        hist = [e for e in e3["evidence"] if e["kind"] == "history"]
        self.assertTrue(hist)
        self.assertNotIn("馬太鞍", hist[0]["text"])

    def test_hindsight_is_attached_but_not_used_for_triage(self):
        hs = {"lonLat": [121.30, 23.70], "radiusM": 300, "verdict": "false_positive",
              "title": "事後查證：誤報", "text": "光學查證不是水"}
        near = B.matching_hindsight({"hindsight": [hs]}, (121.301, 23.700))
        far = B.matching_hindsight({"hindsight": [hs]}, (121.31, 23.70))
        self.assertEqual((len(near), len(far)), (1, 0))
        # 研判只看 Detection 與 Context，事後查證不會進來
        a = T.assess("E1", [det(T0, cand(persistent=True, iou=0.52))], ctx(T0 + DAY6, latest_pass=T0))
        self.assertEqual(a.priority, "high")

    def test_write_js_roundtrip(self):
        with tempfile.TemporaryDirectory() as d:
            out = Path(d) / "events.js"
            B.write_js([self.result], out)
            src = out.read_text(encoding="utf-8")
            data = json.loads(src[src.index("["):src.rindex("]") + 1])
            self.assertEqual(data[0]["id"], "matai_an_2025")


class TestMataiAnOptical(unittest.TestCase):
    """馬太鞍溪加上光學偵測（docs/validation.md「馬太鞍溪事件佇列回放」）：雲散前（8/14 以前）與只用 SAR 相同；
    之後光學在崩塌地多出誤報 E4、E5，因為只有光學看到，最高只到中優先。"""

    @classmethod
    def setUpClass(cls):
        scenario = json.loads((B.SCENARIOS / "matai_an_2025.json").read_text(encoding="utf-8"))
        files = [p["file"] for p in B.scenario_passes(scenario)]
        if not scenario.get("opticalDetection") or not all((B.DERIVED / f).exists() for f in files):
            raise unittest.SkipTest("光學偵測結果不在，先跑 scripts/optical_replay.py")
        result = B.build_scenario(scenario, B.DERIVED, B.read_lakes(B.LAKES_JS), B.load_observations_table())
        cls.snaps = {s["label"]: s for s in result["snapshots"]}

    def test_before_first_clear_scene_same_as_sar(self):
        self.assertEqual(list(self.snaps)[:3], ["7/23 05:52", "7/29 05:51", "8/4 05:52"])
        self.assertEqual(self.snaps["8/14 10:41"]["what"], "新一期光學（Sentinel-2A）晴空影像偵測")
        self.assertEqual([e["id"] for e in self.snaps["8/4 05:52"]["events"] if e["priority"] == "high"], ["E3"])

    def test_optical_only_false_alarms_capped_at_medium(self):
        evs = {e["id"]: e for e in self.snaps["8/28 05:52"]["events"]}
        self.assertEqual(sorted(k for k, e in evs.items() if e["priority"] == "high"), ["E3", "E6"])
        e4 = evs["E4"]
        self.assertGreater(e4["distanceFromReferenceM"], 1000)
        self.assertEqual((e4["sources"], e4["priority"], e4["confidence"]), (["optical"], "medium", "中"))
        self.assertIn("priority.capped.optical_only", e4["rulesFired"])
        # E6 在壩址旁、對上他單位光學與航拍成果（獨立證據），不受上限
        self.assertIn("external.aerial", evs["E6"]["rulesFired"])
        self.assertNotIn("priority.capped.optical_only", evs["E6"]["rulesFired"])


class TestNextSarPass(unittest.TestCase):
    """下一期：各軌依自己的週期推；最新一期跳過已查過卻沒拍的過境；查詢失敗時不跳。"""

    # 2026-10 的實際排程：降軌 105 由 S1C、S1D 錯開拍，升軌 69 只剩 S1D
    ORBITS = [{"label": "降軌 105", "satellite": "S1C", "cycleDays": 12, "last": "2026-10-23T05:51+08:00"},
              {"label": "降軌 105", "satellite": "S1D", "cycleDays": 12, "last": "2026-10-17T05:51+08:00"},
              {"label": "升軌 69", "satellite": "S1D", "cycleDays": 12, "last": "2026-10-26T18:00+08:00"}]

    def build(self, checked):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            for name in ("a", "b"):
                (d / f"final_{name}.json").write_text(json.dumps({"candidates": []}), encoding="utf-8")
            scenario = {"id": "live_x", "name": "x", "kind": "live", "center": [121.3, 23.7], "revisitDays": 4,
                        "orbits": self.ORBITS, "sarCheckedAt": checked,
                        "passes": [{"file": "final_a.json", "time": "2026-10-22T21:51:00+00:00"},
                                   {"file": "final_b.json", "time": "2026-10-26T10:00:00+00:00"}]}
            return B.build_scenario(scenario, d)["snapshots"]

    def test_skipped_pass_moves_to_next(self):
        first, last = self.build("2026-11-01T09:38+08:00")
        self.assertEqual((first["nextPass"], first["nextPassOrbit"]), ("10/26", "升軌 69"))
        self.assertEqual((last["nextPass"], last["nextPassOrbit"]), ("11/4", "降軌 105"))

    def test_without_successful_check_keeps_overdue_pass(self):
        # 查詢一直失敗（sarCheckedAt 停在 10/27）：10/29 那次不能當作衛星沒拍
        self.assertEqual(self.build("2026-10-27T09:38+08:00")[-1]["nextPass"], "10/29")
        self.assertEqual(self.build(None)[-1]["nextPass"], "10/29")

    def test_upcoming_list_skips_missed_pass_and_merges_optical(self):
        sc = {"kind": "live", "orbits": self.ORBITS, "sarCheckedAt": "2026-11-01T09:38+08:00",
              "optical": {"next": [{"date": "2026-11-06", "sensor": "Landsat 9"}]}}
        got = [(p["date"], p["sensor"], p["orbit"]) for p in B.upcoming_passes(sc)]
        self.assertEqual(got[:4], [("2026-11-04", "Sentinel-1C", "降軌 105"), ("2026-11-06", "Landsat 9", None),
                                   ("2026-11-07", "Sentinel-1D", "升軌 69"), ("2026-11-10", "Sentinel-1D", "降軌 105")])
        self.assertNotIn("2026-10-29", [d for d, _, _ in got])   # S1D 10/29 已查過卻沒拍
        self.assertEqual(B.upcoming_passes({"orbits": self.ORBITS}), [])   # 沒成功查過就不推

    def test_replay_scenario_without_orbits_unchanged(self):
        t = datetime.fromisoformat("2026-10-26T18:00+08:00")
        self.assertEqual(B.next_sar_pass(t, [], DAY6), (t + DAY6, None))


class TestOptical(unittest.TestCase):
    """光學影像自動判讀（pipeline/daily/optical.py）：依位置附到事件卡、不看到下一期以後、不影響研判。"""

    def build(self, optical):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            for name in ("a", "b"):
                (d / f"final_{name}.json").write_text(json.dumps({"candidates": [cand()]}), encoding="utf-8")
            scenario = {"id": "live_x", "name": "x", "kind": "live", "center": [121.3, 23.7],
                        "passes": [{"file": "final_a.json", "time": T0.isoformat()},
                                   {"file": "final_b.json", "time": (T0 + DAY6).isoformat()}]}
            if optical:
                scenario["optical"] = optical
            return B.build_scenario(scenario, d)

    def test_results_cut_at_next_snapshot_and_no_peeking_in_triage(self):
        between, after = T0 + timedelta(days=2), T0 + timedelta(days=8)
        optical = {"checkedAt": after.isoformat(), "scenes": [], "next": [{"date": "2025-08-05", "sensor": "Landsat 9"}],
                   "checks": [{"event": "E1", "lonLat": [121.3001, 23.7], "results": [
                       {"time": after.isoformat(), "sensor": "Sentinel-2B", "verdict": "water"},
                       {"time": between.isoformat(), "sensor": "Landsat 9", "verdict": "cloud"}]}]}
        with_opt, without = self.build(optical), self.build(None)
        first, last = with_opt["snapshots"]
        self.assertEqual([r["verdict"] for r in first["events"][0]["optical"]], ["cloud"])
        self.assertEqual([r["verdict"] for r in last["events"][0]["optical"]], ["water", "cloud"])
        self.assertEqual(with_opt["optical"]["next"][0]["sensor"], "Landsat 9")
        self.assertIsNone(without["optical"])
        # 第一期：卡片列得到 T0+2 的光學，但研判只用 T0 以前的 → 跟沒有光學一樣
        ea, eb = first["events"][0], without["snapshots"][0]["events"][0]
        self.assertEqual((ea["priority"], ea["confidence"], ea["rulesFired"]),
                         (eb["priority"], eb["confidence"], eb["rulesFired"]))
        # 即時監看最新一期就是現在：之後拍到的光學也算進研判
        self.assertIn("optical_auto.water", last["events"][0]["rulesFired"])

    def test_far_check_not_attached(self):
        optical = {"checkedAt": "", "scenes": [], "next": [],
                   "checks": [{"event": "E9", "lonLat": [121.31, 23.7], "results": [
                       {"time": T0.isoformat(), "sensor": "Sentinel-2B", "verdict": "water"}]}]}
        self.assertEqual(self.build(optical)["snapshots"][-1]["events"][0]["optical"], [])


def odet(t, c, recheck=True, sensor="Sentinel-2B"):
    """光學偵測：每一期各自一個軌道（detect/optical.py ORBIT_PREFIX）。"""
    return T.Detection(pass_time=t, recheck_time=t + DAY6 if recheck else None, cand=c,
                       orbit=f"光學 {sensor} {t:%Y%m%d}", source="optical", sensor=sensor)


class TestOpticalSource(unittest.TestCase):
    """光學偵測來源：同一張決策表，但光學沒看到不算消失，兩者都看到也不算獨立證據。"""

    def test_optical_single_pass_is_medium_and_names_source(self):
        a = T.assess("E1", [odet(T0, cand())], ctx(T0))
        self.assertEqual((a.priority, a.persistence, a.confidence), ("medium", "pending", "低"))
        self.assertEqual(a.evidence[0]["kind"], "optical_det")
        self.assertIn("光學（Sentinel-2B）", a.summary)
        self.assertIn("值班人員打開光學影像確認", [t["label"] for t in a.tasks])

    def test_optical_only_confirmed_is_capped_at_medium(self):
        dets = [odet(T0, cand()), odet(T0 + timedelta(days=3), cand())]
        a = T.assess("E1", dets, ctx(T0 + timedelta(days=3)))
        self.assertEqual((a.persistence, a.grade, a.priority), ("confirmed", "A", "medium"))
        self.assertIn("priority.capped.optical_only", a.rules_fired)
        self.assertEqual(a.tasks[0]["label"], "打開光學影像確認湖面")

    def test_optical_only_with_external_evidence_can_be_high(self):
        ext = [{"time": T0, "kind": "aerial", "text": "航拍可見湖面", "source": "航遙分署"}]
        c = ctx(T0)
        c.external = ext
        a = T.assess("E1", [odet(T0, cand())], c)
        self.assertEqual((a.priority, a.confidence), ("high", "高"))

    def test_sar_and_optical_together_are_not_corroboration(self):
        dets = [det(T0, cand()), odet(T0 + timedelta(days=2), cand())]
        a = T.assess("E1", dets, ctx(T0 + timedelta(days=2)))
        # 兩期偵測到算確認持續（A 級高優先），但信心仍是「中」：都是系統自動偵測
        self.assertEqual((a.persistence, a.priority, a.confidence), ("confirmed", "high", "中"))
        self.assertNotIn("priority.high.corroborated", a.rules_fired)
        self.assertEqual(T.sources_text(dets), "SAR、光學")

    def test_optical_pass_without_water_is_not_a_miss(self):
        # SAR 兩期確認後，之後只有光學各期沒看到：不算未見（可能只是雲遮）
        d1, d2 = det(T0, cand(), recheck=False), det(T0 + DAY6, cand(), recheck=False)
        later = [(T0 + timedelta(days=d), f"光學 Sentinel-2B {(T0 + timedelta(days=d)):%Y%m%d}") for d in (8, 10, 13)]
        c = ctx(T0 + timedelta(days=13), analyzed=[(T0, None), (T0 + DAY6, None)] + later)
        self.assertEqual(T.persistence([d1, d2], c), "confirmed")

    def test_sar_passes_do_not_lose_an_optical_only_lake(self):
        d1, d2 = odet(T0, cand()), odet(T0 + timedelta(days=3), cand(), recheck=False)
        sar = [(T0 + timedelta(days=d), "降軌 105") for d in (6, 12)]
        c = ctx(T0 + timedelta(days=12), analyzed=[(d1.pass_time, d1.orbit), (d2.pass_time, d2.orbit)] + sar)
        self.assertEqual(T.persistence([d1, d2], c), "confirmed")
        radar = T.radar_history([d1, d2], c)
        self.assertEqual([r["source"] for r in radar], ["optical", "optical", "sar", "sar"])
        self.assertEqual({r["status"] for r in radar if r["source"] == "sar"}, {"other"})

    def test_failed_optical_recheck_does_not_undo_confirmation(self):
        # SAR 兩期都看到（確認），最新一筆光學的下一景複核沒對上：仍是確認持續，不退回、不算漏看
        dets = [det(T0, cand(), recheck=False), det(T0 + DAY6, cand(), recheck=False),
                odet(T0 + timedelta(days=8), cand(persistent=False))]
        analyzed = [(d.pass_time, d.orbit) for d in dets] + [(T0 + timedelta(days=14), "光學 Sentinel-2B 20250805")]
        a = T.assess("E1", dets, ctx(T0 + timedelta(days=14), analyzed=analyzed))
        self.assertEqual(a.persistence, "confirmed")

    def test_build_merges_optical_detection_passes(self):
        with tempfile.TemporaryDirectory() as tmp:
            d = Path(tmp)
            (d / "s.json").write_text(json.dumps({"candidates": [cand()]}), encoding="utf-8")
            (d / "o.json").write_text(json.dumps({"candidates": [cand(lon=121.301)]}), encoding="utf-8")
            sc = {"id": "t", "name": "t", "kind": "replay", "center": [121.3, 23.7], "orbitLabel": "降軌 105",
                  "passes": [{"file": "s.json", "time": T0.isoformat(), "recheckTime": None}],
                  "opticalDetection": {"passes": [{"file": "o.json", "time": (T0 + timedelta(days=3)).isoformat(),
                                                   "recheckTime": None, "source": "optical", "sensor": "Sentinel-2B",
                                                   "orbitLabel": "光學 Sentinel-2B 20250725"}]}}
            out = B.build_scenario(sc, d)
        last = out["snapshots"][-1]
        self.assertIn("光學（Sentinel-2B）", last["what"])
        ev = last["events"][0]
        self.assertEqual((ev["source"], ev["sources"]), ("optical", ["sar", "optical"]))
        self.assertEqual([x["source"] for x in ev["detections"]], ["sar", "optical"])


if __name__ == "__main__":
    unittest.main()
