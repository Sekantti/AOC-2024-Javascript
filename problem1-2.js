import { readFileSync } from 'fs';

const filePath = 'problem1.in';

const content = readFileSync(filePath, 'utf-8');

const lists = [[], []];
content.split('\n').map(pair => pair.split("   ").map(num => parseInt(num))).forEach((pair,i) => {
    pair.forEach((num, j) => {
        lists[j][i] = num;
    });
});

var similarity = 0;

lists[0].forEach(value => {
    var multiplier = 0;
    lists[1].forEach(otherValue => {
        if (value == otherValue) {
            multiplier++;
        }
    });
    similarity += value * multiplier;
});

console.log(similarity);