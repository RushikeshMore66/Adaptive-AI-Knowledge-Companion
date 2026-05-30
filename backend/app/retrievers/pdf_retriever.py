from app.rag.vector_store import load_vector_store

def retrieve_pdf_context(query):

    vectorstore=load_vector_store()
    retriver=vectorstore.as_retriever(search_type="mmr",search_kwargs={"k":5})
    docs=retriver.invoke(query)
    context = "\n\n".join(doc.page_content for doc in docs)
    return context