import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n').map((row) => { return row.split('-') });

function connectionsMapper(connections) {
    const connectionsObject = {}

    for (let i = 0; i < connections.length; i++) {
        const [computer1, computer2] = connections[i]
        if (computer1 in connectionsObject) {
            connectionsObject[computer1].add(computer2)
        } else {
            connectionsObject[computer1] = new Set([computer2])
        }
        if (computer2 in connectionsObject) {
            connectionsObject[computer2].add(computer1)
        } else {
            connectionsObject[computer2] = new Set([computer1])
        }
    }
    return connectionsObject
}

function findBiggestClique(edges, clique, cache) {
    const key = JSON.stringify([...clique].sort())

    if (key in cache) {
        return cache[key]
    }

    const candidates = clique.keys().map(node => edges[node]).reduce((l, r) => l.intersection(r));
    let longest = clique;
    for (let candidate of candidates) {
        const nextClique = findBiggestClique(edges, clique.union(new Set([candidate])), cache);
        if (nextClique.size > longest.size) {
            longest = nextClique;
        }
    }
    cache[key] = longest
    return longest;
}

function biggestClique(input) {
    const cache = {};
    const connections = connectionsMapper(input);
    let chain = new Set();

    for (let node in connections) {
        const clique = new Set([node]);
        const longest = findBiggestClique(connections, clique, cache)
        if (longest.size >= chain.size) {
            chain = longest
        }
    }

    return chain;
}

function solve(input) {
    const clique = biggestClique(input)

    return [...clique].sort().join(',')
}

console.log(solve(input))