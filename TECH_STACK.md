# Tech Stack — Simplify to Glorify

## Frontend Framework

**React 19 + Vite**
- Build tool: Vite (fast development, optimized production builds)
- Language: TypeScript
- Node version: See `package.json`
- Dev server: `npm run dev` → runs on http://localhost:5173 (default Vite port)
- Build: `npm run build` → outputs to `/dist` folder
- Preview: `npm run preview` → preview production build locally

## `/src` Folder Structure

```
src/
├── components/
│   ├── sections/       # Page sections (Hero, ContactSection, etc.)
│   └── ui/             # Reusable UI components (Button, Dialog, etc.)
├── data/
│   ├── articles/       # Article metadata and content (TypeScript data files)
│   ├── blogPosts/      # Blog post metadata
│   └── products.ts     # Product categories, types, and taxonomy
├── pages/              # Route pages (Home, Blog, Shop, etc.)
├── lib/                # Utility functions and helpers
├── types/              # Shared TypeScript type definitions
└── App.tsx             # Main app component
```

## UI Component Library

**Radix UI** + **Tailwind CSS**
- Radix UI provides: accordion, alert-dialog, dialog, dropdown-menu, label, navigation-menu, popover, select, separator, tabs, tooltip
- Styling: Tailwind CSS with class-variance-authority (CVA) for component variants
- Icons: Lucide React for all icon needs
- Toast notifications: Sonner library
- Theme switching: next-themes (light/dark mode support)

## Backend & Serverless

**Netlify Functions** (TypeScript/ESM)
- Location: `/netlify/functions/` (`.mts` files)
- Runtime: Node.js with esbuild bundler
- Two main functions:
  1. **generate-token.mts** — Creates one-time-use download codes (PIN-protected admin endpoint)
  2. **redeem-token.mts** — Validates code and returns PDF from blob storage
- Environment variables: `ADMIN_PIN` for token generation auth

## Data Storage

**Netlify Blobs** (Key-value store)
- Two separate stores (accessed via `@netlify/blobs`):
  1. **download-tokens** — Stores generated codes with metadata (productFile, productName, used status, timestamps)
  2. **product-pdfs** — Stores actual PDF files as blobs
- Used by Netlify Functions for serverless, no-database architecture

## Email & Forms

**Web3Forms**
- API endpoint: `https://api.web3forms.com/submit`
- Used in: `ContactSection.tsx`, `FreeResourceSection.tsx`
- Environment variable: `VITE_WEB3FORMS_KEY` (access key in `.env.local`)
- Flow: Form submission → Web3Forms API → auto-email to configured inbox
- No backend database needed; Web3Forms handles email delivery

## Deployment

**Netlify**
- Config file: `netlify.toml` (build command, function settings, redirects)
- Build command: `npm run build`
- Publish directory: `dist/` (Vite output)
- Functions bundler: esbuild
- Redirects: All non-matching routes redirect to `/index.html` for SPA routing

## Code Quality

**Linting**
- ESLint with TypeScript support (`npm run lint`)
- Config: `.eslintrc.cjs` (in repo root)

**Testing**
- No testing framework currently set up (no test files, no Vitest/Jest config)
- Recommendation: Consider adding if expanding team or critical features

## Analytics & Monitoring

- No tracking setup documented; check `src/App.tsx` or main components for any existing integrations
- Netlify Analytics available in dashboard (passive monitoring)

## Environment Variables

Store in `.env.local` (not committed; create locally):
```
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

And on Netlify (in deploy settings):
```
ADMIN_PIN=your_admin_pin_for_token_generation
```

## Local Development Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type check
tsc -b

# Lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Build & Deploy Workflow

1. Push to main branch → Netlify automatically builds and deploys
2. Build runs `npm run build` → TypeScript type-check + Vite bundling
3. Functions in `/netlify/functions/` are automatically deployed as serverless functions
4. Blobs (PDFs, download tokens) are persisted across deployments

## Key Dependencies Summary

| Package | Purpose |
|---------|---------|
| React 19 | Frontend framework |
| React Router | Client-side routing |
| Radix UI | Accessible component primitives |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| GSAP | Animations |
| Sonner | Toast notifications |
| @netlify/blobs | Serverless key-value storage |
| next-themes | Dark mode switching |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| ESLint | Code linting |
