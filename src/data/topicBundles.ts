export interface TopicBundle {
  name: string;
  image: string;
  description: string;
  imageClass?: string;
}

export const topicBundles: TopicBundle[] = [
  { name: 'ADHD', image: '/images/journaling-at-home.jpg', description: 'For minds that move their own way' },
  { name: 'Anxiety', image: '/images/topic_anxiety.webp', description: 'For anxious hearts' },
  { name: 'Caregiving', image: '/images/topic-caregiving.jpg', description: 'For those giving care', imageClass: 'saturate-[55%] brightness-[1.05]' },
  { name: 'Chronic Pain', image: '/images/grace_for_the_weary.webp', description: 'For those carrying daily pain' },
  { name: 'Depression', image: '/images/topic_depression.webp', description: 'For heavy days' },
  { name: 'Gratitude', image: '/images/topic_gratitude.webp', description: 'For thankful hearts' },
  { name: 'Grief', image: '/images/topic-grief.jpg', description: 'For those who mourn' },
  { name: 'Patience', image: '/images/slowing_down.webp', description: 'For seasons of waiting' },
  { name: 'Prayer', image: '/images/topic-prayer.jpg', description: 'For learning to pray' },
  { name: 'Regret', image: '/images/writing_as_a_process.webp', description: 'For releasing what is past' },
  { name: 'Struggling with Faith', image: '/images/faith-based-living.webp', description: 'For doubting, questioning hearts' },
  { name: 'Uncertainty', image: '/images/topic_uncertainty.webp', description: 'For unclear seasons', imageClass: 'saturate-[55%] brightness-[1.05]' },
];
