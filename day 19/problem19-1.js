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

const cache = {}

function isPossibleCached(desired) {
    if (desired in cache) {
        return cache[desired];
    }
    const result = isPossible(desired);
    cache[desired] = result;
    return result
}

function isPossible(desired) {
    if (desired === "") {
        return true;
    }
    const possibleNext = beginsWith[desired[0]]
    for (let next of possibleNext) {
        if (desired.startsWith(next) && isPossibleCached(desired.substring(next.length))) {
            return true;
        }
    }
    return false;
}

function solve(desired) {
    let result = 0

    desired.forEach((pattern) => {
        result += isPossible(pattern) ? 1 : 0
    })

    return result
}

console.log(solve(desired, available))