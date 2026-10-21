import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('DevOps Pipeline - Project Metadata & Dependencies', () => {
  const pkgPath = path.join(rootDir, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'package.json must exist');
  
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.strictEqual(pkg.name, 'findit-campus', 'Package name must be findit-campus');
  assert.ok(pkg.scripts, 'Scripts section must be present');
  assert.ok(pkg.scripts.build, 'Build script must be present');
  assert.ok(pkg.scripts.dev, 'Dev script must be present');
  assert.ok(pkg.scripts.lint, 'Lint script must be present');
  assert.ok(pkg.dependencies.react, 'React must be listed as dependency');
});

test('DevOps Pipeline - Core Application Architecture', () => {
  const requiredFiles = [
    'src/App.jsx',
    'src/main.jsx',
    'src/index.css',
    'src/context/AppContext.jsx',
    'src/pages/DashboardPage.jsx',
    'src/pages/LandingPage.jsx',
    'src/pages/ReportLostPage.jsx',
    'src/pages/ReportFoundPage.jsx',
    'src/pages/ItemDetailsPage.jsx'
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(rootDir, file);
    assert.ok(fs.existsSync(fullPath), `Required source file must exist: ${file}`);
  }
});

test('DevOps Pipeline - Containerization Configuration', () => {
  const dockerfilePath = path.join(rootDir, 'Dockerfile');
  assert.ok(fs.existsSync(dockerfilePath), 'Dockerfile must exist');
  const dockerContent = fs.readFileSync(dockerfilePath, 'utf8');
  assert.ok(dockerContent.includes('FROM node'), 'Dockerfile must define build stage with Node');
  assert.ok(dockerContent.includes('FROM nginx'), 'Dockerfile must define runner stage with Nginx');
  assert.ok(dockerContent.includes('EXPOSE'), 'Dockerfile must expose web server port');

  const dockerIgnorePath = path.join(rootDir, '.dockerignore');
  assert.ok(fs.existsSync(dockerIgnorePath), '.dockerignore must exist');

  const composePath = path.join(rootDir, 'docker-compose.yml');
  assert.ok(fs.existsSync(composePath), 'docker-compose.yml must exist');
  const composeContent = fs.readFileSync(composePath, 'utf8');
  assert.ok(composeContent.includes('services:'), 'docker-compose.yml must declare services');
});

test('DevOps Pipeline - CI/CD Workflow Specifications', () => {
  const ghWorkflowPath = path.join(rootDir, '.github', 'workflows', 'ci-cd-pipeline.yml');
  assert.ok(fs.existsSync(ghWorkflowPath), 'GitHub Actions workflow must exist at .github/workflows/ci-cd-pipeline.yml');
  
  const workflowContent = fs.readFileSync(ghWorkflowPath, 'utf8');
  assert.ok(workflowContent.includes('name:'), 'Workflow must have a valid name');
  assert.ok(workflowContent.includes('jobs:'), 'Workflow must declare jobs');
  assert.ok(workflowContent.includes('npm run build') || workflowContent.includes('npm test'), 'Workflow must execute build or test stages');

  const jenkinsfilePath = path.join(rootDir, 'Jenkinsfile');
  assert.ok(fs.existsSync(jenkinsfilePath), 'Jenkinsfile must exist');
  const jenkinsContent = fs.readFileSync(jenkinsfilePath, 'utf8');
  assert.ok(jenkinsContent.includes('pipeline {'), 'Jenkinsfile must define a declarative pipeline');
});

test('DevOps Pipeline - Production Web Server Routing Configuration', () => {
  const nginxPath = path.join(rootDir, 'nginx.conf');
  assert.ok(fs.existsSync(nginxPath), 'nginx.conf must exist for SPA routing');
  const nginxContent = fs.readFileSync(nginxPath, 'utf8');
  assert.ok(nginxContent.includes('try_files $uri $uri/ /index.html;'), 'nginx.conf must handle SPA client-side routing fallback');
});
