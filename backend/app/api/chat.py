from fastapi.openapi import docs
from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.vector_store import load_vector_store
from app.llm.groq_client import llm

router = APIRouter()

class ChatRequest(BaseModel):
    questions: 
    
@router.post("/chat")

async def chat(request: ChatRequest):

    vector_store = load_vector_store()
    retriver = vector_store.as_retriever(

        search_kwargs={"k": 3} # 3 similar chunks
    )

    docs = retriver.get_relevant_documents(request.questions)
    context = "\n\n".join(doc.page_content for doc in docs)
    
    prompt = f"""
    Answer the question using the context below.

    Context:
    {context}

    Question:
    {request.question}
    """

    response = llm.invoke(prompt)
    return {"answer": response.content}