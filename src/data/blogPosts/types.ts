export interface BlogPostMeta {
  slug: string;
  title: string;
  cardTitle?: string; // shorter title shown on cards; full title stays on the post page
  excerpt: string;
  metaDescription?: string;
  keywords?: string[];
  date: string;
  readTime: string;
  category: string;
  image?: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content?: string; // pre-rendered HTML
  body?: string; // raw markdown (rendered the same way articles are)
  author?: string;
  moreResources?: {
    heading: string;
    intro: string;
    references: Array<{ reference: string; description: string }>;
  };
}
