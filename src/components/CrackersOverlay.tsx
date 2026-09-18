import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame } from 'lucide-react';
import { playCrackerBurst, playSparkleDing } from '../utils/audio';

interface CrackersOverlayProps {
  durationSeconds?: number;
  soundEnabled: boolean;
  onFinished?: () => void;
}

export const CrackersOverlay: React.FC<CrackersOverlayProps> = ({
  durationSeconds = 10,
  soundEnabled,
  onFinished,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(true);
  const [activeBursts, setActiveBursts] = useState<
    { id: number; x: number; y: number; color: string; size: number }[]
  >([]);
  const burstIdRef = useRef(0);

  useEffect(() => {
    setIsActive(true);
    setSecondsRemaining(durationSeconds);

    const startTime = Date.now();
    const endTime = startTime + durationSeconds * 1000;

    // 1. Regular intervals for confetti fireworks across 10 seconds
    const confettiInterval = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(confettiInterval);
        setIsActive(false);
        onFinished?.();
        return;
      }

      // Random position fireworks
      const randomX = 0.15 + Math.random() * 0.7;
      const randomY = 0.15 + Math.random() * 0.45;

      // Burst 1: Sky burst
      try {
        confetti({
          particleCount: 45,
          startVelocity: 35,
          spread: 80 + Math.random() * 40,
          origin: { x: randomX, y: randomY },
          colors: [
            '#FF1744',
            '#FFEA00',
            '#00E676',
            '#00E5FF',
            '#D500F9',
            '#FF9100',
            '#FF5252',
            '#FFD700',
          ],
          shapes: ['star', 'circle'],
          ticks: 120,
          gravity: 0.9,
          scalar: 1.2,
        });

        // Lateral side cannons every other tick
        if (Math.random() > 0.4) {
          confetti({
            particleCount: 30,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.8 },
            colors: ['#FFD700', '#FF3D00', '#76FF03', '#FF4081'],
          });
        }
        if (Math.random() > 0.4) {
          confetti({
            particleCount: 30,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.8 },
            colors: ['#00E5FF', '#FFEA00', '#FF1744', '#E040FB'],
          });
        }
      } catch {
        // safe fallback
      }

      // Play cracker burst sound
      if (soundEnabled) {
        playCrackerBurst();
        if (Math.random() > 0.5) {
          setTimeout(() => playSparkleDing(), 80);
        }
      }

      // Add visual on-screen starburst
      const newBurst = {
        id: ++burstIdRef.current,
        x: Math.floor(randomX * 100),
        y: Math.floor(randomY * 100),
        color: ['#F59E0B', '#EF4444', '#10B981', '#38BDF8', '#EC4899'][
          Math.floor(Math.random() * 5)
        ],
        size: 70 + Math.random() * 50,
      };

      setActiveBursts((prev) => [...prev.slice(-6), newBurst]);
    }, 380);

    // 2. Countdown timer ticking each second for 10 seconds
    const timerInterval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(timerInterval);
    };
  }, [durationSeconds, soundEnabled, onFinished]);

  if (!isActive && secondsRemaining === 0) {
    return null;
  }

  const progressPercent = ((durationSeconds - secondsRemaining) / durationSeconds) * 100;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dynamic Animated Starburst Explosions in the Background */}
      {activeBursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-80"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
            width: `${burst.size}px`,
            height: `${burst.size}px`,
          }}
        >
          <div
            className="w-full h-full rounded-full blur-xs"
            style={{
              background: `radial-gradient(circle, ${burst.color} 20%, transparent 70%)`,
            }}
          />
        </div>
      ))}

      {/* Floating Animated Fireworks / Crackers on Screen */}
      {/* Left Bottom Flowerpot (Anar) Sparks */}
      <div className="absolute bottom-6 left-6 flex flex-col items-center animate-bounce-slow">
        <div className="text-4xl animate-pulse">✨</div>
        <div className="text-5xl animate-spin" style={{ animationDuration: '3s' }}>
          🎆
        </div>
        <div className="text-3xl">🧨</div>
      </div>

      {/* Right Bottom Flowerpot (Anar) Sparks */}
      <div className="absolute bottom-6 right-6 flex flex-col items-center animate-bounce-slow delay-150">
        <div className="text-4xl animate-pulse">✨</div>
        <div className="text-5xl animate-spin" style={{ animationDuration: '3s' }}>
          🎆
        </div>
        <div className="text-3xl">🧨</div>
      </div>

      {/* Top Banner: 10-Second Crackers Show Announcement */}
      <div className="pointer-events-auto absolute top-20 left-1/2 transform -translate-x-1/2 max-w-md w-11/12 mx-auto">
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border-4 border-yellow-300 text-center animate-bounce-slow">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl animate-spin" style={{ animationDuration: '2s' }}>
              🎇
            </span>
            <Flame className="w-6 h-6 text-yellow-200 animate-pulse fill-yellow-200" />
            <h3 className="text-lg sm:text-2xl font-black font-['Fredoka'] tracking-wider drop-shadow-md">
              Crackers Blowing for 10 Seconds!
            </h3>
            <span className="text-2xl animate-spin" style={{ animationDuration: '2s' }}>
              🎇
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-yellow-100 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
            <span>Task Finished Celebration! 🎆</span>
            <span className="bg-white/25 px-2.5 py-0.5 rounded-full font-black text-white text-sm">
              {secondsRemaining}s left
            </span>
          </div>

          {/* Glowing 10-second Progress Bar */}
          <div className="mt-2.5 w-full bg-black/30 h-2.5 rounded-full overflow-hidden border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
