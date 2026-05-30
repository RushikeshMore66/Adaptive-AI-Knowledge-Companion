from agents.router_agent import router_request


def router_node(state:AgentState):

    mode=router_request(
        state["message"]
        )
    state["mode"] = mode

    return state
    