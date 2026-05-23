# Deployment & Release Checklist

Complete process for deploying code changes to production.

## Pre-Deployment Checklist

**Do this before pushing to main:**

### 1. Code Quality

- [ ] `tsc -b` — Type-check passes (zero errors)
- [ ] `npm run lint` — Linting passes (or intentional)
- [ ] `npm run build` — Production build succeeds

### 2. Local Testing

- [ ] Tested in dev server (`npm run dev`)
- [ ] All pages load correctly
- [ ] Navigation works (menu, breadcrumbs, routes)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] If forms changed: tested locally and received email
- [ ] If download system changed: tested code generation and redemption

### 3. Git

- [ ] Changes staged: `git add .`
- [ ] Commit with clear message: `git commit -m "your message"`
- [ ] No uncommitted changes: `git status` shows clean

### 4. Review Changes

- [ ] `git log -1` — Verify commit message
- [ ] `git diff HEAD~1` — Verify what changed
- [ ] No accidental files committed (.env, etc.)

## Deploy

```powershell
# Push to main branch
git push origin main
```

That's it! Netlify automatically:
- Receives webhook
- Runs `npm run build`
- Tests production build
- Deploys to CDN
- Deploys functions
- Persists blobs
- Site live in ~2 minutes

## Post-Deployment

**After pushing, monitor deployment:**

### 1. Check Build Status

1. Go to https://app.netlify.com
2. Select your site
3. "Deploys" tab
4. Latest deploy should show "Published" status
5. Wait for build to complete (usually 1-2 minutes)

### 2. Check for Errors

If status is "Failed":
1. Click build
2. Read logs
3. Common errors:
   - TypeScript compilation error
   - Missing npm dependency
   - Environment variable missing
4. Fix code locally
5. Push again

### 3. Manual Smoke Tests

Once deployed:

- [ ] Visit https://simplifytoglorify.com
- [ ] Homepage loads
- [ ] Navigate to /products — loads
- [ ] Navigate to /blog — loads
- [ ] Navigate to /articles/carve-out-time-for-journaling — loads
- [ ] Try download page (/download) — loads
- [ ] Check navigation menu works
- [ ] Check footer links work
- [ ] Responsive: view on mobile

### 4. Test Changed Features

If you changed something specific:

- [ ] Download system: Try generating and redeeming a code
- [ ] Forms: Submit contact form, check smiln32@gmail.com
- [ ] Article: If added article, verify it's on site and loads
- [ ] Product page: If changed products, verify displays correctly

## Rollback (If Something's Wrong)

If something breaks in production:

### Option 1: Quick Fix (Preferred)

1. Identify problem
2. Fix code locally
3. Test locally
4. Push to main again (deploys new version)

### Option 2: Revert to Previous Deploy

```powershell
# See previous commits
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# This creates a NEW commit that undoes the bad commit
# Push
git push origin main

# Netlify redeploys again
```

**Why `git revert` instead of `git reset`?**
- Revert preserves history (better for team)
- Reset rewrites history (problematic if pushed)

### Option 3: Manual Rollback (Nuclear)

If you need to immediately revert to a previously deployed version:

1. Go to https://app.netlify.com
2. Select your site
3. Go to "Deploys"
4. Find previous good deploy
5. Click "..." menu
6. "Publish deploy"

**This restarts the old version without code changes.**

Then fix the code locally and re-deploy properly.

## Deployment Failures

Common issues and fixes:

| Issue | Fix |
|-------|-----|
| TypeScript error | `tsc -b` locally, fix errors, push again |
| Build timeout | Check for infinite loops or large files |
| Function not deploying | Check syntax in `netlify/functions/` |
| Blobs not accessible | Verify blob names and stores exist |
| Forms not sending | Check `VITE_WEB3FORMS_KEY` env var in Netlify |
| Site shows old version | Clear browser cache (Ctrl+Shift+R), wait 2 min |
| Admin PIN not working | Verify `ADMIN_PIN` in Netlify env settings |

## Environment Variables

If you added new environment variables:

1. Add to `.env.local` for local testing
2. Add to Netlify dashboard:
   - https://app.netlify.com → select site
   - Settings → Environment variables
   - Add variable
3. Re-deploy for variables to take effect

## Monitoring Post-Deploy

### Daily

- [ ] Site loads and is responsive
- [ ] Forms work (if applicable)
- [ ] Download system working (if applicable)

### Weekly

- [ ] Check Netlify deployment logs
- [ ] Check for any build warnings
- [ ] Monitor Blobs usage (product-pdfs, download-tokens)

## Deployment Workflow Summary

```
1. Make changes locally
   ↓
2. Test locally (npm run dev + netlify dev)
   ↓
3. Type-check, lint, build (tsc -b; npm run lint; npm run build)
   ↓
4. Git commit (git add . ; git commit -m "...")
   ↓
5. Push to main (git push origin main)
   ↓
6. Netlify auto-deploys (1-2 min)
   ↓
7. Smoke test live site (homepage, blog, products, etc.)
   ↓
8. Test changed features specifically
   ↓
9. Done! Site is live
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `tsc -b` | Type-check TypeScript |
| `npm run lint` | Lint code |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `git push origin main` | Deploy to production |
| `netlify deploy --prod` | Manual deploy (rarely needed) |
| `git revert <hash>` | Undo a commit (safe for public branches) |

---

→ See [admin-tasks.md](./admin-tasks.md) for code generation and testing

→ See [../tech/development.md](../tech/development.md) for local dev setup
