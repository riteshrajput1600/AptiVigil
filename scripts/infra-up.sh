#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if docker compose version >/dev/null 2>&1; then
  docker compose -f infra/docker/compose.yml up -d --wait --wait-timeout 120
  node --env-file-if-exists=.env scripts/ensure-local-bucket.mjs
  printf 'Local services ready: PostgreSQL :5432, Redis :6379, S3 :8333, SQS :9324, Mailpit UI http://localhost:8025\n'
  exit 0
elif command -v docker-compose >/dev/null 2>&1; then
  docker-compose -f infra/docker/compose.yml up -d --wait --wait-timeout 120
  node --env-file-if-exists=.env scripts/ensure-local-bucket.mjs
  printf 'Local services ready: PostgreSQL :5432, Redis :6379, S3 :8333, SQS :9324, Mailpit UI http://localhost:8025\n'
  exit 0
else
  printf 'Docker Compose is required. Install Docker Desktop or Docker Compose v2.\n' >&2
  exit 1
fi
