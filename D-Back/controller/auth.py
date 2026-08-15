import bcrypt
from fastapi import HTTPException
from uuid import uuid4

from repository.auth import create_user, find_user
from schema.auth import User

def login(user: User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    data = find_user(db, id)
    if data is None or not bcrypt.checkpw(pw_bytes, data.pw.encode()):
        raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 올바르지 않습니다.")

    return {"message": "로그인에 성공했습니다."}

def signup(user: User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    if find_user(db, id) is not None:
        raise HTTPException(status_code=409, detail="이미 사용 중인 아이디입니다.")

    uuid      = str(uuid4())
    hashed_pw = bcrypt.hashpw(pw_bytes, bcrypt.gensalt()).decode()

    if not create_user(db, id, uuid, hashed_pw):
        raise HTTPException(status_code=409, detail="이미 사용 중인 아이디입니다.")

    return {"message": "회원가입에 성공했습니다."}
