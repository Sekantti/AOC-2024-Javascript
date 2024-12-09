import { readFileSync } from 'fs';

const input = readFileSync('problem9.in', 'utf-8')

const files = input.split('').map((c, i) => {
    const length = parseInt(c);
    if (i % 2 == 0) {
        return {
            id: i / 2,
            length: length,
            type: "file",
        }
    } else {
        return {
            id: '.',
            length: length,
            type: "blank",
        }
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

function calculateChecksum(files) {
    let checkSum = 0;
    let index = 0;

    files.forEach((file) => {
        if (file.type === "file") {
            const fileChecksum = file.id * (2 * index + file.length - 1) * file.length / 2;
            checkSum += fileChecksum;
        }
        index += file.length;
    })

    return checkSum;
}

console.log(calculateChecksum(rearrangeFiles(files)))