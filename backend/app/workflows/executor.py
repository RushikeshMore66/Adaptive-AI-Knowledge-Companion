from asyncio import taskgroups
from app.agents.researcher_agent import researcher_agent
from app.agents.tutor_agent import tutor_agent
from app.agents.interviewer_agent import interviewer_agent
from typing import List
from app.workflows.task import Task

AGENTS = {

    "research":
    researcher_agent,

    "tutor":
    tutor_agent,

    "interviewer":
    interviewer_agent
}

def execute_task(task,state):
    agent = AGENTS.get(
        task.agent
    )
    if agent is None:
        raise ValueError(f"Agent {task.agent} not found.")
    result = agent(state)
    task.result = (
        result["response"]
    )

    task.status = (
        "completed"
    )