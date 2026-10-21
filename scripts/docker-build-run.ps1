Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  FindIt Campus - Docker Build and Container Runner (Experiment 10)" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Building Docker image 'findit-campus:latest'..." -ForegroundColor Yellow
docker build -t findit-campus:latest .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Docker build failed! Ensure Docker Desktop is running." -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[PASS] Docker image built successfully." -ForegroundColor Green
Write-Host ""

Write-Host "[2/3] Checking if an existing container is running..." -ForegroundColor Yellow
docker stop findit_campus_prod 2>$null
docker rm findit_campus_prod 2>$null

Write-Host "[3/3] Running FindIt Campus container on port 8080..." -ForegroundColor Yellow
docker run -d --name findit_campus_prod -p 8080:80 findit-campus:latest
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to launch container." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "======================================================================" -ForegroundColor Green
Write-Host "  APPLICATION RUNNING IN DOCKER CONTAINER!" -ForegroundColor Green
Write-Host "  Open your browser at: http://localhost:8080" -ForegroundColor Cyan
Write-Host "  Healthcheck status  : http://localhost:8080/healthz" -ForegroundColor Cyan
Write-Host "  To view logs        : docker logs findit_campus_prod" -ForegroundColor Gray
Write-Host "  To stop container   : docker stop findit_campus_prod" -ForegroundColor Gray
Write-Host "======================================================================" -ForegroundColor Green
