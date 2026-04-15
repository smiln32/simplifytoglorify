import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
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
          <h1>Post not found</h1>
          <Link to="/blog" style={{ color: '#b2c6b1' }}>Return to Journal</Link>
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
        padding: '140px 20px 60px',
        borderBottom: '1px solid #d9d7d4',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
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
            <span>{post.date}</span>
            <span style={{ color: '#c6b5c8' }}>•</span>
            <span>{post.category}</span>
            <span style={{ color: '#c6b5c8' }}>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#4a5568',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            {post.title}
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {post.excerpt}
          </p>
        </div>
      </div>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '60px 20px',
      }}>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '48px',
            }}
          />
        )}
        <div
          style={{
            fontSize: '1.2rem',
            lineHeight: 1.9,
            color: '#2d3748',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid #d9d7d4',
        }}>
          <Link
            to="/blog"
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
            <span>←</span> Back to Journal
          </Link>
        </div>
      </div>
    </article>
  );
}
