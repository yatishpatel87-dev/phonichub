import React, { useState, useEffect } from 'react';
import { Shield, X, Lock } from 'lucide-react';
import { playPop, playGentleBoing } from '../utils/audio';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [problem, setProblem] = useState({ a: 3, b: 4, answer: 7 });
  const [options, setOptions] = useState<number[]>([5, 6, 7, 8]);
  const [errorShake, setErrorShake] = useState(false);

  // Generate a random gentle addition problem whenever opened
  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      const ans = a + b;
      const wrong1 = ans - 1;
      const wrong2 = ans + 1;
      const wrong3 = ans + 2;
      const shuffled = [ans, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);

      setProblem({ a, b, answer: ans });
      setOptions(shuffled);
      setErrorShake(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (choice: number) => {
    playPop();
    if (choice === problem.answer) {
      onSuccess();
      onClose();
    } else {
      playGentleBoing();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <div
      id="parent-gate-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="parent-gate-card"
        className={`bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-4 border-purple-300 relative transition-transform ${
          errorShake ? 'animate-bounce' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close Parent Verification"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 font-['Fredoka']">
              Grown-Ups Only
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Please solve this quick problem to enter Parent Progress
            </p>
          </div>
        </div>

        {/* Math Question Box */}
        <div className="bg-purple-50 rounded-2xl p-4 text-center border-2 border-purple-200 mb-5">
          <p className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-1">
            Question
          </p>
          <div className="text-3xl font-black text-purple-900 font-['Fredoka'] tracking-widest">
            {problem.a} + {problem.b} = ?
          </div>
        </div>

        {/* Number Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {options.map((num, i) => (
            <button
              key={i}
              id={`parent-gate-opt-${num}`}
              onClick={() => handleSelect(num)}
              className="py-3 px-4 bg-slate-50 hover:bg-purple-50 border-2 border-slate-200 hover:border-purple-400 text-slate-800 font-black text-2xl rounded-2xl transition-all active:scale-95 shadow-xs font-['Fredoka']"
            >
              {num}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Keeps little ones safely inside their learning games.
        </p>
      </div>
    </div>
  );
};
