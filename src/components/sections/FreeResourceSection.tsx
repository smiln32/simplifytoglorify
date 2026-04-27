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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'email-signup', email }).toString(),
      });
      toast.success('Thank you for subscribing! Check your inbox for the free series.');
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="free-resource-section py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <img
              src="/images/free-resource.jpg"
              alt="Free Resource"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-[28px] card-shadow"
            />
          </div>
          <div>
            <p className="text-label text-slate-blue mb-4">Free Resource</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              5 days of scripture<br />for anxious hearts.
            </h2>
            <p className="text-charcoal text-lg leading-relaxed mb-8">
              A free email series with printable verses, short reflections, and gentle prayers—delivered daily.
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
                {submitting ? 'Sending…' : 'Get the free series'}
              </Button>
            </form>
            <p className="text-sm text-muted-slate mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
