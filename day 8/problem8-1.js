import { readFileSync } from 'fs';

const searchSpace = [];

readFileSync('problem8.in', 'utf-8').split('\n').forEach((row, i) => {
    searchSpace[i] = row.split('');
});

const antennas = searchSpace.flat().filter((element) => element !== '.').filter((element, i, antennas) => antennas.indexOf(element) === i);
const antinodes = new Set();

const indices = antennas.map((antenna) => {
    return searchSpace.flatMap((row, i) =>
        row.map((element, j) => (element === antenna ? [i, j] : null))
    ).filter(item => item !== null)
});

function addAntinode(pair, set) {
    const key = pair + ""
    if (!set.has(key)) {
        set.add(key);
    }
}

function inbounds(node) {
    return node[0] >= 0 && node[1] >= 0 && node[0] < searchSpace.length && node[1] < searchSpace.length;
}

function newAntinode(i, j, node) {
    return [node[0] + i, node[1] + j];
}

indices.forEach((antenna) => {
    antenna.forEach((location) => {
        for (let i = 0; i < antenna.length; i++) {
            if (location + "" !== antenna[i] + "") {
                const distance = [location[0] - antenna[i][0], location[1] - antenna[i][1]]
                const antinode = newAntinode(distance[0], distance[1], location)
                if (inbounds(antinode)) {
                    addAntinode(antinode, antinodes);
                }
            }
        }
    })
})

console.log(antinodes.size)