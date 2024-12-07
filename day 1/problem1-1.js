import { readFileSync } from 'fs';

const lists = [[], []];
readFileSync('problem1.in', 'utf-8').split('\n').map(
    pair => pair.split("   ").map(num => parseInt(num))).forEach((pair,i) => {
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

const sum = lists[0].map((value, index) => [value, lists[1][index]]).map((pair) => {
    return Math.abs(pair[0]-pair[1]);
}).reduce((l, r) => {return l + r});

console.log(sum)