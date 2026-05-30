from app.llm.groq_client import llm


def create_research_plan(query):
    prompt = f"""
    Create a research plan.

    User Question:

    {query}

    Return JSON:

    {{
      "objective":"",
      "sub_questions":[]
    }}
    """

    response = llm.invoke(prompt)

    return response.content