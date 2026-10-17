# Architecture

The repository follows the source document's single Git repository and independent runtime boundaries. The seven role-specific Next.js portals and the public marketing/customer-acquisition Next.js app are separate deployment units. The marketing app serves Home, Services, Packages, Contact/Demo and Login; public visitors cannot self-register. Prospective schools/organizations contact the team, authorized staff provision the tenant and users, and invitations use shared identity. The marketing app does not own an account store or billing rules. All apps consume shared services through the NestJS API where applicable; business logic and authorization belong on the server. Shared packages hold domain contracts and presentation primitives.

## Data and trust boundaries

PostgreSQL is the transactional system of record. Tenant-owned records include `organizationId`; API services must derive tenant context from a verified identity and membership, never from an untrusted request body. Exam versions and review decisions are modeled as append-oriented records. Evidence bytes belong in private object storage, not in PostgreSQL. Redis is reserved for cache, rate limits and realtime presence.

## Runtime services to add

The initial runnable API is deliberately small. Add independent realtime, event-ingestion, worker, report-worker and isolated code-runner services as separate packages/deployments. Use durable queues with dead-letter handling for retryable work. Never execute candidate code in an API process or on a shared host without a hardened sandbox.

## Proctoring and human review

Browser signals and AI outputs are evidence inputs. Preserve source, confidence, model/rule version and receipt time. Correlate signals into incidents and route decisions to authorized human reviewers with appeals and audit history. Do not represent a normal browser as able to inspect the full operating system.

## Current implementation status

The seven role-portal shells, public marketing app shell, API health/OpenAPI entrypoint, initial schema/migration, and local PostgreSQL/Redis compose services are implemented. Central OIDC, live plan catalog, customer onboarding, checkout/subscription lifecycle and the other domain workflows remain planned. The architecture is a valid target, but this repository is not yet an end-to-end exam/proctoring product.
