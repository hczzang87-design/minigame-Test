export interface Animal {
  id: string;
  name: string;
  emoji: string;
}

export interface Player {
  id: number;
  name: string;
  animal: Animal;
  position: number;
  finished: boolean;
  finishTime: number | null;
  rank: number | null;
}

export type GamePhase = 'setup' | 'countdown' | 'racing' | 'finished';

export const ANIMALS: Animal[] = [
  { id: 'dog', name: '강아지', emoji: '🐶' },
  { id: 'cat', name: '고양이', emoji: '🐱' },
  { id: 'rabbit', name: '토끼', emoji: '🐰' },
  { id: 'fox', name: '여우', emoji: '🦊' },
  { id: 'bear', name: '곰', emoji: '🐻' },
  { id: 'panda', name: '판다', emoji: '🐼' },
  { id: 'koala', name: '코알라', emoji: '🐨' },
  { id: 'lion', name: '사자', emoji: '🦁' },
  { id: 'tiger', name: '호랑이', emoji: '🐯' },
  { id: 'cow', name: '소', emoji: '🐮' },
  { id: 'pig', name: '돼지', emoji: '🐷' },
  { id: 'frog', name: '개구리', emoji: '🐸' },
  { id: 'monkey', name: '원숭이', emoji: '🐵' },
  { id: 'unicorn', name: '유니콘', emoji: '🦄' },
  { id: 'chicken', name: '닭', emoji: '🐔' },
];
