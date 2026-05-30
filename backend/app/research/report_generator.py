from app.llm.groq_client import llm

def generate_report(query,evidence):
    prompt = f"""
Create research report.

Question:
{query}

Evidence:
{evidence}

Include:

Executive Summary

Key Findings

Comparisons

Recommendations

Conclusion
"""
