#!/usr/bin/env python3
"""全清冊回放：選湖、選軌道（doctest）與偵測判定。"""

from __future__ import annotations

import doctest
import unittest

from pipeline.events import replay as R

TARGET = {
    "lakeId": "bl900", "scenarioId": "inv_bl900", "name": "測試溪", "formed": "2024-03-13",
    "breach": None, "volume": 55.0, "cause": "",
}
SCENARIO = {"passes": [
    {"time": "2024-03-08T10:00:00+00:00"},   # 形成前
    {"time": "2024-03-20T10:00:00+00:00"},
    {"time": "2024-04-01T10:00:00+00:00"},
]}


def card(eid, dist, priority, seen, conf="中"):
    return {"id": eid, "distanceFromReferenceM": dist, "priority": priority, "lastSeenAt": seen,
            "lonLat": [121.0 + dist / 102_000, 23.7],
            "confidence": conf, "areaHectare": 1.2}


def built(snaps):
    return {"id": "inv_bl900", "center": [121.0, 23.7], "snapshots": [
        {"asOf": t, "label": t[5:10], "events": evs} for t, evs in snaps]}


class SummarizeLakeTest(unittest.TestCase):
    def test_detected_near_dam_after_formation(self):
        b = built([
            ("2024-03-08T10:00:00+00:00", [card("E1", 3000, "high", "2024-03-08T10:00:00+00:00")]),
            ("2024-03-20T10:00:00+00:00", [card("E1", 3000, "high", "2024-03-08T10:00:00+00:00"),
                                           card("E2", 400, "medium", "2024-03-20T10:00:00+00:00")]),
            ("2024-04-01T10:00:00+00:00", [card("E2", 420, "high", "2024-04-01T10:00:00+00:00")]),
        ])
        r = R.summarize_lake(TARGET, b, SCENARIO, None)
        self.assertEqual(r["outcome"], "detected")
        self.assertEqual((r["eventId"], r["priority"], r["maxPriority"]), ("E2", "medium", "high"))
        self.assertEqual(r["detectLagDays"], 7.8)
        self.assertEqual((r["otherEvents"], r["otherHighEvents"]), (1, 1))   # 形成前的 E1 算其他事件

    def test_dark_area_before_formation_does_not_count(self):
        """形成前就在壩址附近的暗區，形成後沒有再被偵測到，不算偵測到。"""
        b = built([
            ("2024-03-08T10:00:00+00:00", [card("E1", 300, "medium", "2024-03-08T10:00:00+00:00")]),
            ("2024-03-20T10:00:00+00:00", [card("E1", 300, "low", "2024-03-08T10:00:00+00:00")]),
        ])
        r = R.summarize_lake(TARGET, b, SCENARIO, None)
        self.assertEqual(r["outcome"], "missed")

    def test_no_data_and_no_pass(self):
        self.assertEqual(R.summarize_lake(TARGET, None, None, None)["outcome"], "no_data")
        early = {"passes": [{"time": "2024-03-08T10:00:00+00:00"}]}
        b = built([("2024-03-08T10:00:00+00:00", [])])
        self.assertEqual(R.summarize_lake({**TARGET, "breach": "2024-03-15"}, b, early, None)["outcome"], "no_pass")

    def test_breach_ends_window(self):
        b = built([("2024-04-01T10:00:00+00:00", [card("E1", 200, "high", "2024-04-01T10:00:00+00:00")])])
        r = R.summarize_lake({**TARGET, "breach": "2024-03-25"}, b, SCENARIO, None)
        self.assertEqual(r["outcome"], "missed")   # 潰決後才看到，不算


def load_tests(loader, tests, ignore):
    tests.addTests(doctest.DocTestSuite(R))
    return tests


if __name__ == "__main__":
    unittest.main()
