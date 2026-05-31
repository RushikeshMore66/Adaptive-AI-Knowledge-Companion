from app.tools.web_search import search_web
from app.llm.groq_client import llm

def researcher_agent(state):
    
    query = state.get("message","")
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