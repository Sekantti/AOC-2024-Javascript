import { readFileSync } from 'fs';

const map = [];

readFileSync('problem10-example.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('').map(num => parseInt(num));
});

const trailheads = map.flatMap((row, i) =>
    row.map((element, j) => (element === 0 ? [i, j] : null))
).filter(item => item !== null);

const endPoints = map.flat().filter((point) => point === 9).length

function validDirections(i, j, map) { //works as expected
    return [[i > 0 ? i - 1 : i, j], [i, j < map[j].length - 1 ? j + 1 : j], [i < map.length - 1 ? i + 1 : i, j], [i, j > 0 ? j - 1 : j]]
}

function validStep(coord1, coord2, map) { //woks as expected
    return map[coord1[0]][coord1[1]] === map[coord2[0]][coord2[1]] - 1
}

function existsValidMovement(directions, coord, map) { //works as expected
    return validStep(coord, directions[0], map) || validStep(coord, directions[1], map) || validStep(coord, directions[2], map) || validStep(coord, directions[3], map)
}

function recursiveMove(coord, map, coordInitial) { // somehow, this can return undefined. I need to figure out why and make it not do that
    let steps = validDirections(coord[0], coord[1], map) // I think the problem is here, this can return undefined, maybe? 
    if (steps === undefined) {
        console.log("steps is undefined") // this never prints, so steps is never undefined
    }
    if (map[coord[0]][coord[1]] === 9) {
        map[coord[0]][coord[1]] = 0
        return 1;
    }
    if (!existsValidMovement(steps, coord, map)) {
        if (coord[0] === coordInitial[0] && coord[1] === coordInitial[1]) {
            return 0;
        }
        map[coord[0]][coord[1]] = 0
        steps = validDirections(coordInitial[0], coordInitial[1], map)
    }
    for (let i = 0; i < 4; i++) {
        if (validStep(coord, steps[i], map)) {
            return recursiveMove(steps[i], map, coordInitial);
        }
    }
}

console.log(trailheads.map((trailhead) => {
    const mapInput = structuredClone(map)
    let score = 0;
    for (let i = 0; i <= endPoints; i++) {
        let move = recursiveMove(trailhead, mapInput, trailhead)
        move === undefined ? score += 0 : score += move
    }
    return score;
}).reduce((l, r) => { return l + r }));