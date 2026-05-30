from sqlalchemy.orm import query
from research.planner import (create_research_plan)
from research.searcher import (search_topic)
from research.collector import (collect_evidence)
from research.report_generator import (generate_report)


def run_research(query):
    plan = create_research_plan(
    query
)

for question in sub_questions:

    results = search_topic(
        question
    )

    evidence += collect_evidence(
        results
    )

report = generate_report(
    query,
    evidence
)