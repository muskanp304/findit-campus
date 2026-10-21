# 🎓 FindIt Campus — Smart Campus Lost & Found System
> **DevOps & Cloud Engineering Laboratory — Experiment 10**  
> *End-to-End DevOps Pipeline Implementation using Git, GitHub Actions, Jenkins, Docker, and Nginx.*

---

## 🚀 Overview
**FindIt Campus** is a modern, responsive web application designed for campus communities to report, track, match, and claim lost items. The project features an interactive Three.js 3D item inspector, smart attribute-matching engine, real-time in-app verification chat, and a full-featured student dashboard.

This repository demonstrates a complete, automated **End-to-End DevOps Pipeline** spanning version control, automated linting, unit testing, Vite production building, multi-stage Docker containerization, and continuous integration/continuous deployment (CI/CD).

---

## 🛠️ DevOps Tech Stack & Pipeline

| Stage | Tool | Description |
| :--- | :--- | :--- |
| **Version Control** | **Git & GitHub** | Distributed version control with branching strategies and PR checks |
| **Code Quality** | **Oxlint** | Fast AST-based JavaScript/JSX static analysis |
| **Testing** | **Node.js Test Runner** | Automated unit and pipeline integrity verification (`tests/pipeline.test.js`) |
| **Build Optimization** | **Vite** | Modern asset bundler generating optimized production bundles in `dist/` |
| **Containerization** | **Docker (Multi-Stage)** | Stage 1 builds assets with Node 22; Stage 2 serves with Nginx 1.27 Alpine |
| **Web Server** | **Nginx Alpine** | Production SPA fallback routing, gzip compression, and `/healthz` check |
| **CI/CD Automation** | **GitHub Actions** | 5-stage automated workflow (`.github/workflows/ci-cd-pipeline.yml`) |
| **Enterprise CI/CD** | **Jenkins** | Declarative pipeline (`Jenkinsfile`) with artifact archiving |
| **Orchestration** | **Docker Compose** | Single-command local container execution on port `8080` |

---

## ⚡ Quick Start

### 1. Local Development
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### 2. Run Local DevOps Validation Pipeline
```bash
# Windows Batch:
.\scripts\devops-test.bat

# PowerShell:
.\scripts\devops-test.ps1

# Direct npm commands:
npm run lint    # Oxlint static analysis
npm test        # Automated pipeline tests
npm run build   # Production bundle in /dist
```

### 3. Run with Docker
Ensure Docker Desktop is running, then run:
```bash
# Build and run container
docker build -t findit-campus:latest .
docker run -d --name findit_campus_prod -p 8080:80 findit-campus:latest

# Or using Docker Compose:
docker compose up --build -d
```
Access the application at:
- **Application URL:** [http://localhost:8080](http://localhost:8080)
- **Healthcheck URL:** [http://localhost:8080/healthz](http://localhost:8080/healthz)

---

## 📁 Repository Structure

```
findit-campus/
├── .github/
│   └── workflows/
│       ├── ci-cd-pipeline.yml     # Complete GitHub Actions CI/CD Pipeline
│       └── deploy-pages.yml       # GitHub Pages deployment workflow
├── Dockerfile                     # Multi-stage Docker build (Node.js -> Nginx)
├── docker-compose.yml             # Docker container orchestration
├── .dockerignore                  # Docker build context exclusions
├── nginx.conf                     # Production Nginx SPA & gzip config
├── Jenkinsfile                    # Declarative Jenkins pipeline
├── package.json                   # Project scripts and dependencies
├── scripts/
│   ├── devops-test.bat            # One-click Windows local validation
│   ├── devops-test.ps1            # PowerShell validation script
│   ├── docker-build-run.bat       # Windows Docker builder & runner
│   └── docker-build-run.ps1       # PowerShell Docker runner
├── tests/
│   └── pipeline.test.js           # Automated pipeline validation test suite
├── EXPERIMENT_10_DEVOPS_REPORT.md # Academic Lab Report (Exp 10)
├── EXPERIMENT_10_DEVOPS_REPORT.html # Printable / PDF Report for ERP
├── EVALUATION_GUIDE.md            # Lab Viva & Demonstration Cheatsheet
└── src/                           # Application source code (React 19 + Three.js)
```

---

## 📄 Experiment 10 Submission Deliverables
- **Academic Lab Report:** [`EXPERIMENT_10_DEVOPS_REPORT.md`](./EXPERIMENT_10_DEVOPS_REPORT.md)
- **Printable PDF Version:** Open [`EXPERIMENT_10_DEVOPS_REPORT.html`](./EXPERIMENT_10_DEVOPS_REPORT.html) in your browser and press `Ctrl+P` -> Save as PDF.
- **Viva Voce & Evaluation Guide:** [`EVALUATION_GUIDE.md`](./EVALUATION_GUIDE.md)
