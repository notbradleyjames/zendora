# 🔥 Firecrawl

**Category:** Research & Intelligence  
**Purpose:** Web scraping, crawling, search, and autonomous research via MCP.  
**Plan:** Growth / Free (500 credits)  
**Cost:** $0/$19/mo

---

## Technical Overview

Firecrawl is Zendora's primary web intelligence pipeline. Unlike basic scrapers, it handles anti-bot, JS rendering, dynamic content, and outputs clean structured data (Markdown, JSON, HTML).

### Core Capabilities

1. **Scrape (`/scrape`)**: Turn any single URL into clean data.
   - Clean Markdown (`formats=["markdown"]`)
   - Structured JSON via LLM extract (`formats=["json"]`, providing a JSON schema)
   - Brand Identity (`formats=["branding"]`): Extracts color scheme, typography, spacing, UI components, and logo automatically. Highly useful for our Digital Design and Marketing pillars.
   - You can also trigger interactions (clicks, inputs) before scraping.

2. **Crawl (`/crawl`)**: Asynchronously map and scrape entire websites.
   - Use `maxDepth` and `limit` to prevent excessive credit usage.
   - Generates clean markdown pages for all subpages.

3. **Search (`/search`)**: Use web search to fetch targeted web results + corresponding markdown data without knowing the specific URLs in advance.

4. **Map (`/map`)**: Fast way to discover URLs on a domain without doing a heavy content crawl.

5. **Interact (`/interact`)**: Perform real-browser interactions (e.g., clicking on elements, searching internal search bars) prior to extraction.

## Zendora Integration via MCP

Firecrawl is plugged directly into our agents via the **Model Context Protocol (MCP)**. This means our assistant tools understand how to call tools like `firecrawl_scrape`, `firecrawl_search`, and `firecrawl_crawl`.

Configuration is defined in `.vscode/mcp.json`. 

## Best Practices & Limits

- **Avoid Monolithic Crawls**: Unless we need an entire site dumped, use `firecrawl_map` to get URLs, then `firecrawl_batch_scrape` to pull precisely what we need. This saves tokens and protects our credit limit.
- **LLM Extraction**: When we just need metadata (like pricing tables, company mission, team members), use `formats=["json"]` with a strict schema instead of dumping the raw markdown to our context window.
- **Data Retention**: For recurring usage or specific projects, store scrapes locally in this directory's `data/` folder, NOT inside the general codebase tracking.

---

## Knowledge & Configurations

Any custom JSON extraction schemas, API response examples, or large data pulls from Firecrawl for Zendora's internal use should be saved in `business/operations/tools/firecrawl/data/`.
