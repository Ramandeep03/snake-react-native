import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useCallback, useEffect } from 'react';
import { useGamePreferences } from '../preferences/GamePreferencesProvider';

export const useGameMusic = (): (() => void) => {
    const { preferences } = useGamePreferences();
    const player = useAudioPlayer(require('../../assets/audio/happy-loop.mp3'));

    useEffect(() => {
        // AudioPlayer exposes these as mutable playback controls.
        // eslint-disable-next-line react-hooks/immutability
        player.loop = true;
        player.volume = 0.28;
        if (!preferences.musicEnabled) {
            player.pause();
            return;
        }

        let isActive = true;
        void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' })
            .then(() => {
                if (isActive) player.play();
            })
            .catch(() => undefined);
        return () => { isActive = false; };
    }, [player, preferences.musicEnabled]);

    return useCallback(() => {
        if (preferences.musicEnabled) player.play();
    }, [player, preferences.musicEnabled]);
};
