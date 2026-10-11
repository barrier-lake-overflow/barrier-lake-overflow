# 在這台電腦安裝每日自動更新排程（Windows 工作排程器）。用一般 PowerShell 執行即可，不需系統管理員：
#
#     powershell -ExecutionPolicy Bypass -File code\scripts\install_daily_task.ps1 -Project ossint2026
#     powershell -ExecutionPolicy Bypass -File code\scripts\install_daily_task.ps1 -Project ossint2026 -Time 08:30 -Commit
#     powershell -ExecutionPolicy Bypass -File code\scripts\install_daily_task.ps1 -Remove
#
# 錯過排程時間（電腦關機或睡眠）會在下次開機後補跑。-Commit 會把結果 git commit（不推上遠端）；
# 若同時啟用 GitHub Actions，本機不要加 -Commit，避免兩邊各自 commit 而衝突。

param(
    [string]$Project = $env:GEE_PROJECT,
    [string]$Time = "08:00",
    [switch]$Commit,
    [switch]$Remove
)

$TaskName = "BarrierLakeDailyUpdate"

if ($Remove) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "已移除排程 $TaskName"
    return
}
if (-not $Project) { throw "請用 -Project 指定 GCP 專案 ID（或先設定環境變數 GEE_PROJECT）" }

$bat = Join-Path $PSScriptRoot "daily_run.bat"
$runArgs = "--project $Project"
if ($Commit) { $runArgs += " --commit" }

# 參數透過使用者環境變數傳給 bat
[Environment]::SetEnvironmentVariable("GEE_PROJECT", $Project, "User")
[Environment]::SetEnvironmentVariable("DAILY_ARGS", $runArgs, "User")

$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$bat`""
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 3) -MultipleInstances IgnoreNew
Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings `
    -Description "堰塞湖事件研判平台：每日自動更新清冊、警戒、雨量、Sentinel-1 與新聞候選" -Force | Out-Null

Write-Host "已安裝排程 $TaskName：每天 $Time 執行（錯過會在開機後補跑）"
Write-Host "參數：$runArgs"
Write-Host "立即測試：Start-ScheduledTask -TaskName $TaskName；日誌在 data\live\logs\"
