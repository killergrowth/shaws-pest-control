param()
# GitHub token must be set as $env:GH_TOKEN before running
$GH_TOKEN = $env:GH_TOKEN

$repoCheck = $null
try {
    $repoCheck = Invoke-RestMethod -Uri "https://api.github.com/repos/killergrowth/shaws-pest-control" `
        -Headers @{Authorization="token $GH_TOKEN"; "User-Agent"="KillerGrowth-Agent"} -ErrorAction Stop
    Write-Host "Repo exists: $($repoCheck.html_url)"
} catch {
    Write-Host "Repo not found - creating..."
    $bodyObj = @{ name="shaws-pest-control"; private=$false; description="Shaw's Pest Control KillerSite" }
    $bodyJson = $bodyObj | ConvertTo-Json
    $newRepo = Invoke-RestMethod -Uri "https://api.github.com/orgs/killergrowth/repos" -Method Post `
        -Headers @{Authorization="token $GH_TOKEN"; "User-Agent"="KillerGrowth-Agent"; "Content-Type"="application/json"} `
        -Body $bodyJson
    Write-Host "Created: $($newRepo.html_url)"
}
