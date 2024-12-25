import { readFileSync } from 'fs';

const input = readFileSync('data.in', 'utf-8').split('\n\n');

const wires = {}
input[0].split('\n').forEach((row) => {
    const [wire, value] = row.split(':');
    wires[wire] = parseInt(value)
})

const oeprations = {}
input[1].split('\n').forEach((row) => {
    const [operation, output] = row.split(' -> ');
    const operator = operation.match(/(XOR|AND|OR)/g)[0]
    const wires = operation.split(/( XOR | AND | OR )/)
    oeprations[output] = { wires: [wires[0], wires[2]], operator: operator }
})

function operate(wire1, wire2, operator) {
    if (operator === 'AND') {
        return wire1 & wire2
    }
    if (operator === 'OR') {
        return wire1 | wire2
    }
    if (operator === 'XOR') {
        return wire1 ^ wire2
    }
}

function getOutputs(operations, wires) {
    const queue = Object.keys(operations);

    while (true) {
        if (queue.length === 0) {
            return wires;
        }

        const nextOperationKey = queue.shift();
        const [wire1, wire2] = operations[nextOperationKey].wires;
        const operator = operations[nextOperationKey].operator;

        if (wires[wire1] === undefined || wires[wire2] === undefined) {
            queue.push(nextOperationKey);
            continue;
        }

        wires[nextOperationKey] = operate(wires[wire1], wires[wire2], operator);
    }
}

function findZWires(operations, wires) {
    const results = getOutputs(operations, wires);
    const zWires = {}
    let length = 0;

    for (let result in results) {
        if (result.charAt(0) === 'z') {
            zWires[result] = results[result]
            length++
        } 
    }

    return [zWires, length]
}

function solve(operations, wires) {
    const [zWires, length] = findZWires(operations, wires);
    const result = [];
    
    for (let wire in zWires) {
        const index = parseInt(wire.match(/\d+/));
        result[length - 1 - index] = zWires[wire];
    }
    
    return parseInt(result.join(''), 2);
}

console.log(solve(oeprations, wires))