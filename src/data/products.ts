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
    description: 'Gentle encouragement for grace, focus, and faith.',
    productDescriptions: {
      'Journal': 'A reflective space for finding focus with grace.',
      'Scripture Cards': 'Verses to help your heart return to what is true.',
      'Prayer Cards': 'Short prayers for calm, clarity, and grace.',
      '7-Day Reset': 'A gentle reset for focus, peace, and next steps.',
      'Devotional': 'Scripture-rooted encouragement for steady growth.',
      'Bundle': 'The full ADHD collection.',
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
    description: 'Gentle encouragement for calm, trust, and steady faith.',
    productDescriptions: {
      'Journal': 'A quiet space to reflect, breathe, and find steadiness.',
      'Scripture Cards': 'Verses to calm your heart and steady your faith.',
      'Prayer Cards': 'Prayers for peace when your heart feels unsettled.',
      '7-Day Reset': 'A gentle reset for calm, trust, and rest.',
      'Devotional': 'Scripture-rooted encouragement for calm and trust.',
      'Bundle': 'The full anxiety collection.',
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
    description: 'Encouragement for the daily work of faithful care.',
    productDescriptions: {
      'Journal': 'A thoughtful space to pause, reflect, and breathe.',
      'Scripture Cards': 'Verses for strength, patience, and God\'s nearness.',
      'Prayer Cards': 'Prayers for wisdom, peace, and daily strength.',
      '7-Day Reset': 'A gentle reset for tiring days.',
      'Devotional': 'Daily encouragement for the caregiving season.',
      'Bundle': 'The full caregiving collection.',
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
    description: 'Gentle faith-filled support for weary bodies and hearts.',
    productDescriptions: {
      'Journal': 'A quiet space to reflect, rest, and find grace.',
      'Scripture Cards': 'Verses of comfort, strength, and God\'s nearness.',
      'Prayer Cards': 'Prayers for peace, trust, and daily strength.',
      '7-Day Reset': 'A gentle reset for rest, grace, and steady hope.',
      'Devotional': 'Scripture-rooted encouragement for pain-filled seasons.',
      'Bundle': 'The full chronic pain collection.',
    },
    subtopics: [
      { name: 'Chronic Illness', slug: 'illness' },
      { name: 'Invisible Illness', slug: 'invisible-illness' },
    ],
  },
  {
    name: 'Depression',
    slug: 'depression',
    description: 'Gentle encouragement when your heart feels heavy.',
    productDescriptions: {
      'Journal': 'A quiet space to reflect without pressure.',
      'Scripture Cards': 'Verses of comfort, mercy, and God\'s nearness.',
      'Prayer Cards': 'Simple prayers for the moments that feel hard to carry.',
      '7-Day Reset': 'A gentle place to pause and take one small step.',
      'Devotional': 'Scripture-rooted encouragement for weary seasons.',
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
    description: 'Gentle encouragement for noticing God\'s goodness.',
    productDescriptions: {
      'Journal': 'A quiet space to notice, reflect, and give thanks.',
      'Scripture Cards': 'Verses to anchor your heart in gratitude.',
      'Prayer Cards': 'Prayers for seeing God\'s goodness with a thankful heart.',
      '7-Day Reset': 'A gentle reset for noticing small mercies.',
      'Devotional': 'Scripture-rooted encouragement for a thankful heart.',
      'Bundle': 'The full gratitude collection.',
    },
    subtopics: [
      { name: 'Gratitude', slug: 'gratitude' },
    ],
  },
  {
    name: 'Grief',
    slug: 'grief',
    description: 'Gentle faith-filled support for the grieving heart.',
    productDescriptions: {
      'Journal': 'A quiet space to grieve, reflect, and find grace.',
      'Scripture Cards': 'Verses of comfort, hope, and God\'s nearness.',
      'Prayer Cards': 'Gentle prayers for a grieving heart.',
      '7-Day Reset': 'A gentle place to pause and feel held.',
      'Devotional': 'Scripture-rooted encouragement for the grieving heart.',
      'Bundle': 'The full grief collection.',
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
    description: 'Quiet encouragement for learning to trust God\'s timing.',
    productDescriptions: {
      'Journal': 'A quiet space to reflect, trust, and find peace.',
      'Scripture Cards': 'Verses to steady your heart in God\'s timing.',
      'Prayer Cards': 'Prayers for patience, peace, and trust.',
      '7-Day Reset': 'A gentle reset for waiting with peace.',
      'Devotional': 'Scripture-rooted encouragement for patient trust.',
      'Bundle': 'The full patience collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Prayer',
    slug: 'prayer',
    description: 'Simple help for building an authentic prayer life.',
    productDescriptions: {
      'Journal': 'A quiet place to open your heart before God.',
      'Scripture Cards': 'Verses to shape and strengthen your prayers.',
      'Prayer Cards': 'Written prayers for the moments when life gets hard.',
      '7-Day Reset': 'A simple reset for conversations with God.',
      'Devotional': 'Gentle guidance for growing closer to God in prayer.',
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
    description: 'Gentle encouragement for a heart learning to receive grace.',
    productDescriptions: {
      'Journal': 'A quiet space to reflect, release, and begin again.',
      'Scripture Cards': 'Verses of mercy, forgiveness, and hope.',
      'Prayer Cards': 'Prayers for peace, release, and a lighter heart.',
      '7-Day Reset': 'A gentle reset for making peace with the past.',
      'Devotional': 'Scripture-rooted encouragement for receiving grace.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Faith',
    slug: 'faith',
    description: 'Companions for your quiet time with God.',
    productDescriptions: {
      'Journal': 'A quiet space for honest questions and careful hope.',
      'Scripture Cards': 'Verses for seeking God when faith feels quiet.',
      'Prayer Cards': 'Simple prayers for doubt, longing, and return.',
      '7-Day Reset': 'A gentle reset for drawing near again.',
      'Devotional': 'Quiet encouragement for holding on with God.',
      'Bundle': 'The full faith collection.',
    },
    subtopics: [
      { name: 'General', slug: 'general' },
    ],
  },
  {
    name: 'Trusting God',
    slug: 'trusting-god',
    description: 'Faith-filled encouragement when the way ahead is unclear.',
    productDescriptions: {
      'Journal': 'A quiet place to name what feels unknown and rest in what is true.',
      'Scripture Cards': 'Verses for trusting God when the future feels uncertain.',
      'Prayer Cards': 'Prayers for surrender, trust, and peace.',
      '7-Day Reset': 'A gentle reset for releasing the unknown to God.',
      'Devotional': 'Quiet encouragement for walking forward with trust.',
      'Bundle': 'The full collection.',
    },
    subtopics: [
      { name: 'Trusting God in Uncertainty', slug: 'in-uncertainty' },
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
