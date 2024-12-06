import { readFileSync } from 'fs';

const searchSpace = [];

readFileSync('problem6-example.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpace[i] = val.split('');
});

const orientations = ['^', '>', 'v', '<'];

function changeDirection(char) {
    if (char == '^') {
        return '>';
    }
    if (char == '>') {
        return 'v';
    }
    if (char == 'v') {
        return '<'
    }
    if (char == '<') {
        return '^'
    }
}

function move(arr, i, j, direction) {
    if (direction == '^') {
        arr[i][j] = 'X';
        arr[i-1][j] = '^'
    }
}

function guardInMap() {
    let guardInMap = false
    searchSpace.forEach((val) => {
        val.find((direction) => {
            if (orientations.indexOf(direction) != -1) {
                guardInMap = true
            }
        })
    })
    return guardInMap;
}

while (guardInMap()) {
    let guardPosition = [];
    let guardOrientation;
    searchSpace.forEach((val) => {
        val.find((direction) => {
            if (orientations.indexOf(direction) != -1) {
                guardPosition = [searchSpace.indexOf(val), val.indexOf(direction)];
                guardOrientation = orientations[orientations.indexOf(direction)];
            }
        })
    })
    
    /*for (let i = 0; i < searchSpace.length; i++) {
        for (let j = 0; j < searchSpace[0].length; j++) {
            if (orientations.indexOf(searchSpace[i][j]) != -1) {
                if (searchSpace[i][j] == '^') {
                    if (i - 1 >= 0) {
                        if (searchSpace[i - 1][j] == '#') {
                            searchSpace[i][j] == '>';
                        }
                        else {
                            searchSpace[i][j] == 'X';
                            searchSpace[i - 1][j] == '^';
                        }
                    } else {
                        searchSpace[i][j] == 'X';
                    }
                }
                if (searchSpace[i][j] == '>') {
                    if (j + 1 < searchSpace[0].length) {
                        if (searchSpace[i][j + 1] == '#') {
                            searchSpace[i][j] == 'v';
                        }
                        else {
                            searchSpace[i][j] == 'X';
                            searchSpace[i][j + 1] == '>';
                        }
                    } else {
                        searchSpace[i][j] == 'X';
                    }
                }
                if (searchSpace[i][j] == 'v') {
                    if (i + 1 < searchSpace.length) {
                        if (searchSpace[i + 1][j] == '#') {
                            searchSpace[i][j] == '<';
                        }
                        else {
                            searchSpace[i][j] == 'X';
                            searchSpace[i + 1][j] == 'v';
                        }
                    } else {
                        searchSpace[i][j] == 'X';
                    }
                }
                if (searchSpace[i][j] == '<') {
                    if (j - 1 >= 0) {
                        if (searchSpace[i][j - 1] == '#') {
                            searchSpace[i][j] == '^';
                        }
                        else {
                            searchSpace[i][j] == 'X';
                            searchSpace[i][j - 1] == '<';
                        }
                    } else {
                        searchSpace[i][j] == 'X';
                    }
                }
            }
        }
    }*/
}


console.log(searchSpace);