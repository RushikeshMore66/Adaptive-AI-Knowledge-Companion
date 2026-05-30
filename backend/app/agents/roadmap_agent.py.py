from app.llm.groq_client import llm


def roadmap_agent(skills,weak_topics):
    prompt = f"""
Create roadmap.

Current Skills:
{skills}

Weak Topics:
{weak_topics}

Target Role:
AI Engineer

Duration:
3 Months
"""

    return llm.invoke(prompt).content
