import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Volume2, Star } from 'lucide-react';
import { PhonicItem } from '../types';
import { PhonicsIllustration } from './illustrations/PhonicsIllustrations';
import { playPop, speakText } from '../utils/audio';

interface CelebrationModalProps {
  item: PhonicItem;
  praise: string;
  onNext: () => void;
  isLastQuestion: boolean;
  soundEnabled: boolean;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  item,
  praise,
  onNext,
  isLastQuestion,
  soundEnabled,
}) => {
  const [countdown, setCountdown] = useState(4);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#38BDF8', '#A855F7'],
      });
    } catch {
      // safe fallback if canvas is restricted
    }
  }, []);

  // Pronounce word and phrase
  const handleHearWord = () => {
    playPop();
    if (soundEnabled) {
      speakText(`${item.word}. ${item.capital} is for ${item.word}!`, {
        rate: 0.9,
      });
    }
  };

  // Optional gentle auto-advance timer so children don't get stuck
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNext]);

  return (
    <div
      id="celebration-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="celebration-card"
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200"
      >
        {/* Decorative Top Sunburst Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-amber-200 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Cheerful Stars Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-bounce" />
          <span className="text-2xl sm:text-3xl font-black text-amber-500 font-['Fredoka'] tracking-wide">
            {praise}
          </span>
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-bounce delay-100" />
        </div>

        {/* Target Sound Highlight */}
        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full text-amber-900 font-black text-sm sm:text-base mb-4">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Letter sound: <strong className="text-amber-800 text-lg font-black">{item.phoneme}</strong></span>
        </div>

        {/* Picture Word Card */}
        <div className="bg-gradient-to-b from-slate-50 to-amber-50/50 border-3 border-amber-200 rounded-3xl p-4 sm:p-6 mb-5 flex flex-col items-center shadow-inner">
          {/* SVG Illustration */}
          <div className="my-2 transform hover:scale-105 transition-transform">
            <PhonicsIllustration type={item.illustrationType} size={150} />
          </div>

          {/* Big Spelled Word with Highlighted Initial Letter */}
          <div className="mt-2 text-4xl sm:text-5xl font-black font-['Fredoka'] tracking-wide">
            <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">
              {item.word.charAt(0).toUpperCase()}
            </span>
            <span className="text-slate-800">
              {item.word.slice(1)}
            </span>
          </div>

          {/* Friendly phrase e.g. "S is for Sun! ☀️" */}
          <p className="text-base sm:text-lg font-bold text-slate-600 mt-2 font-['Fredoka']">
            {item.exampleSentence}
          </p>

          {/* Hear Word Sound Button */}
          <button
            id="celebration-hear-word-btn"
            onClick={handleHearWord}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-200/70 hover:bg-amber-300 text-amber-900 font-bold rounded-full text-sm transition-all active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-800" />
            <span>Hear word again</span>
          </button>
        </div>

        {/* Next Button with Timer countdown */}
        <button
          id="celebration-next-btn"
          onClick={() => {
            playPop();
            onNext();
          }}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-xl rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <span>{isLastQuestion ? 'Finish Task & Blow Crackers! 🎆' : 'Next Sound'}</span>
          <ArrowRight className="w-6 h-6" />
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-sans font-bold">
            {countdown}s
          </span>
        </button>
      </div>
    </div>
  );
};
