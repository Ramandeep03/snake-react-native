import React, { createContext, JSX, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeColors, ThemeName, THEMES } from '../style/colors';
import {
    DEFAULT_GAME_PREFERENCES,
    GamePreferences,
    loadGamePreferences,
    saveGamePreferences,
} from '../storage/gamePreferences';

interface GamePreferencesContextValue {
    preferences: GamePreferences;
    colors: ThemeColors;
    setTheme: (theme: ThemeName) => void;
    setSoundsEnabled: (enabled: boolean) => void;
    setMusicEnabled: (enabled: boolean) => void;
    setHapticsEnabled: (enabled: boolean) => void;
}

const GamePreferencesContext = createContext<GamePreferencesContextValue | null>(null);

interface GamePreferencesProviderProps {
    children: ReactNode;
}

export function GamePreferencesProvider({ children }: GamePreferencesProviderProps): JSX.Element {
    const [preferences, setPreferences] = useState(DEFAULT_GAME_PREFERENCES);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        loadGamePreferences().then((savedPreferences) => {
            if (isMounted) {
                setPreferences(savedPreferences);
                setIsLoaded(true);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            void saveGamePreferences(preferences);
        }
    }, [isLoaded, preferences]);

    const setTheme = useCallback((theme: ThemeName) => {
        setPreferences((current) => ({ ...current, theme }));
    }, []);
    const setSoundsEnabled = useCallback((soundsEnabled: boolean) => {
        setPreferences((current) => ({ ...current, soundsEnabled }));
    }, []);
    const setMusicEnabled = useCallback((musicEnabled: boolean) => {
        setPreferences((current) => ({ ...current, musicEnabled }));
    }, []);
    const setHapticsEnabled = useCallback((hapticsEnabled: boolean) => {
        setPreferences((current) => ({ ...current, hapticsEnabled }));
    }, []);

    const value = useMemo(() => ({
        preferences,
        colors: THEMES[preferences.theme],
        setTheme,
        setSoundsEnabled,
        setMusicEnabled,
        setHapticsEnabled,
    }), [preferences, setHapticsEnabled, setMusicEnabled, setSoundsEnabled, setTheme]);

    return (
        <GamePreferencesContext.Provider value={value}>
            {children}
        </GamePreferencesContext.Provider>
    );
}

export const useGamePreferences = (): GamePreferencesContextValue => {
    const context = useContext(GamePreferencesContext);
    if (!context) {
        throw new Error('useGamePreferences must be used inside GamePreferencesProvider');
    }
    return context;
};
