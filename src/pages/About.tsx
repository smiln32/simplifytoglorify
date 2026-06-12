import { Link } from 'react-router-dom'
import PageNav from '@/components/PageNav'
import Footer from '@/components/sections/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          <p className="font-display text-xl text-slate-blue mb-3">About</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-10 leading-snug">
            About Carla
          </h1>

          <img
            src="/images/about-story.webp"
            alt="Carla, founder of Simplify to Glorify"
            loading="lazy"
            className="w-full h-[360px] sm:h-[460px] object-cover rounded-card card-shadow mb-12"
          />

          <div className="space-y-6 text-charcoal text-lg leading-relaxed">
            <p>
              I know what it feels like when faith gets hard — not because you've stopped believing, but because life has become too heavy to carry and too complicated to pray through neatly.
            </p>
            <p>
              I started Simplify to Glorify after walking through some of the hardest seasons a woman can face. In those moments, I didn't need more steps or strategies. I needed something that didn't require strength I didn't have — just a way to experience His goodness and draw closer to Him in the midst of the mess.
            </p>
            <p className="font-display text-xl italic text-slate-blue">
              That's what Simplify to Glorify exists to do.
            </p>
            <p>
              I hold a Master of Education in Curriculum Development — and that background shapes everything I create. I understand how people learn, how structure supports growth, and how to build resources that actually work in real life, not just in theory. Every journal, devotional, and scripture card is intentionally designed to guide you through a season, not just fill pages.
            </p>
            <p>
              My work is rooted in Scripture and built on one conviction: connecting with God should never require you to pretend you're okay.
            </p>
            <p>
              No toxic positivity. No religious formulas. Just honest, grace-filled truth for wherever you actually are.
            </p>

            <div className="pl-6 py-2 border-l-4 my-6" style={{ borderColor: 'var(--sage)' }}>
              <p className="font-display text-xl italic text-charcoal leading-snug">
                If you've ever felt like your struggle disqualified you from God's presence — you're exactly who I made this for.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-blue text-white font-body text-sm font-semibold hover:bg-slate-blue/90 transition-colors duration-200"
            >
              Explore the resources →
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-blue text-slate-blue font-body text-sm font-semibold hover:bg-slate-blue hover:text-white transition-colors duration-200"
            >
              Say hello
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
