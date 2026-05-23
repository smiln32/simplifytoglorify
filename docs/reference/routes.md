# Routes Reference

All pages and routes in the application.

## Main Routes

| Route | Page Component | Purpose |
|-------|---|---------|
| `/` | (home layout) | Homepage with hero, topics, featured, articles, blog |
| `/products` | `Products.tsx` | Product catalog (all categories) |
| `/products/:category` | `ProductCategory.tsx` | Individual category page (e.g., `/products/anxiety`) |
| `/blog` | `Blog.tsx` | Blog post listing |
| `/blog/:slug` | `BlogPost.tsx` | Individual blog post (e.g., `/blog/finding-peace-in-uncertainty`) |
| `/articles/:slug` | `ArticlePage.tsx` | Individual article (e.g., `/articles/carve-out-time-for-journaling`) |
| `/download` | `Download.tsx` | Customer download page (enter code → get PDF) |
| `/admin/downloads` | `AdminDownloads.tsx` | Admin page (generate codes, PIN-protected) |

## Route Patterns

### Product Categories

Valid category slugs (from `src/data/products.ts`):
- `adhd`
- `anxiety`
- `caregiving`
- `chronic-pain`
- `depression`
- `gratitude`
- `grief`
- `loneliness`
- `patience`
- `peace`
- `prayer`
- `regret`
- `struggling-with-faith`
- `teachers`
- `uncertainty`

**Example:** `/products/anxiety` shows anxiety products and info

### Blog Posts

Valid blog post slugs (from `src/data/blogPosts/index.ts`):
- `finding-peace-in-uncertainty`
- `grace-for-the-weary`
- `the-art-of-slowing-down`

**Example:** `/blog/finding-peace-in-uncertainty`

### Articles

Valid article slugs (from `src/data/articles/index.ts`):
- `depression-journals-mental-wellbeing`
- `carve-out-time-for-journaling`
- `daily-prayer-journal`
- `journaling-helps-us-think-pray-and-heal`
- `when-gratitude-becomes-a-place-to-rest`
- `how-journaling-heals-the-soul`

**Example:** `/articles/daily-prayer-journal`

## Special Routes

### Download System

| Route | Purpose |
|-------|---------|
| `/download` | Customer enters code and downloads PDF |
| `/admin/downloads` | Admin generates download codes (PIN-protected) |

### API Routes (Netlify Functions)

| Route | Method | Purpose |
|-------|--------|---------|
| `/.netlify/functions/generate-token` | POST | Create download codes (admin) |
| `/.netlify/functions/redeem-token` | POST | Validate code and return PDF (public) |

## Navigation Components

### Navbar
- Home link
- Products dropdown
- Blog link
- Articles link
- Contact link
- Download link

### Footer
- Links to all main pages
- Social links (if configured)
- Copyright

### Breadcrumbs
- Dynamic based on current route
- Home → Category → Product (if on product)
- Home → Blog → Post (if on post)

## Dynamic Routes

Routes that accept parameters:

### /products/:category
- `category` = product category slug
- Example: `/products/anxiety` → shows Anxiety products

### /blog/:slug
- `slug` = blog post slug
- Example: `/blog/grace-for-the-weary` → shows specific post

### /articles/:slug
- `slug` = article slug
- Example: `/articles/daily-prayer-journal` → shows specific article

## 404 Handling

Any route not listed above will show 404. SPA redirects to `/` for undefined routes.

## Current Homepage Content

Route: `/`

Sections (in order):
1. Navbar
2. Hero section
3. Topics section (product categories overview)
4. Featured section (highlighted products)
5. Articles section (recent articles)
6. Blog section (recent blog posts)
7. Contact section (contact form)
8. Free resource section (freebie signup)
9. Scripture banner (optional)
10. Footer

## Adding New Routes

If adding a new page:

1. Create component: `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx` router config:
   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Update navigation links if needed
4. Test at http://localhost:5173/my-page

## Testing Routes

```powershell
# Start dev server
npm run dev

# Test routes in browser
http://localhost:5173/
http://localhost:5173/products
http://localhost:5173/products/anxiety
http://localhost:5173/blog
http://localhost:5173/articles/daily-prayer-journal
http://localhost:5173/download
http://localhost:5173/admin/downloads
```

---

→ See [../tech/folder-structure.md](../tech/folder-structure.md) for where pages are defined

→ See [../tech/development.md](../tech/development.md) for local testing
