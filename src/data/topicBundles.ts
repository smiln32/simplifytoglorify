export interface TopicBundle {
  name: string;
  image: string;
  description: string;
  imageClass?: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'Anxiety', image: '/images/topic_anxiety.webp', description: 'For anxious hearts' },
  { name: 'Depression', image: '/images/topic_depression.webp', description: 'For heavy days' },
  { name: 'Grief', image: '/images/topic-grief.jpg', description: 'For those who mourn' },
  { name: 'Prayer', image: '/images/topic-prayer.jpg', description: 'For learning to pray' },
  { name: 'Gratitude', image: '/images/topic_gratitude.webp', description: 'For thankful hearts' },
  { name: 'Caregiving', image: '/images/topic-caregiving.jpg', description: 'For those giving care', imageClass: 'saturate-[55%] brightness-[1.05]' },
  { name: 'Faith', image: '/images/faith-based-living.webp', description: 'For doubting, questioning hearts' },
  { name: 'Uncertainty', image: '/images/topic_uncertainty.webp', description: 'For unclear seasons', imageClass: 'saturate-[55%] brightness-[1.05]' },
];
