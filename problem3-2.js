import { readFileSync } from 'fs';

const filePath = 'problem3.in';

const content = readFileSync(filePath, 'utf-8') + "do()";
const multiples = content.replace(/\n/g, ".").replace(/don't\(\)(.+?)do\(\)/g, ".").match(/mul\(\d{1,3},\d{1,3}\)/g);

const regexpFactors = /\d+/g;
var sum = 0;

multiples.forEach((val) => {
    var factors = val.match(regexpFactors);
    sum += factors[0]*factors[1];
});

console.log(sum);