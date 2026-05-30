from app.llm.groq_client import llm
import 
def planner_agent(state):

    prompt = f"""
    You are an expert AI planning agent.

    User Goal:
    {user_query}

    Break the tasks into steps.
    
    Format:

    {{
      "objective":"",
      "steps":[],
      "tools":[]
    }}
    """
    response = llm.invoke(prompt)
    return response.content