import { Link, useLocation } from 'react-router-dom';
import { blogPostMeta as blogPosts } from '../data/blogPosts/index';
import { articleMeta as articles } from '../data/articles/index';
import { getCategoryBySlug } from '../data/products';
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

  const getArticleTitle = (slug: string): string => {
    const article = articles.find((a) => a.slug === slug);
    return article ? article.title : slug;
  };

  const buildItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', path: '/', isLast: pathSegments.length === 0 }
    ];

    if (pathSegments.length === 0) {
      return items;
    }

    if (pathSegments[0] === 'blog') {
      if (pathSegments.length === 1) {
        items[0] = { label: 'Home', path: '/', isLast: false };
        items.push({ label: 'Blog', path: '/blog', isLast: true });
      } else if (pathSegments.length === 2) {
        items.push({ label: 'Blog', path: '/blog', isLast: false });
        const postTitle = getPostTitle(pathSegments[1]);
        items.push({ label: postTitle, path: location.pathname, isLast: true });
      }
    } else if (pathSegments[0] === 'products') {
      if (pathSegments.length === 1) {
        items.push({ label: 'Shop', path: '/products', isLast: true });
      } else if (pathSegments.length === 2) {
        items.push({ label: 'Shop', path: '/products', isLast: false });
        const cat = getCategoryBySlug(pathSegments[1]);
        items.push({ label: cat ? cat.name : pathSegments[1], path: location.pathname, isLast: true });
      }
    } else if (pathSegments[0] === 'articles') {
      items.push({ label: 'Articles', path: '/#articles', isLast: pathSegments.length === 1 });
      if (pathSegments.length === 2) {
        const articleTitle = getArticleTitle(pathSegments[1]);
        items.push({ label: articleTitle, path: location.pathname, isLast: true });
      }
    }

    return items;
  };

  const items = buildItems();

  return (
    <nav
      aria-label="Breadcrumb"
      style={{ width: '100%' }}
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
