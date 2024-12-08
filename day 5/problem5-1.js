import { readFileSync } from 'fs';

const rules = readFileSync('problem5-rules.in', 'utf-8').split('\n').map(
    pages => pages.split('|').map(number => parseInt(number)));
const updates = readFileSync('problem5-updates.in', 'utf-8').split('\n').map(
    pages => pages.split(',').map(number => parseInt(number)));

function isOrdered(update) {
    return !rules.some((rule) => {
        const firstPageIndex = update.indexOf(rule[0]);
        const secondPageIndex = update.indexOf(rule[1]);
        return firstPageIndex !== -1 && secondPageIndex !== -1 && firstPageIndex > secondPageIndex;
    })
}

const sum = updates.filter((update) => {
    return isOrdered(update)
}).map((update) => {
    return update[Math.floor(update.length/2)];
}).reduce((l, r) => {return l + r});

console.log(sum);