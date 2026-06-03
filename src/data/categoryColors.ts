export const categoryColors: Record<string, string> = {
  // Articles
  'Journaling':           '#b2c6b1',
  'Prayer':               '#c6b5c8',
  'Depression':           '#a4b9c4',
  'Gratitude':            '#d4b483',
  'Grief':                '#c4a5a0',
  'Scripture Writing':    '#89b5af',

  // Blog
  'Encouragement':        '#c8b4d4',
  'ADHD':                 '#a8c5d6',
  'Anxiety':              '#b5c4d8',
  'Caregiving':           '#d4b8a0',
  'Reflection':           '#b4c8b8',
  'Simplicity':           '#c4d4b8',
  'Emotions':             '#d4b4b8',

  // Shop topics
  'Chronic Pain':         '#b8b8c8',
  'Patience':             '#c8d4b8',
  'Regret':               '#c4b8a8',
  'Struggling with Faith':'#b8c4d4',
  'Uncertainty':          '#d4c8b4',
};

const defaultColor = '#a4b9c4';

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? defaultColor;
}
