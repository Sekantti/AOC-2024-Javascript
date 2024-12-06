import { readFileSync } from 'fs';

const rules = readFileSync('problem5-rules.in', 'utf-8').split('\n').map(
    pages => pages.split('|').map(number => parseInt(number)));
const updates = readFileSync('problem5-updates.in', 'utf-8').split('\n').map(
    pages => pages.split(',').map(number => parseInt(number)));

let pageNumSum = 0;

function isOrdered(arr) {
    for (let rule of rules) {
         const firstPageIndex = arr.indexOf(rule[0]);
         const secondPageIndex = arr.indexOf(rule[1]);
         if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
            return false;
         }
    }
    return true;
}

const unorderedUpdates = updates.filter((list) => { return !isOrdered(list) });

unorderedUpdates.forEach((val) => {
    while (!isOrdered(val)) {
        for (let rule of rules) {
            const firstPageIndex = val.indexOf(rule[0]);
            const secondPageIndex = val.indexOf(rule[1]);
            if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
                let element = val.splice(secondPageIndex,1)[0];
                val.splice(firstPageIndex,0,element);
            }
        }
        if (isOrdered(val)) {
            pageNumSum+=val[Math.floor(val.length/2)];
        }
    }
});

console.log(pageNumSum);