@echo off
echo ======================================================================
echo   FindIt Campus - Local DevOps Pipeline Validation (Experiment 10)
echo ======================================================================
echo.

echo [Stage 1/3] Running Code Quality & Linting (oxlint)...
call npm run lint
if %errorlevel% neq 0 (
    echo [ERROR] Linting failed! Please resolve issues before committing.
    exit /b %errorlevel%
)
echo [PASS] Linting check completed successfully.
echo.

echo [Stage 2/3] Running Automated Pipeline Verification Tests...
call npm test
if %errorlevel% neq 0 (
    echo [ERROR] Tests failed!
    exit /b %errorlevel%
)
echo [PASS] All automated tests passed.
echo.

echo [Stage 3/3] Running Production Build (vite build)...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    exit /b %errorlevel%
)
echo [PASS] Production build generated in /dist directory.
echo.

echo ======================================================================
echo   ALL DEVOPS CHECKS PASSED SUCCESSFULLY!
echo   Your code is ready for Git commit and CI/CD push to GitHub!
echo ======================================================================
