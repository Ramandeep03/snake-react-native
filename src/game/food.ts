import { Coordinate } from '../types/types';
import { FOOD_EMOJIS } from './constants';

export const isFoodAtPosition = (head: Coordinate, food: Coordinate): boolean => {
    return head.x === food.x && head.y === food.y;
};

export const findFoodPosition = (
    maxX: number,
    maxY: number,
    occupiedPositions: Coordinate[],
    randomValue: number
): Coordinate | null => {
    const occupied = new Set(occupiedPositions.map(({ x, y }) => `${x},${y}`));
    const availablePositions: Coordinate[] = [];

    for (let x = 0; x <= maxX; x += 1) {
        for (let y = 0; y <= maxY; y += 1) {
            if (!occupied.has(`${x},${y}`)) {
                availablePositions.push({ x, y });
            }
        }
    }

    if (availablePositions.length === 0) {
        return null;
    }

    const randomIndex = Math.min(
        availablePositions.length - 1,
        Math.max(0, Math.floor(randomValue * availablePositions.length))
    );
    return availablePositions[randomIndex];
};

export const getFoodEmoji = (randomValue: number): string => {
    const index = Math.min(
        FOOD_EMOJIS.length - 1,
        Math.max(0, Math.floor(randomValue * FOOD_EMOJIS.length))
    );
    return FOOD_EMOJIS[index];
};
