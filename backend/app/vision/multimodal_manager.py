from app.vision.ocr_service import extract_text

async def process_image(image_path):
    return extract_text(image_path)
