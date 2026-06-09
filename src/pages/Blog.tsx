import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { blogPostMeta as blogPosts } from '@/data/blogPosts/index';
import { GROUPS, groupFor } from '@/lib/categoryGroups';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';
import PostCard from '@/components/PostCard';

const PAGE_SIZE = 12;

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [shown, setShown] = useState(PAGE_SIZE);

  // Group + search filter (replaces the old per-category pill filter),
  // then default sort: newest first by date.
  const visible = blogPosts
    .filter((post) => {
      const inGroup = activeTab === 'All' || groupFor(post.category) === activeTab;
      const q = searchTerm.toLowerCase().trim();
      const inSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return inGroup && inSearch;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

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
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setShown(PAGE_SIZE); }}
                className="pl-10 bg-white border-charcoal/10"
              />
            </div>
            <div
              role="tablist"
              style={{ display: 'flex', gap: 4, borderBottom: '1px solid #ececec' }}
            >
              {GROUPS.map((g) => {
                const active = activeTab === g;
                return (
                  <button
                    key={g}
                    role="tab"
                    aria-selected={active}
                    onClick={() => { setActiveTab(g); setShown(PAGE_SIZE); }}
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.slice(0, shown).map((post) => (
              <PostCard key={post.id} post={post} to={`/blog/${post.slug}`} />
            ))}
          </div>

          {shown < visible.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShown(shown + PAGE_SIZE)}
                className="px-6 py-2.5 rounded-full border border-slate-blue text-slate-blue font-body text-sm hover:bg-slate-blue hover:text-white transition-colors duration-200"
              >
                Load more
              </button>
            </div>
          )}

          {visible.length === 0 && (
            <p className="text-center text-muted-slate mt-12">No posts match your search.</p>
          )}

        </div>
      </section>
      <Footer />
    </div>
  );
}
