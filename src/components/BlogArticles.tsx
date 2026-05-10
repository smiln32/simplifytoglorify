import React, { useState } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export default function BlogArticles(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Finding Peace in Uncertainty',
      excerpt: 'When the path ahead feels unclear, there is grace in learning to be still. This article explores how faith holds us steady when everything feels uncertain.',
      category: 'Faith',
      date: 'April 15, 2026',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'The Power of Small Moments',
      excerpt: 'Five minutes on paper can change everything. Discover how even the briefest journaling practice can anchor your heart and remind you of what matters most.',
      category: 'Journaling',
      date: 'April 8, 2026',
      readTime: '6 min read',
    },
    {
      id: 3,
      title: 'Prayer When Words Fail',
      excerpt: 'Sometimes we don\'t have words. Sometimes a prayer is just a whisper, a sigh, or silence before God. That\'s enough. That\'s everything.',
      category: 'Prayer',
      date: 'April 1, 2026',
      readTime: '4 min read',
    },
    {
      id: 4,
      title: 'Grieving Without Pretense',
      excerpt: 'Grief is messy. It\'s not a journey with stages to check off. It\'s real, it\'s valid, and it deserves space. Here\'s how to honor your grief honestly.',
      category: 'Grief',
      date: 'March 25, 2026',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Anxiety and God\'s Presence',
      excerpt: 'Anxiety doesn\'t mean God isn\'t there. In fact, He draws near to the anxious heart. Learn how to find His presence in the midst of worry.',
      category: 'Anxiety',
      date: 'March 18, 2026',
      readTime: '5 min read',
    },
    {
      id: 6,
      title: 'Simplifying Your Spiritual Life',
      excerpt: 'You don\'t need complicated spiritual practices to know God. Sometimes the most profound faith is found in the simplest moments and the quietest prayers.',
      category: 'Faith',
      date: 'March 10, 2026',
      readTime: '6 min read',
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Faith', 'Journaling', 'Prayer', 'Grief', 'Anxiety'];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.blogHeader}>
        <div style={styles.blogSubtitle}>From the Blog</div>
        <h1 style={styles.blogTitle}>Words from the journey.</h1>
        <p style={styles.blogDescription}>Gentle reflections on faith, simplicity, and finding peace in the everyday</p>
      </div>

      {/* Search & Filter */}
      <div style={styles.blogContainer}>
        <div style={styles.searchFilter}>
          <input
            type="text"
            style={styles.searchBox}
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Articles Grid */}
        <div style={styles.blogGrid}>
          {filteredArticles.map((article) => (
            <article key={article.id} style={styles.blogCard}>
              <div style={styles.blogCardImage}>📷 {article.title}</div>
              <div style={styles.blogCardContent}>
                <div style={styles.blogCardMeta}>
                  <span style={styles.blogCardCategory}>{article.category}</span>
                  <span style={styles.metaText}>{article.date}</span>
                  <span style={styles.metaText}>{article.readTime}</span>
                </div>
                <h2 style={styles.blogCardTitle}>{article.title}</h2>
                <p style={styles.blogCardExcerpt}>{article.excerpt}</p>
                <a href="#" style={styles.blogCardLink}>Read More →</a>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={styles.noResults}>No articles found. Try adjusting your search or filter.</div>
        )}
      </div>
    </div>
  );
}

const styles: React.CSSProperties & { [key: string]: React.CSSProperties } = {
  container: {
    background: '#f3f1ec',
    minHeight: '100vh',
  } as React.CSSProperties,
  blogHeader: {
    padding: '4rem 3rem',
    textAlign: 'center',
    maxWidth: '1280px',
    margin: '0 auto',
  } as React.CSSProperties,
  blogSubtitle: {
    fontSize: '12px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: '#b2c6b1',
    marginBottom: '1rem',
  } as React.CSSProperties,
  blogTitle: {
    fontSize: '48px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: '#404040',
    marginBottom: '1.5rem',
    fontFamily: "'Georgia', 'Garamond', serif",
  } as React.CSSProperties,
  blogDescription: {
    fontSize: '18px',
    fontStyle: 'italic',
    color: '#888',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: "'Georgia', serif",
  } as React.CSSProperties,
  blogContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '3rem',
  } as React.CSSProperties,
  searchFilter: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '3rem',
    alignItems: 'center',
  } as React.CSSProperties,
  searchBox: {
    flex: '1',
    padding: '0.9rem 1.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: "'Georgia', serif",
    fontSize: '14px',
  } as React.CSSProperties,
  filterSelect: {
    padding: '0.9rem 1.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: "'Georgia', serif",
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer',
  } as React.CSSProperties,
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2.5rem',
  } as React.CSSProperties,
  blogCard: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as React.CSSProperties,
  blogCardImage: {
    width: '100%',
    height: '240px',
    background: 'linear-gradient(135deg, #b2c6b1 0%, #a4b9c4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '1.5rem',
  } as React.CSSProperties,
  blogCardContent: {
    padding: '1.8rem',
  } as React.CSSProperties,
  blogCardMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#999',
    marginBottom: '0.8rem',
  } as React.CSSProperties,
  blogCardCategory: {
    fontSize: '11px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#b2c6b1',
    fontWeight: '500',
  } as React.CSSProperties,
  metaText: {
    fontSize: '13px',
    color: '#999',
  } as React.CSSProperties,
  blogCardTitle: {
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '1.4',
    color: '#404040',
    marginBottom: '0.8rem',
    fontFamily: "'Georgia', serif",
  } as React.CSSProperties,
  blogCardExcerpt: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '1.3rem',
  } as React.CSSProperties,
  blogCardLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#b2c6b1',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'gap 0.3s',
  } as React.CSSProperties,
  noResults: {
    textAlign: 'center',
    padding: '3rem',
    color: '#999',
    fontSize: '16px',
  } as React.CSSProperties,
};