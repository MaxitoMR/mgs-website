"""Temporal workflows — durable orchestrations."""

from datetime import timedelta

from temporalio import workflow
from temporalio.common import RetryPolicy

with workflow.unsafe.imports_passed_through():
    from workers.activities import (
        BlobRef,
        cleanup_blob,
        process_document,
        send_notification,
        upload_to_blob,
    )

RETRY_POLICY = RetryPolicy(
    initial_interval=timedelta(seconds=1),
    backoff_coefficient=2.0,
    maximum_interval=timedelta(minutes=5),
    maximum_attempts=5,
)


@workflow.defn
class DocumentProcessingWorkflow:
    """Upload → Process → Cleanup pipeline with durable state."""

    @workflow.run
    async def run(self, document_data: str, notify_email: str) -> dict:
        workflow.logger.info("Starting document processing workflow")

        # Step 1: Upload to blob storage
        blob_ref: BlobRef = await workflow.execute_activity(
            upload_to_blob,
            args=[document_data],
            start_to_close_timeout=timedelta(minutes=2),
            retry_policy=RETRY_POLICY,
        )

        try:
            # Step 2: Process document
            result = await workflow.execute_activity(
                process_document,
                args=[blob_ref],
                start_to_close_timeout=timedelta(minutes=10),
                retry_policy=RETRY_POLICY,
            )

            # Step 3: Notify on success
            await workflow.execute_activity(
                send_notification,
                args=[notify_email, "Document Processed", f"Result: {result['status']}"],
                start_to_close_timeout=timedelta(seconds=30),
                retry_policy=RETRY_POLICY,
            )

            return result

        finally:
            # Step 4: Always clean up blob
            await workflow.execute_activity(
                cleanup_blob,
                args=[blob_ref],
                start_to_close_timeout=timedelta(minutes=1),
                retry_policy=RETRY_POLICY,
            )


@workflow.defn
class QuoteProcessingWorkflow:
    """Handle an incoming quote request end-to-end."""

    @workflow.run
    async def run(self, quote_id: str, email: str) -> dict:
        workflow.logger.info(f"Processing quote {quote_id}")

        await workflow.execute_activity(
            send_notification,
            args=[email, "Quote Received", f"We received your quote request #{quote_id}."],
            start_to_close_timeout=timedelta(seconds=30),
            retry_policy=RETRY_POLICY,
        )

        # Simulate processing delay
        await workflow.sleep(timedelta(seconds=5))

        await workflow.execute_activity(
            send_notification,
            args=["ops@mgssupplyandservices.com", "New Quote", f"Quote #{quote_id} from {email}"],
            start_to_close_timeout=timedelta(seconds=30),
            retry_policy=RETRY_POLICY,
        )

        return {"quote_id": quote_id, "status": "processed"}
