import { readFileSync } from 'fs';

const filePath = 'problem2.in';

const content = readFileSync(filePath, 'utf-8');

const reports = content.split('\n').map(levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

var safe = reportsLength;

for (var i = 0; i < reportsLength; i++) {
    var increasing = reports[i][0] - reports[i][1] < 0;
    var levelsAmount = reports[i].length;
    for (var j = 0; j < levelsAmount-1; j++) {
        var diff = reports[i][j] - reports[i][j+1];
        if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
            safe--;
            break;
        }
    }
}

console.log(safe);