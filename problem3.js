import { readFileSync } from 'fs';

const filePath = 'problem3.in';

const content = readFileSync(filePath, 'utf-8');

const regexpMul = /mul\(\d{1,3},\d{1,3}\)/;
var multiples = [];
var newContent = content;
const inputLength = content.length;
for (var i = 0; i < inputLength; i++) {
    try {
    multiples[i] = newContent.match(regexpMul)[0];
    newContent = newContent.replace(regexpMul, ".");
    } catch (err) {
        break;
    }
}

const multiplesLength = multiples.length;
const regexpFactors = /\d+/;
var sum = 0;

for (var i = 0; i < multiplesLength; i++) {
    var factor1 = multiples[i].match(regexpFactors)[0];
    multiples[i] = multiples[i].replace(regexpFactors, ".");
    var factor2 = multiples[i].match(regexpFactors)[0];
    sum+=factor1*factor2;
}

console.log(sum);