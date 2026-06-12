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

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">

          <p className="font-display text-xl text-slate-blue mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4 leading-snug">
            Terms of Service
          </h1>
          <p className="text-muted-slate italic mb-12">Last updated: June 11, 2026</p>

          <p className="text-muted-slate leading-relaxed mb-10">
            Welcome to Simplify to Glorify. These Terms of Service ("Terms") govern your use of simplifytoglorify.com (the "Site") and your purchase and use of our digital products. By using the Site or buying our products, you agree to these Terms. If you do not agree, please do not use the Site.
          </p>

          <Section title="Who we are">
            <p>
              Simplify to Glorify ("we," "us," or "our") creates faith-based printable devotional products, including journals, devotionals, scripture cards, prayer cards, and similar digital downloads. You can reach us at{' '}
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>.
            </p>
          </Section>

          <Section title="Our products are digital downloads">
            <p>
              All products currently sold by Simplify to Glorify are digital files (such as printable PDFs) delivered electronically. No physical item will be shipped to you. After purchase, you receive access to download the file or files described in the listing.
            </p>
            <p>
              It is your responsibility to download and save your files. You will need software capable of opening and printing standard PDF files. We are not responsible for any inability to access files caused by your device, software, or internet connection.
            </p>
          </Section>

          <Section title="Where and how you can purchase">
            <p>Our products are sold through two channels: directly on our Site and through our Etsy shop.</p>
            <p>
              <span className="text-charcoal font-medium">Direct purchases on our Site.</span> When you buy directly from us, your payment is processed by Stripe, our third-party payment processor. Your payment is subject to Stripe's terms and privacy policy. We do not collect or store your full payment card details; that information is handled by Stripe.
            </p>
            <p>
              <span className="text-charcoal font-medium">Purchases through Etsy.</span> When you buy through our Etsy shop, your order and payment are processed by Etsy, and your purchase is also subject to Etsy's own terms and policies. We do not collect or store your payment card details. If there is a conflict between these Terms and Etsy's policies regarding the checkout and payment process for an Etsy order, Etsy's policies govern that process.
            </p>
            <p>Regardless of where you purchase, these Terms and the license described below apply to your use of our products.</p>
          </Section>

          <Section title="License to use our products">
            <p>
              When you purchase a digital product from us, we grant you a limited, non-exclusive, non-transferable license to use it for your own personal, non-commercial use. This means you may:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Download the file for your personal use</li>
              <li>Print copies for yourself, your family, or your own personal devotional use</li>
            </ul>
            <p>Unless you have our written permission, you may <span className="text-charcoal font-medium">not</span>:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Resell, redistribute, share, or give away the files or printed copies</li>
              <li>Reproduce the products for commercial purposes or for an organization, group, church, or ministry beyond your own personal use</li>
              <li>Claim the products as your own, or remove any branding, attribution, or copyright notice</li>
              <li>Alter the files and present them as new or original work</li>
              <li>Upload the files to any file-sharing site or make them publicly available</li>
            </ul>
            <p>
              We retain all ownership and intellectual property rights in our products. Your purchase grants a license to use them, not ownership of the underlying work.
            </p>
            <p>
              If you would like to use our products for a group, church, ministry, or commercial purpose, please contact us at{' '}
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>{' '}
              to discuss permission.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              All content on the Site and in our products, including text, designs, graphics, scripture selections and arrangements, layouts, and branding, is owned by Simplify to Glorify or used with permission and is protected by copyright and other intellectual property laws. The "Simplify to Glorify" name and brand may not be used without our permission.
            </p>
          </Section>

          <Section title="Refunds and cancellations">
            <p>
              Because our products are digital files that are delivered instantly and cannot be returned, <span className="text-charcoal font-medium">all sales are final and we generally do not offer refunds</span> once a file has been delivered.
            </p>
            <p>
              If you experience a genuine problem, such as a corrupted file, a download that does not work, or receiving the wrong item, please contact us at{' '}
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>{' '}
              and we will work to make it right, which may include sending a corrected file. For purchases made through Etsy, refund requests are also subject to Etsy's policies for digital items.
            </p>
          </Section>

          <Section title="Accuracy and content">
            <p>
              We create our products with care, including the selection and presentation of scripture and devotional content. Our materials are intended for personal encouragement and reflection. They are not a substitute for professional medical, psychological, legal, or financial advice. If you are struggling with your health or wellbeing, please seek help from a qualified professional or a trusted person in your life.
            </p>
            <p>
              We make reasonable efforts to describe our products accurately, but we do not guarantee that every description, image, or detail is error-free.
            </p>
          </Section>

          <Section title="Your responsibilities">
            <p>When using the Site, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Site or our products for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the Site or its systems</li>
              <li>Interfere with or disrupt the Site</li>
              <li>Infringe our intellectual property rights or those of others</li>
            </ul>
          </Section>

          <Section title="Third-party links">
            <p>
              The Site and our products may link to third-party websites, including Etsy and our payment processor. We are not responsible for the content, products, or practices of those sites. Visiting them is at your own risk and subject to their terms.
            </p>
          </Section>

          <Section title="Disclaimer of warranties">
            <p>
              The Site and our products are provided "as is" and "as available," without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not warrant that the Site will be uninterrupted, secure, or error-free.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent permitted by law, Simplify to Glorify will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or our products. Where liability cannot be excluded, our total liability to you will not exceed the amount you paid for the product giving rise to the claim.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We may update these Terms from time to time. When we do, we will revise the "Last updated" date above. Your continued use of the Site or our products after changes take effect means you accept the updated Terms.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These Terms are governed by the laws of the State of Texas, United States, without regard to its conflict of law principles, except where other law is required to apply.
            </p>
          </Section>

          <Section title="Contact us">
            <p>If you have questions about these Terms, please contact us at:</p>
            <p>
              <span className="text-charcoal font-medium">Simplify to Glorify</span><br />
              <a href="mailto:hello@simplifytoglorify.com" className="text-slate-blue hover:underline">hello@simplifytoglorify.com</a>
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
