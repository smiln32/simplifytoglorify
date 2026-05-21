import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNav from '@/components/PageNav';
import { getCategoryBySlug, PRODUCT_TYPES } from '@/data/products';

export default function ProductCategory() {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="grain-overlay" />
        <PageNav />
        <main className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl text-charcoal mb-4">Category not found</h1>
            <Link to="/products" className="text-slate-blue hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const hasMoreComing = category.subtopics.length === 1;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-6"><Breadcrumbs /></div>

          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-slate hover:text-slate-blue transition-colors duration-200 mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All categories
          </Link>

          {/* Page header */}
          <div className="max-w-2xl mb-14">
            <p className="text-label text-slate-blue mb-3">Shop — {category.name}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Sub-topic cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.subtopics.map((subtopic) => (
              <div
                key={subtopic.slug}
                className="bg-white rounded-[20px] overflow-hidden card-shadow"
              >
                {/* Top band */}
                <div className="h-1.5 bg-slate-blue/40" />

                <div className="p-7">
                  <p className="text-label text-slate-blue mb-2">{category.name}</p>
                  <h2 className="font-display text-xl text-charcoal mb-3 leading-snug">
                    {subtopic.name}
                  </h2>
                  <p className="text-sm text-muted-slate italic leading-relaxed mb-6">
                    A 30-day devotional journey through Scripture, reflection, and prayer.
                  </p>

                  {/* Product type badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {PRODUCT_TYPES.map((type) => (
                      <span
                        key={type}
                        className="text-xs text-muted-slate bg-blush rounded-full px-3 py-1"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Coming soon indicator */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-slate">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Coming soon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More titles coming indicator (only for single-subtopic categories) */}
          {hasMoreComing && (
            <div className="mt-10 rounded-[20px] border border-charcoal/10 p-8 text-center max-w-lg mx-auto">
              <p className="text-label text-slate-blue mb-2">More coming</p>
              <p className="font-display text-lg text-charcoal mb-2">
                Additional {category.name} titles are on the way.
              </p>
              <p className="text-sm text-muted-slate italic leading-relaxed">
                New devotional sets are being added regularly. Check back soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
