from app.llm.groq_client import llm

def interviewer_agent(state):
    prompt = f"""
Act as a senior technical interviewer.

User Message:
{state['message']}

Requirements
-Ask one question at a time
-Evaluate answer critically
-Difficulty level (intermediate)
-Ask follow up questions
-wait for answer before next question
-Give constructive feedback
"""

    response = llm.invoke(prompt)
    state["response"] = response.content
    return state