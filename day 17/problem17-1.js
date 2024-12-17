/*This seems to be a 3-bit computer: its program is a list of 3-bit numbers (0 through 7), like 0,1,2,3. The computer also has three registers named A, B, and C, but these
registers aren't limited to 3 bits and can instead hold any integer.

The computer knows eight instructions, each identified by a 3-bit number (called the instruction's opcode). Each instruction also reads the 3-bit number after it as an input;
this is called its operand.

A number called the instruction pointer identifies the position in the program from which the next opcode will be read; it starts at 0, pointing at the first 3-bit number in
the program. Except for jump instructions, the instruction pointer increases by 2 after each instruction is processed (to move past the instruction's opcode and its operand).
If the computer tries to read an opcode past the end of the program, it instead halts.

So, the program 0,1,2,3 would run the instruction whose opcode is 0 and pass it the operand 1, then run the instruction having opcode 2 and pass it the operand 3, then halt.

There are two types of operands; each instruction specifies the type of its operand. The value of a literal operand is the operand itself. For example, the value of the literal
operand 7 is the number 7. The value of a combo operand can be found as follows:

Combo operands 0 through 3 represent literal values 0 through 3.
Combo operand 4 represents the value of register A.
Combo operand 5 represents the value of register B.
Combo operand 6 represents the value of register C.
Combo operand 7 is reserved and will not appear in valid programs.


Here are some examples of instruction operation:

If register C contains 9, the program 2,6 would set register B to 1.
If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.
If register A contains 2024, the program 0,1,5,4,3,0 would output 4,2,5,6,7,7,7,7,3,1,0 and leave 0 in register A.
If register B contains 29, the program 1,7 would set register B to 26.
If register B contains 2024 and register C contains 43690, the program 4,0 would set register B to 44354.
The Historians' strange device has finished initializing its debugger and is displaying some information about the program it is trying to run (your puzzle input). For
example:

Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
Your first task is to determine what the program is trying to output. To do this, initialize the registers to the given values, then run the given program, collecting any
output produced by out instructions. (Always join the values produced by out instructions with commas.) After the above program halts, its final output will be
4,6,3,5,6,3,5,2,1,0.

Using the information provided by the debugger, initialize the registers to the given values, then run the program. Once it halts, what do you get if you use commas to join
the values it output into a single string?*/
import { readFileSync } from 'fs';

const input = readFileSync('problem17-otherex.in', 'utf-8');

const instructions = input.match(/(m: |,)\d/g).map((program) => {return program.match(/\d/g)}).map((program) => {return parseInt(program)})
const registers = {
}

function addRegister(register, value) {
    registers[register] = value;
}

function addRegisters(input) {
    const registers = input.match(/(A|B|C): \d+/g).map((register) => { return register.match(/\d+/g)}).map((register) => { return parseInt(register)});
    addRegister("A", registers[0]);
    addRegister("B", registers[1]);
    addRegister("C", registers[2]);
} //works

//above works and should be done

const operands = {
    0: {lit: 0, combo: 0},
    1: {lit: 1, combo: 1},
    2: {lit: 2, combo: 2},
    3: {lit: 3, combo: 3},
    4: {lit: 4, combo: registers["A"]},
    5: {lit: 5, combo: registers["B"]},
    6: {lit: 6, combo: registers["C"]},
    7: {lit: 7, combo: null}
//     Combo operands 0 through 3 represent literal values 0 through 3.
// Combo operand 4 represents the value of register A.
// Combo operand 5 represents the value of register B.
// Combo operand 6 represents the value of register C.
// Combo operand 7 is reserved and will not appear in valid programs.
} //this should be pretty straightforward, and not require tinkering?

//console.log(operands[4].combo) --for example data, outputs 729 (as expected)

const opCodes = {
    0: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (operand ** 2))
        registers["A"] = result
        return -1
        /*The adv instruction (opcode 0) performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo
        operand. (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation is truncated to an integer and then
        written to the A register.*/
    },
    1: function (operIn) {
        const operand = operands[operIn].lit
        const result = operand ^ registers["B"]
        registers["B"] = result
        return -1
        /*The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
        A bitwise XOR is a binary operation that takes two bit patterns of equal length and performs the logical exclusive OR operation on each pair of corresponding bits.
        The result in each position is 1 if only one of the bits is 1, but will be 0 if both are 0 or both are 1.*/
    },
    2: function (operIn) {
        const operand = operands[operIn].combo
        const result = operand % 8
        registers["B"] = result;
        return -1
        /*The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.*/
    },
    3: function (operIn) {
        if (registers["A"] === 0) {
            return 0;
        }
        return operands[operIn].lit;
        /*The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its
        literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.*/
    },
    4: function (operIn) {
        const result = registers["B"] ^ registers["C"]
        registers["C"] = result;
        return -1
        /*The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an
        operand but ignores it.)*/
    },
    5: function (operIn) {
        return operands[operIn].combo % 8
        /*The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)*/
    },
    6: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (operand ** 2))
        registers["B"] = result
        return -1;
        /*The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)*/
    },
    7: function (operIn) {
        const operand = operands[operIn].combo
        const result = Math.floor(registers["A"] / (operand ** 2))
        registers["C"] = result
        return -1;
        /*The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)*/
    }
}

function updatePointer(pointer, value) {
    if (value === 0) {
        return pointer+2
    }
    return value;
}

//console.log(updatePointer(2, 0))

function solve(input, instructions) {
    addRegisters(input)
    let pointer = 0;
    let output = ''
   // console.log(instructions)
    
    while (true) {
        const instruction = instructions[pointer]
        const operand = instructions[1]
        //console.log([instruction, operand])
        if (instruction === 3) {
            pointer = updatePointer(pointer, Math.max(opCodes[instruction](operand), 0))
            continue;
        }
        const result = opCodes[instruction](operand)
        if (result !== -1) {
            output += result + ',';
        }
        pointer = updatePointer(pointer, 0)

        if (pointer >= instructions.length) {
            return output;
        }
    }
} 

solve(input, instructions)
console.log(registers)

/*If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.*/