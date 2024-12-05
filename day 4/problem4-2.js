import { readFileSync } from 'fs';

const filePath = 'problem4.in';

const content = [];

readFileSync(filePath, 'utf-8').split('\n').forEach((val, i) => {
    content[i] = val.split('');
});

const columns = content.length;
const rows = content[0].length;
let sum = 0;

for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
        if (
            content[i][j] == "A" && (
                (
                    (content[i + 1][j + 1] == "M" && content[i - 1][j - 1] == "S") ||
                    (content[i + 1][j + 1] == "S" && content[i - 1][j - 1] == "M")
                ) && (
                    (content[i + 1][j - 1] == "M" && content[i - 1][j + 1] == "S") ||
                    (content[i + 1][j - 1] == "S" && content[i - 1][j + 1] == "M")
                )
            )
        ) {
            sum++;
        }
    }
}

console.log(sum);