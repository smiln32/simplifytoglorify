# Claude Code Guidelines — Simplify to Glorify

## Shell Environment

- PowerShell on Windows. Use PowerShell-compatible syntax for all commands.
- Use `;` instead of `&&` to chain commands.
- Use `$env:VAR` for environment variables.

## Multi-File Changes

- Search the entire project first, then apply the change to all matching files in one pass.
- After editing, grep to confirm zero references to the old value remain.

## Business Context

- **Product:** Christian devotional PDFs (journals, prayer cards, scripture cards, 7-day resets, devotionals)
- **Sales channel:** Etsy (primary), website for content/discovery
- **Audience:** Christian women struggling with anxiety, grief, ADHD, caregiving, faith crises, etc.
- **Content gaps:** 14 product categories but only 9 content pieces; prioritize Anxiety, Grief, Caregiving, Chronic Pain next
- **Goal:** Drive organic traffic to articles → nurture with email → convert to product sales
- **Reference:** See `docs/business/CONTEXT.md` for detailed business documentation

## Tech Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS + Radix UI components
- **Backend:** Netlify Functions (TypeScript serverless)
- **Data:** Netlify Blobs (key-value store for tokens & PDFs)
- **Email:** Web3Forms API
- **Deployment:** Netlify (automatic on push)
- **Reference:** See `docs/tech/CONTEXT.md` for architecture and setup

## Development Workflow

### Running Locally

```powershell
# Install dependencies (one time)
npm install

# Start dev server
npm run dev
# Runs on http://localhost:5173

# In another terminal, run Netlify Functions locally
netlify dev
# Runs functions on http://localhost:8888/.netlify/functions/
```

### Before Pushing Changes

```powershell
# Type-check
tsc -b

# Lint
npm run lint

# Build for production (verify build succeeds)
npm run build

# Preview production build locally
npm run preview
```

### Testing Changes Locally

**Download system:** Use `/download` and `/admin/downloads` pages
- Download page: Test with a valid code from blob store
- Admin page: Use correct `ADMIN_PIN` (check Netlify env settings)
- Functions: Set `ADMIN_PIN` in `.env.local` for local testing, or run `netlify dev` (auto-loads Netlify env vars)

**Forms (Web3Forms):** Test contact/freebie signup forms
- Requires `VITE_WEB3FORMS_KEY` in `.env.local`
- Check email at smiln32@gmail.com to confirm delivery

**Email addresses for testing:**
- Notifications: smiln32@gmail.com

### Deploying

**Automatic (recommended):**
- Push to main branch → Netlify auto-builds and deploys
- Build: `npm run build`, publishes `/dist` folder
- Functions in `/netlify/functions/` auto-deployed

**Manual:**
```powershell
# Deploy via Netlify CLI
netlify deploy --prod
```

### Upload PDFs to Netlify Blobs (Admin Task)

Before generating download codes, PDF must be uploaded:
```powershell
netlify blobs:set product-pdfs <filename.pdf> --input=<path/to/local/file.pdf>
```

Then visit `/admin/downloads` to generate codes for that filename.

### Analytics & Monitoring

**Currently set up:** None (no Google Analytics, Segment, or tracking configured in code)

**Available options:**
- Netlify Analytics — Passive monitoring (no code needed), check Netlify dashboard
- Google Analytics — Would need to add gtag to `/src/main.tsx`
- Recommendation: Consider adding once content articles are live to track organic search traffic

**What matters:** Monitor Web3Forms email delivery (smiln32@gmail.com) and download code redemption via blob store
