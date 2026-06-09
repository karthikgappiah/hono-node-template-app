FROM oven/bun:1 AS base

FROM base AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY tsconfig.json src ./

RUN bun install --frozen-lockfile && \
    bun run build && \
    bun install --production

FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]
