/*The paper describes a second way to measure a trailhead called its rating. A trailhead's rating is
the number of distinct hiking trails which begin at that trailhead. For example:

.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....
The above map has a single trailhead; its rating is 3 because there are exactly three distinct hiking trails which begin at that position:

.....0.   .....0.   .....0.
..4321.   .....1.   .....1.
..5....   .....2.   .....2.
..6....   ..6543.   .....3.
..7....   ..7....   .....4.
..8....   ..8....   ..8765.
..9....   ..9....   ..9....
Here is a map containing a single trailhead with rating 13:

..90..9
...1.98
...2..7
6543456
765.987
876....
987....
This map contains a single trailhead with rating 227 (because there are 121 distinct hiking
trails that lead to the 9 on the right edge and 106 that lead to the 9 on the bottom edge):

012345
123456
234567
345678
4.6789
56789.
Here's the larger example from before:

89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
Considering its trailheads in reading order, they have ratings of 20, 24, 10, 4, 1, 4, 5, 8, and 5.
The sum of all trailhead ratings in this larger example topographic map is 81.
*/

import { readFileSync } from 'fs';
import path from 'path';

const map = [];

readFileSync('problem10-example.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('').map(num => parseInt(num));
});

const trailheads = map.flatMap((row, i) =>
    row.map((element, j) => (element === 0 ? [i, j] : null))
).filter(item => item !== null);

const endPoints = map.flat().filter((point) => point === 9).length

function validDirections(i, j, map) { //works as expected
    return [[i > 0 ? i - 1 : i, j], [i, j < map[j].length - 1 ? j + 1 : j], [i < map.length - 1 ? i + 1 : i, j], [i, j > 0 ? j - 1 : j]]
}

function validStep(coord1, coord2, map) { //woks as expected
    return map[coord1[0]][coord1[1]] === map[coord2[0]][coord2[1]] - 1
}

function existsValidMovement(directions, coord, map) { //works as expected
    return validStep(coord, directions[0], map) || validStep(coord, directions[1], map) || validStep(coord, directions[2], map) || validStep(coord, directions[3], map)
}

function pathIsDifferent(path1, path2) {
    if (path1.length !== path2.length) {
        return true;
    }
    for (let i = 0; i < path1.length; i++) {
        if (path1[i][0] !== path2[i][0] || path1[i][1] !== path2[i][1])
        return true;
    }
    return false;
}

function pathIsUnique(paths, path) {
    for (let i = 0; i < paths.length; i++) {
        if (!pathIsDifferent(paths[i], path)) {
            return false;
        }
    }
    return true;
}