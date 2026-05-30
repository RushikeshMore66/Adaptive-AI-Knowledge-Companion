from app.llm.groq_client import llm

def evaluator_agent(state):
    prompt = f"""
    Evaluate the answer based on the question and context 

User Message:
{state['message']}

Return:

    Score out of 10

    Strengths

    Weaknesses

    Ideal Answer
"""

    response = llm.invoke(prompt)
    state["feedback"] = response.content
    return state