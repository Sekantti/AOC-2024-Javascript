import { readFileSync } from 'fs';
import { eventNames } from 'process';

const filePath = 'problem2.in';

const content = readFileSync(filePath, 'utf-8');

const reports = content.split('\n').map(levels => levels.split(" ").map(num => parseInt(num)));

const reportsLength = reports.length;

var safe = reportsLength;

/*for (var i = 0; i < reportsLength; i++) {
    var dampener = 0;
    var levelsAmount = reports[i].length
    for (var j = 0; j < levelsAmount-1; j++) {
        var diff = reports[i][j] - reports[i][j+1];
        var diff1 = reports[i][j] - reports[i][j+1];
        try {
            var diff2 = reports[i][j+1] - reports[i][j+2];
        } catch (err) {
            var diff2 = diff1;
        }
        if (diff == 0 || Math.abs(diff) > 3 || Math.sign(diff1) != Math.sign(diff2)) {
            dampener++;
        }
        if (dampener > 1) {
            safe--;
            break;
        }
    }
}*/

for (var i = 0; i < reportsLength; i++) {
    var dampener = 0;
    var levelsAmount = reports[i].length;
    var increasing = true;
    if (Math.sign(reports[i][0] - reports[i][1]) != Math.sign(reports[i][1] - reports[i][2])) {
        increasing = Math.sign(reports[i][0] - reports[i][1])
        //Math.sign gives -1 or 1 as a result; if reports[i][j] - reports[i][j+1] is negative, then it's increasing
        increasing = reports[i][0] - reports[i][1] < 0;
    }    
    for (var j = 0; j < levelsAmount-1; j++) {
        var diff = reports[i][j] - reports[i][j+1];
        if (diff == 0 || Math.abs(diff) > 3 || increasing != (diff < 0)) {
            dampener++;
        }
        if (dampener > 1) {
            safe--;
            break;
        }
    }
}

console.log(safe);