from langgraph.graph import StateGraph
from app.graph.state import AgentState
from app.agents.router_agent import router_node
from app.agents.tutor_agent import tutor_agent
from app.agents.evaluator_agent import evaluator_agent


builder = StateGraph(AgentState)

builder.add_node("router",router_node)
builder.add_node("tutor",tutor_agent)
builder.add_node("evaluator",evaluator_agent)

workflow = builder.compile()
