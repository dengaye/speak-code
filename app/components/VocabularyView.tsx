import { useSpeechSynthesis } from 'react-speech-kit';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { VocabItem } from '../types/vocabulary';

interface VocabularyViewProps {
  vocabs: VocabItem[];
  viewMode: 'list' | 'grid';
  isSearching?: boolean;
}

export default function VocabularyView({ vocabs, viewMode, isSearching }: VocabularyViewProps) {
  const { speak, speaking, supported } = useSpeechSynthesis();

  const handleSpeak = (text: string) => {
    if (supported) {
      speak({ text });
    }
  };

  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {vocabs.map(vocab => (
        <div
          key={vocab.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all ${
            isSearching ? 'opacity-50' : ''
          }`}
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
                    disabled={speaking || isSearching}
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
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-600 dark:text-gray-300 flex-1 no-select">
                {vocab.definition}
              </p>
              {supported && (
                <button
                  onClick={() => handleSpeak(vocab.definition)}
                  disabled={speaking || isSearching}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2 flex-shrink-0 no-select"
                  title="Listen to definition"
                >
                  <SpeakerWaveIcon className="h-4 w-4 text-blue-500" />
                </button>
              )}
            </div>
          )}
          
          {vocab.category && (
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full no-select">
              {vocab.category}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
