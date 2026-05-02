export interface TopicBundle {
  name: string;
  image: string;
  description: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'Caregiving', image: '/images/topic-caregiving.jpg', description: 'For those giving care' },
  { name: 'Grief', image: '/images/topic-grief.jpg', description: 'For those who mourn' },
  { name: 'Anxiety', image: '/images/topic-anxiety.jpg', description: 'For anxious hearts' },
  { name: 'Depression', image: '/images/topic-depression.jpg', description: 'For heavy days' },
  { name: 'Peace', image: '/images/topic-peace.jpg', description: 'For restless souls' },
  { name: 'Prayer', image: '/images/topic-prayer.jpg', description: 'For learning to pray' },
  { name: 'Uncertainty', image: '/images/topic-uncertainty.jpg', description: 'For unclear seasons' },
  { name: 'Gratitude', image: '/images/topic-gratitude.jpg', description: 'For thankful hearts' },
];
