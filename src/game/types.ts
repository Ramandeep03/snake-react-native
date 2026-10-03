import { Coordinate, Direction } from '../types/types';

export interface GameGrid {
    columns: number;
    rows: number;
}

export interface GridLayout extends GameGrid {
    cellSize: number;
}

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface GameSetupRandomValues {
    direction: number;
    positionX: number;
    positionY: number;
    food: number;
    foodEmoji: number;
}

export interface GameState {
    direction: Direction;
    movementDirection: Direction;
    snake: Coordinate[];
    food: Coordinate | null;
    foodEmoji: string;
    score: number;
    difficulty: Difficulty;
    hasStarted: boolean;
    isGameOver: boolean;
    isPaused: boolean;
    solidWalls: boolean;
}

export type GameAction =
    | { type: 'tick'; grid: GameGrid; foodRandomValue: number; emojiRandomValue: number }
    | { type: 'start'; grid: GameGrid; randomValues: GameSetupRandomValues }
    | { type: 'setDirection'; direction: Direction }
    | { type: 'setDifficulty'; difficulty: Difficulty }
    | { type: 'togglePause' }
    | { type: 'setSolidWalls'; solidWalls: boolean }
    | { type: 'goHome' }
    | { type: 'restart'; grid: GameGrid; randomValues: GameSetupRandomValues };
