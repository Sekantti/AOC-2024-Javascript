import { readFileSync } from 'fs';

const map = []
readFileSync('problem16.in', 'utf-8').split('\n').forEach((row, i) => {
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

const pq = []

function insert(location, direction, cost) {
    pq.push([cost, location, direction])
}

function priority_pop() {
    pq.sort((a, b) => { return b[0] - a[0]})
    const [cost, location, direction] = pq.pop()
    return [location, direction, cost]
}

function turnClockwise(direction) { //expects direction input as array
    const clockwiseTurn = {
        "-1,0": [0, 1],
        "0,1" : [1, 0],
        "1,0": [0, -1],
        "0,-1" : [-1, 0]

    }
    return clockwiseTurn[direction + '']
}


function turnAntiClockwise(direction) { //expects direction input as array
    const antiClockwiseTurn = {
        "-1,0": [0, -1],
        "0,1" : [-1, 0],
        "1,0": [0, 1],
        "0,-1" : [1, 0]

    }
    return antiClockwiseTurn[direction + '']
}

function solve(location, direction, map) {
    insert(location, direction, 0);

    const seen = {}
    while (true) {
        const [[x, y], [dx, dy], cost] = priority_pop()
        if ([[x,y], [dx, dy]] in seen) {
            continue;
        }

        if (map[x][y] === '#') {
            continue;
        }
        if (map[x][y] === 'E') {
            return cost
        }

        const [dxa, dya] = turnAntiClockwise([dx, dy])
        const [dxc, dyc] = turnClockwise([dx, dy])
        insert([x+dx, y+dy], [dx, dy], cost + 1)
        insert([x+dxc, y+dyc], [dxc, dyc], cost + 1001)
        insert([x+dxa, y+dya], [dxa, dya], cost + 1001)
        seen[[[x,y], [dx,dy]]] = cost;
    }
}

console.log(solve(initialPosition, [0, 1], map))