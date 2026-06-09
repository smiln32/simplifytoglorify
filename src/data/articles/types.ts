export interface ArticleMeta {
  id: number;
  slug: string;
  title: string;
  cardTitle?: string; // shorter title shown on cards; full title stays on the article page
  category: string;
  excerpt: string;
  metaDescription?: string;
  keywords?: string[];
  image?: string;
}

export interface Article extends ArticleMeta {
  content?: string;
  body?: string;
  date?: string;
  author?: string;
  moreResources?: {
    heading: string;
    intro: string;
    references: Array<{ reference: string; description: string }>;
  };
}
