import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeName, THEMES, THEME_LABELS, ThemeColors } from '../style/colors';
import ClayPressable from './ClayPressable';

interface ThemeSelectorProps {
    value: ThemeName;
    colors: ThemeColors;
    onChange: (theme: ThemeName) => void;
}

export default function ThemeSelector({ value, colors, onChange }: ThemeSelectorProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={[styles.heading, { color: colors.primary }]}>Theme</Text>
            <View style={styles.options}>
                {(Object.keys(THEMES) as ThemeName[]).map((themeName) => {
                    const selected = themeName === value;
                    const optionColors = THEMES[themeName];
                    return (
                        <ClayPressable
                            key={themeName}
                            accessibilityRole="button"
                            accessibilityState={{ selected }}
                            onPress={() => onChange(themeName)}
                            colors={optionColors}
                            backgroundColor={optionColors.background}
                            radius={14}
                            style={selected ? [styles.option, styles.selectedOption] : styles.option}
                        >
                            <View style={[styles.swatch, { backgroundColor: optionColors.secondary }]} />
                            <Text style={[styles.label, { color: optionColors.primary }]}>
                                {THEME_LABELS[themeName]}
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
        marginBottom: 10,
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    options: {
        flexDirection: 'row',
        gap: 8,
    },
    option: {
        minWidth: 74,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 7,
    },
    selectedOption: { borderWidth: 2 },
    swatch: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginBottom: 2,
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
    },
});
