from app.llm.groq_client import llm

def synthesize(outputs,query):
    prompt = f"""
    User question:
    {query}

    Agent results:
    {outputs}

    create one final answer.
    
    Merge all information.

    Remove duplication.
    """
    response=llm.invoke(prompt)
    return response.content