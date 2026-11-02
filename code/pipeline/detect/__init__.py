"""
偵測。

- water.py：水體萃取，光學 NDWI 與 SAR 低回波；change_detection 算新增水體
- landslide.py：SAR 振幅比值崩塌偵測
- barrier_lake.py：疑似堰塞湖 A/B/C 分級；run_sar_chain() 串起整條 SAR 流程

真實影像分析：SAR 在 scripts/analyze_sar_change.py（run_sar_chain），光學在 optical.py（run_series）。
"""
