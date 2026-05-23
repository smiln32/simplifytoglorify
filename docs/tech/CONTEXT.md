# Tech — Development & Architecture

This section covers how the website is built, how to set it up locally, and where things live in the code.

## Files in Reading Order

1. **[architecture.md](./architecture.md)** — Frontend, backend, deployment. Read first for overview.
   - React 19 + Vite + TypeScript
   - Netlify Functions (serverless backend)
   - Netlify Blobs (data storage)

2. **[folder-structure.md](./folder-structure.md)** — Where files are organized. Read when finding code.
   - `/src/components/` — React components
   - `/src/pages/` — Route pages
   - `/src/data/` — Content (articles, products)
   - `/netlify/functions/` — Backend functions

3. **[development.md](./development.md)** — Local setup and workflow. Read when starting work.
   - `npm run dev` — Start dev server
   - `netlify dev` — Run functions locally
   - Type-check, lint, build commands
   - Testing procedures

## Common Questions

| Question | File |
|----------|------|
| "What tech does this site use?" | architecture.md |
| "How does the download system work?" | architecture.md |
| "Where are the React components?" | folder-structure.md |
| "Where are the articles stored?" | folder-structure.md |
| "How do I run the site locally?" | development.md |
| "What commands do I need to know?" | development.md |
| "How do I test my changes?" | development.md |
| "What's in each folder?" | folder-structure.md |

## Quick Facts

- **Frontend:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS + Radix UI components
- **Backend:** Netlify Functions (TypeScript)
- **Data storage:** Netlify Blobs (key-value store)
- **Email:** Web3Forms API
- **Deployment:** Netlify (auto-deploys on push to main)
- **Testing:** None currently set up

## Quick Commands

```powershell
# Local dev
npm install          # One time
npm run dev         # Frontend on http://localhost:5173
netlify dev         # Functions on http://localhost:8888

# Before pushing
tsc -b              # Type-check
npm run lint        # Lint
npm run build       # Build for production
npm run preview     # Preview production build

# Deploy
netlify deploy --prod  # Manual deploy (usually not needed)
```

## Dev Workflow

1. **Make changes** in `/src`
2. **Type-check:** `tsc -b`
3. **Lint:** `npm run lint`
4. **Build:** `npm run build` (verify no errors)
5. **Test locally:** `npm run dev` and browser testing
6. **Push to main:** Auto-deploys via Netlify

## Navigation

- **To business context** → [../business/CONTEXT.md](../business/CONTEXT.md)
- **To operations** → [../operations/CONTEXT.md](../operations/CONTEXT.md)
- **Back to main docs** → [../CONTEXT.md](../CONTEXT.md)
