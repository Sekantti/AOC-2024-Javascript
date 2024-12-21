import { readFileSync } from 'fs';

const input = readFileSync('problem17.in', 'utf-8');

const instructions = input.match(/(m: |,)\d/g).map((program) => { return program.match(/\d/g) }).map((program) => { return parseInt(program) })

function iterate(A) {
    let B = A & 7
    B = B ^ 5
    let C = A >> B
    B = B ^ C
    B = B ^ 6

    return B & 7
}

function solve(instructions, A) {
    if (instructions.length === 0) {
        return A
    }
    const clone = structuredClone(instructions)
    const instr = clone.pop()
    for (let i = 0; i < 8; i++) {
        let candidate = A*8 + i
        if (iterate(candidate) === instr) {
            const result = solve(clone, candidate)
            if (result !== false) {
                return result;
            }
        }
    }
    return false; 
}

console.log(solve(instructions, 0))