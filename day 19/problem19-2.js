import { readFileSync } from 'fs';

const input = readFileSync('problem19.in', 'utf-8');

const patterns = input.split('\n\n')
const available = patterns[0].split(', ')
const desired = patterns[1].split('\n')

const beginsWith = {
    //  white (w), blue (u), black (b), red (r), or green (g)
    'w': available.filter((pattern) => pattern.startsWith('w')),
    'u': available.filter((pattern) => pattern.startsWith('u')),
    'b': available.filter((pattern) => pattern.startsWith('b')),
    'r': available.filter((pattern) => pattern.startsWith('r')),
    'g': available.filter((pattern) => pattern.startsWith('g'))
}

//maybe dfs?
//"Hello".substring(0, 3) returns 'hel'. "Hello".length returns 5 

const cache = {}

//isPossible takes in the desired pattern, and outputs how many ways that pattern can be achieved.
function countPossibleCached(desired) {
    if (desired in cache) {
        return cache[desired];
    }
    const result = countPossible(desired);
    cache[desired] = result;
    return result
}

//isPossible takes in the desired pattern, and outputs how many ways that pattern can be achieved.
function countPossible(desired) {
    if (desired === "") {
        return 1;
    }
    const possibleNext = beginsWith[desired[0]]
    let result = 0;
    for (let next of possibleNext) {
        if (desired.startsWith(next)) {
            result += countPossibleCached(desired.substring(next.length))
        }
    }
    return result;
}


function solve(desired) {
    let result = 0

    desired.forEach((pattern) => {
        result += countPossible(pattern)
    })

    return result
}

console.log(solve(desired, available))