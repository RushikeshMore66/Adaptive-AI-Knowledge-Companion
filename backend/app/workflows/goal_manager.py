from dataclasses import dataclass
from typing import List

@dataclass
class Goal:

    title: str

    description: str

    priority: int

    status: str

    tasks: List[str]