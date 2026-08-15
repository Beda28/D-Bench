from collections.abc import Generator
from os import getenv

from sqlalchemy import URL, create_engine
from sqlalchemy.orm import Session, sessionmaker

DB_URL = URL.create(
    drivername = "mysql+pymysql",
    username   = getenv("DB_USER", "d_bench_user"),
    password   = getenv("DB_PASSWORD", "d_bench_password"),
    host       = getenv("DB_HOST", "localhost"),
    port       = int(getenv("DB_PORT", "3306")),
    database   = getenv("DB_NAME", "d_bench"),
)

engine       = create_engine(DB_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:     yield db
    finally: db.close()
