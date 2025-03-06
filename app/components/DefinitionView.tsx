'use client';

import { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface DefinitionViewProps {
  definition: string;
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
}

export default function DefinitionView({ definition, speak, speaking, supported }: DefinitionViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0); 
  const [isInitialized, setIsInitialized] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const fullContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkTruncation = () => {
      const element = contentRef.current;
      if (element) {
        const needsTruncation = element.scrollHeight > 48;
        setIsTruncated(needsTruncation);
        
        if (!isInitialized) {
          setHeight(needsTruncation ? 48 : element.scrollHeight);
          setIsInitialized(true);
        }
      }
    };
    
    const timer = setTimeout(() => {
      checkTruncation();
    }, 10);
    
    window.addEventListener('resize', checkTruncation);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [definition, isInitialized]);
  
  useEffect(() => {
    if (!isInitialized) return;
    
    if (isExpanded) {
      const contentEl = fullContentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(isTruncated ? 48 : undefined);
    }
  }, [isExpanded, isTruncated, isInitialized]);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <div 
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ height: height === undefined ? 'auto' : `${height}px` }}
        >
          <div ref={fullContentRef}>
            <p 
              ref={contentRef} 
              className={`text-gray-600 dark:text-gray-300 no-select ${!isExpanded && isTruncated && isInitialized ? 'line-clamp-2' : ''}`}
            >
              {definition}
            </p>
          </div>
        </div>
        
        {isTruncated && (
          <button 
            onClick={toggleExpand}
            className="mt-1 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors py-1 px-2 -ml-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      
      {supported && (
        <button
          onClick={() => speak(definition)}
          disabled={speaking}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-select ml-2 flex-shrink-0"
          title="Listen to definition"
        >
          <SpeakerWaveIcon className="h-4 w-4 text-blue-500" />
        </button>
      )}
    </div>
  );
}
