"""Temporal worker — registers workflows and activities, connects to server."""

import asyncio

from temporalio.client import Client
from temporalio.worker import Worker

from app.config import settings
from workers.activities import cleanup_blob, process_document, send_notification, upload_to_blob
from workers.workflows import DocumentProcessingWorkflow, QuoteProcessingWorkflow


async def run_worker() -> None:
    """Start the Temporal worker."""
    client = await Client.connect(settings.temporal_host, namespace=settings.temporal_namespace)

    worker = Worker(
        client,
        task_queue=settings.temporal_task_queue,
        workflows=[DocumentProcessingWorkflow, QuoteProcessingWorkflow],
        activities=[upload_to_blob, process_document, cleanup_blob, send_notification],
    )

    print(f"Worker started on queue: {settings.temporal_task_queue}")
    await worker.run()


if __name__ == "__main__":
    asyncio.run(run_worker())
