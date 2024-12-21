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

function nextMove([x, y], map) {
    if (x > 0 && map[x-1][y] !== '#') {
        return [x-1, y]
    }
    if (x < map.length -1 && map[x+1][y] !== '#') {
        return [x+1, y]
    }
    if (y > 0 && map[x][y-1] !== '#') {
        return [x, y-1]
    }
    if (y < map[0].length -1 && map[x][y+1] !== '#') {
        return [x, y+1]
    }
}

function findPath([x, y], inputMap) {
    const map = structuredClone(inputMap)
    const path = []
    path[0] = {loc: [x, y], dist: 0}
    map[x][y] = '#'
    for (let i = 1; i < map.length*map[0].length; i++) {
        const [newX, newY] = nextMove(path[path.length-1].loc, map)
        path[i] = {loc: [newX, newY], dist: i}
        if (map[newX][newY] === 'E') {
            return path
        }
        map[newX][newY] = '#'
    }
}

function distance([x1, y1], [x2, y2]) {
    return Math.abs(x1-x2)+Math.abs(y1-y2)
}

function calculateCheat(loc1, loc2, targetDist) {
    const [x1, y1] = loc1.loc
    const [x2, y2] = loc2.loc
    const dist = distance([x1, y1], [x2, y2])

    if (dist <= targetDist) {
        return Math.abs(loc1.dist-loc2.dist) - dist
    }

    return false
}

function calculateCheats(initialPosition, map, target, dist) {
    const path = findPath(initialPosition, map)
    let result = 0;

    for (let i = 0; i < path.length; i++) {
        for (let j = i+1; j < path.length; j++) {
            if (calculateCheat(path[i], path[j], dist) >= target) {
                result++
            }
        }
    }

    return result;
}

console.log(calculateCheats(initialPosition, map, 100, 20))