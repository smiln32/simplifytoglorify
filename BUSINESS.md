# Simplify to Glorify — Business Overview

## Products

### Product Types
- **Journals** – Guided journaling with Scripture and prompts
- **Scripture Cards** – Printable/downloadable Scripture reference cards
- **Prayer Cards** – Prayer guide cards with specific focus areas
- **7-Day Resets** – Structured 7-day devotional/prayer/journaling experiences
- **Devotionals** – Shorter daily devotional content

### 14 Core Categories
Each category includes Scripture-anchored tools focused on specific emotional/spiritual struggles. See `src/data/products.ts` for full taxonomy with subcategories:

1. **ADHD** – Grace for how God made you; emotional steadiness; faith reset
2. **Anxiety** – Calming fear; trusting God in unknowns; controlling outcomes
3. **Caregiving** – For those walking alongside loved ones (Alzheimer's, dementia, hospice, spousal care)
4. **Chronic Pain** – God's nearness in daily suffering; chronic illness; invisible illness
5. **Depression** – Heavy seasons; empty nest; job loss; general depression support
6. **Gratitude** – Noticing God's goodness in every season
7. **Grief** – Specific loss support (child, parent, sibling, spouse, stillborn)
8. **Loneliness** – Remembering you are seen and held when alone
9. **Patience** – Trusting God's timing; waiting without despair
10. **Peace** – Learning to receive peace that surpasses understanding
11. **Prayer** – Deepening conversation with God; confidence in prayer; unanswered prayer
12. **Regret** – Finding forgiveness; freedom from past; missed opportunities; poor choices
13. **Struggling with Faith** – For seasons when belief feels hard; honest faith tools
14. **Teachers** – Grace and encouragement; addressing underappreciation
15. **Uncertainty** – Trusting God with what you cannot predict or control

## Audience

### Primary Demographics
- **Gender:** Primarily Christian women
- **Psychographic:** Spiritually earnest; struggle with real-world emotional/spiritual challenges
- **Mindset:** Want honest, Scripture-rooted resources; not toxic positivity

### Primary Struggles
- Anxiety and fear
- Grief (especially complicated grief)
- ADHD/neurodivergence
- Caregiving burden and burnout
- Chronic pain/illness
- Faith crises (doubt, unanswered prayer)
- Loneliness and isolation

### What They Want
- Scripture-anchored, not fluffy
- Practical tools they can actually use
- Permission to acknowledge hard emotions
- Reminders that God is present in suffering

## Content Strategy

### Current State
- **Articles:** 6 (journaling-focused, prayer, depression, gratitude)
- **Blog posts:** 3 (peace, grace, slowing down)
- **Gap:** Only 9 content pieces for 14 product categories

### Content Goal
Drive organic traffic through targeted blog articles → nurture email subscribers → convert to product sales

### Priority Content Gaps
See `ARTICLE_IDEAS.md` for full content roadmap. Top priorities:
1. Anxiety (high search volume, high commercial intent)
2. Grief (evergreen, seasonal opportunities)
3. Caregiving (underserved niche, specific pain point)
4. Chronic Pain (loyal audience, high trust factor)

### SEO Strategy
- Target long-tail keywords (e.g., "Bible verses for anxiety," "prayer when suffering," "grief at holidays")
- Keyword research via Google Trends, Answer the Public, Search Console
- Each article should naturally lead to relevant product category

## Sales & Distribution Channels

### Etsy (Primary)
- Main revenue driver
- Direct product sales
- Customer base already there; focus on recurring buyers

### Website (simplifytoglorify.com)
- Content hub and SEO driver
- Lead nurture engine (email signups)
- Netlify-hosted, Web3Forms for email, Blob storage for PDF downloads

### Email
- One-time-use download codes for purchased items
- Newsletter nurture (future expansion)
- Web3Forms integration for signup/verification

### Download System
- Netlify Functions + Blobs for secure one-time-use PDF distribution
- Buyers receive unique code; code validates and delivers PDF
- See project-download-system.md in memory for technical details

## Key Metrics to Track

- **Traffic:** Organic search traffic to articles
- **Engagement:** Email signup rate from articles
- **Conversion:** Product purchases from email/article visitors
- **Best performers:** Which articles/categories drive the most sales

## Brand Voice

- Honest and compassionate (not forced positivity)
- Scripture-rooted (not secular psychology)
- Practical (theory must connect to real tools)
- Vulnerable (permission to struggle is powerful)
