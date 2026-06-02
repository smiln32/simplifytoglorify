// process-posts.js
// Batch converts .md blog post drafts to .ts BlogPost files
// Input:  src/data/blogposts-new/*.md
// Output: src/data/blogPosts/*.ts
//
// Usage:
//   node process-posts.js
//
// Requirements:
//   npm install @anthropic-ai/sdk gray-matter
//   Set ANTHROPIC_API_KEY in a .env file or your environment

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_DIR  = path.join(__dirname, 'src/data/blogposts-new');
const OUTPUT_DIR = path.join(__dirname, 'src/data/blogPosts');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugFromFilename(filename) {
  return path.basename(filename, '.md');
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildPrompt(slug, frontmatter, body) {
  const title    = frontmatter.title    || titleFromSlug(slug);
  const excerpt  = frontmatter.excerpt  || '';
  const date     = frontmatter.date     || '';
  const readTime = frontmatter.readTime || '5 min read';
  const category = frontmatter.category || 'Reflection';
  const tags     = frontmatter.tags
    ? (Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags.split(',').map(t => t.trim()))
    : [];
  const image    = frontmatter.image    || `/images/${slug.replace(/-/g, '_')}.webp`;

  return `You are converting a blog post markdown file into a TypeScript BlogPost object for a React website called Simplify to Glorify.

BRAND CONTEXT:
- Faith-based content for Christian women in hard seasons (grief, anxiety, caregiving, exhaustion)
- Voice: warm, honest, grace-centered, like coffee with a friend
- No toxic positivity, no rushing resolution, no clinical language
- Church of Christ perspective, New Testament grounded

POST METADATA:
- slug: ${slug}
- title: ${title}
- excerpt: ${excerpt}
- date: ${date}
- readTime: ${readTime}
- category: ${category}
- tags: ${JSON.stringify(tags)}
- image: ${image}

POST CONTENT (markdown):
${body}

YOUR TASK:
Return ONLY a valid TypeScript file with no explanation, no markdown fences, no preamble.

The file must:

1. Import BlogPost type:
   import type { BlogPost } from './types';

2. Include these fields on the BlogPost object:
   - slug
   - title
   - excerpt (poetic, for the card)
   - metaDescription (searchable version for meta tag, different from excerpt, 1-2 sentences)
   - date
   - readTime
   - category
   - tags
   - keywords (array of 10-15 SEO keyword strings based on post content - NO clinical/medical terms like "anxiety disorder", "therapy", "symptoms", "diagnosis", "treatment")
   - image
   - content (the full post converted to HTML with inline styles as shown below)

3. HTML content rules:
   - Paragraphs: <p style="margin-bottom: 1.5em;">...</p>
   - Headings: <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">...</h3>
   - Scripture inline: <em style="color: #4a5568; font-weight: 500;">scripture text</em>
   - Blockquotes (scripture only, no unknown quotes):
     <blockquote style="border-left: 3px solid #b2c6b1; margin: 2em 0; padding: 1em 2em; background-color: #ffffff; border-radius: 0 8px 8px 0; font-style: italic; color: #4a5568;">...</blockquote>
   - Lists: <ul style="margin-bottom: 1.5em; padding-left: 1.5em;"> with <li style="margin-bottom: 0.5em;">
   - Use - not -- or em dashes anywhere
   - No smart quotes, use straight quotes only

4. End with a More Resources section (always last):
   - h3 heading: "More Resources"
   - One intro sentence referencing the post topic
   - ul list of exactly 6 scripture references relevant to the post
   - Format: <strong>Reference</strong> - one-line description of what it covers
   - No full scripture text

5. End the file with:
   export default post;`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function processFile(filepath) {
  const filename = path.basename(filepath);
  const slug     = slugFromFilename(filename);
  const raw      = fs.readFileSync(filepath, 'utf8');
  const { data: frontmatter, content: body } = matter(raw);

  console.log(`  Processing: ${filename}`);

  const message = await client.messages.create({
    model:      'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      { role: 'user', content: buildPrompt(slug, frontmatter, body) }
    ],
  });

  let output = message.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');

  // Strip any accidental markdown fences
  output = output.replace(/^```typescript\n?/m, '').replace(/^```ts\n?/m, '').replace(/```$/m, '').trim();

  const outPath = path.join(OUTPUT_DIR, `${slug}.ts`);
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`  Done: ${slug}.ts`);

  return slug;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ERROR: ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`ERROR: Input folder not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('No .md files found in', INPUT_DIR);
    process.exit(0);
  }

  console.log(`\nFound ${files.length} file(s) to process...\n`);

  const results = { success: [], failed: [] };

  for (const file of files) {
    try {
      const slug = await processFile(path.join(INPUT_DIR, file));
      results.success.push(slug);
    } catch (err) {
      console.error(`  FAILED: ${file} -`, err.message);
      results.failed.push(file);
    }
  }

  console.log('\n─────────────────────────────');
  console.log(`Done. ${results.success.length} succeeded, ${results.failed.length} failed.`);
  if (results.failed.length > 0) {
    console.log('Failed files:', results.failed.join(', '));
  }
  console.log('─────────────────────────────\n');
}

main();
