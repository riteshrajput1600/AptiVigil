# Async workers (planned runtime)

No job processor is implemented yet. Every future worker entrypoint must use `bootstrapWorker()` from `src/env.ts` before opening connections; it calls `loadWorkerEnvironment()` first and only invokes the worker startup callback after validation succeeds; this validates database, Redis, queue-adapter, object-storage and mail settings and reports key names without printing secret values. Queue handlers must propagate `getJobCorrelationId(message)` to structured logs and child jobs. Use `logJobEvent()` for logs; its typed fields deliberately exclude message bodies and arbitrary payloads.

Use durable queues with retries, idempotency keys, dead-letter handling and tenant-scoped payloads. Messages carry record identifiers rather than answer text, credentials or raw media. Structured logging must omit answer/evidence bodies and secrets. Keep provider adapters separate so local ElasticMQ and production SQS share a contract.
