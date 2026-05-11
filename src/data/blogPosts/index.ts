import type { BlogPostMeta } from './types';

export type { BlogPostMeta, BlogPost } from './types';

export const blogPostMeta: BlogPostMeta[] = [
  {
    id: 1,
    slug: 'finding-peace-in-uncertainty',
    title: 'Finding Peace in Uncertainty',
    excerpt: 'When the path ahead feels unclear, there is grace in learning to be still.',
    date: 'April 15, 2026',
    readTime: '5 min read',
    category: 'Reflection',
    tags: ['peace', 'trust', 'stillness'],
    image: '/images/finding_peace_in_uncertainty.png',
  },
  {
    id: 2,
    slug: 'the-art-of-slowing-down',
    title: 'The Art of Slowing Down',
    excerpt: 'In a world that rushes, choosing a slower pace is a radical act of faith.',
    date: 'April 10, 2026',
    readTime: '4 min read',
    category: 'Simplicity',
    tags: ['slow living', 'mindfulness', 'rest'],
    image: '/images/the_art_of_slowing_down.png',
  },
  {
    id: 3,
    slug: 'grace-for-the-weary',
    title: 'Grace for the Weary',
    excerpt: 'There is no shame in being tired. There is only grace, waiting to meet you there.',
    date: 'April 5, 2026',
    readTime: '6 min read',
    category: 'Encouragement',
    tags: ['grace', 'rest', 'weariness'],
    image: '/images/grace_for_the_weary.png',
  },
];
