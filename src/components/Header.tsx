import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeColors } from '../style/colors';
import ClayPressable from './ClayPressable';

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
    width?: number;
    showGameControls: boolean;
    colors: ThemeColors;
}

export default function Header({
    children,
    reloadGame,
    pauseGame,
    isPaused,
    width,
    showGameControls,
    colors,
}: HeaderProps): JSX.Element {
    return (
        <View style={[
            styles.container,
            { backgroundColor: colors.background, shadowColor: colors.primary, borderColor: `${colors.primary}18` },
            width ? { width, alignSelf: 'center' } : null,
        ]}>
            <View style={styles.actions}>
                {showGameControls && (
                    <>
                        <ClayPressable
                            colors={colors}
                            accessibilityRole="button"
                            accessibilityLabel="Restart game"
                            onPress={reloadGame}
                            style={styles.iconButton}
                        >
                            <Ionicons name="reload" size={20} color={colors.primary} />
                        </ClayPressable>
                        <ClayPressable
                            colors={colors}
                            accessibilityRole="button"
                            accessibilityLabel={isPaused ? 'Resume game' : 'Pause game'}
                            onPress={pauseGame}
                            style={styles.iconButton}
                        >
                            <Ionicons name={isPaused ? 'play' : 'pause'} size={20} color={colors.primary} />
                        </ClayPressable>
                    </>
                )}
            </View>
             <View style={[styles.scoreBadge, { backgroundColor: `${colors.secondary}55`, borderColor: `${colors.primary}18` }]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 5,
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 5,
    },
    actions: { flexDirection: 'row', gap: 10 },
    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreBadge: {
        minHeight: 40,
        minWidth: 132,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        paddingVertical: 9
    },
});
