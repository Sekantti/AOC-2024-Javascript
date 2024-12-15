import { readFileSync } from 'fs';

const input = readFileSync('problem14.in', 'utf-8');

const regexpPositions = /p(.+?) /g //matches any number of characters delimeted by p and a space
const regexpVelocities = /v(.+?)(\n|$)/g //matches any number of characters delimited by v and a new line or end of string

const positions = input.match(regexpPositions).map((string) => { //finds all occurrences of regexpPositions in input
    //and returns them as array, from which the digits are extracted with regexp, and which are then parsed to int
    return string.match(/\d+(,| )/g)
}).map((position) => {
    return position.map((coordinate) => {
        return parseInt(coordinate)
    })
})
const velocities = input.match(regexpVelocities).map((string) => { //finds all occurrence of regexpVelocities in input
    //and returns them as array, from which the digits are extracted with regexp, and which are then parsed to int
    return string.match(/-?\d+(,|\n|$)/g)
}).map((position) => {
    return position.map((coordinate) => {
        return parseInt(coordinate)
    })
})

function wrap(position, areaSize) { //takes input position and returns it to the patrol area, if out of bounds
    //only checks if the input is out of bounds and too small, because this function is only ever called after modulus
    //so it should never end up with a number that is out of bounds and too large
    if (position < 0) {
        return position + areaSize;
    }
    return position
}

function move(position, velocity, areaSize) { //calculates a new position, based on starting position and velocity
    const newPosition = []
    newPosition[0] = wrap((position[0] + velocity[0]) % areaSize[0], areaSize[0])
    newPosition[1] = wrap((position[1] + velocity[1]) % areaSize[1], areaSize[1])
    //modulo ensures that if position gets too big, it is returned to the patrol area. Since javascript has negative
    //modulus, the wrap function makes sure the robot gets back in the patrol area
    return newPosition
}

function finalRobotPosition(position, velocity, areaSize, seconds) { 
    let newPosition = position
    for (let second = 0; second < seconds; second++) {
        newPosition = move(newPosition, velocity, areaSize)
    }
    return newPosition
} //finds eventual position of a specific robot based on starting position, velocity, size of patrol area, and number of seconds

function finalRobotPositionsAll(positions, velocities, areaSize, seconds) {
    const finalPositions = []
    for (let index = 0; index < positions.length; index++) {
        finalPositions[index] = finalRobotPosition(positions[index], velocities[index], areaSize, seconds)
    }

    return finalPositions
}
//finds eventual positions of all robots, after input number of seconds

function quadrantScores(positions, velocities, areaSize, seconds) {
    const finalPositions = finalRobotPositionsAll(positions, velocities, areaSize, seconds)
    const halfHeight = (areaSize[0]-1)/2
    const halfWidth = (areaSize[1]-1)/2
    //the area size is always odd, and the given area size is implicitly (like array length) 1 larger than the
    //largest index of the search space, and for the purposes of robot positioning in quadrants, the middle index
    //is ignored. So if the height is 7, the first three indices 0, 1, 2 make up the top quadrants
    //and the last three indices 4, 5, 6 make up the bottom quadrants. Thus, anything with an index smaller than 3
    //is in the top quadrants, and anything with an index larger than it is in the bottom quadrants. Therefore,
    //by subtracting 1 from the areaSize in a given direction and diviging that by 2, we get the index we must
    //use as our dividing line.
    let Q1 = 0
    let Q2 = 0
    let Q3 = 0
    let Q4 = 0

    //I assume the quadrants to be Q1 is top left, Q4 is bottom right, but it doesn't actually matter if I got
    //the maths for that right here, because you eventually multiply all the scores together
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