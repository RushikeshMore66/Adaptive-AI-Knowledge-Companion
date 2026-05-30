from llm.groq_client import llm

def tutor_agent(state):

    prompt = f"""
    You are an expert AI tutor.

    Teach the concept clearly.

    User Request:
    {state["message"]}

    Requirments:
    -Explain simply
    -Give examples
    -Give analogy
    -Ask one follow-up question
    """
    response = llm.invoke(prompt)
    state["response"]=response.content
    return state