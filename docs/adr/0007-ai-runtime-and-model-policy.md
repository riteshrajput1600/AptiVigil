# ADR-0007: AI runtime and model policy

- Status: Accepted as a selection policy; model choices remain gated
- Decision: Keep the product API and orchestration in TypeScript/NestJS. Use Python for isolated AI services only when the mature vision/audio/model ecosystem materially improves the task. Use browser APIs for permissioned capture; do not put model inference or answer/evidence data in client logs.
- Model policy: Evaluate open-source libraries/models by license and commercial-use rights, dataset provenance, subgroup accuracy, false-positive/negative rates, latency, hardware needs, privacy, retention and reproducibility before adoption. Pin model/library versions and preserve a human review path. AI flags are evidence signals, never autonomous misconduct, hiring or admission decisions.
- Revisit when: A specific use case has a benchmark, consent/policy, threat model and deployment plan.
