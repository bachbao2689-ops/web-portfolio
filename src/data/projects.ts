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
};

// Demo content carried over from the original starter. Replace with real case studies.
export const projects: Project[] = [
  {
    slug: 'deserted-outpost', name: 'Deserted Outpost', title: ['Deserted', 'Outpost.'],
    category: 'Environment · Art direction', year: '2026', variant: 0, accent: '#d76938',
    line: 'A place left behind. A story still unfolding.',
    question: 'What remains when everyone has gone?',
    idea: 'An exploration of absence, scale and silence. Architecture frames the journey; a single warm light gives the eye somewhere to land.',
    statement: 'Make silence\nsay something.',
    notes: ['An open horizon. A single point of interest. Start with the feeling of arriving somewhere unfamiliar.', 'Warm earth against deep shadow. Contrast becomes a quiet guide through the composition.', 'Every shape earns its place. The final frame brings space, light and narrative into one image.'],
  },
  {
    slug: 'forgotten-ruins', name: 'Forgotten Ruins', title: ['Forgotten', 'Ruins.'],
    category: 'Visual development · Worldbuilding', year: '2026', variant: 1, accent: '#8a9b99',
    line: 'Time leaves a texture. We give it a voice.',
    question: 'Can a place remember its people?',
    idea: 'A study of memory through repeated forms, weathered surfaces and monumental scale. The world feels familiar, even when its story is unknown.',
    statement: 'Let time\nleave a mark.',
    notes: ['Repeated structures establish rhythm, interrupted by one missing piece.', 'Cool stone and soft light create distance. Small warm accents suggest a human trace.', 'Layering scale and atmosphere turns a structure into a place with a past.'],
  },
  {
    slug: 'cyber-slums', name: 'Cyber Slums', title: ['Cyber', 'Slums.'],
    category: 'Concept direction · Spatial storytelling', year: '2026', variant: 2, accent: '#ef7769',
    line: 'Human stories. Electric surroundings.',
    question: 'Where does life find a way in?',
    idea: 'Density, interruption and improvised order. A visual world where small human moments exist inside a much larger, restless system.',
    statement: 'Find the human\nin the noise.',
    notes: ['Build a dense grid, then break it. Irregular rhythms give the composition life.', 'Coral signals cut through dark blue. Light gives a complex environment its hierarchy.', 'Small, deliberate details make a crowded frame feel inhabited.'],
  },
  {
    slug: 'neon-city', name: 'Neon City', title: ['Neon', 'City.'],
    category: 'Color direction · Image making', year: '2026', variant: 3, accent: '#a08bce',
    line: 'After dark, another city begins.',
    question: 'What color is the night?',
    idea: 'A study of movement, reflection and artificial light. The city is reduced to a few clear gestures so color can carry the emotion.',
    statement: 'Give the night\nits own voice.',
    notes: ['Strong verticals and a low horizon establish a cinematic sense of scale.', 'Violet, black and a controlled highlight define a world after sunset.', 'Repetition and reflections give static geometry a sense of movement.'],
  },
  {
    slug: 'forest-temple', name: 'Forest Temple', title: ['Forest', 'Temple.'],
    category: 'Art direction · Atmosphere', year: '2026', variant: 4, accent: '#799573',
    line: 'Between the built world and the wild.',
    question: 'When does nature become architecture?',
    idea: 'An exploration of balance between organic rhythm and constructed form. Soft edges, filtered light and a slower pace invite a closer look.',
    statement: 'Make room\nfor wonder.',
    notes: ['A central opening creates a moment of stillness within repeated natural forms.', 'Moss green meets soft mineral tones. Light is diffused, calm and directional.', 'A measured balance of symmetry and variation gives the final frame its atmosphere.'],
  },
];

export const chapters = [
  { id: 'overview', label: 'Overview', hint: 'Every story starts somewhere.' },
  { id: 'idea', label: 'The idea', hint: 'First, find the right question.' },
  { id: 'direction', label: 'Art direction', hint: 'Scroll. Watch the idea take shape.' },
  { id: 'process', label: 'The process', hint: 'A little intention in every decision.' },
  { id: 'outcome', label: 'The outcome', hint: 'One world. One clear feeling.' },
  { id: 'next-project', label: 'Up next', hint: 'There is another story waiting.' },
];
