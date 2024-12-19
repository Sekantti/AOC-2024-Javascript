/*Every towel at this onsen is marked with a pattern of colored stripes. There are only a few patterns, but for any particular pattern,
the staff can get you as many towels with that pattern as you need. Each stripe can be white (w), blue (u), black (b), red (r), or green (g).
So, a towel with the pattern ggr would have a green stripe, a green stripe, and then a red stripe, in that order. (You can't reverse a
pattern by flipping a towel upside-down, as that would cause the onsen logo to face the wrong way.)

The Official Onsen Branding Expert has produced a list of designs - each a long sequence of stripe colors - that they would like to be able
to display. You can use any towels you want, but all of the towels' stripes must exactly match the desired design. So, to display the
design rgrgr, you could use two rg towels and then an r towel, an rgr towel and then a gr towel, or even a single massive rgrgr towel (assuming
such towel patterns were actually available).

To start, collect together all of the available towel patterns and the list of desired designs (your puzzle input). For example:

r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
The first line indicates the available towel patterns; in this example, the onsen has unlimited towels with a single red stripe (r), unlimited
towels with a white stripe and then a red stripe (wr), and so on.

After the blank line, the remaining lines each describe a design the onsen would like to be able to display. In this example, the first design
(brwrr) indicates that the onsen would like to be able to display a black stripe, a red stripe, a white stripe, and then two red stripes, in that order.

Not all designs will be possible with the available towels. In the above example, the designs are possible or impossible as follows:

brwrr can be made with a br towel, then a wr towel, and then finally an r towel.
bggr can be made with a b towel, two g towels, and then an r towel.
gbbr can be made with a gb towel and then a br towel.
rrbgbr can be made with r, rb, g, and br.
ubwu is impossible.
bwurrg can be made with bwu, r, r, and g.
brgr can be made with br, g, and r.
bbrgwb is impossible.
In this example, 6 of the eight designs are possible with the available towel patterns.

To get into the onsen as soon as possible, consult your list of towel patterns and desired designs carefully. How many designs are possible?*/

//string equality can be checked very simply with ===

import { readFileSync } from 'fs';

const input = readFileSync('problem19-example.in', 'utf-8');

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

//console.log(beginsWith['w']) //works

//console.log(desired)

// const instructions = input.match(/(m: |,)\d/g).map((program) => {return program.match(/\d/g)}).map((program) => {return parseInt(program)})
// const registers = {}

function substringEquals(desiredPattern, partialPattern) { //I hope that this will output true if partialPattern is empty, if the patterns match up to the length
    //of the partial pattern, or if the patterns are the same length and equal and false otherwise
    return desiredPattern.substring(0, partialPattern.length) === partialPattern
}

// console.log(substringEquals("Hello", "Hel")) //outputs true
// console.log(substringEquals("Hello", "Hello")) //outputs true
// console.log(substringEquals("Hello", '')) //outputs true
// console.log(substringEquals("Hello", "Hella")) //outputs false

//maybe dfs?
//"Hello".substring(0, 3) returns 'hel'. "Hello".length returns 5 

const cache = {}

function addEntry(pattern, bool) {
    cache[pattern] = bool;
}

function isPossibleCached(desired, available, pattern) {
    if (cache[desired]) {
        console.log("returning true")
        return true;
    }
    const result = isPossibleDFS(desired, available, pattern)
    addEntry(desired, result)
    return result
}

function isPossibleDFS(desired, available, pattern) {
    if (pattern !== '') {
        if (desired === pattern) {
            console.log(cache)
            return true;
        }
        if (pattern.length > desired.length) {
            console.log("too long")
            return false;
        }
        if (!substringEquals(desired, pattern)) {
            console.log("doesn't equal: " + desired + ', ' + pattern)
            return false;
        }
    }
    //    const I need to input desired[patternendNext]
    const nextPiece = desired.substring(pattern.length, desired.length)
    const possibleNext = beginsWith[nextPiece[0]]
    return possibleNext.map((patternNext) => {
        return isPossibleCached(nextPiece, available, patternNext)
    }).reduce((l, r) => l || r, false)
}

// const string = 'bwgrruub'
// const pattern = 'bwg'
// console.log(string.substring(pattern.length, string.length))

//

//console.log(isPossibleDFS(desired[1], available, ''))

function solveDFS(desired, available) {
    let result = 0

    desired.forEach((pattern) => {
        result += isPossibleDFS(pattern, available, '') ? 1 : 0
    })

    return result
}

//console.log(solveDFS(desired, available))

// function solve(location, direction, map) {
//     insert(location, direction, 0);

//     const seen = {}
//     while (true) {
//         const [[x, y], [dx, dy], cost] = priority_pop()
//         if ([[x,y], [dx, dy]] in seen) {
//             continue;
//         }

//         if (map[x][y] === '#') {
//             continue;
//         }
//         if (map[x][y] === 'E') {
//             return cost
//         }

//         const [dxa, dya] = turnAntiClockwise([dx, dy])
//         const [dxc, dyc] = turnClockwise([dx, dy])
//         insert([x+dx, y+dy], [dx, dy], cost + 1)
//         insert([x+dxc, y+dyc], [dxc, dyc], cost + 1001)
//         insert([x+dxa, y+dya], [dxa, dya], cost + 1001)
//         seen[[[x,y], [dx,dy]]] = cost;
//     }
// }

// function solve(available, desired) {
//     if ()
// }

//this is a good and functional dfs algorithm and it's way too inefficient for the full data.

const queue = []

function isPossibleBFS(desired, available) {
    const possibilties = beginsWith[desired[0]]
    possibilties.forEach((pattern) => queue.push([pattern, 0]))

    while (true) {
        const [nextPattern, start] = possibilties.shift()
        const nextPiece = desired.substring(start, desired.length)

        if (nextPiece !== nextPattern) {
            continue;
        }
        if (start > desired.length) {
            return 0;
        }

        if (nextPattern+start === desired.length && nextPiece === nextPattern) {
            return 1;
        }

        const options = beginsWith[nextPiece[0]]
        options.forEach((option) => {
            queue.push(option, start+option.length)
        })
    }
}

function solveBFS(desired, available) {

}