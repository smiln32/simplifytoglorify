# Architecture Overview

## Tech Stack

```
Frontend:        React 19 + Vite + TypeScript
Styling:         Tailwind CSS + Radix UI
Routing:         React Router DOM
Build:           Vite
Backend:         Netlify Functions (TypeScript)
Data Storage:    Netlify Blobs (key-value)
Email:           Web3Forms API
Deployment:      Netlify (GitHub → auto-deploy)
Hosting:         Netlify
```

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser / User                    │
└──────────────┬──────────────────────────┬────────────┘
               │                          │
        ┌──────▼──────┐          ┌────────▼─────┐
        │  React App  │          │  Web3Forms   │
        │  (Frontend) │          │  (Email API) │
        └──────┬──────┘          └────────┬─────┘
               │                          │
        ┌──────▼──────────────────────────▼──┐
        │   Netlify (Deployment + Functions)   │
        │                                      │
        │  ┌──────────────────────────────┐   │
        │  │  Netlify Functions (Backend) │   │
        │  │  - generate-token.mts        │   │
        │  │  - redeem-token.mts          │   │
        │  └────────┬────────────┬────────┘   │
        │           │            │             │
        │  ┌────────▼──┐  ┌──────▼─────────┐  │
        │  │ Blobs     │  │ Blobs           │  │
        │  │ Store:    │  │ Store:          │  │
        │  │ download- │  │ product-pdfs    │  │
        │  │ tokens    │  │ (PDF files)     │  │
        │  └───────────┘  │                 │  │
        │                 └─────────────────┘  │
        └──────────────────────────────────────┘
```

## Frontend Architecture

### Pages (React Router)
- `/` — Home page
- `/products` — Product catalog (all categories)
- `/products/:category` — Category page (products in category)
- `/blog` — Blog post listing
- `/blog/:slug` — Individual blog post
- `/articles/:slug` — Individual article
- `/download` — Download page (customer enters code)
- `/admin/downloads` — Admin page (generate codes, PIN-protected)

### Component Structure

**Sections (Full-width content blocks):**
- HeroSection, AboutSection, TopicsSection, FeaturedSection
- ArticlesSection, BlogSection, ContactSection, FreeResourceSection
- ScriptureBanner

**Reusable Components:**
- Navbar, Footer, Breadcrumbs, PageNav, ScrollToTop

**UI Components (Radix + Tailwind):**
- Button, Dialog, Input, Sheet, Tabs, Sonner (toasts)

### Data Organization

**Static Data (TypeScript files):**
- `/src/data/articles/` — 6 articles as .ts files
- `/src/data/blogPosts/` — 3 blog posts as .ts files
- `/src/data/products.ts` — 14 categories + 5 product types
- `/src/data/topicBundles.ts` — Topic groupings

## Backend Architecture

### Netlify Functions (Serverless)

**generate-token.mts** (Admin API)
```
POST /.netlify/functions/generate-token
├─ Requires: PIN (ADMIN_PIN env var)
├─ Accepts: { pin, productFile, productName, quantity }
├─ Stores codes in: download-tokens blob store
└─ Returns: { codes: ["ABC5-DEFG", ...] }
```

**redeem-token.mts** (Public API)
```
POST /.netlify/functions/redeem-token
├─ Accepts: { code }
├─ Checks: download-tokens blob store
├─ Retrieves: PDF from product-pdfs blob store
├─ Updates: download-tokens (marks as used)
└─ Returns: PDF file
```

## Data Storage

### Netlify Blobs (Key-Value Store)

**Two separate stores:**

1. **download-tokens**
   - Key: Code (e.g., "ABC5-DEFG")
   - Value: { productFile, productName, used, createdAt, usedAt? }
   - Consistency: Strong (prevents double-redemption)

2. **product-pdfs**
   - Key: Filename (e.g., "prayer-journal-anxiety.pdf")
   - Value: PDF file (binary blob)
   - Consistency: Strong

## Email Integration

### Web3Forms API

**Contact Form** (src/components/sections/ContactSection.tsx)
```
POST https://api.web3forms.com/submit
├─ Access key: VITE_WEB3FORMS_KEY
├─ Sends to: smiln32@gmail.com
└─ Subject: Contact inquiry
```

**Freebie Signup** (src/components/sections/FreeResourceSection.tsx)
```
POST https://api.web3forms.com/submit
├─ Access key: VITE_WEB3FORMS_KEY
├─ Sends to: smiln32@gmail.com
└─ Subject: Free resource signup
```

**Why Web3Forms?** Netlify Forms requires paid plan for email. Web3Forms is free and reliable.

## Deployment Pipeline

```
Developer → Push to main → GitHub
                             ↓
                        Netlify (Webhook)
                             ↓
            ┌────────────────┴────────────────┐
            │                                 │
        Build:                            Deploy:
        npm run build                  - /dist → CDN
        (TypeScript + Vite)            - Functions → Deploy
                                       - Blobs → Persist
            ↓                                 ↓
        /dist (published)          Live on simplifytoglorify.com
        
        Functions auto-deployed
        Blobs persisted
```

### Environment Variables

**On Netlify (production):**
- `VITE_WEB3FORMS_KEY` — Web3Forms API key (public)
- `ADMIN_PIN` — PIN for code generation (private)

**Local dev (.env.local):**
```
VITE_WEB3FORMS_KEY=your_key
ADMIN_PIN=a-long-random-string-here
```

## Security Considerations

1. **Download codes** — One-time use only (marked in Blobs after redemption)
2. **Admin PIN** — Server-side only (not exposed to browser)
3. **PDFs** — Stored in private Blobs (not publicly accessible)
4. **Web3Forms** — Handles email delivery; no data stored locally

## Scaling Considerations

**Current:**
- No analytics tracking
- No database (Blobs sufficient for current scale)
- No caching layer
- No rate limiting

**If needed:**
- Add Google Analytics for traffic tracking
- Add Sentry for error monitoring
- Consider Redis cache for frequently accessed content
- Add rate limiting to API endpoints

---

→ See [folder-structure.md](./folder-structure.md) for where files are organized

→ See [development.md](./development.md) for local setup
