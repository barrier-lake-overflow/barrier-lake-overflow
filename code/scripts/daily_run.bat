@echo off
rem Daily auto-update, called by Windows Task Scheduler (install: scripts\install_daily_task.ps1).
rem Env vars: GEE_PROJECT (required), DAILY_ARGS (set by the installer).
rem Logs go to data\live\logs\daily-YYYYMMDD.log
setlocal
cd /d "%~dp0.."
if not exist "..\data\live\logs" mkdir "..\data\live\logs"
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd"') do set TODAY=%%i
set PYTHONIOENCODING=utf-8
python -m pipeline.daily.run %DAILY_ARGS% >> "..\data\live\logs\daily-%TODAY%.log" 2>&1
exit /b %ERRORLEVEL%
