import { readFileSync } from 'fs';

const input = []
readFileSync('problem15-map.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split('');
});

const file = Bun.file("output.txt");
const writer = file.writer();

const map = new Array(input.length)
for (let i = 0; i < input.length; i++) {
    map[i] = new Array(input[i].length);
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] === '#') {
            map[i][j] = ['#', '#']
        }
        if (input[i][j] === 'O') {
            map[i][j] = ['[', ']']
        }
        if (input[i][j] === '.') {
            map[i][j] = ['.', '.']
        }
        if (input[i][j] === '@') {
            map[i][j] = ['@', '.']
        }
    }
    map[i] = map[i].flat()
}

const directions = readFileSync('problem15-moves.in', 'utf-8').split('').filter(char => char.trim() !== '')

const initialPosition = []
map.forEach((row) => {
    row.find((position) => {
        if (position === '@') {
            initialPosition[0] = map.indexOf(row)
            initialPosition[1] = row.indexOf(position);
        }
    })
});

function directionMove(directionSymbol) {
    const direction = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    }

    return direction[directionSymbol]
}

function canMove([x, y], [dx, dy], map) {
    const [newX, newY] = [x + dx, y + dy]
    if (map[newX][newY] === '.') {
        return true;
    }
    if (map[newX][newY] === '#') {
        return false;
    }
    if (map[newX][newY] === ']' && dy === 0) {
        return canMove([newX, newY], [dx, dy], map) && canMove([newX, newY - 1], [dx, dy], map)
    }
    if (map[newX][newY] === '[' && dy === 0) {
        return canMove([newX, newY], [dx, dy], map) && canMove([newX, newY + 1], [dx, dy], map)
    }
    return canMove([newX, newY], [dx, dy], map)
} //seems to work

function moveBoxes([x, y], [dx, dy], map) {
    const [newX, newY] = [x + dx, y + dy]
    if (dx === 0) {
        if (map[newX][newY] !== '.') {
            moveBoxes([newX, newY], [dx, dy], map);
        }
        map[newX][newY] = map[x][y]
        map[x][y] = '.'
        return;
    }

    if (map[newX][newY] === ']') {
        moveBoxes([newX, newY], [dx, dy], map);
        moveBoxes([newX, newY - 1], [dx, dy], map)
    }
    if (map[newX][newY] === '[') {
        moveBoxes([newX, newY], [dx, dy], map);
        moveBoxes([newX, newY + 1], [dx, dy], map)
    }
    map[newX][newY] = map[x][y]
    map[x][y] = '.'
    return;
} //seems to be (finally) working

function move([x, y], direction, map) {
    const [dx, dy] = directionMove(direction);
    if (!canMove([x, y], [dx, dy], map)) {
        return [x, y];
    }
    const [newX, newY] = [x+dx, y+dy]
    if (map[newX][newY] !== '.') {
        moveBoxes([x, y], [dx, dy], map)
    }
    map[newX][newY] = '@'
    map[x][y] = '.'

    return [newX, newY]
}

function mapCalculator(position, directions, inputMap) {
    const map = structuredClone(inputMap);
    let newPosition = position

    for (let i = 0; i < directions.length; i++) {
        newPosition = move(newPosition, directions[i], map)
    }

    return map;
}

function solve(position, directions, map) {
    const newMap = mapCalculator(position, directions, map)
    const boxPositions = []

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[0].length; j++) {
            if (newMap[i][j] === '[') {
                boxPositions.push([i, j])
            }
        }
    }

    return boxPositions.map((position) => {
        return position[0] * 100 + position[1]
    }).reduce((l, r) => l + r)
}

console.log(solve(initialPosition, directions, map))