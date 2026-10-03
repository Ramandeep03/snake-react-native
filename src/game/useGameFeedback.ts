import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Direction } from '../types/types';
import { useGamePreferences } from '../preferences/GamePreferencesProvider';

export const useGameFeedback = (
    score: number,
    isGameOver: boolean,
    direction: Direction,
    hasStarted: boolean,
): void => {
    const { preferences } = useGamePreferences();
    const foodPlayer = useAudioPlayer(require('../../assets/audio/food.wav'));
    const gameOverPlayer = useAudioPlayer(require('../../assets/audio/game-over.wav'));
    const turnPlayer = useAudioPlayer(require('../../assets/audio/turn.wav'));
    const previousScore = useRef(score);
    const previousGameOver = useRef(isGameOver);
    const previousDirection = useRef(direction);
    const previousStarted = useRef(hasStarted);

    useEffect(() => {
        // AudioPlayer exposes volume as a mutable playback control.
        // eslint-disable-next-line react-hooks/immutability
        foodPlayer.volume = 0.9;
        // eslint-disable-next-line react-hooks/immutability
        gameOverPlayer.volume = 0.9;
        // eslint-disable-next-line react-hooks/immutability
        turnPlayer.volume = 0.6;
    }, [foodPlayer, gameOverPlayer, turnPlayer]);

    useEffect(() => {
        const ateFood = score > previousScore.current;
        const justLost = isGameOver && !previousGameOver.current;
        const turned = hasStarted && previousStarted.current && direction !== previousDirection.current;

        if (ateFood && preferences.soundsEnabled) {
            void foodPlayer.seekTo(0).then(() => foodPlayer.play()).catch(() => undefined);
        }
        if (justLost && preferences.soundsEnabled) {
            void gameOverPlayer.seekTo(0).then(() => gameOverPlayer.play()).catch(() => undefined);
        }
        if (turned && preferences.soundsEnabled) {
            void turnPlayer.seekTo(0).then(() => turnPlayer.play()).catch(() => undefined);
        }
        if (ateFood && preferences.hapticsEnabled) {
            const feedback = Platform.OS === 'android'
                ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick)
                : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            void feedback.catch(() => undefined);
        }
        if (justLost && preferences.hapticsEnabled) {
            const feedback = Platform.OS === 'android'
                ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Reject)
                : Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            void feedback.catch(() => undefined);
        }

        previousScore.current = score;
        previousGameOver.current = isGameOver;
        previousDirection.current = direction;
        previousStarted.current = hasStarted;
    }, [
        foodPlayer,
        gameOverPlayer,
        hasStarted,
        isGameOver,
        direction,
        preferences.hapticsEnabled,
        preferences.soundsEnabled,
        score,
        turnPlayer,
    ]);
};
