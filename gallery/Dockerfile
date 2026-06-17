# syntax=docker/dockerfile:1

# ============================================================================
# Gallery "Design Express" — the train hub that links every site
#   target: dev   -> Vite dev server with hot module reload (used by compose)
#   target: prod  -> static production build served by nginx
# ============================================================================

FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN npm install

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5179
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5179"]

FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
