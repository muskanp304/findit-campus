@echo off
echo ======================================================================
echo   FindIt Campus - Docker Build and Container Runner (Experiment 10)
echo ======================================================================
echo.

echo [1/3] Building Docker image 'findit-campus:latest'...
docker build -t findit-campus:latest .
if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed! Ensure Docker Desktop is running.
    exit /b %errorlevel%
)
echo [PASS] Docker image built successfully.
echo.

echo [2/3] Checking if an existing container is running...
docker stop findit_campus_prod 2>nul
docker rm findit_campus_prod 2>nul

echo [3/3] Running FindIt Campus container on port 8080...
docker run -d --name findit_campus_prod -p 8080:80 findit-campus:latest
if %errorlevel% neq 0 (
    echo [ERROR] Failed to launch container.
    exit /b %errorlevel%
)

echo.
echo ======================================================================
echo   APPLICATION RUNNING IN DOCKER CONTAINER!
echo   Open your browser at: http://localhost:8080
echo   Healthcheck status  : http://localhost:8080/healthz
echo   To view logs        : docker logs findit_campus_prod
echo   To stop container   : docker stop findit_campus_prod
echo ======================================================================
