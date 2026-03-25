"""Rate limiting middleware — delegates to the Redis-backed rate limiter service."""

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from app.config import settings
from app.services.rate_limiter import RateLimiter

# Paths exempt from rate limiting
EXEMPT_PATHS = {"/health", "/docs", "/redoc", "/openapi.json"}


class RateLimiterMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        if request.url.path in EXEMPT_PATHS:
            return await call_next(request)

        redis = getattr(request.app.state, "redis", None)
        if redis is None:
            return await call_next(request)

        limiter = RateLimiter(redis)

        # Identify caller — use API key, user ID from auth, or IP as fallback
        user_key = request.headers.get("X-API-Key") or request.client.host if request.client else "unknown"

        allowed, remaining, reset_at = await limiter.check_rate_limit(
            key=f"user:{user_key}",
            limit=settings.rate_limit_per_user,
            window=settings.rate_limit_window_seconds,
        )

        if not allowed:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Try again later."},
                headers={
                    "Retry-After": str(reset_at),
                    "X-RateLimit-Limit": str(settings.rate_limit_per_user),
                    "X-RateLimit-Remaining": "0",
                },
            )

        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(settings.rate_limit_per_user)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        return response
