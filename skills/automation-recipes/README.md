# ⚙️ Automation Recipes — Zendora Skills

> *Pre-built automation blueprints. Pick one, customize, ship.*

---

## 📌 How to Use

Each recipe contains:
- **Use Case** — who needs this and why
- **Trigger** — what starts the automation
- **Steps** — exact flow of actions
- **Tools** — what's needed
- **n8n Node Map** — for direct implementation
- **Estimated Build Time**

---

## Recipe 001 — Lead Capture → CRM → Welcome Email

**Use Case:** Any business with a contact form that manually processes leads.

**Trigger:** New form submission (Typeform, Tally, Jotform, or website form)

**Flow:**
```
[TRIGGER] New Form Submission
    ↓
[FORMAT] Extract + format lead data
    ↓
[ENRICH] (Optional) Clearbit/Hunter.io — enrich email with company data
    ↓
[CRM] Create/update contact in HubSpot / GoHighLevel / Airtable
    ↓
[TAG] Apply lifecycle stage tag (e.g., "New Lead")
    ↓
[EMAIL] Send personalized welcome email via Gmail/Mailchimp/SendGrid
    ↓
[NOTIFY] Slack message → #leads channel with lead summary
    ↓
[TASK] Create follow-up task for owner (due in 24 hrs)
```

**Tools Required:** Typeform (or similar) + HubSpot/GHL + Gmail + Slack  
**n8n Nodes:** Webhook → Set → HTTP (Clearbit) → HubSpot → Gmail → Slack → Notion  
**Estimated Build Time:** 3–5 hours  
**Sell Price:** $300–$700

---

## Recipe 002 — AI Content Pipeline

**Use Case:** Content teams, social media managers, solo creators who need a consistent content engine.

**Trigger:** Scheduled (e.g., every Monday at 9am) OR manual form input

**Flow:**
```
[TRIGGER] Schedule (weekly) OR Tally form input (topic)
    ↓
[AI] GPT-4o → Generate 5 content ideas for the week
    ↓
[AI] For each idea → Generate full caption + hook + CTA
    ↓
[FORMAT] Structure into Notion database (title, body, platform, status)
    ↓
[NOTIFY] Slack / Email → "Your content is ready for review"
    ↓
[APPROVED?] Manual check → Update status to "Approved"
    ↓
[SCHEDULE] Buffer/Later API → Schedule approved posts
```

**Tools Required:** n8n + OpenAI + Notion + Buffer/Later + Slack  
**n8n Nodes:** Schedule/Webhook → OpenAI → Loop → Notion → Slack → HTTP (Buffer)  
**Estimated Build Time:** 4–7 hours  
**Sell Price:** $500–$1,200

---

## Recipe 003 — Client Onboarding Flow

**Use Case:** Agencies, coaches, consultants — automate the new client experience.

**Trigger:** Payment received (Stripe webhook) OR contract signed (DocuSign/HelloSign)

**Flow:**
```
[TRIGGER] Stripe payment success webhook
    ↓
[LOOKUP] Find customer email → Get name/details
    ↓
[CRM] Create new client record + tag "Active Client"
    ↓
[EMAIL] Send onboarding welcome email (Day 0)
    ↓
[TASK] Create project in Notion/Asana + assign to owner
    ↓
[SLACK] Notify internal team #new-clients channel
    ↓
[EMAIL] Send onboarding questionnaire link (Day 1, 24hr delay)
    ↓
[CALENDAR] Send Calendly/scheduling link for kick-off call (Day 2)
    ↓
[EMAIL] Kick-off reminder (1 day before scheduled call)
```

**Tools Required:** Stripe + Notion + Gmail + Slack + Calendly  
**n8n Nodes:** Webhook → Stripe → Set → Notion → Gmail (x3) → Slack → Wait nodes  
**Estimated Build Time:** 5–8 hours  
**Sell Price:** $700–$1,500

---

## Recipe 004 — Invoice & Payment Tracker

**Use Case:** Freelancers and small businesses who forget to follow up on invoices.

**Trigger:** Invoice created in accounting tool (or manual Google Sheet entry)

**Flow:**
```
[TRIGGER] New row in Google Sheet "Invoices" OR invoice created in Wave/FreshBooks
    ↓
[SET] Due date = today + 14 days (or custom)
    ↓
[STORE] Log invoice in tracker (Notion or Airtable)
    ↓
[WAIT] Until due date
    ↓
[CHECK] Is invoice marked "Paid"?
    → YES: End flow, log as complete
    → NO: Send gentle reminder email
    ↓
[WAIT] 3 more days
    ↓
[CHECK AGAIN] Still unpaid?
    → YES: Send firmer follow-up + Slack notify owner
    → NO: Log as paid
```

**Tools Required:** Google Sheets + Gmail + Notion/Airtable + Slack  
**n8n Nodes:** Sheet Trigger → Set → Notion → Wait → IF → Gmail → Wait → IF → Gmail + Slack  
**Estimated Build Time:** 4–6 hours  
**Sell Price:** $350–$700

---

## Recipe 005 — AI Support Bot (FAQ)

**Use Case:** E-commerce stores, SaaS, service businesses needing 24/7 support.

**Trigger:** Incoming message (website chat widget, Telegram, WhatsApp, or email)

**Flow:**
```
[TRIGGER] New message received
    ↓
[AI] GPT-4o with system prompt containing FAQ/knowledge base
    → Classify: Can AI answer this? YES / NO
    ↓
YES → [REPLY] Send AI-generated response
    ↓
NO (complex/sensitive) → [ESCALATE] Tag as "Needs Human" + notify support@
    ↓
[LOG] Save conversation to Airtable/Notion for review
```

**System Prompt Template:**
```
You are a helpful customer support agent for [COMPANY NAME].
Answer questions only based on the information below.
If you don't know, say: "Great question — let me connect you with our team."
Reply in a friendly, helpful tone. Keep answers under 100 words.

KNOWLEDGE BASE:
[PASTE FAQ / PRODUCT INFO HERE]
```

**Tools Required:** n8n + OpenAI + Telegram/WhatsApp/Email + Airtable  
**Estimated Build Time:** 5–10 hours (depending on integrations)  
**Sell Price:** $800–$2,500

---

## Recipe 006 — Social Listening + Response Drafter

**Use Case:** Brand managers and SMBs who want to engage with mentions without monitoring 24/7.

**Trigger:** Scheduled check (every 2–4 hours)

**Flow:**
```
[TRIGGER] Schedule (every 4 hrs)
    ↓
[FETCH] Pull brand mentions from Twitter/X API or Google Alerts RSS
    ↓
[FILTER] Only new mentions (not already processed)
    ↓
[AI] GPT-4o → Draft a reply for each mention (tone: friendly, on-brand)
    ↓
[REVIEW] Send to Slack/email with original mention + suggested reply
    ↓
[APPROVE] Human clicks "Post" or "Edit" button
    ↓
[POST] Approved reply posted via API
    ↓
[LOG] Stored in Airtable with status
```

**Tools Required:** Twitter API + OpenAI + Slack + Airtable  
**Estimated Build Time:** 6–10 hours  
**Sell Price:** $1,000–$2,000

---

*Last updated: April 2026 | Zendora Automation Recipes v1.0*
