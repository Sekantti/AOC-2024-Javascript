import { readFileSync } from 'fs';

const searchSpaceGlbl = [];

readFileSync('problem8.in', 'utf-8').split('\n').forEach((row, i) => {
    searchSpaceGlbl[i] = row.split('');
});

const antennas = searchSpaceGlbl.flat().filter((element) => element !== '.').filter((element, i, antennas) => antennas.indexOf(element) === i);
const indices = antennas.map((antenna) => {
    return searchSpaceGlbl.flatMap((row, i) =>
        row.flatMap((element, j) => (element === antenna ? [[i, j]] : [])))
});

function addAntinode(pair, set) {
    const key = pair + ""
    if (!set.has(key)) {
        set.add(key);
    }
}

function inbounds(node, searchSpace) {
    return node[0] >= 0 && node[1] >= 0 && node[0] < searchSpace.length && node[1] < searchSpace.length;
}

function newAntinode(i, j, node) {
    return [node[0] + i, node[1] + j];
}

function findAntinodes() {
    const antinodes = new Set();
    const searchSpace = searchSpaceGlbl;
    indices.forEach((antenna) => {
        antenna.forEach((location) => {
            for (let i = 0; i < antenna.length; i++) {
                if (location + "" !== antenna[i] + "") {
                    const distance = [location[0] - antenna[i][0], location[1] - antenna[i][1]]
                    const antinode = newAntinode(distance[0], distance[1], location)
                    if (inbounds(antinode, searchSpace)) {
                        addAntinode(antinode, antinodes);
                    }
                }
            }
        })
    })
    return antinodes;
}

console.log(findAntinodes().size)