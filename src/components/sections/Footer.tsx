import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 bg-slate-blue border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-script text-2xl text-white">Simplify to Glorify</p>
          <div className="flex items-center gap-4 text-sm text-muted-slate">
            <span className="text-white/80">© Simplify to Glorify. All rights reserved.</span>
            <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refunds" className="text-white/80 hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/carlabosteder.32" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="https://x.com/BostederCarla" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/simplifytoglorify/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/carla-bosteder-m-ed/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
