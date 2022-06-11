import {randInt, shuffleArray} from "./util";

const NUM_TILE_TYPES = 36;
const NUM_TOTAL_TILES = 144;

export {
    NUM_TOTAL_TILES,
    NUM_TILE_TYPES
}
const INIT_NEIGHBORS_LEFT = [-1, -1, 1, -1, 3, -1, 5, 6, 7, -1, 9, 10, 11, -1, 13, 14, 15, -1, 17, 18, 19, -1, 21, 22, 23, 24, 25, -1, 27, 28, 29, 30, 31, -1, 33, 34, 35, 36, 37, -1, 39, 40, 41, 42, 43, -1, 45, 46, 47, 48, 49, -1, 51, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, -1, 77, 78, 79, 80, 81, 82, 83, 84, 85, 141, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 141, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, -1, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1, 121, 122, 123, 124, 125, 126, 127, -1, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, -1, [98, 110], 142];
const INIT_NEIGHBORS_RIGHT = [-1, 2, -1, 4, 5, 6, 7, 8, -1, 10, 11, 12, -1, 14, 15, 16, -1, 18, 19, 20, -1, 22, 23, 24, 25, 26, -1, 28, 29, 30, 31, 32, -1, 34, 35, 36, 37, 38, -1, 40, 41, 42, 43, 44, -1, 46, 47, 48, 49, 50, -1, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, 76, -1, 78, 79, 80, 81, 82, 83, 84, 85, 86, -1, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 142, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 142, 112, 113, 114, 115, 116, 117, 118, 119, 120, -1, 122, 123, 124, 125, 126, 127, 128, -1, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, -1, [87, 99], 143, -1];
const INIT_NEIGHBORS_TOP = [-1, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, 2, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 7, 8, -1, -1, 9, 10, 11, 12, -1, -1, 13, 14, 15, 16, -1, -1, 17, 18, 19, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 21, 22, 23, 24, 25, 26, -1, -1, -1, 27, 28, 29, 30, 31, 32, -1, -1, -1, -1, -1, 33, 34, 35, 36, 37, 38, -1, -1, -1, -1, -1, -1, 39, 40, 41, 42, 43, 44, -1, -1, -1, -1, -1, 45, 46, 47, 48, 49, 50, -1, -1, -1, 51, 52, 53, 54, 55, 56, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

export interface Board {
    tiles: boolean[144],
    types: number[144],
    top: (number | number[])[144],
    left: (number | number[])[144],
    right: (number | number[])[144],
}

/**
 * Creates a new Tile Towers board.
 * @returns {{types: *, titles: any[]}}
 */
export function newBoard(): Board {
    return {
        tiles: new Array(144).fill(true),
        types: generateTypes(),
        top: INIT_NEIGHBORS_TOP,
        left: INIT_NEIGHBORS_LEFT,
        right: INIT_NEIGHBORS_RIGHT,
    }
}

/**
 * Generates tile types for a Tile Towers board.
 * @returns {number[]}
 */
function generateTypes(): number[] {
    let types: number[] = [];
    for (let i = 0; i < NUM_TOTAL_TILES / 2; i++) {
        const randType = randInt(NUM_TILE_TYPES);
        types.push(randType);
        types.push(randType);
    }
    // Randomize tile distribution
    types = shuffleArray(types);
    return types;
}