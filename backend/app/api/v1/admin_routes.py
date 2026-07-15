from __future__ import annotations

from pydantic import BaseModel, Field
from fastapi import APIRouter

from app.services.runtime_state import catalog_service


router = APIRouter(prefix="/admin", tags=["admin"])


class WeightUpdate(BaseModel):
    action: str = Field(min_length=1)
    weight: int


class WeightsUpdateRequest(BaseModel):
    updates: list[WeightUpdate]


@router.get("/actions/weights")
def get_action_weights() -> dict:
    weights = catalog_service.get_weights()
    return {
        "success": True,
        "actions": [{"action": action, "weight": weight} for action, weight in sorted(weights.items())],
    }

@router.put("/actions/weights")
def put_action_weights(payload: WeightsUpdateRequest):

    if not payload.updates:
        raise HTTPException(
            400,
            "No updates supplied."
        )

    current = catalog_service.get_weights()

    seen = set()

    updates = {}

    for item in payload.updates:

        if item.action not in current:
            raise HTTPException(
                404,
                f"Unknown action: {item.action}"
            )

        if item.action in seen:
            raise HTTPException(
                400,
                f"Duplicate action: {item.action}"
            )

        seen.add(item.action)
        updates[item.action] = item.weight

    updated = catalog_service.update_weights(updates)

    return {
        "success": True,
        "updatedCount": len(updates),
        "actions": [
            {
                "action": action,
                "weight": weight
            }
            for action, weight in sorted(updated.items())
        ],
        "appliesFrom": "next-scoring-call",
    }