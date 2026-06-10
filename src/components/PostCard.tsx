import { Link } from 'react-router-dom';
import { groupFor, GROUP_COLOR } from '@/lib/categoryGroups';

// Minimal shape shared by ArticleMeta and BlogPostMeta. Both data systems
// satisfy this, so one card renders either. readTime is blog-only; treat
// missing as empty per the schema rules.
export interface PostCardData {
  slug: string;
  title: string;
  cardTitle?: string;
  category: string;
  excerpt: string;
  image?: string;
  readTime?: string;
}

function CardImage({ post, accent }: { post: PostCardData; accent: string }) {
  const box = { width: '100%', aspectRatio: '3 / 2' as const };
  if (post.image) {
    return (
      <img
        src={post.image}
        alt=""
        loading="lazy"
        style={{ ...box, objectFit: 'cover', display: 'block' }}
      />
    );
  }
  // No image yet: a solid category-color block with the label keeps the grid
  // even. aspectRatio locks every card to the same height.
  return (
    <div
      style={{
        ...box,
        background: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: 12,
        letterSpacing: '.12em',
      }}
    >
      {post.category.toUpperCase()}
    </div>
  );
}

export default function PostCard({ post, to }: { post: PostCardData; to: string }) {
  const accent = GROUP_COLOR[groupFor(post.category)];
  return (
    <Link
      to={to}
      className="group block transition-shadow hover:shadow-card-hover"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <article
        style={{
          background: '#ffffff',
          border: '1px solid #ececec',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <CardImage post={post} accent={accent} />
        <div style={{ padding: '16px 18px' }}>
          <div style={{ fontSize: 11, letterSpacing: '.1em', color: '#404040', marginBottom: 8 }}>
            {post.category.toUpperCase()}
            {post.readTime ? ` · ${post.readTime}` : ''}
          </div>
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {post.cardTitle ?? post.title}
          </h3>
          <p
            className="line-clamp-2"
            style={{
              fontFamily: 'Lora, serif',
              fontSize: 14.5,
              color: '#6b6b6b',
              marginTop: 10,
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
