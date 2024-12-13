import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11-example.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').flatMap(num => parseInt(num));
});

const stones = input.flat(1)

function findLength(stones, index) {
    if (index === 0) {
        return 1;
    }
    let length = 0;
    for (let i = 0; i < stones.length; i++) {
        if (stones[i] === 0) {
            length += findLength([1], index-1)
        }
        else if (stones[i].toString().length % 2 === 0) {
            const numStr = stones[i].toString()
            const mid = numStr.length / 2
            const firstHalf = numStr.slice(0, mid)
            const secondHalf = numStr.slice(mid)
            length += findLength([firstHalf, secondHalf].flatMap((num) => { return parseInt(num) }), index-1)
        }
        else {
            length += findLength([stones[i]*2024], index-1)
        }
    }
    return length;
}

console.log(findLength(stones, 3))