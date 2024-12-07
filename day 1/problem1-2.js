import { readFileSync } from 'fs';

const lists = [[], []];
readFileSync('problem1.in', 'utf-8').split('\n').map(
    pair => pair.split("   ").map(num => parseInt(num))).forEach((pair, i) => {
        pair.forEach((num, j) => {
            lists[j][i] = num;
        });
    });

const similarity = lists[0].map((value) => {
    return value * lists[1].filter((secondListValue) => {
        return secondListValue == value;
    }).length;
}).reduce((l, r) => { return l + r });

console.log(similarity)