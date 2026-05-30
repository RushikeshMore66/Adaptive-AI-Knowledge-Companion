from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.vector_store import load_vector_store
from app.llm.groq_client import llm

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")
async def chat(request: ChatRequest):

    vector_store = load_vector_store()
    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3}  # 3 similar chunks
    )

    docs = retriever.invoke(request.question)
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