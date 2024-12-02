import { readFileSync } from 'fs';
import { eventNames } from 'process';

const filePath = 'problem2.in';

const content = readFileSync(filePath, 'utf-8');

const reports = content.split('\n').map(levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

var safe = reportsLength;

for (var i = 0; i < reportsLength; i++) {
    var levelsAmount = reports[i].length;
    var increasing = true;
    var increasing1 = reports[i][0] - reports[i][1];
    var increasing2 = reports[i][1] - reports[i][2];
    var increasingFinal = reports[i][levelsAmount-2] - reports[i][levelsAmount-1];
    if (Math.sign(increasing1) != Math.sign(increasing2)) {
        if (increasing1*increasingFinal > 0) {
            increasing = increasing1 < 0;
        } else if (increasing2*increasingFinal == 1) {
            increasing = increasing2 < 2;
        }
    } else {
        increasing = reports[i][0] - reports[i][1] < 0;
    }
    for (var j = 0; j < levelsAmount-1; j++) {
        var diff = reports[i][j] - reports[i][j+1];
        if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
            var copy = reports[i];
            copy.splice(j,1);
            console.log(copy);
/*            if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
                safe--;
                break;
            }
*/        }
    }
}

console.log(safe);