# Development Setup & Workflow

Complete guide to setting up locally, running the dev server, and deploying changes.

## Local Setup (First Time)

### Prerequisites
- Node.js 18+ installed
- Git
- Code editor (VS Code recommended)
- Netlify CLI: `npm install -g netlify-cli`

### Initial Setup

```powershell
# Clone repo (if needed)
git clone <repo-url>
cd simplifytoglorify

# Install dependencies
npm install

# Set up environment variables
# Create .env.local in project root with:
#   VITE_WEB3FORMS_KEY=your_key
#   ADMIN_PIN=your_test_pin
```

## Running Locally

### Terminal 1 — Frontend Dev Server

```powershell
npm run dev
```

Open http://localhost:5173 in browser. Auto-reloads on file changes.

### Terminal 2 — Netlify Functions (Backend)

```powershell
netlify dev
```

Functions available at http://localhost:8888/.netlify/functions/

Set `ADMIN_PIN` in `.env.local` or Netlify will auto-load from environment.

### Both Running?

- Frontend: http://localhost:5173
- Functions: http://localhost:8888
- Frontend can call functions at http://localhost:8888/.netlify/functions/

## Before Pushing Changes

**Every time before pushing to main:**

### 1. Type-Check

```powershell
tsc -b
```

Must have **zero TypeScript errors**. Fix any errors before proceeding.

### 2. Lint

```powershell
npm run lint
```

Check for linting issues. Fix or suppress intentionally.

### 3. Build

```powershell
npm run build
```

Must succeed completely. This verifies:
- TypeScript compiles
- Vite bundles correctly
- No build errors
- Production build is valid

### 4. Preview Production Build

```powershell
npm run preview
```

Open http://localhost:4173 and manually test key flows:
- Homepage loads
- Can navigate to products
- Can navigate to articles/blog
- Download page loads
- Forms appear (contact, freebie)
- Admin page attempts (will fail without correct PIN, but should load UI)

## Testing Locally

### Testing the Download System

1. **Start:** `npm run dev` + `netlify dev`
2. **Generate codes:**
   - Visit http://localhost:8888/admin/downloads
   - Enter `ADMIN_PIN` from .env.local
   - Enter: Product filename: `prayer-journal-anxiety.pdf`, Product name: `Test Journal`
   - Generate 1 code
   - Copy code

3. **Test download:**
   - Visit http://localhost:5173/download
   - Paste code
   - Verify PDF "downloads" (browser handling)

### Testing Forms (Web3Forms)

1. **Contact Form:**
   - Visit http://localhost:5173
   - Scroll to contact section
   - Fill out form
   - Submit
   - Check smiln32@gmail.com for email delivery

2. **Freebie Signup:**
   - Scroll to freebie section
   - Fill out form
   - Submit
   - Check smiln32@gmail.com for email delivery

**Note:** Uses live Web3Forms API (not mocked). Will actually send emails.

### Testing Navigation & Pages

1. **Routes:**
   - `/` — Home page
   - `/products` — Product catalog
   - `/products/anxiety` — Category page
   - `/blog` — Blog listing
   - `/articles/carve-out-time-for-journaling` — Article page
   - `/download` — Download page
   - `/admin/downloads` — Admin page

2. **Breadcrumbs:** Test on each page
3. **Mobile:** Test responsive design

## Development Workflow

### Typical Day

```powershell
# 1. Start terminals
npm run dev          # Terminal 1
netlify dev          # Terminal 2

# 2. Make changes in /src

# 3. Test in browser (auto-reloads)

# 4. When done, type-check and lint
tsc -b
npm run lint

# 5. Fix any errors

# 6. Final build test
npm run build

# 7. Push to main
git add .
git commit -m "your message"
git push origin main

# 8. Netlify auto-deploys
```

### Changing Articles/Blog Posts

1. Edit or create file in `src/data/articles/` or `src/data/blogPosts/`
2. Export from `index.ts` in that folder
3. Refresh browser (auto-detects)
4. Test new article loads at correct URL

### Adding New Component

1. Create file: `src/components/MyComponent.tsx`
2. Import in parent component
3. Test in browser
4. Commit changes

### Adding New Page

1. Create file: `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Test at http://localhost:5173/my-page
4. Commit changes

## Deployment

### Automatic (Recommended)

```powershell
# Just push to main
git push origin main
```

Netlify webhook auto-triggers:
- Build: `npm run build`
- Deploy: `/dist` published
- Functions: Auto-deployed
- Live at: simplifytoglorify.com

### Manual Deploy (Rarely Needed)

```powershell
# Login to Netlify (one time)
netlify login

# Deploy
netlify deploy --prod
```

## Environment Variables

### Local Development (.env.local)

```
VITE_WEB3FORMS_KEY=abc123xyz
ADMIN_PIN=1234
```

### Production (Netlify Dashboard)

Set in Netlify Settings → Environment variables:
- `VITE_WEB3FORMS_KEY` — Web3Forms API key
- `ADMIN_PIN` — PIN for admin page

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm run dev` fails | Delete `node_modules`, run `npm install` |
| Type-check fails | Fix TypeScript errors (`tsc -b` will show them) |
| Build fails | Check error output; often missing dependencies |
| Functions don't work | Make sure `netlify dev` is running in separate terminal |
| Forms don't send emails | Check `VITE_WEB3FORMS_KEY` is set in .env.local |
| Admin page won't load | Check `ADMIN_PIN` is set; check browser console for errors |
| Download not working | Make sure PDF uploaded to blobs first (`netlify blobs:set ...`) |

## Performance

### Current

- No analytics tracking
- No code splitting (all code in single bundle)
- Images not optimized beyond compression

### If Slow

1. Check browser DevTools Performance tab
2. Look for large dependencies
3. Consider code splitting if bundle grows
4. Compress images: `node scripts/compress-images.mjs`

## Helpful Resources

- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Radix UI:** https://www.radix-ui.com
- **Netlify Functions:** https://docs.netlify.com/functions/overview
- **Netlify Blobs:** https://docs.netlify.com/blobs/overview

---

→ See [architecture.md](./architecture.md) for system overview

→ See [../operations/deployment.md](../operations/deployment.md) for deployment checklist
