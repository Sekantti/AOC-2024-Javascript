/*If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone.
(The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.*/

import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11-example.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').flatMap(num => parseInt(num));
});

const stones = input.flat(1)

function findLength(stones, index) {
    const newIndex = index-1.
    if (index === 0) {
        console.log("the index is 0")
        return 1;
    }
    let length = 0;
    for (let i = 0; i < stones.length; i++) {
        //console.log(stones[i])
        if (stones[i] === 0) {
            //console.log("stones[i] is 0 " + 0)
            length += findLength([1], newIndex)
        }
        else if (stones[i].toString().length % 2 === 0) {
            const numStr = stones[i].toString()
            const mid = numStr.length / 2
            const firstHalf = numStr.slice(0, mid)
            const secondHalf = numStr.slice(mid)
            length += findLength([firstHalf, secondHalf].flatMap((num) => { return parseInt(num) }), newIndex)
        }
        else {
            //console.log("neither above condition applies")
            length += findLength([stones[i]*2024], newIndex)
        }
    }
}

console.log(findLength(stones, 3))


/*for (let i = 0; i < 75; i++) {
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] === 0) {
            stones[j] = 1
        }
        else if (stones[j].toString().length % 2 === 0) {
            const numStr = stones[j].toString()
            const mid = numStr.length/2
            const firstHalf = numStr.slice(0, mid)
            const secondHalf = numStr.slice(mid)
            stones[j] = [firstHalf, secondHalf].flatMap((num) => {return parseInt(num)})
        } else {
            stones[j] *= 2024
        }
    }
    stones=stones.flat(1)
}

console.log(stones.length)*/