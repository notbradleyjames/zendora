---
description: Self-improvement workflow — review operations, research improvements, and rebuild what's outdated
---

## /insights — Zendora Self-Improvement Workflow

> *"Don't just work in the business — work ON the business."*

Use this workflow to audit how Zendora operates and find upgrades. This is designed to be run periodically (monthly or after major milestones) or whenever you feel like things could be working better.

---

### Phase 1: Internal Audit (Review What We Have)

1. **Review current workflows** — Read through all files in `.agents/workflows/`
   - Are any steps outdated, redundant, or missing?
   - Are there recurring tasks we still do manually?

2. **Review tools stack** — Read `operations/tools.md`
   - Are we paying for tools we don't use?
   - Are there free alternatives to paid tools?
   - Are there new tools that do what multiple current tools do?

3. **Review SOPs** — Read `operations/SOPs/`
   - Are delivery processes still matching how we actually work?
   - Any bottlenecks or pain points?

4. **Review service offerings** — Scan `services/` directories
   - Are our service descriptions still accurate?
   - Are we offering services nobody is buying?
   - Are there services we *should* offer but haven't documented?

5. **Review skills & recipes** — Read `skills/`
   - Are prompts and recipes still effective with current LLM models?
   - Any new prompt techniques or frameworks worth adopting?

---

### Phase 2: External Research (Find What's Better)

Use Firecrawl to search for improvements. Check `skills/automation-recipes/firecrawl-recipes.md` for how.

6. **Research latest AI automation tools**
   - Search: "best AI automation tools for agencies [current year]"
   - Compare against our `operations/tools.md`
   - Look for: n8n alternatives, new no-code platforms, AI API updates

7. **Research workflow automation trends**
   - Search: "agency workflow automation best practices [current year]"
   - Are there new approaches to client onboarding, delivery, follow-up?

8. **Research competitor positioning**
   - Pick 2–3 agencies in our space
   - Map and scrape their sites for service offerings, pricing, positioning
   - Note anything we should adopt or differentiate against

9. **Research freelance platform updates**
   - Check latest Upwork, Fiverr algorithm changes or best practices
   - Search for top-performing gig strategies

10. **Research pricing models**
    - Search for AI agency pricing benchmarks
    - Are we undercharging? Overcomplicating packages?

---

### Phase 3: Synthesize & Recommend

11. **Produce an Improvement Report** containing:
    - 🔴 **Urgent fixes** — things that are broken or costing money/time unnecessarily
    - 🟡 **Quick wins** — small changes with big impact (< 1 hour to implement)
    - 🟢 **Strategic upgrades** — bigger changes to implement over the next 2–4 weeks
    - 🔵 **Future ideas** — good ideas to revisit next quarter

12. **For each recommendation, specify**:
    - What file(s) to update
    - What changes to make
    - Estimated time savings or revenue impact
    - Any costs involved

---

### Phase 4: Execute (Optional — with approval)

13. After reviewing the report:
    - Pick the top 3–5 items to act on
    - Update the relevant files directly
    - Test any new tool integrations
    - Log changes in the improvement report for future reference

---

### Output Format

Save the report as: `operations/insights/[YYYY-MM-DD]-insights.md`

Example filename: `operations/insights/2026-04-03-insights.md`

---

### Tips

- **Don't try to fix everything at once** — pick the highest-impact items
- **Run this monthly** — small, consistent improvements compound
- **Use Firecrawl Agent** for deep research questions — it can autonomously browse and synthesize
- **Compare before/after** — look at previous insight reports to track progress

---

*Workflow v1.0 | Zendora Self-Improvement | Updated: April 2026*
