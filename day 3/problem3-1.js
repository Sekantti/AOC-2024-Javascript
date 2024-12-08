import { readFileSync } from 'fs';

const multiples = readFileSync('problem3.in', 'utf-8').match(/mul\(\d{1,3},\d{1,3}\)/g);
const regexpFactors = /\d+/g;

console.log(multiples.map((val) => {
    let factors = val.match(regexpFactors);
    return factors[0] * factors[1]
}).reduce((l, r) => {return l + r}))