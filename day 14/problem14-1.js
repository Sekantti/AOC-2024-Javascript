import { readFileSync } from 'fs';

const input = readFileSync('problem14.in', 'utf-8');

const regexpPositions = /p(.+?) /g
const regexpVelocities = /v(.+?)(\n|$)/g

const positions = input.match(regexpPositions).map((string) => {
    return string.match(/\d+(,| )/g)
}).map((position) => {
    return position.map((coordinate) => {
        return parseInt(coordinate)
    })
})
const velocities = input.match(regexpVelocities).map((string) => {
    return string.match(/-?\d+(,|\n|$)/g)
}).map((position) => {
    return position.map((coordinate) => {
        return parseInt(coordinate)
    })
})

function wrap(position, areaSize) {
    if (position < 0) {
        return position + areaSize;
    }
    return position
}

function move(position, velocity, areaSize) {
    const newPosition = []

    newPosition[0] = wrap((position[0] + velocity[0]) % areaSize[0], areaSize[0])
    newPosition[1] = wrap((position[1] + velocity[1]) % areaSize[1], areaSize[1])

    return newPosition
}

function finalRobotPosition(position, velocity, areaSize, seconds) {
    let newPosition = position
    for (let second = 0; second < seconds; second++) {
        newPosition = move(newPosition, velocity, areaSize)
    }

    return newPosition
}

function finalRobotPositionsAll(positions, velocities, areaSize, seconds) {
    const finalPositions = []
    for (let index = 0; index < positions.length; index++) {
        finalPositions[index] = finalRobotPosition(positions[index], velocities[index], areaSize, seconds)
    }

    return finalPositions
}

function quadrantScores(positions, velocities, areaSize, seconds) {
    const finalPositions = finalRobotPositionsAll(positions, velocities, areaSize, seconds)
    const halfHeight = (areaSize[0]-1)/2
    const halfWidth = (areaSize[1]-1)/2
    let Q1 = 0
    let Q2 = 0
    let Q3 = 0
    let Q4 = 0

    for (let position of finalPositions) {
        if (position[0] < halfHeight && position[1] < halfWidth) {
            Q1++
        }
        if (position[0] < halfHeight && position[1] > halfWidth) {
            Q2++
        }
        if (position[0] > halfHeight && position[1] < halfWidth) {
            Q3++
        }
        if (position[0] > halfHeight && position[1] > halfWidth) {
            Q4++
        }
    }

    return Q1*Q2*Q3*Q4
}

console.log(quadrantScores(positions, velocities, [101, 103], 100))