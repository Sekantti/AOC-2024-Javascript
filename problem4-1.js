import { readFileSync } from 'fs';

const filePath = 'problem4-example.in';

const content = [];
readFileSync(filePath, 'utf-8').split('\n').forEach((val, i) => {
    content[i] = val.split('');
});

const searchSpaceHorizontal = content.map(subArray => subArray.join(''));
const searchSpaceVertical = content[0].map((_, colIndex) => content.map(row => row[colIndex]).join(''));
const searchSpaceDiagTLBR = [];
const searchSpaceDiagBLTP = [];
const regeXmas = /xmas/gi;
const regexSamx = /samx/gi;

for (var i = 0; i < content.length; i++) {
    for (var j = 0; j < content[i].length; j++) {
        const diagIndex = i + j;
        searchSpaceDiagBLTP[diagIndex] = (searchSpaceDiagBLTP[diagIndex] || '') + content[i][j];
    }
}

for (var i = 0; i < content.length; i++) {
    for (var j = 0; j < content[i].length; j++) {
        const diagIndex = content[i].length - 1 - j + i;
        searchSpaceDiagTLBR[diagIndex] = (searchSpaceDiagTLBR[diagIndex] || '') + content[i][j];
    }
}

var sum = 0;

function length(array) {
    if (Array.isArray(array)) {
        return array.length;
    } else {
        return 0;
    }
}

function xmasSum(array) {
    var sum = 0;
    array.forEach((val) => {
        if (val.length >= 4) {
            sum += length(val.match(regeXmas));
            sum += length(val.match(regexSamx));
        }
    });
    return sum;
}

sum += xmasSum(searchSpaceHorizontal);
sum += xmasSum(searchSpaceVertical);
sum += xmasSum(searchSpaceDiagBLTP);
sum += xmasSum(searchSpaceDiagTLBR);

console.log(sum);