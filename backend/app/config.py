"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Central configuration — all values sourced from env vars or .env file."""

    # --- Application ---
    app_name: str = "mgs-backend"
    environment: str = "development"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8000

    # --- Database (via PgBouncer) ---
    database_url: str = "postgresql+asyncpg://mgs:mgs_secret@pgbouncer:6432/mgs"

    # --- Redis ---
    redis_url: str = "redis://redis:6379/0"

    # --- Temporal ---
    temporal_host: str = "temporal:7233"
    temporal_namespace: str = "default"
    temporal_task_queue: str = "mgs-tasks"

    # --- Observability ---
    sentry_dsn: str = ""
    dd_service: str = "mgs-backend"
    dd_env: str = "development"
    dd_version: str = "0.1.0"
    log_level: str = "INFO"

    # --- Blob Storage ---
    blob_provider: str = "azure"  # "azure" | "gcs"
    azure_storage_connection_string: str = ""
    azure_storage_container: str = "mgs-workflows"
    gcs_bucket: str = "mgs-workflows"
    gcs_project: str = ""

    # --- Incident Response ---
    pagerduty_routing_key: str = ""
    incident_io_webhook_secret: str = ""

    # --- Rate Limiting ---
    rate_limit_per_user: int = 100  # requests per window
    rate_limit_per_org: int = 1000
    rate_limit_window_seconds: int = 60

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore"}


settings = Settings()
