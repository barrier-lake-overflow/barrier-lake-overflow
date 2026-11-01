#!/usr/bin/env python3
"""每日自動更新：各模組的 doctest，加上窗格過期、新聞比對的情境測試。"""

from __future__ import annotations

import doctest
import unittest
from datetime import datetime, timedelta, timezone

from pipeline.daily import gee, inventory_fetch, news, optical, run, sentinel, watchlist

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


class SentinelMainTest(unittest.TestCase):
    """窗格失敗不能看起來像成功：這一步要拋錯，失敗的窗格留下 lastError，成功後清掉。"""

    def run_main(self, outcome, last_error=None):
        state = {"windows": {k: {"id": k, "name": k, "active": True} for k in ("a", "b")}}
        for k, v in (last_error or {}).items():
            state["windows"][k]["lastError"] = v
        orig = (sentinel.gee.init, sentinel.process_window)
        sentinel.gee.init = lambda project: None

        def fake(ee, w, now):
            if outcome[w["id"]] == "error":
                raise RuntimeError("Permission 'earthengine.thumbnails.create' denied")
            return {"id": w["id"], "status": "ok"}
        sentinel.process_window = fake
        try:
            return state, sentinel.main(state, now=NOW)
        finally:
            sentinel.gee.init, sentinel.process_window = orig

    def test_failed_window_fails_the_step(self):
        with self.assertRaisesRegex(RuntimeError, "1／2 個窗格失敗"):
            self.run_main({"a": "ok", "b": "error"})

    def test_success_clears_last_error(self):
        state, out = self.run_main({"a": "ok", "b": "ok"}, last_error={"b": {"error": "old"}})
        self.assertEqual(len(out["windows"]), 2)
        self.assertNotIn("lastError", state["windows"]["b"])

    def test_last_error_recorded(self):
        orig = (sentinel.gee.init, sentinel.process_window)
        sentinel.gee.init = lambda project: None
        sentinel.process_window = lambda ee, w, now: (_ for _ in ()).throw(RuntimeError("denied"))
        state = {"windows": {"a": {"id": "a", "name": "a", "active": True}}}
        try:
            with self.assertRaises(RuntimeError):
                sentinel.main(state, now=NOW)
        finally:
            sentinel.gee.init, sentinel.process_window = orig
        self.assertEqual(state["windows"]["a"]["lastError"]["error"], "denied")


class SyslogTest(unittest.TestCase):
    """系統管理分頁的資料：執行紀錄累積、同一次不重複、輸出只留最後幾行、專案 ID 要遮掉。"""

    def test_history_and_log_tail(self):
        import json
        import os
        import tempfile
        from pathlib import Path
        with tempfile.TemporaryDirectory() as d:
            old = (run.HISTORY, run.SYSLOG_JS, run.LOG_TAIL_LINES, list(run.LOG_BUF), os.environ.get("GEE_PROJECT"))
            run.HISTORY, run.SYSLOG_JS, run.LOG_TAIL_LINES = Path(d) / "h.json", Path(d) / "s.js", 3
            os.environ["GEE_PROJECT"] = "secret-proj"
            run.LOG_BUF[:] = ["== sentinel ==\n", "a\n", "b\n", "denied on projects/secret-proj\n"]
            try:
                st = {"startedAt": "2026-11-01T07:20+08:00", "finishedAt": "2026-11-01T07:50+08:00",
                      "steps": [{"name": "sentinel", "status": "error", "seconds": 2.0, "error": "x"}]}
                run.write_syslog(st)
                run.write_syslog(st)   # 同一次執行寫兩次（commit 後再寫一次狀態）
                text = run.SYSLOG_JS.read_text(encoding="utf-8")
                data = json.loads(text[text.index("=") + 1:].rstrip().rstrip(";"))
            finally:
                run.HISTORY, run.SYSLOG_JS, run.LOG_TAIL_LINES, run.LOG_BUF[:], proj = old
                if proj is None:
                    os.environ.pop("GEE_PROJECT", None)
                else:
                    os.environ["GEE_PROJECT"] = proj
        self.assertEqual(len(data["history"]), 1)
        self.assertEqual(data["history"][0]["minutes"], 30.0)
        self.assertEqual(data["lastRun"]["totalLines"], 4)
        self.assertEqual(data["lastRun"]["lines"], ["a", "b", "denied on projects/***"])
        self.assertNotIn("secret-proj", text)


def load_tests(loader, tests, ignore):
    for m in (gee, inventory_fetch, news, optical, run, sentinel, watchlist):
        tests.addTests(doctest.DocTestSuite(m))
    return tests


if __name__ == "__main__":
    unittest.main()
