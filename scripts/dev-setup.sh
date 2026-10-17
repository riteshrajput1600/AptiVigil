#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

for command in node corepack docker; do
  if ! command -v "$command" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$command" >&2
    exit 1
  fi
done

if ! docker info >/dev/null 2>&1; then
  if command -v colima >/dev/null 2>&1; then
    colima start --cpu 4 --memory 6
  else
    printf 'Docker engine is not running. Start Docker Desktop or install/start Colima.\n' >&2
    exit 1
  fi
fi

node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
if (( node_major < 22 )); then
  printf 'Node.js 22 or newer is required (found %s).\n' "$(node --version)" >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  printf 'Created .env from .env.example. Review it before using non-local services.\n'
fi

corepack pnpm install
corepack pnpm infra:up
corepack pnpm db:generate
corepack pnpm db:deploy
corepack pnpm db:seed
printf '\nLocal services are ready. Start the apps with: corepack pnpm dev\n'
