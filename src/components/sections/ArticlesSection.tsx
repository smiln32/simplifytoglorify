import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { articleMeta as articles } from '@/data/articles/index';
import type { SectionRef } from '@/types';

interface ArticlesSectionProps {
  sectionRef: SectionRef;
  limit?: number;
}

const categoryColors: Record<string, string> = {
  'Journaling':        '#b2c6b1',
  'Prayer':            '#c6b5c8',
  'Depression':        '#a4b9c4',
  'Gratitude':         '#d4b483',
  'Grief':             '#c4a5a0',
  'Scripture Writing': '#89b5af',
};

const defaultColor = '#a4b9c4';

function getCategoryColor(category: string) {
  return categoryColors[category] ?? defaultColor;
}

const allCategories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

function ArticleCard({ article, showImage }: { article: (typeof articles)[0]; showImage?: boolean }) {
  const color = getCategoryColor(article.category);
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block bg-ivory rounded-[28px] card-shadow hover:shadow-xl transition-shadow overflow-hidden"
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
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = limit !== undefined ? 'All' : (searchParams.get('category') || 'All');

  function setSelectedCategory(cat: string) {
    setSearchParams(cat === 'All' ? {} : { category: cat }, { replace: false });
  }

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
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-blue hover:text-charcoal transition-colors duration-200"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const filtered = sortedArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-charcoal/10"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {allCategories.map((cat) => {
              const color = cat === 'All' ? defaultColor : getCategoryColor(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                  style={isActive
                    ? { backgroundColor: color, color: '#fff', borderColor: color }
                    : { backgroundColor: `${color}18`, color: color, borderColor: color }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  );
}
