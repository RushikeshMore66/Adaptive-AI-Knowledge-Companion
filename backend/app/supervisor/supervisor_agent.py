from backend.app.voice.tts import speak
from app.voice.voice_manager import listen
from asyncio import taskgroups
from typing import List


class Supervisor:
    def decide(self):
        tasks=[]
        query=listen()
        response=Supervisor.run(query)
        speak(response)

        if "research" in query:
            if "latest" in query:
                tasks.append("hybrid")

            elif "compare" in query:
                tasks.append("hybrid")

            else:
                tasks.append("research")

        if "teach" in text:
            tasks.append("tutor")

        if "plan" in text:
            tasks.append("planner")

        return tasks

