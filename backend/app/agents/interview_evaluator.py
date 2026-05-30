from app.llm.groq_client import llm


def evaluate_answer(
    question,
    answer
):

    prompt = f"""
    Evaluate candidate answer.

    Question:
    {question}

    Answer:
    {answer}

    Return JSON:

    {{
      "score":0,
      "strengths":[],
      "weaknesses":[],
      "feedback":""
    }}
    """
    response = llm.invoke(prompt)

    return response.content 