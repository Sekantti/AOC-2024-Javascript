import { readFileSync } from 'fs';

const filePath = 'problem2.in';

const reports = readFileSync(filePath, 'utf-8').split('\n').map(levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

let safe = reportsLength;

for (let i = 0; i < reportsLength; i++) {
    let increasing = reports[i][0] - reports[i][1] < 0;
    let levelsAmount = reports[i].length;
    for (let j = 0; j < levelsAmount-1; j++) {
        let diff = reports[i][j] - reports[i][j+1];
        if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
            safe--;
            break;
        }
    }
}

console.log(safe);