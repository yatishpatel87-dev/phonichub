import { useState, useEffect, useCallback } from 'react';
import { AppScreen, ParentProgressData, RoundStats } from './types';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ListenGame } from './components/ListenGame';
import { PracticeMode } from './components/PracticeMode';
import { ParentProgress } from './components/ParentProgress';
import { ParentGateModal } from './components/ParentGateModal';
import {
  loadParentProgress,
  saveParentProgress,
  recordRoundResults,
} from './utils/storage';
import { unlockAudio, playPop } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [progress, setProgress] = useState<ParentProgressData>(loadParentProgress);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isParentGateOpen, setIsParentGateOpen] = useState<boolean>(false);
  const [roundCounter, setRoundCounter] = useState<number>(1);

  // Audio unlock listener for browser restrictions
  useEffect(() => {
    const handleFirstGesture = () => {
      unlockAudio();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  // Update audio preferences with progress state
  useEffect(() => {
    setSoundEnabled(progress.soundEffectsEnabled);
  }, [progress.soundEffectsEnabled]);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      const updated = {
        ...progress,
        soundEffectsEnabled: next,
        speechVoiceEnabled: next,
      };
      setProgress(updated);
      saveParentProgress(updated);
      return next;
    });
  }, [progress]);

  const handleCompleteRound = (stats: RoundStats) => {
    const updated = recordRoundResults(stats);
    setProgress(updated);
    setRoundCounter((prev) => prev + 1);
  };

  const handleUpdateProgress = (updated: ParentProgressData) => {
    setProgress(updated);
    saveParentProgress(updated);
  };

  const handleOpenParentGate = () => {
    setIsParentGateOpen(true);
  };

  const handleParentGateSuccess = () => {
    setCurrentScreen('parent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 text-slate-900 flex flex-col selection:bg-amber-300 selection:text-amber-950">
      {/* Top Child-Friendly Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        totalStars={progress.totalStarsEarned}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenParentGate={handleOpenParentGate}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col justify-center">
        {currentScreen === 'home' && (
          <HomeScreen
            totalStars={progress.totalStarsEarned}
            onStartGame={() => setCurrentScreen('game')}
            onPracticeMode={() => setCurrentScreen('practice')}
            onOpenParentGate={handleOpenParentGate}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'game' && (
          <ListenGame
            onCompleteRound={handleCompleteRound}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenParentGate={handleOpenParentGate}
            soundEnabled={soundEnabled}
            roundNumber={roundCounter}
          />
        )}

        {currentScreen === 'practice' && (
          <PracticeMode
            onStartGame={() => setCurrentScreen('game')}
            onBackToHome={() => setCurrentScreen('home')}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'parent' && (
          <ParentProgress
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onBackToHome={() => setCurrentScreen('home')}
            onStartGame={() => setCurrentScreen('game')}
          />
        )}
      </main>

      {/* Child-Safe Parent Gate Modal */}
      <ParentGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onSuccess={handleParentGateSuccess}
      />

      {/* Subtle Footer for preschool guidance */}
      <footer className="w-full py-4 text-center text-xs text-amber-800/60 font-medium">
        <p>Phonics Fun — Early Phonics & Speech Development for Preschoolers (3–6)</p>
      </footer>
    </div>
  );
}
