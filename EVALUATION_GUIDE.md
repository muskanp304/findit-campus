# EXPERIMENT 10: DEVOPS EVALUATION & VIVA DEMO CHEATSHEET

Use this quick-reference guide during your practical examination / ERP evaluation to demonstrate the working pipeline and answer teacher viva questions.

---

## 1. QUICK DEMO IN 4 SIMPLE COMMANDS

When the professor asks you to demonstrate your project and pipeline:

### Demo 1: Run Local DevOps Pipeline Test
Open PowerShell or Command Prompt in the project folder and run:
```powershell
.\scripts\devops-test.bat
# or in PowerShell:
.\scripts\devops-test.ps1
```
**What to tell the examiner:**
> *"Sir/Ma'am, our pipeline includes automated pre-flight verification. This script simulates our CI/CD quality gates locally: it runs Oxlint for static AST analysis, executes our 5 automated unit and pipeline tests in Node.js, and produces an optimized production build using Vite. Notice that all 5 tests passed in under 250 milliseconds with zero errors."*

---

### Demo 2: Demonstrate Docker Containerization
If Docker Desktop is running:
```powershell
.\scripts\docker-build-run.bat
# or:
docker build -t findit-campus:latest .
docker run -d --name findit_campus_prod -p 8080:80 findit-campus:latest
```
Open your browser to:
- App: `http://localhost:8080`
- Healthcheck: `http://localhost:8080/healthz`

**What to tell the examiner:**
> *"We utilized a multi-stage Docker build. Stage 1 uses Node 22 Alpine to compile the React and Three.js application. Stage 2 discards the heavy Node compiler and copies only the compiled static bundle into an ultra-lean Nginx 1.27 Alpine web server. This drops the container size from ~800MB to just ~23MB and minimizes the attack surface."*

---

### Demo 3: Show GitHub Actions Workflow
Open your GitHub repository in your web browser:
1. Click on the **Actions** tab.
2. Show the **"End-to-End DevOps CI/CD Pipeline"** workflow run.
3. Show the green checkmarks across all jobs:
   - 🔍 `Code Quality & Linting`
   - 🧪 `Automated Unit & Pipeline Tests`
   - 📦 `Production Build & Asset Packaging`
   - 🐳 `Docker Containerization`
   - 🚀 `Deployment Verification`

**What to tell the examiner:**
> *"Every time code is pushed or a Pull Request is submitted to the main branch, GitHub Actions triggers this 5-stage automated pipeline. If any test or linting rule fails, the pipeline automatically aborts, preventing broken builds from reaching deployment."*

---

### Demo 4: Show Enterprise Jenkins Parity
Show the examiner the `Jenkinsfile` in the project root:
> *"In addition to GitHub Actions, we created an enterprise-standard declarative `Jenkinsfile` so this exact pipeline can run on private Kubernetes clusters or self-hosted Jenkins servers with automated workspace cleanup and artifact archiving."*

---

## 2. TOP 5 VIVA VOCE QUESTIONS & MODEL ANSWERS

### Q1: What is DevOps and what problem does it solve?
> **Answer:** DevOps is a set of practices combining software development (Dev) and IT operations (Ops). It shortens the systems development lifecycle and provides continuous delivery with high software quality by automating builds, testing, and deployment, eliminating the "it worked on my machine" syndrome.

### Q2: Why did you use Nginx inside Docker instead of running `npm run dev` or `vite preview`?
> **Answer:** `npm run dev` and `vite preview` are development servers meant for local editing with hot-module replacement; they consume higher CPU/RAM and lack production-grade reverse proxying, connection pooling, and security protections. Nginx Alpine is an asynchronous, high-concurrency event-driven web server that delivers pre-compressed static assets with HTTP caching headers and consumes less than 15MB of RAM.

### Q3: What is the purpose of `.dockerignore`?
> **Answer:** Just like `.gitignore`, `.dockerignore` prevents unnecessary directories like `node_modules`, `.git`, temporary logs, and local caches from being sent to the Docker build daemon context. This significantly speeds up build times and keeps images lightweight.

### Q4: How does client-side routing in React interact with Nginx?
> **Answer:** React is a Single Page Application (SPA). Paths like `/dashboard` or `/item-details` do not exist as physical files on disk. Without special configuration, Nginx would return a `404 Not Found`. In our `nginx.conf`, we added `try_files $uri $uri/ /index.html;`, which instructs Nginx to fall back to `index.html` whenever a route is requested, allowing the client-side router to handle the page.

### Q5: How do you verify container health in production?
> **Answer:** We configured a Docker `HEALTHCHECK` directive and an Nginx `/healthz` endpoint. Every 30 seconds, the container internally tests HTTP accessibility using `wget`. If the web server hangs, the orchestrator detects the unhealthy status and can automatically restart or replace the container.

---

## 3. CHECKLIST FOR SUBMISSION (EXP 10)
- [x] Git repository initialized (`git init -b main`)
- [x] Automated test suite created (`tests/pipeline.test.js` & `npm test`)
- [x] Multi-stage `Dockerfile` created
- [x] Production `nginx.conf` with SPA fallback & `/healthz` created
- [x] Container orchestration via `docker-compose.yml` created
- [x] GitHub Actions workflow created (`.github/workflows/ci-cd-pipeline.yml`)
- [x] GitHub Pages deployment workflow created (`.github/workflows/deploy-pages.yml`)
- [x] Enterprise `Jenkinsfile` created
- [x] One-click Windows validation script created (`scripts/devops-test.bat`)
- [x] Experiment 10 Lab Report (Markdown) created (`EXPERIMENT_10_DEVOPS_REPORT.md`)
- [x] Experiment 10 Lab Report (HTML / Printable PDF) created (`EXPERIMENT_10_DEVOPS_REPORT.html`)
