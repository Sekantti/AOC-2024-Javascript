import { readFileSync } from 'fs';

const searchSpaceGlobal = [];

readFileSync('problem6.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpaceGlobal[i] = val.split('');
});

const orientations = ['^', '>', 'v', '<'];

const guardPositionInitial = [];
searchSpaceGlobal.forEach((val) => {
    val.find((direction) => {
        if (orientations.indexOf(direction) != -1) {
            guardPositionInitial[0] = searchSpaceGlobal.indexOf(val)
            guardPositionInitial[1] = val.indexOf(direction);
        }
    })
});
const guardOrientationInitial = searchSpaceGlobal[guardPositionInitial[0]][guardPositionInitial[1]];

function createKey(position, direction) {
    return `${position[0]},${position[1]}:${direction}`;
}

// Function to add an entry
function addEntry(locations, position, direction) {
    const key = createKey(position, direction);
    locations[key] = true; // Store the entry
}

// Function to check if an entry exists
function hasEntry(locations, position, direction) {
    const key = createKey(position, direction);
    return key in locations;
}

function obstaclePresence(i, j, direction, searchSpace) { //this function works as expected
    return ((direction == '^' && searchSpace[i - 1][j] == '#') ||
        (direction == '>' && searchSpace[i][j + 1] == '#') ||
        (direction == 'v' && searchSpace[i + 1][j] == '#') ||
        (direction == '<' && searchSpace[i][j - 1] == '#'))
}

function changeDirection(direction) { //this function works as expected
    if (direction == '^') {
        return '>';
    }
    if (direction == '>') {
        return 'v';
    }
    if (direction == 'v') {
        return '<'
    }
    if (direction == '<') {
        return '^'
    }
    console.log("oh no wat");
}

function move(i, j, direction) { //this function works as expected
    if (direction == '^') {
        return [i - 1, j];
    }
    if (direction == '>') {
        return [i, j + 1];
    }
    if (direction == 'v') {
        return [i + 1, j];
    }
    if (direction == '<') {
        return [i, j - 1];
    }
}

function guardExitingMap(i, j, orientation) { //this function works as expected
    return ((orientation == '^' && i == 0) ||
        (orientation == '>' && j == searchSpaceGlobal[0].length - 1) ||
        (orientation == 'v' && i == searchSpaceGlobal.length - 1) ||
        (orientation == '<' && j == 0)
    );
}

function canFinish(searchSpace, guardPosition, guardOrientation) {
    const locations = {};
    // console.log(searchSpace);
    while (true) {
        if (guardExitingMap(guardPosition[0], guardPosition[1], guardOrientation)) {
            return true;
        }
        if (obstaclePresence(guardPosition[0], guardPosition[1], guardOrientation, searchSpace)) {
            guardOrientation = changeDirection(guardOrientation);
        }
        guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
        if (hasEntry(locations, guardPosition, guardOrientation)) {
            return false;
        }
        addEntry(locations, guardPosition, guardOrientation);
    }
}

function guardRoute() {
    let possiblePositions = 0;
    for (let i = 0; i < searchSpaceGlobal.length; i++) {
        for (let j = 0; j < searchSpaceGlobal[0].length; j++) {
            if (searchSpaceGlobal[i][j] == '.') {
                let searchSpace = structuredClone(searchSpaceGlobal);
                let guardPosition = structuredClone(guardPositionInitial);
                let guardOrientation = guardOrientationInitial;
                searchSpace[i][j] = '#';
                if (!canFinish(searchSpace, guardPosition, guardOrientation)) {
                    possiblePositions++;
                }
            }
        }
    }
    return possiblePositions;
}

console.log(guardRoute());
// console.log(canFinish(searchSpaceGlobal, guardPositionInitial, guardOrientationInitial));