import { readFileSync } from 'fs';

const input = [];

readFileSync('problem11-example.in', 'utf-8').split('\n').forEach((row, i) => {
    input[i] = row.split(' ').map(num => parseInt(num));
});

const stones = input.flat(1)

function addEntry(element, index, result, results) { //this does what I need
    results[element + "," + index] = result
}

function hasEntry(element, index, results) { //this does what I need
    return element + "," + index in results;
}

function splitNumber(number) {
    const numStr = number.toString()
    const mid = numStr.length / 2
    const firstHalf = numStr.slice(0, mid)
    const secondHalf = numStr.slice(mid)

    return [parseInt(firstHalf), parseInt(secondHalf)]
}

function next(stone) {
    if (stone === 0) {
        return 1
    }
    if (stone.toString().length % 2 === 0) {
        return splitNumber(stone)
    }
    return stone*2024
}

function findLength(stone, index, results) {
    if (index === 0) {
        return 1
    }
    if (hasEntry(stone, index, results)) {
        return results[stone + "," + index]
    }
    let result = 0
    const nextStone = next(stone)
    if (Array.isArray(nextStone)) {
        const result1 = findLength(nextStone[0], index - 1, results)
        const result2 = findLength(nextStone[1], index - 1, results)
        result = result1 + result2
    } else {
        result = findLength(nextStone, index-1, results)
    }
    addEntry(stone, index, result, results)
    return result
}

function findAllLength(stones, index) {
    const results = {}
    let length = 0

    for (let stone of stones) {
        length += findLength(stone, index, results)
    }

    return length
}

console.log(findAllLength(stones, 25))