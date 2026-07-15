from fastapi import APIRouter

from app.services.user_service import UserService

router = APIRouter(tags=["Users"])

service = UserService()


@router.get("/users/{user_id}")
def get_user(user_id: str):
    return service.get_user(user_id)


@router.get("/users/{user_id}/badges")
def get_badges(user_id: str):
    return service.get_badges(user_id)