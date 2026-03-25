"""Sentry error tracking initialization."""

import sentry_sdk

from app.config import settings


def init_sentry() -> None:
    """Initialize Sentry SDK if DSN is configured."""
    if not settings.sentry_dsn:
        return
    sentry_sdk.init(
        dsn=settings.sentry_dsn,
        environment=settings.environment,
        release=f"{settings.app_name}@{settings.dd_version}",
        traces_sample_rate=0.2 if settings.environment == "production" else 1.0,
        profiles_sample_rate=0.1,
    )
