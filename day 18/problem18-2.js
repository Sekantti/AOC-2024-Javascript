import { readFileSync } from 'fs';

const bytes = readFileSync('problem18.in', 'utf-8').split('\n').map((row) => {
    return row.split(',')
}).map((row) => row.map((num) => parseInt(num)))

const size = 71 //change to 71 for full input
const end = [size - 1, size - 1]

const map = new Array(size)
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

function isPath(inputMap) {
    const map = structuredClone(inputMap)
    //fillMap(inputMap, bytes, num)
    insert(0, [0, 0])
    map[0][0] = '#'

    while (true) {
        if (queue.length === 0) {
            return false;
        }

        const [steps, [x, y]] = queue.shift()
        if (x === map.length - 1 && y === map[0].length - 1) {
            return true;
        }

        const nextSteps = validMovements([x, y], map)
        nextSteps.forEach(([x, y]) => { map[x][y] = '#'})
        nextSteps.forEach((step) => { insert(steps + 1, step) })
    }
}

function solve(inputMap, bytes, num) {
    let map = fillMap(inputMap, bytes, num)

    for (let i = num; i < bytes.length; i++) {
        const [xB, yB] = bytes[i]
        map[xB][yB] = '#'
        if (!isPath(map)) {
            return [xB, yB]
        }
    }

}

console.log(solve(map, bytes, 1024))