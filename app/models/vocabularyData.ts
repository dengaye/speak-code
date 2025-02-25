import { VocabItem } from '../types/vocabulary';

export const demoVocabs: VocabItem[] = [
  {
    id: '1',
    term: 'React',
    definition: 'A JavaScript library for building user interfaces',
    category: 'Framework'
  },
  {
    id: '2',
    term: 'useState',
    definition: 'A React Hook that lets you add state to functional components',
    category: 'Hook'
  },
  {
    id: '3',
    term: 'TypeScript',
    definition: 'A strongly typed programming language that builds on JavaScript',
    category: 'Language'
  }
];

export const categories = ['All', 'Framework', 'Hook', 'Language'];
