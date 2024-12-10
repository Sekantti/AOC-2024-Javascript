import { readFileSync } from 'fs';

const input = readFileSync('problem9.in', 'utf-8')

const files = input.split('').map((c, i) => {
    const length = parseInt(c);
    return i % 2 == 0 ? {
        id: i / 2,
        length: length,
        type: "file",
    } : {
            id: '.',
            length: length,
            type: "blank",
        }
});

function rearrangeFiles(filesInput) {
    const files = filesInput;

    for (let back = files.length - 1; back >= 0; back--) {
        const file = files[back];
        if (file.type == "blank") {
            continue;
        }
        for (let front = 0; front < files.length; front++) {
            if (front >= back) {
                break;
            }
            if (files[front].type == "file") {
                continue;
            }
            if (files[front].length < file.length) {
                continue;
            }
            files[front].length -= file.length;
            files.splice(back, 1, { id: '.', length: file.length, type: "blank" });
            files.splice(front, 0, file);
            back++;
            break;
        }
    }

    return files;
}

console.log(rearrangeFiles(files).map((file) => {
    return Array(file.length).fill(file.id)
}).filter(file => file.length !== 0).flat().map((file, index) => {
    return file !== '.' ? file * index : 0
}).reduce((l, r) => { return l + r }));