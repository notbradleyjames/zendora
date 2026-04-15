# ⚡ Zendora — Business Operating System

> **AI Automations · Digital Design · Marketing · Social Media · Freelance & Gigs**
>
> *Built to move fast, deliver brilliance, and scale without burning out.*

---

## 🧭 What Is This?

This is the **Zendora Business OS** — a structured system of skills, workflows, templates, SOPs, and client tools that powers every service you offer. Think of it as your agency's brain on disk.

Whether you're solo, building a team, or directing AI agents to do the work — everything you need lives here.

---

## 🗂️ Directory Structure

```
zendora/
├── README.md                  ← You are here
├── apps/                      ← Client-facing applications & dashboards
├── business/                  ← Core agency operations
│   ├── brand/                 ← Brand strategy, voice, positioning
│   ├── clients/               ← Per-client project folders + templates
│   ├── operations/            ← SOPs, finance, tools stack
│   ├── portfolios/            ← Showcase & mock sites
│   └── services/              ← One folder per service pillar
└── hermes_core/               ← AI Logic & Agent Infrastructure
    ├── .agents/               ← Agent workflow definitions
    └── skills/                ← Reusable AI prompts, recipes, frameworks
```

---

## 🚀 Service Pillars

| Pillar | What You Deliver | Key Tools |
|---|---|---|
| 🤖 AI Automations | Custom AI workflows, chatbots, integrations | n8n, Make, OpenAI, Zapier, Firecrawl |
| 🎨 Digital Design | Branding, UI/UX, social graphics, motion | Figma, Adobe, Canva |
| 📣 Marketing | Strategy, funnels, ads, SEO, copywriting | Meta Ads, GA4, Notion |
| 📱 Social Media | Content, scheduling, analytics, growth | Buffer, Later, CapCut |
| 💼 Freelance/Gigs | Direct client projects, platforms | Upwork, Fiverr, LinkedIn |

---

## 🧠 The Skill Creator Mindset

Every service you offer is powered by **reusable skills** — modular prompt packs, templates, and workflows you build once and deploy repeatedly. The goal is:

1. **Build the skill** → Document it in `hermes_core/skills/`
2. **Ship the service** → Use it in `business/services/`
3. **Systemize delivery** → Track it in `business/operations/SOPs/`
4. **Scale with AI** → Automate it in `hermes_core/.agents/workflows/`

---

## 🔍 Research & Self-Improvement

Zendora uses **Firecrawl** (integrated as an MCP server) for web intelligence — scraping, searching, crawling, and autonomous deep research. Config lives in `.vscode/mcp.json`.

- **Recipes**: See `hermes_core/skills/automation-recipes/firecrawl-recipes.md` for usage patterns
- **Self-improvement**: Run `/insights` to audit operations and research upgrades
- **Insight reports**: Saved to `business/operations/insights/`

---

## 📋 Quick Start

### New Client?
1. Duplicate `business/clients/_template/` → rename to client name
2. Fill in `brief.md` during discovery call
3. Copy the right service proposal from `business/services/[pillar]/proposals/`
4. Log everything in `project-log.md`

### New Service Offering?
1. Review the appropriate `business/services/[pillar]/README.md`
2. Pull relevant prompts from `hermes_core/skills/ai-prompts/`
3. Run the delivery SOP in `business/operations/SOPs/project-delivery.md`

### Need to Automate Something?
1. Check `hermes_core/skills/automation-recipes/` for existing recipes
2. Or build a new one using the templates in `business/services/ai-automations/`

### Launching Your First Leads?
1. Review the **[Portfolios Showcase](file:///home/christianantoniazzi98/zendora/business/portfolios/GUIDE.md)** for strategy.
2. Use the **[Fiverr Gig Templates](file:///home/christianantoniazzi98/zendora/business/portfolios/FIVERR_GIG_PROFILES.md)** to post your services.
3. Preview and capture screenshots of the **[Mock Sites](file:///home/christianantoniazzi98/zendora/business/portfolios/mock-sites/)** for your gallery.

---

## 🌐 Brand Identity

**Zendora** = *Zeal + Endurance + Dora (gift)*

- **Mission**: Empower businesses with intelligent automation and bold creative.
- **Vision**: Be the most trusted creative-tech agency for founders who move fast.
- **Values**: Speed. Clarity. Excellence. Honesty.

See `business/brand/positioning.md` for the full brand strategy.

---

*Last updated: April 2026 | Version 1.0*
