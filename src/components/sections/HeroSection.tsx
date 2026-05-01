import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SectionRef, ScrollFn } from '@/types';

interface HeroSectionProps {
  sectionRef: SectionRef;
  aboutRef: SectionRef;
  scrollToSection: ScrollFn;
}

export default function HeroSection({ sectionRef, aboutRef, scrollToSection }: HeroSectionProps) {
  return (
    <section ref={sectionRef} className="min-h-screen pt-20 lg:pt-24 flex items-center bg-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="hero-text space-y-6">
              <p className="font-script italic text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight">
                Simplify to Glorify
              </p>
              <div className="py-4 border-l-2 border-slate-blue pl-6 my-8">
                <p className="font-display text-xl lg:text-2xl text-slate-blue">
                  Practical Peace for Overwhelmed Hearts
                </p>
                <p className="font-body text-lg lg:text-xl text-charcoal italic leading-relaxed mt-6">
                  "Come to Me, all who are weary and burdened, and I will give you rest.— Matthew 11:28"
                </p>
              </div>
              <p className="text-muted-slate text-lg max-w-md leading-relaxed">
                Grace-filled journals, scripture cards, prayer cards, devotionals, mini-guides and more for women experiencing challenging seasons.
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
                src="/images/hero_morning.png"
                alt="Journaling space with Bible, journal and coffee"
                className="w-full h-[400px] lg:h-[600px] object-cover rounded-[28px] card-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
