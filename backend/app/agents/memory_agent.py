from app.llm.groq_client import llm

def extract_memory(message):
    prompt = f"""
Extract important long-term memory.

Message:
{message}

Return JSON :
 {{
      "type":"",
      "content":""
    }}

    If nothing important,
    return null.
"""

    result= llm.invoke(prompt)
    return result.content