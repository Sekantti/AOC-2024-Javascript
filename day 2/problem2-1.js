import { readFileSync } from 'fs';

const reports = readFileSync('problem2.in', 'utf-8').split('\n').map(
    levels => levels.split(" ").map(num => parseInt(num)));

console.log(reports.length - reports.filter((report) => {
    let increasing = report[0] - report[1] < 0;
    for (let i = 0; i < report.length-1; i++) {
        let diff = report[i] - report[i+1];
        if (diff === 0 || Math.abs(diff) > 3 || increasing !== (diff < 0)) {
            return true;
        }
    }
}).length)