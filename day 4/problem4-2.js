import { readFileSync } from 'fs';

const searchSpace = [];

readFileSync('problem4.in', 'utf-8').split('\n').forEach((val, i) => {
    searchSpace[i] = val.split('');
});

function findSammas() {
    let sum = 0;
    for (let i = 1; i < searchSpace.length - 1; i++) {
        for (let j = 1; j < searchSpace[0].length - 1; j++) {
            if (
                searchSpace[i][j] === "A" && (
                    (
                        (searchSpace[i + 1][j + 1] === "M" && searchSpace[i - 1][j - 1] === "S") ||
                        (searchSpace[i + 1][j + 1] === "S" && searchSpace[i - 1][j - 1] === "M")
                    ) && (
                        (searchSpace[i + 1][j - 1] === "M" && searchSpace[i - 1][j + 1] === "S") ||
                        (searchSpace[i + 1][j - 1] === "S" && searchSpace[i - 1][j + 1] === "M")
                    )
                )
            ) {
                sum++;
            }
        }
    }
    return sum;
}

console.log(findSammas());