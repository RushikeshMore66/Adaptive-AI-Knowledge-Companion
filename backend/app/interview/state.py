from dataclasses import dataclass
from typing import List,Dict,Optional

@dataclass
class InterviewState:

    session_id: str

    topic: str

    difficulty: str

    current_question: str = ""

    question_count: int = 0

    score: float = 0

    weaknesses: Optional[List[str]] = None

    strengths: Optional[List[str]] = None