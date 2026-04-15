export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'finding-peace-in-uncertainty',
    title: 'Finding Peace in Uncertainty',
    excerpt: 'When the path ahead feels unclear, there is grace in learning to be still.',
    date: 'April 15, 2026',
    readTime: '5 min read',
    category: 'Reflection',
    tags: ['peace', 'trust', 'stillness'],
    image: '/images/blog/peace.jpg',
    content: `
      <p style="margin-bottom: 1.5em;">There is a particular kind of exhaustion that comes from trying to see around corners, from attempting to map out a future that refuses to be mapped. In seasons of uncertainty, we often exhaust ourselves not by the work of living, but by the work of predicting.</p>
      
      <p style="margin-bottom: 1.5em;">The ancient wisdom found in Psalm 46:10 offers an alternative: <em style="color: #4a5568; font-weight: 500;">"Be still, and know that I am God."</em> Not be still because you have all the answers. Not be still because the path is clear. Be still because there is something to know that is more important than knowing what comes next.</p>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">The Practice of Small Faithfulness</h3>
      
      <p style="margin-bottom: 1.5em;">In times of transition, I've learned to anchor myself in small, daily acts of faithfulness. Not grand gestures, but quiet disciplines:</p>
      
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li style="margin-bottom: 0.5em;">Morning pages, written without agenda</li>
        <li style="margin-bottom: 0.5em;">A walk at the same hour, noticing the same trees</li>
        <li style="margin-bottom: 0.5em;">Reading one page of something true</li>
        <li>Lighting a candle before dinner</li>
      </ul>
      
      <p style="margin-bottom: 1.5em;">These small rituals don't solve the uncertainty. They simply remind us that we are still here, still breathing, still capable of attention and care.</p>
      
      <blockquote style="
        border-left: 3px solid #b2c6b1; 
        margin: 2em 0; 
        padding: 1em 2em; 
        background-color: #ffffff; 
        border-radius: 0 8px 8px 0;
        font-style: italic;
        color: #4a5568;
      ">
        "Peace is not the absence of trouble, but the presence of Christ." — Unknown
      </blockquote>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">Journal Prompt</h3>
      
      <p style="margin-bottom: 1.5em;">This week, try this simple practice: Each morning, write three things you know for certain. They can be small. "The coffee is hot." "The dog is sleeping at my feet." "The scripture I read this morning is true."</p>
      
      <p style="margin-bottom: 1.5em;">In doing so, you are training your heart to find anchor points in what is, rather than drowning in what might be.</p>
      
      <p style="margin-bottom: 1.5em;">May you find peace not in certainty, but in the One who is certain.</p>
    `
  },
  {
    id: 2,
    slug: 'the-art-of-slowing-down',
    title: 'The Art of Slowing Down',
    excerpt: 'In a world that rushes, choosing a slower pace is a radical act of faith.',
    date: 'April 10, 2026',
    readTime: '4 min read',
    category: 'Simplicity',
    tags: ['slow living', 'mindfulness', 'rest'],
    image: '/images/blog/slow.jpg',
    content: `
      <p style="margin-bottom: 1.5em;">We live in an age of acceleration. Everything moves faster—our news, our communication, our expectations. And yet, our souls remain stubbornly resistant to speed. They require time to process, to feel, to heal.</p>
      
      <p style="margin-bottom: 1.5em;">Choosing to slow down is not laziness. It is not inefficiency. It is, in many ways, an act of spiritual warfare—a declaration that your worth is not tied to your productivity.</p>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">Signs You Need to Decelerate</h3>
      
      <p style="margin-bottom: 1.5em;">How do you know when you're moving too fast? Your soul will tell you, if you learn to listen:</p>
      
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li style="margin-bottom: 0.5em;">You finish your morning coffee without tasting it</li>
        <li style="margin-bottom: 0.5em;">You scroll through photos of your children instead of watching them play</li>
        <li style="margin-bottom: 0.5em;">You dread the things you once loved</li>
        <li>You hear yourself say "I just need to get through this week" every week</li>
      </ul>
      
      <p style="margin-bottom: 1.5em;">These are not character flaws. They are signals.</p>
      
      <blockquote style="
        border-left: 3px solid #c6b5c8; 
        margin: 2em 0; 
        padding: 1em 2em; 
        background-color: #ffffff; 
        border-radius: 0 8px 8px 0;
        font-style: italic;
        color: #4a5568;
      ">
        "For fast-acting relief, try slowing down." — Lily Tomlin
      </blockquote>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">A Simple Practice</h3>
      
      <p style="margin-bottom: 1.5em;">Choose one thing you do today and do it at half-speed. Not half-attention—half-speed. Wash the dishes slowly. Walk to the mailbox slowly. Read a story to your child slowly, savoring each word.</p>
      
      <p style="margin-bottom: 1.5em;">Notice what rises up in you when you slow down. Impatience? Anxiety? Or perhaps, buried beneath the noise, a quiet sense of peace?</p>
      
      <p style="margin-bottom: 1.5em;">Simplify to glorify. This is the way.</p>
    `
  },
  {
    id: 3,
    slug: 'grace-for-the-weary',
    title: 'Grace for the Weary',
    excerpt: 'There is no shame in being tired. There is only grace, waiting to meet you there.',
    date: 'April 5, 2026',
    readTime: '6 min read',
    category: 'Encouragement',
    tags: ['grace', 'rest', 'weariness'],
    image: '/images/blog/grace.jpg',
    content: `
      <p style="margin-bottom: 1.5em;">I want to speak to the weary ones today. The ones who feel they should have it all together by now. The ones who are tired in a way that sleep doesn't fix.</p>
      
      <p style="margin-bottom: 1.5em;">Weariness is not weakness. It is the natural result of carrying heavy things for a long time. And you have been carrying heavy things.</p>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">The Invitation</h3>
      
      <p style="margin-bottom: 1.5em;">There is an invitation in Matthew 11:28 that never expires: <em style="color: #4a5568; font-weight: 500;">"Come to me, all you who are weary and burdened, and I will give you rest."</em></p>
      
      <p style="margin-bottom: 1.5em;">Notice who is invited: the weary. Not the strong. Not the put-together. Not the ones who have it all figured out. The weary.</p>
      
      <p style="margin-bottom: 1.5em;">And notice what is offered: rest. Not a solution. Not an explanation. Not a timeline. Just rest.</p>
      
      <blockquote style="
        border-left: 3px solid #b2c6b1; 
        margin: 2em 0; 
        padding: 1em 2em; 
        background-color: #ffffff; 
        border-radius: 0 8px 8px 0;
        font-style: italic;
        color: #4a5568;
      ">
        "Sometimes the bravest thing you can do is rest." — Holly Gerth
      </blockquote>
      
      <h3 style="font-size: 1.5rem; color: #4a5568; margin: 2em 0 1em; font-weight: 500;">Permission Granted</h3>
      
      <p style="margin-bottom: 1.5em;">You have permission to rest. You have permission to let some things go undone. You have permission to be a human being rather than a human doing.</p>
      
      <p style="margin-bottom: 1.5em;">Your worth is not measured by your output. It was settled long ago, before you did anything to earn or prove it.</p>
      
      <p style="margin-bottom: 1.5em;">Rest, dear one. Simply rest.</p>
    `
  }
];
