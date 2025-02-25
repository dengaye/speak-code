'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import VocabularyView from './components/VocabularyView';
import LoadingSkeleton from './components/LoadingSkeleton';
import { VocabularyPresenter } from './presenters/VocabularyPresenter';
import { termsService } from './services/terms';
import { VocabItem } from './types/vocabulary';
import { ApiError } from './types/error';
import { useDebounce } from './hooks/useDebounce';

export default function Home() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [terms, setTerms] = useState<VocabItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vocabularyPresenter = new VocabularyPresenter();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 初始加载
  useEffect(() => {
    async function loadInitialTerms() {
      try {
        const data = await termsService.getTerms();
        if (data && data.length > 0) {
          setTerms(data);
        } else {
          setTerms(vocabularyPresenter.getDefaultVocabs());
        }
        setError(null);
      } catch (error: unknown) {
        console.error('Failed to load terms:', error);
        setTerms(vocabularyPresenter.getDefaultVocabs());
        const apiError = error as ApiError;
        setError(apiError.message || 'Failed to load terms');
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialTerms();
  }, []);

  // 搜索处理
  useEffect(() => {
    async function handleSearch() {
      if (!debouncedSearchTerm) {
        try {
          const data = await termsService.getTerms();
          setTerms(data);
          setError(null);
        } catch (error: unknown) {
          console.error('Failed to load terms:', error);
          const apiError = error as ApiError;
          setError(apiError.message || 'Failed to load terms');
        }
        return;
      }

      try {
        setIsSearching(true);
        const results = await termsService.searchTerms(debouncedSearchTerm);
        if (results && results.length > 0) {
          setTerms(results);
        } else {
          // 如果搜索结果为空，使用默认数据并在前端过滤
          const defaultData = vocabularyPresenter.getDefaultVocabs();
          const filteredData = vocabularyPresenter.filterVocabulary(
            defaultData,
            debouncedSearchTerm
          );
          setTerms(filteredData);
        }
        setError(null);
      } catch (error: unknown) {
        console.error('Search failed:', error);
        // 搜索失败时使用本地过滤
        const defaultData = vocabularyPresenter.getDefaultVocabs();
        const filteredData = vocabularyPresenter.filterVocabulary(
          defaultData,
          debouncedSearchTerm
        );
        setTerms(filteredData);
        const apiError = error as ApiError;
        setError(apiError.message || 'Search failed');
      } finally {
        setIsSearching(false);
      }
    }

    handleSearch();
  }, [debouncedSearchTerm]);

  if (isInitialLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <Header 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isSearching={isSearching}
          />

          {error && (
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          <VocabularyView 
            vocabs={terms}
            viewMode={viewMode}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  );
}
