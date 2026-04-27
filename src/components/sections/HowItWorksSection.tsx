import type { SectionRef } from '@/types';

interface HowItWorksSectionProps {
  sectionRef: SectionRef;
}

const steps = [
  { num: '01', title: 'Choose a topic', img: '/images/step-1.jpg' },
  { num: '02', title: 'Read & reflect',  img: '/images/step-2.jpg' },
  { num: '03', title: 'Pray & journal',  img: '/images/step-3.jpg' },
];

export default function HowItWorksSection({ sectionRef }: HowItWorksSectionProps) {
  return (
    <section ref={sectionRef} className="how-it-works-section py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-label text-slate-blue mb-4">How It Works</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
            Three steps to<br />quiet connection.
          </h2>
          <p className="text-charcoal text-lg">
            No long studies. No pressure. Just a simple rhythm you can keep—even on hard days.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="group">
              <div className="relative overflow-hidden rounded-[28px] card-shadow mb-6">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-label text-white bg-charcoal/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {step.num}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-2xl text-charcoal text-center">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
