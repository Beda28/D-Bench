import fastapi

from controller import auth as controller
from db         import connection
from schema     import auth as schema

router = fastapi.APIRouter()

@router.post("/login")
def login(user: schema.User, db = fastapi.Depends(connection.get_db)):
    return controller.login(user, db)

@router.post("/signup")
def signup(user: schema.User, db = fastapi.Depends(connection.get_db)):
    return controller.signup(user, db)
