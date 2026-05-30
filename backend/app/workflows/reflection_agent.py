from app.llm.groq_client import llm

def reflect(goal,results):
    prompt = f"""
Goal:

{goal}

Results:

{results}

Evaluate:

1. Goal completion

2. Missing work

3. Improvements

4. Next actions
"""