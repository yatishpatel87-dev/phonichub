import { ParentProgressData, RoundStats } from '../types';

const STORAGE_KEY = 'phonics_fun_progress_v1';

export const DEFAULT_PROGRESS: ParentProgressData = {
  totalRoundsPlayed: 0,
  totalStarsEarned: 0,
  history: [],
  mastery: {
    s: { phonemeId: 's', letter: 's', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
    a: { phonemeId: 'a', letter: 'a', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
    t: { phonemeId: 't', letter: 't', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
    p: { phonemeId: 'p', letter: 'p', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
    i: { phonemeId: 'i', letter: 'i', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
    n: { phonemeId: 'n', letter: 'n', totalAsked: 0, firstTryCorrect: 0, totalCorrect: 0 },
  },
  speechRate: 0.9,
  soundEffectsEnabled: true,
  speechVoiceEnabled: true,
};

export function loadParentProgress(): ParentProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      mastery: {
        ...DEFAULT_PROGRESS.mastery,
        ...(parsed.mastery || {}),
      },
    };
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveParentProgress(data: ParentProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export function recordRoundResults(roundStats: RoundStats): ParentProgressData {
  const current = loadParentProgress();
  const updatedMastery = { ...current.mastery };

  roundStats.results.forEach((res) => {
    const existing = updatedMastery[res.phonemeId] || {
      phonemeId: res.phonemeId,
      letter: res.letter,
      totalAsked: 0,
      firstTryCorrect: 0,
      totalCorrect: 0,
    };

    updatedMastery[res.phonemeId] = {
      ...existing,
      totalAsked: existing.totalAsked + 1,
      firstTryCorrect: existing.firstTryCorrect + (res.successOnFirstTry ? 1 : 0),
      totalCorrect: existing.totalCorrect + 1,
      lastPracticed: new Date().toISOString(),
    };
  });

  const updated: ParentProgressData = {
    ...current,
    totalRoundsPlayed: current.totalRoundsPlayed + 1,
    totalStarsEarned: current.totalStarsEarned + roundStats.starsEarned,
    history: [roundStats, ...current.history].slice(0, 20), // Keep last 20 rounds
    mastery: updatedMastery,
  };

  saveParentProgress(updated);
  return updated;
}

export function resetParentProgress(): ParentProgressData {
  saveParentProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
}
