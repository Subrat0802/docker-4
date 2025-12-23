FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /user/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/ws-server ./apps/ws-server

RUN pnpm install --frozen-lockfile
RUN pnpm --filter db exec prisma generate
RUN pnpm --filter ws-server run build

EXPOSE 3002

CMD ["pnpm", "--filter", "ws-server", "run", "start"]
