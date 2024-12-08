import { readFileSync } from 'fs';

const reports = readFileSync('problem2.in', 'utf-8').split('\n').map(
    levels => levels.split(" ").map(num => parseInt(num)));

console.log(reports.length - reports.filter((report) => {
    let successes = report.length;
    return report.some((_, i) => {
        let variant = [...report];
        variant.splice(i, 1);
        let increasing = variant[0] - variant[1] < 0;
        for (let j = 0; j < variant.length - 1; j++) {
            let diff = variant[j] - variant[j + 1];
            if (diff === 0 || Math.abs(diff) > 3 || increasing !== (diff < 0)) {
                successes--;
                break;
            }
        }
        return successes === 0;
    });
}).length)