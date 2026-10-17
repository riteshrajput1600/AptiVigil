#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if docker compose version >/dev/null 2>&1; then
  exec docker compose -f infra/docker/compose.yml up -d
elif command -v docker-compose >/dev/null 2>&1; then
  exec docker-compose -f infra/docker/compose.yml up -d
else
  printf 'Docker Compose is required. Install Docker Desktop or Docker Compose v2.\n' >&2
  exit 1
fi
