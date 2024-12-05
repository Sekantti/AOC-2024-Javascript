import { readFileSync } from 'fs';

const filePathRules = 'problem5-rules.in';
const filePathUpdates = 'problem5-updates.in'

const rules = readFileSync(filePathRules, 'utf-8').split('\n').map(pages => pages.split('|').map(number => parseInt(number)));
const updates = readFileSync(filePathUpdates, 'utf-8').split('\n').map(pages => pages.split(',').map(number => parseInt(number)));

const rulesNumber = rules.length;
const unorderedUpdates = [];
let pageNumSum = 0;

function isOrdered(arr) {
    for (let i = 0; i < rulesNumber; i++) {
         const firstPageIndex = arr.indexOf(rules[i][0]);
         const secondPageIndex = arr.indexOf(rules[i][1]);
         if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
            return false;
         }
         if (i == rulesNumber -1) {
            return true;
         }
    }
}

updates.forEach((val) => {
    let i = unorderedUpdates.length
    if (!isOrdered(val)) {
        unorderedUpdates[i] = val;
    }
});

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

unorderedUpdates.forEach((val) => {
    while (!isOrdered(val)) {
        for (let i = 0; i < rulesNumber; i++) {
            const firstPageIndex = val.indexOf(rules[i][0]);
            const secondPageIndex = val.indexOf(rules[i][1]);
            if (firstPageIndex != -1 && secondPageIndex != -1 && firstPageIndex > secondPageIndex) {
                arraymove(val, secondPageIndex, firstPageIndex);
                //val.splice(secondPageIndex,1);
                //val.splice(firstPageIndex,0,val[secondPageIndex])
            }
            if (i == rulesNumber-1 && isOrdered(val)) {
                pageNumSum+=val[Math.floor(val.length/2)];
            }
        }
    }
});

console.log(pageNumSum);