import React, { JSX, ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { ThemeColors } from '../style/colors';

interface ClayPressableProps extends Omit<PressableProps, 'style' | 'children'> {
    colors: ThemeColors;
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
    backgroundColor?: string;
    radius?: number;
}

export default function ClayPressable({
    colors,
    children,
    style,
    backgroundColor = colors.background,
    radius = 18,
    ...pressableProps
}: ClayPressableProps): JSX.Element {
    return (
        <Pressable
            {...pressableProps}
            style={({ pressed }) => [
                styles.base,
                {
                    backgroundColor,
                    borderRadius: radius,
                    borderTopColor: 'rgba(255,255,255,0.72)',
                    borderLeftColor: 'rgba(255,255,255,0.55)',
                    borderBottomColor: `${colors.primary}30`,
                    borderRightColor: `${colors.primary}20`,
                    shadowColor: colors.primary,
                },
                pressed && styles.pressed,
                style,
            ]}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.18,
        shadowRadius: 7,
        elevation: 4,
    },
    pressed: {
        transform: [{ scale: 0.98 }, { translateY: 1 }],
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 2 },
        elevation: 1,
    },
});
