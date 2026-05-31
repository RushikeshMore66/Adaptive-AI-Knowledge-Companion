from app.agents.tutor_agent import tutor_agent
from app.agents.researcher_agent import researcher_agent
from app.agents.hybrid_agent import hybrid_agent

AGENTS = {
    "tutor": tutor_agent,
    "researcher": researcher_agent,
    "hybrid": hybrid_agent,
}

def execute_plan(plan,state):

    outputs=[]

    for tool in plan["tools"]:

        if tool in AGENTS:

            results = AGENTS[tool](state)

            outputs.append(results["response"])

            return outputs
            