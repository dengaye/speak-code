'use client';

import  { useCallback } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import { VocabItem } from '../types/vocabulary';
import AudioButton from './AudioButton';
import CategoryTags from './CategoryTags';
import SymbolList from './SymbolList';
import DefinitionView from './DefinitionView';
import EmptyState from './EmptyState';

interface VocabularyViewProps {
  vocabs: VocabItem[];
  viewMode: 'list' | 'grid';
}

export default function VocabularyView({ vocabs, viewMode }: VocabularyViewProps) {
  const { speak, speaking } = useSpeech();

  const handleSpeak = useCallback((text: string) => {
    speak(text);
  }, [speak]);

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
                <AudioButton
                  text={vocab.term}
                  speak={handleSpeak}
                  speaking={speaking}
                  title="Listen to term"
                />
              </div>
            </div>
          )}
          
          {vocab.definition && (
            <DefinitionView
              definition={vocab.definition}
              speak={handleSpeak}
              speaking={speaking}
            />
          )}
          
          {vocab.symbol && (
            <SymbolList 
              symbols={vocab.symbol} 
              speak={handleSpeak} 
              speaking={speaking} 
            />
          )}
          
          {vocab.category && <CategoryTags categories={vocab.category} />}
        </div>
      ))}
    </div>
  );
}
