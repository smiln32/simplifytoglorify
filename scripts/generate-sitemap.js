import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://www.simplifytoglorify.com';

function extractMatches(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return [...content.matchAll(pattern)].map(m => m[1]);
}

const blogSlugs = extractMatches(
  path.join(__dirname, '../src/data/blogPosts/index.ts'),
  /slug:\s*['"]([^'"]+)['"]/g
);

const articleSlugs = extractMatches(
  path.join(__dirname, '../src/data/articles/index.ts'),
  /slug:\s*['"]([^'"]+)['"]/g
);

const topicSlugs = extractMatches(
  path.join(__dirname, '../src/data/topicBundles.ts'),
  /name:\s*['"]([^'"]+)['"]/g
).map(name => name.toLowerCase().replace(/\s+/g, '-'));

function url(loc, priority, changefreq = 'monthly') {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const entries = [
  url('/',          '1.0', 'weekly'),
  url('/blog',      '0.8', 'weekly'),
  url('/articles',  '0.8', 'weekly'),
  url('/products',  '0.8', 'monthly'),
  url('/about',     '0.7', 'monthly'),
  url('/resources', '0.8', 'monthly'),
  url('/contact',   '0.5', 'yearly'),
  url('/privacy',   '0.3', 'yearly'),
  url('/terms',     '0.3', 'yearly'),
  url('/refunds',   '0.3', 'yearly'),
  ...blogSlugs.map(s    => url(`/blog/${s}`,         '0.7')),
  ...articleSlugs.map(s => url(`/articles/${s}`,     '0.7')),
  ...topicSlugs.map(s   => url(`/products/${s}`,     '0.6')),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log(`Sitemap written — ${entries.length} URLs`);
