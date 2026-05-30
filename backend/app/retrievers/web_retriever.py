from app.tools.web_search import search_web

def retrieve_web_context(query):
    result=search_web(query)

    context=[]
    for item in result["results"]:
        context.append(item["content"])
    
    return "\n\n".join(context)