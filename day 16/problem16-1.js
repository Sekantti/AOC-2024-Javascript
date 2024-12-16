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
    return twoDArray.map((row) => {
        return row.join('')
    }).join('\n')
}

// function directionMove(directionString) { // expects direction input as string
//     const direction = {
//         'up': [-1, 0],
//         'right': [0, 1],
//         'down': [1, 0],
//         'left': [0, -1]
//     }

//     return direction[directionString]
// }

function turnClockwise(direction) { //expects direction input as array
    const clockwiseTurn = {
        "-1,0": [0, 1],
        "0,1" : [1, 0],
        "1,0": [0, -1],
        "0,-1" : [-1, 0]

    }
    return clockwiseTurn[direction + '']
}


function turnAntiClockwise(direction) { //expects direction input as array
    const antiClockwiseTurn = {
        "-1,0": [0, -1],
        "0,1" : [-1, 0],
        "1,0": [0, 1],
        "0,-1" : [1, 0]

    }
    return antiClockwiseTurn[direction + '']
}

function isDeadEnd([x, y], map) {
    return map[x-1][y] === '#' && map[x][y-1] === '#' && map[x+1][y] === '#' && map[x][y+1] === '#'
}

function canMove([x, y], [dx, dy], map) {
    if (map[x+dx][y+dy] === '#') {
        return false;
    }
    return true;
}

function validMoves([x, y], [dx, dy], map) {
    const [[dxc, dyc], [dxa, dya]] = [turnClockwise([dx, dy]), turnAntiClockwise([dx, dy])]
    const movements = []
    map[x+dx][y+dy] !== '#' && movements.push([dx, dy])
    map[x + dxc][y+dyc] !== '#'&& movements.push([dxc, dyc])
    map[x + dxa][y+dya] !== '#'&& movements.push([dxa, dya])
    return movements;
}

// function validMovements(i, j, map) {

//     i > 0 && map[i-1][j] - map[i][j] === 1 && movements.push([i-1, j]);
//     j < map[i].length-1 && map[i][j+1] - map[i][j] === 1 && movements.push([i, j+1]);
//     i < map.length-1 && map[i+1][j] - map[i][j] === 1 && movements.push([i+1, j])
//     j > 0 && map[i][j-1] - map[i][j] === 1 && movements.push([i, j-1])
//     return movements
// }

// function solve([x, y], [dx, dy], map, turn, steps) {
//     const validMovements = validMoves
//     if (mo)+
//     map[x][y] = '#'
//     if (map[x][y] === 'E') {
//         map[x][y] = '.'
//         return steps+turn;
//     }
//     // if (isDeadEnd([x,y], map)) {
//     //     map[x][y] = '.';
//     //     return 1000000000000000;
//     // }
//     const [dxa, dya] = turnAntiClockwise([dx, dy])
//     const [dxc, dyc] = turnClockwise([dx, dy])
//     if (canMove([x, y], [dx, dy], map)) {
//         return Math.min(
//             solve([x+dx, y+dy], [dx, dy], map, turn, steps+1),
//             solve([x+dxa, y+dya],[dxa, dya], map, turn+1000, steps),
//             solve([x + dxc, y+ dyc], [dxc, dyc], map, turn+1000, steps)
//         )
//     }
//     return Math.min(
//         solve([x+dxa, y+dya],[dxa, dya], map, turn+1000, steps),
//         solve([x + dxc, y+ dyc], [dxc, dyc], map, turn+1000, steps)
//     );
// }


function solve([x, y], [dx, dy], map, steps, turns) {
    const newMap = structuredClone(map)
    if (isDeadEnd([x, y], map)) {
        return 1000000000000;
    }
    if (newMap[x][y] === 'E') {
        console.log("endpoint reached")
        return steps + turns;
    }
    newMap[x][y] = '#'
    Math.min(
        canMove([x, y], [dx, dy], newMap) ? solve([x+dx, y+dy], [dx, dy], newMap, steps+1, turns) : 1000000000000,
        canMove([x, y], turnClockwise([dx, dy]), newMap) ? solve([x, y], turnClockwise([dx, dy]), newMap, steps, turns+1000) : 1000000000000,
        canMove([x, y], turnAntiClockwise([dx, dy]), newMap) ? solve([x, y], turnAntiClockwise([dx, dy]), newMap, steps, turns+1000) : 1000000000000
    )

}

console.log(solve([13, 1], [0, 1], map))