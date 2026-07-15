from app.api.v1.admin_routes import router as admin_router
from app.api.v1.dashboard_routes import router as dashboard_router
from app.api.v1.leaderboard_routes import router as leaderboard_router
from app.api.v1.user_routes import router as user_router

__all__ = [
    "admin_router",
    "dashboard_router",
    "leaderboard_router",
    "user_router",
]