from sqlalchemy     import select
from sqlalchemy.exc import IntegrityError
from db             import orm

def find_user(db, id: str):
    query = select(orm.User).where(orm.User.id == id)
    user  = db.scalar(query)

    return user

def create_user(db, id: str, uuid: str, pw: str):
    try:
        user = orm.User(id=id, uuid=uuid, pw=pw)
        db.add(user)
        db.commit()
        return True
    except IntegrityError:
        db.rollback()
        return False
