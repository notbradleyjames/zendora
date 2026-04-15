# 🧠 Skills Library — Directory Guide

> *Build once. Use forever. The Zendora skill vault.*

---

## What's a "Skill"?

A skill is a **reusable, documented tool** that helps you or an AI agent do a job at a high level without starting from scratch each time.

Skills come in 3 forms:

| Type | Location | What It Is |
|---|---|---|
| **AI Prompts** | `hermes_core/skills/ai-prompts/` | Production-ready prompts for every service |
| **Automation Recipes** | `hermes_core/skills/automation-recipes/` | Pre-built automation blueprints |
| **Content Frameworks** | `hermes_core/skills/content-frameworks/` | Templates, questionnaires, calendar structures |

---

## 📂 Directory

```
hermes_core/skills/
├── ai-prompts/
│   └── master-prompts.md     ← All prompts by service (start here)
│
├── automation-recipes/
│   └── README.md             ← 6 ready-to-deploy automation blueprints
│
└── content-frameworks/
    └── README.md             ← Brand questionnaire, GTM, calendar, email, Fiverr gig templates
```

---

## 🔁 How to Use Skills

### For yourself:
1. Open the skill file for your task
2. Copy the relevant prompt or template
3. Fill in the `[BRACKETS]`
4. Run it → refine → ship

### For an AI agent (like me):
> "Use the `master-prompts.md` → Caption Writer prompt to write an Instagram post about our lead capture automation service."

### For a new hire or contractor:
- Point them to this folder first
- Have them read the relevant service README
- Then the relevant skill before starting work

---

## ➕ Adding New Skills

When you figure out something that works great — **document it here.**

Template for a new prompt:
```
### [NAME OF SKILL]
Use when: [SPECIFIC SITUATION]

PROMPT:
[FULL PROMPT TEXT WITH [BRACKETS] FOR VARIABLES]

Notes:
[ANY TIPS, GOTCHAS, OR REFINEMENTS]
```

---

## 🚧 Skills Roadmap (Build These Next)

- [ ] `hermes_core/skills/ai-prompts/video-script-writer.md` — Short-form Reels/TikTok scripts
- [ ] `hermes_core/skills/ai-prompts/case-study-writer.md` — Turn client results into a story
- [ ] `hermes_core/skills/ai-prompts/cold-outreach-writer.md` — LinkedIn DM / email prospecting
- [ ] `hermes_core/skills/automation-recipes/youtube-to-clips.md` — Long video → short clip pipeline
- [ ] `hermes_core/skills/automation-recipes/crm-follow-up.md` — Auto follow-up sequence
- [ ] `hermes_core/skills/content-frameworks/weekly-review.md` — Weekly business review template

---

*Last updated: April 2026 | Zendora Skills*
