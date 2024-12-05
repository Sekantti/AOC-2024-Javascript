import { readFileSync } from 'fs';

const filePath = 'problem4.in';

const searchSpace = [];

readFileSync(filePath, 'utf-8').split('\n').forEach((val, i) => {
    searchSpace[i] = val.split('');
});

const columns = searchSpace.length;
const rows = searchSpace[0].length;
let sum = 0;

for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
        if (
            searchSpace[i][j] == "A" && (
                (
                    (searchSpace[i + 1][j + 1] == "M" && searchSpace[i - 1][j - 1] == "S") ||
                    (searchSpace[i + 1][j + 1] == "S" && searchSpace[i - 1][j - 1] == "M")
                ) && (
                    (searchSpace[i + 1][j - 1] == "M" && searchSpace[i - 1][j + 1] == "S") ||
                    (searchSpace[i + 1][j - 1] == "S" && searchSpace[i - 1][j + 1] == "M")
                )
            )
        ) {
            sum++;
        }
    }
}

console.log(sum);