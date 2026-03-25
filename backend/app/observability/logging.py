"""Structured JSON logging with correlation ID and Datadog trace injection."""

import logging
import sys

from pythonjsonlogger import jsonlogger

from app.middleware.correlation import correlation_id_ctx


class CorrelationFilter(logging.Filter):
    """Inject correlation_id and Datadog trace context into every log record."""

    def filter(self, record: logging.LogRecord) -> bool:
        record.correlation_id = correlation_id_ctx.get("")  # type: ignore[attr-defined]
        try:
            from ddtrace import tracer
            span = tracer.current_span()
            if span:
                record.dd_trace_id = str(span.trace_id)  # type: ignore[attr-defined]
                record.dd_span_id = str(span.span_id)  # type: ignore[attr-defined]
        except Exception:
            pass
        return True


def get_logger(name: str) -> logging.Logger:
    """Return a logger configured for structured JSON output."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = jsonlogger.JsonFormatter(
            fmt="%(asctime)s %(levelname)s %(name)s %(message)s %(correlation_id)s",
            rename_fields={"asctime": "timestamp", "levelname": "level"},
        )
        handler.setFormatter(formatter)
        handler.addFilter(CorrelationFilter())
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger
