export interface PhonicItem {
  id: string;
  letter: string;
  capital: string;
  phoneme: string;          // e.g. "/s/"
  soundDisplay: string;      // e.g. "sss"
  spokenPhoneme: string;     // Text for speech engine: e.g. "sss"
  word: string;              // e.g. "sun"
  wordDisplay: string;       // e.g. "Sun"
  exampleSentence: string;   // e.g. "S is for Sun that shines bright!"
  color: {
    bg: string;
    border: string;
    text: string;
    cardBg: string;
    lightBg: string;
    shadow: string;
  };
  illustrationType: 'sun' | 'apple' | 'tap' | 'pen' | 'insect' | 'net' | 'tiger' | 'moon';
  mouthTip: string;          // Tip for parents: e.g. "Hiss like a friendly snake"
}

export type AppScreen = 'home' | 'game' | 'practice' | 'parent';

export interface Question {
  id: string;
  targetItem: PhonicItem;
  options: PhonicItem[];
  userAttempts: string[];    // IDs of letters tapped
  isAnswered: boolean;
}

export interface RoundStats {
  roundNumber: number;
  totalQuestions: number;
  completedAt: string;
  starsEarned: number;
  results: {
    phonemeId: string;
    letter: string;
    attempts: number;
    successOnFirstTry: boolean;
  }[];
}

export interface PhonemeMastery {
  phonemeId: string;
  letter: string;
  totalAsked: number;
  firstTryCorrect: number;
  totalCorrect: number;
  lastPracticed?: string;
}

export interface ParentProgressData {
  totalRoundsPlayed: number;
  totalStarsEarned: number;
  history: RoundStats[];
  mastery: Record<string, PhonemeMastery>;
  preferredVoiceURI?: string;
  speechRate: number; // 0.8 to 1.0
  soundEffectsEnabled: boolean;
  speechVoiceEnabled: boolean;
}
