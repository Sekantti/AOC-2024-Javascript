import { readFileSync } from 'fs';

const reports = readFileSync('problem2.in', 'utf-8').split('\n').map(
    levels => levels.split(" ").map(num => parseInt(num)));

let safe = reports.length;

reports.forEach((val) => {
    let increasing = val[0] - val[1] < 0;
    for (let i = 0; i < val.length-1; i++) {
        let diff = val[i] - val[i+1];
        if (diff === 0 || Math.abs(diff) > 3 || increasing !== (diff < 0)) {
            safe--;
            return;
        }
    }
})

/*console.log(reports.map((val) => {
    let increasing = val[0] - val[1] < 0;
    val.filter((element) => {
        
    })
    for (let i = 0; i < val.length-1; i++) {
        let diff = val[i] - val[i+1];
        return !(diff === 0 || Math.abs(diff) > 3 || increasing !== (diff < 0)) 
    }
}));*/

console.log(safe);