import { readFileSync } from 'fs';

const filePath = 'problem1.in';

const content = readFileSync(filePath, 'utf-8');

const lists = [[], []];
content.split('\n').map(pair => pair.split("   ").map(num => parseInt(num))).forEach((pair,i) => {
    pair.forEach((num, j) => {
        lists[j][i] = num;
    });
});

lists[0].sort(function(a, b) {
    return a - b;
});
lists[1].sort(function(a, b) {
    return a - b;
});

var distance = 0;

lists[0].forEach((value, i) => {
    distance += Math.abs(value - lists[1][i]);
});

console.log(distance);