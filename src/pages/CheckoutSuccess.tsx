import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import PageNav from '@/components/PageNav'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-lavender/30 flex items-center justify-center">
              <Mail className="w-7 h-7 text-slate-blue" />
            </div>
          </div>

          <p className="font-display text-xl text-slate-blue mb-3">Order complete</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-5 leading-snug">
            Thank you for your purchase.
          </h1>
          <p className="text-muted-slate italic leading-relaxed mb-3">
            Your download link is on its way to your email. It may take a minute or two to arrive.
          </p>
          <p className="text-muted-slate italic leading-relaxed mb-10">
            The link contains a one-time download code. Keep it somewhere safe — it works once.
          </p>

          <div className="border-t border-charcoal/10 pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/download"
              className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-lg hover:bg-charcoal transition-colors duration-200"
            >
              Enter download code
            </Link>
            <Link
              to="/products"
              className="text-sm text-muted-slate hover:text-charcoal transition-colors duration-200 flex items-center justify-center"
            >
              Back to shop
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}
