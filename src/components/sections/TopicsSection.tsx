import { Link } from 'react-router-dom';
import { topicBundles } from '@/data/topicBundles';
import type { SectionRef } from '@/types';

interface TopicsSectionProps {
  sectionRef: SectionRef;
}

// Shown on the Products page but kept off the home page to reduce clutter.
const HOME_HIDDEN_TOPICS = new Set(['Gratitude', 'Faith', 'Patience', 'Prayer']);

export default function TopicsSection({ sectionRef }: TopicsSectionProps) {
  const homeTopics = topicBundles
    .filter((topic) => !HOME_HIDDEN_TOPICS.has(topic.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section id="topics" ref={sectionRef} className="topics-section py-10 lg:py-16 scroll-mt-16 lg:scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <p className="font-display text-xl text-slate-blue mb-6">Explore by Topic</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Find the products you need<br />for the space you're in.
          </h2>
          <p className="text-charcoal text-lg max-w-xl mb-10">
            Each topic includes a journal, devotionals, scripture cards, prayer cards, and a 7-day &ldquo;First Steps&rdquo; reset when you need an extra-gentle start. They are all designed to work separately or together.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {homeTopics.map((topic) => (
            <Link
              key={topic.name}
              to={`/products/${topic.slug ?? topic.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block"
            >
              <div className="rounded-card-sm overflow-hidden card-shadow hover:shadow-card-hover transition-shadow">
                <img
                  src={topic.image}
                  alt={topic.name}
                  loading="lazy"
                  className={`w-full h-28 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-105${topic.imageClass ? ` ${topic.imageClass}` : ''}`}
                />
              </div>
              <p className="font-display text-base text-charcoal text-center mt-3 group-hover:text-slate-blue transition-colors">
                {topic.name}
              </p>
              <p className="text-sm text-muted-slate text-center mt-1">{topic.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xl font-semibold text-slate-blue hover:text-charcoal transition-colors duration-200"
          >
            More products →
          </Link>
        </div>
      </div>
    </section>
  );
}
