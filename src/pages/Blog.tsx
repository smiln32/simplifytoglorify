import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { blogPostMeta as blogPosts } from '@/data/blogPosts/index';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  function setSelectedCategory(cat: string) {
    setSearchParams(cat === 'All' ? {} : { category: cat }, { replace: false });
  }

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <PageNav />

      <section className="py-10 lg:py-16" style={{ marginTop: '72px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-display text-xl text-slate-blue mb-4">From the Blog</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Words from the journey.
            </h1>
            <p className="text-charcoal text-lg leading-relaxed">
              Gentle reflections on faith, simplicity, and finding peace in the everyday.
            </p>
          </div>

          <div className="mb-10 max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-charcoal/10"
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                    style={isActive
                      ? { backgroundColor: 'var(--slate-blue)', color: '#fff', borderColor: 'var(--slate-blue)' }
                      : { backgroundColor: '#fff', color: 'var(--muted-slate)', borderColor: '#e2e8f0' }
                    }
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--slate-blue)'; e.currentTarget.style.color = 'var(--slate-blue)'; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = 'var(--muted-slate)'; } }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-ivory rounded-[20px] overflow-hidden card-shadow hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-sage to-slate-blue/60 overflow-hidden">
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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-label text-slate-blue">{post.category}</span>
                    <span className="text-muted-slate text-xs">•</span>
                    <span className="text-xs text-muted-slate">{post.readTime}</span>
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
      </section>
      <Footer />
    </div>
  );
}
