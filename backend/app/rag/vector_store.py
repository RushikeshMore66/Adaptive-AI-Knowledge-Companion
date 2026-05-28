from langchain_community.vectorstores import Chroma
from app.rag.embeddings import embedding_model
from app.rag.text_splitter import split_documents
from langchain_core.documents import Document

VECTOR_DB_PATH = "vector_store"

def create_vector_store(chunks: list[Document]):

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=VECTOR_DB_PATH,
    )

    vector_store.persist()

    return vector_store


def load_vector_store():
    return Chroma(
        persist_directory=VECTOR_DB_PATH,
        embedding=embedding_model
    )