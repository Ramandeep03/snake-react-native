import { Coordinate, Direction } from '../types/types';
import { SCORE_INCREMENT } from './constants';
import { hasCollision } from './collisions';
import { findFoodPosition, getFoodEmoji, isFoodAtPosition } from './food';
import { GameGrid, GameState } from './types';

export const isOppositeDirection = (current: Direction, next: Direction): boolean => {
    return (
        (current === Direction.Up && next === Direction.Down) ||
        (current === Direction.Down && next === Direction.Up) ||
        (current === Direction.Left && next === Direction.Right) ||
        (current === Direction.Right && next === Direction.Left)
    );
};

const getNextHead = (head: Coordinate, direction: Direction): Coordinate => {
    const nextHead = { ...head };

    switch (direction) {
        case Direction.Up:
            nextHead.y -= 1;
            break;
        case Direction.Down:
            nextHead.y += 1;
            break;
        case Direction.Left:
            nextHead.x -= 1;
            break;
        case Direction.Right:
            nextHead.x += 1;
            break;
    }

    return nextHead;
};

export const advanceGame = (
    state: GameState,
    grid: GameGrid,
    foodRandomValue: number,
    emojiRandomValue: number
): GameState => {
    if (!state.hasStarted || state.isGameOver || state.isPaused || grid.columns < 1 || grid.rows < 1) {
        return state;
    }

    const nextHead = getNextHead(state.snake[0], state.direction);

    if (!state.solidWalls) {
        nextHead.x = (nextHead.x + grid.columns) % grid.columns;
        nextHead.y = (nextHead.y + grid.rows) % grid.rows;
    }

    const willEatFood = state.food !== null && isFoodAtPosition(nextHead, state.food);
    const bounds = {
        xMin: 0,
        xMax: grid.columns - 1,
        yMin: 0,
        yMax: grid.rows - 1,
    };

    if (hasCollision(nextHead, bounds, state.snake, willEatFood)) {
        return { ...state, isGameOver: true };
    }

    if (willEatFood) {
        const nextSnake = [nextHead, ...state.snake];
        const nextFood = findFoodPosition(
            grid.columns - 1,
            grid.rows - 1,
            nextSnake,
            foodRandomValue
        );

        return {
            ...state,
            movementDirection: state.direction,
            snake: nextSnake,
            food: nextFood,
            foodEmoji: getFoodEmoji(emojiRandomValue),
            score: state.score + SCORE_INCREMENT,
            isGameOver: nextFood === null,
        };
    }

    return {
        ...state,
        movementDirection: state.direction,
        snake: [nextHead, ...state.snake.slice(0, -1)],
    };
};
