import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeColors } from '../style/colors';
import ClayPressable from './ClayPressable';

interface GameStatusOverlayProps {
    mode: 'paused' | 'gameOver';
    score: number;
    colors: ThemeColors;
    onRestart: () => void;
    onHome: () => void;
    onResume: () => void;
}

export default function GameStatusOverlay({
    mode,
    score,
    colors,
    onRestart,
    onHome,
    onResume,
}: GameStatusOverlayProps): JSX.Element {
    const isPaused = mode === 'paused';

    return (
        <View style={[styles.overlay, { backgroundColor: `${colors.primary}B8` }]}>
            <View style={[styles.card, { backgroundColor: colors.background, shadowColor: colors.primary, borderColor: `${colors.primary}22` }]}>
                <Text style={[styles.emoji, { color: colors.tertiary }]}>{isPaused ? '⏸️' : '🍎'}</Text>
                <Text style={[styles.title, { color: colors.primary }]}>{isPaused ? 'PAUSED' : 'GAME OVER'}</Text>
                {!isPaused && (
                    <Text style={[styles.finalScore, { color: colors.primary }]}>Score: {score}</Text>
                )}
                {isPaused ? (
                    <ClayPressable
                        accessibilityRole="button"
                        onPress={onResume}
                        colors={colors}
                        backgroundColor={colors.primary}
                        style={styles.primaryButton}
                    >
                        <Text style={[styles.primaryText, { color: colors.background }]}>Resume</Text>
                    </ClayPressable>
                ) : (
                    <ClayPressable
                        accessibilityRole="button"
                        onPress={onRestart}
                        colors={colors}
                        backgroundColor={colors.primary}
                        style={styles.primaryButton}
                    >
                        <Text style={[styles.primaryText, { color: colors.background }]}>Play again</Text>
                    </ClayPressable>
                )}
                {!isPaused && (
                    <ClayPressable accessibilityRole="button" onPress={onHome} colors={colors} style={styles.homeButton}>
                        <Text style={[styles.homeText, { color: colors.primary }]}>Home</Text>
                    </ClayPressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 30,
        shadowOffset: { width: 8, height: 10 },
        shadowOpacity: 0.28,
        shadowRadius: 18,
        elevation: 12,
    },
    emoji: { fontSize: 44, marginBottom: 5 },
    title: { fontSize: 46, lineHeight: 54, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
    finalScore: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 22 },
    primaryButton: { minWidth: 190, minHeight: 58, paddingHorizontal: 22, borderRadius: 20 },
    primaryText: { fontSize: 18, fontWeight: '900' },
    homeButton: { minWidth: 120, marginTop: 14, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 16 },
    homeText: { fontSize: 16, fontWeight: '800' },
});
