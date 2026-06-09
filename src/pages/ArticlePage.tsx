import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { Article } from '../data/articles/types';
import { getCategoryColor } from '../data/categoryColors';
import PageNav from '../components/PageNav';
import Footer from '../components/sections/Footer';

const articleModules = import.meta.glob<Article>('../data/articles/*-*.ts', { import: 'default' });

function inlineMd(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(md: string): string {
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

// `content` was historically assumed to be pre-rendered HTML, but several articles
// store raw markdown there. Detect which we have and convert markdown when needed.
function looksLikeHtml(s: string): boolean {
  return /<(p|h[1-6]|ul|ol|li|blockquote|div|br|strong|em)\b/i.test(s);
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) { setArticle(null); return; }
    const loader = articleModules[`../data/articles/${slug}.ts`];
    if (!loader) { setArticle(null); return; }
    loader().then(setArticle).catch(() => setArticle(null));
  }, [slug]);

  if (article === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted-slate font-body">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-charcoal mb-4">Article not found</h1>
          <Link to="/articles" className="text-slate-blue hover:underline">Back to Articles</Link>
        </div>
      </div>
    );
  }

  const rawContent = article.content ?? article.body ?? '';
  const htmlContent = looksLikeHtml(rawContent) ? rawContent : markdownToHtml(rawContent);
  const color = getCategoryColor(article.category);
  const description = article.metaDescription || article.excerpt;
  const ogImage = article.image
    ? `https://simplifytoglorify.netlify.app${article.image}`
    : 'https://simplifytoglorify.netlify.app/images/faith-based-living.webp';

  return (
    <>
      <Helmet>
        <title>{article.title} | Simplify to Glorify</title>
        <meta name="description" content={description} />
        {article.keywords && article.keywords.length > 0 && (
          <meta name="keywords" content={article.keywords.join(', ')} />
        )}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Simplify to Glorify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <PageNav />

      <div className="min-h-screen bg-white" style={{ marginTop: '72px' }}>

        {/* Header */}
        <div className="border-b border-charcoal/8 py-12 lg:py-16" style={{ backgroundColor: `${color}18` }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color }}>
              {article.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6 leading-snug">
              {article.title}
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed max-w-xl mx-auto">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-[220px] sm:h-[300px] lg:h-[380px] object-cover rounded-card-sm mb-12 card-shadow"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}

          <div className="article-content" style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#2d3748' }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {article.moreResources && (
            <div className="mt-16 p-8 bg-ivory rounded-card-sm card-shadow">
              <h2 className="font-display text-2xl text-charcoal mb-3">{article.moreResources.heading}</h2>
              <p className="text-muted-slate italic mb-6 leading-relaxed">{article.moreResources.intro}</p>
              <ul className="space-y-4">
                {article.moreResources.references.map((ref) => (
                  <li key={ref.reference} className="pl-4 border-l-2" style={{ borderColor: color }}>
                    <span className="font-display text-charcoal font-medium">{ref.reference}</span>
                    <span className="text-muted-slate"> — {ref.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-charcoal/10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-blue hover:text-charcoal transition-colors duration-200"
            >
              ← Back to Articles
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
