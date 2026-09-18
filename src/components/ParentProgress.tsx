import React, { useState } from 'react';
import {
  ArrowLeft,
  Trophy,
  Star,
  Sparkles,
  BookOpen,
  RotateCcw,
  Sliders,
  CheckCircle2,
  HeartHandshake,
  Volume2,
} from 'lucide-react';
import { ParentProgressData } from '../types';
import { CORE_PHONICS } from '../data/phonicsData';
import { resetParentProgress } from '../utils/storage';
import { playPop, speakText } from '../utils/audio';

interface ParentProgressProps {
  progress: ParentProgressData;
  onUpdateProgress: (updated: ParentProgressData) => void;
  onBackToHome: () => void;
  onStartGame: () => void;
}

export const ParentProgress: React.FC<ParentProgressProps> = ({
  progress,
  onUpdateProgress,
  onBackToHome,
  onStartGame,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tips' | 'settings'>('overview');
  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetData = () => {
    playPop();
    const fresh = resetParentProgress();
    onUpdateProgress(fresh);
    setConfirmReset(false);
  };

  const handleTestVoice = (rate: number) => {
    playPop();
    speakText('Hello! This is how I speak phonics sounds in the game.', { rate });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          id="parent-back-home-btn"
          onClick={() => {
            playPop();
            onBackToHome();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Game</span>
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            Parent & Educator Corner
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-['Fredoka']">
            Learning Progress
          </h2>
        </div>

        <button
          id="parent-play-btn"
          onClick={() => {
            playPop();
            onStartGame();
          }}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer text-sm sm:text-base font-['Fredoka']"
        >
          Play Game
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          id="parent-tab-overview"
          onClick={() => {
            playPop();
            setActiveTab('overview');
          }}
          className={`px-4 py-2 rounded-xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          Sound Mastery
        </button>

        <button
          id="parent-tab-tips"
          onClick={() => {
            playPop();
            setActiveTab('tips');
          }}
          className={`px-4 py-2 rounded-xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'tips'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          Teaching Tips (Ages 3–6)
        </button>

        <button
          id="parent-tab-settings"
          onClick={() => {
            playPop();
            setActiveTab('settings');
          }}
          className={`px-4 py-2 rounded-xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          Audio Settings
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
                <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Stars Earned
                </p>
                <p className="text-3xl font-black text-amber-950 font-['Fredoka']">
                  {progress.totalStarsEarned}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border-3 border-sky-200 shadow-md flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Rounds Completed
                </p>
                <p className="text-3xl font-black text-sky-950 font-['Fredoka']">
                  {progress.totalRoundsPlayed}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border-3 border-emerald-200 shadow-md flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Core Sounds Introduced
                </p>
                <p className="text-3xl font-black text-emerald-950 font-['Fredoka']">
                  6 of 6 (/s, a, t, p, i, n/)
                </p>
              </div>
            </div>
          </div>

          {/* Phonics Mastery Table / Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-slate-200 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-800 font-['Fredoka']">
                  Phoneme Mastery Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Tracks recognition accuracy and practice frequency for each phoneme
                </p>
              </div>
              <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                Synthetic Phonics Set 1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CORE_PHONICS.map((item) => {
                const stat = progress.mastery[item.id] || {
                  totalAsked: 0,
                  firstTryCorrect: 0,
                  totalCorrect: 0,
                };

                const accuracy =
                  stat.totalAsked > 0
                    ? Math.round((stat.firstTryCorrect / stat.totalAsked) * 100)
                    : 0;

                // Mastery Status Badge
                let badgeText = 'Introduced';
                let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';

                if (stat.totalAsked >= 3 && accuracy >= 75) {
                  badgeText = 'Mastered ⭐⭐⭐';
                  badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                } else if (stat.totalAsked > 0) {
                  badgeText = 'Developing ⭐⭐';
                  badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
                }

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-colors bg-slate-50/70"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-slate-800 font-['Fredoka']">
                          {item.capital} {item.letter}
                        </span>
                        <span className="text-sm font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                          {item.phoneme}
                        </span>
                      </div>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {badgeText}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-500 mb-2">
                      Word: <strong>{item.wordDisplay}</strong>
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>First-try accuracy:</span>
                        <span className="font-bold text-slate-800">{accuracy}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px] pt-1">
                        <span>Practiced {stat.totalAsked} times</span>
                        <span>{stat.firstTryCorrect} correct first try</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-slate-200 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 font-['Fredoka']">
                How Preschool Phonics Works (Ages 3–6)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Gentle, evidence-based methods for home learning
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-amber-900 font-black">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h4>1. Say Pure Sounds (Not Letter Names)</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                When teaching preschoolers, say <strong>/s/</strong> (hissing sss) rather than "es", and <strong>/t/</strong> (short unvoiced t) rather than "tuh". This allows children to blend sounds into words like <em>s-a-t &rarr; sat</em> smoothly!
              </p>
            </div>

            <div className="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-sky-900 font-black">
                <HeartHandshake className="w-5 h-5 text-sky-600" />
                <h4>2. The "No Negative Scoring" Rule</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Phonics Fun follows early-childhood research by never penalizing wrong taps. Children learn by active trial and error. Warm encouragement ("Try again! Let's listen closely!") builds joyful confidence.
              </p>
            </div>

            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-emerald-900 font-black">
                <Star className="w-5 h-5 text-emerald-600" />
                <h4>3. Fun Game: "I Spy the Sound"</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                At snack time or during walks, say: <em>"I spy with my little eye, something starting with /a/!"</em> (Apple). Let your child spot and touch it!
              </p>
            </div>

            <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-purple-900 font-black">
                <Volume2 className="w-5 h-5 text-purple-600" />
                <h4>4. Letter Action Movements</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Combine the sound with body movement: weave like a snake for /s/, tap fingers for /t/, puff like blowing out a candle for /p/. Kinesthetic gestures reinforce memory pathways!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-slate-200 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 font-['Fredoka']">
                Audio & Reset Controls
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Fine-tune speech rate and manage child progress
              </p>
            </div>
          </div>

          {/* Speech Rate Adjustment */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">
              Speech Speed (Slower helps toddlers distinguish tricky phonemes)
            </label>
            <div className="flex items-center gap-3">
              {[
                { label: 'Gentle & Slow (0.8x)', rate: 0.8 },
                { label: 'Normal Preschool (0.9x)', rate: 0.9 },
                { label: 'Brisk (1.0x)', rate: 1.0 },
              ].map((opt) => (
                <button
                  key={opt.rate}
                  onClick={() => {
                    const updated = { ...progress, speechRate: opt.rate };
                    onUpdateProgress(updated);
                    handleTestVoice(opt.rate);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    progress.speechRate === opt.rate
                      ? 'bg-purple-600 border-purple-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Progress Section */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm font-black text-slate-800 mb-1">
              Reset Learning Data
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Start fresh with 0 stars and clear phoneme mastery history.
            </p>

            {confirmReset ? (
              <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-2xl">
                <span className="text-xs font-bold text-rose-800">
                  Are you sure? This cannot be undone.
                </span>
                <button
                  onClick={handleResetData}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-colors cursor-pointer"
                >
                  Yes, Reset All
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                id="parent-reset-data-btn"
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Child Progress</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
