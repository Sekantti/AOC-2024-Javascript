import { readFileSync } from 'fs';

const content = [];
readFileSync('problem4.in', 'utf-8').split('\n').forEach((val, i) => {
    content[i] = val.split('');
});

const searchSpaceHorizontal = content.map(subArray => subArray.join(''));
const searchSpaceVertical = content[0].map((_, colIndex) => content.map(row => row[colIndex]).join(''));
const searchSpaceDiagTLBR = []
const searchSpaceDiagBLTR = []
const regeXmas = /xmas/gi;
const samXeger = /samx/gi;

content.map((row, i) => {
    row.map((_, j) => {
        const diagIndex = content[i].length - 1 - j + i;
        searchSpaceDiagTLBR[diagIndex] = (searchSpaceDiagTLBR[diagIndex] || '') + content[i][j];  
    })
});

content.map((row, i) => {
    row.map((_, j) => {
        const diagIndex = i + j;
        searchSpaceDiagBLTR[diagIndex] = (searchSpaceDiagBLTR[diagIndex] || '') + content[i][j];
    })
});

function xmasSum(searchSpace) {
    let sum = 0;
    searchSpace.forEach((row) => {
        row.match(regeXmas) === null ? sum += 0 : sum += row.match(regeXmas).length
        row.match(samXeger) === null ? sum += 0 : sum += row.match(samXeger).length
    });
    return sum;
}

let sum = 0;

sum += xmasSum(searchSpaceHorizontal);
sum += xmasSum(searchSpaceVertical);
sum += xmasSum(searchSpaceDiagBLTR);
sum += xmasSum(searchSpaceDiagTLBR);

console.log(sum);