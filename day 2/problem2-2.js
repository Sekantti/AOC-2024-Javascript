import { readFileSync } from 'fs';

const reports = readFileSync('problem2.in', 'utf-8').split('\n').map(
    levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

let safe = reportsLength;

reports.forEach((val) => {
    let successes = val.length;
    for (let i = 0; i < val.length; i++) {
        let variant = [...val];
        variant.splice(i, 1);
        let increasing = variant[0] - variant[1] < 0;
        for (let j = 0; j < val.length - 2; j++) {
            let diff = variant[j] - variant[j + 1];
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
});

console.log(safe);