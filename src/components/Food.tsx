import { Text, StyleSheet } from 'react-native'
import React, { JSX } from 'react'
import { Coordinate } from '../types/types'

interface FoodProps extends Coordinate {
    cellSize: number;
    emoji: string;
}

export default function Food({ x, y, cellSize, emoji }: FoodProps): JSX.Element {
    const emojiBoxSize = cellSize * 1.5;
    const emojiOffset = (emojiBoxSize - cellSize) / 2;

    return (
        <Text style={[styles.food, {
            top: y * cellSize - emojiOffset,
            left: x * cellSize - emojiOffset,
            width: emojiBoxSize,
            height: emojiBoxSize,
            fontSize: cellSize * 1.3,
            lineHeight: emojiBoxSize,
            textAlign: 'center',
            textAlignVertical: 'center',
        }]}>
            {emoji}
        </Text>
    )
}

const styles = StyleSheet.create({
    food: {
        position: "absolute"
    }
})
