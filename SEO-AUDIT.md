# SEO Content Audit — All Articles & Blog Posts
## Simplify to Glorify
### Date: 2026-06-10 · Scope: 42 posts (21 articles + 21 blog posts)

---

## SEO Health Score: 62 / 100

**Verdict: The *writing* is SEO-strong; the *delivery* is not.** Titles, meta
descriptions, keywords, OG/Twitter cards, and heading structure are mostly in
place at the data level. But four site-wide gaps stop these posts from actually
ranking and sharing well: (1) no prerendering, so per-article meta is invisible
to non-JS crawlers; (2) no canonical tags + a domain mismatch; (3) no structured
data; (4) zero internal linking. Fix those four and this jumps to ~85+.

---

## Critical site-wide findings (affect every post)

### 1. No prerendering / SSR — per-article meta is invisible to social crawlers ⚠️ CRITICAL
This is a client-only SPA (Vite + React + react-helmet-async, no prerender plugin,
no SSR). The built `dist/index.html` for *every* route contains only:
```
<title>Simplify to Glorify</title>   (no description, no og:*, no canonical)
```
The per-article `<title>`, description, and OG tags are injected by Helmet **after
JavaScript runs in the browser.**
- **Social scrapers (Facebook, LinkedIn, X/Twitter, Pinterest, Slack, iMessage) do not run JS** → every shared article link shows the same generic "Simplify to Glorify" title, no description, and the wrong/no preview image. For a Pinterest-and-share-driven audience (Christian women), this is a major distribution loss.
- **Google** renders JS, so it eventually sees the tags — but it's slower, less reliable, and canonical/meta are better set server-side.
- **Fix:** add build-time prerendering for the known routes (e.g. `vite-plugin-prerender`/`puppeteer`, `react-snap`, or a prerender step that walks the article/blogPost slugs). This single change unlocks the value of all the on-page meta below.

### 2. No canonical tags + domain mismatch ⚠️ HIGH
- Neither `ArticlePage` nor `BlogPost` emits `<link rel="canonical">`. SPAs need explicit canonicals to avoid duplicate-URL dilution.
- **Domain inconsistency:** OG/absolute image URLs are hardcoded to `https://simplifytoglorify.netlify.app`, while `robots.txt` and `sitemap.xml` use `https://www.simplifytoglorify.com`. Google sees conflicting canonical signals across two domains.
- **Fix:** pick one canonical host (`www.simplifytoglorify.com`), emit a self-referencing canonical per page, and update the hardcoded `netlify.app` OG image base to match.

### 3. No structured data (JSON-LD) — HIGH
No `Article`, `BreadcrumbList`, `Organization`, or `WebSite` schema anywhere.
- **Fix:** add JSON-LD `Article` (headline, image, datePublished, author, publisher) on every post, `BreadcrumbList` (breadcrumbs already exist visually), and `Organization`+`WebSite` on the homepage. Eligible for rich results and strengthens entity understanding.

### 4. Zero internal links — HIGH (on-page)
**0 of 42 posts** contain a single internal link in their body. No topical
clustering, no links to the matching product/category pages (the conversion
path), no related-article links.
- **Fix:** add 2–5 contextual internal links per post — link related posts to each other (e.g. the 5 anxiety posts), and link each post to its product category page (`/products/<category>`). This is the highest-ROI on-page change after prerendering.

### 5. No author/byline — MEDIUM (E-E-A-T)
The `author?` field exists in the type but is never rendered. Many posts are
strongly first-person ("My dad had Alzheimer's…") = excellent *Experience*
signal, undercut by no named author or bio = weak *Authoritativeness*.
- **Fix:** add a consistent author byline + a short bio/About link, and include `author` in the Article schema.

---

## On-page status (data layer — mostly healthy)

| Element | Status | Notes |
|---|---|---|
| Title tag | ✅ Pass | `{title} \| Simplify to Glorify`; unique; brand appended. 6 titles run long (see below). |
| Meta description | ⚠️ Mostly | 39/42 present; falls back to excerpt when absent. 3 missing; 15 over-long. |
| Keywords meta | ✅ Present | 39/42 (low ranking value today, but harmless). |
| H1 | ✅ Pass | Exactly one `<h1>` = the title on every post. |
| Heading hierarchy | ✅ Mostly | 19 posts use markdown `##/###`→`<h2>/<h3>`; others use HTML headings. A few new posts jump H1→H3 (skip H2) — minor. |
| OG / Twitter cards | ✅ Pass (in JS) | Full OG + `summary_large_image`, absolute image URLs — but see finding #1 (invisible without JS). |
| Image alt | ⚠️ Needs work | Hero image `alt={title}` (acceptable but not descriptive); in-body images rely on alt in HTML — spot-check. Decorative card images correctly use `alt=""`. |
| URL structure | ✅ Pass | Clean, lowercase, hyphenated, keyword-bearing slugs. |
| robots.txt / sitemap | ✅ Pass | Both exist; robots points to sitemap. (Sitemap uses `www.` domain — keep consistent per #2.) |
| Mobile / viewport | ✅ Pass | Viewport meta present; responsive layout. |
| Analytics | ✅ Present | Microsoft Clarity is installed in `index.html`. |

---

## Per-article items needing work

### A. Missing metaDescription + keywords (3) — quick win
These currently fall back to the excerpt for the description and emit no keywords meta:
- `caregiving-avoid-burnout` (article)
- `deeper-faith-ordinary-days` (article)
- `trusting-god-with-hard-days` (blog post)

### B. Title tag too long — truncates in SERPs (6)
The `<title>` is `Title | Simplify to Glorify` (+22 chars), so anything over ~55
chars of title truncates. Worst offenders:
| Slug | Title chars |
|---|---|
| writing-out-scripture-for-mental-health | 76 |
| conversations-in-prayer | 72 |
| the-weight-of-regret | 71 |
| gratitude-changes-everything | 63 |
| what-is-palliative-care | 62 |
| ways-to-reduce-anxiety-naturally | 61 |

(Several already have a `cardTitle` for cards, but the `<title>` tag still uses the full title — shorten the title or have the head use `cardTitle` when present.)

### C. Meta description over ~165 chars — truncates (15)
Trim to ~150–155. Longest: `when-the-loss-is-too-big` (194), `loving-someone-who-is-forgetting` (185), `what-you-didnt-do` (184), `what-a-journal-can-do` (179), `the-pain-no-one-can-see` (176), `self-reflection-personal-growth` (176), `the-one-thing-women-in-hard-seasons-often-forget` (174). (Many are the 6 just-published posts.)

### D. Very short, evocative titles (11) — opportunity, not error
Titles like "What You Didn't Do" (18), "Grace for the Weary" (19), "What a Journal
Can Do" (21) read beautifully but carry no target keyword. With the brand suffix
they're fine length-wise; consider a keyword-bearing variant only if you want them
to rank for a specific query (the body content already targets the theme).

---

## Content Quality (E-E-A-T)

| Dimension | Score | Evidence |
|---|---|---|
| Experience | **Strong** | Pervasive first-person lived experience (caregiving for a parent with Alzheimer's, grief, anxiety). This is the site's biggest E-E-A-T asset. |
| Expertise | Present | Consistent, accurate, Scripture-grounded; not clinical but appropriate for the niche. |
| Authoritativeness | **Weak** | No author byline/bio, no credentials, no external authoritative links. The strongest fixable gap. |
| Trustworthiness | Present | HTTPS, contact/About exist, real product line; would improve with author transparency + sourced claims. |

---

## Prioritized Recommendations

### Critical (do first — unlocks everything else)
1. **Add build-time prerendering** for all article/blog routes. Without it, ~half your crawler audience (all social scrapers) never sees the per-article meta you've already written.

### High (this month)
2. **Add self-referencing canonical tags** and standardize on one domain (`www.simplifytoglorify.com`); fix the `netlify.app` OG image base.
3. **Add JSON-LD** `Article` + `BreadcrumbList` per post, `Organization`/`WebSite` on home.
4. **Add internal links** — 2–5 per post: related posts + the matching `/products/<category>` page.
5. **Fill the 3 missing metaDescriptions + keywords** (Section A).

### Medium (this quarter)
6. **Add an author byline + bio** and include it in Article schema (E-E-A-T).
7. **Shorten the 6 long titles** / use `cardTitle` in the `<title>` tag when present.
8. **Trim the 15 long meta descriptions** to ~150–155 chars.
9. **Audit in-body image alt text** for descriptiveness.

### Low (when resources allow)
10. Add `article:published_time`/`author`/`section` OG meta.
11. Consider a related-posts module to systematize internal linking.
12. Preconnect/optimize the render-blocking Google Fonts request.

---

*Generated via the market-seo audit framework, adapted for a data-driven SPA
(source files audited directly rather than a single live URL).*
