import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const BUNDLE_PRICE = 45;

function productName(category: string, type: ProductType): string {
  if (type === 'Journal') return `The ${category} Journal`;
  if (type === 'Devotional') return `The ${category} Devotional`;
  return type;
}

export default function ProductCategory() {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const [loadingType, setLoadingType] = useState<ProductType | 'Bundle' | null>(null);

  async function handleBuy(type: ProductType | 'Bundle') {
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

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-20 lg:pt-24 pb-16 lg:pb-24">

        {/* Header band */}
        <div className="bg-lavender/20 border-b border-lavender/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-2 pb-10">
            <div className="mb-5"><Breadcrumbs /></div>
            <p className="font-display text-xl text-slate-blue mb-3">Products for {category.name}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>



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
                      <span className="text-sm align-top mt-1 inline-block">$</span>{PRODUCT_PRICES[type]}
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

            {/* Bundle card */}
            <article className="bg-white rounded-[20px] overflow-hidden card-shadow flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="h-1.5 bg-slate-blue" />
              <div className="p-7 flex flex-col flex-1 gap-3">
                <p className="text-label text-slate-blue">Bundle</p>
                <h3 className="font-display text-xl text-charcoal leading-snug">
                  The {category.name} Collection
                </h3>
                <p className="text-sm text-muted-slate italic leading-relaxed flex-1">
                  All five products together — the complete set for this season.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 mt-2">
                  <span className="font-display text-2xl text-charcoal">
                    <span className="text-sm align-top mt-1 inline-block">$</span>{BUNDLE_PRICE}
                  </span>
                  <button
                    onClick={() => handleBuy('Bundle')}
                    disabled={loadingType === ('Bundle')}
                    className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-lg hover:bg-charcoal transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingType === ('Bundle') ? 'Loading…' : 'Buy'}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

      </main>
    </div>
  );
}
