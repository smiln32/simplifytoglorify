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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">

          <p className="font-display text-xl text-slate-blue mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4 leading-snug">
            Privacy Policy
          </h1>
          <p className="text-muted-slate italic mb-12">Last updated: June 2, 2026</p>

          <Section title="Who we are">
            <p>
              Simplify to Glorify is a faith-based digital product shop offering journals, scripture cards, prayer cards, and devotionals for women in challenging seasons. We are based in the United States.
            </p>
            <p>
              If you have questions about this policy, you can reach us through the contact form on our website.
            </p>
          </Section>

          <Section title="What information we collect">
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-charcoal font-medium">Email address</span> — when you sign up for a free resource, submit the contact form, or make a purchase.</li>
              <li><span className="text-charcoal font-medium">Payment information</span> — when you make a purchase. We do not store your card details; all payment processing is handled by Stripe.</li>
              <li><span className="text-charcoal font-medium">Usage and behavior data</span> — pages visited, clicks, scrolls, and session recordings collected automatically through Microsoft Clarity.</li>
              <li><span className="text-charcoal font-medium">Device and browser information</span> — collected automatically by Clarity as part of session analytics.</li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver your purchase and send your download link</li>
              <li>Respond to contact form messages</li>
              <li>Send the free resource you requested</li>
              <li>Understand how visitors use the site so we can improve it</li>
            </ul>
            <p>We do not sell your personal information. We do not use it to send marketing emails unless you have explicitly opted in.</p>
          </Section>

          <Section title="Third-party services">
            <p>We share data with the following third parties only as needed to operate the site:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-charcoal font-medium">Stripe</span> — payment processing. Stripe collects and stores your payment information under their own privacy policy. We never see or store your full card number.
              </li>
              <li>
                <span className="text-charcoal font-medium">Resend</span> — transactional email delivery (download links and order confirmations). Your email address is passed to Resend solely to send these messages.
              </li>
              <li>
                <span className="text-charcoal font-medium">Microsoft Clarity</span> — website analytics, session recording, and heatmaps. Clarity may use cookies and collect behavioral data about how you use our site. You can learn more at{' '}
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-slate-blue hover:underline">
                  Microsoft's Privacy Statement
                </a>.
              </li>
              <li>
                <span className="text-charcoal font-medium">Web3Forms</span> — contact form submission handling. Your name, email, and message are sent through Web3Forms to reach us.
              </li>
              <li>
                <span className="text-charcoal font-medium">Netlify</span> — website hosting. Netlify may log standard server data such as IP addresses and request times.
              </li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              We do not set our own cookies. Microsoft Clarity may set cookies to identify returning visitors and associate session recordings across visits. You can disable cookies in your browser settings, though this may affect some site functionality.
            </p>
          </Section>

          <Section title="Your rights">
            <p>Depending on where you live, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request that we delete your data</li>
              <li>Opt out of behavioral tracking</li>
            </ul>
            <p>
              To make any of these requests, please contact us through the form on our website. We will respond within 30 days.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              We retain purchase records and associated email addresses for as long as necessary to fulfill orders and comply with legal obligations. Contact form submissions are retained only as long as needed to respond to your message.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              This site is not directed at children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we will update the date at the top of this page. Continued use of the site after any changes constitutes acceptance of the updated policy.
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
