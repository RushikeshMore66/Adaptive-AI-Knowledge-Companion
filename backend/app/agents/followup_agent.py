from app.llm.groq_client import llm


def generate_followup(
    question,
    answer
):

    prompt = f"""
    Original Question:

    {question}

    Candidate Answer:

    {answer}

    Create one deeper follow-up question.

    Focus on missing concepts.
    """

    response = llm.invoke(prompt)

    return response.content 