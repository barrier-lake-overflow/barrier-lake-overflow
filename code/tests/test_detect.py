#!/usr/bin/env python3
"""NDWI 水體萃取測試：公式、Otsu、二值化、變化偵測，以及用臨時小 GeoTIFF 測讀檔。"""

from __future__ import annotations

import json
import os
import tempfile
import unittest

import numpy as np

from pipeline.detect import water as W


class TestNdwi(unittest.TestCase):
    def test_water_pixel_gives_positive_value(self):
        # 水體：綠光高、近紅外低
        vals = W.ndwi(np.array([0.30]), np.array([0.05]))
        self.assertGreater(vals[0], 0.0)

    def test_land_pixel_gives_negative_value(self):
        # 陸地／植生：近紅外高於綠光
        vals = W.ndwi(np.array([0.10]), np.array([0.35]))
        self.assertLess(vals[0], 0.0)

    def test_zero_denominator_gives_nan(self):
        vals = W.ndwi(np.array([0.0]), np.array([0.0]))
        self.assertTrue(np.isnan(vals[0]))

    def test_matches_hand_computed_formula(self):
        vals = W.ndwi(np.array([0.4]), np.array([0.2]))
        self.assertAlmostEqual(vals[0], (0.4 - 0.2) / (0.4 + 0.2), places=10)


class TestOtsuThreshold(unittest.TestCase):
    def test_separates_two_well_separated_clusters(self):
        rng = np.random.default_rng(1)
        land = rng.normal(-0.5, 0.05, 500)
        water = rng.normal(0.6, 0.05, 500)
        t = W.otsu_threshold(np.concatenate([land, water]))
        self.assertGreater(t, -0.5)
        self.assertLess(t, 0.6)

    def test_constant_array_returns_that_value(self):
        t = W.otsu_threshold(np.full(10, 0.25))
        self.assertEqual(t, 0.25)

    def test_ignores_nan(self):
        rng = np.random.default_rng(2)
        land = rng.normal(-0.5, 0.05, 200)
        water = rng.normal(0.6, 0.05, 200)
        values = np.concatenate([land, water, np.full(50, np.nan)])
        t = W.otsu_threshold(values)
        self.assertGreater(t, -0.5)
        self.assertLess(t, 0.6)

    def test_all_nan_raises(self):
        with self.assertRaises(ValueError):
            W.otsu_threshold(np.full(5, np.nan))


class TestWaterMask(unittest.TestCase):
    def test_fixed_threshold(self):
        arr = np.array([0.7, 0.6, -0.4, -0.5])
        mask, t = W.water_mask(arr, threshold=0.0)
        self.assertEqual(t, 0.0)
        self.assertEqual(mask.tolist(), [True, True, False, False])

    def test_nan_pixels_never_marked_as_water(self):
        arr = np.array([np.nan, 0.5])
        mask, _ = W.water_mask(arr, threshold=0.0)
        self.assertFalse(mask[0])
        self.assertTrue(mask[1])

    def test_auto_otsu_separates_clear_clusters(self):
        rng = np.random.default_rng(3)
        land = rng.normal(-0.5, 0.05, 200)
        water = rng.normal(0.6, 0.05, 200)
        arr = np.concatenate([land, water])
        mask, t = W.water_mask(arr, threshold=None)
        self.assertTrue(mask[200:].all())
        self.assertFalse(mask[:200].any())


class TestExtractWater(unittest.TestCase):
    def test_area_matches_pixel_count_times_cell_area(self):
        green = np.full((4, 4), 0.10)
        nir = np.full((4, 4), 0.35)
        green[1:3, 1:3] = 0.30
        nir[1:3, 1:3] = 0.05
        ext = W.extract_water(green, nir, cell_size_m=10.0, threshold=0.0)
        self.assertEqual(int(ext.mask.sum()), 4)
        self.assertEqual(ext.area_m2, 4 * 100.0)
        self.assertEqual(ext.method, "fixed")

    def test_default_threshold_uses_otsu(self):
        green = np.full((10, 10), 0.10)
        nir = np.full((10, 10), 0.35)
        green[3:7, 3:7] = 0.30
        nir[3:7, 3:7] = 0.05
        ext = W.extract_water(green, nir, cell_size_m=10.0)
        self.assertEqual(ext.method, "otsu")
        self.assertEqual(int(ext.mask.sum()), 16)


class TestChangeDetection(unittest.TestCase):
    def _extent(self, mask):
        return W.WaterExtent(mask=mask, threshold=0.0, method="fixed", cell_size_m=10.0)

    def test_new_water_is_post_minus_pre(self):
        pre = self._extent(np.array([[True, False], [False, False]]))
        post = self._extent(np.array([[True, True], [False, True]]))
        new_water = W.change_detection(pre, post)
        self.assertEqual(new_water.tolist(), [[False, True], [False, True]])

    def test_no_change_gives_all_false(self):
        mask = np.array([[True, False], [False, True]])
        pre = self._extent(mask.copy())
        post = self._extent(mask.copy())
        new_water = W.change_detection(pre, post)
        self.assertFalse(new_water.any())

    def test_shape_mismatch_raises(self):
        pre = self._extent(np.zeros((2, 2), dtype=bool))
        post = self._extent(np.zeros((3, 3), dtype=bool))
        with self.assertRaises(ValueError):
            W.change_detection(pre, post)


class TestOpticalWaterRule(unittest.TestCase):
    def test_sentinel2_rule_needs_both_mndwi_and_low_nir(self):
        g = np.array([700.0, 700.0, 900.0])
        swir = np.array([200.0, 200.0, 1600.0])
        nir = np.array([300.0, 800.0, 1500.0])     # 水、MNDWI 偏水但近紅外線太高、土石
        self.assertEqual(W.optical_water_rule(g, nir, swir=swir).tolist(), [True, False, False])

    def test_aerial_rule_needs_both_ndvi_and_ndwi(self):
        g = np.array([900.0, 850.0, 500.0])
        r = np.array([400.0, 800.0, 400.0])
        nir = np.array([200.0, 790.0, 300.0])      # 湖、崩塌裸地、NDVI 偏水但 NDWI 不夠
        self.assertEqual(W.optical_water_rule(g, nir, red=r).tolist(), [True, False, False])

    def test_aerial_rule_matches_previous_prepare_aerial_formula(self):
        # 原本寫在 scripts/prepare_aerial.py 的判斷式，集中後結果要逐像元相同
        rng = np.random.default_rng(3)
        r, g, nir = (rng.integers(0, 3000, 5000).astype(np.float32) for _ in range(3))
        ndwi = (g - nir) / (g + nir + 1e-6)
        ndvi = (nir - r) / (nir + r + 1e-6)
        old = (ndvi < -0.15) & (ndwi > 0.2)
        np.testing.assert_array_equal(W.optical_water_rule(g, nir, red=r), old)

    def test_requires_red_or_swir(self):
        with self.assertRaises(ValueError):
            W.optical_water_rule(np.array([1.0]), np.array([1.0]))


class TestSarFixedThreshold(unittest.TestCase):
    def test_sar_chain_defaults_to_fixed_minus_18_db(self):
        from pipeline.detect.barrier_lake import run_sar_chain, synthetic_scene
        s = synthetic_scene(seed=0)
        out = run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], dem=s["dem"],
                            later_post_dbs=s["later_dbs"], min_catchment_km2=0.05)
        for ext in (out["pre_water"], out["post_water"]):
            self.assertEqual(ext.method, "sar_fixed")
            self.assertEqual(ext.threshold, W.SAR_WATER_DB_DEFAULT)


class TestVhAssist(unittest.TestCase):
    """B2：VV 差一點（−18～−15 dB）且 VH 很低的像元，打開 VH 才判為水。"""

    def test_marginal_vv_with_low_vh(self):
        vv = np.array([-16.5, -16.5, -14.0, -20.0])
        vh = np.array([-26.0, -20.0, -30.0, -10.0])
        off, _, m_off = W.sar_water_mask(vv, -18.0)
        on, _, m_on = W.sar_water_mask(vv, -18.0, vh_db=vh)
        self.assertEqual(off.tolist(), [False, False, False, True])
        self.assertEqual(on.tolist(), [True, False, False, True])   # VV −14 太亮，VH 再低也不補
        self.assertEqual((m_off, m_on), ("sar_fixed", "sar_fixed+vh"))

    def test_invalid_mask_still_wins(self):
        on, _, _ = W.sar_water_mask(np.array([-16.5]), -18.0, invalid_mask=np.array([True]),
                                    vh_db=np.array([-30.0]))
        self.assertFalse(on[0])

    def test_sar_chain_without_vh_is_unchanged(self):
        from pipeline.detect.barrier_lake import run_sar_chain, synthetic_scene
        s = synthetic_scene(seed=0)
        kw = dict(dem=s["dem"], later_post_dbs=s["later_dbs"], min_catchment_km2=0.05)
        a = run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], **kw)
        b = run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], **kw)
        np.testing.assert_array_equal(a["new_water"], b["new_water"])

    def test_sar_chain_with_vh_recovers_rough_lake(self):
        from pipeline.detect.barrier_lake import run_sar_chain, synthetic_scene
        s = synthetic_scene(seed=0, speckle=False)
        lake = s["truth"]["lake"]
        post = s["post_db"].copy()
        post[lake] = -16.5                       # 湖面被風吹皺，VV 沒低到 −18
        vh_land = np.full_like(post, -15.0)
        post_vh = vh_land.copy()
        post_vh[lake] = -27.0
        later = [post.copy()]
        kw = dict(dem=s["dem"], later_post_dbs=later, min_catchment_km2=0.05)
        vv_only = run_sar_chain(s["pre_db"], post, s["cell_size_m"], **kw)
        with_vh = run_sar_chain(s["pre_db"], post, s["cell_size_m"], pre_vh_db=vh_land,
                                post_vh_db=post_vh, later_post_vh_dbs=[post_vh.copy()], **kw)
        self.assertLess(vv_only["new_water"][lake].mean(), 0.1)
        self.assertGreater(with_vh["new_water"][lake].mean(), 0.5)

    def test_sar_chain_requires_complete_vh(self):
        from pipeline.detect.barrier_lake import run_sar_chain, synthetic_scene
        s = synthetic_scene(seed=0)
        with self.assertRaises(ValueError):
            run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], later_post_dbs=s["later_dbs"],
                          pre_vh_db=s["pre_db"], post_vh_db=s["post_db"])


class TestOldLandslide(unittest.TestCase):
    """A1：候選落在既有崩塌堆積區（前一年到事件前的崩塌）的比例，只記錄、不影響分級。"""

    def _classify(self, old):
        from pipeline.detect.barrier_lake import classify
        nw = np.zeros((40, 40), dtype=bool)
        nw[15:25, 15:25] = True
        river = np.zeros_like(nw)
        river[:, 20] = True
        river[15:25, 20] = False
        cands = classify(nw, np.zeros_like(nw), river, 10.0, min_area_m2=100, old_landslide=old)
        self.assertEqual(len(cands), 1)
        return cands[0]

    def test_candidate_on_old_deposit_scores_high(self):
        old = np.zeros((40, 40), dtype=bool)
        old[12:28, 12:28] = True
        c = self._classify(old)
        self.assertEqual(c.old_landslide_frac, 1.0)
        self.assertEqual(c.to_dict()["oldLandslidePct"], 100.0)

    def test_candidate_away_from_old_deposit_scores_zero(self):
        old = np.zeros((40, 40), dtype=bool)
        old[0:5, 0:5] = True
        self.assertEqual(self._classify(old).old_landslide_frac, 0.0)

    def test_buffer_counts_pixels_next_to_deposit(self):
        old = np.zeros((40, 40), dtype=bool)
        old[15:25, 26:30] = True          # 緊鄰候選東側 1 像元外
        self.assertGreater(self._classify(old).old_landslide_frac, 0.0)

    def test_without_prior_field_is_absent(self):
        c = self._classify(None)
        self.assertIsNone(c.old_landslide_frac)
        self.assertNotIn("oldLandslidePct", c.to_dict())

    def test_grade_unchanged(self):
        old = np.zeros((40, 40), dtype=bool)
        old[12:28, 12:28] = True
        self.assertEqual(self._classify(old).grade, self._classify(None).grade)

    def test_sar_chain_prior_same_as_pre_finds_no_old_landslide(self):
        from pipeline.detect.barrier_lake import run_sar_chain, synthetic_scene
        s = synthetic_scene(seed=0)
        kw = dict(dem=s["dem"], later_post_dbs=s["later_dbs"], min_catchment_km2=0.05)
        base = run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], **kw)
        out = run_sar_chain(s["pre_db"], s["post_db"], s["cell_size_m"], prior_db=s["pre_db"], **kw)
        self.assertFalse(out["old_landslides"].mask.any())
        self.assertEqual([c.grade for c in out["candidates"]], [c.grade for c in base["candidates"]])
        self.assertTrue(all(c.old_landslide_frac == 0.0 for c in out["candidates"]))
        self.assertIsNone(base["old_landslides"])


class TestSaveExtentSummary(unittest.TestCase):
    def test_round_trip_json(self):
        ext = W.WaterExtent(
            mask=np.array([[True, True], [False, False]]),
            threshold=0.123456, method="otsu", cell_size_m=10.0, date="2025-09-23",
        )
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "extent.json")
            W.save_extent_summary(ext, path)
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
        self.assertEqual(data["date"], "2025-09-23")
        self.assertEqual(data["method"], "otsu")
        self.assertEqual(data["pixel_count"], 2)
        self.assertEqual(data["area_m2"], 200.0)


class TestLoadNdwiGeotiff(unittest.TestCase):
    """用臨時合成的小張 GeoTIFF 測讀檔邏輯，不需要真的衛星影像。"""

    def _write_tiny_geotiff(self, path, arr, nodata=None):
        import rasterio
        from rasterio.transform import from_origin

        transform = from_origin(121.0, 24.0, 0.001, 0.001)  # 左上角、像元邊長 0.001 度
        with rasterio.open(
            path, "w", driver="GTiff", height=arr.shape[0], width=arr.shape[1],
            count=1, dtype=arr.dtype, crs="EPSG:4326", transform=transform, nodata=nodata,
        ) as dst:
            dst.write(arr, 1)

    def test_round_trip_values_and_cell_size(self):
        arr = np.array([[0.5, -0.3], [0.1, 0.9]], dtype="float32")
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "ndwi.tif")
            self._write_tiny_geotiff(path, arr)
            data = W.load_ndwi_geotiff(path)
        np.testing.assert_allclose(data["ndwi"], arr, rtol=1e-5)
        self.assertAlmostEqual(data["cell_size_m"], 0.001, places=6)
        self.assertEqual(data["crs"], "EPSG:4326")

    def test_nodata_becomes_nan(self):
        arr = np.array([[0.5, -9999.0], [0.1, 0.9]], dtype="float32")
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "ndwi.tif")
            self._write_tiny_geotiff(path, arr, nodata=-9999.0)
            data = W.load_ndwi_geotiff(path)
        self.assertTrue(np.isnan(data["ndwi"][0, 1]))
        self.assertEqual(data["ndwi"][0, 0], 0.5)



def load_tests(loader, tests, ignore):
    import doctest
    from pipeline.detect import optical
    tests.addTests(doctest.DocTestSuite(optical))
    return tests


if __name__ == "__main__":
    unittest.main()
