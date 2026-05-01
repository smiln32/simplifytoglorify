import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const topics = [
  { name: 'Caregiving',  slug: 'caregiving' },
  { name: 'Grief',       slug: 'grief' },
  { name: 'Anxiety',     slug: 'anxiety' },
  { name: 'Depression',  slug: 'depression' },
  { name: 'Peace',       slug: 'peace' },
  { name: 'Prayer',      slug: 'prayer' },
  { name: 'Uncertainty', slug: 'uncertainty' },
  { name: 'Gratitude',   slug: 'gratitude' },
];

const productTypes = ['Journal', 'Scripture Cards', 'Prayer Cards', 'Breath Prayers', 'Devotional'];

export default function Products() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              to="/"
              className="font-script text-2xl lg:text-3xl text-charcoal hover:text-slate-blue transition-colors"
            >
              Simplify to Glorify
            </Link>
            <Link to="/" className="text-sm text-charcoal hover:text-slate-blue transition-colors">
              ← Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Page header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-base font-medium tracking-widest uppercase text-slate-blue mb-4">Shop</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Products made with grace and care.
            </h1>
            <p className="text-lg text-muted-slate italic max-w-xl mx-auto leading-relaxed">
              Scripture-centered tools for grief, anxiety, caregiving, depression, and everyday overwhelm
            </p>
          </div>

          {/* Topic sections */}
          <div className="space-y-20">
            {topics.map((topic, topicIndex) => (
              <section
                key={topic.slug}
                id={topic.slug}
                className="scroll-mt-28"
              >
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-label text-slate-blue mb-2">{`0${topicIndex + 1}`}</p>
                    <h2 className="font-display text-2xl lg:text-3xl text-charcoal">{topic.name}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {productTypes.map((type) => (
                    <div
                      key={type}
                      className="group bg-white rounded-[20px] overflow-hidden card-shadow hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-square bg-blush/40 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-slate-blue/30" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-slate uppercase tracking-wide mb-1">{type}</p>
                        <p className="font-display text-sm text-charcoal mb-3 leading-snug">
                          {topic.name}: {type}
                        </p>
                        <Button
                          onClick={() => toast.info('Coming to shop soon!')}
                          size="sm"
                          className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white rounded-full text-xs"
                        >
                          Coming soon
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
