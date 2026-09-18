# deploy.ps1 — shaws-pest-control
# Usage:
#   .\deploy.ps1           -> build + deploy to staging
#   .\deploy.ps1 prod      -> build + deploy to production

param([string]$target = "staging")

# Set your CF token before running:
# $env:CLOUDFLARE_API_TOKEN = "<token from credentials.md>"
if (-not $env:CLOUDFLARE_API_TOKEN) { Write-Host "Set CLOUDFLARE_API_TOKEN first." -ForegroundColor Red; exit 1 }
$env:CLOUDFLARE_ACCOUNT_ID = "27cafbbee6f8e1db0d9499405d4755c1"

Write-Host "Building shaws-pest-control..." -ForegroundColor Cyan
node build.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting deploy." -ForegroundColor Red
    exit 1
}

# Safety gate -- confirm dist/index.html looks like a real page
$indexPath = ".\dist\index.html"
$indexContent = Get-Content $indexPath -Raw -ErrorAction SilentlyContinue
if (-not $indexContent -or -not $indexContent.TrimStart().StartsWith("<!DOCTYPE")) {
    Write-Host "dist/index.html missing or malformed. Aborting deploy." -ForegroundColor Red
    exit 1
}

if ($target -eq "prod") {
    Write-Host "Deploying to PRODUCTION (main)..." -ForegroundColor Yellow
    npx wrangler pages deploy ./dist --project-name shaws-pest-control --branch main --commit-dirty=true
} else {
    Write-Host "Deploying to STAGING..." -ForegroundColor Cyan
    npx wrangler pages deploy ./dist --project-name shaws-pest-control --branch staging --commit-dirty=true
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy complete!" -ForegroundColor Green
} else {
    Write-Host "Deploy failed." -ForegroundColor Red
    exit 1
}