import { Direction } from '../types/types';
import { findFoodPosition, getFoodEmoji } from './food';
import { Difficulty, GameGrid, GameSetupRandomValues, GameState } from './types';

const availableDirections = (grid: GameGrid): Direction[] => {
    const directions: Direction[] = [];
    if (grid.columns > 1) directions.push(Direction.Left, Direction.Right);
    if (grid.rows > 1) directions.push(Direction.Up, Direction.Down);
    return directions.length > 0 ? directions : [Direction.Right];
};

const randomIndex = (length: number, randomValue: number): number => {
    return Math.min(length - 1, Math.max(0, Math.floor(randomValue * length)));
};

const getStartingPosition = (
    grid: GameGrid,
    direction: Direction,
    randomValues: GameSetupRandomValues
) => {
    const x = randomIndex(grid.columns, randomValues.positionX);
    const y = randomIndex(grid.rows, randomValues.positionY);

    switch (direction) {
        case Direction.Right:
            return { x: randomIndex(Math.max(1, grid.columns - 1), randomValues.positionX), y };
        case Direction.Left:
            return { x: 1 + randomIndex(Math.max(1, grid.columns - 1), randomValues.positionX), y };
        case Direction.Down:
            return { x, y: randomIndex(Math.max(1, grid.rows - 1), randomValues.positionY) };
        case Direction.Up:
            return { x, y: 1 + randomIndex(Math.max(1, grid.rows - 1), randomValues.positionY) };
    }
};

export const createInitialGameState = (
    grid: GameGrid,
    randomValues: GameSetupRandomValues,
    difficulty: Difficulty,
    solidWalls = true
): GameState => {
    const directions = availableDirections(grid);
    const direction = directions[randomIndex(directions.length, randomValues.direction)];
    const snake = [getStartingPosition(grid, direction, randomValues)];
    const food = findFoodPosition(grid.columns - 1, grid.rows - 1, snake, randomValues.food);

    return {
    direction,
    movementDirection: direction,
    snake,
    food,
    foodEmoji: getFoodEmoji(randomValues.foodEmoji),
    score: 0,
    difficulty,
    hasStarted: false,
    isGameOver: food === null,
    isPaused: false,
    solidWalls,
    };
};

export const initialGameState: GameState = {
    direction: Direction.Right,
    movementDirection: Direction.Right,
    snake: [],
    food: null,
    foodEmoji: getFoodEmoji(0),
    score: 0,
    difficulty: 'normal',
    hasStarted: false,
    isGameOver: false,
    isPaused: false,
    solidWalls: true,
};
