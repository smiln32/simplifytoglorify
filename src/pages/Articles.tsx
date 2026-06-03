import { useRef } from 'react';
import PageNav from '@/components/PageNav';
import ArticlesSection from '@/components/sections/ArticlesSection';
import Footer from '@/components/sections/Footer';

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen bg-white">
      <PageNav />
      <div style={{ marginTop: '72px' }}>
        <ArticlesSection sectionRef={sectionRef} />
      </div>
      <Footer />
    </div>
  );
}
