import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'freebie-popup-dismissed';

export default function FreebiePopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, '1');
      setVisible(false);
      setClosing(false);
    }, 200);
  }

  async function handleSubmit(e: React.FormEvent) {
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
        localStorage.setItem(STORAGE_KEY, '1');
        setVisible(false);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${closing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)', animation: closing ? 'none' : 'popup-backdrop 0.25s ease-out' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className={`relative bg-ivory rounded-[28px] card-shadow max-w-md w-full p-8 sm:p-10 transition-all duration-200 ${closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        style={{ animation: closing ? 'none' : 'popup-card 0.3s ease-out' }}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-slate hover:text-charcoal transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-display text-xl text-slate-blue mb-3">Free Resource</p>
        <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-3 leading-snug">
          Free prayer cards<br />for women of faith.
        </h2>
        <p className="text-charcoal leading-relaxed mb-6">
          A free set of printable prayer cards — beautiful, simple, and ready to download as a PDF.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-5 rounded-full border-charcoal/10 bg-white"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-5 text-base rounded-full disabled:opacity-70"
          >
            <Mail className="w-4 h-4 mr-2" />
            {submitting ? 'Sending…' : 'Get the free prayer cards'}
          </Button>
        </form>

        <p className="text-sm text-muted-slate mt-4 text-center">
          No spam, ever. Unsubscribe any time.
        </p>
      </div>
    </div>
  );
}
