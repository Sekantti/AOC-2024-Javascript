import { readFileSync } from 'fs';

const map = [];

readFileSync('problem12-example.in', 'utf-8').split('\n').forEach((row, i) => {
    map[i] = row.split('')
});

function validDirections(coord, map) { //works as expected
    const directions = [];
    if (coord[0] > 0) {
        directions.push([coord[0] - 1, coord[1]])
    }
    if (coord[1] < map[coord[0]].length - 1) {
        directions.push([coord[0], coord[1] + 1])
    }
    if (coord[0] < map.length - 1) {
        directions.push([coord[0] + 1, coord[1]])
    }
    if (coord[1] > 0) {
        directions.push([coord[0], coord[1] - 1])
    }
    return directions;
}

function nextGardenPlotsMatch(plantType, coord, map) { // works as expected
    const nextPlots = validDirections(coord, map)
    let matches = 0;
    for (let nextPlot of nextPlots) {
        if (map[nextPlot[0]][nextPlot[1]] !== plantType) {
            matches++;
        }
    }
    return matches
}

function indexInList(coordinates, coord) { //works as expected
    for (let coordinate of coordinates) {
        if (coordinate[0] === coord[0] && coordinate[1] === coord[1]) {
            return true;
        }
    }
    return false;
}

function indexInLists(coordinates2D, coord) { //works as expected
    for (let coordinates of coordinates2D) {
        if (indexInList(coordinates, coord)) {
            return true;
        }
    }
    return false
}

function findRegion(coord, map) { //works as expected
    const plantType = map[coord[0]][coord[1]];
    const region = [coord]
    map[coord[0]][coord[1]] = '.'
    if (nextGardenPlotsMatch(plantType, coord, map) === 4) {
        return region;
    }
    const nextPlots = validDirections(coord, map)
    for (let nextPlot of nextPlots) {
        if (map[nextPlot[0]][nextPlot[1]] === plantType) {
            region.push(...findRegion(nextPlot, map))
        }
    }
    return region
}

function findRegions(map) { //works as expected
    const regions = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (indexInLists(regions, [i, j])) {
                continue;
            }
            regions.push(findRegion([i, j], structuredClone(map)))
        }
    }
    return regions
}

function findMaxAndMin(coordinates) { //works as expected 
    const xCoordinates = coordinates.map((coordinate) => coordinate[0])
    const yCoordinates = coordinates.map((coordinate) => coordinate[1])

    return [[Math.min(...xCoordinates), Math.max(...xCoordinates)],
    [Math.min(...yCoordinates), Math.max(...yCoordinates)]]
}

function sortRegionByIndex(coordinates, maxAndMin, axis) {
    const sortedRegion = [];
    const diff = Math.abs(maxAndMin[0] - maxAndMin[1]);

    for (let index = 0; index <= diff; index++) {
        sortedRegion[index] = coordinates.filter((coordinate) => {
            return coordinate[axis] === maxAndMin[0] + diff - index;
        });
    }

    return sortedRegion;
}

function sortRegionByIndexVertical(coordinates, maxAndMin) {
    return sortRegionByIndex(coordinates, maxAndMin[0], 0).map((indices) => {
        return indices.sort(([x1, y1], [x2, y2]) => {
            return y1 - y2
        });
    });
}

function sortRegionByIndexHorizontal(coordinates, maxAndMin) {
    return sortRegionByIndex(coordinates, maxAndMin[1], 1).map((indices) => {
        return indices.sort(([x1, y1], [x2, y2]) => {
            return x1 - x2
        });
    });
}

//console.log(sortRegionByIndexHorizontal(region1, findMaxAndMin(region1)))

// console.log(sortRegionByIndexHorizontal([
//     [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ]
//   ], [
//     [ 0, 1 ], [ 4, 5 ]
//   ]))

function nextGardenPlotDirectional(coordinate, direction) {
    const x = coordinate[0]
    const y = coordinate[1]
    const plantType = map[x][y]
    if (direction === "up") {
        return plantType === map[x - 1][y]
    }
    if (direction === "right") {
        return plantType === map[x][y + 1]
    }
    if (direction === "down") {
        return plantType === map[x + 1][y]
    }
    if (direction === "left") {
        return plantType === map[x][y - 1]
    }
}

//console.log(sortRegionByIndexVertical(region0, maxAndMin)) //[0] gives the set of indices on aline, [0][0] gives
//the first index, [0][0][0] gives the first digit of the first index

function findSides(line, map, direction) { //expects a set of coordinates, a 2-d grid, and a string (up, down, left or right)
    const boundaries = {
        "up": line[0][0] === 0,
        "down": line[0][0] === map.length - 1,
        "left": line[0][1] === 0,
        "right": line[0][1] === map[0].length - 1
    };
    if (boundaries[direction]) {
        return 1;
    } //this logic is good and simple

    const neighborOffsets = {
        "up": [-1, 0],
        "down": [1, 0],
        "left": [0, -1],
        "right": [0, 1]
    };
    const [dx, dy] = neighborOffsets[direction]; // this logic should  be good and simple

    if (line.filter(([x, y]) => map[x][y] !== map[x + dx][y + dy]).length === 0) { //this should check that there is at least one plot bordered in the specified direction by a different plant
        return 0;
    }

    const [x, y] = line[0];
    let sides = map[x][y] !== map[x + dx][y + dy] ? 1 : 0
    for (let index = 1; index < line.length; index++) {
        const [x1, y1] = line[index - 1];
        const [x2, y2] = line[index];

        if ((direction === "up" || direction === "down")) { //the y2 !== y1+1 logic is WRONG (I think)
            if (y2 !== y1 + 1 && map[x2 + dx][y2 + dy] !== map[x2][y2]) {
                sides++;
                continue;
            }
            if (map[x1 + dx][y1 + dy] === map[x1][y1] && map[x2 + dx][y2 + dy] !== map[x2][y2]) {
                sides++;
                continue
            }
        }
        if ((direction === "left" || direction === "right")) {
            if (x2 !== x1 + 1 && map[x2 + dx][y2 + dy] !== map[x2][y2]) {
                sides++;
                continue;
            }
            if (map[x1 + dx][y1 + dy] === map[x1][y1] && map[x2 + dx][y2 + dy] !== map[x2][y2]) {
                sides++;
                continue
            }
        }
        if (map[x2][y2] !== map[x2 + dx][y2 + dy] && sides === 0) {
            sides++;
            continue;
        }
    }

    return sides;
} //seems to be working


function prettyPrint(map) {
    const newMap = map.map((row) => {
        return row.map((element) => {
            if (element === 'C') {
                return element
            }
            return '.'
        })
    })
    return newMap.map((row) => {
        return row.join('')
    }).join('\n')
}

console.log(prettyPrint(map))

const region = findRegions(map)[2]
const regionSortedHor = sortRegionByIndexHorizontal(region, findMaxAndMin(region))

console.log(findAllSidesForRegion(region, map))

function findAllSidesForRegion(region, map) {
    const maxAndMin = findMaxAndMin(region)
    const regionSortedHor = sortRegionByIndexHorizontal(region, maxAndMin)
    const regionSortedVert = sortRegionByIndexVertical(region, maxAndMin)

    const leftSides = regionSortedHor.map((column) => {
        return findSides(column, map, "left")
    }).reduce((l, r) => { return l + r });
    const rightSides = regionSortedHor.map((column) => {
        return findSides(column, map, "right")
    }).reduce((l, r) => { return l + r });
    const upSides = regionSortedVert.map((row) => {
        return findSides(row, map, "up")
    }).reduce((l, r) => { return l + r });
    const downSides = regionSortedVert.map((row) => {
        return findSides(row, map, "down")
    }).reduce((l, r) => { return l + r });

    return leftSides + rightSides + upSides + downSides
}




function getPrice(map) {
    const regions = findRegions(map);
    let price = 0;

    for (let region of regions) {
        price += region.length * findAllSidesForRegion(region, map);
    }

    return price;
}

//console.log(getPrice(map))
/*




A region of R plants with price 12 * 10 = 120. CORRECT SIDES
A region of I plants with price 4 * 4 = 16. Correct SIDes
A region of C plants with price 14 * 22 = 308. CORRECT SIDES
A region of F plants with price 10 * 12 = 120. SIDES UNDERCOUNTER BY 2
A region of V plants with price 13 * 10 = 130. SIDES UNDERCOUNTED BY 1
A region of J plants with price 11 * 12 = 132. SIDES UNDERCOUNTED BY 2
A region of C plants with price 1 * 4 = 4. CORRECT SIDES
A region of E plants with price 13 * 8 = 104. CORRECT SIDES
A region of I plants with price 14 * 16 = 224. SIDES UNDERCOUNTED BY 1
A region of M plants with price 5 * 6 = 30. CORRECT SIDES
A region of S plants with price 3 * 6 = 18. CORRECT SIDES*/