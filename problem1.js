import { readFileSync } from 'fs';

const filePath = 'problem1.in';

const content = readFileSync(filePath, 'utf-8');

//console.log('File content:', content);
//console.log(parseInt(content)); 
//const pairsStr = content.split('\n');

const lists = [[], []];
content.split('\n').map(pair => pair.split("   ").map(num => parseInt(num))).forEach((pair,i) => {
    pair.forEach((num, j) => {
        lists[j][i] = num;
    });
});

//const listLength = lists[0].length

//console.log(list1);
//console.log(list2);
//console.log(pairs);

lists[0].sort(function(a, b) {
    return a - b;
});
lists[1].sort(function(a, b) {
    return a - b;
});

var distance = 0;

/*for (var i = 0; i < listLength; i++) {
    distance += Math.abs(lists[0][i] - lists[1][i]);
}*/

lists[0].forEach((value, i) => {
    distance += Math.abs(value - lists[1][i]);
});

console.log(distance);