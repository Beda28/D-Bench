import fastapi
import bcrypt
from uuid import uuid4

from repository import auth as repository
from schema     import auth as schema

def login(user: schema.User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise fastapi.HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise fastapi.HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    data = repository.find_user(db, id)
    if data is None or not bcrypt.checkpw(pw_bytes, data.pw.encode()):
        raise fastapi.HTTPException(status_code=401, detail="아이디 또는 비밀번호가 올바르지 않습니다.")

    return {"message": "로그인에 성공했습니다."}

def signup(user: schema.User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise fastapi.HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise fastapi.HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    if repository.find_user(db, id) is not None:
        raise fastapi.HTTPException(status_code=409, detail="이미 사용 중인 아이디입니다.")

    uuid      = str(uuid4())
    hashed_pw = bcrypt.hashpw(pw_bytes, bcrypt.gensalt()).decode()

    if not repository.create_user(db, id, uuid, hashed_pw):
        raise fastapi.HTTPException(status_code=409, detail="이미 사용 중인 아이디입니다.")

    return {"message": "회원가입에 성공했습니다."}
