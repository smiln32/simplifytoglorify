import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import type { SectionRef } from '@/types';

interface BlogSectionProps {
  sectionRef: SectionRef;
}

export default function BlogSection({ sectionRef }: BlogSectionProps) {
  return (
    <section ref={sectionRef} className="blog-section py-20 lg:py-32 bg-blush/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-label text-slate-blue mb-4">From the Blog</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Words from the journey.
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10 last:border-0 last:pb-0 bg-ivory p-6 rounded-[28px] card-shadow"
            >
              <div>
                <p className="text-sm text-muted-slate mb-1">{post.date}</p>
                <h4 className="font-display text-xl text-charcoal">{post.title}</h4>
                <p className="text-sm text-muted-slate mt-1">{post.excerpt}</p>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm text-slate-blue hover:text-slate-blue/80 shrink-0"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
