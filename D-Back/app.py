import uvicorn
import fastapi

from router import router as app_router

app = fastapi.FastAPI()
app.include_router(app_router.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
