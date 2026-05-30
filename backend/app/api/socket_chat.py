from fastapi import APIRouter, WebSocket
from app.llm.groq_client import llm

router=APIRouter()

@router.websocket("/ws/chat")

async def websocket_chat(websocket:WebSocket):
    await websocket.accept()

    while True:
        data = await websocket.receive_text()

        response = llm.invoke(data)

        await websocket.send_text(response.content)