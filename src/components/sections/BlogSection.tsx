import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import type { SectionRef } from '@/types';

interface BlogSectionProps {
  sectionRef: SectionRef;
}

export default function BlogSection({ sectionRef }: BlogSectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="blog-section py-20 lg:py-32 bg-blush/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-label text-slate-blue mb-4">From the Blog</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Words from the journey.
          </h2>
          <p className="text-lg text-muted-slate italic max-w-xl mx-auto leading-relaxed">
            Gentle reflections on faith, simplicity, and finding peace in the everyday
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-10 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-white rounded-lg overflow-hidden card-shadow transition-all duration-500"
              style={{
                boxShadow:
                  hoveredId === post.id
                    ? '0 8px 30px rgba(0,0,0,0.08)'
                    : '0 2px 10px rgba(0,0,0,0.04)',
                transform: hoveredId === post.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block no-underline text-inherit"
              >
                {post.image && (
                  <div className="h-[280px] overflow-hidden bg-sage-green/30">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{
                        transform:
                          hoveredId === post.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-slate font-body">
                    <span>{post.date}</span>
                    <span className="text-lavender">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-charcoal font-medium mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-base text-charcoal/70 leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <span
                    className="inline-flex items-center text-sm font-medium text-sage-green font-body transition-all duration-300"
                    style={{
                      gap: hoveredId === post.id ? '12px' : '8px',
                    }}
                  >
                    Read more
                    <span
                      className="transition-transform duration-300"
                      style={{
                        transform:
                          hoveredId === post.id
                            ? 'translateX(4px)'
                            : 'translateX(0)',
                      }}
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
