# ADR-0003: Object storage

- Status: Accepted for implementation
- Decision: Use SeaweedFS's S3 API for local development and AWS S3 for production, behind a storage adapter. Local service credentials are disposable development values only.
- Rationale: The application needs an S3-compatible interface for uploads and evidence artifacts without requiring cloud credentials on a developer laptop.
- Production boundary: Use private buckets, scoped IAM, encryption/KMS, lifecycle and retention policies, malware/content checks where applicable, and audited access. Never expose evidence objects through public ACLs.
- Revisit when: A deployment target or required S3 behavior makes another maintained compatible store a better fit.
