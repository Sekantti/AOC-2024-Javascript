import { readFileSync } from 'fs';

const bytes = readFileSync('problem18-example.in', 'utf-8').split('\n').map((row) => {
    return row.split(',')
}).map((row) => row.map((num) => parseInt(num)))

const size = 7 //change to 71 for full input
const end = [size - 1, size - 1]

const map = new Array(size) //change tp 71 for full input
for (let i = 0; i < size; i++) {
    map[i] = new Array(size);
    for (let j = 0; j < size; j++) {
        map[i][j] = '.'
    }
}

function prettyPrint(twoDarray) {
    return twoDarray.map((row) => row.join('')).join('\n')
}

function fillMap(inputMap, bytes, num) {
    const map = structuredClone(inputMap)

    for (let i = 0; i < num; i++) {
        //console.log(i)
        const [x, y] = bytes[i]
        map[x][y] = '#'
    }

    return map;
}

const queue = [] //will contain elements of the form [steps, position]

function insert(steps, position) {
    queue.push([steps, position])
}

function validMovements([x, y], map) {
    const moves = []
    if (x - 1 >= 0 && map[x - 1][y] !== '#') {
        moves.push([x - 1, y])
    }
    if (y - 1 >= 0 && map[x][y - 1] !== '#') {
        moves.push([x, y - 1])
    }
    if (x + 1 < map.length && map[x + 1][y] !== '#') {
        moves.push([x + 1, y])
    }
    if (y + 1 < map[0].length && map[x][y + 1] !== '#') {
        moves.push([x, y + 1])
    }

    return moves
}

function solve(inputMap, bytes, num) {
    const map = fillMap(inputMap, bytes, num)
    insert(0, [0, 0])
    map[0][0] = '#'

    while (true) {
        const [steps, [x, y]] = queue.shift()

        if (x === map.length - 1 && y === map[0].length - 1) {
            return steps;
        }

        const nextSteps = validMovements([x, y], map)
        nextSteps.forEach(([x, y]) => { map[x][y] = '#'})
        nextSteps.forEach((step) => { insert(steps + 1, step) })
    }
}

console.log(solve(map, bytes, bytes.length))