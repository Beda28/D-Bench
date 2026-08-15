from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from db.orm import User

def find_users(db, id: str):
    return db.scalars(select(User).where(User.id == id)).all()

def create_user(db, id: str, uuid: str, pw: str):
    try:
        db.add(User(id=id, uuid=uuid, pw=pw))
        db.commit()
        return True
    except IntegrityError:
        db.rollback()
        return False
