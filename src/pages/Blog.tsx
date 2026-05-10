import { Link } from 'react-router-dom';
import BlogArticles from '@/components/BlogArticles';

export default function Blog() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ivory)', fontFamily: 'Lora, Georgia, serif' }}>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'rgba(243,241,236,0.92)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(64,64,64,0.08)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          <Link to="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--charcoal)', textDecoration: 'none' }}>
            Simplify to Glorify
          </Link>
          <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--charcoal)', textDecoration: 'none' }}>
            &larr; Home
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: '72px' }}>
        <BlogArticles />
      </main>
    </div>
  );
}
