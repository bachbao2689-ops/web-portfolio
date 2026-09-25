export type Project = {
  slug: string;
  name: string;
  title: [string, string];
  category: string;
  year: string;
  variant: number;
  accent: string;
  line: string;
  question: string;
  idea: string;
  statement: string;
  notes: [string, string, string];
  images: string[];
};

export const projects: Project[] = [
  {
    slug: 'maggi', name: 'Maggi', title: ['Maggi', 'Campaign.'],
    category: 'Advertising · Visual Direction', year: '2026', variant: 0, accent: '#d76938',
    line: 'A flavorful journey.',
    question: 'How to bring out the best taste?',
    idea: 'Showcasing the essence of Maggi through vibrant visuals and relatable social moments. Bringing families together around the dining table.',
    statement: 'Taste the\ndifference.',
    notes: ['Main Key Visual highlighting the product.', 'Social media adaptations and engagement.', 'Vouchers and promotional materials.'],
    images: ['/projects/Maggi/Documentation.png', '/projects/Maggi/MAIN KV.png', '/projects/Maggi/Social media.png']
  },
  {
    slug: 'milo', name: 'Milo', title: ['Milo', 'Energy.'],
    category: 'Brand Campaign · Social', year: '2026', variant: 1, accent: '#799573',
    line: 'Fuel for the champions.',
    question: 'What drives the youth today?',
    idea: 'An energetic and dynamic visual language that speaks directly to the active lifestyle of teens and young adults.',
    statement: 'Unleash your\npotential.',
    notes: ['High-impact social media assets.', 'Print materials (In ấn) for offline presence.', 'Consistent brand documentation.'],
    images: ['/projects/Milo/Documentation.png', '/projects/Milo/Social.png', '/projects/Milo/In ấn.png']
  },
  {
    slug: 'cosmetic', name: 'Cosmetic', title: ['Beauty', 'Care.'],
    category: 'Product · Lifestyle', year: '2026', variant: 2, accent: '#ef7769',
    line: 'Elegance in every drop.',
    question: 'How to capture true beauty?',
    idea: 'A clean, sophisticated art direction focusing on the product textures, steps of usage, and the overall lifestyle it brings to the user.',
    statement: 'Glow from\nwithin.',
    notes: ['Step-by-step usage guide.', 'Stop motion animation planning.', 'Lifestyle integration and documentation.'],
    images: ['/projects/Cosmetic/Documentation.png', '/projects/Cosmetic/life style.png', '/projects/Cosmetic/Step.png']
  },
  {
    slug: 'gerber-ptit', name: 'Gerber Ptit', title: ['Gerber', 'Ptit.'],
    category: 'Packaging · Social', year: '2026', variant: 3, accent: '#8a9b99',
    line: 'Nutrition for the little ones.',
    question: 'What do parents look for?',
    idea: 'Trustworthy, warm, and playful design that highlights nutritional value while remaining approachable to modern parents.',
    statement: 'Care in every\nbite.',
    notes: ['Packaging design updates.', 'Social media content strategy.', 'Comprehensive project documentation.'],
    images: ['/projects/Doc img/Documentation.png', '/projects/Doc img/Packaging.png', '/projects/Doc img/Social media.png']
  },
  {
    slug: 'ecommerce', name: 'E-commerce', title: ['Ecom', 'Platform.'],
    category: 'UI/UX · Web Design', year: '2026', variant: 4, accent: '#a08bce',
    line: 'Seamless shopping experience.',
    question: 'How to simplify the journey?',
    idea: 'A series of interface designs focusing on clarity, ease of use, and a modern aesthetic to boost conversion rates and user satisfaction.',
    statement: 'Shop with\nease.',
    notes: ['User interface components.', 'Product listing and details.', 'Checkout flow optimization.'],
    images: ['/projects/Ecom/Documentation.png', '/projects/Ecom/1.png', '/projects/Ecom/2.png', '/projects/Ecom/3.png']
  },
  {
    slug: 'ganh-hoi', name: 'Gánh Hội', title: ['Gánh', 'Hội.'],
    category: 'Event · Branding', year: '2026', variant: 0, accent: '#d76938',
    line: 'Cultural heritage meets modern event.',
    question: 'How to preserve tradition?',
    idea: 'Branding for a cultural event that bridges the gap between traditional values and contemporary aesthetics.',
    statement: 'Celebrate our\nroots.',
    notes: ['Event proposal and planning.', 'Visual identity and branding.', 'Official documentation.'],
    images: [] // Only PDF is available
  }
];

export const chapters = [
  { id: 'overview', label: 'Overview', hint: 'Every story starts somewhere.' },
  { id: 'idea', label: 'The idea', hint: 'First, find the right question.' },
  { id: 'direction', label: 'Art direction', hint: 'Scroll. Watch the idea take shape.' },
  { id: 'process', label: 'The process', hint: 'A little intention in every decision.' },
  { id: 'outcome', label: 'The outcome', hint: 'One world. One clear feeling.' },
  { id: 'next-project', label: 'Up next', hint: 'There is another story waiting.' },
];
