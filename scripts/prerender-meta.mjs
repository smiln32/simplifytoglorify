// Build step: meta-only prerender.
//
// The app is a client-rendered SPA, so the built dist/index.html ships the same
// generic <title> for every route. Social scrapers (Facebook, Pinterest,
// LinkedIn, X, iMessage) do not run JS, so every shared link looked identical.
//
// This writes a per-route copy of index.html with the correct <head> baked in
// (title, description, keywords, Open Graph, Twitter, canonical, og:url).
//
// react-helmet-async reconciliation: tags helmet also emits are injected WITH
// data-rh="true" so helmet replaces them in place after hydration (no dupes);
// canonical and og:url are injected WITHOUT it so helmet leaves them untouched.
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
const FALLBACK_IMG = '/images/faith-based-living.webp';

const template = readFileSync(path.join(dist, 'index.html'), 'utf8');

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

// Build the per-route <head> override and write dist/<route>/index.html.
function emit(route, { title, description, image, keywords, ogType = 'website' }) {
  const url = SITE + (route === '/' ? '/' : route);
  const img = absImg(image);
  const rh = ' data-rh="true"';
  const tags = [
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
  ].filter(Boolean).join('\n    ');

  // Replace the template's default <title> with the full per-route head block.
  const html = template.replace(/<title>[^<]*<\/title>/, tags);
  const outDir = route === '/' ? dist : path.join(dist, route);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html);
}

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

// Static pages
emit('/', {
  title: `${BRAND} | Practical Peace for Overwhelmed Hearts`,
  description: 'Grace-filled journals, scripture cards, prayer cards, devotionals, and gentle mini-guides for Christian women walking through anxiety, grief, caregiving, and other hard seasons.',
}); count++;
emit('/articles', {
  title: `Articles | ${BRAND}`,
  description: 'Faith-based articles to help you journal, process hard emotions, and find God in anxiety, grief, caregiving, and other challenging seasons.',
}); count++;
emit('/blog', {
  title: `From the Blog | ${BRAND}`,
  description: 'Gentle, honest reflections on faith, simplicity, and finding peace in the everyday for women in hard seasons.',
}); count++;
emit('/products', {
  title: `Shop Devotionals, Journals & Scripture Cards | ${BRAND}`,
  description: 'Printable Christian journals, scripture cards, prayer cards, devotionals, and 7-day resets - made for women in anxiety, grief, caregiving, and other hard seasons.',
}); count++;
emit('/resources', {
  title: `Free Faith Resources | ${BRAND}`,
  description: 'Free printable booklets and gentle faith resources to encourage you in hard seasons.',
}); count++;
emit('/contact', {
  title: `Contact | ${BRAND}`,
  description: 'Questions or prayer requests? Reach out to Simplify to Glorify.',
}); count++;
emit('/privacy', {
  title: `Privacy Policy | ${BRAND}`,
  description: 'How Simplify to Glorify handles your information.',
}); count++;

// Articles + blog posts
for (const a of articles) {
  emit(`/articles/${a.slug}`, {
    title: `${a.cardTitle ?? a.title} | ${BRAND}`,
    description: a.metaDescription || a.excerpt,
    image: a.image, keywords: a.keywords, ogType: 'article',
  }); count++;
}
for (const p of blogPosts) {
  emit(`/blog/${p.slug}`, {
    title: `${p.cardTitle ?? p.title} | ${BRAND}`,
    description: p.metaDescription || p.excerpt,
    image: p.image, keywords: p.keywords, ogType: 'article',
  }); count++;
}

// Product category pages
for (const c of categories) {
  emit(`/products/${c.slug}`, {
    title: `${c.name} | ${BRAND}`,
    description: c.description,
  }); count++;
}

console.log(`Prerendered ${count} routes (${articles.length} articles, ${blogPosts.length} blog posts, ${categories.length} categories)`);
