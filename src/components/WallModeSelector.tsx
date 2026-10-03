import React, { JSX } from 'react';
import { Switch, View, StyleSheet } from 'react-native';
import { ThemeColors } from '../style/colors';

interface WallModeSelectorProps {
    solidWalls: boolean;
    colors: ThemeColors;
    onChange: (solidWalls: boolean) => void;
}

export default function WallModeSelector({ solidWalls, colors, onChange }: WallModeSelectorProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Switch
                accessibilityLabel="Solid walls"
                accessibilityHint="Turn off to wrap through the edges"
                value={solidWalls}
                onValueChange={onChange}
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={colors.background}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
