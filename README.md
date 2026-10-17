# AptiVigil — Exam & Proctoring Platform

A single-repository, multi-application foundation based on the attached enterprise architecture. It contains seven role-specific Next.js portals, a public marketing/customer-acquisition app, a shared NestJS API, shared packages, a tenant-aware Prisma data model, and local PostgreSQL/Redis services.

## Quick start

Requirements: Node.js 22+, pnpm 10+, Docker Desktop or Colima with Docker Compose (for PostgreSQL, Redis, S3-compatible storage, local SQS and email capture).

```sh
corepack enable
pnpm setup:local
pnpm dev
```

The role portals run at `http://localhost:3000` through `3006` in this order: student, organization admin, exam manager, proctor, reviewer, support admin, super admin. The public marketing app runs at `http://localhost:3007`. Public self-registration is out of scope: prospective customers contact the team, who provisions the organization and sends secure invitations. The shared login page accepts an organization-issued ID or email and password, then uses the authenticated role returned by the API to route the user. The login UI is in place; credential verification, session management, account provisioning and recovery are not implemented yet. The API is at `http://localhost:4000/api/v1/health`; OpenAPI docs are at `http://localhost:4000/api/docs`.

AptiVigil's intended product scope includes organization-run exams and structured/live/coding interviews, with AI-assisted proctoring and human-reviewed evidence. Interview scheduling, live rooms, collaborative coding, scorecards and analytics are captured in [docs/developer-stories.md](docs/developer-stories.md); these are roadmap capabilities, not all currently implemented.

Run one app: `pnpm --filter @aptivigil/student dev`; run the API: `pnpm --filter @aptivigil/api dev`. Local database credentials are for development only.

Run the marketing app alone: `pnpm --filter @aptivigil/marketing dev`.

## Repository map

- `apps/`: seven independently deployable role portals plus the public marketing app (`apps/marketing`).
- `backend/api`: centralized API/BFF and OpenAPI entrypoint.
- `packages/`: shared domain types, permission helpers, UI and configuration.
- `prisma/`: tenant-scoped core schema and seed.
- `infra/docker`: local PostgreSQL, Redis, S3-compatible object storage, SQS-compatible queue and email capture.
- `docs/`: [solo-developer implementation backlog](docs/developer-stories.md), [implementation plan](docs/implementation-plan.md), and [API contract boundaries](docs/api-contracts.md).

## Security boundary

This repository is an implementation foundation, not a production-ready proctoring service. Authentication/SSO, tenant-scoped authorization guards, persistent API workflows, signed evidence upload, retention enforcement, WebSocket gateway, durable queues, AI models, code sandbox isolation, and cloud IAM/KMS must be implemented and reviewed before real candidate data or high-stakes exams are used. The UI is a role-specific scaffold; it does not grant access. Do not treat browser-generated signals as proof or automatically penalize a candidate based on a model score.

## Local development

Copy `.env.example` to `.env`. Docker Compose starts PostgreSQL, Redis, SeaweedFS (S3 API), ElasticMQ (SQS-compatible queues) and Mailpit (local SMTP/email viewer); it does not start the application containers. See [local infrastructure](infra/README.md) and [architecture decisions](docs/adr/README.md). `pnpm dev` starts the seven role portals, marketing app and API in workspace dev mode.
