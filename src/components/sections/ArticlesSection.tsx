import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { articleMeta as articles } from '@/data/articles/index';
import { getCategoryColor } from '@/data/categoryColors';
import { GROUPS, groupFor } from '@/lib/categoryGroups';
import PostCard from '@/components/PostCard';
import type { SectionRef } from '@/types';

interface ArticlesSectionProps {
  sectionRef: SectionRef;
  limit?: number;
}

const sortedArticles = [...articles];

function ArticleCard({ article, showImage }: { article: (typeof articles)[0]; showImage?: boolean }) {
  const color = getCategoryColor(article.category);
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block bg-ivory rounded-card card-shadow hover:shadow-card-hover transition-shadow overflow-hidden"
    >
      {showImage && article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <div className="flex">
        <div className="w-2 rounded-l-[28px] flex-shrink-0" style={{ backgroundColor: color }} />
        <div className="p-6">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color }}>
            {article.category}
          </span>
          <h4 className="font-display text-xl text-charcoal mt-3 mb-2 group-hover:text-slate-blue transition-colors">
            {article.title}
          </h4>
          <p className="text-sm text-muted-slate line-clamp-2">{article.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesSection({ sectionRef, limit }: ArticlesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  if (limit !== undefined) {
    const recent = sortedArticles.slice(0, limit);
    return (
      <section ref={sectionRef} className="articles-section py-10 lg:py-16 bg-white scroll-mt-16 lg:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-display text-xl text-slate-blue mb-4">Articles</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Wisdom for the journey.
            </h2>
            <p className="text-charcoal text-lg">
              Articles to help you with journaling, processing emotions,<br />
              and finding God in hard seasons.
            </p>
            <p className="text-slate-blue text-sm font-semibold tracking-widest uppercase mt-5">
              Latest Articles
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((article) => <ArticleCard key={article.id} article={article} showImage />)}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-xl font-semibold text-slate-blue hover:text-charcoal transition-colors duration-200"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Group + search filter (replaces the old per-category pill filter),
  // then default sort: articles grouped alphabetically by category.
  const visible = sortedArticles
    .filter((article) => {
      const inGroup = activeTab === 'All' || groupFor(article.category) === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const inSearch =
        q === '' ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return inGroup && inSearch;
    })
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <section ref={sectionRef} className="articles-section py-10 lg:py-16 bg-white scroll-mt-16 lg:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display text-xl text-slate-blue mb-4">Articles</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Wisdom for the journey.
          </h2>
          <p className="text-charcoal text-lg">
            Articles to help you with journaling, processing emotions,<br />
            and finding God in hard seasons.
          </p>
        </div>

        <div className="mb-10">
          <div className="relative mb-4 max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-charcoal/10"
            />
          </div>
          <div
            role="tablist"
            className="max-w-2xl mx-auto"
            style={{ display: 'flex', gap: 4, borderBottom: '1px solid #ececec' }}
          >
            {GROUPS.map((g) => {
              const active = activeTab === g;
              return (
                <button
                  key={g}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(g)}
                  style={{
                    border: 'none',
                    background: 'none',
                    borderRadius: 0,
                    padding: '10px 14px',
                    fontFamily: 'Lora, serif',
                    fontSize: 15,
                    cursor: 'pointer',
                    color: active ? '#404040' : '#8a8a8a',
                    borderBottom: active ? '2px solid #7b9fb3' : '2px solid transparent',
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((article) => (
            <PostCard key={article.id} post={article} to={`/articles/${article.slug}`} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-muted-slate mt-12">No articles match your search.</p>
        )}
      </div>
    </section>
  );
}
