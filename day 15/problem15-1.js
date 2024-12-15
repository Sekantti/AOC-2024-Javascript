import { readFileSync } from 'fs';

const map = []
readFileSync('problem15-map.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('');
});

const directions = readFileSync('problem15-moves.in', 'utf-8').split('').filter(char => char.trim() !== '')

const initialPosition = []
map.forEach((row) => {
    row.find((position) => {
        if (position === '@') {
            initialPosition[0] = map.indexOf(row)
            initialPosition[1] = row.indexOf(position);
        }
    })
});

function directionMove(directionSymbol) {
    const direction = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    }

    return direction[directionSymbol]
}

function nextNonBox([x, y], direction, map) {
    const [dx, dy] = directionMove(direction)

    for (let i = 1; i < map.length; i++) {
        const [newX, newY] = [x + i * dx, y + i * dy];
        if (map[newX][newY] === '#') {
            return [null, null];
        }
        if (map[newX][newY] === '.') {
            return [newX, newY]
        }
    }

    return [null, null];
}

function move(position, direction, map) {
    const [x, y] = position;
    const [dx, dy] = directionMove(direction);
    const [newX, newY] = nextNonBox(position, direction, map)
    if (newX !== null) {
        if (Math.abs(x - newX + y - newY) === 1) {
            map[x][y] = '.'
            map[newX][newY] = '@'
            return [newX, newY]
        }
        map[x][y] = '.'
        map[x + dx][y + dy] = '@'
        map[newX][newY] = 'O'
        return [x + dx, y + dy]
    }

    return [x, y]
}

function mapCalculator(position, directions, inputMap) {
    const map = structuredClone(inputMap);
    let newPosition = position

    for (let i = 0; i < directions.length; i++) {
        newPosition = move(newPosition, directions[i], map)
    }

    return map;
}

function solve(position, directions, map) {
    const newMap = mapCalculator(position, directions, map)
    const boxPositions = []

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[0].length; j++) {
            if (newMap[i][j] === 'O') {
                boxPositions.push([i, j])
            }
        }
    }

    return boxPositions.map((position) => {
        return position[0] * 100 + position[1]
    }).reduce((l, r) => l + r)
}

console.log(solve(initialPosition, directions, map))