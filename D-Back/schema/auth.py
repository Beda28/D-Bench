from pydantic import BaseModel, Field

class User(BaseModel):
    id: str = Field(min_length=1, max_length=10)
    pw: str = Field(min_length=1, max_length=255)
