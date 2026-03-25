"""Core API routes."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["core"])


class QuoteRequest(BaseModel):
    name: str
    email: str
    phone: str | None = None
    facility_type: str
    square_footage: int | None = None
    message: str | None = None


class QuoteResponse(BaseModel):
    id: str
    status: str


@router.post("/quotes", response_model=QuoteResponse)
async def create_quote(payload: QuoteRequest) -> QuoteResponse:
    """Submit a new service quote request."""
    import uuid
    quote_id = str(uuid.uuid4())
    # TODO: persist to DB, trigger Temporal workflow
    return QuoteResponse(id=quote_id, status="received")


@router.get("/quotes/{quote_id}")
async def get_quote(quote_id: str) -> dict:
    """Retrieve quote status."""
    # TODO: fetch from DB
    return {"id": quote_id, "status": "pending"}


@router.get("/services")
async def list_services() -> dict:
    """List available service categories."""
    return {
        "categories": [
            {"id": "commercial", "name": "Commercial Cleaning", "service_count": 8},
            {"id": "medical", "name": "Medical Facilities", "service_count": 6},
            {"id": "industrial", "name": "Industrial Cleaning", "service_count": 4},
            {"id": "specialized", "name": "Specialized Services", "service_count": 6},
        ]
    }
