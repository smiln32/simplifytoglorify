export interface BlogPostMeta {
  id: number;
  slug: string;
  title: string;
  cardTitle?: string; // shorter title shown on cards; full title stays on the post page
  excerpt: string;
  type?: "article" | "blog"; // optional for now; treat missing as "article"
  metaDescription?: string;
  keywords?: string[];
  date: string;
  readTime: string;
  category: string;
  image?: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
