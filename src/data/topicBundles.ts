export interface TopicBundle {
  name: string;
  image: string;
  description: string;
  imageClass?: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'ADHD', image: '/images/topic-adhd.jpg', description: 'For minds that move their own way' },
  { name: 'Anxiety', image: '/images/topic_anxiety.png', description: 'For anxious hearts' },
  { name: 'Caregiving', image: '/images/topic-caregiving.jpg', description: 'For those giving care', imageClass: 'saturate-[55%] brightness-[1.05]' },
  { name: 'Chronic Pain', image: '/images/topic-chronic-pain.jpg', description: 'For those carrying daily pain' },
  { name: 'Depression', image: '/images/topic_depression.png', description: 'For heavy days' },
  { name: 'Gratitude', image: '/images/topic_gratitude.png', description: 'For thankful hearts' },
  { name: 'Grief', image: '/images/topic-grief.jpg', description: 'For those who mourn' },
  { name: 'Patience', image: '/images/topic-patience.jpg', description: 'For seasons of waiting' },
  { name: 'Prayer', image: '/images/topic-prayer.jpg', description: 'For learning to pray' },
  { name: 'Regret', image: '/images/topic-regret.jpg', description: 'For releasing what is past' },
  { name: 'Struggling with Faith', image: '/images/topic-struggling-with-faith.jpg', description: 'For doubting, questioning hearts' },
  { name: 'Uncertainty', image: '/images/topic_uncertainty.png', description: 'For unclear seasons', imageClass: 'saturate-[55%] brightness-[1.05]' },
];
