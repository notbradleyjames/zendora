# 🔥 Firecrawl Recipes — Web Intelligence for Zendora

> *Recipes for using Firecrawl's MCP tools to research, extract, and analyze web data.*

---

## 🧰 Available Tools (Quick Reference)

| Tool | When to Use |
|---|---|
| `firecrawl_search` | You don't know which site has the info — search the web |
| `firecrawl_scrape` | You know the exact URL — grab its content |
| `firecrawl_batch_scrape` | Multiple known URLs — scrape them all efficiently |
| `firecrawl_map` | Discover all URLs on a website |
| `firecrawl_crawl` | Scrape an entire site/section (use with limits!) |
| `firecrawl_extract` | Pull structured data (prices, names, etc.) using LLM |
| `firecrawl_agent` | Complex research across multiple unknown sources |

---

## 📖 Recipe 1: Research a Topic

**Use case**: You need to find the latest best practices, tools, or strategies for something.

**Tools**: `firecrawl_search` → `firecrawl_scrape`

**Steps**:
1. Search for the topic with `firecrawl_search` (limit 5–10 results)
2. Review the URLs returned
3. Scrape the most relevant 2–3 pages with `firecrawl_scrape` (use `onlyMainContent: true`)
4. Synthesize findings

**Example prompt to give the agent**:
> "Use Firecrawl to search for 'best AI automation tools for agencies 2026' and scrape the top 3 results for their main content."

---

## 📖 Recipe 2: Analyze a Competitor

**Use case**: You want to understand what a competitor offers, how they position, and what their pricing looks like.

**Tools**: `firecrawl_map` → `firecrawl_batch_scrape` or `firecrawl_scrape` with branding format

**Steps**:
1. Map the competitor's site to discover all pages
2. Identify key pages: homepage, services, pricing, about
3. Batch scrape those pages
4. Optionally use branding format to extract their visual identity

**Example prompt**:
> "Map example-agency.com, then scrape their homepage, services page, and pricing page. Also extract their branding."

---

## 📖 Recipe 3: Extract Structured Data

**Use case**: You need specific data points from pages — prices, features, contact info, etc.

**Tools**: `firecrawl_extract` with JSON schema

**Steps**:
1. Define what data you need as a JSON schema
2. Pass the URL(s) and schema to `firecrawl_extract`
3. Get clean, structured data back

**Example prompt**:
> "Extract the pricing tiers (name, price, features list) from these 3 SaaS pricing pages: [url1, url2, url3]"

---

## 📖 Recipe 4: Deep Research (Autonomous)

**Use case**: Complex question that requires browsing multiple sites, following links, and synthesizing — let the agent do it independently.

**Tools**: `firecrawl_agent`

**Steps**:
1. Call `firecrawl_agent` with a detailed prompt and optional schema
2. It runs asynchronously — returns a job ID
3. Poll `firecrawl_agent_status` to check progress
4. When done, get the structured results

**Example prompt**:
> "Research the top 5 n8n alternatives for AI workflow automation in 2026. For each, find: name, pricing, key features, pros, cons."

⚠️ **Note**: Agent jobs can take a few minutes for complex queries. Be patient.

---

## 📖 Recipe 5: Content Gap Analysis

**Use case**: You want to find what topics competitors are writing about that you aren't.

**Tools**: `firecrawl_map` → `firecrawl_batch_scrape`

**Steps**:
1. Map competitor's blog/content section
2. Batch scrape all blog post titles and descriptions (use JSON format to keep it light)
3. Compare against your own content inventory
4. Identify gaps

---

## 📖 Recipe 6: Lead Research

**Use case**: A potential client reaches out — quickly understand their business before the call.

**Tools**: `firecrawl_scrape` (branding format) + `firecrawl_search`

**Steps**:
1. Scrape their website with branding format to understand their visual identity
2. Scrape their homepage and about page for positioning
3. Search for recent news or reviews about them
4. Prepare a brief for discovery call

---

## 💡 Tips

- **Always use `onlyMainContent: true`** for markdown scrapes — strips nav, footer, ads
- **Prefer JSON format** over markdown when you only need specific data points
- **Set limits on crawls** — `maxDepth: 2` and `limit: 50` are good starting points
- **Use `firecrawl_search` before `firecrawl_scrape`** — don't guess URLs, find them first
- **Batch operations return a job ID** — check status with the corresponding status tool

---

*Firecrawl Recipes v1.0 | Zendora Skills | Updated: April 2026*
