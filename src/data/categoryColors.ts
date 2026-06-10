export const categoryColors: Record<string, string> = {
  'Anxiety':              '#b2c6b1',
  'ADHD':                 '#7b9fb3',
  'Caregiving':           '#d7aba8',
  'Chronic Pain':         '#c6b5c8',
  'Depression':           '#d3ad88',
  'Faith':                '#93bdb0',
  'Gratitude':            '#e0c4bb',
  'Grief':                '#cbb061',
  'Prayer':               '#587585',
  'Patience':             '#7a9678',
  'Regret':               '#71bdc0',
  'Trusting God':         '#88748a',
  'General':              '#9e9fa0',

  // Inherit from primary categories
  'Journaling':           '#9e9fa0',  // General
  'Scripture Writing':    '#9e9fa0',  // General
  'Encouragement':        '#c6b5c8',  // Chronic Pain
  'Emotions':             '#cbb061',  // Grief
  'Reflection':           '#9e9fa0',  // General
  'Simplicity':           '#e0c4bb',  // Gratitude
  'Uncertainty':          '#88748a',  // Trusting God
  'Peace':                '#93bdb0',  // Faith
};

export const defaultColor = '#9ca6c2';

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? defaultColor;
}
