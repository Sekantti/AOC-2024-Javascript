import { readFileSync } from 'fs';

const input = [];
readFileSync('problem7.in', 'utf-8').split('\n').forEach((line, i) => {
    input[i] = line.split(':');
});

const results = input.map(line => line[0]).map(number => parseInt(number));
const equations = input.map(line => line[1].trim().split(' ').map(number => parseInt(number)));

function solve(goal, result, remaining) {
    if (remaining.length == 0) {
        return goal == result;
    }
    const remainingCopy = structuredClone(remaining)
    const next = remainingCopy.shift()
    return solve(goal, result+next, remainingCopy) ||
    solve(goal, result*next, remainingCopy) ||
    solve(goal, parseInt(result+""+next), remainingCopy);
}

const tolerance = results.filter((result, i) => {
    const remainingCopy = structuredClone(equations[i]);
    const next = remainingCopy.shift();
    return solve(result, next, remainingCopy)
}).reduce((l, r) => {return l + r})

console.log(tolerance)