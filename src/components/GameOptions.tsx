import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GamePreferences } from '../storage/gamePreferences';
import { ThemeColors, ThemeName } from '../style/colors';
import PreferenceSwitch from './PreferenceSwitch';
import ThemeSelector from './ThemeSelector';
import DifficultySelector from './DifficultySelector';
import WallModeSelector from './WallModeSelector';
import { Difficulty } from '../game/types';

export interface GameOptionsProps {
    preferences: GamePreferences;
    colors: ThemeColors;
    difficulty: Difficulty;
    solidWalls: boolean;
    onDifficultyChange: (difficulty: Difficulty) => void;
    onWallModeChange: (solidWalls: boolean) => void;
    onThemeChange: (theme: ThemeName) => void;
    onSoundsChange: (enabled: boolean) => void;
    onMusicChange: (enabled: boolean) => void;
    onHapticsChange: (enabled: boolean) => void;
}

export default function GameOptions({
    preferences,
    colors,
    difficulty,
    solidWalls,
    onDifficultyChange,
    onWallModeChange,
    onThemeChange,
    onSoundsChange,
    onMusicChange,
    onHapticsChange,
}: GameOptionsProps): JSX.Element {
    return (
        <View style={styles.container}>
            <DifficultySelector value={difficulty} colors={colors} onChange={onDifficultyChange} />

            <ThemeSelector value={preferences.theme} colors={colors} onChange={onThemeChange} />
            <View style={[styles.wallCard, {
                backgroundColor: colors.background,
                borderTopColor: 'rgba(255,255,255,0.9)',
                borderLeftColor: 'rgba(255,255,255,0.75)',
                borderBottomColor: `${colors.primary}28`,
                borderRightColor: `${colors.primary}18`,
                shadowColor: colors.primary,
            }]}>
                <View style={styles.wallCopy}>
                    <Text style={[styles.wallTitle, { color: colors.primary }]}>World edges</Text>
                    <Text style={[styles.wallHint, { color: colors.primary }]}>
                        {solidWalls ? 'Touching an edge ends the run' : 'Pass through and wrap around'}
                    </Text>
                </View>
                <WallModeSelector solidWalls={solidWalls} colors={colors} onChange={onWallModeChange} />
            </View>
            <PreferenceSwitch
                label="Sound effects"
                value={preferences.soundsEnabled}
                colors={colors}
                onChange={onSoundsChange}
            />
            <PreferenceSwitch
                label="Music"
                value={preferences.musicEnabled}
                colors={colors}
                onChange={onMusicChange}
            />
            <PreferenceSwitch
                label="Haptic feedback"
                value={preferences.hapticsEnabled}
                colors={colors}
                onChange={onHapticsChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 14,
    },
    wallCard: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 4 },
        elevation: 3,
    },
    wallCopy: { flex: 1, paddingRight: 8 },
    wallTitle: { fontSize: 14, fontWeight: '800' },
    wallHint: { fontSize: 11, marginTop: 2, opacity: 0.75 },
});
