import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { SectionRef } from '@/types';

interface ContactSectionProps {
  sectionRef: SectionRef;
}

export default function ContactSection({ sectionRef }: ContactSectionProps) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...fields }).toString(),
      });
      toast.success("Message sent! I'll be in touch soon.");
      setFields({ name: '', email: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="contact-section py-10 lg:py-16 bg-blush scroll-mt-16 lg:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-label text-slate-blue mb-4">Contact</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              Let's stay connected.
            </h2>
            <p className="text-charcoal text-lg leading-relaxed mb-8">
              Questions, ideas, or just want to say hello? I read every message.
            </p>
          
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[28px] card-shadow">
            <h3 className="font-display text-2xl text-charcoal mb-6">Send a message</h3>
            <form name="contact" data-netlify="true" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="text-sm text-muted-slate mb-2 block">Name</label>
                <Input
                  name="name"
                  value={fields.name}
                  onChange={set('name')}
                  required
                  className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-ivory"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-muted-slate mb-2 block">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={set('email')}
                  required
                  className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-ivory"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-muted-slate mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={set('message')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/10 resize-none h-32 bg-ivory"
                  placeholder="Your message..."
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full disabled:opacity-70"
              >
                <Mail className="w-4 h-4 mr-2" />
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
