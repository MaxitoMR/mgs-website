# MGS Supply & Services — Infrastructure Stack

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (Next.js on Vercel)                               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────────────┐
│  Ingress (nginx + TLS)                                      │
├─────────────────────────────────────────────────────────────┤
│  Backend API (FastAPI + ddtrace + Sentry)                   │
│  ├── /api/v1/*        — Core business endpoints             │
│  ├── /webhooks/*      — PagerDuty, Incident.io              │
│  └── /health          — Liveness/readiness probe            │
├─────────────────────────────────────────────────────────────┤
│  Temporal Worker      — Durable workflow execution          │
│  ├── DocumentProcessingWorkflow                             │
│  └── QuoteProcessingWorkflow                                │
├──────────┬───────────┬──────────┬───────────┬───────────────┤
│ PgBouncer│ PostgreSQL│  Redis   │ Temporal  │ Blob Storage  │
│ (pool)   │ (primary) │ (cache+  │ (workflow │ (Azure/GCS)   │
│          │           │  rate    │  engine)  │               │
│          │           │  limit)  │           │               │
└──────────┴───────────┴──────────┴───────────┴───────────────┘
```

## Quick Start — Local Development

```bash
# 1. Start all services
docker-compose up -d

# 2. Wait for health checks
docker-compose ps

# 3. Access services
#    Backend API:    http://localhost:8000/docs
#    Temporal UI:    http://localhost:8080
#    PostgreSQL:     localhost:5432 (direct) / 6432 (PgBouncer)
#    Redis:          localhost:6379
```

## Directory Structure

```
mgs-website/
├── src/                          # Next.js frontend (Vercel)
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── config.py             # Pydantic settings (env vars)
│   │   ├── middleware/            # Correlation ID, rate limiter
│   │   ├── api/                  # Routes, webhook handlers
│   │   ├── services/             # Rate limiter, blob storage
│   │   ├── observability/        # Logging, tracing, Sentry
│   │   └── db/                   # SQLAlchemy models, sessions
│   ├── workers/                  # Temporal workflows + activities
│   ├── migrations/               # Alembic database migrations
│   ├── tests/
│   ├── Dockerfile                # Backend API container
│   └── Dockerfile.worker         # Temporal worker container
├── infra/
│   ├── terraform/azure/          # AKS, ACR, PostgreSQL, Redis, Storage
│   ├── terraform/gcp/            # GKE, Artifact Registry, Cloud SQL
│   ├── pulumi/                   # Alternative IaC (Python)
│   ├── k8s/manifests/            # Raw Kubernetes YAML
│   ├── k8s/helm/mgs-app/         # Helm chart
│   └── go-tools/                 # Health checker, migration runner
├── observability/datadog/        # SLO definitions, burn-rate alerts
├── .github/workflows/            # CI/CD (staging + production)
├── docker-compose.yml            # Local dev stack
├── pgbouncer.ini                 # Connection pooler config
└── .env.example                  # Environment variable template
```

## Component Details

### Temporal (Workflow Orchestration)
Durable async workflows with automatic retries. Workflows upload intermediate state to blob storage, process it, then clean up. The worker registers workflows and activities, connecting to the Temporal server.

### PgBouncer (Connection Pooling)
Transaction-mode pooling in front of PostgreSQL. Max 200 client connections, pool size 20. Prevents connection exhaustion under load.

### Redis (Caching + Rate Limiting)
Sliding-window rate limiter using sorted sets with atomic Lua scripts. Configurable per-user (100/min) and per-org (1000/min) scopes.

### Blob Storage (Azure/GCS)
Abstract interface with Azure Blob Storage and GCS backends. Controlled by `BLOB_PROVIDER` env var. Used for intermediate workflow state.

## Deployment

### Terraform (Azure — Primary)
```bash
cd infra/terraform/azure
terraform init
terraform plan -var="postgres_password=SECURE_PASSWORD"
terraform apply
```

### Terraform (GCP — Secondary)
```bash
cd infra/terraform/gcp
terraform init
terraform plan -var="project_id=YOUR_PROJECT"
terraform apply
```

### Pulumi (Alternative)
```bash
cd infra/pulumi
pulumi stack select dev
pulumi up
```

### Helm
```bash
helm install mgs infra/k8s/helm/mgs-app/ -n mgs-app --create-namespace -f values-prod.yaml
```

## CI/CD

- **Staging**: Push to `develop` → lint → test → build → deploy to staging namespace
- **Production**: Push to `main` → lint → test → build → deploy with auto-rollback on failure
- Secrets managed via GitHub Actions environment secrets

## Observability

- **Datadog APM**: `ddtrace` patches all libraries, traces propagated via correlation IDs
- **Sentry**: Error tracking with environment-aware sampling
- **Structured Logging**: JSON format with correlation IDs and Datadog trace injection
- **SLOs**: API availability (99.9%), latency p99 (<500ms), workflow completion (99.5%)
- **Burn Rate Alerts**: Fast burn (14.4x/1h) → PagerDuty critical, Slow burn (6x/6h) → warning
