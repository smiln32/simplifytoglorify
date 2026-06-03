import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import PageNav from '@/components/PageNav'
import Footer from '@/components/sections/Footer'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-muted-slate" />
            </div>
          </div>

          <p className="font-display text-xl text-muted-slate mb-3">Checkout cancelled</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-5 leading-snug">
            No charge was made.
          </h1>
          <p className="text-muted-slate italic leading-relaxed mb-10">
            Your card was not charged. Whenever you are ready, the shop is still here.
          </p>

          <Link
            to="/products"
            className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-lg hover:bg-charcoal transition-colors duration-200"
          >
            Return to shop
          </Link>

        </div>
      </main>
      <Footer />
    </div>
  )
}
