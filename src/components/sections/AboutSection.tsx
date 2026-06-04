import type { SectionRef } from '@/types';

interface AboutSectionProps {
  sectionRef: SectionRef;
}

export default function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section id="about" ref={sectionRef} className="about-section py-10 lg:py-16 scroll-mt-16 lg:scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>
            <img
              src="/images/about-story.webp"
              alt="Our Story"
              className="w-full h-[480px] lg:h-[620px] object-cover rounded-card card-shadow"
            />
          </div>

          <div>
            <p className="font-display text-xl text-slate-blue mb-4">My Story</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-charcoal mb-6">
              I understand hard seasons.
            </h2>
            <div className="space-y-5 text-charcoal text-lg leading-relaxed">
              <p>
                Simplify to Glorify began in the quiet, difficult moments of life's most challenging seasons. I understand the hard days when faith seems distant and each breath seems like a challenge.
              </p>
              <p>
                Not every day allows for long devotionals or perfect routines. Sometimes you just need something simple and honest. Something that meets you where you are. Each journal, devotional, set of cards, and guides were created for those moments.
              </p>
              <div className="pl-6 py-2 border-l-4 my-6" style={{ borderColor: 'var(--sage)' }}>
                <p className="font-display text-xl italic text-charcoal leading-snug">
                  God is ready to meet you in the mess.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
