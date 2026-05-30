import os

from fastapi import APIRouter, UploadFile, File
from app.rag.pdf_loader import load_pdf
from app.rag.text_splitter import split_documents
from app.rag.vector_store import create_vector_store

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure upload dir exists

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    docs = load_pdf(file_path)
    chunks = split_documents(docs)
    create_vector_store(chunks)

    return {"message": "PDF uploaded successfully",
            "chunks_added": len(chunks)}