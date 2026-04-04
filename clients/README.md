# 📁 Clients — Directory Guide

> *Every client gets their own folder. No exceptions. One source of truth per project.*

---

## 📂 Folder Structure

```
clients/
├── _template/          ← Copy this for every new client
│   ├── brief.md        ← Discovery + scope + payment info
│   └── project-log.md  ← Running activity + decisions log
│
├── [client-name]/      ← Named after client or company
│   ├── brief.md
│   ├── project-log.md
│   └── assets/         ← Any files, exports, refs (optional)
│
└── README.md           ← This file
```

---

## 🆕 Starting a New Client

```bash
# 1. Duplicate the template folder
cp -r clients/_template clients/[client-name]

# 2. Fill in the brief during/after discovery call
# 3. Open project-log.md — add first entry
```

---

## 📊 Active Client Tracker

Update this table as you take on projects:

| Client | Service | Status | Start | Deadline | Revenue |
|---|---|---|---|---|---|
| | | | | | |

**Status options:** 🟡 Scoping | 🟢 Active | 🔵 Review | ✅ Complete | ⏸️ Paused

---

## 🗂️ Archive Policy

When a project is complete:
1. Mark status as ✅ Complete in the table above
2. Move client folder to `clients/archive/[year]/[client-name]/`
3. Note any upsell potential or follow-up dates

---

## ⭐ Testimonials Log

| Client | Date | Platform | Stars | Quote |
|---|---|---|---|---|
| | | | | |

---

*Last updated: April 2026 | Zendora*
