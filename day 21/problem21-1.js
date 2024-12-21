import { readFileSync } from 'fs';

const dirPad = {
    '7': [-3, 0],
    '8': [-3, 1],
    '9': [-3, 2],
    '4': [-2, 0],
    '5': [-2, 1],
    '6': [-2, 2],
    '1': [-1, 0],
    '2': [-1, 1],
    '3': [-1, 2],
    ' ': [0, 0],
    '0': [0, 1],
    'A': [0, 2],
    '^': [0, 1],
    '<': [1, 0],
    'v': [1, 1],
    '>': [1, 2]
}

const codes = readFileSync('example.in', 'utf-8').split('\n')

function distance([x1, y1], [x2, y2]) {
    return [x1-x2, y1-y2]
}

function nextMove([x1, y1], [x2, y2]) {
    const [x, y] = [x1 - x2, y1  - y2]
    let result1 = ''
    if (x < 0) {
        result1 += 'v'.repeat(-x)
    }
    if (x > 0) {
        result1 += '^'.repeat(x)
    }
    if (y < 0) {
        result1 += '>'.repeat(-y)
    }
    if (y > 0) {
        result1 += '<'.repeat(y)
    }
    let result2 = result1.split('').reverse().join('')+'A'
    result1 += 'A'
    //positive numbers are left and up, negative numbers right and down
    if (x1 === 0 && y2 === 0) {
        return [result1];
    } 
    if (x2 === 0 && y1 === 0) {
        return [result2];
    }
    return [result1, result2];
}

const cache = []

function findShortestPathCached(path, robots) {
    if (path+robots+'' in cache) {
        return cache[path+robots+'']
    }
    const result = findShortestPath(path, robots)
    cache[path+robots+''] = result;
    return result;
}

function findShortestPath(path, robots) {
    if (!path) {
        return Infinity;
    }
    if (robots === 0) {
        return path.length
    }

    const coords = [dirPad['A']]
    coords.push(...path.split('').map((char) => { return dirPad[char]}))
    let result = 0

    for (let i = 0; i < coords.length-1; i++) {
        const nextMoves = nextMove(coords[i], coords[i+1]);
        result += Math.min(findShortestPathCached(nextMoves[0], robots-1), findShortestPathCached(nextMoves[1], robots-1))
    }

    return result;
}

function solve(codes, robots) {
    const pathLengths = codes.map((code) => {
        return findShortestPath(code, robots)
    })

    const values = codes.map((code) => {
        return parseInt(code)
    })

    let result = 0 

    for (let i = 0; i < values.length; i++) {
        result += pathLengths[i]*values[i]
    }

    return result;
}

console.log(solve(codes, 26))