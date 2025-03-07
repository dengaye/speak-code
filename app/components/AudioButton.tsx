'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface AudioButtonProps {
  text: string;
  speak: (text: string) => void;
  speaking: boolean;
  size?: 'small' | 'medium';
  title?: string;
  className?: string;
}

function AudioButton({
  text,
  speak,
  speaking,
  size = 'medium',
  title = 'Listen',
  className = '',
}: AudioButtonProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const handleClick = useCallback(() => {
    speak(text);
  }, [speak, text]);

  if (!supported) return null;

  return (
    <button
      onClick={handleClick}
      disabled={speaking}
      className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-select ${className}`}
      title={title}
    >
      <SpeakerWaveIcon
        className={`${
          size === 'small' ? 'h-3.5 w-3.5' : 'h-4 w-4'
        } text-blue-500`}
      />
    </button>
  );
}

export default memo(AudioButton)
