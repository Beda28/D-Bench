from fastapi import APIRouter, Depends

from controller.auth import login as login_user, signup as signup_user
from db.connection import get_db
from schema.auth import User

router = APIRouter()

@router.post("/login")
def login(user: User, db = Depends(get_db)):
    return login_user(user, db)

@router.post("/signup")
def signup(user: User, db = Depends(get_db)):
    return signup_user(user, db)
