from dataclasses import dataclass

@dataclass
class Task:

    name: str

    agent: str

    status: str

    result: str = ""