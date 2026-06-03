import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageNav from '@/components/PageNav'
import Footer from '@/components/sections/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center">
              <Compass className="w-7 h-7 text-muted-slate" />
            </div>
          </div>

          <p className="font-display text-xl text-muted-slate mb-3">Page not found</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-5 leading-snug">
            We couldn't find that page.
          </h1>
          <p className="text-muted-slate italic leading-relaxed mb-10">
            The link may have changed or the page no longer exists. Let's get you back to somewhere good.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-lg hover:bg-charcoal transition-colors duration-200"
            >
              Go home
            </Link>
            <Link
              to="/products"
              className="text-sm text-muted-slate hover:text-charcoal transition-colors duration-200 flex items-center justify-center"
            >
              Browse the shop
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
