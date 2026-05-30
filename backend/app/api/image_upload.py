from fastapi import UploadFile,File,APIRouter

import os

router=APIRouter()

@router.post("/image/upload")

async def upload_image(file:UploadFile=File(...)):
    file_path = os.path.join(
        "uploads",
        file.filename
    )