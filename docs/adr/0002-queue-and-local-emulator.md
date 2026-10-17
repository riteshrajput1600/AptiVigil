# ADR-0002: Queue and local emulator

- Status: Accepted for implementation
- Decision: Use AWS SQS with dead-letter queues in AWS environments. Use ElasticMQ locally through its SQS-compatible API so local development needs no cloud credentials.
- Requirements: Consumers must be idempotent, tenant-scoped, retry bounded work, and send poison messages to a DLQ. Queue messages carry identifiers, not answer text, credentials or raw media.
- Revisit when: A required SQS feature is missing from the emulator or deployment constraints change.
