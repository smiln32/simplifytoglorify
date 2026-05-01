import { Link } from 'react-router-dom';
import { topicBundles } from '@/data/topicBundles';
import type { SectionRef } from '@/types';

interface TopicsSectionProps {
  sectionRef: SectionRef;
}

export default function TopicsSection({ sectionRef }: TopicsSectionProps) {
  return (
    <section ref={sectionRef} className="topics-section py-10 lg:py-16 scroll-mt-16 lg:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-label text-slate-blue mb-4">Explore by Topic</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Find what you need<br />today.
          </h2>
          <p className="text-charcoal text-lg max-w-md">
            Each topic includes a journal, scripture cards, prayer cards, breath prayers, and devotionals—designed to work together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {topicBundles.map((topic) => (
            <Link
              key={topic.name}
              to={`/products#${topic.name.toLowerCase()}`}
              className="group block"
            >
              <div className="rounded-[20px] overflow-hidden card-shadow hover:shadow-xl transition-shadow">
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-full h-36 lg:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="font-display text-base text-charcoal text-center mt-3 group-hover:text-slate-blue transition-colors">
                {topic.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
