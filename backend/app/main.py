"""MGS Backend — FastAPI application entry point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

import sentry_sdk
from ddtrace import patch_all
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as api_router
from app.api.webhooks import router as webhook_router
from app.config import settings
from app.middleware.correlation import CorrelationIdMiddleware
from app.middleware.rate_limiter import RateLimiterMiddleware
from app.observability.logging import get_logger

# Patch all libraries for Datadog APM
patch_all()

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Startup / shutdown lifecycle."""
    import redis.asyncio as aioredis

    # --- Startup ---
    logger.info("Starting MGS backend", extra={"environment": settings.environment})

    # Initialize Redis connection pool
    app.state.redis = aioredis.from_url(
        settings.redis_url, decode_responses=True, max_connections=50
    )
    await app.state.redis.ping()
    logger.info("Redis connected")

    # Initialize Sentry
    if settings.sentry_dsn:
        sentry_sdk.init(
            dsn=settings.sentry_dsn,
            environment=settings.environment,
            release=settings.dd_version,
            traces_sample_rate=0.2 if settings.environment == "production" else 1.0,
            profiles_sample_rate=0.1,
        )
        logger.info("Sentry initialized")

    yield

    # --- Shutdown ---
    await app.state.redis.close()
    logger.info("MGS backend stopped")


def create_app() -> FastAPI:
    """Application factory."""
    app = FastAPI(
        title="MGS Supply & Services API",
        version=settings.dd_version,
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
        lifespan=lifespan,
    )

    # --- Middleware (order matters: outermost first) ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"] if settings.debug else ["https://mgssupplyandservices.com"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(CorrelationIdMiddleware)
    app.add_middleware(RateLimiterMiddleware)

    # --- Routes ---
    app.include_router(api_router, prefix="/api/v1")
    app.include_router(webhook_router, prefix="/webhooks")

    @app.get("/health")
    async def health_check() -> dict[str, str]:
        return {"status": "ok", "service": settings.app_name}

    return app


app = create_app()
