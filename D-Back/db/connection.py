import os

from collections    import abc
from sqlalchemy     import URL, create_engine
from sqlalchemy.orm import Session as DBSession, sessionmaker

DB_URL = URL.create(
    drivername = "mysql+pymysql",
    username   = os.getenv("DB_USER", "d_bench_user"),
    password   = os.getenv("DB_PASSWORD", "d_bench_password"),
    host       = os.getenv("DB_HOST", "localhost"),
    port       = int(os.getenv("DB_PORT", "3306")),
    database   = os.getenv("DB_NAME", "d_bench"),
)

engine  = create_engine(DB_URL, pool_pre_ping=True)
Session = sessionmaker(bind=engine, expire_on_commit=False)

def get_db() -> abc.Generator[DBSession, None, None]:
    db = Session()

    try:     yield db
    finally: db.close()
