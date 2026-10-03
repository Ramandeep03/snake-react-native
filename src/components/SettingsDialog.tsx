import React, { JSX } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import GameOptions, { GameOptionsProps } from './GameOptions';
import { ThemeColors } from '../style/colors';
import ClayPressable from './ClayPressable';

interface SettingsDialogProps extends GameOptionsProps {
    visible: boolean;
    onClose: () => void;
    colors: ThemeColors;
}

export default function SettingsDialog({ visible, onClose, colors, ...options }: SettingsDialogProps): JSX.Element {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <View style={[styles.dialog, { backgroundColor: colors.background }]}>
                    <View style={styles.headingRow}>
                        <Text style={[styles.heading, { color: colors.primary }]}>Settings</Text>
                        <ClayPressable
                            accessibilityRole="button"
                            accessibilityLabel="Close settings"
                            onPress={onClose}
                            colors={colors}
                            radius={16}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={20} color={colors.primary} />
                        </ClayPressable>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <GameOptions {...options} colors={colors} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    dialog: {
        width: '100%',
        maxWidth: 420,
        maxHeight: '80%',
        borderRadius: 28,
        padding: 20,
        borderWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.9)',
        borderLeftColor: 'rgba(255,255,255,0.75)',
        borderBottomColor: 'rgba(0,0,0,0.09)',
        borderRightColor: 'rgba(0,0,0,0.06)',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
    },
    headingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: '800',
    },
    closeButton: { width: 38, height: 38, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.13, shadowRadius: 5, elevation: 3 },
});
