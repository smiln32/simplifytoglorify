import type { SectionRef } from '@/types';

interface AboutSectionProps {
  sectionRef: SectionRef;
}

export default function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section ref={sectionRef} className="about-section py-20 lg:py-32 bg-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <img
              src="/images/about-story.jpg"
              alt="Our Story"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-[28px] card-shadow"
            />
          </div>
          <div>
            <p className="text-label text-slate-blue mb-4">My Story</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              Made for women<br />in hard seasons.
            </h2>
            <div className="space-y-4 text-charcoal text-lg leading-relaxed">
              <p>
                Simplify to Glorify began in the quiet, ordinary moments of hard seasons—when faith took effort, words seemed distant, and life felt overwhelming. Not every day allows for long devotionals or perfect routines. Sometimes you just need something simple. Something honest. Something that meets you where you are.
                These journals and cards were created for those moments.
                Each piece is designed to help you slow down, breathe, and return to what is true without pressure, without performance, and without needing to have everything figured out.
                Because God is not waiting for you to get it right.
                He meets you right where you are. I know. I have experienced it.
              </p>
              <p>
                I create gentle, Scripture-centered tools for grief, anxiety, caregiving, depression, peace and everyday overwhelm so you can breathe, reflect, and reconnect.
              </p>
            </div>
            <div className="mt-8 p-6 bg-ivory rounded-2xl card-shadow border-l-4 border-sage">
              <p className="font-body text-lg text-charcoal italic">"The Lord is near to the brokenhearted and saves those who are crushed in spirit."</p>
              <p className="text-sm text-muted-slate mt-2">— Psalm 34:18</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
