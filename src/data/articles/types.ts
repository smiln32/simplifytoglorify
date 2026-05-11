export interface ArticleMeta {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}
