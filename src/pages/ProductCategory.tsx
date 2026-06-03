import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';
import { getCategoryColor } from '@/data/categoryColors';
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
      <div className="min-h-screen bg-white">
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageNav />

      <main className="pb-16 lg:pb-24" style={{ marginTop: '72px' }}>

        {/* Header band */}
        <div className="border-b border-charcoal/8" style={{ backgroundColor: `${getCategoryColor(category.name)}20` }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <p className="font-display text-xl mb-6" style={{ color: getCategoryColor(category.name) }}>Products for {category.name}</p>
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
            Slow companions for your time with God.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_TYPES.map((type) => (
              <article
                key={type}
                className="bg-white rounded-[20px] overflow-hidden card-shadow flex flex-col"
              >
                <div className="h-1.5" style={{ backgroundColor: getCategoryColor(category.name) }} />
                <div className="p-7 flex flex-col flex-1 gap-3">
                  <p className="text-label text-slate-blue">{type}</p>
                  <h3 className="font-display text-xl text-charcoal leading-snug">
                    {productName(category.name, type)}
                  </h3>
                  <p className="text-sm text-muted-slate italic leading-relaxed flex-1">
                    {category.productDescriptions?.[type] ?? PRODUCT_DESCRIPTIONS[type]}
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
              <div className="h-1.5" style={{ backgroundColor: getCategoryColor(category.name) }} />
              <div className="p-7 flex flex-col flex-1 gap-3">
                <p className="text-label text-slate-blue">Bundle</p>
                <h3 className="font-display text-xl text-charcoal leading-snug">
                  The {category.name} Collection
                </h3>
                <p className="text-sm text-muted-slate italic leading-relaxed flex-1">
                  {category.productDescriptions?.['Bundle'] ?? 'All five products together — the complete set for this season.'}
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
      <Footer />
    </div>
  );
}
