'use server';

import { Suspense } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import VocabularyView from './components/VocabularyView';
import VocabularySkeleton from './components/VocabularySkeleton';
import { VocabularyPresenter } from './presenters/VocabularyPresenter';
import { termsService } from './services/terms';
import { getCachedTerms } from './services/cache';
import { VocabItem } from './types/vocabulary';
import { ApiError } from './types/error';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 构建时获取数据
export async function generateStaticParams() {
  const terms = await getCachedTerms();
  return {
    fallback: {
      '/': { props: { initialTerms: terms } }
    }
  };
}

async function TermsList({ searchTerm }: { searchTerm: string }) {
  let terms: VocabItem[] = [];

  try {
    if (searchTerm) {
      // 搜索时使用实时数据
      terms = await termsService.searchTerms(searchTerm);
    } else {
      // 非搜索时使用缓存数据
      terms = await getCachedTerms();
    }

    if (!terms?.length && !searchTerm) {
      const vocabularyPresenter = new VocabularyPresenter();
      terms = vocabularyPresenter.getDefaultVocabs();
    }
  } catch (e) {
    const err = e as ApiError;
    console.error('Error fetching terms:', err.message || 'An unexpected error occurred');
    const vocabularyPresenter = new VocabularyPresenter();
    terms = vocabularyPresenter.getDefaultVocabs();
  }

  return (
    <VocabularyView
      vocabs={terms}
      viewMode="list"
    />
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchTerm = typeof params.search === 'string' ? params.search : '';

  // 预加载缓存
  if (!searchTerm) {
    await getCachedTerms();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <Header />
          <SearchFilter defaultSearchTerm={searchTerm} />
          <Suspense fallback={<VocabularySkeleton />}>
            <TermsList searchTerm={searchTerm} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}