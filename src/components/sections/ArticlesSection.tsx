import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { articleMeta as articles } from '@/data/articles/index';
import type { SectionRef } from '@/types';

interface ArticlesSectionProps {
  sectionRef: SectionRef;
  limit?: number;
}

const allCategories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

function ArticleCard({ article }: { article: (typeof articles)[0] }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block bg-ivory rounded-[28px] card-shadow hover:shadow-xl transition-shadow overflow-hidden"
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <div className="p-6">
        <span className="text-label text-slate-blue">{article.category}</span>
        <h4 className="font-display text-xl text-charcoal mt-3 mb-2 group-hover:text-slate-blue transition-colors">
          {article.title}
        </h4>
        <p className="text-sm text-muted-slate line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  );
}

export default function ArticlesSection({ sectionRef, limit }: ArticlesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (limit !== undefined) {
    const recent = sortedArticles.slice(0, limit);
    return (
      <section ref={sectionRef} className="articles-section py-10 lg:py-16 bg-blush scroll-mt-16 lg:scroll-mt-20">
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
            {recent.map((article) => <ArticleCard key={article.id} article={article} />)}
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
    <section ref={sectionRef} className="articles-section py-10 lg:py-16 bg-blush scroll-mt-16 lg:scroll-mt-20">
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

        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-charcoal/10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-charcoal/10 text-sm bg-white"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  );
}
