import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').flatMap(num => parseInt(num));
});

let stones = input.flat(1)

for (let i = 0; i < 25; i++) {
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

console.log(stones.length)