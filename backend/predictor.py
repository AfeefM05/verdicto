from kanon_api import search_cases, get_case_content
from vectorstore import create_vector_store
from google import genai
import os
import re
import json


client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def predict_outcome(user_case: str):
    """
    Predict likely case outcome using AI based on related past cases.
    """

    # 1️⃣ Generate legal search query
    search_prompt = f"""
You are an expert Indian legal AI assistant.
Given these case facts, generate a precise **search query** suitable for finding relevant Indian legal cases on a legal database like Indian Kanoon.

Case facts:
{user_case}

Requirements:
- Output **only one line** in natural language.
- Include **relevant Indian laws, sections, or keywords** if applicable.
- Make it precise for legal search; do **not** use generic phrases.
- Return **only the query**, nothing else, no explanation.
- DOnt Give Output This " Some " or " .."  Like That DOnt Give In response only one best Line Match the Case To Give Only One

Example output:
"Liability for defective vehicles and accident compensation."
"About compensation for deaths and injuries due to a road accident caused by a vehicle defect"
"""

    search_chat = client.chats.create(model="gemini-2.5-flash-lite")
    query_response = search_chat.send_message(search_prompt)

    query = query_response.text.strip().replace("\n", " ").strip('"').strip("'")
    print("Generated legal search query:", query)

    # 2️⃣ Search related cases
    related_cases_data = search_cases(query, max_results=10)

    # 3️⃣ Fetch full text for each result
    for case in related_cases_data:
        case['text'] = get_case_content(case['url'])

    related_cases_texts = [case["text"] for case in related_cases_data if case.get("text")]
    related_cases_meta = [
        {
            "url": case.get("url"),
            "title": case.get("title")
        }
        for case in related_cases_data if case.get("text")
    ]
    if not related_cases_texts:
        return "No relevant cases found to analyze."

    # 4️⃣ Create vector store
    vectorstore = create_vector_store(related_cases_texts, metadatas=related_cases_meta)
    if not vectorstore:
        return "Vector store creation failed."

    # 5️⃣ Retrieve relevant cases (avoid retriever.invoke to bypass langsmith/pydantic issue)
    relevant_docs = vectorstore.similarity_search(user_case, k=4)
    combined_chunks = []
    for doc in relevant_docs:
        url = (doc.metadata or {}).get("url", "")
        title = (doc.metadata or {}).get("title", "")
        header = f"SOURCE: {title} — {url}".strip()
        combined_chunks.append(header)
        combined_chunks.append(doc.page_content)
    combined_text = "\n\n".join(combined_chunks)

    if not combined_text.strip():
        return "No relevant context could be found from retrieved cases."

    # 6️⃣ Generate final prediction
    print("Generating final prediction...")
    print(combined_text)
    prompt = f"""
You are an expert Indian legal AI assistant.
User case facts:
{user_case}

Consider these previous cases:
{combined_text}

Return the output strictly as JSON with the following keys:
- "probability": estimated percentage chance of winning the case (number between 0-100)
- "timeline": approximate duration or end period of the case based on similar past cases
- "feature_points": list of key points favoring win/loss and any major influencing factors

Example JSON:
{{
  "probability": 75,
  "timeline": "6-12 months",
  "feature_points": [
    "Plaintiff has strong documentary evidence",
    "Defendant has prior similar case loss",
    "Possible delay due to procedural issues"
  ]
  "related_records": [
    {{
      "title": "Case Title",
      "url": "https://example.com",
      "snippet": "Case snippet"
    }}
  ]
}}
Do **not** include any explanation outside the JSON.
"""
    chat = client.chats.create(model="gemini-2.0-flash-exp")
    response = chat.send_message(prompt)

    raw_text = response.text.strip()

    # 1️⃣ Remove ```json or ``` at start/end
    raw_text = re.sub(r"^```json\s*|^```|```$", "", raw_text, flags=re.IGNORECASE).strip()

    # 2️⃣ Remove wrapping quotes if present
    if (raw_text.startswith('"') and raw_text.endswith('"')) or (raw_text.startswith("'") and raw_text.endswith("'")):
        raw_text = raw_text[1:-1].strip()
        # Unescape quotes inside
        raw_text = raw_text.replace('\\"', '"').replace("\\'", "'")

    # 3️⃣ Try parsing as JSON
    try:
        result_json = json.loads(raw_text)
    except json.JSONDecodeError:
        result_json = {"error": "AI did not return valid JSON", "raw_response": raw_text}

    return result_json