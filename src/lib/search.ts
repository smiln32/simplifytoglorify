// Relevance scoring for the free-text article/blog search.
//
// The goal: an item whose SUBJECT is the query (its category, or a title hit)
// ranks above one that merely mentions the word in passing in its excerpt.
// Searching "prayer" should surface Prayer articles before an Anxiety article
// that happens to say "prayer" once in its summary.

export interface Searchable {
  title: string;
  excerpt: string;
  category: string;
}

export function searchScore(item: Searchable, query: string): number {
  const q = query.toLowerCase().trim();
  if (q === '') return 0;

  const category = item.category.toLowerCase();
  const title = item.title.toLowerCase();
  const excerpt = item.excerpt.toLowerCase();

  let score = 0;
  if (category === q) score += 100; // exact category, e.g. "prayer" -> Prayer
  else if (category.includes(q)) score += 50; // partial, e.g. "care" -> Caregiving
  if (title.startsWith(q)) score += 40;
  else if (title.includes(q)) score += 25;
  if (excerpt.includes(q)) score += 5; // a mere mention is the weakest signal
  return score;
}
