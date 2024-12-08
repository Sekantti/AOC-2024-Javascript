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

const unorderedUpdates = updates.filter((list) => { return !isOrdered(list) });

unorderedUpdates.filter((list) => { return !isOrdered(list) }).forEach((val) => {
    while (!isOrdered(val)) {
        for (let rule of rules) {
            const firstPageIndex = val.indexOf(rule[0]);
            const secondPageIndex = val.indexOf(rule[1]);
            if (firstPageIndex !== -1 && secondPageIndex !== -1 && firstPageIndex > secondPageIndex) {
                let element = val.splice(secondPageIndex, 1)[0];
                val.splice(firstPageIndex, 0, element);
            }
        }
    }
});

const sum = unorderedUpdates.map((update) => {
    return update[Math.floor(update.length / 2)];
}).reduce((l, r) => { return l + r });

console.log(sum);