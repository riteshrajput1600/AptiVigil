# ADR-0006: Deployment target

- Status: Accepted as initial target
- Decision: Target AWS ECS/Fargate for container workloads, RDS PostgreSQL, ElastiCache Redis, S3 with KMS, SQS/DLQs, and managed secrets/logging. Keep local Compose independent of AWS credentials.
- Rationale: This matches the current service-oriented architecture without introducing Kubernetes operations before product and traffic needs justify them.
- Boundary: This is a target, not a production deployment or security approval. Region, networking, tenant isolation, backup/restore, availability, and data residency require explicit environment decisions.
- Revisit when: Customer procurement/data residency or measured scale requires another platform.
