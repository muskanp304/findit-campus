Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  FindIt Campus - Local DevOps Pipeline Validation (Experiment 10)" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[Stage 1/3] Running Code Quality & Linting (oxlint)..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Linting failed! Please resolve issues before committing." -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[PASS] Linting check completed successfully." -ForegroundColor Green
Write-Host ""

Write-Host "[Stage 2/3] Running Automated Pipeline Verification Tests..." -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Tests failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[PASS] All automated tests passed." -ForegroundColor Green
Write-Host ""

Write-Host "[Stage 3/3] Running Production Build (vite build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[PASS] Production build generated in /dist directory." -ForegroundColor Green
Write-Host ""

Write-Host "======================================================================" -ForegroundColor Green
Write-Host "  ALL DEVOPS CHECKS PASSED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  Your code is ready for Git commit and CI/CD push to GitHub!" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Green
