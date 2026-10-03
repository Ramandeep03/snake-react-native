import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeName } from '../style/colors';

export interface GamePreferences {
    theme: ThemeName;
    soundsEnabled: boolean;
    musicEnabled: boolean;
    hapticsEnabled: boolean;
}

export const DEFAULT_GAME_PREFERENCES: GamePreferences = {
    theme: 'forest',
    soundsEnabled: true,
    musicEnabled: true,
    hapticsEnabled: true,
};

const PREFERENCES_KEY = 'snake.gamePreferences.v1';
const VALID_THEMES: ThemeName[] = ['forest', 'ocean', 'sunset'];
let pendingPreferenceWrite: Promise<void> = Promise.resolve();

export const loadGamePreferences = async (): Promise<GamePreferences> => {
    try {
        const storedPreferences = await AsyncStorage.getItem(PREFERENCES_KEY);
        if (!storedPreferences) {
            return DEFAULT_GAME_PREFERENCES;
        }

        const parsed: unknown = JSON.parse(storedPreferences);
        if (!parsed || typeof parsed !== 'object') {
            return DEFAULT_GAME_PREFERENCES;
        }

        const value = parsed as Partial<GamePreferences>;
        return {
            theme: VALID_THEMES.includes(value.theme as ThemeName)
                ? value.theme as ThemeName
                : DEFAULT_GAME_PREFERENCES.theme,
            soundsEnabled: typeof value.soundsEnabled === 'boolean'
                ? value.soundsEnabled
                : DEFAULT_GAME_PREFERENCES.soundsEnabled,
            musicEnabled: typeof value.musicEnabled === 'boolean'
                ? value.musicEnabled
                : DEFAULT_GAME_PREFERENCES.musicEnabled,
            hapticsEnabled: typeof value.hapticsEnabled === 'boolean'
                ? value.hapticsEnabled
                : DEFAULT_GAME_PREFERENCES.hapticsEnabled,
        };
    } catch {
        return DEFAULT_GAME_PREFERENCES;
    }
};

export const saveGamePreferences = (preferences: GamePreferences): Promise<void> => {
    pendingPreferenceWrite = pendingPreferenceWrite
        .then(() => AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)))
        .catch(() => undefined);
    return pendingPreferenceWrite;
};
