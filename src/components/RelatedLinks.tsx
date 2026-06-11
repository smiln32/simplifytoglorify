import { Link } from 'react-router-dom';
import { articleMeta } from '@/data/articles/index';
import { blogPostMeta } from '@/data/blogPosts/index';
import { getCategoryBySlug } from '@/data/products';

// Maps a post category to the product-collection slug it should cross-sell.
// Categories with no matching product collection (Journaling, General, etc.)
// are omitted and simply show no product CTA.
const CATEGORY_TO_PRODUCT: Record<string, string> = {
  'ADHD': 'adhd',
  'Anxiety': 'anxiety',
  'Caregiving': 'caregiving',
  'Chronic Pain': 'chronic-pain',
  'Depression': 'depression',
  'Faith': 'faith',
  'Gratitude': 'gratitude',
  'Grief': 'grief',
  'Patience': 'patience',
  'Prayer': 'prayer',
  'Regret': 'regret',
  'Trusting God': 'trusting-god',
  'Peace': 'faith',
  'Uncertainty': 'trusting-god',
};

interface Item {
  slug: string;
  title: string;
  cardTitle?: string;
  category: string;
  to: string;
}

// One flat list of every article and blog post, each with its route.
const ALL: Item[] = [
  ...articleMeta.map((a): Item => ({ slug: a.slug, title: a.title, cardTitle: a.cardTitle, category: a.category, to: `/articles/${a.slug}` })),
  ...blogPostMeta.map((p): Item => ({ slug: p.slug, title: p.title, cardTitle: p.cardTitle, category: p.category, to: `/blog/${p.slug}` })),
];

// A post's "topic" is the product collection it maps to (CATEGORY_TO_PRODUCT).
// Posts sharing a topic are related — this also unifies synonyms (Peace→Faith,
// Uncertainty→Trusting God). A category with no mapping (Journaling, General,
// Scripture Writing, Encouragement, etc.) is treated as general/cross-cutting.
const topicOf = (category: string): string | undefined => CATEGORY_TO_PRODUCT[category];

// Pick up to `limit` posts: same topic first, then general posts. Posts on a
// *different* specific topic are excluded entirely (no depression after grief),
// so the section shows fewer items rather than padding with unrelated topics.
function relatedTo(category: string, to: string, limit = 3): Item[] {
  const topic = topicOf(category);
  return ALL
    .filter((p) => p.to !== to)
    .map((p) => {
      const t = topicOf(p.category);
      const score = topic && t === topic ? 2 : !t ? 1 : 0;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export default function RelatedLinks({ category, to }: { category: string; to: string }) {
  const related = relatedTo(category, to);
  const productSlug = CATEGORY_TO_PRODUCT[category];
  const product = productSlug ? getCategoryBySlug(productSlug) : undefined;

  if (related.length === 0 && !product) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-charcoal/10">
      <h2 className="font-display text-2xl text-charcoal mb-6">Keep reading</h2>

      {related.length > 0 && (
        <ul className="space-y-5 mb-10">
          {related.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className="group block">
                <span className="block text-xs font-semibold tracking-widest uppercase text-muted-slate mb-1">
                  {p.category}
                </span>
                <span className="font-display text-lg text-charcoal group-hover:text-slate-blue transition-colors duration-200">
                  {p.cardTitle ?? p.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={product ? `/products/${product.slug}` : '/products'}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-blue text-slate-blue font-body text-sm hover:bg-slate-blue hover:text-white transition-colors duration-200"
      >
        {product ? `Explore the ${product.name} collection →` : 'Explore all collections →'}
      </Link>
    </aside>
  );
}
