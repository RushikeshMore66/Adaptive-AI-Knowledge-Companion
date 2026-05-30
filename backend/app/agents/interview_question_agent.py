from app.llm.groq_client import llm


def generate_question(
    topic,
    difficulty
):

    prompt = f"""
    Act as a senior interviewer.

    Topic:
    {topic}

    Difficulty:
    {difficulty}

    Ask ONE interview question.

    Do not provide answer.
    """

    response = llm.invoke(prompt)

    return response.content 