# AptiVigil — Exam & Proctoring Platform

A single-repository, multi-application foundation based on the attached enterprise architecture. It contains seven role-specific Next.js portals, a public marketing/customer-acquisition app, a shared NestJS API, shared packages, a tenant-aware Prisma data model, and local PostgreSQL/Redis services.

## Quick start

Requirements: Node.js 22+, pnpm 10+, Docker Desktop or Colima with Docker Compose (for PostgreSQL and Redis).

```sh
corepack enable
pnpm setup:local
pnpm dev
```

The role portals run at `http://localhost:3000` through `3006` in this order: student, organization admin, exam manager, proctor, reviewer, support admin, super admin. The public marketing app runs at `http://localhost:3007`. Public self-registration is out of scope: prospective customers contact the team, who provisions the organization and sends secure invitations. The login page currently hands off to the local organization-admin shell; central OIDC and real checkout remain planned stories. The API is at `http://localhost:4000/api/v1/health`; OpenAPI docs are at `http://localhost:4000/api/docs`.

Run one app: `pnpm --filter @aptivigil/student dev`; run the API: `pnpm --filter @aptivigil/api dev`. Local database credentials are for development only.

Run the marketing app alone: `pnpm --filter @aptivigil/marketing dev`.

## Repository map

- `apps/`: seven independently deployable role portals plus the public marketing app (`apps/marketing`).
- `backend/api`: centralized API/BFF and OpenAPI entrypoint.
- `packages/`: shared domain types, permission helpers, UI and configuration.
- `prisma/`: tenant-scoped core schema and seed.
- `infra/docker`: local PostgreSQL and Redis.
- `docs/`: [solo-developer implementation backlog](docs/developer-stories.md), [implementation plan](docs/implementation-plan.md), and [API contract boundaries](docs/api-contracts.md).

## Security boundary

This repository is an implementation foundation, not a production-ready proctoring service. Authentication/SSO, tenant-scoped authorization guards, persistent API workflows, signed evidence upload, retention enforcement, WebSocket gateway, durable queues, AI models, code sandbox isolation, and cloud IAM/KMS must be implemented and reviewed before real candidate data or high-stakes exams are used. The UI is a role-specific scaffold; it does not grant access. Do not treat browser-generated signals as proof or automatically penalize a candidate based on a model score.

## Local development

Copy `.env.example` to `.env`. Docker Compose starts local PostgreSQL and Redis only; it does not start the application containers. `pnpm dev` starts the seven role portals, marketing app and API in workspace dev mode.
