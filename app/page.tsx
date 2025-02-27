'use server';

import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import VocabularyView from './components/VocabularyView';
import { VocabularyPresenter } from './presenters/VocabularyPresenter';
import { termsService } from './services/terms';
import { VocabItem } from './types/vocabulary';
import { ApiError } from './types/error';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchTerm = typeof params.search === 'string' ? params.search : '';
  let terms: VocabItem[] = [];
  let error: string | null = null;
  
  try {
    if (searchTerm) {
      terms = await termsService.searchTerms(searchTerm);
    } else {
      terms = await termsService.getTerms();
    }
    
    if (!terms || terms.length === 0) {
      const vocabularyPresenter = new VocabularyPresenter();
      terms = vocabularyPresenter.getDefaultVocabs();
      if (searchTerm) {
        terms = vocabularyPresenter.filterVocabulary(terms, searchTerm);
      }
    }
  } catch (e: unknown) {
    console.error('Failed to load terms:', e);
    const vocabularyPresenter = new VocabularyPresenter();
    terms = vocabularyPresenter.getDefaultVocabs();
    if (searchTerm) {
      terms = vocabularyPresenter.filterVocabulary(terms, searchTerm);
    }
    const apiError = e as ApiError;
    error = apiError.message || 'Failed to load terms';
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <Header />
          <SearchFilter defaultSearchTerm={searchTerm} />

          {error && (
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          <VocabularyView 
            vocabs={terms}
            viewMode="list"
          />
        </div>
      </div>
    </div>
  );
}