from fastapi import APIRouter
from app.services.mastery_service import calculate_mastery
from app.services.memory_service import get_memories

router = APIRouter()



@router.get("/dashboard/{user_id}")
async def get_dashboard(user_id:str):
    return {
        "status": "ok"
    }