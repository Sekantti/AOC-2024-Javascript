import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n\n');

const keys = input
    .filter((string) => string.charAt(0) === '.')
    .map((key) => key.split('\n').map((line) => line.split('')));

const transposedKeys = keys.map((array) => {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
});

const locks = input
    .filter((string) => string.charAt(0) === '#')
    .map((key) => key.split('\n').map((line) => line.split('')));

const transposedLocks = locks.map((array) => {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
});

const tumblerLengths = []

transposedLocks.forEach((lock, index) => {
    tumblerLengths[index] = [
        lock[0].filter((char) => char === '#').length,
        lock[1].filter((char) => char === '#').length,
        lock[2].filter((char) => char === '#').length,
        lock[3].filter((char) => char === '#').length,
        lock[4].filter((char) => char === '#').length,
    ]
})

const keyShapes = []

transposedKeys.forEach((key, index) => {
    keyShapes[index] = [
        key[0].filter((char) => char === '#').length,
        key[1].filter((char) => char === '#').length,
        key[2].filter((char) => char === '#').length,
        key[3].filter((char) => char === '#').length,
        key[4].filter((char) => char === '#').length,
    ]
})

function keyFit(key, lock) {
    return key[0]+lock[0] <= 7 &&
    key[1]+lock[1] <= 7 &&
    key[2]+lock[2] <= 7 &&
    key[3]+lock[3] <= 7 &&
    key[4]+lock[4] <= 7
}

function solve(keys, locks) {
    const unique = new Set();

    for (let key of keys) {
        for (let lock of locks) {
            const objectKey = lock.join('') + key.join('');
            if (!unique.has(objectKey) && keyFit(key, lock)) {
                unique.add(objectKey);
            }
        }
    }

    return unique.size;
}

console.log(solve(tumblerLengths, keyShapes))