import { Link } from 'react-router-dom';
import { useState } from 'react';
import { blogPostMeta as blogPosts } from '@/data/blogPosts/index';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNav from '@/components/PageNav';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-ivory">
      <PageNav />

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-6"><Breadcrumbs /></div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-display text-xl text-slate-blue mb-4">From the Blog</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Words from the journey.
            </h1>
            <p className="text-base text-muted-slate italic max-w-xl mx-auto leading-relaxed">
              Gentle reflections on faith, simplicity, and finding peace in the everyday.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-charcoal/10 bg-white text-sm font-body"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-charcoal/10 bg-white text-sm font-body"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-sage to-slate-blue/60 flex items-center justify-center">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-slate">
                    <span className="text-label text-slate-blue">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-xl text-charcoal mb-2 group-hover:text-slate-blue transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-slate leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-sm text-slate-blue group-hover:translate-x-1 transition-transform">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-slate mt-12">No posts match your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}
