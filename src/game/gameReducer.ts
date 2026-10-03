import { advanceGame, isOppositeDirection } from './movement';
import { createInitialGameState } from './state';
import { GameAction, GameState } from './types';

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'tick':
            return advanceGame(state, action.grid, action.foodRandomValue, action.emojiRandomValue);
        case 'start':
            if (state.hasStarted || state.isGameOver) {
                return state;
            }
            return {
                ...createInitialGameState(action.grid, action.randomValues, state.difficulty, state.solidWalls),
                hasStarted: true,
            };
        case 'setDirection':
            if (
                !state.hasStarted ||
                state.isPaused ||
                state.isGameOver ||
                state.direction !== state.movementDirection ||
                isOppositeDirection(state.movementDirection, action.direction)
            ) {
                return state;
            }
            return { ...state, direction: action.direction };
        case 'setDifficulty':
            if (state.hasStarted && !state.isGameOver) {
                return state;
            }
            return { ...state, difficulty: action.difficulty };
        case 'togglePause':
            return { ...state, isPaused: !state.isPaused };
        case 'setSolidWalls':
            return { ...state, solidWalls: action.solidWalls };
        case 'goHome':
            return {
                ...state,
                hasStarted: false,
                isGameOver: false,
                isPaused: false,
                score: 0,
                snake: [],
                food: null,
            };
        case 'restart':
            return {
                ...createInitialGameState(action.grid, action.randomValues, state.difficulty, state.solidWalls),
                hasStarted: true,
            };
    }
};
