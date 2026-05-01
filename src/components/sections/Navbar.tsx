import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, ExternalLink, QrCode, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import type { SectionRefs, ScrollFn } from '@/types';

interface NavbarProps {
  refs: SectionRefs;
  scrollToSection: ScrollFn;
}

export default function Navbar({ refs, scrollToSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortUrlTarget, setShortUrlTarget] = useState('');
  const [shortUrls, setShortUrls] = useState<{ short: string; target: string }[]>([]);

  const nav = (ref: Parameters<ScrollFn>[0]) => {
    scrollToSection(ref);
    setMobileMenuOpen(false);
  };

  const generateQR = () => {
    if (qrUrl) toast.success('QR Code generated! You can download it now.');
  };

  const createShortUrl = () => {
    if (shortUrl && shortUrlTarget) {
      setShortUrls([...shortUrls, { short: `stg.to/${shortUrl}`, target: shortUrlTarget }]);
      toast.success(`Short URL created: stg.to/${shortUrl}`);
      setShortUrl('');
      setShortUrlTarget('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => nav(refs.heroRef)}
            className="font-script text-2xl lg:text-3xl text-charcoal hover:text-slate-blue transition-colors"
          >
            Simplify to Glorify
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => nav(refs.aboutRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">About</button>
            <button onClick={() => nav(refs.topicsRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Topics</button>
            <RouterLink to="/products" className="text-sm text-charcoal hover:text-slate-blue transition-colors">Products</RouterLink>
            <button onClick={() => nav(refs.articlesRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Articles</button>
            <RouterLink to="/blog" className="text-sm text-charcoal hover:text-slate-blue transition-colors">Blog</RouterLink>
            <button onClick={() => nav(refs.contactRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Contact</button>

            {/* Admin Tools */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-slate">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-ivory">
                <DialogHeader>
                  <DialogTitle className="font-script text-3xl text-charcoal">Admin Tools</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="qr" className="mt-4">
                  <TabsList className="grid w-full grid-cols-2 bg-blush">
                    <TabsTrigger value="qr">QR Generator</TabsTrigger>
                    <TabsTrigger value="urls">Short URLs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="qr" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-slate mb-2 block">URL for QR Code</label>
                      <Input
                        placeholder="https://simplifytoglorify.com/..."
                        value={qrUrl}
                        onChange={(e) => setQrUrl(e.target.value)}
                        className="bg-white border-charcoal/10"
                      />
                    </div>
                    <Button onClick={generateQR} className="bg-slate-blue hover:bg-slate-blue/90 text-white">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Code
                    </Button>
                    {qrUrl && (
                      <div className="p-8 bg-white rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <QrCode className="w-32 h-32 mx-auto text-charcoal" />
                          <p className="text-xs text-muted-slate mt-2">QR Code for: {qrUrl}</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="urls" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-slate mb-2 block">Short URL (stg.to/...)</label>
                        <Input
                          placeholder="peace"
                          value={shortUrl}
                          onChange={(e) => setShortUrl(e.target.value)}
                          className="bg-white border-charcoal/10"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-slate mb-2 block">Target URL</label>
                        <Input
                          placeholder="https://..."
                          value={shortUrlTarget}
                          onChange={(e) => setShortUrlTarget(e.target.value)}
                          className="bg-white border-charcoal/10"
                        />
                      </div>
                    </div>
                    <Button onClick={createShortUrl} className="bg-slate-blue hover:bg-slate-blue/90 text-white">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Create Short URL
                    </Button>
                    {shortUrls.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <h4 className="font-display text-lg text-charcoal">Your Short URLs:</h4>
                        {shortUrls.map((url, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg text-sm">
                            <span className="font-medium text-slate-blue">{url.short}</span>
                            <span className="text-muted-slate truncate max-w-[200px]">{url.target}</span>
                           </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-ivory w-full sm:w-80">
              <div className="flex flex-col gap-6 mt-8">
                <button onClick={() => nav(refs.aboutRef)} className="text-lg font-display text-charcoal">About</button>
                <button onClick={() => nav(refs.topicsRef)} className="text-lg font-display text-charcoal">Topics</button>
                <RouterLink to="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-display text-charcoal">Products</RouterLink>
                <button onClick={() => nav(refs.articlesRef)} className="text-lg font-display text-charcoal">Articles</button>
                <RouterLink to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-lg font-display text-charcoal">Blog</RouterLink>
                <button onClick={() => nav(refs.contactRef)} className="text-lg font-display text-charcoal">Contact</button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
