import { readFileSync } from 'fs';

const map = [];

readFileSync('problem10.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('').map(num => parseInt(num));
});

const trailheads = map.flatMap((row, i) =>
    row.flatMap((element, j) => (element === 0 ? [[i, j]] : []))
)

function validMoves(i, j, map) {
    const movements = []
    i > 0 && map[i-1][j] - map[i][j] === 1 && movements.push([i-1, j]);
    j < map[i].length-1 && map[i][j+1] - map[i][j] === 1 && movements.push([i, j+1]);
    i < map.length-1 && map[i+1][j] - map[i][j] === 1 && movements.push([i+1, j])
    j > 0 && map[i][j-1] - map[i][j] === 1 && movements.push([i, j-1])
    return movements
}

function countReachablePeaks(coord, map) {
    const moves = validMoves(coord[0], coord[1], map)
    if (map[coord[0]][coord[1]] === 9) {
        map[coord[0]][coord[1]] = -1
        return 1;
    }
    if (moves.length === 0) {
        return 0;
    }
    return moves.map((move) => {
        return countReachablePeaks(move, map);
    }).reduce((l, r) => { return l + r })
}

console.log(trailheads.map((trailhead) => {
    const mapInput = structuredClone(map)
    return countReachablePeaks(trailhead, mapInput);
}).reduce((l, r) => { return l + r }));