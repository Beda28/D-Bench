import pydantic

class User(pydantic.BaseModel):
    id: str = pydantic.Field(min_length=1, max_length=10)
    pw: str = pydantic.Field(min_length=1, max_length=255)
