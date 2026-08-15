from os import getenv
from uuid import uuid4

import bcrypt
import jwt
from fastapi import HTTPException

from repository.auth import create_user, find_users
from schema.auth import User

JWT_SECRET    = getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

if JWT_SECRET is None:
    raise RuntimeError("JWT_SECRET 환경변수가 필요합니다.")


def login(user: User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    data = next(
        (data for data in find_users(db, id) if bcrypt.checkpw(pw_bytes, data.pw.encode())),
        None,
    )
    if data is None:
        raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 올바르지 않습니다.")

    return {
        "message": "로그인에 성공했습니다.",
        "token": jwt.encode({"uuid": data.uuid, "id": data.id}, JWT_SECRET, algorithm=JWT_ALGORITHM),
    }


def signup(user: User, db):
    id = user.id.strip()
    pw = user.pw.strip()

    if not id or not pw:
        raise HTTPException(status_code=400, detail="아이디와 비밀번호를 입력해 주세요.")

    pw_bytes = pw.encode()
    if len(pw_bytes) > 72:
        raise HTTPException(status_code=400, detail="비밀번호가 너무 깁니다.")

    if any(bcrypt.checkpw(pw_bytes, data.pw.encode()) for data in find_users(db, id)):
        raise HTTPException(status_code=409, detail="동일한 아이디와 비밀번호의 계정이 이미 존재합니다.")

    uuid      = str(uuid4())
    hashed_pw = bcrypt.hashpw(pw_bytes, bcrypt.gensalt()).decode()

    if not create_user(db, id, uuid, hashed_pw):
        raise HTTPException(status_code=409, detail="계정 생성 중 충돌이 발생했습니다.")

    return {
        "message": "회원가입에 성공했습니다.",
        "token": jwt.encode({"uuid": uuid, "id": id}, JWT_SECRET, algorithm=JWT_ALGORITHM),
    }
