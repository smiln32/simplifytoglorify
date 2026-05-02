import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturedSection from '@/components/sections/FeaturedSection';
import TopicsSection from '@/components/sections/TopicsSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import FreeResourceSection from '@/components/sections/FreeResourceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import type { SectionRef, SectionRefs } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const freeResourceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const refs: SectionRefs = {
    heroRef,
    aboutRef,
    featuredRef,
    topicsRef,
    articlesRef,
    freeResourceRef,
    contactRef,
  };

  const scrollToSection = (ref: SectionRef) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
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
        '.featured-section',
        '.topics-section',
        '.articles-section',
        '.free-resource-section',
        '.contact-section',
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
    <div className="min-h-screen bg-ivory">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      <Navbar refs={refs} scrollToSection={scrollToSection} />
      <HeroSection sectionRef={heroRef} aboutRef={aboutRef} scrollToSection={scrollToSection} />
      <AboutSection sectionRef={aboutRef} />
      <FeaturedSection sectionRef={featuredRef} />
      <TopicsSection sectionRef={topicsRef} />
      <ArticlesSection sectionRef={articlesRef} />
<FreeResourceSection sectionRef={freeResourceRef} />
      <ContactSection sectionRef={contactRef} />
      <Footer />
    </div>
  );
}

export default App;