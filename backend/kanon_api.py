import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://indiankanoon.org"

def search_cases(query, max_results=10):
    """
    Scrape search results from Indian Kanoon website.
    Returns a list of case URLs and titles.
    """
    search_url = f"{BASE_URL}/search/?formInput={query}"
    response = requests.get(search_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    results = []

    for result in soup.select(".result_title")[:max_results]:
        title_tag = result.find("a")
        if title_tag and title_tag.get("href"):
            results.append({
                "title": title_tag.get_text(strip=True),
                "url": BASE_URL + title_tag["href"]
            })
    return results


def get_case_content(case_url):
    """
    Scrape the full text of a case from its URL.
    """
    try:
        response = requests.get(case_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        selectors = [
            "div#maincontent",
            "div.content",
            "pre",
            "div.article_text",
            "div.judgement-text"
        ]

        for sel in selectors:
            content_div = soup.select_one(sel)
            if content_div:
                text = content_div.get_text(separator="\n", strip=True)
                if text:
                    return text

        paragraphs = soup.find_all("p")
        if paragraphs:
            return "\n".join(p.get_text(strip=True) for p in paragraphs)

    except Exception:
        return None

    return "No content found."


# =========================
# Parallel Case Fetching
# =========================
def fetch_case_text(case):
    """
    Fetch case content safely for a single case dictionary.
    """
    case['text'] = get_case_content(case['url'])
    return case

def fetch_cases_parallel(cases, max_workers=5):
    """
    Fetch multiple cases in parallel using ThreadPoolExecutor.
    """
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(fetch_case_text, case): case for case in cases}
        for future in as_completed(futures):
            results.append(future.result())
    return results


# # Example usage
# query = "Cheat in Neet exam"
# cases = search_cases(query, max_results=5)
# # Fetch content in parallel
# cases = fetch_cases_parallel(cases, max_workers=5)
# for case in cases:
#     print(f"Title: {case['title']}")
#     print(f"Content snippet: {case['text'][:1000]}...\n")
