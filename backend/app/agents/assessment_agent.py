from app.llm.groq_client import llm

def assess_answer(question,answer):
    prompt=f"""
    Evaluate the answer based on the question and context
    
    User question:
    {question}

    Answer:
    {answer}
    
    Return JSON:
    {{
        "score":int,
        "strengths":[str],
        "weaknesses":[str],
        "feedback":str,
        "improved_answer":str,
    }}
    """

    response = llm.invoke(prompt)
    return response.content
    
    
