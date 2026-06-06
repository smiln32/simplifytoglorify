export const categoryColors: Record<string, string> = {
  'Anxiety':              '#b2c6b1',
  'ADHD':                 '#7b9fb3',
  'Caregiving':           '#d7aba8',
  'Chronic Pain':         '#c6b5c8',
  'Depression':           '#d7ab7a',
  'Faith':                '#a6bfb4',
  'Gratitude':            '#e6d7d3',
  'Grief':                '#ccac41',
  'Prayer':               '#587585',
  'Patience':             '#7a9678',
  'Regret':               '#7ec8c8',
  'Trusting God':         '#88748a',
  'General':              '#9e9fa0',

  // Inherit from primary categories
  'Journaling':           '#9e9fa0',  // General
  'Scripture Writing':    '#9e9fa0',  // General
  'Encouragement':        '#c6b5c8',  // Chronic Pain
  'Emotions':             '#ccac41',  // Grief
  'Reflection':           '#9e9fa0',  // General
  'Simplicity':           '#e7d7d4',  // Gratitude
  'Uncertainty':          '#88748a',  // Trusting God
  'Peace':                '#a6bfb4',  // Faith
};

export const defaultColor = '#9ca6c2';

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? defaultColor;
}
