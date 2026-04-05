# CLAUDE.md — Zendora Business OS

This file provides AI assistants with everything needed to work effectively in this repository.

---

## What This Repository Is

**Zendora** is a **Business Operating System** for a creative-tech agency offering five service pillars: AI Automations, Digital Design, Marketing, Social Media, and Freelance/Gigs. This is not a traditional software project — it's a structured system of documentation, templates, SOPs, agent workflows, and a small interactive hub app.

**Mission**: Empower businesses with intelligent automation and bold creative.

---

## Repository Structure

```
zendora/
├── .agents/workflows/        # Agent workflow definitions (frontmatter-tagged markdown)
├── .vscode/mcp.json          # Firecrawl MCP server config
├── brand/                    # Brand positioning, voice/tone, 90-day roadmap
├── clients/                  # Per-client project folders
│   └── _template/            # Template to duplicate for new clients
├── docs/                     # Deep-dive market research and strategy
├── hub/                      # Interactive virtual file system (Vite app)
│   ├── index.html
│   ├── main.js               # Folder navigation logic (vanilla JS ES modules)
│   ├── style.css             # Glassmorphism dark-mode design system
│   └── package.json          # Vite 5.0.0 only dependency
├── operations/
│   ├── SOPs/                 # client-onboarding.md, project-delivery.md
│   ├── finance/              # pricing-guide.md
│   ├── insights/             # Research output from /insights command
│   └── tools/                # 30+ tool integration guides
├── portfolios/               # Mock sites (HTML/CSS/JS), Fiverr gig templates
├── services/                 # One folder per service pillar
│   ├── ai-automations/
│   ├── digital-design/
│   ├── marketing/
│   ├── social-media/
│   └── freelance-gigs/
├── skills/
│   ├── ai-prompts/           # master-prompts.md — production LLM prompts
│   ├── automation-recipes/   # firecrawl-recipes.md + n8n/Make blueprints
│   └── content-frameworks/
├── test_firecrawl.py         # Manual integration test for Firecrawl API
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Hub UI | Vanilla JavaScript (ES Modules), CSS custom properties |
| Build tool | Vite 5.0.0 |
| Web intelligence | Firecrawl MCP (`npx firecrawl-mcp`) |
| Automation | n8n, Make.com, Zapier |
| AI models | OpenAI GPT-4o, Claude, Groq (Llama 3) |
| Design | Figma, Adobe Suite, Canva, CapCut |
| CRM/Marketing | HubSpot, GoHighLevel, Notion, Mailchimp |
| Analytics | GA4, Hotjar, SEMrush |
| Payment | Stripe, PayPal, Wave |

---

## Hub App (the only runnable code)

```bash
cd hub
npm install        # Install Vite
npm run dev        # Dev server at localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview the build
```

The hub is a macOS-inspired folder browser that renders the repository as a navigable virtual file system. The JS is entirely vanilla with ES modules. There is no test runner — test manually by running `npm run dev`.

---

## Firecrawl MCP Integration

Config: `.vscode/mcp.json`

```json
{
  "servers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": { "FIRECRAWL_API_KEY": "fc-4891a42f78aa46bd9155a957a4f36a46" }
    }
  }
}
```

Available tools: `firecrawl_search`, `firecrawl_scrape`, `firecrawl_batch_scrape`, `firecrawl_map`, `firecrawl_crawl`, `firecrawl_extract`, `firecrawl_agent`.

**Usage recipes**: `skills/automation-recipes/firecrawl-recipes.md`

Key tips:
- Always use `onlyMainContent: true` for markdown scrapes
- Use `firecrawl_search` before `firecrawl_scrape` — don't guess URLs
- Set crawl limits: `maxDepth: 2`, `limit: 50`
- `firecrawl_agent` is async — poll `firecrawl_agent_status` for results

---

## Agent Workflows

Workflows in `.agents/workflows/` are written for autonomous execution. Each file has frontmatter:

```markdown
---
description: Brief description of what this workflow does
---
```

Available workflows:
- `new-client-onboarding.md` — From "yes" to kick-off (8 steps)
- `build-ai-automation.md` — ACE Framework: Architect → Code → Execute
- `insights.md` — Operational audit using Firecrawl research
- `launch-fiverr-gig.md` — Fiverr listing creation workflow
- `upwork-proposal.md` — Upwork proposal generation workflow

---

## Key Conventions

### File Naming
All deliverable files follow this pattern:
```
[ClientName]_[ProjectType]_[Component]_[Version].[ext]

Examples:
  AcmeCo_BrandKit_Logo_Final.svg
  JohnSmith_LandingPage_Design_v2.fig
```

No "Final_FINAL_v3" naming — use versioned names or `_Final` suffix only once.

### Folder Naming
- Kebab-case for all directories: `ai-automations`, `digital-design`
- Client folders: `clients/[client-name]/`

### Markdown Conventions
- Agent workflow files use YAML frontmatter (`---description:---`)
- Template variables use `[BRACKETS]` (e.g., `[CLIENT NAME]`, `[DATE]`)
- Emojis used for visual hierarchy in documentation (preserve existing style when editing)

### New Client Workflow
1. Duplicate `clients/_template/` → rename to `clients/[client-name]/`
2. Fill in `clients/[client-name]/brief.md` during discovery
3. Track all work in `clients/[client-name]/project-log.md`
4. Follow delivery SOP: `operations/SOPs/project-delivery.md`

### New Service Offering
1. Read `services/[pillar]/README.md` for playbook
2. Pull prompts from `skills/ai-prompts/master-prompts.md`
3. Run the relevant service SOP

### The Skill Creator Pattern
```
Build the skill (skills/)  →  Ship the service (services/)  →  Systemize (operations/SOPs/)  →  Automate (.agents/workflows/)
```

---

## Service Pillars Summary

| Pillar | Key Tools | Entry Price |
|---|---|---|
| AI Automations | n8n, Make, OpenAI, Firecrawl | $500 |
| Digital Design | Figma, Adobe, Canva | $300 |
| Marketing | Meta Ads, GA4, Notion | $500 |
| Social Media | Buffer, Later, CapCut | $400/mo |
| Freelance/Gigs | Upwork, Fiverr | $50 |

Full pricing: `operations/finance/pricing-guide.md`

---

## Pricing Model

Projects use: **Setup Fee (fixed scope) + Monthly Retainer (monitoring & improvement)**

Standard payment terms:
- 50% deposit upfront for projects over $300
- Remaining 50% on delivery
- Revisions tracked per project — out-of-scope changes quoted separately

---

## Brand Voice

When writing any content for Zendora:
- **Confident** — not arrogant
- **Direct** — no fluff, no jargon
- **Energetic** — excited about what's possible
- **Human** — real people, not a faceless agency

Full guide: `brand/voice-and-tone.md`

---

## Self-Improvement (`/insights`)

Run the `insights` workflow to audit operations and research upgrades:
1. Uses `firecrawl_search` + `firecrawl_scrape` to research best practices
2. Compares findings against current SOPs and toolstack
3. Saves output to `operations/insights/[date]-insights.md`

---

## Git Branches

- `main` — stable, production state
- `claude/*` — AI-created branches for documentation and feature work

---

## No CI/CD

There is no automated test runner, GitHub Actions, or deployment pipeline. The only runnable code is the hub Vite app. Test it manually with `npm run dev`.
