import { readFileSync } from 'fs';

const input = readFileSync('problem13-example.in', 'utf-8');

const regexpLocations = /Prize(.+?)(\n|$)/g
const regexpButtonA = /Button A: (.+?)\n/g
const regexpButtonB = /Button B: (.+?)\n/g

const prizes = input.match(regexpLocations).map((string) => {
    return string.match(/\d+/g)
}).map((prize) => {
    return prize.map((coordinate) => {
        return parseInt(coordinate) + 10000000000000
    })
})
const buttonsA = input.match(regexpButtonA).map((string) => {
    return string.match(/\d+/g)
}).map((button)=> {
   return button.map((coordinate) => {
       return parseInt(coordinate)})
})
const buttonsB = input.match(regexpButtonB).map((string) => {
    return string.match(/\d+/g)
}).map((button) => {
    return button.map((coordinate) => {
        return parseInt(coordinate)
    })
})

function solveSimultaneousEquation(prize, buttonA, buttonB) {
    const x = (buttonB[0] * prize[1] - buttonB[1] * prize[0]) / (buttonA[1] * buttonB[0] - buttonA[0] * buttonB[1])
    const y = (buttonA[1] * prize[0] - buttonA[0] * prize[1]) / (buttonA[1] * buttonB[0] - buttonA[0] * buttonB[1])

    return [x, y]
}

function validSolution(solution) {
    return Number.isInteger(solution[0]) && Number.isInteger(solution[1])
}

function getPrizesCost(prizes, buttonsA, buttonsB) {
    const solutions = []

    for (let i = 0; i < prizes.length; i++) {
        if (validSolution(solveSimultaneousEquation(prizes[i], buttonsA[i], buttonsB[i]))) {
            solutions.push(solveSimultaneousEquation(prizes[i], buttonsA[i], buttonsB[i]))
        }
    }
    
    let cost = 0;
    for (let solution of solutions) {
        cost += solution[0]*3 + solution[1]
    }

    return cost
}

console.log(getPrizesCost(prizes, buttonsA, buttonsB))