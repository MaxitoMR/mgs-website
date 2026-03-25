"""Datadog APM tracing helpers."""

from ddtrace import config as dd_config

from app.config import settings


def configure_datadog() -> None:
    """Set Datadog tracing configuration."""
    dd_config.env = settings.dd_env
    dd_config.service = settings.dd_service
    dd_config.version = settings.dd_version
    dd_config.fastapi["service_name"] = settings.dd_service
    dd_config.fastapi["distributed_tracing"] = True
