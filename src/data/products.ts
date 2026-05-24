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
  productDescriptions?: Partial<Record<ProductType | 'Bundle', string>>;
}

export const categories: Category[] = [
  {
    name: 'ADHD',
    slug: 'adhd',
    description: 'Finding peace, purpose, and grace in how God made your mind.',
    productDescriptions: {
      'Journal': 'A quiet place to breathe, reflect and find strength.',
      'Scripture Cards': 'Verses for the moments your mind needs an anchor.',
      'Prayer Cards': 'Short, honest prayers for a mind that moves fast.',
      '7-Day Reset': 'A gentle week to slow down and return to God.',
      'Devotional': 'Grounding reflections for understanding and truth.',
      'Bundle': 'The full collection.',
    },
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
    productDescriptions: {
      'Journal': 'A safe place to write through fear and find steadiness.',
      'Scripture Cards': 'Verses to quiet an anxious heart.',
      'Prayer Cards': 'Prayers for the moments worry takes over.',
      '7-Day Reset': 'Seven days to release anxiety and rest in God.',
      'Devotional': 'Gentle encouragement for the days fear feels loudest.',
      'Bundle': 'The full collection.',
    },
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
    productDescriptions: {
      'Journal': 'A quiet space to reflect and find grace.',
      'Scripture Cards': 'Verses to ground your heart in faith.',
      'Prayer Cards': 'Prayers for peace, trust, and strength.',
      '7-Day Reset': 'A gentle reset to calm your heart.',
      'Devotional': 'Scripture-rooted encouragement for the caregiving season.',
      'Bundle': 'The full collection.',
    },
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
    productDescriptions: {
      'Journal': 'A quiet place to find God\'s nearness on the hardest days.',
      'Scripture Cards': 'Verses that remind you God is near, even now.',
      'Prayer Cards': 'Prayers of trust for the days your body needs grace.',
      '7-Day Reset': 'A gentle week to rest in God and find renewed hope.',
      'Devotional': 'Steady encouragement for the long road — and the God who walks it with you.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'Chronic Illness', slug: 'illness' },
      { name: 'Invisible Illness', slug: 'invisible-illness' },
    ],
  },
  {
    name: 'Depression',
    slug: 'depression',
    description: 'Gentle encouragement for the seasons when everything feels heavy.',
    productDescriptions: {
      'Journal': 'A gentle space to write through the heavy days and find light.',
      'Scripture Cards': 'Verses to carry you when everything feels dark.',
      'Prayer Cards': 'Prayers for the mornings it is hard to get up.',
      '7-Day Reset': 'Seven days of small, gentle steps back toward hope.',
      'Devotional': 'Quiet encouragement for the slow climb out of the dark.',
      'Bundle': 'The full collection.',
    },
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
    productDescriptions: {
      'Journal': 'A daily place to notice God\'s goodness and write it down.',
      'Scripture Cards': 'Verses to anchor your heart in thankfulness.',
      'Prayer Cards': 'Prayers that open your eyes to what is already good.',
      '7-Day Reset': 'Seven days to cultivate a grateful, God-centered heart.',
      'Devotional': 'Gentle reflections to train your heart toward thankfulness.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'Gratitude', slug: 'gratitude' },
    ],
  },
  {
    name: 'Grief',
    slug: 'grief',
    description: 'Scripture that meets you in the deepest losses of this life.',
    productDescriptions: {
      'Journal': 'A safe place to grieve honestly and find God in the loss.',
      'Scripture Cards': 'Verses for the moments grief takes your breath away.',
      'Prayer Cards': 'Prayers for the days words are too hard to find.',
      '7-Day Reset': 'A gentle week to breathe, grieve, and rest in God\'s care.',
      'Devotional': 'Tender encouragement for the long walk through loss.',
      'Bundle': 'The full collection.',
    },
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
    description: 'Finding God\'s faithfulness in the slow seasons of waiting.',
    productDescriptions: {
      'Journal': 'A space to write through the waiting and find peace in it.',
      'Scripture Cards': 'Verses for the seasons God is asking you to trust.',
      'Prayer Cards': 'Prayers for when the waiting feels too long.',
      '7-Day Reset': 'Seven days to rest in God\'s timing and release the rush.',
      'Devotional': 'Gentle reflections on trusting God in the slow seasons.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Prayer',
    slug: 'prayer',
    description: 'Deepening your conversation with God through honest, Scripture-rooted prayer.',
    productDescriptions: {
      'Journal': 'A quiet place to pour out your heart and hear from God.',
      'Scripture Cards': 'Verses to deepen and anchor your prayer life.',
      'Prayer Cards': 'Written prayers for the mornings the words won\'t come.',
      '7-Day Reset': 'Seven days to build a simple, honest rhythm of prayer.',
      'Devotional': 'Gentle guidance for drawing closer to God in prayer.',
      'Bundle': 'The full collection.',
    },
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
    productDescriptions: {
      'Journal': 'A safe place to release the past and rest in God\'s grace.',
      'Scripture Cards': 'Verses to remind you that grace covers everything.',
      'Prayer Cards': 'Prayers of release for the things you cannot undo.',
      '7-Day Reset': 'Seven days to let go and walk forward in God\'s forgiveness.',
      'Devotional': 'Gentle encouragement to receive the grace God freely gives.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Struggling with Faith',
    slug: 'struggling-with-faith',
    description: 'For seasons of doubt, distance, and the long road back to trust.',
    productDescriptions: {
      'Journal': 'An honest space to ask hard questions and still reach for God.',
      'Scripture Cards': 'Verses for the seasons when belief feels far away.',
      'Prayer Cards': 'Prayers for the in-between — the doubt and the longing.',
      '7-Day Reset': 'A gentle week for the soul finding its way back to God.',
      'Devotional': 'Quiet encouragement for those still holding on, even barely.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Uncertainty',
    slug: 'uncertainty',
    description: 'Trusting God with what you cannot predict or control.',
    productDescriptions: {
      'Journal': 'A place to write out the unknown and rest in what is sure.',
      'Scripture Cards': 'Verses for the days the future feels out of your hands.',
      'Prayer Cards': 'Prayers of surrender for what you cannot predict or control.',
      '7-Day Reset': 'Seven days to release what you don\'t know and trust what you do.',
      'Devotional': 'Gentle reminders of the God who holds all you cannot see.',
      'Bundle': 'The full collection.',
    },
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
