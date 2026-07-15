from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.engines.scoring_engine import read_scoring_events

router = APIRouter(tags=["auth"])


class LoginRequest(BaseModel):
    employee_id: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    email: str
    department: str
    password: str


@router.post("/auth/login")
def login(req: LoginRequest):
    # Support mock login fallbacks for development convenience
    if req.employee_id == "u3" and req.password == "admin123":
        return {
            "success": True,
            "user_id": "u3",
            "name": "Vikram",
            "role": "Administrator",
            "department": "ADMIN",
            "branch": "YELAHANKA"
        }
    if req.employee_id == "u1" and req.password == "employee123":
        return {
            "success": True,
            "user_id": "u1",
            "name": "Asha",
            "role": "Dealer Sales Executive",
            "department": "SALES",
            "branch": "YELAHANKA"
        }
    if req.employee_id == "u2" and req.password == "employee123":
        return {
            "success": True,
            "user_id": "u2",
            "name": "Rahul",
            "role": "Finance Specialist",
            "department": "FINANCE",
            "branch": "BANASHANKARI"
        }

    # Verify credentials against the z_employees database
    from app.data.csv_loader import load_employees
    import pandas as pd

    df_emp = load_employees()
    df_emp["id"] = df_emp["id"].astype(str).str.strip()
    target_id = req.employee_id.strip()

    emp_rows = df_emp[df_emp["id"] == target_id]
    if emp_rows.empty:
        # fallback lookup by name
        emp_rows = df_emp[df_emp["name"].astype(str).str.lower() == target_id.lower()]

    if not emp_rows.empty:
        if req.password != "dealer123":
            raise HTTPException(
                status_code=401,
                detail="Invalid password"
            )

        emp = emp_rows.iloc[0]
        dept = str(emp.get("department", "")).strip()
        role_rights = str(emp.get("role_rights", "")).strip().lower()
        designation = str(emp.get("designation", "")).strip().lower()

        # Any designation containing manager or manager role_rights is considered Admin
        is_manager = (
            role_rights in {"manager", "admin"}
            or "manager" in designation
            or "director" in designation
            or "chief" in designation
            or "head" in designation
        )

        role = "Dealer Sales Executive"
        if dept.lower() == "finance":
            role = "Finance Specialist"

        if is_manager:
            role = "Administrator"
            dept = "ADMIN"

        return {
            "success": True,
            "user_id": str(emp["id"]),
            "name": str(emp["name"]),
            "role": role,
            "department": dept,
            "branch": str(emp.get("reporting_location", "YELAHANKA"))
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Employee ID"
    )


@router.post("/auth/register")
def register(req: RegisterRequest):

    new_id = "USR" + str(abs(hash(req.email)) % 100000)

    return {
        "success": True,
        "employee_id": new_id,
        "name": req.name,
        "department": req.department
    }