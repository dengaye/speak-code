'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

interface UseSpeechResult {
  speak: (text: string) => void;
  speaking: boolean;
  cancel: () => void;
  voices: SpeechSynthesisVoice[];
}

export function useSpeech(options: UseSpeechOptions = {}): UseSpeechResult {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speakingRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance();
    
    if (options.rate) utteranceRef.current.rate = options.rate;
    if (options.pitch) utteranceRef.current.pitch = options.pitch;
    if (options.volume) utteranceRef.current.volume = options.volume;
    if (options.voice) utteranceRef.current.voice = options.voice;
    
    utteranceRef.current.onstart = () => {
      speakingRef.current = true;
      setSpeaking(true);
    };
    
    utteranceRef.current.onend = () => {
      speakingRef.current = false;
      setSpeaking(false);
    };
    
    utteranceRef.current.onerror = () => {
      speakingRef.current = false;
      setSpeaking(false);
    };
    return () => {
      window.speechSynthesis?.cancel?.();
    };
  }, [options.rate, options.pitch, options.volume, options.voice]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    updateVoices();

    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!utteranceRef.current) return;
    window.speechSynthesis.cancel();
    
    utteranceRef.current.text = text;
    window.speechSynthesis.speak(utteranceRef.current);
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel?.();
    speakingRef.current = false;
    setSpeaking(false);
  }, []);

  return {
    speak,
    speaking,
    cancel,
    voices,
  };
}
