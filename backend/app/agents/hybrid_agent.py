from sqlalchemy.orm import query
from app.retrievers.hybrid_retriever import retrieve_hybrid_context
from app.llm.groq_client import llm

def hybrid_agent(state):

    query=state["message"]

    contexts = retrieve_hybrid_context(query)


    prompt = f"""

    You are an expert AI assistant.

    Use BOTH sources.

    PDF Knowledge:
    {contexts['pdf_context']}

    Web Knowledge:
    {contexts['web_context']}

    User Questions:
    {query}

    Instructions:
    1.Merge both sources.
    2.Mention differences.
    3.Mentions recent updates.
    4.Give clear answer.
    """

    response = llm.invoke(prompt)
    state["response"] = response.content
    return state

        

    

