export interface BlogPostMeta {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
