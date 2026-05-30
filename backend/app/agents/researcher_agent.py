from openai.types.responses import response
from tools.web_search import search_web
from llm.groq_client import llm

def researcher_agent(state):
    
    query = state["message"]
    search_result = search_web(query)

    prompt = f"""
    Use the search results below.

    Search Results:
    {search_result}

    User Questions:
    {query}

    Generate a detailed answer.
    """

    response = llm.invoke(prompt)
    state['response'] = response.content
    return state