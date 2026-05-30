from app.llm.groq_client import llm

def verify_evidence(evidence):

    prompt = f"""
Review evidence.

Evidence:

{evidence}

Identify:   

1. Consistent findings

2. Contradictions

3. Confidence level
"""