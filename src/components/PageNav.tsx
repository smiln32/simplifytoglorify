import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { label: 'About',    href: '/#about' },
  { label: 'Topics',   href: '/#topics' },
  { label: 'Products', href: '/products' },
  { label: 'Articles', href: '/articles' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
];

export default function PageNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-script text-2xl lg:text-3xl text-white hover:text-white/80 transition-colors">
            Simplify to Glorify
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.label} to={link.href} className="text-sm text-white hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-blue w-full sm:w-80">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map(link => (
                  <Link key={link.label} to={link.href} onClick={() => setOpen(false)} className="text-lg font-display text-white hover:text-white/80 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="h-2 bg-ivory" />
    </nav>
  );
}
