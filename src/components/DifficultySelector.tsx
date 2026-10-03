import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Difficulty } from '../game/types';
import { ThemeColors } from '../style/colors';
import ClayPressable from './ClayPressable';

const OPTIONS: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Hard' },
];

interface DifficultySelectorProps {
    value: Difficulty;
    colors: ThemeColors;
    onChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ value, colors, onChange }: DifficultySelectorProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.primary }]}>Speed</Text>
            <View style={styles.options}>
                {OPTIONS.map((option) => {
                    const isSelected = option.value === value;
                    return (
                        <ClayPressable
                            key={option.value}
                            accessibilityRole="button"
                            accessibilityState={{ selected: isSelected }}
                            onPress={() => onChange(option.value)}
                            colors={colors}
                            backgroundColor={isSelected ? colors.primary : colors.background}
                            radius={15}
                            style={styles.option}
                        >
                            <Text style={[
                                styles.optionText,
                                { color: colors.primary },
                                isSelected && { color: colors.background },
                            ]}>
                                {option.label}
                            </Text>
                        </ClayPressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    options: {
        flexDirection: 'row',
        gap: 8,
    },
    option: {
        paddingHorizontal: 14,
        paddingVertical: 9,
    },
    optionText: {
        fontWeight: '600',
    },
});
