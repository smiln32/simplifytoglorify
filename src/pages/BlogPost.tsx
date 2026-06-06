import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../data/blogPosts/types';
import { getCategoryColor } from '../data/categoryColors';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted-slate font-body">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-charcoal mb-4">Post not found</h1>
          <Link to="/blog" className="text-slate-blue hover:underline">Back to Journal</Link>
        </div>
      </div>
    );
  }

  const color = getCategoryColor(post.category);
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.image
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
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Simplify to Glorify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <PageNav />

      <div className="min-h-screen bg-white" style={{ marginTop: '72px' }}>

        {/* Header */}
        <div className="border-b border-charcoal/8 py-12 lg:py-16" style={{ backgroundColor: `${color}18` }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4 text-xs text-muted-slate">
              <span className="font-semibold tracking-widest uppercase" style={{ color }}>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6 leading-snug">
              {post.title}
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed max-w-xl mx-auto">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-[240px] sm:h-[320px] lg:h-[400px] object-cover rounded-card-sm mb-12 card-shadow"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}

          <div className="article-content" style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#2d3748' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-charcoal/10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-blue hover:text-charcoal transition-colors duration-200"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
