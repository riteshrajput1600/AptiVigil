# Code execution runner (planned runtime)

Candidate programs must run in disposable, hardened sandboxes with network disabled by default, strict CPU/memory/time/output quotas and no host filesystem access. Never execute candidate code in the API or worker process. This runtime is intentionally not implemented yet.
