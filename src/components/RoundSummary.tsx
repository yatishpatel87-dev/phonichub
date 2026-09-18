import React, { useEffect, useState } from 'react';
import { Star, RotateCcw, BookOpen, Shield, Home, Sparkles, Flame } from 'lucide-react';
import { AppScreen } from '../types';
import { playPop, playVictoryFanfare, speakText } from '../utils/audio';
import { CrackersOverlay } from './CrackersOverlay';

interface RoundSummaryProps {
  totalQuestions: number;
  starsEarned: number;
  onPlayAgain: () => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenParentGate: () => void;
  soundEnabled: boolean;
}

export const RoundSummary: React.FC<RoundSummaryProps> = ({
  totalQuestions,
  starsEarned,
  onPlayAgain,
  onNavigate,
  onOpenParentGate,
  soundEnabled,
}) => {
  const [showCrackers, setShowCrackers] = useState(true);
  const [crackerRoundKey, setCrackerRoundKey] = useState(0);

  useEffect(() => {
    if (soundEnabled) {
      playVictoryFanfare();
      speakText('Hooray! You finished the task! Watch the crackers blow!', {
        rate: 0.92,
      });
    }
  }, [soundEnabled]);

  const handleReplayCrackers = () => {
    playPop();
    setShowCrackers(false);
    setTimeout(() => {
      setCrackerRoundKey((k) => k + 1);
      setShowCrackers(true);
      if (soundEnabled) {
        speakText('Yay! More crackers blowing!', { rate: 0.95 });
      }
    }, 50);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-8 text-center animate-in zoom-in-95 duration-300 relative">
      {/* 10-Second Crackers Fireworks Celebration */}
      {showCrackers && (
        <CrackersOverlay
          key={crackerRoundKey}
          durationSeconds={10}
          soundEnabled={soundEnabled}
          onFinished={() => {
            // After 10 seconds, crackers finish smoothly
            setShowCrackers(false);
          }}
        />
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 relative overflow-hidden">
        {/* Floating background sparkles */}
        <div className="absolute top-2 left-4 text-3xl animate-bounce">🎈</div>
        <div className="absolute top-4 right-6 text-3xl animate-bounce delay-150">🎉</div>

        <div className="inline-block p-4 bg-amber-100 rounded-full mb-3 shadow-inner">
          <span className="text-5xl sm:text-6xl">🏆</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-amber-950 font-['Fredoka'] mb-1">
          Task Finished!
        </h2>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-black uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 text-red-600 fill-red-500" />
          <span>10-Second Crackers Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        </div>
        <p className="text-lg text-amber-800 font-bold mb-5 font-['Fredoka']">
          You are a Phonics Superstar! 🌟
        </p>

        {/* 6 Score Stars Display */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-3 border-amber-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
          <p className="text-sm font-black text-amber-700 uppercase tracking-widest mb-4">
            Your Stars This Round
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const isFilled = index < starsEarned;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 transform transition-transform hover:scale-110"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-3 transition-all ${
                      isFilled
                        ? 'bg-amber-400 border-amber-500 shadow-md shadow-amber-300/60 scale-105'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Star
                      className={`w-8 h-8 sm:w-9 sm:h-9 ${
                        isFilled
                          ? 'text-amber-100 fill-amber-100 animate-pulse'
                          : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-bold text-amber-900">
                    Star {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-lg font-black text-amber-900 mt-4 font-['Fredoka']">
            {starsEarned} of {totalQuestions} Stars Earned!
          </p>
        </div>

        {/* Button to blow crackers again for 10 seconds */}
        <div className="mb-5">
          <button
            id="blow-crackers-btn"
            onClick={handleReplayCrackers}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-lg rounded-2xl shadow-md shadow-red-400/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-['Fredoka'] border-2 border-yellow-300"
          >
            <span className="text-xl">🧨</span>
            <span>{showCrackers ? 'Crackers Blowing (10s)! 🎆' : 'Blow Crackers Again (10s)! 🧨'}</span>
            <span className="text-xl">✨</span>
          </button>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-3">
          <button
            id="round-play-again-btn"
            onClick={() => {
              playPop();
              onPlayAgain();
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-2xl rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
          >
            <RotateCcw className="w-7 h-7" />
            <span>Play Listen & Find Again</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              id="round-practice-btn"
              onClick={() => {
                playPop();
                onNavigate('practice');
              }}
              className="py-3.5 px-4 bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 text-sky-900 font-black text-lg rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
            >
              <BookOpen className="w-5 h-5 text-sky-700" />
              <span>Practice Letters</span>
            </button>

            <button
              id="round-home-btn"
              onClick={() => {
                playPop();
                onNavigate('home');
              }}
              className="py-3.5 px-4 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 font-black text-lg rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
            >
              <Home className="w-5 h-5 text-amber-700" />
              <span>Back to Home</span>
            </button>
          </div>

          <button
            id="round-parent-progress-btn"
            onClick={() => {
              playPop();
              onOpenParentGate();
            }}
            className="w-full py-2.5 px-4 text-purple-700 hover:text-purple-900 text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>View Parent Progress Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

