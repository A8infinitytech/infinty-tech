$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envLocal = Join-Path $root ".env.local"
$envFile = Join-Path $root ".env"

if (-not (Test-Path -LiteralPath $envLocal)) {
  throw ".env.local not found at $envLocal"
}

$secure = Read-Host -AsSecureString "Supabase secret key (sb_secret_... ya legacy service_role JWT) paste karein"
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)

try {
  $plain = $plain.Trim()
  if ([string]::IsNullOrWhiteSpace($plain)) {
    throw "Key empty hai."
  }
  if ($plain -match '^sb_publishable_') {
    throw "Publishable key nahi chalega. Secret key (sb_secret_...) ya service_role JWT daalo."
  }
  if ($plain -notmatch '^sb_secret_' -and $plain -notmatch '^eyJ') {
    throw "Key format galat lag raha hai. sb_secret_... ya eyJ... service_role JWT daalo."
  }

  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

  Copy-Item -LiteralPath $envLocal -Destination "$envLocal.bak-$stamp" -Force
  $localLines = @(Get-Content -LiteralPath $envLocal | Where-Object { $_ -notmatch '^\s*SUPABASE_SERVICE_ROLE_KEY\s*=' })
  $localLines += "SUPABASE_SERVICE_ROLE_KEY=$plain"
  [System.IO.File]::WriteAllLines($envLocal, $localLines, $utf8NoBom)

  if (Test-Path -LiteralPath $envFile) {
    Copy-Item -LiteralPath $envFile -Destination "$envFile.bak-$stamp" -Force
    $envLines = @(Get-Content -LiteralPath $envFile | Where-Object { $_ -notmatch '^\s*SUPABASE_SERVICE_ROLE_KEY\s*=' })
    [System.IO.File]::WriteAllLines($envFile, $envLines, $utf8NoBom)
    Write-Host "Saved to .env.local and removed stale key from .env"
  } else {
    Write-Host "Saved to .env.local"
  }

  Write-Host "Ab dev server restart karein: Ctrl+C, phir npm run dev"
} finally {
  $plain = $null
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}
