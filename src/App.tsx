import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TopicsSection from '@/components/sections/TopicsSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import ScriptureBanner from '@/components/sections/ScriptureBanner';
import FreeResourceSection from '@/components/sections/FreeResourceSection';
import Footer from '@/components/sections/Footer';
import type { SectionRef, SectionRefs } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const freeResourceRef = useRef<HTMLDivElement>(null);
  const refs: SectionRefs = {
    heroRef,
    aboutRef,
    topicsRef,
    articlesRef,
    freeResourceRef,
  };

  const scrollToSection = (ref: SectionRef) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    // Respect reduced-motion: skip animations so content is shown instantly
    // (no opacity:0 starting states) for users who prefer less movement.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-image',
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.hero-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
      );

      const sections = [
        '.about-section',
        '.topics-section',
        '.scripture-banner',
        '.articles-section',
        '.free-resource-section',
      ];

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-slate-blue">
      <div className="grain-overlay" />
      <Navbar refs={refs} scrollToSection={scrollToSection} />
      <HeroSection sectionRef={heroRef} aboutRef={aboutRef} scrollToSection={scrollToSection} />
      <AboutSection sectionRef={aboutRef} />
      <TopicsSection sectionRef={topicsRef} />
      <ScriptureBanner />
      <ArticlesSection sectionRef={articlesRef} limit={3} />
      <FreeResourceSection sectionRef={freeResourceRef} />
      <Footer />
    </div>
  );
}

export default App;
