import { useRef } from 'react';
import PageNav from '@/components/PageNav';
import ArticlesSection from '@/components/sections/ArticlesSection';

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />
      <div className="pt-20 lg:pt-24">
        <ArticlesSection sectionRef={sectionRef} />
      </div>
    </div>
  );
}
