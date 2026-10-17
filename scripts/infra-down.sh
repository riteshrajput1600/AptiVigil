#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if docker compose version >/dev/null 2>&1; then
  exec docker compose -f infra/docker/compose.yml down
elif command -v docker-compose >/dev/null 2>&1; then
  exec docker-compose -f infra/docker/compose.yml down
else
  printf 'Docker Compose is required.\n' >&2
  exit 1
fi
