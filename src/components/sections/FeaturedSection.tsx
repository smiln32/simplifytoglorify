import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { SectionRef } from '@/types';

interface FeaturedSectionProps {
  sectionRef: SectionRef;
}

export default function FeaturedSection({ sectionRef }: FeaturedSectionProps) {
  return (
    <section ref={sectionRef} className="featured-section py-20 lg:py-32 bg-blush/50">
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
              <span className="px-4 py-2 bg-ivory rounded-full text-sm text-charcoal border border-charcoal/10">30 Days</span>
              <span className="px-4 py-2 bg-ivory rounded-full text-sm text-charcoal border border-charcoal/10">Digital PDF</span>
              <span className="px-4 py-2 bg-ivory rounded-full text-sm text-slate-blue border border-slate-blue/30">$24.99</span>
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
  );
}
