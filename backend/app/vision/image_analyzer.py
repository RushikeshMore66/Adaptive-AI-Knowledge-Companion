from app.llm.groq_client import llm

def analyze_image(extracted_text):
    prompt = f"""
Analyze image information.

Image Content:

{extracted_text}

Identify:

1. Main Concepts

2. Components

3. Relationships

4. Summary
"""

    response=llm.invoke(prompt)
    return response.content