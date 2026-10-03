import React, { JSX, useEffect, useReducer } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Direction } from '../types/types';
import { gameReducer } from '../game/gameReducer';
import { initialGameState } from '../game/state';
import { getMoveInterval } from '../game/constants';
import { getBoardSize } from '../game/grid';
import { MIN_SWIPE_DISTANCE } from '../game/input';
import { createGameSetupRandomValues } from '../game/random';
import { useBestScore } from '../game/useBestScore';
import { useGameFeedback } from '../game/useGameFeedback';
import { useGameGrid } from '../game/useGameGrid';
import { useGameMusic } from '../game/useGameMusic';
import { useGamePreferences } from '../preferences/GamePreferencesProvider';

import GameBoard from './GameBoard';
import Header from './Header';
import HomeScreen from './HomeScreen';
import GameStatusOverlay from './GameStatusOverlay';

export default function Game(): JSX.Element {
    const [game, dispatch] = useReducer(gameReducer, initialGameState);
    const { grid, onBoardLayout } = useGameGrid();
    const {
        preferences,
        colors,
        setTheme,
        setSoundsEnabled,
        setMusicEnabled,
        setHapticsEnabled,
    } = useGamePreferences();
    const startMusic = useGameMusic();
    const bestScore = useBestScore(game.score);
    const { isGameOver, isPaused } = game;
    useGameFeedback(game.score, game.isGameOver, game.direction, game.hasStarted);

    useEffect(() => {
        if (!game.hasStarted || isGameOver || isPaused || !grid) {
            return;
        }

        const intervalID = setInterval(() => {
            dispatch({
                type: 'tick',
                grid: { columns: grid.columns, rows: grid.rows },
                foodRandomValue: Math.random(),
                emojiRandomValue: Math.random(),
            });
        }, getMoveInterval(game.difficulty));
        return () => clearInterval(intervalID);
    }, [dispatch, game.difficulty, game.hasStarted, grid, isGameOver, isPaused]);

    const pan = Gesture.Pan()
        .onEnd((event) => {
            const { translationX, translationY } = event;
            if (Math.max(Math.abs(translationX), Math.abs(translationY)) < MIN_SWIPE_DISTANCE) {
                return;
            }

            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 0) {
                    dispatch({ type: 'setDirection', direction: Direction.Right });
                } else {
                    dispatch({ type: 'setDirection', direction: Direction.Left });
                }
            } else if (translationY > 0) {
                dispatch({ type: 'setDirection', direction: Direction.Down });
            } else {
                dispatch({ type: 'setDirection', direction: Direction.Up });
            }
        });

    const pauseGame = () => dispatch({ type: 'togglePause' });
    const setWallMode = (solidWalls: boolean) => dispatch({ type: 'setSolidWalls', solidWalls });
    const reloadGame = () => {
        if (grid) {
            dispatch({ type: 'restart', grid, randomValues: createGameSetupRandomValues() });
        }
    };
    const startGame = () => {
        if (grid) {
            startMusic();
            dispatch({ type: 'start', grid, randomValues: createGameSetupRandomValues() });
        }
    };
    const goHome = () => dispatch({ type: 'goHome' });

    const options = {
        preferences,
        colors,
        difficulty: game.difficulty,
        solidWalls: game.solidWalls,
        onDifficultyChange: (difficulty: typeof game.difficulty) => dispatch({ type: 'setDifficulty', difficulty }),
        onWallModeChange: setWallMode,
        onThemeChange: setTheme,
        onSoundsChange: setSoundsEnabled,
        onMusicChange: setMusicEnabled,
        onHapticsChange: setHapticsEnabled,
    };

    if (!game.hasStarted && !game.isGameOver) {
        return (
            <View style={styles.homeRoot}>
                <SafeAreaView pointerEvents="none" style={styles.measurementContainer}>
                    <Header
                        isPaused={false}
                        pauseGame={pauseGame}
                        reloadGame={reloadGame}
                        width={grid ? getBoardSize(grid).width : undefined}
                        showGameControls={false}
                        colors={colors}
                    >
                        <Text style={[styles.scoreText, { color: colors.primary }]}>Score: 0</Text>
                    </Header>
                    <GameBoard
                        game={game}
                        grid={grid}
                        colors={colors}
                        onLayout={onBoardLayout}
                    />
                </SafeAreaView>
                <HomeScreen
                    bestScore={bestScore}
                    onStart={startGame}
                    {...options}
                />
            </View>
        );
    }

    return (
        <GestureDetector gesture={pan}>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
                <Header
                    isPaused={game.isPaused}
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}
                    width={grid ? getBoardSize(grid).width : undefined}
                    showGameControls={game.hasStarted && !game.isGameOver}
                    colors={colors}
                >
                    <Text style={[styles.scoreText, { color: colors.primary }]}>
                        Score: {game.score}{'\n'}Best: {bestScore}
                    </Text>
                </Header>
                <GameBoard
                    game={game}
                    grid={grid}
                    colors={colors}
                    onLayout={onBoardLayout}
                />
                {isGameOver && (
                    <GameStatusOverlay
                        mode="gameOver"
                        score={game.score}
                        colors={colors}
                        onRestart={reloadGame}
                        onHome={goHome}
                        onResume={pauseGame}
                    />
                )}
                {isPaused && !isGameOver && (
                    <GameStatusOverlay
                        mode="paused"
                        score={game.score}
                        colors={colors}
                        onRestart={reloadGame}
                        onHome={goHome}
                        onResume={pauseGame}
                    />
                )}
            </SafeAreaView>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    homeRoot: { flex: 1 },
    measurementContainer: { ...StyleSheet.absoluteFill, opacity: 0 },
    container: {
        flex: 1,
    },
    scoreText: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
