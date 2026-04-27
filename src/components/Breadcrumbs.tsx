import { Link, useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getPostTitle = (slug: string): string => {
    const post = blogPosts.find((p) => p.slug === slug);
    return post ? post.title : slug;
  };

  const buildItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', path: '/', isLast: pathSegments.length === 0 }
    ];

    if (pathSegments.length === 0) {
      return items;
    }

    // First segment is "blog"
    if (pathSegments[0] === 'blog') {
      items.push({ label: 'Journal', path: '/blog', isLast: pathSegments.length === 1 });

      // Second segment is a post slug
      if (pathSegments.length === 2) {
        const postTitle = getPostTitle(pathSegments[1]);
        items.push({ label: postTitle, path: location.pathname, isLast: true });
      }
    }

    return items;
  };

  const items = buildItems();

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '0 20px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '8px',
        }}
      >
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {index > 0 && (
              <ChevronRight
                size={14}
                style={{
                  color: '#c6b5c8',
                  flexShrink: 0,
                }}
              />
            )}
            {item.isLast ? (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: '#4a5568',
                  fontWeight: 500,
                }}
              >
                {index === 0 && (
                  <Home size={14} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} />
                )}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: '#718096',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#b2c6b1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#718096';
                }}
              >
                {index === 0 && (
                  <Home size={14} style={{ marginRight: '4px' }} />
                )}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
