import { Coordinate } from '../types/types';

interface GameBounds {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

export const hasCollision = (
    nextHead: Coordinate,
    bounds: GameBounds,
    snake: Coordinate[],
    willGrow: boolean
): boolean => {
    const bodyToCheck = willGrow ? snake : snake.slice(0, -1);

    return (
        nextHead.x < bounds.xMin ||
        nextHead.x > bounds.xMax ||
        nextHead.y < bounds.yMin ||
        nextHead.y > bounds.yMax ||
        bodyToCheck.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)
    );
};
