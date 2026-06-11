export const CATEGORY_GROUPS: Record<string, string> = {
  "Grief": "Hard Seasons",
  "Depression": "Hard Seasons",
  "Anxiety": "Hard Seasons",
  "Chronic Pain": "Hard Seasons",
  "Caregiving": "Hard Seasons",
  "ADHD": "Hard Seasons",
  "Prayer": "Prayer & Trust",
  "Trusting God": "Prayer & Trust",
  "Faith": "Prayer & Trust",
  "Gratitude": "Heart & Habits",
  "Patience": "Heart & Habits",
  "Regret": "Heart & Habits",
  "Encouragement": "Heart & Habits",
  "Peace": "Heart & Habits",
  "General": "Heart & Habits",
  "Journaling": "Heart & Habits",
  "Scripture Writing": "Heart & Habits",
};

export const GROUPS = ["All", "Hard Seasons", "Prayer & Trust", "Heart & Habits"];

export function groupFor(category: string): string {
  const group = CATEGORY_GROUPS[category];
  if (group === undefined) {
    console.warn(
      `categoryGroups: "${category}" is not in CATEGORY_GROUPS; defaulting to "Heart & Habits". Add it to the map.`
    );
    return "Heart & Habits";
  }
  return group;
}
