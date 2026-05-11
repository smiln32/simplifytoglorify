export interface ArticleMeta {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string;
}
