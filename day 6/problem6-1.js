import { readFileSync } from 'fs';

const searchSpaceGlobal = [];

readFileSync('problem6-example.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpaceGlobal[i] = val.split('');
});

const guardPositionInitial = [];
searchSpaceGlobal.forEach((val) => {
    val.find((direction) => {
        if (['^', '>', 'v', '<'].includes(direction)) {
            guardPositionInitial[0] = searchSpaceGlobal.indexOf(val)
            guardPositionInitial[1] = val.indexOf(direction);
        }
    })
});
const guardOrientationInitial = searchSpaceGlobal[guardPositionInitial[0]][guardPositionInitial[1]];

function obstaclePresence(position, direction, searchSpace) { //this function works as expected
    const obstacleUp = searchSpace[position[0] - 1][position[1]] === '#'
    const obstacleLeft = searchSpace[position[0]][position[1] - 1] === '#';
    const obstacleDown = searchSpace[position[0] + 1][position[1]] === '#';
    const obstacleRight = searchSpace[position[0]][position[1] + 1] === '#'
    if (obstacleDown && obstacleLeft && obstacleRight && obstacleUp) {
        return "surrounded";
    }
    return (direction === '^' && obstacleUp) || (direction === '>' && obstacleRight) || (direction === 'v' && obstacleDown) || (direction === '<' && obstacleLeft);
}

function changeDirection(direction) { //this function works as expected
    if (direction === '^') {
        return '>';
    }
    if (direction === '>') {
        return 'v';
    }
    if (direction === 'v') {
        return '<'
    }
    if (direction === '<') {
        return '^'
    }
}

function move(position, direction) { //this function works as expected
    if (direction === '^') {
        return [position[0] - 1, position[1]];
    }
    if (direction === '>') {
        return [position[0], position[1] + 1];
    }
    if (direction === 'v') {
        return [position[0] + 1, position[1]];
    }
    if (direction === '<') {
        return [position[0], position[1] - 1];
    }
}

function guardExitingMap(position, orientation, searchSpace) { //this function works as expected
    return ((orientation === '^' && position[0] === 0) ||
        (orientation === '>' && position[1] === searchSpace[0].length - 1) ||
        (orientation === 'v' && position[0] === searchSpace.length - 1) ||
        (orientation === '<' && position[1] === 0)
    );
}

function recursiveMove(position, direction, searchSpace) {
    if (!obstaclePresence(position, direction, searchSpace)) {
        return [move(position, direction), direction];
    }
    return recursiveMove(position, changeDirection(direction), searchSpace);
}

function guardRoute() {
    let searchSpace = searchSpaceGlobal;
    let guardPosition = guardPositionInitial;
    let guardOrientation = guardOrientationInitial;
    while (true) {
        searchSpace[guardPosition[0]][guardPosition[1]] = 'X';
        if (guardExitingMap(guardPosition, guardOrientation, searchSpace)) {
            break;
        }
        if (obstaclePresence(guardPosition, guardOrientation, searchSpace) === 'surrounded') {
            break;
        }
        const newPosition = recursiveMove(guardPosition, guardOrientation, searchSpace);
        guardPosition = newPosition[0];
        guardOrientation = newPosition[1];
    }
    return searchSpace.flat().filter((char) => char === 'X').length;
}

console.log(guardRoute());