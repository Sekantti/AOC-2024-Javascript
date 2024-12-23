import { cp, readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n').map((row) => {return row.split('-')});

function findConnections(input) {
    const connections = []
    for (let i = 0; i < input.length; i++) {
        const [comp1, comp2] = input[i]
        for (let j = i+1; j < input.length; j++) {
            const [comp3, comp4] = input[j]
            for (let k = j+1; k < input.length; k++) {
                const [comp5, comp6] = input[k]
                if ( comp1 === comp6) {
                    if ((comp2 === comp3 && comp4 === comp5) || (comp2 === comp4 && comp3 === comp5)) {
                        connections.push([comp1, comp2, comp5])
                    }
                }
                if (comp1===comp5) {
                    if ((comp2===comp3 && comp4 === comp6) || (comp2===comp4 && comp3===comp6)) {
                        connections.push([comp1, comp2, comp6])
                    }
                }
                if (comp2===comp5) {
                    if ((comp1===comp3 &&comp4===comp6 || comp1===comp4 && comp3 === comp6)) {
                        connections.push([comp1, comp2, comp6])
                    }
                }
                if (comp2===comp6) {
                    if ((comp1==comp3 && comp4===comp5) || comp1===comp4 && comp3===comp5) {
                        connections.push([comp1, comp2, comp5])
                    }
                }
            }
        }
    }

    return connections
}

console.log(findConnections(input))

function tConnections(connectionsIn) {
    const beginsWithT = findConnections(connectionsIn)
    return beginsWithT.filter((connection) => {
        return connection[0].charAt(0) === 't' || connection[1].charAt(0) === 't' || connection[2].charAt(0) === 't'
    }).length;
}

//console.log(tConnections(input))

//console.log(findConnections(input))

// function connection(terminal, [terminal1, terminal2]) {
//     if (terminal === terminal1) {
//         return terminal2
//     }
//     if (terminal === terminal2) {
//         return terminal1
//     }
//     return terminal
// }



// function connectionsMapper(connections) {
//     const connectionsObject = {}

//     for (let i = 0; i < connections.length; i++) {
//         const [computer1, computer2] = connections[i]
//         if (computer1 in connectionsObject) {
//             connectionsObject[computer1].push(computer2)
//         } else {
//             connectionsObject[computer1] = [computer2]
//         }
//         if (computer2 in connectionsObject) {
//             connectionsObject[computer2].push(computer1)
//         } else {
//             connectionsObject[computer2] = [computer1]
//         }
//     }

//     return connectionsObject
// }



// function uniqueNodes(input, current, end, seen, length) { //I want to return a loop of three computers.
//     //I think I'm going to call this function on each key of connectionsObject, with the key in question being the end point, and when current===end and I'm three deep
//     //that should be a connection
//     if (current === end && length === 3) {
//         return true;
//     }
//     const nodes = input[current]; //input is going to be a connection of the form: kh: ["tc", "qp", "ub", "ta"]. So each node will be a string.
//     if (nodes.length === 0) {
//         return false;
//     }

//     for (let node of nodes) {
//         const canReachEnd = uniqueNodes(input, node, end, seen) 
//         if (canReachEnd) {
//             seen[current] = true
//         }
//     }
//     return current in seen; 
//     //in the logic in this function, I want the nodes I'm looking at to be ["tc", "qp", "ub", "ta"]. So I want to look at node[]
// }

// function findConnections(input) {
//     const queue = []
//     queue.push(input[0])

//     const connections = {}
//     while (true) {
        
//     }
// }