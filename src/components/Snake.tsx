
import React, { Fragment, JSX, } from 'react'
import { Coordinate } from '../types/types'
import { View, StyleSheet } from 'react-native'

interface SnakeProps {
    snake: Coordinate[],
    cellSize: number,
    color: string,
}
export default function Snake({ snake, cellSize, color }: SnakeProps): JSX.Element {
    return (
        <Fragment>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * cellSize,
                    top: segment.y * cellSize,
                    width: cellSize,
                    height: cellSize,
                    borderRadius: cellSize / 2,
                }
                return <View key={index} style={[style.snake, { backgroundColor: color }, segmentStyle]} />

            })}
        </Fragment>
    )
}

const style = StyleSheet.create({
    snake: {
        position: 'absolute',
    },
})
