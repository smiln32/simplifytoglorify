import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f1ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Article not found</h1>
          <Link to="/" style={{ color: '#b2c6b1' }}>Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <article style={{
      minHeight: '100vh',
      backgroundColor: '#f3f1ec',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '120px 20px 60px',
        borderBottom: '1px solid #d9d7d4',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: '#718096',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span>{article.category}</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#4a5568',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            {article.title}
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {article.excerpt}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        <div
          style={{ fontSize: '1.2rem', lineHeight: 1.9, color: '#2d3748' }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <div style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid #d9d7d4',
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#4a5568',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: "'Inter', sans-serif",
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#b2c6b1'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
