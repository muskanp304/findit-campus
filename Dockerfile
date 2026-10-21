# ============================================================
# Multi-Stage Dockerfile for FindIt Campus Application
# Stage 1: Build & Compile React Vite Web App
# Stage 2: Production-grade Nginx Web Server for Distribution
# ============================================================

# --- Stage 1: Build Stage ---
FROM node:22-alpine AS builder

LABEL maintainer="Campus DevOps Team <devops@campus.edu>"
LABEL description="Production build stage for FindIt Campus"

WORKDIR /app

# Copy package descriptors first to take advantage of Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm ci || npm install

# Copy application source code
COPY . .

# Run production build (generates /app/dist)
RUN npm run build

# --- Stage 2: Production Execution Stage ---
FROM nginx:1.27-alpine AS runner

LABEL maintainer="Campus DevOps Team <devops@campus.edu>"
LABEL description="Optimized Nginx runtime for FindIt Campus Single-Page Application"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA fallback & gzip compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Healthcheck to verify container vitality
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
