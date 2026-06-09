import { useState } from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import PageNav from '@/components/PageNav';
import Footer from '@/components/sections/Footer';

const reasons = [
  {
    icon: BookOpen,
    title: 'Questions about resources',
    description: 'Wondering which journal or devotional might be right for your season? I am happy to help you find the right fit.',
  },
  {
    icon: Heart,
    title: 'Share your story',
    description: 'If something here has helped you, I would genuinely love to hear about it. Those messages mean more than you know.',
  },
  {
    icon: MessageCircle,
    title: 'Just say hello',
    description: 'You do not need a reason. If you are in a hard season and want someone to know or someone to pray for you, I am here.',
  },
];

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/carlabosteder.32', Icon: Facebook },
  { label: 'X / Twitter', href: 'https://x.com/BostederCarla', Icon: Twitter },
  { label: 'Instagram', href: 'https://www.instagram.com/simplifytoglorify/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/carla-bosteder-m-ed/', Icon: Linkedin },
];

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'New contact message — Simplify to Glorify',
          ...fields,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! I'll be in touch soon.");
        setFields({ name: '', email: '', message: '' });
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
    <div className="min-h-screen bg-white">
      <PageNav />

      <main style={{ marginTop: '72px' }}>

        {/* Header */}
        <div className="border-b border-charcoal/8 py-12 lg:py-16 bg-lavender/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="font-display text-xl text-slate-blue mb-4">Contact</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Let's stay connected.
            </h1>
            <p className="text-lg text-charcoal italic leading-relaxed max-w-xl">
              Questions, encouragement, or just a hello. I read every message.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left column */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-4">
                I'd love to hear from you.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed mb-10">
                Simplify to Glorify is a small, personal ministry. When you write, you are writing to me — not a team or a support desk. I read everything and try to respond within a day or two.
              </p>

              {/* Reasons to reach out */}
              <div className="space-y-6 mb-10">
                {reasons.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-slate-blue" />
                    </div>
                    <div>
                      <p className="font-display text-lg text-charcoal mb-1">{title}</p>
                      <p className="text-charcoal leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="mb-8 pl-4 border-l-4 border-sage">
                <p className="text-sm text-charcoal mb-1">You can also email me directly</p>
                <a href="mailto:hello@simplifytoglorify.com" className="font-display text-lg text-slate-blue hover:text-charcoal transition-colors">
                  hello@simplifytoglorify.com
                </a>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-charcoal mb-4">You can also find me on social media.</p>
                <div className="flex items-center gap-4">
                  {social.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white border border-charcoal/10 flex items-center justify-center text-charcoal hover:text-slate-blue hover:border-slate-blue/30 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — form */}
            <div className="bg-white p-8 lg:p-12 rounded-card card-shadow">
              <h3 className="font-display text-2xl text-charcoal mb-2">Send a message</h3>
              <p className="text-muted-slate italic mb-8">I'll get back to you within a day or two.</p>
              <form name="contact" data-netlify="true" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="text-sm text-muted-slate mb-2 block">Name</label>
                  <Input
                    name="name"
                    value={fields.name}
                    onChange={set('name')}
                    required
                    className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-white"
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
                    className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-white"
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
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 resize-none h-40 bg-white"
                    placeholder="What's on your heart..."
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
                <p className="text-xs text-muted-slate text-center">
                  I read every message personally. I'll be in touch soon.
                </p>
              </form>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
