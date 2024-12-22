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

function insert(location, direction, cost, previous) {
    pq.push([cost, location, direction, previous])
}

function priority_pop() {
    pq.sort((a, b) => { return b[0] - a[0]})
    const [cost, location, direction, previous] = pq.pop()
    return [location, direction, cost, previous]
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

function getPaths(location, direction, map) {
    insert(location, direction, 0, null);

    const origins = {}
    origins[location, direction] = {cost: 0, origin: [null]}
    while (true) {
        let popped = priority_pop();
        const [[x, y], [dx, dy], cost, previous] = popped;
        if ([[x,y], [dx, dy]] in origins) {
            if (origins[[[x,y], [dx, dy]]].cost >= cost) {
                origins[[[x,y], [dx, dy]]].origin.push(previous)
            }
            continue;
        }

        if (map[x][y] === '#') {
            continue;
        }
        origins[[[x,y], [dx,dy]]] = {cost: cost, origin: [previous]};

        if (map[x][y] === 'E') {
            return [origins, [[x, y], [dx, dy]]]
        }

        const [dxa, dya] = turnAntiClockwise([dx, dy])
        const [dxc, dyc] = turnClockwise([dx, dy])
        insert([x+dx, y+dy], [dx, dy], cost + 1, [[x, y], [dx, dy]])
        insert([x+dxc, y+dyc], [dxc, dyc], cost + 1001, [[x, y], [dx, dy]])
        insert([x+dxa, y+dya], [dxa, dya], cost + 1001, [[x, y], [dx, dy]])
    }
}

function uniqueNodes(input, current, end, seen) { 
    if (current === end) {
        return true;
    }
    const nodes = input[current].origin;
    if (nodes.length === 0) {
        return false;
    }

    for (let node of nodes) {
        const canReachEnd = uniqueNodes(input, node, end, seen) 
        if (canReachEnd) {
            seen[current[0]] = true
        }
    }
    return current[0] in seen;
}

function countNodes(initialPosition, direction, map) {
    const paths = getPaths(initialPosition, direction, map)
    const seen = {}
    uniqueNodes(paths[0], paths[1], null, seen);

    return Object.keys(seen).length
}

console.log(countNodes(initialPosition, [0, 1], map))