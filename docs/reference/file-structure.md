# File Structure (Quick Reference)

Condensed folder layout. See [../tech/folder-structure.md](../tech/folder-structure.md) for detailed breakdown.

## Quick View

```
src/
├── pages/                   # 7 route pages
├── components/
│   ├── sections/            # 9 page sections
│   └── ui/                  # 6 Radix UI components
├── data/
│   ├── articles/            # 8 files (6 articles + types + index)
│   ├── blogPosts/           # 5 files (3 posts + types + index)
│   ├── products.ts          # 14 categories
│   └── topicBundles.ts
├── lib/                     # utils.ts
├── types/                   # index.ts
├── App.tsx                  # root + routing
├── main.tsx                 # entry point
└── index.css                # global styles

public/
├── images/                  # 30 images
├── prayer-cards-freebie.pdf
└── scripture_of_the_day_widget.html

netlify/functions/
├── generate-token.mts       # create codes
└── redeem-token.mts         # validate codes & return PDF

docs/                        # (this folder)
├── CONTEXT.md               # navigation guide
├── business/
├── tech/
├── operations/
└── reference/
```

## File Counts

- **TypeScript (.ts, .tsx, .mts):** 49 files
- **Documentation (.md):** 15 files (4 root + 11 in docs/)
- **Configuration:** 12 files
- **Images:** 30 files
- **Other:** CSS, HTML, scripts, assets
- **Total:** 102 files

## Finding Files

| Need to Find | Look Here |
|--------------|-----------|
| React component | `src/components/` |
| Page/route | `src/pages/` |
| Article content | `src/data/articles/` |
| Blog post content | `src/data/blogPosts/` |
| Product info | `src/data/products.ts` |
| Netlify function | `netlify/functions/` |
| Image | `public/images/` |
| Type definitions | `src/types/index.ts` |
| Utility function | `src/lib/utils.ts` |
| Documentation | `docs/` |

## Adding Files

### New Article

1. Create: `src/data/articles/my-slug.ts`
2. Export from: `src/data/articles/index.ts`
3. Add image to: `public/images/my-slug.png`

### New Blog Post

1. Create: `src/data/blogPosts/my-slug.ts`
2. Export from: `src/data/blogPosts/index.ts`
3. Add image to: `public/images/my-slug.png`

### New Page

1. Create: `src/pages/MyPage.tsx`
2. Add route in: `src/App.tsx`

### New Component

1. Create: `src/components/MyComponent.tsx` (or `src/components/sections/MySectionComponent.tsx`)
2. Import where used

---

→ For detailed breakdown, see [../tech/folder-structure.md](../tech/folder-structure.md)
