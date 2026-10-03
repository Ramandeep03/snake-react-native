import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { calculateGridLayout } from './grid';
import { GridLayout } from './types';

export const useGameGrid = () => {
    const [grid, setGrid] = useState<GridLayout | null>(null);

    const onBoardLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        const nextGrid = calculateGridLayout(width, height);

        setGrid((currentGrid) => {
            if (!nextGrid) {
                return null;
            }

            if (
                currentGrid?.columns === nextGrid.columns &&
                currentGrid.rows === nextGrid.rows &&
                currentGrid.cellSize === nextGrid.cellSize
            ) {
                return currentGrid;
            }

            return nextGrid;
        });
    }, []);

    return { grid, onBoardLayout };
};
