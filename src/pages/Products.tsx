import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNav from '@/components/PageNav';
import { categories } from '@/data/products';

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
      <PageNav />

      <main className="pt-32 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-6"><Breadcrumbs /></div>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label text-slate-blue mb-4">Shop</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Scripture-centered tools for life's hard seasons.
            </h1>
            <p className="text-lg text-muted-slate italic max-w-xl mx-auto leading-relaxed">
              Each collection is a 30-day journey — designed to carry you through grief, anxiety, caregiving, depression, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products/${category.slug}`}
                className="group bg-white rounded-[20px] p-7 card-shadow hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col"
              >
                <div className="flex-1">
                  <h2 className="font-display text-xl lg:text-2xl text-charcoal mb-2 group-hover:text-slate-blue transition-colors duration-200">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-slate italic leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-charcoal/8">
                  <span className="text-label text-slate-blue">
                    {category.subtopics.length === 1
                      ? '1 devotional set'
                      : `${category.subtopics.length} devotional sets`}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
