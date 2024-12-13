import { readFileSync } from 'fs';

const map = [];

readFileSync('problem12.in', 'utf-8').split('\n').forEach((row, i) => {
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

function findPerimeter(coordinates, map) { //works as expected
    let perimeter = 0;

    for (let coordinate of coordinates) {
        perimeter += nextGardenPlotsMatch(map[coordinate[0]][coordinate[1]], coordinate, map)
        const nextGardenPlots = nextGardenPlotsMatch(map[coordinate[0]][coordinate[1]], coordinate, map)
    }

    return perimeter
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

function findRegion(coord, map) {
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

function findRegions(map) {
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

function getPrice(map) {
    const regions = findRegions(map);
    let price = 0;

    for (let region of regions) {
        price += region.length*findPerimeter(region, map);
    }

    return price;
}

console.log(getPrice(map))