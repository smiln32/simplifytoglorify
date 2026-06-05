export const categoryColors: Record<string, string> = {
  'Anxiety':              '#c0d1bd',
  'ADHD':                 '#b3c1d4',
  'Caregiving':           '#d7aba8',
  'Chronic Pain':         '#bca7c3',
  'Depression':           '#e8b87a',
  'Faith':                '#a6bfb4',
  'Struggling with Faith':'#a6bfb4',
  'Gratitude':            '#e7d7d4',
  'Grief':                '#f3f1b4',
  'Prayer':               '#9ca6c2',
  'Peace':                '#c0d1bd',
  'Patience':             '#cea1b4',
  'Regret':               '#7ec8c8',
  'Trusting God':         '#d7ab7a',
  'Uncertainty':          '#c5b5c8',

  // Inherit from primary categories
  'Journaling':           '#e8b87a',  // Depression
  'Scripture Writing':    '#b3c1d4',  // ADHD
  'Encouragement':        '#bca7c3',  // Chronic Pain
  'Emotions':             '#f3f1b4',  // Grief
  'Reflection':           '#d7ab7a',  // Trusting God
  'Simplicity':           '#e7d7d4',  // Gratitude
};

const defaultColor = '#9ca6c2';

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? defaultColor;
}
