import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, Star, Sparkles, HelpCircle } from 'lucide-react';
import { PhonicItem, Question, RoundStats } from '../types';
import { CORE_PHONICS, ENCOURAGING_PRAISES, TRY_AGAIN_PHRASES } from '../data/phonicsData';
import { CelebrationModal } from './CelebrationModal';
import { RoundSummary } from './RoundSummary';
import {
  playChimeSuccess,
  playGentleBoing,
  playPop,
  playStarEarned,
  speakText,
  speakPhoneme,
} from '../utils/audio';

interface ListenGameProps {
  onCompleteRound: (stats: RoundStats) => void;
  onNavigate: (screen: 'home' | 'game' | 'practice' | 'parent') => void;
  onOpenParentGate: () => void;
  soundEnabled: boolean;
  roundNumber: number;
}

export const ListenGame: React.FC<ListenGameProps> = ({
  onCompleteRound,
  onNavigate,
  onOpenParentGate,
  soundEnabled,
  roundNumber,
}) => {
  const TOTAL_QUESTIONS = 6;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [roundFinished, setRoundFinished] = useState(false);
  const [activeCelebration, setActiveCelebration] = useState<{
    item: PhonicItem;
    praise: string;
  } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wobblingId, setWobblingId] = useState<string | null>(null);
  const [roundResults, setRoundResults] = useState<
    {
      phonemeId: string;
      letter: string;
      attempts: number;
      successOnFirstTry: boolean;
    }[]
  >([]);

  // Sound play debounce tracker
  const soundTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate 6 randomized questions
  const initializeRound = useCallback(() => {
    // Shuffle the core phonics to ensure all 6 core sounds (/s/, /a/, /t/, /p/, /i/, /n/) appear
    const shuffledCore = [...CORE_PHONICS].sort(() => Math.random() - 0.5);
    const newQuestions: Question[] = [];

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const target = shuffledCore[i % shuffledCore.length];
      const otherOptions = CORE_PHONICS.filter((p) => p.id !== target.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      const options = [target, ...otherOptions].sort(() => Math.random() - 0.5);

      newQuestions.push({
        id: `q-${i}-${target.id}`,
        targetItem: target,
        options,
        userAttempts: [],
        isAnswered: false,
      });
    }

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setStarsEarned(0);
    setRoundFinished(false);
    setActiveCelebration(null);
    setRoundResults([]);
  }, []);

  useEffect(() => {
    initializeRound();
  }, [initializeRound]);

  const currentQuestion = questions[currentIndex];

  // Play target phoneme sound
  const playTargetSound = useCallback(
    (item?: PhonicItem) => {
      const target = item || currentQuestion?.targetItem;
      if (!target) return;

      setIsSpeaking(true);
      if (soundEnabled) {
        speakPhoneme(target, {
          onEnd: () => setIsSpeaking(false),
        });
      } else {
        setTimeout(() => setIsSpeaking(false), 800);
      }
    },
    [currentQuestion, soundEnabled]
  );

  // Play sound automatically when moving to a new question
  useEffect(() => {
    if (currentQuestion && !roundFinished && !activeCelebration) {
      if (soundTimerRef.current) clearTimeout(soundTimerRef.current);
      soundTimerRef.current = setTimeout(() => {
        playTargetSound(currentQuestion.targetItem);
      }, 350);
    }
    return () => {
      if (soundTimerRef.current) clearTimeout(soundTimerRef.current);
    };
  }, [currentIndex, currentQuestion, roundFinished, activeCelebration, playTargetSound]);

  // Handle letter button tap
  const handleLetterTap = (option: PhonicItem) => {
    if (!currentQuestion || currentQuestion.isAnswered || activeCelebration) return;

    playPop();

    const isCorrect = option.id === currentQuestion.targetItem.id;
    const isFirstAttempt = currentQuestion.userAttempts.length === 0;

    // Record attempt
    const updatedQuestion = {
      ...currentQuestion,
      userAttempts: [...currentQuestion.userAttempts, option.id],
    };

    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIndex ? updatedQuestion : q))
    );

    if (isCorrect) {
      // Correct answer!
      updatedQuestion.isAnswered = true;

      // Track stats
      setRoundResults((prev) => [
        ...prev,
        {
          phonemeId: option.id,
          letter: option.letter,
          attempts: updatedQuestion.userAttempts.length,
          successOnFirstTry: isFirstAttempt,
        },
      ]);

      if (soundEnabled) {
        playChimeSuccess();
        playStarEarned();
      }

      setStarsEarned((prev) => prev + 1);

      // Random praise from child-friendly pool
      const randomPraise =
        ENCOURAGING_PRAISES[Math.floor(Math.random() * ENCOURAGING_PRAISES.length)];

      if (soundEnabled) {
        speakText(`${randomPraise}! ${option.capital} is for ${option.word}!`, {
          rate: 0.92,
        });
      }

      setActiveCelebration({
        item: option,
        praise: randomPraise,
      });
    } else {
      // Incorrect answer: friendly encouragement, no negative score!
      setWobblingId(option.id);
      setTimeout(() => setWobblingId(null), 600);

      if (soundEnabled) {
        playGentleBoing();
      }

      const tryAgainPhrase =
        TRY_AGAIN_PHRASES[Math.floor(Math.random() * TRY_AGAIN_PHRASES.length)];

      if (soundEnabled) {
        speakText(tryAgainPhrase, {
          rate: 0.9,
          onEnd: () => {
            // Replay the target sound so child can try again!
            setTimeout(() => {
              playTargetSound(currentQuestion.targetItem);
            }, 300);
          },
        });
      }
    }
  };

  // Next Question or Complete Round
  const handleNextQuestion = () => {
    setActiveCelebration(null);

    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Round Complete!
      const finalStats: RoundStats = {
        roundNumber,
        totalQuestions: TOTAL_QUESTIONS,
        completedAt: new Date().toISOString(),
        starsEarned: starsEarned + 1, // include final star
        results: roundResults,
      };

      onCompleteRound(finalStats);
      setRoundFinished(true);
    }
  };

  if (roundFinished) {
    return (
      <RoundSummary
        totalQuestions={TOTAL_QUESTIONS}
        starsEarned={starsEarned}
        onPlayAgain={initializeRound}
        onNavigate={onNavigate}
        onOpenParentGate={onOpenParentGate}
        soundEnabled={soundEnabled}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500 font-bold">
        Loading fun sounds...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* Top Round Progress Bar: 6 Star Sockets */}
      <div className="w-full bg-white/90 backdrop-blur-md border-3 border-amber-200 rounded-3xl p-3 sm:p-4 shadow-md mb-6 sm:mb-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-amber-900 uppercase tracking-wider font-['Fredoka']">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS}
          </span>
        </div>

        {/* 6 Star Sockets */}
        <div className="flex items-center gap-1 sm:gap-2">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => {
            const isFilled = i < starsEarned;
            const isCurrent = i === currentIndex;
            return (
              <div
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                  isFilled
                    ? 'bg-amber-400 border-2 border-amber-500 shadow-xs scale-105'
                    : isCurrent
                    ? 'bg-amber-100 border-2 border-dashed border-amber-400 animate-pulse'
                    : 'bg-slate-100 border-2 border-slate-200'
                }`}
                title={`Question ${i + 1}`}
              >
                <Star
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isFilled
                      ? 'text-white fill-white'
                      : isCurrent
                      ? 'text-amber-400 fill-amber-300/40'
                      : 'text-slate-300'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Gameplay Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 flex flex-col items-center relative overflow-hidden">
        {/* Playful background bubbles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-100 rounded-full blur-xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-100 rounded-full blur-xl opacity-60 pointer-events-none" />

        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-amber-900 font-black text-sm sm:text-base font-['Fredoka'] mb-2">
            Listen and Find
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 font-['Fredoka'] tracking-wide">
            Which letter makes this sound?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-bold mt-1">
            Tap the big speaker to listen, then tap the matching letter!
          </p>
        </div>

        {/* Big Interactive Speaker Button */}
        <button
          id="listen-repeat-speaker-btn"
          onClick={() => {
            playPop();
            playTargetSound();
          }}
          className={`group relative flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-amber-400 transition-all cursor-pointer shadow-lg active:scale-95 ${
            isSpeaking
              ? 'bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 ring-8 ring-amber-200/80 scale-105'
              : 'bg-gradient-to-br from-amber-100 via-white to-amber-200 hover:from-amber-200 hover:to-amber-300'
          }`}
          aria-label="Listen to the sound again"
        >
          {/* Animated sound ripples */}
          {isSpeaking && (
            <div className="absolute inset-0 rounded-full border-4 border-amber-400 animate-ping opacity-75" />
          )}

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Volume2 className={`w-9 h-9 sm:w-11 sm:h-11 ${isSpeaking ? 'animate-bounce' : ''}`} />
          </div>

          <span className="mt-2 text-xs sm:text-sm font-black text-amber-900 font-['Fredoka'] uppercase tracking-wider">
            {isSpeaking ? 'Listening...' : 'Tap to Listen 🔊'}
          </span>
        </button>

        {/* Phoneme guide badge */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-800/80 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Sound: <strong>{currentQuestion.targetItem.phoneme}</strong></span>
        </div>

        {/* 3 Large Letter Buttons */}
        <div className="w-full mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6">
          {currentQuestion.options.map((option, idx) => {
            const hasAttempted = currentQuestion.userAttempts.includes(option.id);
            const isWobbling = wobblingId === option.id;

            // Palette per column for clear distinction
            const colorThemes = [
              {
                bg: 'bg-rose-100 hover:bg-rose-200 border-rose-400 text-rose-800 shadow-rose-200/70',
                activeRing: 'focus:ring-rose-400',
              },
              {
                bg: 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-800 shadow-amber-200/70',
                activeRing: 'focus:ring-amber-400',
              },
              {
                bg: 'bg-sky-100 hover:bg-sky-200 border-sky-400 text-sky-800 shadow-sky-200/70',
                activeRing: 'focus:ring-sky-400',
              },
            ];
            const theme = colorThemes[idx % colorThemes.length];

            return (
              <button
                key={option.id}
                id={`letter-btn-${option.letter}`}
                onClick={() => handleLetterTap(option)}
                disabled={currentQuestion.isAnswered}
                className={`relative py-6 sm:py-10 px-2 sm:px-6 rounded-3xl border-4 sm:border-5 transition-all cursor-pointer shadow-lg active:scale-90 flex flex-col items-center justify-center select-none ${
                  theme.bg
                } ${isWobbling ? 'animate-bounce border-rose-500 bg-rose-200' : ''} ${
                  hasAttempted && option.id !== currentQuestion.targetItem.id
                    ? 'opacity-40 grayscale-30 cursor-not-allowed scale-95'
                    : 'hover:-translate-y-1 hover:shadow-xl'
                }`}
                aria-label={`Letter ${option.letter}`}
              >
                {/* Uppercase helper badge */}
                <span className="absolute top-2.5 right-3 text-xs sm:text-sm font-bold opacity-60">
                  {option.capital}
                </span>

                {/* Main Large Lowercase Letter */}
                <span className="text-6xl sm:text-8xl font-black font-['Fredoka'] leading-none drop-shadow-xs">
                  {option.letter}
                </span>

                {/* Friendly label */}
                <span className="text-xs sm:text-sm font-bold mt-2 opacity-80">
                  letter {option.capital}
                </span>
              </button>
            );
          })}
        </div>

        {/* Child-Friendly Hint Footer */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium text-center mt-6">
          🌟 You can listen as many times as you like! No time limits.
        </p>
      </div>

      {/* Correct Answer Celebration & Picture Word Modal */}
      {activeCelebration && (
        <CelebrationModal
          item={activeCelebration.item}
          praise={activeCelebration.praise}
          onNext={handleNextQuestion}
          isLastQuestion={currentIndex + 1 >= TOTAL_QUESTIONS}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
};
