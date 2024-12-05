import { readFileSync } from 'fs';

const filePath = 'problem3.in';

const multiples = (readFileSync(filePath, 'utf-8') + "do()").replace(/\n/g, ".").replace(/don't\(\)(.+?)do\(\)/g, ".").match(/mul\(\d{1,3},\d{1,3}\)/g);

const regexpFactors = /\d+/g;
let sum = 0;

multiples.forEach((val) => {
    let factors = val.match(regexpFactors);
    sum += factors[0]*factors[1];
});

console.log(sum);