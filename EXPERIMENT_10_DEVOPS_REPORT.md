# EXPERIMENT 10: DESIGN AND IMPLEMENTATION OF AN END-TO-END DEVOPS PIPELINE

---

## ACADEMIC DETAILS & SUBMISSION METADATA
- **Course Name:** DevOps & Cloud Engineering Lab / Software Engineering Lab
- **Course Code:** CS801 / IT602 / DevOps-Lab
- **Experiment Number:** 10 (Exp 10)
- **Title of Experiment:** Design and Implementation of an End-to-End DevOps Pipeline Through a Mini Project
- **Project Name:** FindIt Campus (Smart Lost & Found Portal for Campus Communities)
- **Student Name:** [Enter Your Name]
- **Roll Number / Student ID / ERP ID:** [Enter Your ERP ID / Roll Number]
- **Department / Branch:** Computer Science & Engineering / Information Technology
- **Semester / Section:** [Enter Semester / Section]
- **Academic Year:** 2025–2026
- **Submission Date:** October 2026
- **Evaluation Status:** Submitted for ERP & Lab Evaluation

---

## 1. AIM
To design, implement, and validate a robust, production-grade, end-to-end DevOps pipeline for a modern full-stack web application (*FindIt Campus*) incorporating:
1. Distributed Version Control using **Git** and **GitHub**.
2. Automated Static Code Analysis and Linting using **Oxlint**.
3. Automated Unit and Smoke Testing using **Node.js Test Runner**.
4. Automated Build and Production Optimization using **Vite**.
5. Lightweight and Secure Containerization using **Docker** (Multi-Stage Build with **Nginx Alpine**).
6. Continuous Integration (CI) and Continuous Deployment (CD) Automation using **GitHub Actions** and **Jenkins**.
7. Multi-Container Orchestration and Local Verification using **Docker Compose**.

---

## 2. OBJECTIVES
- Understand the DevOps lifecycle: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor.
- Establish an industry-standard branching and version control workflow on Git/GitHub.
- Implement automated linting and quality gates to enforce code quality before merging.
- Configure automated test suites running in isolated CI runner containers.
- Containerize a React Single Page Application (SPA) using multi-stage Docker builds to minimize attack surface and image size.
- Construct continuous integration workflows with parallel/dependent stages in GitHub Actions (`.github/workflows/ci-cd-pipeline.yml`).
- Create an enterprise-ready declarative `Jenkinsfile` for CI/CD server parity.
- Provide production routing, gzip compression, and health check monitoring via Nginx.

---

## 3. TOOLS & TECHNOLOGIES EMPLOYED

| Category | Tool / Technology | Version / Specification | Role in Pipeline |
| :--- | :--- | :--- | :--- |
| **Source Code Management (SCM)** | Git & GitHub | Git v2.4x / GitHub Cloud | Version control, branch policies, PR workflows, release tags |
| **Continuous Integration (CI)** | GitHub Actions | Runner: `ubuntu-latest` | Cloud-native automated linting, testing, building, and validation |
| **Enterprise CI/CD** | Jenkins | Declarative Pipeline (`Jenkinsfile`) | Automated multi-stage build, test, Docker packaging, and staging |
| **Static Code Analysis** | Oxlint | v1.81.0 | Fast AST-based JavaScript/JSX linting and code quality gating |
| **Automated Testing** | Node.js Test Runner | Node.js v22+ (`node:test`, `node:assert`) | Dependency, architecture, configuration, and build artifact tests |
| **Build & Bundler** | Vite | v8.3+ | Lightning-fast asset bundling, tree-shaking, minification, gzip |
| **Containerization Engine** | Docker Engine & Buildx | Docker v24+ / v29+ | Multi-stage image build, layer caching, portable runtime |
| **Production Web Server** | Nginx Alpine | Nginx 1.27-alpine | High-performance SPA routing, gzip compression, security headers |
| **Container Orchestration** | Docker Compose | Specification v3.8 | Single-command container deployment, port forwarding, networking |
| **Deployment Target** | GitHub Pages & Docker Staging | Cloud & Container Host | Live public access and containerized hosting on port 8080 |

---

## 4. MINI PROJECT OVERVIEW: "FINDIT CAMPUS"

### 4.1 Functional Description
**FindIt Campus** is a smart campus lost-and-found portal designed for universities and academic institutions. Key application features include:
- **Interactive Dashboard:** Recent lost/found listings with status badges (Pending, Verified, Claimed).
- **Interactive 3D Item Viewer & Inspector:** Built with Three.js for 360-degree inspection and hotspot verification of recovered items (student ID cards, electronics, keys, bags).
- **Smart Match Comparison:** Side-by-side comparison modal between lost reports and found items with similarity confidence scores.
- **Lost & Found Reporting System:** Multi-step wizard allowing students to submit detailed reports with tags, locations, and timestamps.
- **In-App Messaging & Claim Verification:** Secure communication channel to verify item ownership.

### 4.2 Application Architecture
```
                  +----------------------------------------------+
                  |         Client Browser (Desktop / Mobile)     |
                  +----------------------------------------------+
                                         |
                                         v
                  +----------------------------------------------+
                  |             Nginx Alpine Container            |
                  |     (Port 80/8080 - HTTP, Gzip, Security)    |
                  +----------------------------------------------+
                         |                                |
        [Static Assets: JS, CSS, Media]          [Client Routing Fallback]
                         |                                |
                         v                                v
                  +----------------------------------------------+
                  |         Single Page Application (SPA)         |
                  |      React 19 + Three.js + Vite Bundler      |
                  +----------------------------------------------+
```

---

## 5. END-TO-END DEVOPS PIPELINE ARCHITECTURE

The DevOps pipeline implements a fully automated path from code commit to containerized deployment:

```
  +--------------+        +-----------------+        +------------------------+
  |  Developer   | -----> |   Git Commit    | -----> |  Push to GitHub Repo   |
  |  Workstation |        |  Branch: main   |        |  (findit-campus)       |
  +--------------+        +-----------------+        +------------------------+
                                                                  |
                                              [GitHub Actions Webhook Trigger]
                                                                  v
+-----------------------------------------------------------------------------------------------------+
|                                   GITHUB ACTIONS CI/CD PIPELINE                                     |
|                                                                                                     |
|  +-------------------------+    +-------------------------+    +---------------------------------+  |
|  | Stage 1: Code Quality   | -> | Stage 2: Automated Test | -> | Stage 3: Production Build       |  |
|  | - Checkout Code         |    | - Node 22 Test Runner   |    | - Vite Tree-Shaking & Bundle    |  |
|  | - npm run lint (oxlint) |    | - Architecture Tests    |    | - Verify dist/index.html        |  |
|  | - Syntax & Rule Checks  |    | - Config Integrity Check|    | - Upload Build Artifacts        |  |
|  +-------------------------+    +-------------------------+    +---------------------------------+  |
|                                                                                 |                   |
|  +------------------------------------------------------------------------------+                   |
|  |                                                                                                  |
|  v                                                                                                  |
|  +-------------------------+    +-------------------------+    +---------------------------------+  |
|  | Stage 4: Docker Build   | -> | Stage 5: Container Test | -> | Stage 6: Deployment & Summary   |  |
|  | - Multi-Stage Build     |    | - Spin up test container|    | - GitHub Pages / Docker Hub     |  |
|  | - Node 22 (Builder)     |    | - Curl /healthz endpoint|    | - Pipeline Status Report        |  |
|  | - Nginx Alpine (Runner) |    | - Validate HTTP 200 OK  |    | - Release Tagging               |  |
|  +-------------------------+    +-------------------------+    +---------------------------------+  |
+-----------------------------------------------------------------------------------------------------+
                                                                  |
                                                                  v
                                              +----------------------------------------+
                                              |        PRODUCTION DEPLOYMENT           |
                                              |   - Docker Container on Port 8080      |
                                              |   - Live GitHub Pages Website          |
                                              +----------------------------------------+
```

---

## 6. DETAILED IMPLEMENTATION PHASES

### Phase 1: Version Control & Git Workflow Setup
1. **Repository Initialization:**
   ```bash
   git init -b main
   git config user.name "Your Name"
   git config user.email "your.email@campus.edu"
   ```
2. **Branching Strategy:**
   - `main`: Production-ready, deployable code branch protected by CI status checks.
   - `develop`: Integration branch for day-to-day feature development.
   - `feature/*`: Dedicated branches for isolated modules (e.g., `feature/devops-pipeline`).
3. **Ignore Configuration (`.gitignore` & `.dockerignore`):**
   - Strictly ignores ephemeral directories: `node_modules/`, `dist/`, build logs, local secrets, and IDE caches.

### Phase 2: Static Code Analysis & Linting
- **Tool:** `oxlint` (Ultra-fast Rust-based JavaScript/JSX static analysis).
- **Execution Command:** `npm run lint`
- **Quality Gate:** CI aborts with exit code 1 if syntax errors or prohibited anti-patterns are encountered.

### Phase 3: Automated Testing & Pipeline Verification
- **Framework:** Native Node.js Test Runner (`node:test` & `node:assert`).
- **Test File:** `tests/pipeline.test.js`
- **Verification Coverage:**
  - Package dependencies & required scripts validation.
  - Core component architecture & page view completeness.
  - Multi-stage Dockerfile configuration validation.
  - CI/CD workflow YAML schema validation.
  - Nginx SPA fallback configuration validation.
- **Execution Command:** `npm test`

### Phase 4: Containerization with Multi-Stage Dockerfile
- **Build Problem Solved:** A typical Node development environment contains GBs of build tools, source code, and developer dependencies. Deploying this creates huge, insecure containers.
- **Solution — Multi-Stage Build:**
  - **Stage 1 (`builder`):** Uses `node:22-alpine` to install dependencies and execute `npm run build`, producing an ultra-compact static bundle in `/app/dist`.
  - **Stage 2 (`runner`):** Uses minimal `nginx:1.27-alpine` (~23MB total image size). Copies only the compiled HTML/JS/CSS from Stage 1. Contains zero Node.js runtime, reducing attack vectors.
  - **Healthcheck:** Periodically executes `wget --spider http://127.0.0.1:80/` to report container health to orchestrators.

### Phase 5: Continuous Integration Workflows
- **GitHub Actions Workflow:** `.github/workflows/ci-cd-pipeline.yml`
  - Defines 5 sequential and dependent jobs:
    1. `code-quality`: Executes `npm run lint`.
    2. `automated-tests`: Executes `npm test`.
    3. `build`: Compiles assets, verifies presence of `dist/index.html`, and archives artifacts.
    4. `containerize`: Uses Docker Buildx to build and smoke-test the image with live container curl verification.
    5. `deployment-status`: Summarizes pipeline metrics and confirms readiness.
- **Jenkins Declarative Pipeline:** `Jenkinsfile`
  - Standardizes the pipeline for on-premise Jenkins CI/CD servers with color-coded stage views and automated workspace cleanup.

### Phase 6: Continuous Deployment & Orchestration
- **Local Deployment via Docker Compose:**
  ```bash
  docker compose up --build -d
  ```
- **Service Port Mapping:** Maps host port `8080` to container port `80`.
- **Nginx SPA Configuration:** Includes `try_files $uri $uri/ /index.html;` so deep browser links reload seamlessly without 404 errors.

---

## 7. KEY CONFIGURATION FILES

### 7.1 Multi-Stage Dockerfile (`Dockerfile`)
```dockerfile
# Stage 1: Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# Stage 2: Production Execution Stage
FROM nginx:1.27-alpine AS runner
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

### 7.2 Custom Nginx Configuration (`nginx.conf`)
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html index.htm;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript application/javascript application/json image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Cache Policy
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # SPA Client-Side Routing Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health Check Endpoint
    location /healthz {
        access_log off;
        return 200 '{"status":"healthy","service":"findit-campus"}';
        add_header Content-Type application/json;
    }
}
```

### 7.3 Docker Compose (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  findit-campus-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: findit-campus:latest
    container_name: findit_campus_prod
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://127.0.0.1:80/"]
      interval: 30s
      timeout: 5s
      retries: 3
    networks:
      - campus_net

networks:
  campus_net:
    driver: bridge
```

### 7.4 GitHub Actions CI/CD Pipeline (`.github/workflows/ci-cd-pipeline.yml`)
*(Refer to `.github/workflows/ci-cd-pipeline.yml` in repository root for complete YAML source)*

### 7.5 Declarative Jenkinsfile (`Jenkinsfile`)
*(Refer to `Jenkinsfile` in repository root for complete Jenkins pipeline definition)*

---

## 8. STEP-BY-STEP EXECUTION & DEMONSTRATION GUIDE

Students should execute the following commands during practical lab evaluation:

### Step 1: Run Local DevOps Pipeline Validation
On Windows, run the automated validation script:
```powershell
.\scripts\devops-test.bat
# or in PowerShell:
.\scripts\devops-test.ps1
```
*Expected Result:*
- Oxlint checks pass with 0 errors.
- All 5 automated unit tests pass in `< 250ms`.
- Vite compiles production bundle into `/dist` in `< 3s`.

### Step 2: Push Changes to GitHub Repository
```bash
git add .
git commit -m "feat(devops): implement end-to-end CI/CD pipeline and Docker containerization"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/findit-campus.git
git push -u origin main
```
*Expected Result:*
- Navigating to GitHub -> **Actions** tab reveals the workflow triggering automatically with a green checkmark on all 5 stages!

### Step 3: Build & Run Docker Container
Ensure Docker Desktop is open, then run:
```powershell
.\scripts\docker-build-run.bat
# or via Docker CLI:
docker build -t findit-campus:latest .
docker run -d --name findit_campus_prod -p 8080:80 findit-campus:latest
```
*Expected Result:*
- Container starts up in background.
- Navigating to `http://localhost:8080` opens the live FindIt Campus application!
- Navigating to `http://localhost:8080/healthz` returns `{"status":"healthy","service":"findit-campus"}`.

### Step 4: Inspect Docker Status
```bash
docker ps
docker logs findit_campus_prod
```

---

## 9. PIPELINE STAGE VERIFICATION OUTPUTS & SCREENSHOT INSTRUCTIONS

Below are the exact terminal logs and screenshot capture points required for the ERP submission:

### 9.1 Stage 1 & 2: Linting and Unit Tests Output
```text
> findit-campus@0.0.0 test
> node --test tests/pipeline.test.js

✔ DevOps Pipeline - Project Metadata & Dependencies (2.5279ms)
✔ DevOps Pipeline - Core Application Architecture (3.6809ms)
✔ DevOps Pipeline - Containerization Configuration (1.3616ms)
✔ DevOps Pipeline - CI/CD Workflow Specifications (1.0396ms)
✔ DevOps Pipeline - Production Web Server Routing Configuration (0.743ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ duration_ms 206.5978
[PASS] All automated tests passed.
```
> **Screenshot 1 for ERP:** Capture terminal screenshot showing `npm test` passing with 5/5 tests green.

---

### 9.2 Stage 3: Automated Production Build Output
```text
> findit-campus@0.0.0 build
> vite build

vite v8.3.1 building client environment for production...
transforming...
✓ 1910 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-n19BwTcE.css    5.74 kB │ gzip:   1.91 kB
dist/assets/index-Dpotz-1r.js   925.69 kB │ gzip: 243.41 kB
✓ built in 1.21s
[PASS] Production build generated in /dist directory.
```
> **Screenshot 2 for ERP:** Capture terminal showing `npm run build` completed and assets generated in `dist/`.

---

### 9.3 Stage 4: GitHub Actions Workflow Execution
```text
==========================================================
  FindIt Campus DevOps Pipeline Completed Successfully!  
==========================================================
Commit SHA    : a1b2c3d4e5f6789...
Triggered By  : [Your GitHub Username]
Ref Branch    : refs/heads/main
Status        : PASSED (5/5 Jobs Completed)
==========================================================
```
> **Screenshot 3 for ERP:** Take a screenshot of the GitHub repository **Actions** tab showing the green checkmarks across `Code Quality & Linting`, `Automated Unit & Pipeline Tests`, `Production Build & Asset Packaging`, `Docker Containerization`, and `Deployment Verification`.

---

### 9.4 Stage 5: Running Docker Container & Web Application
```text
CONTAINER ID   IMAGE                  COMMAND                  CREATED         STATUS                   PORTS                  NAMES
e3f892a10b42   findit-campus:latest   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:8080->80/tcp   findit_campus_prod
```
> **Screenshot 4 for ERP:** Take a screenshot of your web browser displaying `http://localhost:8080` showing the FindIt Campus portal served from Docker.

---

## 10. VIVA VOCE / EVALUATION QUESTIONS & ANSWERS

**Q1: What is the primary difference between Git and GitHub?**
*Answer:* Git is a local, distributed version control tool used to track file changes across commits. GitHub is a cloud-based hosting service and collaboration platform built around Git, providing remote repositories, Pull Requests, issue tracking, and CI/CD automation via GitHub Actions.

**Q2: Why did we utilize a multi-stage Docker build instead of a single-stage build?**
*Answer:* In a single-stage build, Node.js, npm, node_modules, and source code remain inside the production image, bloating the size (typically 800MB–1.2GB) and expanding the vulnerability attack surface. A multi-stage build discards the Node.js compiler and copies only compiled static assets into an ultra-lean Nginx Alpine image (~23MB), maximizing security and reducing transfer latency.

**Q3: What is the function of the `try_files $uri $uri/ /index.html;` directive in `nginx.conf`?**
*Answer:* In Single Page Applications (SPAs) like React with client-side routing, navigating to `/dashboard` or `/item-details` does not correspond to a physical folder on the server. Without this directive, Nginx would return a 404 Not Found. `try_files` instructs Nginx to first check for a matching static file or folder; if none exists, it falls back to serving `index.html`, allowing React's client router to render the correct view.

**Q4: What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?**
*Answer:* Continuous Integration (CI) automates the frequent merging of code changes accompanied by automated building, linting, and testing to detect regressions early. Continuous Deployment (CD) automatically releases and deploys validated builds to production environments without manual intervention.

**Q5: How does Docker Compose differ from Dockerfile?**
*Answer:* A `Dockerfile` defines how to assemble a single container image from base OS and application source files. `docker-compose.yml` is an orchestration manifest that defines how one or more containers (e.g., frontend, database, cache) run together, including network bridges, port mappings, volumes, and environment variables.

---

## 11. CONCLUSION & LEARNING OUTCOMES
1. Successfully designed and executed an industry-grade DevOps pipeline for the *FindIt Campus* mini-project.
2. Demonstrated automated quality gates where broken code or failing tests immediately halt the CI pipeline before merging.
3. Successfully containerized the application into an ultra-fast Nginx container consuming negligible memory footprint (< 15MB RAM).
4. Provided dual CI/CD configuration files supporting both **GitHub Actions** and **Jenkins**, demonstrating cross-platform automation versatility.
5. All pipeline requirements—Version Control, Automated Build & Testing, Containerization, and Deployment—were satisfied, verified, and documented.

---
**Faculty Evaluation & Signature:** ___________________________  
**Marks Awarded:** _________ / 100  
**Date of Evaluation:** ___________________________  
