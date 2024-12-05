import { readFileSync } from 'fs';

const content = [];
readFileSync('problem4.in', 'utf-8').split('\n').forEach((val, i) => {
    content[i] = val.split('');
});

const searchSpaceHorizontal = content.map(subArray => subArray.join(''));
const searchSpaceVertical = content[0].map((_, colIndex) => content.map(row => row[colIndex]).join(''));
const searchSpaceDiagTLBR = [];
const searchSpaceDiagBLTP = [];
const regeXmas = /xmas/gi;
const samXeger = /samx/gi;

for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
        const diagIndex = i + j;
        searchSpaceDiagBLTP[diagIndex] = (searchSpaceDiagBLTP[diagIndex] || '') + content[i][j];
    }
}

for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
        const diagIndex = content[i].length - 1 - j + i;
        searchSpaceDiagTLBR[diagIndex] = (searchSpaceDiagTLBR[diagIndex] || '') + content[i][j];
    }
}

let sum = 0;

function length(array) {
    if (Array.isArray(array)) {
        return array.length;
    } else {
        return 0;
    }
}

function xmasSum(array) {
    let sum = 0;
    array.forEach((subArray) => {
        if (subArray.length >= 4) {
            sum += length(subArray.match(regeXmas));
            sum += length(subArray.match(samXeger));
        }
    });
    return sum;
}

sum += xmasSum(searchSpaceHorizontal);
sum += xmasSum(searchSpaceVertical);
sum += xmasSum(searchSpaceDiagBLTP);
sum += xmasSum(searchSpaceDiagTLBR);

console.log(sum);