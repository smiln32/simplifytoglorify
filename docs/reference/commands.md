# Commands Reference

All npm scripts and useful CLI commands.

## NPM Scripts

These commands are in `package.json` and run with `npm run <command>`:

| Command | What It Does | When to Use |
|---------|-------------|------------|
| `npm run dev` | Start dev server (port 5173) | Daily development |
| `npm run build` | Build production bundle | Before pushing code |
| `npm run preview` | Preview production build locally | Before deploying |
| `npm run lint` | Run ESLint | Before pushing code |

## Development Workflow

```powershell
# Terminal 1: Frontend dev server
npm run dev

# Terminal 2: Netlify Functions + Blobs
netlify dev

# Browser: http://localhost:5173
```

Auto-reloads on file changes.

## Pre-Deployment Commands

Run these in order before pushing to main:

```powershell
# 1. Type-check (will show TypeScript errors)
tsc -b

# 2. Lint code
npm run lint

# 3. Build for production (will show build errors)
npm run build

# 4. Preview production build (manually test)
npm run preview
# Then browser: http://localhost:4173
```

All must succeed with no errors before pushing.

## Netlify CLI Commands

Must have `netlify-cli` installed: `npm install -g netlify-cli`

### Setup

| Command | Purpose |
|---------|---------|
| `netlify login` | Authenticate to Netlify (one time) |
| `netlify link` | Link to Netlify site (usually auto) |

### Local Development

| Command | Purpose | Port |
|---------|---------|------|
| `netlify dev` | Run local dev server with functions | 8888 |

### Blobs (PDF Storage)

| Command | Purpose |
|---------|---------|
| `netlify blobs:set <store> <key> --input=<file>` | Upload file to Blobs |
| Example | `netlify blobs:set product-pdfs prayer.pdf --input=./downloads/prayer.pdf` |

### Deployment

| Command | Purpose |
|---------|---------|
| `netlify deploy --prod` | Manually deploy (usually not needed) |
| `netlify deploy` | Deploy to staging (preview) |

### Status & Logs

| Command | Purpose |
|---------|---------|
| `netlify status` | Check site status |
| `netlify open` | Open site in browser |
| `netlify open --admin` | Open Netlify dashboard |

## Git Commands

### Basic Workflow

```powershell
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "your message"

# Push to main (auto-deploys)
git push origin main

# View recent commits
git log --oneline -10
```

### Reverting Changes

```powershell
# See what changed
git diff

# Undo uncommitted changes
git checkout .

# Revert a published commit
git revert <commit-hash>
```

## TypeScript Commands

```powershell
# Type-check (shows all TypeScript errors)
tsc -b

# Clear build cache and re-check
tsc -b --clean
tsc -b
```

## Running Build Scripts

```powershell
# Compress images
node scripts/compress-images.mjs
```

## Local Testing

### Test Download System

```powershell
# 1. Start terminals
npm run dev
netlify dev

# 2. Visit admin
# http://localhost:8888/admin/downloads

# 3. Generate code (use admin frontend)

# 4. Test download
# http://localhost:5173/download
```

### Test Forms

```powershell
# 1. Make sure npm run dev is running

# 2. Submit contact form
# Check smiln32@gmail.com for email

# 3. Submit freebie form
# Check smiln32@gmail.com for email
```

## Port Reference

| Port | Service | Access |
|------|---------|--------|
| 5173 | Frontend (Vite) | http://localhost:5173 |
| 8888 | Netlify Functions | http://localhost:8888 |
| 4173 | Production preview | http://localhost:4173 |

## Environment Setup

```powershell
# Install dependencies
npm install

# Install Netlify CLI globally (one time)
npm install -g netlify-cli

# Authenticate Netlify (one time)
netlify login
```

## Quick Reference

```powershell
# Development
npm run dev                           # Start dev
netlify dev                          # Start functions locally
tsc -b                               # Type-check
npm run lint                         # Lint

# Before deploy
tsc -b && npm run lint && npm run build  # All checks

# Deploy
git push origin main                 # Push to main (auto-deploys)

# Admin tasks
netlify blobs:set product-pdfs file.pdf --input=./file.pdf  # Upload PDF
netlify status                       # Check deployment status
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm run dev` won't start | Delete `node_modules`, run `npm install` |
| `netlify dev` won't start | Run `netlify login` then `netlify link` |
| Build fails | Run `tsc -b` to see TypeScript errors |
| Commands not recognized | Install globally: `npm install -g netlify-cli` |
| Port already in use | Kill process or use different port |

---

→ See [../tech/development.md](../tech/development.md) for dev setup

→ See [../operations/deployment.md](../operations/deployment.md) for deployment checklist
