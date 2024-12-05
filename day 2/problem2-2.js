import { readFileSync } from 'fs';

const reports = readFileSync('problem2.in', 'utf-8').split('\n').map(
    levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

let safe = reportsLength;

for (let i = 0; i < reportsLength; i++) {
    const levelsAmount = reports[i].length;
    let successes = levelsAmount;
    for (let j = 0; j < levelsAmount; j++) {
        let variant = [...reports[i]];
        variant.splice(j, 1);
        let increasing = variant[0]-variant[1] < 0;
        for (let k = 0; k < levelsAmount - 2; k++) {
            let diff = variant[k]-variant[k+1];
            if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
                successes--;
                break;
            }
        }
        if (successes == 0) {
            safe--;
            break;
        }
    }
}

console.log(safe);