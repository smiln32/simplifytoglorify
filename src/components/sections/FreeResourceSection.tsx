import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { SectionRef } from '@/types';

interface FreeResourceSectionProps {
  sectionRef: SectionRef;
}

export default function FreeResourceSection({ sectionRef }: FreeResourceSectionProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'New freebie signup — Simplify to Glorify',
          email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const link = document.createElement('a');
        link.href = '/prayer-cards-freebie.pdf';
        link.download = 'prayer-cards-freebie.pdf';
        link.click();
        toast.success('Your free prayer cards are downloading now!');
        setEmail('');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="free-resource-section py-10 lg:py-16 scroll-mt-16 lg:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex justify-center items-center h-full">
            <iframe
              src="scripture_of_the_day_widget.html"
              width={300}
              height={400}
              className="rounded-[28px] card-shadow"
              title="Scripture of the Day"
              allowTransparency={true}
            />
          </div>
          <div>
            <p className="font-display text-xl text-slate-blue mb-4">Free Resource</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              Free prayer cards<br />for women of faith.
            </h2>
            <p className="text-charcoal text-lg leading-relaxed mb-8">
              A free set of printable prayer cards —<br />beautiful, simple, and ready to download as a PDF.
            </p>
            <form name="email-signup" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="form-name" value="email-signup" />
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-6 rounded-full border-charcoal/10 bg-white"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full disabled:opacity-70"
              >
                <Mail className="w-4 h-4 mr-2" />
                {submitting ? 'Sending…' : 'Get the free prayer cards'}
              </Button>
            </form>
            <p className="text-sm text-muted-slate mt-4">Enter your email and the PDF downloads instantly. No spam, ever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
