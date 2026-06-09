import { useRef, useEffect, useState } from 'react';
import type { SectionRef, ScrollFn } from '@/types';

interface HeroSectionProps {
  sectionRef: SectionRef;
  aboutRef: SectionRef;
  scrollToSection: ScrollFn;
}

export default function HeroSection({ sectionRef }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Defer the ~900KB hero video until the browser is idle so it doesn't
  // compete with above-the-fold content during first paint.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShowVideo(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setShowVideo(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    // Pick up the <source> that was just added and start autoplay.
    video.load();
    let rafId: number;
    const check = () => {
      if (video.duration && video.currentTime >= video.duration - 0.15) {
        video.currentTime = 0;
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [showVideo]);

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
                preload="none"
                poster="/images/hero-poster.webp"
                className="w-full h-[378px] lg:h-[522px] object-cover scale-[1.08] bg-slate-blue"
              >
                {showVideo && <source src="/images/simple-cup-of-tea.mp4" type="video/mp4" />}
              </video>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
