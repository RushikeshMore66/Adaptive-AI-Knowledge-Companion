from fastapi import FastAPI
from app.api.upload import router as upload_router

app = FastAPI(
    title="Adaptive RAG AI",
    version="1.0.0"
)

app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Adaptive RAG AI"}

