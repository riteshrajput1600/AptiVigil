# Infrastructure

docker/compose.yml supplies local PostgreSQL and Redis. Terraform, Kubernetes, nginx and monitoring directories are reserved for deployment artifacts and are not production configured. Production infrastructure must add private object storage, KMS, secrets management, network controls, audit trails, backups and environment-specific IAM before deployment.
