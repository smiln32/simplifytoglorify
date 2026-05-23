# Folder Structure & File Organization

Complete breakdown of where everything lives in the codebase.

## Root Level

```
simplifytoglorify/
├── docs/                    # Documentation (this folder)
├── src/                     # Source code
├── public/                  # Static assets
├── netlify/                 # Backend (Functions)
├── .claude/                 # Claude Code config
├── scripts/                 # Build & utility scripts
│
├── CLAUDE.md                # Project guidelines
├── BUSINESS.md              # Business overview
├── TECH_STACK.md            # Tech stack details
├── ARTICLE_IDEAS.md         # Content roadmap
├── FILE_INVENTORY.md        # Complete file list
│
├── package.json             # npm dependencies
├── vite.config.ts           # Build config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
├── netlify.toml             # Netlify deployment config
│
└── index.html               # SPA entry point
```

## /src — Source Code

```
src/
├── main.tsx                 # React app entry point
├── App.tsx                  # Root component + routing
├── index.css                # Global styles
│
├── components/              # React components
│   ├── Breadcrumbs.tsx
│   ├── PageNav.tsx
│   ├── ScrollToTop.tsx
│   ├── sections/            # Full-width page sections
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TopicsSection.tsx
│   │   ├── FeaturedSection.tsx
│   │   ├── ArticlesSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FreeResourceSection.tsx
│   │   └── ScriptureBanner.tsx
│   │
│   └── ui/                  # Radix UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       ├── tabs.tsx
│       └── sonner.tsx
│
├── pages/                   # Route pages (React Router)
│   ├── Download.tsx         # Customer download page
│   ├── AdminDownloads.tsx   # Admin code generation
│   ├── Products.tsx         # Product catalog
│   ├── ProductCategory.tsx  # Category details
│   ├── Blog.tsx             # Blog listing
│   ├── BlogPost.tsx         # Individual post
│   └── ArticlePage.tsx      # Individual article
│
├── data/                    # Static content & config
│   ├── articles/            # 6 articles
│   │   ├── index.ts         # Exports all articles
│   │   ├── types.ts         # TypeScript types
│   │   ├── depression-journals-mental-wellbeing.ts
│   │   ├── carve-out-time-for-journaling.ts
│   │   ├── daily-prayer-journal.ts
│   │   ├── journaling-helps-us-think-pray-and-heal.ts
│   │   ├── when-gratitude-becomes-a-place-to-rest.ts
│   │   └── how-journaling-heals-the-soul.ts
│   │
│   ├── blogPosts/           # 3 blog posts
│   │   ├── index.ts         # Exports all posts
│   │   ├── types.ts         # TypeScript types
│   │   ├── finding-peace-in-uncertainty.ts
│   │   ├── grace-for-the-weary.ts
│   │   └── the-art-of-slowing-down.ts
│   │
│   ├── products.ts          # 14 categories, 5 types
│   └── topicBundles.ts      # Topic groupings
│
├── lib/                     # Utilities
│   └── utils.ts             # Helper functions
│
└── types/                   # Shared TypeScript types
    └── index.ts
```

## /public — Static Assets

```
public/
├── images/                  # 30 images
│   ├── topic_*.png          # Category images
│   ├── topic-*.jpg
│   ├── *_peace_*.png        # Article/post images
│   ├── journaling_*.png
│   ├── about-story.png
│   ├── free-resource.jpg
│   └── ...
│
├── prayer-cards-freebie.pdf # Freebie download
└── scripture_of_the_day_widget.html
```

## /netlify — Backend

```
netlify/
└── functions/               # Serverless functions
    ├── generate-token.mts   # Creates download codes (admin)
    └── redeem-token.mts     # Returns PDF to customer
```

**Functions access:**
- POST /.netlify/functions/generate-token
- POST /.netlify/functions/redeem-token

## /scripts — Build Utilities

```
scripts/
└── compress-images.mjs      # Image compression script
```

Run: `node scripts/compress-images.mjs`

## /docs — Documentation (This Folder)

```
docs/
├── CONTEXT.md               # Main navigation guide
├── business/                # Business & sales
│   ├── CONTEXT.md
│   ├── overview.md
│   ├── etsy-workflow.md
│   └── content-strategy.md
├── tech/                    # Development & architecture
│   ├── CONTEXT.md
│   ├── architecture.md
│   ├── folder-structure.md  # (you are here)
│   └── development.md
├── operations/              # Admin tasks & deployment
│   ├── CONTEXT.md
│   ├── admin-tasks.md
│   ├── deployment.md
│   └── monitoring.md
└── reference/               # Lookups & checklists
    ├── CONTEXT.md
    ├── environment-variables.md
    ├── routes.md
    ├── commands.md
    ├── file-structure.md
    └── file-inventory.md
```

## /.claude — Claude Code Config

```
.claude/
├── commands/                # Custom commands
│   └── safe-deploy.md
└── logs/                    # Logs
    └── link-audit.txt
```

## Important Paths

| Path | Purpose |
|------|---------|
| `src/components/` | All React components |
| `src/pages/` | Route-based pages |
| `src/data/articles/` | Article content |
| `src/data/blogPosts/` | Blog post content |
| `src/data/products.ts` | Product taxonomy |
| `netlify/functions/` | Backend API |
| `public/images/` | Image assets |
| `docs/` | Documentation |

## Adding New Content

### Add a New Article

1. Create file: `src/data/articles/my-article-slug.ts`
2. Follow format from existing articles
3. Export from `src/data/articles/index.ts`
4. Add image to `public/images/`
5. Route auto-generated: `/articles/my-article-slug`

### Add a New Blog Post

1. Create file: `src/data/blogPosts/my-post-slug.ts`
2. Follow format from existing posts
3. Export from `src/data/blogPosts/index.ts`
4. Add image to `public/images/`
5. Route auto-generated: `/blog/my-post-slug`

### Add a New Page

1. Create file: `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx` React Router config
3. Import page in App.tsx
4. Add route definition

## File Naming Conventions

- **Components:** PascalCase, .tsx (e.g., `HeroSection.tsx`)
- **Pages:** PascalCase, .tsx (e.g., `Download.tsx`)
- **Data files:** kebab-case, .ts (e.g., `daily-prayer-journal.ts`)
- **Utils:** camelCase, .ts (e.g., `utils.ts`)
- **Images:** kebab-case, .png/.jpg (e.g., `topic_anxiety.png`)
- **Articles/posts:** kebab-case, .ts (e.g., `finding-peace-in-uncertainty.ts`)

---

→ See [development.md](./development.md) for local setup and commands

→ See [../reference/file-inventory.md](../reference/file-inventory.md) for complete file listing
