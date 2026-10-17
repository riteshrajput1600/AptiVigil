FROM node:22-alpine AS build
WORKDIR /repo
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @aptivigil/api build

FROM node:22-alpine AS runtime
WORKDIR /repo
ENV NODE_ENV=production
RUN corepack enable
COPY --from=build /repo /repo
EXPOSE 4000
CMD ["pnpm", "--filter", "@aptivigil/api", "start"]
