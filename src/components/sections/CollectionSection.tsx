import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SectionRef, ScrollFn } from '@/types';

interface CollectionSectionProps {
  sectionRef: SectionRef;
  topicsRef: SectionRef;
  scrollToSection: ScrollFn;
}

const categories = [
  { name: 'Journals',        image: '/images/cat-journals.jpg',        offset: false },
  { name: 'Scripture Cards', image: '/images/cat-scripture-cards.jpg', offset: true  },
  { name: 'Prayer Cards',    image: '/images/cat-prayer-cards.jpg',    offset: false },
];

export default function CollectionSection({ sectionRef, topicsRef, scrollToSection }: CollectionSectionProps) {
  return (
    <section ref={sectionRef} className="collection-section py-20 lg:py-32">
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
            {categories.map((item) => (
              <div key={item.name} className={`group cursor-pointer${item.offset ? ' sm:mt-8' : ''}`}>
                <div className="relative overflow-hidden rounded-[28px] card-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display text-xl">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
