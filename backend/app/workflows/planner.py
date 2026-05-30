from app.llm.groq_client import llm

def create_workflow_plan(goal):
    prompt = f"""
Create execution plan.

Goal:

{goal}

Generate:

1. Milestones

2. Tasks

3. Dependencies

4. Success Criteria
"""