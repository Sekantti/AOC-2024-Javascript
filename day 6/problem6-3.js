import { readFileSync } from 'fs';

const searchSpace = [];

readFileSync('problem6-example.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpace[i] = val.split('');
});

const orientations = ['^', '>', 'v', '<'];

let guardPosition = [];
let guardOrientation;
searchSpace.forEach((val) => {
    val.find((direction) => {
        if (orientations.indexOf(direction) != -1) {
            guardPosition = [searchSpace.indexOf(val), val.indexOf(direction)];
            guardOrientation = orientations[orientations.indexOf(direction)];
        }
    })
});

// Helper to create a unique key
function createKey(position, direction) {
    return `${position[0]},${position[1]}:${direction}`;
}

// Function to add an entry
function addEntry(locations, position, direction) {
    const key = createKey(position, direction);
    locations[key] = { position, direction }; // Store the entry
}

// Function to check if an entry exists
function hasEntry(locations, position, direction) {
    const key = createKey(position, direction);
    return locations.hasOwnProperty(key);
}

function obstaclePresence(i, j, direction) { //this function works as expected
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
}

function move(i, j, direction) { //this function works as expected
    if (direction == '^') {
        return [i-1, j];
    }
    if (direction == '>') {
        return [i, j+1];
    }
    if (direction == 'v') {
        return [i+1, j];
    }
    if (direction == '<') {
        return [i, j-1];
    }
}

function guardExitingMap(i, j, orientation) { //this function works as expected
    return ((orientation == '^' && i == 0) ||
        (orientation == '>' && j == searchSpace[0].length-1) ||
        (orientation == 'v' && i == searchSpace.length-1) ||
        (orientation == '<' && j == 0)
    );
}

let locations = {}
while (true) {
    
    if (guardExitingMap(guardPosition[0], guardPosition[1], guardOrientation)) {
        console.log(guardPosition + guardOrientation);
        break;
    } else {
        if (obstaclePresence(guardPosition[0], guardPosition[1], guardOrientation)) {
            guardOrientation = changeDirection(guardOrientation);
            guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
        } else {
            guardPosition = move(guardPosition[0], guardPosition[1], guardOrientation);
        }
    }
}