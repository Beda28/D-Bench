from sqlalchemy     import Column, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id   = Column(String(10),  primary_key=True)
    uuid = Column(String(36),  nullable=False, unique=True)
    pw   = Column(String(255), nullable=False)
