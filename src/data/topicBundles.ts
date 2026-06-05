export interface TopicBundle {
  name: string;
  image: string;
  description: string;
  imageClass?: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'Anxiety', image: '/images/topic_anxiety.webp', description: 'For anxious hearts' },
  { name: 'Depression', image: '/images/topic_depression.webp', description: 'For heavy days' },
  { name: 'Grief', image: '/images/topic-grief.webp', description: 'For those who mourn' },
  { name: 'Prayer', image: '/images/topic-prayer.webp', description: 'For learning to pray' },
  { name: 'Gratitude', image: '/images/topic_gratitude.webp', description: 'For thankful hearts' },
  { name: 'Caregiving', image: '/images/topic-caregiving.webp', description: 'For those giving care' },
  { name: 'Faith', image: '/images/topic_faith.webp', description: 'For doubting, questioning hearts' },
  { name: 'Uncertainty', image: '/images/topic_uncertainty.webp', description: 'For unclear seasons', imageClass: 'saturate-[55%] brightness-[1.05]' },
];
