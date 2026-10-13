#!/usr/bin/env python3
"""每日自動更新：各模組的 doctest，加上窗格過期、新聞比對的情境測試。"""

from __future__ import annotations

import doctest
import unittest
from datetime import datetime, timedelta, timezone

from pipeline.daily import inventory_fetch, news, sentinel, watchlist

TW = timezone(timedelta(hours=8))
NOW = datetime(2026, 7, 1, 8, tzinfo=TW)


class WatchlistTest(unittest.TestCase):
    def trig(self, source, key, lon=121.0):
        return {"source": source, "key": key, "lonLat": [lon, 23.0], "label": key}

    def test_far_triggers_make_separate_windows(self):
        w = watchlist.update_windows({}, [self.trig("alert", "A"), self.trig("alert", "B", lon=121.1)], NOW)
        self.assertEqual(len(w), 2)

    def test_inventory_window_closes_when_lake_no_longer_watched(self):
        w = watchlist.update_windows({}, [self.trig("inventory", "bl074")], NOW)
        w = watchlist.update_windows({"windows": w}, [], NOW + timedelta(days=1))
        self.assertFalse(next(iter(w.values()))["active"])

    def test_failed_source_does_not_expire_or_refresh(self):
        w = watchlist.update_windows({}, [self.trig("alert", "A")], NOW)
        later = NOW + timedelta(days=40)
        w2 = watchlist.update_windows({"windows": w}, [], later, frozen=frozenset({"alert"}))
        win = next(iter(w2.values()))
        self.assertTrue(win["active"])
        self.assertEqual(win["lastTriggeredAt"], NOW.isoformat(timespec="minutes"))

    def test_reactivated_window_resets_baseline(self):
        w = watchlist.update_windows({}, [self.trig("alert", "A")], NOW)
        k = next(iter(w))
        w[k].update(orbits={"D105": {"pass": "DESCENDING", "scenes": [{"day": "20260620"}]}})
        w = watchlist.update_windows({"windows": w}, [], NOW + timedelta(days=31))
        w = watchlist.update_windows({"windows": w}, [self.trig("alert", "A")], NOW + timedelta(days=60))
        self.assertEqual(w[k]["orbits"], {})


class NewsTest(unittest.TestCase):
    def test_match_by_river_name(self):
        places = news.targets([{"id": "bl072", "name": "花蓮立霧溪(燕子口)", "year": 2025}],
                              [{"id": "inv_bl072", "referenceLakeId": "bl072"}])
        m = news.match({"title": "燕子口堰塞湖水位上升", "summary": ""}, places)
        self.assertEqual(m, [{"scenarioId": "inv_bl072", "lakeId": "bl072", "name": "花蓮立霧溪(燕子口)（2025）"}])

    def test_same_river_prefers_live_window_then_newer_lake(self):
        lakes = [{"id": "bl065", "seq": 65, "name": "花蓮萬里溪", "year": 2024},
                 {"id": "bl075", "seq": 75, "name": "花蓮萬里溪", "year": 2026, "statusKey": "watch"}]
        scen = [{"id": "inv_bl065", "referenceLakeId": "bl065"}, {"id": "inv_bl075", "referenceLakeId": "bl075"},
                {"id": "live_x", "kind": "live", "active": True, "referenceLakeId": "bl075", "name": "花蓮萬里溪"}]
        m = news.match({"title": "萬里溪堰塞湖現況", "summary": ""}, news.targets(lakes, scen))
        self.assertEqual([x["scenarioId"] for x in m], ["live_x", "inv_bl065"])   # bl075 已由監看窗格代表


def load_tests(loader, tests, ignore):
    for m in (inventory_fetch, news, sentinel, watchlist):
        tests.addTests(doctest.DocTestSuite(m))
    return tests


if __name__ == "__main__":
    unittest.main()
