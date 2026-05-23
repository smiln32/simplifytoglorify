# Documentation Structure

Quick navigation for simplifytoglorify docs. Each section is self-contained and follows a logical flow.

## Main Sections

1. **[Business](./business/CONTEXT.md)** — Products, audience, sales workflows, content strategy
2. **[Tech](./tech/CONTEXT.md)** — Architecture, code structure, development setup
3. **[Operations](./operations/CONTEXT.md)** — Admin tasks, deployment, monitoring, troubleshooting
4. **[Reference](./reference/CONTEXT.md)** — Environment variables, routes, commands, file inventory

## First Time Here?

1. Read `CLAUDE.md` in project root (quick overview & project guidelines)
2. Skim this file (you're here now)
3. Go to the section you need → read its CONTEXT.md
4. Jump to specific files as needed

## I Need To...

**Understand the business:**
- [What do we sell?](./business/overview.md)
- [Who are our customers?](./business/overview.md)
- [How does the sales workflow work?](./business/etsy-workflow.md)
- [What articles do we need?](./business/content-strategy.md)

**Set up and develop:**
- [Set up locally](./tech/development.md)
- [Understand the architecture](./tech/architecture.md)
- [Find a file or component](./reference/file-structure.md)
- [Run commands](./reference/commands.md)

**Deploy and operate:**
- [Deploy changes](./operations/deployment.md)
- [Generate download codes](./operations/admin-tasks.md)
- [Upload PDFs](./operations/admin-tasks.md)
- [Test forms locally](./operations/admin-tasks.md)
- [Monitor the site](./operations/monitoring.md)

**Look something up:**
- [Environment variables](./reference/environment-variables.md)
- [All routes/pages](./reference/routes.md)
- [Complete file inventory](./reference/file-inventory.md)

## Navigation Tips

- **Section CONTEXT.md** — Read first to understand what's in that section and in what order
- **Files in sections** — Organized by workflow, not alphabetically
- **Quick links** — Use "I Need To..." above to jump directly to what you're looking for
- **Breadcrumbs** — Each file references related files so you can navigate easily

## File Organization

```
docs/
├── CONTEXT.md (you are here)
├── business/
│   ├── CONTEXT.md
│   ├── overview.md
│   ├── etsy-workflow.md
│   └── content-strategy.md
├── tech/
│   ├── CONTEXT.md
│   ├── architecture.md
│   ├── folder-structure.md
│   └── development.md
├── operations/
│   ├── CONTEXT.md
│   ├── admin-tasks.md
│   ├── deployment.md
│   └── monitoring.md
└── reference/
    ├── CONTEXT.md
    ├── environment-variables.md
    ├── routes.md
    ├── commands.md
    ├── file-structure.md
    └── file-inventory.md
```

---

**For quick answers, always check the CONTEXT.md in the relevant section first.**
