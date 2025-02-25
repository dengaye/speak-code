'use client';

import { useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import VocabularyView from './components/VocabularyView';
import { VocabularyPresenter } from './presenters/VocabularyPresenter';
import { demoVocabs, categories } from './models/vocabularyData';

export default function Home() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const vocabularyPresenter = new VocabularyPresenter();
  const filteredVocabs = vocabularyPresenter.filterVocabulary(
    demoVocabs,
    searchTerm,
    selectedCategory
  );

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
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />

          <VocabularyView 
            vocabs={filteredVocabs} 
            viewMode={viewMode} 
          />
        </div>
      </div>
    </div>
  );
}
