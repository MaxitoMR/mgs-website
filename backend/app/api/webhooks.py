"""Webhook handlers for PagerDuty and Incident.io."""

import hashlib
import hmac

from fastapi import APIRouter, Header, HTTPException, Request

from app.config import settings
from app.observability.logging import get_logger

router = APIRouter(tags=["webhooks"])
logger = get_logger(__name__)


@router.post("/pagerduty")
async def pagerduty_webhook(request: Request) -> dict:
    """Handle PagerDuty alert webhooks."""
    body = await request.json()
    event_type = body.get("event", {}).get("event_type", "unknown")
    logger.info("PagerDuty webhook received", extra={"event_type": event_type})
    # TODO: route to Slack, update incident tracker, etc.
    return {"status": "accepted", "event_type": event_type}


@router.post("/incident-io")
async def incident_io_webhook(
    request: Request,
    x_webhook_signature: str = Header(default=""),
) -> dict:
    """Handle Incident.io webhooks with HMAC signature verification."""
    body = await request.body()

    # Verify signature
    if settings.incident_io_webhook_secret:
        expected = hmac.new(
            settings.incident_io_webhook_secret.encode(),
            body,
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(f"sha256={expected}", x_webhook_signature):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

    payload = await request.json()
    event_type = payload.get("event_type", "unknown")
    logger.info("Incident.io webhook received", extra={"event_type": event_type})
    return {"status": "accepted", "event_type": event_type}
