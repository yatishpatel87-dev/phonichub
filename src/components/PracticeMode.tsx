import React, { useState } from 'react';
import { Volume2, Play, Sparkles, ArrowLeft } from 'lucide-react';
import { PhonicItem } from '../types';
import { CORE_PHONICS } from '../data/phonicsData';
import { PhonicsIllustration } from './illustrations/PhonicsIllustrations';
import { playPop, speakPhoneme, speakText } from '../utils/audio';

interface PracticeModeProps {
  onStartGame: () => void;
  onBackToHome: () => void;
  soundEnabled: boolean;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  onStartGame,
  onBackToHome,
  soundEnabled,
}) => {
  const [selectedPhonic, setSelectedPhonic] = useState<PhonicItem>(CORE_PHONICS[0]);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handleSelectLetter = (item: PhonicItem) => {
    playPop();
    setSelectedPhonic(item);

    if (soundEnabled) {
      setIsPlayingSound(true);
      speakPhoneme(item, {
        onEnd: () => setIsPlayingSound(false),
      });
    }
  };

  const handleHearWord = () => {
    playPop();
    if (soundEnabled) {
      speakText(`${selectedPhonic.word}. ${selectedPhonic.capital} is for ${selectedPhonic.word}!`, {
        rate: 0.9,
      });
    }
  };

  const handleHearPhoneme = () => {
    playPop();
    if (soundEnabled) {
      setIsPlayingSound(true);
      speakPhoneme(selectedPhonic, {
        onEnd: () => setIsPlayingSound(false),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          id="practice-back-home-btn"
          onClick={() => {
            playPop();
            onBackToHome();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-bold rounded-2xl transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-amber-700" />
          <span>Home</span>
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-['Fredoka']">
            Letter Sound Explorer
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 font-bold">
            Tap any letter to hear its sound & see its picture word!
          </p>
        </div>

        <button
          id="practice-play-game-btn"
          onClick={() => {
            playPop();
            onStartGame();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-md shadow-emerald-400/30 cursor-pointer font-['Fredoka'] text-sm sm:text-base"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Play Game</span>
        </button>
      </div>

      {/* Grid of 6 Core Letter Blocks */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-8">
        {CORE_PHONICS.map((item) => {
          const isSelected = selectedPhonic.id === item.id;
          return (
            <button
              key={item.id}
              id={`practice-select-${item.letter}`}
              onClick={() => handleSelectLetter(item)}
              className={`py-4 sm:py-6 px-2 rounded-2xl border-4 transition-all cursor-pointer flex flex-col items-center justify-center active:scale-90 shadow-md ${
                isSelected
                  ? 'bg-amber-400 border-amber-600 text-amber-950 scale-105 shadow-amber-300/80 -translate-y-1'
                  : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-700 hover:border-amber-300'
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black font-['Fredoka']">
                {item.letter}
              </span>
              <span className="text-xs font-bold mt-1 opacity-75">
                {item.phoneme}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Letter Showcase Studio */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Huge Letter & Audio controls */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full font-black text-sm mb-4">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Phoneme: <strong className="text-lg">{selectedPhonic.phoneme}</strong></span>
            </div>

            {/* Giant Letter Card */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-3xl border-4 border-amber-300 flex items-center justify-center shadow-inner mb-4">
              <span className="text-8xl sm:text-9xl font-black text-amber-950 font-['Fredoka'] drop-shadow-md">
                {selectedPhonic.capital} {selectedPhonic.letter}
              </span>

              {/* Sound indicator badge */}
              <button
                id="practice-hear-phoneme-btn"
                onClick={handleHearPhoneme}
                className={`absolute -bottom-4 right-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-black text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 ${
                  isPlayingSound ? 'animate-bounce' : ''
                }`}
                title="Tap to hear sound"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear / {selectedPhonic.soundDisplay} /</span>
              </button>
            </div>

            {/* Mouth / Action Guide */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 max-w-sm text-left">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                How to make the sound:
              </p>
              <p className="text-sm font-medium text-amber-950">
                {selectedPhonic.mouthTip}
              </p>
            </div>
          </div>

          {/* Right: Picture Word & Illustration */}
          <div className="flex flex-col items-center text-center bg-gradient-to-b from-slate-50 to-amber-50/60 rounded-3xl p-6 border-3 border-amber-200 shadow-inner">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
              Picture Word
            </span>

            {/* Interactive SVG Illustration */}
            <div className="my-2 transform hover:scale-110 transition-transform duration-300">
              <PhonicsIllustration type={selectedPhonic.illustrationType} size={170} />
            </div>

            {/* Spelled Word */}
            <div className="text-4xl sm:text-5xl font-black font-['Fredoka'] tracking-wide mt-2">
              <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-3">
                {selectedPhonic.word.charAt(0).toUpperCase()}
              </span>
              <span className="text-slate-800">
                {selectedPhonic.word.slice(1)}
              </span>
            </div>

            <p className="text-lg font-bold text-slate-600 mt-2 font-['Fredoka']">
              {selectedPhonic.exampleSentence}
            </p>

            {/* Hear Word Pronunciation */}
            <button
              id="practice-hear-word-btn"
              onClick={handleHearWord}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-base rounded-2xl flex items-center gap-2.5 shadow-md shadow-amber-300/50 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
            >
              <Volume2 className="w-5 h-5" />
              <span>Say "{selectedPhonic.wordDisplay}"</span>
            </button>
          </div>
        </div>

        {/* Bottom Shortcut to Listen and Find Game */}
        <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-slate-600 text-center sm:text-left">
            Ready to test what you've learned? Tap start to play <strong>Listen and Find</strong>!
          </p>
          <button
            id="practice-start-round-cta"
            onClick={() => {
              playPop();
              onStartGame();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-md shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-['Fredoka']"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Play Listen & Find</span>
          </button>
        </div>
      </div>
    </div>
  );
};
