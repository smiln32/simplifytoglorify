import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, ShoppingBag, 
  Mail, ArrowRight, Instagram, Youtube,
  Search, Link as LinkIcon,
  QrCode, ExternalLink, Facebook, Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

// Product data - 5 initial journals
const journals = [
  {
    id: 1,
    title: 'Caregiving: A 30-Day Journey',
    topic: 'Caregiving',
    description: 'For the days when you\'re running on empty. Short reflections, gentle prompts, and space to breathe.',
    price: 24.99,
    image: '/images/topic-caregiving.jpg',
    bundleNote: 'Part of the Caregiving Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 2,
    title: 'Our Baby: A Remembrance Journal',
    topic: 'Grief',
    description: 'A tender companion for loss. Scripture that comforts with you without rushing you toward anything.',
    price: 24.99,
    image: '/images/topic-grief.jpg',
    bundleNote: 'Part of the Grief Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 3,
    title: 'Anxiety: Finding Stillness',
    topic: 'Anxiety',
    description: 'For anxious hearts seeking peace. Reassurance that you don't have to do anything other than just "be".',
    price: 24.99,
    image: '/images/topic-anxiety.jpg',
    bundleNote: 'Part of the Anxiety Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 4,
    title: 'Depression: Light in the Shadows',
    topic: 'Depression',
    description: 'Gentle truth for heavy days. You don't have to do anything, but if you do, God is there with you.',
    price: 24.99,
    image: '/images/topic-depression.jpg',
    bundleNote: 'Part of the Depression Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 5,
    title: 'Peace: A Quiet Heart',
    topic: 'Peace',
    description: 'Cultivating inner stillness through Scripture. For women seeking rest in a chaotic world.',
    price: 24.99,
    image: '/images/topic-peace.jpg',
    bundleNote: 'Part of the Peace Bundle',
    verses: 30,
    format: 'Digital PDF'
  }
];

// Articles data
const articles = [
  {
    id: 1,
    title: 'How to Start Journaling: A Beginner\'s Guide',
    category: 'Journaling',
    excerpt: 'You don't need perfect handwriting or profound thoughts. You just need a willingness to show up.',
    content: 'Full article content here...'
  },
  {
    id: 2,
    title: 'How Journaling Helps Process Emotions',
    category: 'Journaling',
    excerpt: 'Writing creates understanding between you and your feelings, allowing you to see them more clearly.',
    content: 'Full article content here...'
  },
  {
    id: 3,
    title: 'Scripture for Caregivers: You Are Seen',
    category: 'Caregiving',
    excerpt: 'God sees the 3am wake-ups, the heart you put into everything and the weariness that sometimes seeps in.',
    content: 'Full article content here...'
  },
  {
    id: 4,
    title: 'Grief and Faith: Holding Both',
    category: 'Grief',
    excerpt: 'You can love God deeply and still grieve deeply. Holding both truths is okay.',
    content: 'Full article content here...'
  },
  {
    id: 5,
    title: 'Anxiety Doesn\'t Mean You Lack Faith',
    category: 'Anxiety',
    excerpt: 'Your anxious thoughts are not a measure of your faith. They are a sign you need compassion.',
    content: 'Full article content here...'
  },
  {
    id: 6,
    title: 'Breath Prayers for Anxious Moments',
    category: 'Prayer',
    excerpt: 'Short, simple prayers you can whisper in a single breath when words feel too heavy.',
    content: 'Full article content here...'
  }
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Simplify to Glorify',
    date: 'April 15, 2026',
    excerpt: 'After years of walking through my own hard seasons, I'm sharing what God has taught me...'
  },
  {
    id: 2,
    title: 'Behind the Scenes: Creating the Caregiving Journal',
    date: 'April 10, 2026',
    excerpt: 'Every verse was chosen from my own experience helping my mom care for my dad who had Alzheimer's...'
  },
  {
    id: 3,
    title: 'New Product Launch: Scripture Cards',
    date: 'April 5, 2026',
    excerpt: 'I'm so happy to share these printable cards with you. Each one is a reminder of God's love that you can hold...'
  }
];

// Topic bundles
const topicBundles = [
  { name: 'Caregiving', image: '/images/topic-caregiving.jpg', description: 'For those giving care' },
  { name: 'Grief', image: '/images/topic-grief.jpg', description: 'For those who mourn' },
  { name: 'Anxiety', image: '/images/topic-anxiety.jpg', description: 'For anxious hearts' },
  { name: 'Depression', image: '/images/topic-depression.jpg', description: 'For heavy days' },
  { name: 'Peace', image: '/images/topic-peace.jpg', description: 'For restless souls' },
  { name: 'Prayer', image: '/images/topic-prayer.jpg', description: 'For learning to pray' }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Admin tools state
  const [qrUrl, setQrUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortUrlTarget, setShortUrlTarget] = useState('');
  const [shortUrls, setShortUrls] = useState<{short: string, target: string}[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const freeResourceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-image', 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo('.hero-text', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
      );

      // Scroll animations for sections
      const sections = [
        '.about-section',
        '.collection-section',
        '.featured-section',
        '.how-it-works-section',
        '.topics-section',
        '.articles-section',
        '.blog-section',
        '.free-resource-section',
        '.contact-section'
      ];

      sections.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! Check your inbox for the free series.');
      setEmail('');
    }
  };

  const generateQR = () => {
    if (qrUrl) {
      toast.success('QR Code generated! You can download it now.');
    }
  };

  const createShortUrl = () => {
    if (shortUrl && shortUrlTarget) {
      setShortUrls([...shortUrls, { short: `stg.to/${shortUrl}`, target: shortUrlTarget }]);
      toast.success(`Short URL created: stg.to/${shortUrl}`);
      setShortUrl('');
      setShortUrlTarget('');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  return (
    <div className="min-h-screen bg-ivory">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-sm border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button 
              onClick={() => scrollToSection(heroRef)}
              className="font-script text-2xl lg:text-3xl text-charcoal hover:text-slate-blue transition-colors"
            >
              Simplify to Glorify
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection(aboutRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">About</button>
              <button onClick={() => scrollToSection(collectionRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">The Collection</button>
              <button onClick={() => scrollToSection(topicsRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Topics</button>
              <button onClick={() => scrollToSection(articlesRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Articles</button>
              <button onClick={() => scrollToSection(blogRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Blog</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-sm text-charcoal hover:text-slate-blue transition-colors">Contact</button>
              
              {/* Admin Tools Dialog */}
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
                  <button onClick={() => scrollToSection(aboutRef)} className="text-lg font-display text-charcoal">About</button>
                  <button onClick={() => scrollToSection(collectionRef)} className="text-lg font-display text-charcoal">The Collection</button>
                  <button onClick={() => scrollToSection(topicsRef)} className="text-lg font-display text-charcoal">Topics</button>
                  <button onClick={() => scrollToSection(articlesRef)} className="text-lg font-display text-charcoal">Articles</button>
                  <button onClick={() => scrollToSection(blogRef)} className="text-lg font-display text-charcoal">Blog</button>
                  <button onClick={() => scrollToSection(contactRef)} className="text-lg font-display text-charcoal">Contact</button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen pt-20 lg:pt-24 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="hero-text space-y-6">
                <h1 className="font-script text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight">
                  Simplify to Glorify
                </h1>
                <div className="py-4 border-l-2 border-slate-blue pl-6 my-6">
                  <p className="font-body text-lg lg:text-xl text-charcoal italic leading-relaxed">
                    "Come to Me, all who are weary and burdened, and I will give you rest."
                  </p>
                  <p className="text-sm text-muted-slate mt-2">— Matthew 11:28</p>
                </div>
                <p className="font-display text-xl lg:text-2xl text-slate-blue">
                  Practical Peace for Overwhelmed Hearts
                </p>
                <p className="text-muted-slate text-lg max-w-md leading-relaxed">
                  Grace-filled journals, scripture cards, and prayers for women in hard seasons.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={() => scrollToSection(aboutRef)}
                    className="bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="hero-image relative">
                <img 
                  src="/images/hero-morning.jpg" 
                  alt="Woman journaling by window"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-[28px] card-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about-section py-20 lg:py-32 bg-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img 
                src="/images/about-story.jpg" 
                alt="Our Story"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-[28px] card-shadow"
              />
            </div>
            <div>
              <p className="text-label text-slate-blue mb-4">Our Story</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
                Made for women<br />in hard seasons.
              </h2>
              <div className="space-y-4 text-charcoal text-lg leading-relaxed">
                <p>
                  Simplify to Glorify was born from a simple belief: you don't have to perform your faith to be loved by God.
                </p>
                <p>
                  We create gentle, Scripture-centered tools for grief, anxiety, caregiving, and everyday overwhelm—so you can breathe, reflect, and reconnect.
                </p>
              </div>
              <div className="mt-8 p-6 bg-ivory rounded-2xl card-shadow border-l-4 border-sage">
                <p className="font-body text-lg text-charcoal italic">"The Lord is near to the brokenhearted and saves those who are crushed in spirit."</p>
                <p className="text-sm text-muted-slate mt-2">— Psalm 34:18</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section ref={collectionRef} className="collection-section py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-label text-slate-blue mb-4">The Collection</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
                Journals, cards,<br />and prayers.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed max-w-md mb-8">
                Each product is designed for real life: short, honest, and rooted in Scripture. No performance needed.
              </p>
              <Button 
                onClick={() => scrollToSection(topicsRef)}
                variant="link"
                className="text-slate-blue hover:text-slate-blue/80 p-0 text-base"
              >
                Shop all products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[28px] card-shadow">
                  <img 
                    src="/images/cat-journals.jpg" 
                    alt="Journals"
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display text-xl">Journals</p>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer sm:mt-8">
                <div className="relative overflow-hidden rounded-[28px] card-shadow">
                  <img 
                    src="/images/cat-scripture-cards.jpg" 
                    alt="Scripture Cards"
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display text-xl">Scripture Cards</p>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[28px] card-shadow">
                  <img 
                    src="/images/cat-prayer-cards.jpg" 
                    alt="Prayer Cards"
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display text-xl">Prayer Cards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Journal Section */}
      <section ref={featuredRef} className="featured-section py-20 lg:py-32 bg-blush/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-label text-slate-blue mb-4">Featured Journal</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
                A 30-day companion<br />for caregivers.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed max-w-md mb-8">
                Short reflections, honest prayers, and space to breathe. Made for the days when you're running on empty.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-ivory rounded-full text-sm text-charcoal border border-charcoal/10">
                  30 Days
                </span>
                <span className="px-4 py-2 bg-ivory rounded-full text-sm text-charcoal border border-charcoal/10">
                  Digital PDF
                </span>
                <span className="px-4 py-2 bg-ivory rounded-full text-sm text-slate-blue border border-slate-blue/30">
                  $24.99
                </span>
              </div>
              <Button 
                onClick={() => toast.info('Shop integration coming soon!')}
                className="bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                View the Journal
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="/images/featured-journal.jpg" 
                alt="Featured Caregiving Journal"
                className="w-full h-[400px] lg:h-[550px] object-cover rounded-[28px] card-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="how-it-works-section py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label text-slate-blue mb-4">How It Works</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              Three steps to<br />quiet connection.
            </h2>
            <p className="text-charcoal text-lg">
              No long studies. No pressure. Just a simple rhythm you can keep—even on hard days.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Choose a topic', img: '/images/step-1.jpg' },
              { num: '02', title: 'Read & reflect', img: '/images/step-2.jpg' },
              { num: '03', title: 'Pray & journal', img: '/images/step-3.jpg' }
            ].map((step, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-[28px] card-shadow mb-6">
                  <img 
                    src={step.img} 
                    alt={step.title}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-label text-white bg-charcoal/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {step.num}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-charcoal text-center">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section ref={topicsRef} className="topics-section py-20 lg:py-32 bg-blush/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-label text-slate-blue mb-4">Explore by Topic</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
                Find what you need<br />today.
              </h2>
              <p className="text-charcoal text-lg max-w-md">
                Each topic includes a journal, scripture cards, prayer cards, breath prayers, and devotionals—designed to work together.
              </p>
            </div>
            <Button 
              onClick={() => toast.info('Full shop coming soon!')}
              variant="link"
              className="text-slate-blue hover:text-slate-blue/80 p-0 text-base mt-4 lg:mt-0"
            >
              View all bundles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {/* Topic Bundles Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {topicBundles.map((topic, idx) => (
              <div key={idx} className="group bg-ivory rounded-[28px] overflow-hidden card-shadow hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={topic.image} 
                    alt={topic.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-1">{topic.name}</h3>
                  <p className="text-sm text-muted-slate">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Journals Grid */}
          <div className="bg-ivory rounded-[28px] p-8 lg:p-12 card-shadow">
            <h3 className="font-display text-2xl lg:text-3xl text-charcoal mb-8">Our Journals</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {journals.map((journal) => (
                <div key={journal.id} className="group bg-white rounded-[28px] overflow-hidden card-shadow hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden">
                    <img 
                      src={journal.image} 
                      alt={journal.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-medium text-charcoal bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        {journal.bundleNote}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-display text-lg text-charcoal mb-2">{journal.title}</h4>
                    <p className="text-sm text-muted-slate mb-4 line-clamp-2">{journal.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-blue font-medium">${journal.price}</span>
                      <Button 
                        onClick={() => toast.info(`${journal.title} - Coming to shop soon!`)}
                        size="sm"
                        className="bg-slate-blue hover:bg-slate-blue/90 text-white rounded-full"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section ref={articlesRef} className="articles-section py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-label text-slate-blue mb-4">Articles</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Wisdom for the journey.
            </h2>
            <p className="text-charcoal text-lg">
              Evergreen articles on journaling, processing emotions, and finding God in hard seasons.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
              <Input 
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-charcoal/10"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-charcoal/10 text-sm bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Articles Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer bg-ivory p-6 rounded-[28px] card-shadow hover:shadow-xl transition-shadow">
                <span className="text-label text-slate-blue">{article.category}</span>
                <h4 className="font-display text-xl text-charcoal mt-3 mb-2 group-hover:text-slate-blue transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-slate line-clamp-2">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="blog-section py-20 lg:py-32 bg-blush/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-label text-slate-blue mb-4">From the Blog</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
              Words from the journey.
            </h2>
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10 last:border-0 last:pb-0 bg-ivory p-6 rounded-[28px] card-shadow">
                <div>
                  <p className="text-sm text-muted-slate mb-1">{post.date}</p>
                  <h4 className="font-display text-xl text-charcoal">{post.title}</h4>
                  <p className="text-sm text-muted-slate mt-1">{post.excerpt}</p>
                </div>
                <Button 
                  onClick={() => toast.info('Full blog post coming soon!')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-blue hover:text-slate-blue/80 shrink-0"
                >
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resource Section */}
      <section ref={freeResourceRef} className="free-resource-section py-20 lg:py-32">
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
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-6 rounded-full border-charcoal/10 bg-white"
                />
                <Button 
                  type="submit"
                  className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get the free series
                </Button>
              </form>
              <p className="text-sm text-muted-slate mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section py-20 lg:py-32 bg-blush/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-label text-slate-blue mb-4">Contact</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
                Let's stay<br />connected.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed mb-8">
                Questions, wholesale inquiries, or just want to say hello? I read every message.
              </p>
              <a 
                href="mailto:hello@simplifytoglorify.com"
                className="text-slate-blue hover:text-slate-blue/80 flex items-center gap-2 text-lg"
              >
                <Mail className="w-5 h-5" />
                hello@simplifytoglorify.com
              </a>
              
              {/* YouTube Section */}
              <div className="mt-12">
                <h3 className="font-display text-xl text-charcoal mb-4">Prayer Videos</h3>
                <div className="bg-ivory p-8 rounded-[28px] card-shadow text-center">
                  <Youtube className="w-12 h-12 text-slate-blue mx-auto mb-4" />
                  <p className="text-muted-slate mb-4">Prayer videos coming soon to YouTube</p>
                  <Button 
                    onClick={() => toast.info('YouTube channel coming soon!')}
                    variant="outline"
                    className="border-slate-blue text-slate-blue hover:bg-slate-blue/10"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Subscribe on YouTube
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 lg:p-12 rounded-[28px] card-shadow">
              <h3 className="font-display text-2xl text-charcoal mb-6">Send a message</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success('Message sent! We\'ll be in touch soon.'); }}>
                <div>
                  <label className="text-sm text-muted-slate mb-2 block">Name</label>
                  <Input className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-ivory" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-muted-slate mb-2 block">Email</label>
                  <Input type="email" className="w-full px-4 py-3 rounded-xl border-charcoal/10 bg-ivory" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-slate mb-2 block">Message</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 resize-none h-32 bg-ivory"
                    placeholder="Your message..."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ivory border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="font-script text-2xl text-charcoal">Simplify to Glorify</p>
            <p className="text-sm text-muted-slate">© Simplify to Glorify. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
