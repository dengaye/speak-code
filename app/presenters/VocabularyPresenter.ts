import { VocabItem } from '../types/vocabulary';

export class VocabularyPresenter {
  filterVocabulary(
    vocabs: VocabItem[],
    searchTerm: string,
    selectedCategory: string
  ): VocabItem[] {
    return vocabs.filter(vocab => {
      const matchesSearch = vocab.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || vocab.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
