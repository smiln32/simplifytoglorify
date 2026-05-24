import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNav from '@/components/PageNav';
import {
  getCategoryBySlug,
  PRODUCT_TYPES,
  PRODUCT_PRICES,
  PRODUCT_DESCRIPTIONS,
  type ProductType,
} from '@/data/products';

function productName(category: string, type: ProductType): string {
  if (type === 'Journal') return `The ${category} Journal`;
  if (type === 'Devotional') return `The ${category} Devotional`;
  return type;
}

export default function ProductCategory() {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const [loadingType, setLoadingType] = useState<ProductType | null>(null);

  async function handleBuy(type: ProductType) {
    if (!category || loadingType) return;
    setLoadingType(type);
    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType: type, categoryName: category.name }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      setLoadingType(null);
    }
  }

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

  const showSubtopics = category.subtopics.length > 1;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 lg:pt-36 pb-16 lg:pb-24">

        {/* Header band */}
        <div className="bg-lavender/20 border-b border-lavender/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-10">
            <div className="mb-5"><Breadcrumbs /></div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted-slate hover:text-slate-blue transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All categories
            </Link>
            <p className="text-label text-slate-blue mb-3">Products for {category.name}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Sub-topics — wayfinding */}
        {showSubtopics && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
            <h2 className="font-display text-2xl text-charcoal mb-2">Which fits you today?</h2>
            <p className="text-muted-slate italic mb-7">There is no wrong place to start.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.subtopics.map((subtopic) => (
                <div
                  key={subtopic.slug}
                  className="border-l-[3px] border-lavender pl-5 py-3 bg-white rounded-r-xl card-shadow"
                >
                  <p className="font-display text-lg text-charcoal leading-snug">{subtopic.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <h2 className="font-display text-2xl text-charcoal mb-1">
            The {category.name} collection
          </h2>
          <p className="text-muted-slate italic mb-8">
            Slow, screen-free companions for your time with God.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_TYPES.map((type) => (
              <article
                key={type}
                className="bg-white rounded-[20px] overflow-hidden card-shadow flex flex-col"
              >
                <div className="h-1.5 bg-lavender" />
                <div className="p-7 flex flex-col flex-1 gap-3">
                  <p className="text-label text-slate-blue">{type}</p>
                  <h3 className="font-display text-xl text-charcoal leading-snug">
                    {productName(category.name, type)}
                  </h3>
                  <p className="text-sm text-muted-slate italic leading-relaxed flex-1">
                    {PRODUCT_DESCRIPTIONS[type]}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 mt-2">
                    <span className="font-display text-2xl text-charcoal">
                      ${PRODUCT_PRICES[type]}
                    </span>
                    <button
                      onClick={() => handleBuy(type)}
                      disabled={loadingType === type}
                      className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-lg hover:bg-charcoal transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingType === type ? 'Loading…' : 'Buy'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
