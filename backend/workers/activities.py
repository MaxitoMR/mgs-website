"""Temporal activities — individual units of work executed by the worker."""

import uuid
from dataclasses import dataclass

from temporalio import activity


@dataclass
class BlobRef:
    provider: str
    key: str
    uri: str


@activity.defn
async def upload_to_blob(data: str, content_type: str = "application/json") -> BlobRef:
    """Upload intermediate workflow state to blob storage."""
    from app.services.blob_storage import get_blob_backend

    backend = get_blob_backend()
    key = f"workflows/{uuid.uuid4()}.json"
    uri = await backend.upload(key, data.encode(), content_type)
    activity.logger.info(f"Uploaded blob: {uri}")
    return BlobRef(provider=type(backend).__name__, key=key, uri=uri)


@activity.defn
async def process_document(blob_ref: BlobRef) -> dict:
    """Process a document referenced by its blob URI."""
    from app.services.blob_storage import get_blob_backend

    backend = get_blob_backend()
    raw = await backend.download(blob_ref.key)
    activity.logger.info(f"Processing {len(raw)} bytes from {blob_ref.uri}")
    # --- business logic goes here ---
    return {"status": "processed", "bytes": len(raw), "source": blob_ref.uri}


@activity.defn
async def cleanup_blob(blob_ref: BlobRef) -> None:
    """Delete blob after workflow completion."""
    from app.services.blob_storage import get_blob_backend

    backend = get_blob_backend()
    if await backend.exists(blob_ref.key):
        await backend.delete(blob_ref.key)
        activity.logger.info(f"Cleaned up blob: {blob_ref.uri}")


@activity.defn
async def send_notification(recipient: str, subject: str, body: str) -> bool:
    """Send notification (email, Slack, etc.)."""
    activity.logger.info(f"Notification → {recipient}: {subject}")
    # TODO: integrate with email/Slack service
    return True
