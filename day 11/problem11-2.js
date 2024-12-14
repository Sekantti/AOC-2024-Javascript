import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11-example.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').map(num => parseInt(num));
});

const stones = input.flat(1)

function addEntry(element, index, result, results) { //this does what I need
    results[[element, index]] = result
}

function hasEntry(element, index, results) { //this does what I need
    return [element, index] in results;
}

function splitNumber(number) {
    const numStr = number.toString()
    const mid = numStr.length / 2
    const firstHalf = numStr.slice(0, mid)
    const secondHalf = numStr.slice(mid)

    return [parseInt(firstHalf), parseInt(secondHalf)]
}

function findLengthCached(stone, index, cache) {
    if (hasEntry(stone, index, cache)) {
        return cache[[stone, index]]
    }
    const result = findLength(stone, index, cache)
    addEntry(stone, index, result, cache)
    return result
}

function findLength(stone, index, cache) {
    if (index === 0) {
        return 1
    }
    if (stone === 0) {
        return findLengthCached(1, index - 1, cache)
    }
    if (stone.toString().length % 2 === 0) {
        const nextStones = splitNumber(stone)
        const result1 = findLengthCached(nextStones[0], index - 1, cache)
        const result2 = findLengthCached(nextStones[1], index - 1, cache)
        return result1 + result2
    }
    return findLengthCached(stone * 2024, index - 1, cache)
}

function findAllLength(stones, index) {
    const cache = {}
    let length = 0

    for (let stone of stones) {
        length += findLength(stone, index, cache)
    }

    return length
}

console.log(findAllLength(stones, 25))