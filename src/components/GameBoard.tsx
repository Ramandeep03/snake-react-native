import React, { JSX } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { BOARD_BORDER_WIDTH, getBoardSize } from '../game/grid';
import { GameState, GridLayout } from '../game/types';
import { ThemeColors } from '../style/colors';
import Food from './Food';
import Snake from './Snake';

interface GameBoardProps {
    game: GameState;
    grid: GridLayout | null;
    colors: ThemeColors;
    onLayout: (event: LayoutChangeEvent) => void;
}

export default function GameBoard({
    game,
    grid,
    colors,
    onLayout,
}: GameBoardProps): JSX.Element {
    return (
        <View style={[styles.viewport, { backgroundColor: colors.primary }]} onLayout={onLayout}>
            {grid && (
                <View
                    style={[
                        styles.boundaries,
                        { borderColor: colors.primary, backgroundColor: colors.background },
                        getBoardSize(grid),
                    ]}
                >
                    {game.hasStarted && !game.isGameOver && (
                        <>
                            <Snake snake={game.snake} cellSize={grid.cellSize} color={colors.primary} />
                            {game.food && (
                                <Food
                                    x={game.food.x}
                                    y={game.food.y}
                                    cellSize={grid.cellSize}
                                    emoji={game.foodEmoji}
                                />
                            )}
                        </>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    viewport: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boundaries: {
        borderWidth: BOARD_BORDER_WIDTH,
    },
});
