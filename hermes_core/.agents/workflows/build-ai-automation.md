---
description: How to build and deliver an AI System (ACE Framework)
---

## AI System Build Workflow (Jack Roberts ACE Framework)

**Phase 1: [A] Architect (Discovery & Design)**
1. Complete discovery call and focus on inputs, outputs, and constraints.
   - Do not automate a broken process; fix the underlying issue first.
   - Fill in `clients/[name]/brief.md`.
2. Define the 4 Pillars of the AI System for this project:
   - AI Model(s) used.
   - Orchestration/No-Code tool used.
   - Database/Storage used.
   - Front-end Interface used.
3. Map out the exact data flow on a whiteboard/Lucidchart BEFORE building anything in a tool.

**Phase 2: [C] Code (Build & Connect)**
4. Start with the "Magic Moment" (V1). Build the simplest version of the system that produces an expected output. Keep it clean.
5. Check `skills/automation-recipes/README.md` for existing recipes.
6. Build in the n8n/Make sandbox environment first. Never in the client's live production immediately.
7. Test with dummy data at every single node/module.

**Phase 3: [E] Execute (Run & Refine)**
8. Run end-to-end tests with real-world/live data. Ensure the 4 Pillars communicate properly.
9. Document the system clearly for the client.
   - Write a plain-English SOP of what each part does.
   - Note credentials and API keys stored in the user's dashboard.
10. Record a Loom walkthrough (5–10 mins).
   - Show how the inputs generate the outputs.
   - Explain how they can monitor for errors.
11. Handoff system per `operations/SOPs/project-delivery.md`.
12. Pitch Phase 2 or offer a monthly maintenance retainer:
   - "I can keep an eye on this system for $[X]/mo so it takes one management task completely off your plate."
