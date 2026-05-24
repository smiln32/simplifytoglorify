export const PRODUCT_TYPES = [
  'Journal',
  'Scripture Cards',
  'Prayer Cards',
  '7-Day Reset',
  'Devotional',
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export interface SubTopic {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  subtopics: SubTopic[];
}

export const categories: Category[] = [
  {
    name: 'ADHD',
    slug: 'adhd',
    description: 'Finding peace, purpose, and grace in how God made your mind.',
    subtopics: [
      { name: 'Emotional Steadiness', slug: 'emotional-steadiness' },
      { name: 'Faith Reset', slug: 'faith-reset' },
      { name: 'Grace for How God Made Me', slug: 'grace-for-how-god-made-me' },
    ],
  },
  {
    name: 'Anxiety',
    slug: 'anxiety',
    description: 'Scripture-anchored tools for calming fear and resting in God\'s presence.',
    subtopics: [
      { name: 'Calm the Body, Steady the Heart', slug: 'calm-the-body-steady-the-heart' },
      { name: 'Held in the Unknown', slug: 'held-in-the-unknown' },
      { name: 'When You Cannot Control the Outcome', slug: 'when-you-cannot-control-the-outcome' },
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Caregiving',
    slug: 'caregiving',
    description: 'Sustaining grace for those walking alongside someone they love.',
    subtopics: [
      { name: "Alzheimer's & Memory Loss", slug: 'alzheimers-memory-loss' },
      { name: 'Dementia', slug: 'dementia' },
      { name: 'General', slug: 'general' },
      { name: 'Hospice & End of Life', slug: 'hospice-end-of-life' },
      { name: 'Spousal Caregiving', slug: 'spousal' },
    ],
  },
  {
    name: 'Chronic Pain',
    slug: 'chronic-pain',
    description: 'Finding God\'s nearness when your body carries a daily burden.',
    subtopics: [
      { name: 'Chronic Illness', slug: 'illness' },
      { name: 'Invisible Illness', slug: 'invisible-illness' },
    ],
  },
  {
    name: 'Depression',
    slug: 'depression',
    description: 'Gentle encouragement for the seasons when everything feels heavy.',
    subtopics: [
      { name: 'Empty Nest', slug: 'empty-nest' },
      { name: 'Job Loss', slug: 'job-loss' },
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Gratitude',
    slug: 'gratitude',
    description: 'Training your heart to notice God\'s goodness in every season.',
    subtopics: [
      { name: 'Gratitude', slug: 'gratitude' },
    ],
  },
  {
    name: 'Grief',
    slug: 'grief',
    description: 'Scripture that meets you in the deepest losses of this life.',
    subtopics: [
      { name: 'Child Loss', slug: 'child-loss' },
      { name: 'Parent Loss', slug: 'parent-loss' },
      { name: 'Sibling Loss', slug: 'sibling-loss' },
      { name: 'Spouse Loss', slug: 'spouse-loss' },
      { name: 'Stillborn Loss', slug: 'stillborn-loss' },
    ],
  },
  {
    name: 'Patience',
    slug: 'patience',
    description: 'Finding God\'s faithfulness in the slow, unseen seasons of waiting.',
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Prayer',
    slug: 'prayer',
    description: 'Deepening your conversation with God through honest, Scripture-rooted prayer.',
    subtopics: [
      { name: 'Confidence in Prayer', slug: 'confidence' },
      { name: 'General', slug: 'general' },
      { name: 'Unanswered Prayer', slug: 'unanswered' },
    ],
  },
  {
    name: 'Regret',
    slug: 'regret',
    description: 'Releasing what is past and resting in the grace that covers it.',
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Struggling with Faith',
    slug: 'struggling-with-faith',
    description: 'For seasons of doubt, distance, and the long road back to trust.',
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Uncertainty',
    slug: 'uncertainty',
    description: 'Trusting God with what you cannot predict or control.',
    subtopics: [
      { name: 'Trusting God in Uncertainty', slug: 'trusting-god' },
    ],
  },
];

export const PRODUCT_PRICES: Record<ProductType, number> = {
  'Journal': 25,
  'Scripture Cards': 5,
  'Prayer Cards': 5,
  '7-Day Reset': 7,
  'Devotional': 15,
};

export const PRODUCT_DESCRIPTIONS: Record<ProductType, string> = {
  'Journal': 'Guided prompts, scripture, and room to write through this season.',
  'Scripture Cards': 'Palm-sized verses for the table, the dashboard, the bedside.',
  'Prayer Cards': 'Written prayers for the mornings the words will not come.',
  '7-Day Reset': 'A printable week of short readings to begin again.',
  'Devotional': 'A thirty-day reading for tired mornings and slow evenings.',
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
