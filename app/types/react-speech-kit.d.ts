declare module 'react-speech-kit' {
  export interface SpeechOptions {
    text: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
  }

  export interface UseSpeechSynthesisResult {
    speak: (options: SpeechOptions) => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
    cancel: () => void;
    pause: () => void;
    resume: () => void;
  }

  export function useSpeechSynthesis(): UseSpeechSynthesisResult;
}
