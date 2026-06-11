export interface TopicBundle {
  name: string;
  image: string;
  description: string;
  /** Product category slug, when it differs from the display name. */
  slug?: string;
  imageClass?: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'ADHD', image: '/images/topic_adhd.webp', description: 'for focus and grace' },
  { name: 'Anxiety', image: '/images/topic_anxiety.webp', description: 'for unsettled thoughts' },
  { name: 'Caregiving', image: '/images/topic_caregiving.webp', description: 'for those giving care' },
  { name: 'Chronic Pain', image: '/images/topic_chronic_pain.webp', description: 'for weary bodies' },
  { name: 'Depression', image: '/images/topic_depression.webp', description: 'for heavy days' },
  { name: 'Faith', image: '/images/topic_faith.webp', description: 'closer to God' },
  { name: 'Gratitude', image: '/images/topic_gratitude.webp', description: 'for thankful hearts' },
  { name: 'Grief', image: '/images/topic-grief.webp', description: 'for those who mourn' },
  { name: 'Patience', image: '/images/topic_patience.webp', description: "embracing God's timing" },
  { name: 'Prayer', image: '/images/topic-prayer.webp', description: 'for learning to pray' },
  { name: 'Regret', image: '/images/topic_regret.webp', description: 'forgiving yourself' },
  { name: 'Trusting God', image: '/images/topic_uncertainty.webp', description: 'in uncertainty', imageClass: 'saturate-[55%] brightness-[1.05]' },
];
