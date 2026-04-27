import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Blog() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f1ec', // ivory
      padding: '120px 20px 80px',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '24px' }}>
          <Breadcrumbs />
        </div>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          paddingBottom: '40px',
          borderBottom: '1px solid #d9d7d4',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#4a5568', // slate blue
            fontWeight: 400,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            The Journal
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#718096',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Gentle reflections on faith, simplicity, and finding peace in the everyday
          </p>
        </div>

        {/* Blog Grid */}
        <div style={{
          display: 'grid',
          gap: '40px',
        }}>
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: hoveredId === post.id 
                  ? '0 8px 30px rgba(0,0,0,0.08)' 
                  : '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.4s ease',
                transform: hoveredId === post.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {post.image && (
                  <div style={{
                    height: '280px',
                    overflow: 'hidden',
                    backgroundColor: '#b2c6b1', // sage green placeholder
                  }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        transform: hoveredId === post.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '32px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    fontSize: '0.9rem',
                    color: '#718096',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    <span>{post.date}</span>
                    <span style={{ color: '#c6b5c8' }}>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    color: '#4a5568',
                    fontWeight: 500,
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}>
                    {post.title}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}>
                    {post.excerpt}
                  </p>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#b2c6b1', // sage green
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    transition: 'gap 0.3s ease',
                  }}>
                    Read more 
                    <span style={{
                      transition: 'transform 0.3s ease',
                      transform: hoveredId === post.id ? 'translateX(4px)' : 'translateX(0)',
                    }}>→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
