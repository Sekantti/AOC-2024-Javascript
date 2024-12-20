import { readFileSync } from 'fs';

const map = []
readFileSync('data.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('');
});

const initialPosition = []
map.forEach((row) => {
    row.find((position) => {
        if (position === 'S') {
            initialPosition[0] = map.indexOf(row)
            initialPosition[1] = row.indexOf(position);
        }
    })
});

function prettyPrint(map) {
    return map.map((row) => {return row.join('')}).join('\n')
}

function possibleMoves([x, y], map) {
    const moves = [] 
    if (x > 0 && map[x-1][y] !== '#') {
        moves.push([x-1, y])
    }
    if (x < map.length -1 && map[x+1][y] !== '#') {
        moves.push([x+1, y])
    }
    if (y > 0 && map[x][y-1] !== '#') {
        moves.push([x, y-1])
    }
    if (y < map[0].length -1 && map[x][y+1] !== '#') {
        moves.push([x, y+1])
    }

    return moves;
}

function possibleMovesCheat([x, y], map, cheatCounter) {
    const moves = [] 
    if (x > 0 && map[x-1][y] !== '#') {
        moves.push([x-1, y])
    }
    if (x < map.length -1 && map[x+1][y] !== '#') {
        moves.push([x+1, y])
    }
    if (y > 0 && map[x][y-1] !== '#') {
        moves.push([x, y-1])
    }
    if (y < map[0].length -1 && map[x][y+1] !== '#') {
        moves.push([x, y+1])
    }

    return moves;
}

function findShortest(position, map) {
    const queue = []
    queue.push([position, 0])

    while (true) {
        const [[x, y], steps] = queue.shift()

        if (map[x][y] === 'E') {
            return steps
        }

        map[x][y] = '#'
        const moves = possibleMoves([x, y], map)
        moves.forEach((move) => { queue.push([move, steps+1])})
    }
}

function solve(map, initialPosition, difference) {
    let result = 0;
    const target = findShortest(initialPosition, structuredClone(map)) - difference;
    //for now, let's be dumb, and just cut through every possible wall.

    for (let i = 1; i < map.length-1; i++) {
        for (let j = 1; j < map[0].length-1; j++) {
            if (map[i][j] === '#') {
                const newMap = structuredClone(map);
                newMap[i][j] = '.';
                const newPath = findShortest(initialPosition, newMap)
                if (newPath <= target) {
                    result++;
                }
            }
        }
    }

    return result;
}

console.log(solve(map, initialPosition, 100))