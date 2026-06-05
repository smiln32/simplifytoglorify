import { useState } from 'react';
import { Mail, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';

const resources = [
  {
    id: 'names-of-god',
    title: 'Names of God for Hard Days',
    subtitle: 'A seven-day scripture companion',
    description: 'One name of God each day — gentle, honest, and grounding. For the woman who needs something to hold on to when words feel far away.',
    filename: 'resources/Names-of-God-for-Hard-Days.pdf',
    color: '#b2c6b1',
    subject: 'Free resource: Names of God for Hard Days — Simplify to Glorify',
  },
  {
    id: 'not-be-okay',
    title: 'It Is Okay to Not Be Okay',
    subtitle: 'A gentle seven-day devotional for heavy seasons',
    description: 'Nothing to achieve and no feeling required. One short reading a day for the woman who is too tired to pretend she is fine.',
    filename: 'resources/It-Is-Okay-to-Not-Be-Okay.pdf',
    color: '#a4b9c4',
    subject: 'Free resource: It Is Okay to Not Be Okay — Simplify to Glorify',
  },
  {
    id: 'finding-jesus',
    title: 'Finding Jesus in the Middle of the Storm',
    subtitle: 'A gentle seven-day devotional for seasons of upheaval',
    description: 'For the days the waves are breaking over the boat. Seven short readings for the woman who needs to know He is in the boat with her.',
    filename: 'resources/Finding-Jesus-in-the-Storm.pdf',
    color: '#c6b5c8',
    subject: 'Free resource: Finding Jesus in the Storm — Simplify to Glorify',
  },
  {
    id: 'rituals-that-relax',
    title: 'Rituals That Relax',
    subtitle: 'Gentle practices for body and soul',
    description: 'Gentle, Bible-rooted ways to quiet your body and soothe your soul.',
    filename: 'resources/Rituals-That-Relax.pdf',
    color: '#d4b896',
    subject: 'Free resource: Rituals That Relax — Simplify to Glorify',
  },
];

export default function Resources() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  function toggleForm(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  async function handleSubmit(resource: typeof resources[0]) {
    const email = emails[resource.id] || '';
    if (!email) return;
    setSubmitting(resource.id);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: resource.subject,
          email,
          resource: resource.title,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const link = document.createElement('a');
        link.href = `/${resource.filename}`;
        link.download = resource.filename;
        link.click();
        toast.success('Your download is starting now!');
        setOpenId(null);
        setEmails((prev) => ({ ...prev, [resource.id]: '' }));
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PageNav />

      <main style={{ marginTop: '72px' }}>
        <div className="border-b border-charcoal/8 py-12 lg:py-16" style={{ backgroundColor: '#b2c6b118' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="font-display text-xl text-slate-blue mb-4">Free Resources</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              A little something to carry with you.
            </h1>
            <p className="text-lg text-muted-slate italic leading-relaxed max-w-xl">
              Free seven-day devotionals and scripture companions for women in hard seasons. Enter your email and it downloads instantly.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 space-y-8">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-ivory rounded-card card-shadow overflow-hidden">
              <div className="h-2" style={{ backgroundColor: resource.color }} />
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: resource.color }}>
                  Free Download
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-2">
                  {resource.title}
                </h2>
                <p className="text-muted-slate italic mb-4">{resource.subtitle}</p>
                <p className="text-charcoal leading-relaxed mb-6 max-w-xl">{resource.description}</p>

                {openId !== resource.id ? (
                  <button
                    onClick={() => toggleForm(resource.id)}
                    className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: resource.color }}
                  >
                    <Download className="w-4 h-4" />
                    Get this free
                  </button>
                ) : (
                  <div className="bg-white rounded-card-sm p-6 max-w-md">
                    <p className="text-sm text-muted-slate mb-4">
                      Enter your email to download. I'll occasionally share new resources and gentle encouragement — nothing more.
                    </p>
                    <form
                      onSubmit={(e) => { e.preventDefault(); handleSubmit(resource); }}
                      className="space-y-3"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={emails[resource.id] || ''}
                        onChange={(e) => setEmails((prev) => ({ ...prev, [resource.id]: e.target.value }))}
                        required
                        className="w-full rounded-full border-charcoal/10 bg-ivory"
                      />
                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={submitting === resource.id}
                          className="flex-1 text-white rounded-full disabled:opacity-70"
                          style={{ backgroundColor: resource.color }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          {submitting === resource.id ? 'Sending…' : 'Download now'}
                        </Button>
                        <button
                          type="button"
                          onClick={() => setOpenId(null)}
                          className="text-sm text-muted-slate hover:text-charcoal transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}

          <p className="text-center text-muted-slate italic pt-4">
            More resources coming soon.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
