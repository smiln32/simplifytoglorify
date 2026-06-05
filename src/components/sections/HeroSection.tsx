import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SectionRef, ScrollFn } from '@/types';

interface HeroSectionProps {
  sectionRef: SectionRef;
  aboutRef: SectionRef;
  scrollToSection: ScrollFn;
}

export default function HeroSection({ sectionRef, aboutRef, scrollToSection }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.5) {
        video.currentTime = 0;
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen pt-20 lg:pt-24 flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="order-2 lg:order-1">
            <div className="hero-text space-y-6 text-center">
              <p className="font-script italic text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight">
                Simplify to Glorify
              </p>
              <p className="font-display text-2xl lg:text-3xl text-slate-blue">
                Practical Peace for Overwhelmed Hearts
              </p>
              <p className="text-muted-slate text-lg max-w-md leading-relaxed mx-auto">
                Grace-filled journals, scripture cards, prayer cards, devotionals, and (first steps) mini-guides for women in challenging seasons.
              </p>

              <div className="rounded-card-sm p-6 lg:p-8 bg-slate-blue text-center">
                <p className="font-display text-lg lg:text-xl italic leading-relaxed text-white">
                  "Come to Me, all who are weary and burdened,<br />and I will give you rest."
                </p>
                <p className="mt-2 text-sm tracking-widest uppercase font-body text-white">
                  Matthew 11:28
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="hero-image relative rounded-card overflow-hidden card-shadow">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                poster="/images/journaling-at-home.jpg"
                className="w-full h-[378px] lg:h-[522px] object-cover scale-[1.08]"
              >
                <source src="/images/simple-cup-of-tea.mp4" type="video/mp4" />
                <img
                  src="/images/journaling-at-home.jpg"
                  alt="Journaling space with Bible, journal and coffee"
                  className="w-full h-[378px] lg:h-[522px] object-cover scale-[1.08]"
                />
              </video>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
