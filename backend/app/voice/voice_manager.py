from app.voice.recorder import record_audio
from app.voice.stt import transcribe_audio
from app.voice.tts import speak
import os

def listen():
    audio=record_audio
    text=transcribe_audio(audio)
    return text
