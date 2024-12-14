import { readFileSync } from 'fs';

const input = readFileSync('problem14.in', 'utf-8');

const regexpPositions = /p(.+?) /g
const regexpVelocities = /v(.+?)(\n|$)/g

const file = Bun.file("output.txt");
const writer = file.writer();

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

function robotPositions(positions, velocities, areaSize) {
    const newPositions = []
    for (let index = 0; index < positions.length; index++) {
        newPositions[index] = move(positions[index], velocities[index], areaSize)
    }

    return newPositions
}

function calculateMedian(positions) {
    const xMed = positions.map((position) => position[0]).reduce((a, b) => a + b, 0)/positions.length;
    const yMed = positions.map((position) => position[1]).reduce((a, b) => a + b, 0)/positions.length;
    
    return [xMed, yMed];
}

function calculateDistance(position, median) {
    return (position[0]- median[0])**2 + (position[1]-median[1])**2
}

function calculateClusteredness(positions) {
    const median = calculateMedian(positions)
    return positions.map((position) => {
        return calculateDistance(position, median)
    }).reduce((l, r) => l + r)
}

function findGreatestClusterdness(positions, velocities, areaSize, seconds) {
    let newPositions = positions
    let clusterdness = calculateClusteredness(positions)
    let index = 0

    for (let second = 1; second <= seconds; second++) {
        newPositions = robotPositions(newPositions, velocities, areaSize)
        const nextClusterdness = calculateClusteredness(newPositions)
        if (nextClusterdness < clusterdness) {
            index = second
            clusterdness = nextClusterdness
        }
    }

    return index
}

console.log(findGreatestClusterdness(positions, velocities, [101, 103], 10000))