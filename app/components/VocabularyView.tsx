'use client';

import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { VocabItem } from '../types/vocabulary';
import { useSpeech } from '../hooks/useSpeech';
import EmptyState from './EmptyState';
import CategoryTags from './CategoryTags';
import SymbolList from './SymbolList';
import DefinitionView from './DefinitionView';

interface VocabularyViewProps {
  vocabs: VocabItem[];
  viewMode: 'list' | 'grid';
}

export default function VocabularyView({ vocabs, viewMode }: VocabularyViewProps) {
  const { speak, speaking, supported } = useSpeech();

  const handleSpeak = (text: string) => {
    if (supported) {
      speak(text);
    }
  };

  if (!vocabs?.length) {
    return (
      <EmptyState
        title="No terms found"
        description="Try adjusting your search to find what you're looking for."
      />
    );
  }

  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {vocabs.map(vocab => (
        <div
          key={vocab.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
        >
          {vocab.term && (
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white no-select">
                  {vocab.term}
                </h3>
                {supported && (
                  <button
                    onClick={() => handleSpeak(vocab.term)}
                    disabled={speaking}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-select"
                    title="Listen to term"
                  >
                    <SpeakerWaveIcon className="h-4 w-4 text-blue-500" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {vocab.definition && (
            <DefinitionView
              definition={vocab.definition}
              speak={handleSpeak}
              speaking={speaking}
              supported={supported}
            />
          )}
          
          {vocab.symbol && (
            <SymbolList 
              symbols={vocab.symbol} 
              speak={handleSpeak} 
              speaking={speaking} 
              supported={supported} 
            />
          )}
          
          {vocab.category && <CategoryTags categories={vocab.category} />}
        </div>
      ))}
    </div>
  );
}
