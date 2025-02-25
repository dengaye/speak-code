import { VocabItem } from '../types/vocabulary';

export class VocabularyPresenter {
  private defaultVocabs: VocabItem[] = [
    {
      id: '1',
      term: 'React',
      definition: 'A JavaScript library for building user interfaces',
      category: 'Framework'
    },
    {
      id: '2',
      term: 'Component',
      definition: 'Independent and reusable bits of code that serve as UI building blocks',
      category: 'Concept'
    },
    {
      id: '3',
      term: 'Props',
      definition: 'Arguments passed into React components',
      category: 'Concept'
    }
  ];

  getDefaultVocabs(): VocabItem[] {
    return this.defaultVocabs;
  }

  filterVocabulary(
    vocabs: VocabItem[],
    searchTerm: string
  ): VocabItem[] {
    return vocabs.filter(vocab => {
      const term = vocab.term?.toLowerCase() || '';
      const definition = vocab.definition?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();

      return term.includes(searchLower) || definition.includes(searchLower);
    });
  }
}
