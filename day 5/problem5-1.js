import { readFileSync } from 'fs';

const rules = readFileSync('problem5-rules.in', 'utf-8').split('\n').map(
    pages => pages.split('|').map(number => parseInt(number)));
const updates = readFileSync('problem5-updates.in', 'utf-8').split('\n').map(
    pages => pages.split(',').map(number => parseInt(number)));

const rulesNumber = rules.length;
let pageNumSum = 0;

updates.forEach((val) => {
    for (let i = 0; i < rulesNumber; i++) {
        const firstPageIndex = val.indexOf(rules[i][0]);
        const secondPageIndex = val.indexOf(rules[i][1]);
        if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
            break;
        }
        if (i == rulesNumber - 1) {
            pageNumSum+=val[Math.floor(val.length/2)];
        }
    }
});

console.log(pageNumSum);