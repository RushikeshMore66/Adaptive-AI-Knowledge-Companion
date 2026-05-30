from app.retrievers.pdf_retriever import retrieve_pdf_context 

from app.retrievers.web_retriever import retrieve_web_context

def retrieve_hybrid_context(query):

    pdf_context=retrieve_pdf_context(query)
    web_context=retrieve_web_context(query)

    return {
        "web_context":web_context,
        "pdf_context":pdf_context
    }   