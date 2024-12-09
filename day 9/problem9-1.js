import { readFileSync } from 'fs';

const file = readFileSync('problem9.in', 'utf-8').split('').map((num) => parseInt(num))

//const file = [1, 2, 3, 4, 5]

function oddOrEven(x) {
    return (x & 1) ? "odd" : "even";
}

const fileAsBlocks = file.map((num, index) => {
    if (oddOrEven(index) === 'even') {
        return Array(num).fill(index/2)
    }
    if (oddOrEven(index) === 'odd') {
        return Array(num).fill('.')
    }
}).flat();

const numberEntries = fileAsBlocks.filter((element) => element !== '.').length

for (let i = fileAsBlocks.length -1; i >= numberEntries; i--) {
    if (fileAsBlocks[i] !== '.') {
        for (let j = 0; j < fileAsBlocks.length -1; j++) {
            if (fileAsBlocks[j] === '.') {
                fileAsBlocks[j] = fileAsBlocks[i];
                fileAsBlocks[i] = '.';
                break;
            }
        }
    }
}

let checkSum = 0;

for (let i = 0; i < numberEntries; i++) {
    checkSum += fileAsBlocks[i]*i
}

console.log(checkSum)