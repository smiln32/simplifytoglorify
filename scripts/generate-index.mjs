// Build step: generate the listing metadata (index.ts) from the individual
// post files, so each post file is the single source of truth. Existing curated
// order is preserved; any new files are appended. Run before the build.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function evalPost(file) {
  let raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  raw = raw.replace(/^import[^\n]*\n/gm, '').replace(/export default[^\n]*;?/, '');
  const i = raw.indexOf('{'), j = raw.lastIndexOf('}');
  return new Function('return (' + raw.slice(i, j + 1) + ')')();
}
function q(s) {
  if (/[\n\\]/.test(s)) return JSON.stringify(s);
  if (!s.includes("'")) return "'" + s + "'";
  if (!s.includes('"')) return '"' + s + '"';
  return JSON.stringify(s);
}
const arrLit = (a) => '[' + a.map(q).join(', ') + ']';

function orderedSlugs(indexPath, dir) {
  const existing = existsSync(indexPath)
    ? [...readFileSync(indexPath, 'utf8').matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    : [];
  const files = readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts').map((f) => f.replace('.ts', ''));
  const fileSet = new Set(files);
  const kept = existing.filter((s) => fileSet.has(s));
  const added = files.filter((s) => !existing.includes(s)).sort();
  return [...kept, ...added];
}

function entry(o, fields) {
  const lines = ['  {'];
  for (const f of fields) {
    if (o[f] === undefined || o[f] === null) continue;
    if (f === 'tags') lines.push(`    ${f}: ${arrLit(o[f])},`);
    else lines.push(`    ${f}: ${q(o[f])},`);
  }
  lines.push('  },');
  return lines.join('\n');
}

function generate({ dir, indexPath, metaType, fullType, varName, fields }) {
  const slugs = orderedSlugs(indexPath, dir);
  const entries = slugs.map((s) => entry(evalPost(path.join(dir, s + '.ts')), fields)).join('\n');
  const out = `import type { ${metaType} } from './types';

export type { ${metaType}, ${fullType} } from './types';

export const ${varName}: ${metaType}[] = [
${entries}
];
`;
  writeFileSync(indexPath, out);
  return slugs.length;
}

const aCount = generate({
  dir: path.join(root, 'src/data/articles'),
  indexPath: path.join(root, 'src/data/articles/index.ts'),
  metaType: 'ArticleMeta', fullType: 'Article', varName: 'articleMeta',
  fields: ['slug', 'title', 'cardTitle', 'category', 'excerpt', 'image'],
});
const bCount = generate({
  dir: path.join(root, 'src/data/blogPosts'),
  indexPath: path.join(root, 'src/data/blogPosts/index.ts'),
  metaType: 'BlogPostMeta', fullType: 'BlogPost', varName: 'blogPostMeta',
  fields: ['slug', 'title', 'cardTitle', 'category', 'excerpt', 'date', 'readTime', 'tags', 'image'],
});
console.log(`Index generated — ${aCount} articles, ${bCount} blog posts`);
