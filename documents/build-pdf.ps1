# Regenerates the Résumé & CV PDFs from their HTML sources, then syncs
# them into src/assets so the site serves the latest version.
#
# Usage:  pwsh documents/build-pdf.ps1
#         (or right-click this file > "Run with PowerShell")
# After running, rebuild/redeploy the site (pnpm build) to publish changes.

$ErrorActionPreference = "Stop"
$docs   = $PSScriptRoot
$root   = Split-Path $docs -Parent
$assets = Join-Path $root "src\assets"

$browser = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) { throw "No Chrome or Edge found to render the PDF." }

$jobs = @(
  @{ in = "Austin-Chris-Iwu-Resume.html"; out = "Austin-Chris-Iwu-Resume.pdf" },
  @{ in = "Austin-Chris-Iwu-CV.html";     out = "Austin-Chris-Iwu-CV.pdf" }
)

foreach ($j in $jobs) {
  $inHtml = Join-Path $docs $j.in
  $outPdf = Join-Path $docs $j.out
  $tmpPdf = Join-Path $env:TEMP ("aciwu-" + [Guid]::NewGuid().ToString("n") + ".pdf")
  $inUri  = ([Uri]$inHtml).AbsoluteUri
  $p = Start-Process -FilePath $browser -ArgumentList @(
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw", "--virtual-time-budget=8000",
    "--print-to-pdf=$tmpPdf", $inUri
  ) -Wait -PassThru
  if ($p.ExitCode -ne 0 -or -not (Test-Path $tmpPdf) -or (Get-Item $tmpPdf).Length -lt 50000) {
    throw "Failed to render $($j.out) (exit $($p.ExitCode))"
  }
  Move-Item $tmpPdf $outPdf -Force
  Write-Host "Rendered $($j.out)"
}

# Sync into the app so the nav's Résumé viewer/download uses the new file
Copy-Item (Join-Path $docs "Austin-Chris-Iwu-Resume.pdf") $assets -Force
Copy-Item (Join-Path $docs "Austin-Chris-Iwu-CV.pdf")     $assets -Force
Copy-Item (Join-Path $docs "Austin-Chris-Iwu-Resume.pdf") $root   -Force
Copy-Item (Join-Path $docs "Austin-Chris-Iwu-CV.pdf")     $root   -Force
Write-Host "Synced PDFs into src/assets and repo root. Run 'pnpm build' to publish."
