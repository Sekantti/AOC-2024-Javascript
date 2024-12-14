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

function imagePrettier(image) {
    return image.map((row) => { return row.join('') }).join('\n')
}

function robotVisualizer(positions, velocities, areaSize, seconds) {
    const emptyImage = Array.from({ length: areaSize[0] }, () => Array.from({ length: areaSize[1] }, () => '.'));
    let newPositions = []

    for (let i = 0; i < seconds; i++) {
        const newImage = structuredClone(emptyImage)
        i === 0 ? newPositions = positions : newPositions = robotPositions(newPositions, velocities, areaSize)
        for (let position of newPositions) {
            newImage[position[0]][position[1]] = 'X'
        }

        writer.write(imagePrettier(newImage) + '\n' + "iteration is " + i + '\n' + '\n');

    }
}

robotVisualizer(positions, velocities, [101, 103], 10000) //after this is run, go into .txt file and ctrf+F
// XXXXXXXXXXXXX (or some similar long uninterrupted chain of X)

//the solution is to go into the .txt output, and ctrl+f "XXXXXXXXXXXXXXXXX" (or something like that)