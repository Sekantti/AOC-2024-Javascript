import { readFileSync } from 'fs';

const input = readFileSync('problem17.in', 'utf-8');

const instructions = input.match(/(m: |,)\d/g).map((program) => {return program.match(/\d/g)}).map((program) => {return parseInt(program)})
const registers = {}

function addRegister(register, value) {
    registers[register] = value;
}

function addRegisters(input) {
    const registers = input.match(/(A|B|C): \d+/g).map((register) => { return register.match(/\d+/g)}).map((register) => { return parseInt(register)});
    addRegister("A", registers[0]);
    addRegister("B", registers[1]);
    addRegister("C", registers[2]);
} //works

const operands = {
    0: {lit: 0, combo: 0},
    1: {lit: 1, combo: 1},
    2: {lit: 2, combo: 2},
    3: {lit: 3, combo: 3},
    4: {lit: 4, combo: registers["A"]},
    5: {lit: 5, combo: registers["B"]},
    6: {lit: 6, combo: registers["C"]},
    7: {lit: 7, combo: null}
} //this should be pretty straightforward, and not require tinkering?

function updateOperands() {
    operands[4].combo = registers["A"]
    operands[5].combo = registers["B"]
    operands[6].combo = registers["C"]
}

const opCodes = {
    0: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (2**operand))
        registers["A"] = result
        return -1
    },
    1: function (operIn) {
        const operand = operands[operIn].lit
        const result = operand ^ registers["B"]
        registers["B"] = result
        return -1
    },
    2: function (operIn) {
        const operand = operands[operIn].combo
        registers["B"] = operand & 7;
        return -1
    },
    3: function (operIn) {
        if (registers["A"] === 0) {
            return null;
        }
        return operands[operIn].lit;
    },
    4: function (operIn) {
        const result = registers["B"] ^ registers["C"]
        registers["B"] = result;
        return -1
    },
    5: function (operIn) {
        return operands[operIn].combo & 7
    },
    6: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (2**operand))
        registers["B"] = result
        return -1;
    },
    7: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (2**operand))
        registers["C"] = result
        return -1;
    }
}

function updatePointer(pointer, value) {
    if (value === null) {
        return pointer+2
    }
    return value;
} //seems to be working

function solve(input, instructions) {
    addRegisters(input)
    updateOperands()
    let pointer = 0;
    let output = ''
    console.log(instructions)
    
    while (true) {
        if (pointer >= instructions.length) {
            return output;
        }

        const instruction = instructions[pointer]
        const operand = instructions[pointer+1]
        if (instruction === 3) {
            pointer = updatePointer(pointer, opCodes[instruction](operand))
            continue;
        }
        const result = opCodes[instruction](operand)

        if (result !== -1) {
            output += result + ',';
        }

        pointer = updatePointer(pointer, null)
        updateOperands()
    }
} 

// const result = solve(input, instructions)
// console.log(registers)
// console.log(result)



//2, 4: B = A%8
//1, 5: B = 5^(A%8)
//7, 5: C = Math.floor(A/(2**(5^(A%8))))
//4, 3: B = (5^(A%8))^Math.floor(A/(2**(5^(A%8))))
//1, 6: B = ((5^(A%8))^Math.floor(A/(2**(5^(A%8)))))^6
//0, 3: A = Math.floor(A/(2**3))
//5, 5: output += (((5^(A%8))^Math.floor(A/(2**(5^(A%8)))))^6)%8
//3, 0: start again.


function solve2(input) {
    let A = input;

    while (A !== 0) {
        console.log((((5^(A&7))^Math.floor(A/(2**(5^(A&7)))))^6)&7)
        A = Math.floor(A/8)
        console.log("A is: " + A)
    }
}

//solve2(136934160596991)

//console.log(1020238)

//2**3 = 8

//console.log((8**16/8**9)*61156655)

//console.log(8**16)

// 2/2**

//I have no idea how to even approach this lol