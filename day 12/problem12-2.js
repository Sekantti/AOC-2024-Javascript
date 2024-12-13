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
    if (coord[0] < map.length-1) {
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

function getNumberOfSides(coordinates, map) { //works as expected
    let sides = 1;

    for (let coordinate of coordinates) {

    }

    for (let coordinate of coordinates) {
        const nextGardenPlots = nextGardenPlotsMatch(map[coordinate[0]][coordinate[1]], coordinate, map)
        if (nextGardenPlots === 0) {
            sides += 4
        }
        if (nextGardenPlots === 1) {
            sides += 3
        }
        if (nextGardenPlots === 2) {
            sides += 2
        }
        if (nextGardenPlots === 3) {
            sides += 1
        }
        if (nextGardenPlots === 4) {
            sides += 0
        }
    }

    return sides
}

function isContiguous(coord1, coord2) { //works as expected
    return coord1[0] === coord2[0] || coord1[1] === coord2[1]
}

function isContiguousHorizontal(coord1, coord2) {
    return coord1[0] === coord2[0]
}

function isContiguousVertical(coord1, coord2) {
    return coord1[1] === coord2[1]
}

console.log([isContiguousHorizontal([0, 0], [0, 1]), isContiguousVertical([0, 0], [0, 1])])

function findContiguous(coordinates, coord) {
    const contiguous = []
    for (let coordinate of coordinates) {
        if (isContiguous(coordinate, coord)) {
            contiguous.push(coordinate)
        }
    }

}

/*const shape = [[ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ]]
let edges = 0;
let firstNode;
let index = 0;



while (edges = 0) {
    const nextPlots = nextGardenPlotsMatch(map[shape[i][0]][shape[i][1]], shape[i], map)
    if (nextPlots === 4) {
        i++
        shape.splice(shape.indexOf(shape[i]), 1)
        continue;
    }
    edges = nextPlots;
    firstNode = shape[i]
}

if */

 

function howManyContiguous(coordinates, coord) {
    let contiguous = 0

    for (let coordinate of coordinates) {
        if (isContiguous(coordinate, coord)) {
            contiguous++
        }
    }
    
    return contiguous
}

/*console.log(howManyContiguous([
    [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2,
      4
    ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 3, 2 ]
  ], [0, 1]))

function getNumberOfSides(inputCoordinates, map) {
    const coordinates = structuredClone(inputCoordinates)
    let sides = 0;

    for (let coordinate of coordinates) {
        if (nextGardenPlotsMatch(map[coordinate[0]][coordinate[1]], coordinate, map) === 4) {
            coordinates.splice(coordinates.indexOf(coordinate), 1)
        }
    }





}*/




function getPrice(map) {
    const regions = findRegions(map);
    let price = 0;

    for (let region of regions) {
        price += region.length*getNumberOfSides(region, map);
    }

    return price;
}

//console.log(getPrice(map))