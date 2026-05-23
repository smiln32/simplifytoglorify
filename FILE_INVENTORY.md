# Complete File Inventory — Simplify to Glorify

## Configuration & Build Files (12 files)

### Package Management
- `package.json` — npm dependencies, scripts
- `package-lock.json` — locked dependency versions

### TypeScript Config (3 files)
- `tsconfig.json` — root TypeScript config
- `tsconfig.app.json` — app TypeScript config
- `tsconfig.node.json` — Node/build TypeScript config

### CSS & Styling Config
- `tailwind.config.js` — Tailwind CSS configuration
- `postcss.config.js` — PostCSS configuration

### Build & Deployment Config
- `vite.config.ts` — Vite build configuration (counted in TypeScript below)
- `components.json` — Component library config (Radix UI)
- `netlify.toml` — Netlify deployment config

### Environment & Git
- `.env` — environment variables (local)
- `.gitignore` — git ignore rules

### HTML Entry
- `index.html` — Root HTML template for SPA

---

## Documentation Files (5 files)

- `CLAUDE.md` — Project guidelines, dev workflow, business context, tech stack
- `BUSINESS.md` — Product taxonomy, audience, content strategy, sales channels
- `TECH_STACK.md` — Frontend framework, folder structure, integrations, testing
- `ARTICLE_IDEAS.md` — Content roadmap with 11 new article ideas
- `FILE_INVENTORY.md` — This file (complete project file inventory)

---

## Build & Utility Scripts (1 file)

- `scripts/compress-images.mjs` — Image compression script (Node.js)

---

## Claude Code Config (2 files)

- `.claude/commands/safe-deploy.md` — Safe deploy command configuration
- `.claude/logs/link-audit.txt` — Link audit log file

---

## Backend - Netlify Functions (2 files)

- `netlify/functions/generate-token.mts` — Creates one-time download codes (PIN-protected)
- `netlify/functions/redeem-token.mts` — Validates code and returns PDF

---

## Frontend - TypeScript Files (49 files total)

### Entry Points (3 files)
- `src/main.tsx` — React app entry point
- `src/App.tsx` — Root component with routing
- `src/index.css` — Global styles (not TypeScript but in src)

### Pages & Routes (7 files)
- `src/pages/Download.tsx` — Customer download page (enter code → get PDF)
- `src/pages/AdminDownloads.tsx` — Admin page (PIN-protected, generate codes)
- `src/pages/Products.tsx` — Product shop/category listing
- `src/pages/ProductCategory.tsx` — Individual category page with products
- `src/pages/Blog.tsx` — Blog post listing
- `src/pages/BlogPost.tsx` — Individual blog post page
- `src/pages/ArticlePage.tsx` — Individual article page

### Components - Navigation & Layout (5 files)
- `src/components/Breadcrumbs.tsx` — Breadcrumb navigation
- `src/components/PageNav.tsx` — Page navigation
- `src/components/ScrollToTop.tsx` — Scroll to top button
- `src/components/sections/Navbar.tsx` — Top navigation bar
- `src/components/sections/Footer.tsx` — Footer section

### Components - Page Sections (9 files)
- `src/components/sections/HeroSection.tsx` — Hero/banner section
- `src/components/sections/AboutSection.tsx` — About/story section
- `src/components/sections/TopicsSection.tsx` — Product topics/categories section
- `src/components/sections/FeaturedSection.tsx` — Featured products section
- `src/components/sections/ArticlesSection.tsx` — Articles listing section
- `src/components/sections/BlogSection.tsx` — Blog posts listing section
- `src/components/sections/ContactSection.tsx` — Contact form section (Web3Forms)
- `src/components/sections/FreeResourceSection.tsx` — Freebie signup section (Web3Forms)
- `src/components/sections/ScriptureBanner.tsx` — Scripture banner section

### Components - UI Library (6 files - Radix UI + Tailwind)
- `src/components/ui/button.tsx` — Button component
- `src/components/ui/dialog.tsx` — Dialog/modal component
- `src/components/ui/input.tsx` — Input field component
- `src/components/ui/sheet.tsx` — Side sheet/drawer component
- `src/components/ui/tabs.tsx` — Tabs component
- `src/components/ui/sonner.tsx` — Toast notification component wrapper

### Data - Content Files

#### Articles (8 files)
- `src/data/articles/index.ts` — Exports all articles metadata
- `src/data/articles/types.ts` — Article TypeScript types
- `src/data/articles/depression-journals-mental-wellbeing.ts` — Article content
- `src/data/articles/carve-out-time-for-journaling.ts` — Article content
- `src/data/articles/daily-prayer-journal.ts` — Article content
- `src/data/articles/journaling-helps-us-think-pray-and-heal.ts` — Article content
- `src/data/articles/when-gratitude-becomes-a-place-to-rest.ts` — Article content
- `src/data/articles/how-journaling-heals-the-soul.ts` — Article content

#### Blog Posts (5 files)
- `src/data/blogPosts/index.ts` — Exports all blog posts metadata
- `src/data/blogPosts/types.ts` — Blog post TypeScript types
- `src/data/blogPosts/finding-peace-in-uncertainty.ts` — Blog post content
- `src/data/blogPosts/grace-for-the-weary.ts` — Blog post content
- `src/data/blogPosts/the-art-of-slowing-down.ts` — Blog post content

#### Product & Topic Data (2 files)
- `src/data/products.ts` — Product categories, types, taxonomy (14 categories)
- `src/data/topicBundles.ts` — Topic bundles/groupings

### Utilities & Types (2 files)
- `src/lib/utils.ts` — Utility functions (clsx, etc.)
- `src/types/index.ts` — Shared TypeScript type definitions

### Config File (1 file)
- `vite.config.ts` — Vite build configuration

---

## Public Assets

### Images (30 files)

**Category/Topic Images (8):**
- `public/images/topic_anxiety.png` — Anxiety category
- `public/images/topic_depression.png` — Depression category
- `public/images/topic_gratitude.png` — Gratitude category
- `public/images/topic_peace.png` — Peace category
- `public/images/topic_uncertainty.png` — Uncertainty category
- `public/images/topic-caregiving.jpg` — Caregiving category
- `public/images/topic-grief.jpg` — Grief category
- `public/images/topic-prayer.jpg` — Prayer category

**Article/Blog Images (9):**
- `public/images/finding_peace_in_uncertainty.png` — Blog post
- `public/images/grace_for_the_weary.png` — Blog post
- `public/images/the_art_of_slowing_down.png` — Blog post
- `public/images/journaling_for_the_mind.png` — Article
- `public/images/journaling_helps_the_mind.png` — Article
- `public/images/leaning_into_prayer.png` — Article
- `public/images/rest_for_the_mind.png` — Article
- `public/images/think_pray_heal.png` — Article
- `public/images/time_for_journaling.png` — Article

**General/Page Images (8):**
- `public/images/journaling-at-home.jpg` — Generic journaling
- `public/images/journaling_one.png` — Generic journaling
- `public/images/journaling_for_wellness.png` — Generic journaling
- `public/images/journaling_helps.png` — Generic journaling
- `public/images/processing_emotions.png` — Generic emotion
- `public/images/writing_as_a_process.png` — Generic writing
- `public/images/writing_in_a_journal.png` — Generic journaling
- `public/images/therapeutic_writing.png` — Generic therapeutic

**About/Story Images (4):**
- `public/images/about-story.png` — About page
- `public/images/comforting-environment.jpg` — About page
- `public/images/faith-based-living.png` — About page
- `public/images/slowing_down.png` — Mindfulness/general

**CTA/Feature Images (1):**
- `public/images/free-resource.jpg` — Freebie section

### Other Public Assets (2 files)
- `public/prayer-cards-freebie.pdf` — Downloadable free resource (prayer cards)
- `public/scripture_of_the_day_widget.html` — Embedded Scripture widget

---

## File Count Summary

| Category | Count |
|----------|-------|
| TypeScript files (.ts, .tsx, .mts) | 49 |
| Image files | 30 |
| Documentation (.md) | 5 |
| Configuration & build files | 12 |
| Claude code config | 2 |
| Public assets (PDF, HTML) | 2 |
| CSS | 1 |
| Build scripts | 1 |
| HTML entry point | 1 |
| **TOTAL** | **102** |

### TypeScript Breakdown (49 files)
- Netlify Functions (backend): 2
- Pages/routes: 7
- Components: 20 (5 nav/layout + 9 sections + 6 UI)
- Data files: 15 (8 articles + 5 blog posts + 2 product/topic)
- Utilities & types: 2
- Entry/config: 3 (main.tsx, App.tsx, vite.config.ts)

### Build & Config Breakdown (12 files)
- Package management: 2
- TypeScript: 3
- CSS tools: 2
- Deployment: 1
- Components: 1
- Environment & Git: 2
- HTML entry: 1
