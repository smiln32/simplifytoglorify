import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 bg-ivory border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-script text-2xl text-charcoal">Simplify to Glorify</p>
          <div className="flex items-center gap-4 text-sm text-muted-slate">
            <span>© Simplify to Glorify. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-muted-slate hover:text-slate-blue transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
