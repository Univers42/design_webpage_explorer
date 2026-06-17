# syntax=docker/dockerfile:1

# ============================================================================
# Taskora — multi-stage image
#   target: dev   -> Vite dev server with hot module reload (used by compose)
#   target: prod  -> static production build served by nginx
# ============================================================================

# ---------- base: node toolchain ----------
FROM node:22-alpine AS base
WORKDIR /app

# ---------- deps: install node_modules (cached unless package.json changes) ----------
FROM base AS deps
COPY package.json ./
RUN npm install

# ---------- dev: hot-reloading dev server ----------
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5178
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5178"]

# ---------- build: compile static assets ----------
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- prod: serve the build with nginx ----------
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
