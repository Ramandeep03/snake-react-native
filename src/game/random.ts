import { GameSetupRandomValues } from './types';

export const createGameSetupRandomValues = (): GameSetupRandomValues => ({
    direction: Math.random(),
    positionX: Math.random(),
    positionY: Math.random(),
    food: Math.random(),
    foodEmoji: Math.random(),
});
