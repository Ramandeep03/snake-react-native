import { GridLayout } from './types';

export const GRID_CELL_SIZE = 14;
export const BOARD_BORDER_WIDTH = 12;
export const MAX_COLUMNS = 36;
export const MAX_ROWS = 72;

export const calculateGridLayout = (width: number, height: number): GridLayout | null => {
    const availableWidth = Math.max(0, width - BOARD_BORDER_WIDTH * 2);
    const availableHeight = Math.max(0, height - BOARD_BORDER_WIDTH * 2);
    const columns = Math.min(MAX_COLUMNS, Math.floor(availableWidth / GRID_CELL_SIZE));
    const rows = Math.min(MAX_ROWS, Math.floor(availableHeight / GRID_CELL_SIZE));

    if (columns < 1 || rows < 1) {
        return null;
    }

    return { columns, rows, cellSize: GRID_CELL_SIZE };
};

export const getBoardSize = (grid: GridLayout) => ({
    width: grid.columns * grid.cellSize + BOARD_BORDER_WIDTH * 2,
    height: grid.rows * grid.cellSize + BOARD_BORDER_WIDTH * 2,
});
