import React from 'react';
import { Volume2, VolumeX, Shield, Star, Home, Sparkles } from 'lucide-react';
import { AppScreen } from '../types';
import { playPop } from '../utils/audio';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  totalStars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenParentGate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  totalStars,
  soundEnabled,
  onToggleSound,
  onOpenParentGate,
}) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b-4 border-amber-200 sticky top-0 z-40 px-4 py-2.5 sm:py-3 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Logo / Home Button */}
        <button
          id="nav-logo-btn"
          onClick={() => {
            playPop();
            onNavigate('home');
          }}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-amber-300 rounded-2xl p-1"
          aria-label="Phonics Fun Home"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md shadow-amber-300/50 group-hover:scale-105 transition-transform">
            <span className="text-2xl sm:text-3xl filter drop-shadow">⭐</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-950 font-['Fredoka'] block leading-none">
              Phonics <span className="text-orange-500">Fun</span>
            </span>
            <span className="text-xs font-bold text-amber-700/80 hidden sm:block tracking-wide">
              Preschool Phonics 3–6
            </span>
          </div>
        </button>

        {/* Center / Navigation Badge */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'home' && (
            <button
              id="nav-home-btn"
              onClick={() => {
                playPop();
                onNavigate('home');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-xl text-sm transition-all active:scale-95 shadow-xs"
            >
              <Home className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          {currentScreen === 'game' && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-black uppercase tracking-wider border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Listen & Find
            </div>
          )}
        </div>

        {/* Right Actions: Stars, Sound, Parent Corner */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter Pill */}
          <div
            id="nav-star-counter"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 px-3 py-1.5 rounded-full shadow-xs text-amber-900 font-black text-sm sm:text-base select-none"
            title="Total stars earned"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="font-['Fredoka']">{totalStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="nav-sound-toggle-btn"
            onClick={() => {
              playPop();
              onToggleSound();
            }}
            className={`p-2 sm:p-2.5 rounded-xl border-2 transition-all cursor-pointer active:scale-90 ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
            }`}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* Parent Corner Button */}
          <button
            id="nav-parent-corner-btn"
            onClick={() => {
              playPop();
              onOpenParentGate();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer ${
              currentScreen === 'parent'
                ? 'bg-purple-600 border-purple-700 text-white shadow-md'
                : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
            }`}
            title="Parent Progress & Settings"
          >
            <Shield className="w-4 h-4 text-purple-600 sm:inline" />
            <span className="hidden sm:inline">Parents</span>
          </button>
        </div>
      </div>
    </header>
  );
};
