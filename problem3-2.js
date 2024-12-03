import { readFileSync } from 'fs';

const filePath = 'problem3.in';

const content = readFileSync(filePath, 'utf-8');
var multiples = content.replace(/\n/g,".").replace(/don't\(\)(.+?)do\(\)/g,".").match(/mul\(\d{1,3},\d{1,3}\)/g);

const multiplesLength = multiples.length;
const regexpFactors = /\d+/g;
var sum = 0;

for (var i = 0; i < multiplesLength; i++) {
    var factors = multiples[i].match(regexpFactors);
    sum+=factors[0]*factors[1];
}

console.log(sum);