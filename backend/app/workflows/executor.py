from asyncio import taskgroups
from asyncio import taskgroups
from app.agents.research_agent import research_agent
from app.agents.tutor_agent import tutor_agent
from app.agents.interviewer_agent import interviewer_agent
from typing import List
from app.workflows.task import Task

AGENTS = {

    "research":
    research_agent,

    "tutor":
    tutor_agent,

    "interviewer":
    interviewer_agent
}

def execute_task(task,state):
    agent = AGENTS.get(
        task.agent
    )
    result = agent(state)
    task.result = (
        result["response"]
    )

    task.status = (
        "completed"
    )