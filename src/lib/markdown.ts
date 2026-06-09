// Shared content rendering for article/blog post bodies.
//
// Post bodies come in two shapes: some store raw markdown (## headings, - lists),
// others store pre-rendered HTML. Detect which we have and convert markdown when
// needed, so both ArticlePage and BlogPost can render either.

function inlineMd(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function markdownToHtml(md: string): string {
  return md
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return '';
      if (t.startsWith('### ')) return `<h3>${inlineMd(t.slice(4))}</h3>`;
      if (t.startsWith('## ')) return `<h2>${inlineMd(t.slice(3))}</h2>`;
      if (t.startsWith('> ')) return `<blockquote>${inlineMd(t.slice(2))}</blockquote>`;
      const lines = t.split('\n');
      if (lines.every((l) => l.trim().startsWith('- '))) {
        const items = lines.map((l) => `<li>${inlineMd(l.trim().slice(2))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${inlineMd(t.replace(/\n/g, ' '))}</p>`;
    })
    .join('');
}

export function looksLikeHtml(s: string): boolean {
  return /<(p|h[1-6]|ul|ol|li|blockquote|div|br|strong|em)\b/i.test(s);
}

// Render a raw body (markdown or HTML) to HTML.
export function toHtml(raw: string): string {
  return looksLikeHtml(raw) ? raw : markdownToHtml(raw);
}
