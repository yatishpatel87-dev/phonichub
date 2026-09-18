import React from 'react';
import { Play, BookOpen, Star, Sparkles, Volume2, Shield } from 'lucide-react';
import { CORE_PHONICS } from '../data/phonicsData';
import { PhonicItem } from '../types';
import { playPop, speakPhoneme, speakText } from '../utils/audio';

interface HomeScreenProps {
  totalStars: number;
  onStartGame: () => void;
  onPracticeMode: () => void;
  onOpenParentGate: () => void;
  soundEnabled: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  totalStars,
  onStartGame,
  onPracticeMode,
  onOpenParentGate,
  soundEnabled,
}) => {
  const handleQuickSound = (item: PhonicItem) => {
    playPop();
    if (soundEnabled) {
      speakPhoneme(item);
    }
  };

  const handleWelcomeVoice = () => {
    playPop();
    if (soundEnabled) {
      speakText('Welcome to Phonics Fun! Tap the big green button to play Listen and Find!', {
        rate: 0.9,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Friendly Mascot / Header Badge */}
      <div className="relative mb-2">
        <button
          id="home-mascot-btn"
          onClick={handleWelcomeVoice}
          className="group relative inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          aria-label="Tap the mascot to say hello"
          title="Tap me to say hello!"
        >
          {/* Animated Halo */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-orange-300 p-2 shadow-xl shadow-amber-300/60 flex items-center justify-center border-4 border-white animate-bounce-slow">
            <span className="text-6xl sm:text-7xl select-none filter drop-shadow-md">
              🦁
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white border-2 border-amber-300 rounded-full p-2 shadow-md group-hover:rotate-12 transition-transform">
            <Volume2 className="w-5 h-5 text-amber-600" />
          </div>
        </button>
      </div>

      {/* Main Title */}
      <div className="mt-3 mb-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100/90 border border-amber-300 rounded-full text-amber-900 font-black text-xs sm:text-sm uppercase tracking-wider mb-2 font-['Fredoka']">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Ages 3–6 Preschool Learning</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-amber-950 font-['Fredoka']">
          Phonics <span className="text-orange-500 underline decoration-amber-300 decoration-wavy decoration-3">Fun</span>
        </h1>
        <p className="text-base sm:text-xl font-bold text-amber-900/80 mt-2 max-w-md mx-auto font-['Fredoka']">
          Listen to letter sounds, find matching letters, and collect shiny gold stars!
        </p>
      </div>

      {/* Star Counter Showcase */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-3 border-amber-300/80 px-6 py-3 rounded-full shadow-md flex items-center gap-3 mb-8">
        <Star className="w-7 h-7 text-amber-500 fill-amber-400 animate-pulse" />
        <span className="text-lg sm:text-xl font-black text-amber-950 font-['Fredoka']">
          {totalStars} {totalStars === 1 ? 'Star' : 'Stars'} Collected!
        </span>
      </div>

      {/* Big Tactile Action Buttons */}
      <div className="w-full max-w-md space-y-4 mb-10">
        {/* Giant Start Button */}
        <button
          id="home-start-game-btn"
          onClick={() => {
            playPop();
            onStartGame();
          }}
          className="w-full py-5 sm:py-6 px-8 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-2xl sm:text-3xl rounded-3xl shadow-xl shadow-emerald-500/40 flex items-center justify-center gap-4 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer font-['Fredoka'] border-4 border-emerald-300/50"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Play className="w-7 h-7 fill-white text-white translate-x-0.5" />
          </div>
          <span>Play Listen & Find</span>
        </button>

        {/* Practice Mode Button */}
        <button
          id="home-practice-btn"
          onClick={() => {
            playPop();
            onPracticeMode();
          }}
          className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xl sm:text-2xl rounded-3xl shadow-lg shadow-sky-400/30 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer font-['Fredoka'] border-4 border-sky-300/50"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span>Practice Letter Sounds</span>
        </button>
      </div>

      {/* Quick Phonics Sound Preview Bar */}
      <div className="w-full max-w-lg bg-white/85 backdrop-blur-md rounded-3xl p-5 border-3 border-amber-200 shadow-md">
        <p className="text-xs font-black uppercase tracking-wider text-amber-800/80 mb-3">
          Tap a letter to hear its sound:
        </p>
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {CORE_PHONICS.map((item) => (
            <button
              key={item.id}
              id={`home-preview-${item.letter}`}
              onClick={() => handleQuickSound(item)}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 text-amber-950 rounded-2xl flex flex-col items-center justify-center font-black text-xl sm:text-2xl transition-all active:scale-90 shadow-xs cursor-pointer font-['Fredoka']"
              title={`Hear /${item.soundDisplay}/ for ${item.word}`}
            >
              <span>{item.letter}</span>
              <span className="text-[9px] font-sans font-bold text-amber-700 opacity-80 -mt-1">
                {item.phoneme}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Parent Corner link */}
      <button
        id="home-parent-corner-btn"
        onClick={() => {
          playPop();
          onOpenParentGate();
        }}
        className="mt-6 inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-bold text-sm bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-full border border-purple-200 transition-colors cursor-pointer"
      >
        <Shield className="w-4 h-4" />
        <span>Parent & Teacher Progress Screen</span>
      </button>
    </div>
  );
};
