"""Abstract blob storage with Azure and GCS backends."""

from abc import ABC, abstractmethod
from typing import Optional

from app.config import settings


class BlobStorageBackend(ABC):
    """Interface for blob storage operations."""

    @abstractmethod
    async def upload(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str: ...

    @abstractmethod
    async def download(self, key: str) -> bytes: ...

    @abstractmethod
    async def delete(self, key: str) -> None: ...

    @abstractmethod
    async def exists(self, key: str) -> bool: ...


class AzureBlobBackend(BlobStorageBackend):
    """Azure Blob Storage implementation."""

    def __init__(self) -> None:
        from azure.storage.blob.aio import BlobServiceClient
        self._client = BlobServiceClient.from_connection_string(
            settings.azure_storage_connection_string
        )
        self._container = settings.azure_storage_container

    async def upload(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
        container = self._client.get_container_client(self._container)
        blob = container.get_blob_client(key)
        await blob.upload_blob(data, content_type=content_type, overwrite=True)
        return f"azure://{self._container}/{key}"

    async def download(self, key: str) -> bytes:
        container = self._client.get_container_client(self._container)
        blob = container.get_blob_client(key)
        stream = await blob.download_blob()
        return await stream.readall()

    async def delete(self, key: str) -> None:
        container = self._client.get_container_client(self._container)
        blob = container.get_blob_client(key)
        await blob.delete_blob()

    async def exists(self, key: str) -> bool:
        container = self._client.get_container_client(self._container)
        blob = container.get_blob_client(key)
        return await blob.exists()


class GCSBlobBackend(BlobStorageBackend):
    """Google Cloud Storage implementation."""

    def __init__(self) -> None:
        from google.cloud import storage
        self._client = storage.Client(project=settings.gcs_project)
        self._bucket = self._client.bucket(settings.gcs_bucket)

    async def upload(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
        blob = self._bucket.blob(key)
        blob.upload_from_string(data, content_type=content_type)
        return f"gcs://{settings.gcs_bucket}/{key}"

    async def download(self, key: str) -> bytes:
        blob = self._bucket.blob(key)
        return blob.download_as_bytes()

    async def delete(self, key: str) -> None:
        blob = self._bucket.blob(key)
        blob.delete()

    async def exists(self, key: str) -> bool:
        blob = self._bucket.blob(key)
        return blob.exists()


_backend: Optional[BlobStorageBackend] = None


def get_blob_backend() -> BlobStorageBackend:
    """Factory — returns the configured blob storage backend."""
    global _backend
    if _backend is None:
        if settings.blob_provider == "gcs":
            _backend = GCSBlobBackend()
        else:
            _backend = AzureBlobBackend()
    return _backend
