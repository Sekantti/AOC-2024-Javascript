import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n').map((row) => { return row.split('-') });

function connectionsMapper(connections) {
    const connectionsObject = {}

    for (let i = 0; i < connections.length; i++) {
        const [computer1, computer2] = connections[i]
        if (computer1 in connectionsObject) {
            connectionsObject[computer1].push(computer2)
        } else {
            connectionsObject[computer1] = [computer2]
        }
        if (computer2 in connectionsObject) {
            connectionsObject[computer2].push(computer1)
        } else {
            connectionsObject[computer2] = [computer1]
        }
    }

    return connectionsObject
}

function connectionsCounter(input) {
    const connections = connectionsMapper(input)
    //console.log(connections)
    let count = 0

    for (let terminal1 in connections) {
        const oneConnectsTo = connections[terminal1]
        for (let terminal2 of oneConnectsTo) {
            const twoConnectsTo = connections[terminal2]
            for (let terminal3 of twoConnectsTo) {
                if (terminal1 !== terminal2 && terminal2 !== terminal3) {
                    if (terminal1.charAt(0) === 't' || terminal2.charAt(0) === 't' || terminal3.charAt(0) === 't') {
                        if (connections[terminal3].includes(terminal1)) {
                            count++
                        }
                    }
                }
            }
        }
    }

    return count / 6
}

console.log(connectionsCounter(input))

//console.log(connectionsCalculator(input))