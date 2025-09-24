from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.embeddings.base import Embeddings
from google import genai
import os

# Make sure your environment variable GOOGLE_API_KEY is set
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("Missing GOOGLE_API_KEY environment variable!")

# Initialize client with API key
client = genai.Client(api_key=API_KEY)


class GeminiEmbeddings(Embeddings):
    """LangChain wrapper for Google Gemini embeddings"""
    
    def embed_documents(self, texts):
        if not texts:
            return []
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=texts
        )
        # Each response.embeddings[i].values is a list of floats
        return [e.values for e in response.embeddings]

    def embed_query(self, text):
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=[text]
        )
        return response.embeddings[0].values


def create_vector_store(texts, metadatas=None):
    """
    Build a FAISS vector store from texts with optional metadatas.

    texts: list[str]
    metadatas: optional list[dict] aligned with texts (e.g., {"url": ..., "title": ...})
    """
    filtered_pairs = [
        (t, (metadatas[i] if metadatas and i < len(metadatas) else None))
        for i, t in enumerate(texts)
        if isinstance(t, str) and t.strip()
    ]
    if not filtered_pairs:
        return None

    filtered_texts = [t for t, _ in filtered_pairs]
    filtered_metadatas = [m for _, m in filtered_pairs] if metadatas else None

    embeddings = GeminiEmbeddings()
    vectorstore = FAISS.from_texts(
        texts=filtered_texts,
        embedding=embeddings,
        metadatas=filtered_metadatas
    )
    return vectorstore
