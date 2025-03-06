'use client';

import { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface SymbolListProps {
  symbols: string;
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
}

export default function SymbolList({ symbols, speak, speaking, supported }: SymbolListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isExpanded) {
      const contentEl = contentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isExpanded]);
  
  if (!symbols) return null;
  
  const symbolArray = symbols.split('|').map(symbol => symbol.trim()).filter(Boolean);
  
  if (!symbolArray?.length) return null;

  return (
    <div className="mt-3 mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        aria-expanded={isExpanded}
      >
        <span className="mr-1">Values</span>
        {isExpanded ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
      >
        <div ref={contentRef} className="mt-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
          {symbolArray.map((symbol, index) => (
            <div key={`symbol-${index}`} className="flex items-center py-1">
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200 no-select">
                {symbol}
              </code>
              {supported && (
                <button
                  onClick={() => speak(symbol)}
                  disabled={speaking}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-select ml-2"
                  title="Listen to symbol"
                >
                  <SpeakerWaveIcon className="h-3.5 w-3.5 text-blue-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
