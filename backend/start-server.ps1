# Script pour démarrer le serveur PHP
$phpPath = "C:\xampp\php\php.exe"

# Vérifier si PHP existe
if (Test-Path $phpPath) {
    Write-Host "✅ Démarrage du serveur PHP sur http://localhost:8000" -ForegroundColor Green
    & $phpPath -S localhost:8000
} else {
    Write-Host "❌ PHP introuvable à $phpPath" -ForegroundColor Red
    Write-Host "Veuillez modifier le chemin dans start-server.ps1" -ForegroundColor Yellow
    
    # Chemins alternatifs possibles
    $altPaths = @(
        "C:\Program Files\XAMPP\php\php.exe",
        "C:\wamp64\bin\php\php8.2.0\php.exe",
        "C:\wamp\bin\php\php8.2.0\php.exe"
    )
    
    Write-Host "`nChemins alternatifs à essayer:" -ForegroundColor Yellow
    foreach ($path in $altPaths) {
        if (Test-Path $path) {
            Write-Host "✅ Trouvé: $path" -ForegroundColor Green
        } else {
            Write-Host "❌ Non trouvé: $path" -ForegroundColor Red
        }
    }
}
