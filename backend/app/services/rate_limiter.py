"""Redis-backed distributed rate limiter — sliding window algorithm."""

import time

from redis.asyncio import Redis

# Atomic Lua script: add timestamp, trim window, count, set TTL
_SLIDING_WINDOW_LUA = """
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]

local window_start = now - window

-- Remove expired entries
redis.call('ZREMRANGEBYSCORE', key, '-inf', window_start)

-- Count current entries
local count = redis.call('ZCARD', key)

if count < limit then
    redis.call('ZADD', key, now, member)
    redis.call('EXPIRE', key, window + 1)
    return {1, limit - count - 1, 0}
else
    -- Find oldest entry to calculate reset time
    local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
    local reset = 0
    if #oldest > 0 then
        reset = math.ceil(tonumber(oldest[2]) + window - now)
    end
    return {0, 0, reset}
end
"""


class RateLimiter:
    """Sliding-window rate limiter backed by Redis sorted sets."""

    def __init__(self, redis: Redis) -> None:
        self._redis = redis
        self._script = self._redis.register_script(_SLIDING_WINDOW_LUA)

    async def check_rate_limit(
        self,
        key: str,
        limit: int = 100,
        window: int = 60,
    ) -> tuple[bool, int, int]:
        """Check if a request is within the rate limit.

        Returns:
            (allowed, remaining, retry_after_seconds)
        """
        now = time.time()
        member = f"{now}"  # unique member per request

        result = await self._script(
            keys=[f"ratelimit:{key}"],
            args=[now, window, limit, member],
        )

        allowed = bool(result[0])
        remaining = int(result[1])
        retry_after = int(result[2])

        return allowed, remaining, retry_after
