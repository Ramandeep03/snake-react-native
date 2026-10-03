import { Difficulty } from './types';

export const SCORE_INCREMENT = 10;
export const DIFFICULTY_MOVE_INTERVALS: Record<Difficulty, number> = {
    easy: 160,
    normal: 100,
    hard: 65,
};
export const FOOD_EMOJIS = ['🍎', '🍓', '🍊', '🍇', '🍒', '🍉', '🍍', '🥝'];

export const getMoveInterval = (difficulty: Difficulty): number => {
    return DIFFICULTY_MOVE_INTERVALS[difficulty];
};
