from app.agents.router_agent import router_request
from app.graph.state import AgentState


def router_node(state:AgentState):

    mode=router_request(
        state["message"]
        )
    state["mode"] = mode

    return state
    