import { readFileSync } from 'fs';

const input = readFileSync('problem13-example.in', 'utf-8');

const regexpLocations = /Prize(.+?)(\n|$)/g
const regexpButtonA = /Button A: (.+?)\n/g
const regexpButtonB = /Button B: (.+?)\n/g

const prizes = input.match(regexpLocations).map((string) => {
    return string.match(/\d+/g)
})//.map((prize) => { return prize + 10000000000000})
const buttonsA = input.match(regexpButtonA).map((string) => {
    return string.match(/\d+/g)
})
const buttonsB = input.match(regexpButtonB).map((string) => {
    return string.match(/\d+/g)
})

console.log(prizes)