import { readFileSync } from 'fs';

const input = readFileSync('problem9.in', 'utf-8').split('').map((num) => parseInt(num))

const files = input.map((num, index) => {
    return index % 2 == 0 ? Array(num).fill(index / 2) : Array(num).fill('.')
}).flat();

function rearrangeFiles(filesInput) {
    const files = filesInput;
    for (let i = files.length - 1; i >= 0; i--) {
        if (files[i] !== '.')
            for (let j = 0; j < files.length - 1; j++) {
            if (j >= i) {
                break;
            }
            if (files[j] === '.') {
                files[j] = files[i];
                files[i] = '.';
                break;
            }
        }
    }
    return files
}

console.log(rearrangeFiles(files).map((file, index) => {
    return file !== '.' ? file * index : 0
}).reduce((l, r) => { return l + r }));