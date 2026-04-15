# CLAUDE.md — Zendora Business OS

This file provides AI assistants with everything needed to work effectively in this repository.

---

## What This Repository Is

**Zendora** is a **Business Operating System** for a creative-tech agency offering five service pillars: AI Automations, Digital Design, Marketing, Social Media, and Freelance/Gigs. This is not a traditional software project — it's a structured system of documentation, templates, SOPs, agent workflows, backend logic, and interactive applications.

**Mission**: Empower businesses with intelligent automation and bold creative.

---

## Repository Structure

```
zendora/
├── apps/                          # Client-facing applications
│   ├── index.html                 # Main hub entry point
│   ├── main.js                    # Folder navigation logic (vanilla JS ES modules)
│   ├── style.css                  # Dark-mode design system
│   ├── package.json               # Vite 5.0.0
│   ├── zendora-ui/                # Svelte + Vite UI application
│   └── assets/                    # UI assets and resources
├── business/                      # Core agency operations
│   ├── brand/                     # Brand positioning, voice/tone, 90-day roadmap
│   ├── clients/                   # Per-client project folders
│   │   └── _template/             # Template to duplicate for new clients
│   ├── operations/
│   │   ├── SOPs/                  # Standard operating procedures
│   │   ├── finance/               # Pricing guides and financial templates
│   │   └── tools/                 # 37+ tool integration guides
│   ├── portfolios/                # Mock sites, Fiverr gig templates, showcases
│   └── services/                  # One folder per service pillar
│       ├── ai-automations/
│       ├── digital-design/
│       ├── marketing/
│       ├── social-media/
│       └── freelance-gigs/
├── hermes_core/                   # AI logic and agent infrastructure
│   ├── .agents/
│   │   └── workflows/             # Agent workflow definitions (frontmatter-tagged markdown)
│   ├── hermes-backend/            # Backend services and API
│   ├── skills/                    # Reusable AI assets
│   │   ├── ai-prompts/            # master-prompts.md — production LLM prompts
│   │   ├── automation-recipes/    # firecrawl-recipes.md + n8n/Make blueprints
│   │   └── content-frameworks/    # Content structure templates
│   └── test_firecrawl.py          # Manual integration test for Firecrawl API
├── docs/                          # Deep-dive market research and strategy
├── .vscode/mcp.json               # Firecrawl MCP server config
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

## Applications

### Zendora Hub (`apps/`)

The main interactive application — a macOS-inspired folder browser that renders the repository as a navigable virtual file system.

```bash
cd apps
npm install        # Install Vite 5.0.0
npm run dev        # Dev server at localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview the build
```

**Tech**: Vanilla JavaScript (ES Modules), CSS custom properties, Vite 5.0.0
- No frameworks, no build complexity — pure JS
- Test manually by running `npm run dev`
- No automated test runner

### Zendora UI (`apps/zendora-ui/`)

A Svelte + Vite-based UI application for more complex dashboard and interactive features.

```bash
cd apps/zendora-ui
npm install        # Install dependencies
npm run dev        # Dev server
npm run build      # Production build
```

**Tech**: Svelte, Vite, TypeScript

### Hermes Backend (`hermes_core/hermes-backend/`)

Backend services and API endpoints that power the agent workflows and integrations.

---

## Firecrawl MCP Integration

Config: `.vscode/mcp.json`

The Firecrawl MCP server enables web intelligence — scraping, searching, crawling, and autonomous research directly in the Claude Code environment.

**Available tools**: 
- `firecrawl_search` — Find URLs matching your query
- `firecrawl_scrape` — Extract markdown from a single URL
- `firecrawl_batch_scrape` — Extract from multiple URLs
- `firecrawl_map` — Get site structure/hierarchy
- `firecrawl_crawl` — Crawl entire domains with depth limits
- `firecrawl_extract` — Extract structured data with a schema
- `firecrawl_agent` — Async autonomous research (poll for results)

**Usage recipes**: See `hermes_core/skills/automation-recipes/firecrawl-recipes.md`

**Key tips**:
- Always use `onlyMainContent: true` for markdown scrapes
- Use `firecrawl_search` before `firecrawl_scrape` — don't guess URLs
- Set crawl limits: `maxDepth: 2`, `limit: 50`
- `firecrawl_agent` is async — poll `firecrawl_agent_status` for results
- See `business/operations/tools/firecrawl/` for detailed integration guides

---

## Agent Workflows

Workflows in `hermes_core/.agents/workflows/` are markdown files written for autonomous execution. Each file has YAML frontmatter:

```markdown
---
description: Brief description of what this workflow does
---

[Workflow steps and instructions]
```

**Available workflows**:
- `new-client-onboarding.md` — From "yes" to kick-off (8 steps)
- `build-ai-automation.md` — ACE Framework: Architect → Code → Execute
- `insights.md` — Operational audit using Firecrawl research
- `launch-fiverr-gig.md` — Fiverr listing creation workflow
- `upwork-proposal.md` — Upwork proposal generation workflow

These workflows are designed to be triggered by the backend (`hermes_core/hermes-backend/`) or run directly by AI agents.

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
1. Duplicate `business/clients/_template/` → rename to `business/clients/[client-name]/`
2. Fill in `business/clients/[client-name]/brief.md` during discovery
3. Track all work in `business/clients/[client-name]/project-log.md`
4. Follow delivery SOP: `business/operations/SOPs/project-delivery.md`
5. Use service proposals from `business/services/[pillar]/proposals/`

### New Service Offering
1. Read `business/services/[pillar]/README.md` for the playbook
2. Pull relevant prompts from `hermes_core/skills/ai-prompts/master-prompts.md`
3. Document delivery process in `business/operations/SOPs/`
4. Create recipes in `hermes_core/skills/automation-recipes/` if applicable

### The Skill Creator Pattern
```
Build the skill (hermes_core/skills/)
    ↓
Ship the service (business/services/[pillar]/)
    ↓
Systemize delivery (business/operations/SOPs/)
    ↓
Scale with AI (hermes_core/.agents/workflows/)
```

### Tool Integration
When working with external tools:
1. Review the integration guide: `business/operations/tools/[tool-name]/`
2. Follow setup instructions for API keys and authentication
3. Document any unique workflows or gotchas for team knowledge

---

## Service Pillars Summary

| Pillar | Key Tools | Entry Price |
|---|---|---|
| AI Automations | n8n, Make, OpenAI, Firecrawl | $500 |
| Digital Design | Figma, Adobe, Canva | $300 |
| Marketing | Meta Ads, GA4, Notion | $500 |
| Social Media | Buffer, Later, CapCut | $400/mo |
| Freelance/Gigs | Upwork, Fiverr | $50 |

Full pricing: `business/operations/finance/pricing-guide.md`

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

Full guide: `business/brand/voice-and-tone.md`

---

## Self-Improvement & Research

Use the `/insights` command to audit operations and research upgrades:
1. The `insights` workflow uses Firecrawl (`firecrawl_search` + `firecrawl_scrape`) to research best practices
2. Compares findings against current SOPs in `business/operations/SOPs/`
3. Analyzes tool stack in `business/operations/tools/`
4. Saves detailed reports to `business/operations/insights/[date]-insights.md`

This keeps Zendora's processes and integrations continuously evolving with industry best practices.

---

## Development Workflow

### Git Branches

- `main` — stable, production state (do not push directly)
- `claude/*` — AI-created branches for documentation and feature work
  - Example: `claude/add-claude-documentation-5wUE7`
  - Format: `claude/[description]-[random-id]`
  - Always develop on the designated branch
  - Commit work with clear, descriptive messages
  - Push to the designated branch using `git push -u origin [branch-name]`

### Testing & Deployment

**No CI/CD pipeline** — There are no automated tests or GitHub Actions.

- **Hub app** (`apps/`): Test manually with `npm run dev`, verify functionality in browser
- **Svelte UI** (`apps/zendora-ui/`): Test manually, check HMR works correctly
- **Backend** (`hermes_core/hermes-backend/`): Manual integration testing
- **Workflows**: Run `/insights` or relevant workflows to validate agent logic
- **Scripts**: Test `hermes_core/test_firecrawl.py` manually if modifying Firecrawl integration

### Code Quality

- Keep code simple and focused
- Don't add features beyond what's requested
- Documentation updates are encouraged for clarity
- Follow existing naming conventions (kebab-case for folders, snake_case for config files)
- Preserve the brand voice when writing documentation
