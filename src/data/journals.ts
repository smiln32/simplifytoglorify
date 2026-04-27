export interface Journal {
  id: number;
  title: string;
  topic: string;
  description: string;
  price: number;
  image: string;
  bundleNote: string;
  verses: number;
  format: string;
}

export const journals: Journal[] = [
  {
    id: 1,
    title: 'Caregiving: A 30-Day Journey',
    topic: 'Caregiving',
    description: 'For the days when you\'re running on empty. Short reflections, gentle prompts, and space to breathe.',
    price: 24.99,
    image: '/images/topic-caregiving.jpg',
    bundleNote: 'Part of the Caregiving Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 2,
    title: 'Our Baby: A Remembrance Journal',
    topic: 'Grief',
    description: 'A tender companion for loss. Scripture that comforts with you without rushing you toward anything.',
    price: 24.99,
    image: '/images/topic-grief.jpg',
    bundleNote: 'Part of the Grief Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 3,
    title: 'Anxiety: Finding Stillness',
    topic: 'Anxiety',
    description: 'For anxious hearts seeking peace. Reassurance that you don\'t have to do anything other than just "be".',
    price: 24.99,
    image: '/images/topic-anxiety.jpg',
    bundleNote: 'Part of the Anxiety Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 4,
    title: 'Depression: Light in the Shadows',
    topic: 'Depression',
    description: 'Gentle truth for heavy days. You don\'t have to do anything, but if you do, God is there with you.',
    price: 24.99,
    image: '/images/topic-depression.jpg',
    bundleNote: 'Part of the Depression Bundle',
    verses: 30,
    format: 'Digital PDF'
  },
  {
    id: 5,
    title: 'Peace: A Quiet Heart',
    topic: 'Peace',
    description: 'Cultivating inner stillness through Scripture. For women seeking rest in a chaotic world.',
    price: 24.99,
    image: '/images/topic-peace.jpg',
    bundleNote: 'Part of the Peace Bundle',
    verses: 30,
    format: 'Digital PDF'
  }
];
