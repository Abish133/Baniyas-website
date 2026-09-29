# syntax=docker/dockerfile:1.7
#
# Production image for the Bani Yas website (Next.js + MySQL).
#
# Settings come from .env.production (committed in this private repository). The public pages are
# pre-rendered from the database during `next build`, so the build reads it too.
#   docker build -t baniyas-website .
#
# Variables set in Coolify override the file. Uploads / backups live in persistent volumes
# (/app/storage/uploads, /app/backups) so they survive new deployments.

FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- all dependencies (for building) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- production dependencies only (for running) ----
FROM base AS prod-deps
COPY package.json package-lock.json ./
# The SWC compiler (~180 MB) is only needed by `next build`, not by `next start`.
RUN npm ci --omit=dev --no-audit --no-fund \
 && rm -rf node_modules/@next/swc-* \
 && npm cache clean --force

# ---- build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && rm -rf .next/cache

# ---- runtime ----
FROM base AS runner
# Commit the image was built from (shown by /api/health so a deployment can be verified).
ARG APP_VERSION=dev
ENV NODE_ENV=production \
    PORT=7111 \
    APP_VERSION=$APP_VERSION
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --chown=node:node public ./public
COPY --chown=node:node package.json next.config.mjs .env.production ./
# CLI scripts, so migrations / backups / admin:create can run inside the container.
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node database ./database
RUN mkdir -p storage/uploads backups .next/cache && chown -R node:node storage backups .next

USER node
EXPOSE 7111

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:7111/api/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "7111"]
