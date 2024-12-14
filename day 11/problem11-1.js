import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11-example.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').map(num => parseInt(num));
});

const stones = input.flat(1)

function splitNumber(number) {
    const numStr = number.toString()
            const mid = numStr.length/2
            const firstHalf = numStr.slice(0, mid)
            const secondHalf = numStr.slice(mid)

    return [parseInt(firstHalf), parseInt(secondHalf)]
}

function findLength(stones, index) { 
    if (index === 0) {
        return stones.length;
    }
    let length = 0;
    for (let stone of stones) {
        if (stone === 0) {
            length += findLength([1], index-1)
        }
        else if (stone.toString().length % 2 === 0) {
            length += findLength(splitNumber(stone), index-1)
        }
        else {
            length += findLength([stone*2024], index-1)
        }
    }
    return length;
}

console.log(findLength(stones, 25))