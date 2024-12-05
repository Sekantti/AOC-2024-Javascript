import { readFileSync } from 'fs';

const rules = readFileSync('problem5-rules.in', 'utf-8').split('\n').map(
    pages => pages.split('|').map(number => parseInt(number)));
const updates = readFileSync('problem5-updates.in', 'utf-8').split('\n').map(
    pages => pages.split(',').map(number => parseInt(number)));

let pageNumSum = 0;

updates.forEach((val) => {
    for (let rule of rules) {
        const firstPageIndex = val.indexOf(rule[0]);
        const secondPageIndex = val.indexOf(rule[1]);
        if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
            return;
        }
    }
    pageNumSum+=val[Math.floor(val.length/2)];
});

console.log(pageNumSum);