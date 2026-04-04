# 🧠 Master AI Prompt Library — Zendora Skills

> *Production-ready prompts for every service Zendora offers.*
> *Copy → paste → customize → ship.*

---

## 📌 How to Use This Library

1. Find the prompt category for your task
2. Copy the prompt block
3. Replace `[BRACKETS]` with client/project specifics
4. Run in ChatGPT, Claude, or your preferred LLM
5. Refine the output as needed

---

## 🤖 AI AUTOMATIONS

### Automation Brief Expander
Use this when a client gives you a vague automation request.

```
You are an expert automation consultant. A client has given you this brief:

"[CLIENT'S VAGUE REQUEST]"

Your job is to:
1. Identify what exactly needs to happen (trigger, actions, conditions, outputs)
2. List all the tools/platforms that will be involved
3. Write a clear technical spec in plain English (no jargon)
4. Identify 3 edge cases or failure points to plan for
5. Estimate the complexity (Simple / Medium / Complex) and rough hourly build time

Format as a structured document.
```

---

### n8n Workflow Planner
Use this to design an n8n automation before building it.

```
You are an n8n expert. Design a workflow for the following use case:

Use Case: [DESCRIBE THE AUTOMATION]
Trigger: [What starts the workflow? e.g., webhook, form submission, schedule]
Goal: [What should happen at the end?]
Tools involved: [List apps/services, e.g., Gmail, HubSpot, Slack]

Please output:
1. A step-by-step node flow (Node Name → Action → Output)
2. Any conditional logic needed (If/Switch nodes)
3. Error handling recommendations
4. Data mapping notes (what data passes between nodes)
```

---

### Client Automation Discovery Questions
Use this to generate smart discovery questions for a new automation client.

```
I'm scoping an automation project for a client in the [INDUSTRY] space.
They run a [TYPE OF BUSINESS — e.g., coaching, e-commerce, SaaS].
Their team size is approximately [NUMBER] people.

Generate 10 targeted discovery questions that will help me:
- Understand their current manual workflows
- Identify the biggest time sinks
- Scope the automation correctly
- Uncover integration constraints

Make the questions conversational, not technical.
```

---

## 🎨 DIGITAL DESIGN

### Brand Brief Expander
Turns a basic client answer into a full creative brief.

```
A client has filled out this brand questionnaire:
- Business name: [NAME]
- What they do: [DESCRIPTION]
- Target audience: [AUDIENCE]
- 3 words to describe their brand: [WORD1, WORD2, WORD3]
- Brands they admire: [BRAND EXAMPLES]
- What they DON'T want: [NEGATIVES]

Expand this into a full creative brief that includes:
1. Brand personality profile (adjectives, archetype)
2. Color direction (3–4 palette suggestions with hex codes)
3. Typography direction (font style recommendations)
4. Visual style description (mood, aesthetic)
5. Do's and Don'ts for the design
6. One sentence brand positioning statement
```

---

### Logo Concept Generator
```
Generate 5 distinct logo concept directions for:

Brand name: [NAME]
Industry: [INDUSTRY]
Brand personality: [E.G., bold and modern / warm and approachable / minimal and premium]
Target audience: [AUDIENCE]

For each concept direction, describe:
1. The design metaphor or visual idea
2. The shape/icon approach
3. The typography style
4. The color mood
5. What emotion it triggers

These should be clearly differentiated from each other. No generic ideas.
```

---

## 📣 MARKETING

### Website Copy Generator
Full website copy from a simple brief.

```
Write high-converting website copy for:

Business: [BUSINESS NAME]
What they do: [2-SENTENCE DESCRIPTION]
Target customer: [WHO THEY SERVE]
Biggest pain point they solve: [MAIN PROBLEM]
Top 3 benefits/outcomes: [1. 2. 3.]
Social proof available: [TESTIMONIALS / RESULTS / CLIENT COUNT]
Main CTA action: [E.G., Book a call, Download, Buy now]

Write copy for these sections:
1. Hero (Headline + subheading + CTA)
2. Problem section (agitate the pain)
3. Solution section (introduce the product/service)
4. Features → Benefits (3 key features, each with a benefit)
5. Social proof section (how to frame testimonials)
6. FAQ (5 most common objections + answers)
7. Final CTA section

Use the StoryBrand framework. Be direct, clear, and conversion-focused.
```

---

### Email Welcome Sequence (5-Part)
```
Write a 5-email welcome sequence for:

Business: [BUSINESS NAME]
Product/Service: [WHAT THEY OFFER]
New subscriber context: [HOW DID THEY JOIN? e.g., downloaded a lead magnet about X]
Primary goal: [WHAT DO WE WANT THEM TO DO? e.g., book a call, buy product X]
Brand voice: [FORMAL/CASUAL/FRIENDLY/PROFESSIONAL]

Email structure:
Email 1 (Day 0): Welcome + deliver on the promise
Email 2 (Day 2): Share your story / why you do this
Email 3 (Day 4): Teach something valuable (builds trust)
Email 4 (Day 6): Social proof + case study
Email 5 (Day 8): Soft pitch for [MAIN OFFER]

Each email: Subject line + preheader text + body copy + CTA
Keep emails under 250 words each. Direct and engaging.
```

---

### Ad Copy Generator (Meta)
```
Write 3 Facebook/Instagram ad variations for:

Product/Service: [DESCRIPTION]
Target audience: [WHO WE'RE TARGETING]
Main benefit: [#1 OUTCOME/RESULT]
Offer: [WHAT'S THE CTA OFFER? e.g., free audit, $97 course, free trial]
Destination: [WHERE DO THEY LAND? landing page, DM, etc.]

For each variation, write:
- Primary text (125 chars or less — the main copy above the image)
- Headline (40 chars or less)
- Description (30 chars or less)
- Hook style: [Variation 1: Pain-led | Variation 2: Curiosity-led | Variation 3: Social proof-led]
```

---

## 📱 SOCIAL MEDIA

### Caption Writer
```
Write a high-engagement social media caption for:

Platform: [INSTAGRAM / LINKEDIN / TWITTER / TIKTOK]
Content pillar: [EDUCATION / INSPIRATION / PROMOTION / BTS / ENGAGEMENT]
Topic: [WHAT THE POST IS ABOUT]
Key insight or lesson: [THE MAIN POINT TO GET ACROSS]
Brand voice: [CASUAL/PROFESSIONAL/BOLD/WARM]
Target audience: [WHO WILL SEE THIS]
CTA goal: [SAVE / COMMENT / DM / CLICK LINK / FOLLOW]

Format:
- Hook line (first line — stops the scroll)
- Body (3–7 lines, valuable content)
- CTA (1 clear action)
- Hashtags: [YES/NO] — if yes, 5–10 relevant ones

DO NOT use generic captions. Make it feel real and human.
```

---

### 30-Day Content Calendar Generator
```
Create a 30-day social media content calendar for:

Brand: [BRAND NAME / NICHE]
Platform(s): [LIST PLATFORMS]
Posting frequency: [X TIMES PER WEEK]
Content pillars: [LIST 4–5 PILLARS]
Current goals: [GROW FOLLOWING / GENERATE LEADS / BUILD BRAND]

For each post, provide:
- Day + date
- Content pillar
- Post format (Reel, Carousel, Static, Story, Text)
- Topic/angle (1 sentence)
- Hook idea (first line only)

Format as a table.
```

---

## 💼 FREELANCE / PROPOSALS

### Upwork Proposal Writer
```
Write a compelling Upwork proposal for this job posting:

[PASTE JOB DESCRIPTION HERE]

My background relevant to this job:
[YOUR SKILLS / EXPERIENCE / PREVIOUS WIN]

Proposal requirements:
- Open with something specific from their post (NOT a generic intro)
- Be concise — under 150 words total
- Show I understand their problem
- State what I'll do (briefly)
- Include one social proof element
- End with a soft CTA (call or examples offer)

Tone: Confident, direct, human. No fluff.
```

---

### Fiverr Gig Description Writer
```
Write a Fiverr gig description for this service:

Service: [WHAT YOU'RE OFFERING]
Deliverables: [WHAT THEY GET]
Turnaround: [HOW FAST]
Your differentiator: [WHY YOU OVER OTHERS]
Target buyer: [WHO WOULD ORDER THIS]

Write:
1. Title (max 80 chars, keyword-rich)
2. Description (300–600 words, using the formula: Hook → Who it's for → What you get → Why me → Process → CTA)
3. 3 FAQ Q&As to handle common buyer doubts
4. 5 tags/keywords

Optimize for Fiverr search. Buyer-focused, not brag-focused.
```

---

*Last updated: April 2026 | Zendora Skills Library v1.0*
