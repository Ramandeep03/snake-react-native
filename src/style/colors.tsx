export type ThemeName = 'forest' | 'ocean' | 'sunset';

export interface ThemeColors {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
    forest: {
        primary: '#365314',
        secondary: '#84CC16',
        tertiary: '#EAB308',
        background: '#ECFCCB',
    },
    ocean: {
        primary: '#0C4A6E',
        secondary: '#38BDF8',
        tertiary: '#FACC15',
        background: '#E0F2FE',
    },
    sunset: {
        primary: '#9A3412',
        secondary: '#FB923C',
        tertiary: '#DB2777',
        background: '#FFF7ED',
    },
};

export const THEME_LABELS: Record<ThemeName, string> = {
    forest: 'Forest',
    ocean: 'Ocean',
    sunset: 'Sunset',
};

export const Colors = THEMES.forest;
