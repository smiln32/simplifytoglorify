export interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: 'how-to-start-journaling',
    title: 'How to Start Journaling: A Beginner\'s Guide',
    category: 'Journaling',
    excerpt: 'You don\'t need perfect handwriting or profound thoughts. You just need a willingness to show up.',
    content: 'Full article content here...'
  },
  {
    id: 2,
    slug: 'how-journaling-helps-process-emotions',
    title: 'How Journaling Helps Process Emotions',
    category: 'Journaling',
    excerpt: 'Writing creates understanding between you and your feelings, allowing you to see them more clearly.',
    content: 'Full article content here...'
  },
  {
    id: 3,
    slug: 'scripture-for-caregivers',
    title: 'Scripture for Caregivers: You Are Seen',
    category: 'Caregiving',
    excerpt: 'God sees the 3am wake-ups, the heart you put into everything and the weariness that sometimes seeps in.',
    content: 'Full article content here...'
  },
  {
    id: 4,
    slug: 'grief-and-faith-holding-both',
    title: 'Grief and Faith: Holding Both',
    category: 'Grief',
    excerpt: 'You can love God deeply and still grieve deeply. Holding both truths is okay.',
    content: 'Full article content here...'
  },
  {
    id: 5,
    slug: 'anxiety-doesnt-mean-you-lack-faith',
    title: 'Anxiety Doesn\'t Mean You Lack Faith',
    category: 'Anxiety',
    excerpt: 'Your anxious thoughts are not a measure of your faith. They are a sign you need compassion.',
    content: 'Full article content here...'
  },
  {
    id: 6,
    slug: 'breath-prayers-for-anxious-moments',
    title: 'Breath Prayers for Anxious Moments',
    category: 'Prayer',
    excerpt: 'Short, simple prayers you can whisper in a single breath when words feel too heavy.',
    content: 'Full article content here...'
  }
];
