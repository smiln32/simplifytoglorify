// Build step: meta-only prerender (+ JSON-LD structured data).
//
// The app is a client-rendered SPA, so the built dist/index.html ships the same
// generic <title> for every route. Social scrapers (Facebook, Pinterest,
// LinkedIn, X, iMessage) do not run JS, so every shared link looked identical
// and search engines saw no per-page meta, canonical, or structured data.
//
// This writes a per-route copy of index.html with the correct <head> baked in
// (title, description, keywords, Open Graph, Twitter, canonical, og:url) plus
// JSON-LD: Article/BlogPosting + BreadcrumbList on posts, BreadcrumbList on
// listings/categories, and Organization + WebSite on the home page.
//
// react-helmet-async reconciliation: tags helmet also emits are injected WITH
// data-rh="true" so helmet replaces them in place after hydration (no dupes);
// canonical, og:url, and JSON-LD are injected WITHOUT it so they persist.
//
// Runs after `vite build`. The Netlify SPA catch-all is a non-forced 200
// rewrite, so these real files are served before the fallback.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://www.simplifytoglorify.com';
const BRAND = 'Simplify to Glorify';
const AUTHOR = 'Carla Bosteder, M.Ed.';
const FALLBACK_IMG = '/images/faith-based-living.webp';

const templatePath = path.join(dist, 'index.html');
if (!existsSync(templatePath)) {
  console.error('prerender-meta: dist/index.html not found - run `npm run build` first (this is a post-build step, not a standalone command).');
  process.exit(1);
}
const template = readFileSync(templatePath, 'utf8');

// --- helpers ---------------------------------------------------------------
function evalPost(file) {
  let raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  raw = raw.replace(/^import[^\n]*\n/gm, '').replace(/export default[^\n]*;?/, '');
  const i = raw.indexOf('{'), j = raw.lastIndexOf('}');
  return new Function('return (' + raw.slice(i, j + 1) + ')')();
}
function readPosts(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
    .map((f) => evalPost(path.join(dir, f)));
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const absImg = (img) => SITE + (img || FALLBACK_IMG);
const urlFor = (route) => SITE + (route === '/' ? '/' : route);
const isoDate = (d) => { const t = Date.parse(d || ''); return Number.isNaN(t) ? undefined : new Date(t).toISOString(); };

// --- JSON-LD ---------------------------------------------------------------
const PUBLISHER = { '@type': 'Organization', name: BRAND, logo: { '@type': 'ImageObject', url: SITE + '/icon-512.png' } };
const SAME_AS = ['https://www.facebook.com/carlabosteder.32', 'https://www.instagram.com/simplifytoglorify/'];

// Serialize as a script tag; escape "<" so the JSON can never break out.
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

function articleSchema({ type, headline, description, image, url, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    description,
    image: [absImg(image)],
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: { '@type': 'Person', name: AUTHOR, url: SITE + '/' },
    publisher: PUBLISHER,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// Build the per-route <head> override and write dist/<route>/index.html.
function emit(route, { title, description, image, keywords, ogType = 'website', schema = [] }) {
  const url = urlFor(route);
  const img = absImg(image);
  const rh = ' data-rh="true"';
  const head = [
    `<title${rh}>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}"${rh} />`,
    keywords && keywords.length ? `<meta name="keywords" content="${esc(keywords.join(', '))}"${rh} />` : '',
    `<meta property="og:type" content="${ogType}"${rh} />`,
    `<meta property="og:title" content="${esc(title)}"${rh} />`,
    `<meta property="og:description" content="${esc(description)}"${rh} />`,
    `<meta property="og:image" content="${esc(img)}"${rh} />`,
    `<meta property="og:site_name" content="${esc(BRAND)}"${rh} />`,
    `<meta name="twitter:card" content="summary_large_image"${rh} />`,
    `<meta name="twitter:title" content="${esc(title)}"${rh} />`,
    `<meta name="twitter:description" content="${esc(description)}"${rh} />`,
    `<meta name="twitter:image" content="${esc(img)}"${rh} />`,
    // Not managed by helmet -> no data-rh so they persist after hydration:
    `<meta property="og:url" content="${esc(url)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    ...schema.map(ld),
  ].filter(Boolean).join('\n    ');

  // Replace the template's default <title> with the full per-route head block.
  const html = template.replace(/<title>[^<]*<\/title>/, head);
  const outDir = route === '/' ? dist : path.join(dist, route);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html);
}

// A breadcrumb of Home -> this page, for listing/static pages.
const selfCrumb = (name, route) => breadcrumb([{ name: 'Home', url: SITE + '/' }, { name, url: urlFor(route) }]);

// --- routes ----------------------------------------------------------------
const articles = readPosts(path.join(root, 'src/data/articles'));
const blogPosts = readPosts(path.join(root, 'src/data/blogPosts'));

// Top-level product categories (subtopics have name+slug but no description).
const productsSrc = readFileSync(path.join(root, 'src/data/products.ts'), 'utf8');
const categories = [...productsSrc.matchAll(
  /name:\s*'((?:[^'\\]|\\.)*)',\s*slug:\s*'((?:[^'\\]|\\.)*)',\s*description:\s*'((?:[^'\\]|\\.)*)'/g
)].map((m) => ({
  name: m[1].replace(/\\'/g, "'"),
  slug: m[2],
  description: m[3].replace(/\\'/g, "'"),
}));

let count = 0;

// Home: Organization + WebSite
emit('/', {
  title: `${BRAND} | Practical Peace for Overwhelmed Hearts`,
  description: 'Grace-filled journals, scripture cards, prayer cards, devotionals, and gentle mini-guides for Christian women walking through anxiety, grief, caregiving, and other hard seasons.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: SITE + '/',
      logo: SITE + '/STG-logo-transparent.png', sameAs: SAME_AS,
      description: 'Faith-based printable devotionals, journals, and scripture cards for Christian women in hard seasons.',
    },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, url: SITE + '/' },
  ],
}); count++;

// Listing + static pages (with a Home -> page breadcrumb)
const staticPages = [
  ['/articles', `Articles | ${BRAND}`, 'Faith-based articles to help you journal, process hard emotions, and find God in anxiety, grief, caregiving, and other challenging seasons.', 'Articles'],
  ['/blog', `From the Blog | ${BRAND}`, 'Gentle, honest reflections on faith, simplicity, and finding peace in the everyday for women in hard seasons.', 'Blog'],
  ['/products', `Shop Devotionals, Journals & Scripture Cards | ${BRAND}`, 'Printable Christian journals, scripture cards, prayer cards, devotionals, and 7-day resets - made for women in anxiety, grief, caregiving, and other hard seasons.', 'Products'],
  ['/resources', `Free Faith Resources | ${BRAND}`, 'Free printable booklets and gentle faith resources to encourage you in hard seasons.', 'Resources'],
  ['/contact', `Contact | ${BRAND}`, 'Questions or prayer requests? Reach out to Simplify to Glorify.', 'Contact'],
  ['/privacy', `Privacy Policy | ${BRAND}`, 'How Simplify to Glorify handles your information.', 'Privacy Policy'],
];
for (const [route, title, description, crumbName] of staticPages) {
  emit(route, { title, description, schema: [selfCrumb(crumbName, route)] });
  count++;
}

// Articles + blog posts: Article/BlogPosting + breadcrumb
for (const a of articles) {
  const route = `/articles/${a.slug}`, url = urlFor(route);
  const description = a.metaDescription || a.excerpt;
  emit(route, {
    title: `${a.cardTitle ?? a.title} | ${BRAND}`, description, image: a.image, keywords: a.keywords, ogType: 'article',
    schema: [
      articleSchema({ type: 'Article', headline: a.title, description, image: a.image, url, datePublished: isoDate(a.date) }),
      breadcrumb([{ name: 'Home', url: SITE + '/' }, { name: 'Articles', url: SITE + '/articles' }, { name: a.cardTitle ?? a.title, url }]),
    ],
  }); count++;
}
for (const p of blogPosts) {
  const route = `/blog/${p.slug}`, url = urlFor(route);
  const description = p.metaDescription || p.excerpt;
  emit(route, {
    title: `${p.cardTitle ?? p.title} | ${BRAND}`, description, image: p.image, keywords: p.keywords, ogType: 'article',
    schema: [
      articleSchema({ type: 'BlogPosting', headline: p.title, description, image: p.image, url, datePublished: isoDate(p.date) }),
      breadcrumb([{ name: 'Home', url: SITE + '/' }, { name: 'Blog', url: SITE + '/blog' }, { name: p.cardTitle ?? p.title, url }]),
    ],
  }); count++;
}

// Product category pages: breadcrumb
for (const c of categories) {
  const route = `/products/${c.slug}`, url = urlFor(route);
  emit(route, {
    title: `${c.name} | ${BRAND}`, description: c.description,
    schema: [breadcrumb([{ name: 'Home', url: SITE + '/' }, { name: 'Products', url: SITE + '/products' }, { name: c.name, url }])],
  }); count++;
}

console.log(`Prerendered ${count} routes (${articles.length} articles, ${blogPosts.length} blog posts, ${categories.length} categories) with JSON-LD`);
