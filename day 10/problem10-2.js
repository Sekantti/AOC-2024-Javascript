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

const map = [];

readFileSync('problem10-example.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('').map(num => parseInt(num));
});

const trailheads = map.flatMap((row, i) =>
    row.flatMap((element, j) => (element === 0 ? [[i, j]] : []))
)

function validMovements(i, j, map) {
    const movements = []
    i > 0 && map[i-1][j] - map[i][j] === 1 && movements.push([i-1, j]);
    j < map[j].length-1 && map[i][j+1] - map[i][j] === 1 && movements.push([i, j+1]);
    i < map.length-1 && map[i+1][j] - map[i][j] === 1 && movements.push([i+1, j])
    j > 0 && map[i][j-1] - map[i][j] === 1 && movements.push([i, j-1])
    return movements
}

function countReachablePeaks(coord, map) {
    const steps = validMovements(coord[0], coord[1], map)
    if (map[coord[0]][coord[1]] === 9) {
        return 1;
    }
    if (steps.length === 0) {
        return 0;
    }
    return steps.map((step) => {
        return countReachablePeaks(step, map);
    }).reduce((l, r) => { return l + r })
}

console.log(trailheads.map((trailhead) => {
    return countReachablePeaks(trailhead, map);
}).reduce((l, r) => { return l + r }));