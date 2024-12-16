/*The Reindeer start on the Start Tile (marked S) facing East and need to reach the End Tile (marked E). They can move forward one tile at a time (increasing their score
by 1 point), but never into a wall (#). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by 1000 points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
There are many paths through this maze, but taking any of the best paths would incur a score of only 7036. This can be achieved by taking a total of 36 steps forward and
turning 90 degrees a total of 7 times:


###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
Here's a second example:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
In this maze, the best paths cost 11048 points; following one such path would look like this:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. What is the lowest score a Reindeer could possibly get?*/
import { readFileSync } from 'fs';

const map = []
readFileSync('problem16-example.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('');
});

const initialPosition = []
map.forEach((row) => {
    row.find((position) => {
        if (position === 'S') {
            initialPosition[0] = map.indexOf(row)
            initialPosition[1] = row.indexOf(position);
        }
    })
});

const goal = []
map.forEach((row) => {
    row.find((position) => {
        if (position === 'E') {
            goal[0] = map.indexOf(row)
            goal[1] = row.indexOf(position);
        }
    })
});

function prettyPrint(twoDArray) {
    return map.map((row) => {
        return row.join('')
    }).join('\n')
}

console.log(goal)

// function directionMove(directionSymbol) {
//     const direction = {
//         '^': [-1, 0],
//         '>': [0, 1],
//         'v': [1, 0],
//         '<': [0, -1]
//     }

//     return direction[directionSymbol]
// }

// function nextWall([x, y], direction, map) {
//     const [dx, dy] = directionMove(direction)

//     for (let i = 1; i < map.length; i++) {
//         const [newX, newY] = [x + i * dx, y + i * dy];
//         if (map[newX][newY] === '#') {
//             return [null, null];
//         }
//         if (map[newX][newY] === '.') {
//             return [newX, newY]
//         }
//     }

//     return [null, null];
// }

console.log(initialPosition)