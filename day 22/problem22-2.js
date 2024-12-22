import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n').map((value) => parseInt(value));

function nextSecret(secret) {
    const firstSecret = ((secret * 64) ^ secret) & 16777215
    const secondSecret = ((firstSecret >> 5) ^ firstSecret) & 16777215
    return ((secondSecret * 2048) ^ secondSecret) & 16777215
}

function createKey([p1, p2, p3, p4, p5]) {
    return (p2 - p1) + ',' + (p3 - p2) + ',' + (p4 - p3) + ',' + (p5 - p4)
}

function sequenceCalculator(input) {
    const secrets = []
    let prev = input
    secrets[0] = prev
    for (let i = 0; i < 4; i++) {
        prev = nextSecret(prev)
        secrets.push(prev)
    }

    const prices = secrets.map((secret) => { return secret % 10 })
    const key = createKey(prices)

    return [key, prices[4]]
}

function populateSequences(secret, targetNum, sequences) {
    let prev = secret
    const foundKeys = {}

    for (let i = 0; i < targetNum - 4; i++) {
        const [key, price] = sequenceCalculator(prev)
        prev = nextSecret(prev)
        if (key in foundKeys) {
            continue;
        }
        foundKeys[key] = true
        if (key in sequences) {
            sequences[key] += price
        } else {
            sequences[key] = price
        }
    }
}

function solve(input, targetNum) {
    const sequences = {}

    input.forEach((secret) => {
        populateSequences(secret, targetNum, sequences)
    })

    return Math.max(...Object.values(sequences))
}

console.log(solve(input, 2000))