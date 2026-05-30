def collect_evidence(
    search_results
):

    evidence = []

    for item in search_results[
        "results"
    ]:

        evidence.append({

            "title":
            item.get("title"),

            "content":
            item.get("content")

        })

    return evidence