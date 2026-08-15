from sqlalchemy import Column, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    uuid = Column(String(36),  primary_key=True)
    id   = Column(String(10),  nullable=False, index=True)
    pw   = Column(String(255), nullable=False)
