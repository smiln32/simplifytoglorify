import PageNav from '@/components/PageNav'
import Footer from '@/components/sections/Footer'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl text-charcoal mb-3">{title}</h2>
      <div className="text-muted-slate leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function Refunds() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">

          <p className="font-display text-xl text-slate-blue mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4 leading-snug">
            Refund Policy
          </h1>
          <p className="text-muted-slate italic mb-12">Last updated: June 11, 2026</p>

          <Section title="Our products are digital">
            <p>
              Everything we sell is a digital download (such as a printable PDF) delivered electronically. Nothing is shipped to you. Because these files are delivered instantly and cannot be returned, <span className="text-charcoal font-medium">all sales are final and we generally do not offer refunds</span> once a file has been delivered.
            </p>
          </Section>

          <Section title="When we will make it right">
            <p>
              We want you to be able to use what you bought. If you run into a genuine problem, please contact us and we will work to fix it, which may include sending you a corrected file. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>A file that is corrupted or will not open</li>
              <li>A download link that does not work</li>
              <li>Receiving the wrong item</li>
            </ul>
            <p>
              Reach us at{' '}
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>{' '}
              and include your order details so we can help quickly.
            </p>
          </Section>

          <Section title="Purchases made through Etsy">
            <p>
              If you bought through our Etsy shop rather than directly on this site, refund requests for that order are also subject to Etsy's policies for digital items. You can reach out to us, but Etsy's policies govern the refund process for Etsy orders.
            </p>
          </Section>

          <Section title="Questions">
            <p>
              If you have any questions about this policy before purchasing, please contact us at{' '}
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>. This policy works alongside our{' '}
              <a href="/terms" className="text-slate-blue hover:underline">Terms of Service</a>.
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
