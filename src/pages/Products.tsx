import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';
import { categories } from '@/data/products';
import { getCategoryColor } from '@/data/categoryColors';

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <PageNav />

      <section className="py-10 lg:py-16" style={{ marginTop: '72px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-display text-xl text-slate-blue mb-4">Shop</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Scripture-centered tools for hard seasons.
            </h1>
            <p className="text-charcoal text-lg leading-relaxed">
              Each collection is a 30-day journey — designed to carry you through grief, anxiety, caregiving, depression, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products/${category.slug}`}
                className="group bg-white rounded-card-sm overflow-hidden card-shadow hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex"
              >
                <div className="w-2 flex-shrink-0" style={{ backgroundColor: getCategoryColor(category.name) }} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex-1">
                    <h2 className="font-display text-xl lg:text-2xl text-charcoal mb-2 transition-colors duration-200" style={{ color: undefined }}>
                      <span className="group-hover:text-slate-blue transition-colors duration-200">{category.name}</span>
                    </h2>
                    <p className="text-sm text-muted-slate leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-end mt-6 pt-4 border-t border-charcoal/10">
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: getCategoryColor(category.name) }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
