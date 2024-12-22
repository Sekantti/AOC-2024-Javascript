import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n').map((value) => parseInt(value));

function nextSecret(secret) {
    const firstSecret = ((secret*64)^secret) & 16777215
    const secondSecret = ((firstSecret >> 5)^firstSecret) & 16777215
    return ((secondSecret*2048)^secondSecret) & 16777215
}

function finalSecrets(input) {
    const result = input.map((secret) => {
        let prev = secret
        for (let i = 0; i < 2000; i++) {
            prev = nextSecret(prev)
            if (i === 1999) {
                return prev;
            }
        }
    }).reduce((l, r) => l + r)

    return result;
}

console.log(finalSecrets(input))