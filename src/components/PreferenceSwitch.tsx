import React, { JSX } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { ThemeColors } from '../style/colors';

interface PreferenceSwitchProps {
    label: string;
    value: boolean;
    colors: ThemeColors;
    onChange: (value: boolean) => void;
}

export default function PreferenceSwitch({ label, value, colors, onChange }: PreferenceSwitchProps): JSX.Element {
    return (
        <View style={[styles.row, {
            backgroundColor: colors.background,
            borderTopColor: 'rgba(255,255,255,0.9)',
            borderLeftColor: 'rgba(255,255,255,0.75)',
            borderBottomColor: `${colors.primary}28`,
            borderRightColor: `${colors.primary}18`,
            shadowColor: colors.primary,
        }]}>
            <Text style={[styles.label, { color: colors.primary }]}>{label}</Text>
            <Switch
                accessibilityLabel={label}
                value={value}
                onValueChange={onChange}
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={colors.background}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 16,
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});
