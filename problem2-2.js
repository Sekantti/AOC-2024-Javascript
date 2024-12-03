import { readFileSync } from 'fs';

const filePath = 'problem2.in';

const content = readFileSync(filePath, 'utf-8');

const reports = content.split('\n').map(levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

var safe = reportsLength;

for (var i = 0; i < reportsLength; i++) {
    const levelsAmount = reports[i].length;
    var variants = [];
    var successes = levelsAmount;
    for (var j = 0; j < levelsAmount; j++) {
        variants[j] = [...reports[i]];
        variants[j].splice(j, 1);
        var increasing = variants[j][0]-variants[j][1] < 0;
        for (var k = 0; k < levelsAmount - 2; k++) {
            var diff = variants[j][k]-variants[j][k+1];
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