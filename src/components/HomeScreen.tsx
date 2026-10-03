import React, { JSX, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsDialog from './SettingsDialog';
import { GameOptionsProps } from './GameOptions';
import ClayPressable from './ClayPressable';

interface HomeScreenProps extends GameOptionsProps {
    bestScore: number;
    onStart: () => void;
}

export default function HomeScreen({
    bestScore,
    colors,
    preferences,
    onStart,
    ...options
}: HomeScreenProps): JSX.Element {
    const [settingsVisible, setSettingsVisible] = useState(false);

    return (
        <ImageBackground
            source={require('../../assets/home-screen-art.png')}
            resizeMode="cover"
            imageStyle={styles.backgroundImage}
            style={styles.background}
            accessibilityLabel="Illustration of a friendly snake and fruit in a garden"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.topRow}>
                        <View style={[styles.bestBadge, { backgroundColor: 'rgba(255,255,255,0.78)', shadowColor: colors.primary }]}>
                            <Text style={[styles.eyebrow, { color: colors.primary }]}>SNAKE GARDEN</Text>
                            <Text style={[styles.bestScore, { color: colors.primary }]}>Best: {bestScore}</Text>
                        </View>
                        <ClayPressable
                            accessibilityRole="button"
                            accessibilityLabel="Open settings"
                            onPress={() => setSettingsVisible(true)}
                            colors={colors}
                            backgroundColor="rgba(255,255,255,0.92)"
                            radius={27}
                            style={styles.settingsButton}
                        >
                            <Ionicons name="settings-outline" size={25} color={colors.primary} />
                        </ClayPressable>
                    </View>

                    <View style={styles.bottomContent}>
                        <View style={styles.titlePlate}>
                            <Text style={[styles.title, { color: colors.primary }]}>Snake</Text>
                            <Text style={[styles.subtitle, { color: colors.primary }]}>A little garden adventure</Text>
                        </View>
                        <View style={[styles.controlsCard, { backgroundColor: 'rgba(255,255,255,0.9)', shadowColor: colors.primary }]}>
                            <ClayPressable
                                accessibilityRole="button"
                                onPress={onStart}
                                colors={colors}
                                backgroundColor={colors.primary}
                                radius={21}
                                style={styles.startButton}
                            >
                                <Ionicons name="play" size={20} color={colors.background} />
                                <Text style={[styles.startText, { color: colors.background }]}>Start playing</Text>
                            </ClayPressable>
                            <Text style={[styles.settingsHint, { color: colors.primary }]}>Choose your game style in settings</Text>
                        </View>
                    </View>
                </View>
                <SettingsDialog
                    visible={settingsVisible}
                    onClose={() => setSettingsVisible(false)}
                    colors={colors}
                    preferences={preferences}
                    {...options}
                />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#365314' },
    backgroundImage: { width: '100%', height: '100%' },
    safeArea: { flex: 1, backgroundColor: 'transparent' },
    container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    bestBadge: { borderRadius: 18, paddingHorizontal: 15, paddingVertical: 9, shadowOffset: { width: 4, height: 5 }, shadowOpacity: 0.22, shadowRadius: 8, elevation: 5 },
    eyebrow: { fontSize: 12, letterSpacing: 2, fontWeight: '900' },
    bestScore: { fontSize: 14, fontWeight: '700', marginTop: 2 },
    settingsButton: { width: 56, height: 56 },
    bottomContent: { gap: 12 },
    titlePlate: { alignSelf: 'flex-start', paddingHorizontal: 17, paddingVertical: 10, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', borderTopWidth: 1, borderLeftWidth: 1, borderColor: 'rgba(255,255,255,0.95)', shadowColor: '#26340f', shadowOffset: { width: 4, height: 6 }, shadowOpacity: 0.2, shadowRadius: 9, elevation: 5 },
    title: { fontSize: 38, fontWeight: '900', lineHeight: 42 },
    subtitle: { fontSize: 13, fontWeight: '700' },
    controlsCard: { borderRadius: 26, padding: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,0.92)', shadowOffset: { width: 7, height: 9 }, shadowOpacity: 0.25, shadowRadius: 14, elevation: 8 },
    startButton: { minHeight: 62, paddingHorizontal: 18, flexDirection: 'row', gap: 9 },
    startText: { fontSize: 18, fontWeight: '900' },
    settingsHint: { fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 9, opacity: 0.78 },
});
