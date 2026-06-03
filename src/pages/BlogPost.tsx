import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../data/blogPosts/types';
import PageNav from '../components/PageNav';
import Footer from '../components/sections/Footer';

const postModules = import.meta.glob<BlogPost>('../data/blogPosts/*-*.ts', { import: 'default' });

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) { setPost(null); return; }
    const loader = postModules[`../data/blogPosts/${slug}.ts`];
    if (!loader) { setPost(null); return; }
    loader().then(setPost).catch(() => setPost(null));
  }, [slug]);

  if (post === undefined) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f1ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#718096', fontFamily: "'Lora', serif" }}>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f1ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif" }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Post not found</h1>
          <Link to="/blog" style={{ color: '#b2c6b1' }}>Return to Journal</Link>
        </div>
      </div>
    );
  }

  const description = post.metaDescription || post.excerpt;
  const image = post.image
    ? `https://simplifytoglorify.netlify.app${post.image}`
    : 'https://simplifytoglorify.netlify.app/images/faith-based-living.webp';

  return (
    <>
      <Helmet>
        <title>{post.title} | Simplify to Glorify</title>
        <meta name="description" content={description} />
        {post.keywords && post.keywords.length > 0 && (
          <meta name="keywords" content={post.keywords.join(', ')} />
        )}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="Simplify to Glorify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <PageNav />
      <article style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ backgroundColor: '#ffffff', padding: '80px 20px 60px', borderBottom: '1px solid #d9d7d4' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px', fontSize: '0.9rem', color: '#718096', fontFamily: "'Lora', serif" }}>
              <span>{post.date}</span>
              <span style={{ color: '#c6b5c8' }}>•</span>
              <span>{post.category}</span>
              <span style={{ color: '#c6b5c8' }}>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a5568', fontWeight: 400, lineHeight: 1.2, marginBottom: '24px' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#666', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px 60px' }}>
          {post.image && (
            <img src={post.image} alt={post.title} className="h-[240px] sm:h-[320px] lg:h-[400px]" style={{ width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '48px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <div className="article-content" style={{ fontSize: '1.2rem', lineHeight: 1.9, color: '#2d3748' }} dangerouslySetInnerHTML={{ __html: post.content }} />
          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #d9d7d4' }}>
            <Link to="/blog"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4a5568', textDecoration: 'none', fontSize: '1rem', fontFamily: "'Lora', serif", transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#b2c6b1'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}
            >
              <span>←</span> Back to Journal
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
