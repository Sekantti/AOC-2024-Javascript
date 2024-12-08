import { readFileSync } from 'fs';

const searchSpaceGlobal = [];

readFileSync('problem6.in', 'utf-8').split('\n').forEach((val, i) => {
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

function obstaclePresence(i, j, direction) { //this function works as expected
    return ((direction === '^' && searchSpaceGlobal[i - 1][j] === '#') ||
        (direction === '>' && searchSpaceGlobal[i][j + 1] === '#') ||
        (direction === 'v' && searchSpaceGlobal[i + 1][j] === '#') ||
        (direction === '<' && searchSpaceGlobal[i][j - 1] === '#'))
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

function move(i, j, direction) { //this function works as expected
    if (direction === '^') {
        return [i - 1, j];
    }
    if (direction === '>') {
        return [i, j + 1];
    }
    if (direction === 'v') {
        return [i + 1, j];
    }
    if (direction === '<') {
        return [i, j - 1];
    }
}

function guardExitingMap(i, j, orientation) { //this function works as expected
    return ((orientation === '^' && i === 0) ||
        (orientation === '>' && j === searchSpaceGlobal[0].length - 1) ||
        (orientation === 'v' && i === searchSpaceGlobal.length - 1) ||
        (orientation === '<' && j === 0)
    );
}

function guardRoute() {
    let searchSpace = searchSpaceGlobal;
    let guardPosition = guardPositionInitial;
    let guardOrientation = guardOrientationInitial;
    while (true) {
        searchSpace[guardPosition[0]][guardPosition[1]] = 'X';
        if (guardExitingMap(guardPosition[0], guardPosition[1], guardOrientation)) {
            break;
        } else {
            if (obstaclePresence(guardPosition[0], guardPosition[1], guardOrientation)) {
                guardOrientation = changeDirection(guardOrientation);
            } else {
                guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
            }
        }
    }
    return searchSpace.flat().filter((char) => char === 'X').length;
}

console.log(guardRoute());