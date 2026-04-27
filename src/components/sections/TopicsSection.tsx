import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { journals } from '@/data/journals';
import { topicBundles } from '@/data/topicBundles';
import type { SectionRef } from '@/types';

interface TopicsSectionProps {
  sectionRef: SectionRef;
}

export default function TopicsSection({ sectionRef }: TopicsSectionProps) {
  return (
    <section ref={sectionRef} className="topics-section py-20 lg:py-32 bg-blush/50">
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
          {topicBundles.map((topic) => (
            <div key={topic.name} className="group bg-ivory rounded-[28px] overflow-hidden card-shadow hover:shadow-xl transition-shadow cursor-pointer">
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
  );
}
