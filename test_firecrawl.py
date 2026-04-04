import os
import json
import urllib.request
import urllib.parse
import urllib.error

def main():
    api_key = "fc-4891a42f78aa46bd9155a957a4f36a46"
    base_url = "https://api.firecrawl.dev/v1"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    print("Testing 'search' for latest ai agent tools...")
    search_data = json.dumps({"query": "latest AI agent tools 2026", "limit": 3}).encode("utf-8")
    req = urllib.request.Request(f"{base_url}/search", data=search_data, headers=headers, method="POST")
    search_result = {}
    try:
        with urllib.request.urlopen(req) as res:
            search_result = json.loads(res.read().decode())
            print(f"Search successful. Found {len(search_result.get('data', []))} results.")
    except urllib.error.URLError as e:
        print(f"Search failed: {e}")
        try:
           print(e.read().decode())
        except:
           pass
        
    print("Testing 'scrape' on firecrawl docs...")
    scrape_data = json.dumps({"url": "https://docs.firecrawl.dev", "formats": ["markdown"]}).encode("utf-8")
    req = urllib.request.Request(f"{base_url}/scrape", data=scrape_data, headers=headers, method="POST")
    scrape_result = {}
    try:
        with urllib.request.urlopen(req) as res:
            scrape_result = json.loads(res.read().decode())
            print("Scrape successful.")
    except urllib.error.URLError as e:
        print(f"Scrape failed: {e}")
        try:
           print(e.read().decode())
        except:
           pass
        
    output_data = {
        "search_result": search_result,
        "scrape_result_metadata": scrape_result.get("data", {}).get("metadata"),
        "scrape_result_markdown": str(scrape_result.get("data", {}).get("markdown", ""))[:500] + "...\n[Content Truncated]"
    }
    
    data_dir = "operations/tools/firecrawl/data"
    os.makedirs(data_dir, exist_ok=True)
    
    out_path = os.path.join(data_dir, "test_output.json")
    with open(out_path, "w") as f:
        json.dump(output_data, f, indent=2)
        
    print(f"Data saved successfully to {out_path}!")

if __name__ == "__main__":
    main()
