# Local infrastructure

`pnpm infra:up` starts the local development profile from `infra/docker/compose.yml`; `pnpm infra:down` stops containers and preserves named volumes. No cloud account or cloud credentials are needed.

| Service | Local address | Purpose |
|---|---|---|
| PostgreSQL | `localhost:5432` | Development database |
| Redis | `localhost:6379` | Cache and local coordination |
| SeaweedFS S3 API | `http://localhost:8333` | S3-compatible development object storage (static local identity; embedded IAM administration endpoint disabled) |
| ElasticMQ | `http://localhost:9324` | SQS-compatible local queues: `events`, `reports`, `notifications`, with DLQ queues provisioned |
| Mailpit SMTP | `localhost:1025` | Capture development email |
| Mailpit UI | `http://localhost:8025` | Inspect captured email in a browser |

Set application variables from `.env.example`. Local object-storage credentials are disposable and must never be used outside development. `pnpm infra:up` idempotently creates the configured local bucket before returning. ElasticMQ provides local SQS API behavior; production queues use AWS SQS and dead-letter/redrive policy. Mailpit does not deliver mail externally.

The object-storage adapter targets AWS S3 in production. Production must use private buckets, scoped IAM, KMS encryption, lifecycle/retention rules, audited access and malware/content controls where required. Compose is not production configured. Deployment decision: [ADR-0006](../docs/adr/0006-deployment-target.md); storage decision: [ADR-0003](../docs/adr/0003-object-storage.md).
