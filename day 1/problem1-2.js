import { readFileSync } from 'fs';

const filePath = 'problem1.in';

const lists = [[], []];
readFileSync(filePath, 'utf-8').split('\n').map(pair => pair.split("   ").map(num => parseInt(num))).forEach((pair,i) => {
    pair.forEach((num, j) => {
        lists[j][i] = num;
    });
});

let similarity = 0;

lists[0].forEach(value => {
    let multiplier = 0;
    lists[1].forEach(otherValue => {
        if (value == otherValue) {
            multiplier++;
        }
    });
    similarity += value * multiplier;
});

console.log(similarity);