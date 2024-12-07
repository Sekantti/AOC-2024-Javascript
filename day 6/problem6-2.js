import { readFileSync } from 'fs';

const searchSpace = [];

readFileSync('problem6.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpace[i] = val.split('');
});

const orientations = ['^', '>', 'v', '<'];

let possiblePositions = 0;
let position = [];
let orientation;
searchSpace.forEach((val) => {
    val.find((direction) => {
        if (orientations.indexOf(direction) != -1) {
            position = [searchSpace.indexOf(val), val.indexOf(direction)];
            orientation = orientations[orientations.indexOf(direction)];
        }
    })
});

const guardPositionInitial = position;
const guardOrientationInitial = orientation;
let locations = {};

// Helper to create a unique key
function createKey(position, direction) {
    return `${position[0]},${position[1]}:${direction}`;
}

// Function to add an entry
function addEntry(position, direction) {
    const key = createKey(position, direction);
    locations[key] = { position, direction }; // Store the entry
}

// Function to check if an entry exists
function hasEntry(position, direction) {
    const key = createKey(position, direction);
    return locations.hasOwnProperty(key);
}

function obstaclePresence(i, j, direction) { //this function works as expected
    if ((direction == '^' && searchSpace[i - 1][j] == '#') ||
        (direction == '>' && searchSpace[i][j + 1] == '#') ||
        (direction == 'v' && searchSpace[i + 1][j] == '#') ||
        (direction == '<' && searchSpace[i][j - 1] == '#')) {
        return true;
    } else {
        return false;
    }
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
        (orientation == '>' && j == searchSpace[0].length - 1) ||
        (orientation == 'v' && i == searchSpace.length - 1) ||
        (orientation == '<' && j == 0)
    )
}

console.log(guardPositionInitial + guardOrientationInitial);

for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        let guardPosition = guardPositionInitial;
        let guardOrientation = guardOrientationInitial;
        if (searchSpace[i][j] != '#') {
            searchSpace[i][j] = '#';
            while (true) {
                if (guardExitingMap(guardPosition[0], guardPosition[1], guardOrientation)) {
                    locations = {};
                    searchSpace[i][j] = '.'
                    break;
                }
                if (obstaclePresence(guardPosition[0], guardPosition[1], guardOrientation)) {
                    guardOrientation = changeDirection(guardOrientation);
                    guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
                } else {
                    guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
                }
                if (hasEntry(guardPosition, guardOrientation)) {
                    locations = {};
                    searchSpace[i][j] = '.'
                    possiblePositions++;
                    console.log([i, j])
                    break;
                }
                addEntry(guardPosition, guardOrientation);
            }
        }
    }
}

console.log(possiblePositions);