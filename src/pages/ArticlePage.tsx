import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { Article } from '../data/articles/types';
import PageNav from '../components/PageNav';
import Footer from '../components/sections/Footer';

const articleModules = import.meta.glob<Article>('../data/articles/*-*.ts', { import: 'default' });

function markdownToHtml(md: string): string {
  return md
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (t.startsWith('### ')) return `<h3>${t.slice(4)}</h3>`;
      if (t.startsWith('## ')) return `<h2>${t.slice(3)}</h2>`;
      if (t.startsWith('> ')) return `<blockquote>${t.slice(2)}</blockquote>`;
      return `<p>${t.replace(/\n/g, ' ')}</p>`;
    })
    .join('');
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f1ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#718096', fontFamily: "'Lora', serif" }}>Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f1ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif" }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Article not found</h1>
          <Link to="/" style={{ color: '#b2c6b1' }}>Return Home</Link>
        </div>
      </div>
    );
  }

  const htmlContent = article.content ?? (article.body ? markdownToHtml(article.body) : '');

  const description = article.metaDescription || article.excerpt;
  const image = article.image
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
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="Simplify to Glorify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <PageNav />
      <article style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ backgroundColor: '#ffffff', padding: '80px 20px 60px', borderBottom: '1px solid #d9d7d4' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px', fontSize: '0.9rem', color: '#718096', fontFamily: "'Lora', serif" }}>
              <span>{article.category}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a5568', fontWeight: 400, lineHeight: 1.2, marginBottom: '24px' }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#666', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              {article.excerpt}
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px 60px' }}>
          {article.image && (
            <img src={article.image} alt={article.title} className="h-[220px] sm:h-[290px] lg:h-[360px]" style={{ width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '48px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <div className="article-content" style={{ fontSize: '1.2rem', lineHeight: 1.9, color: '#2d3748' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {article.moreResources && (
            <div style={{ marginTop: '64px', padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#4a5568', fontWeight: 400, marginBottom: '12px' }}>
                {article.moreResources.heading}
              </h2>
              <p style={{ color: '#718096', fontStyle: 'italic', marginBottom: '24px', lineHeight: 1.7 }}>
                {article.moreResources.intro}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {article.moreResources.references.map((ref) => (
                  <li key={ref.reference} style={{ paddingLeft: '16px', borderLeft: '3px solid #b2c6b1' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", color: '#4a5568', fontWeight: 500 }}>{ref.reference}</span>
                    <span style={{ color: '#718096' }}> — {ref.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #d9d7d4' }}>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4a5568', textDecoration: 'none', fontSize: '1rem', fontFamily: "'Lora', serif", transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#b2c6b1'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}
            >
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
