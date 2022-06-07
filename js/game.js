import type {Tile} from "./tile";
import {randInt, shuffleArray} from "./util";
import {makeBoard} from "./board";

function newGame() {
    // TODO
    let tiles = makeTiles();
    let board = makeBoard(tiles);
    // setTimeout(0, 12000); // timer for game set to 12m
}

function timer() {
    // TODO
}

function pause() {
    // TODO
}

/**
 * Returns true if there are no moves remaining for a board
 * @param board
 */
function noMovesRemaining(board: Tile[]): boolean {
    // TODO
}

/**
 * Generates tiles for a Tile Towers board.
 * @returns {[]}
 */
function makeTiles(): Tile[] {
    let tiles: Tile[] = [];
    // Generate matching tiles
    for (let i = 0; i < Math.floor(NUM_TOTAL_TILES / 2); i++) {
        const randomType = randInt(NUM_TILE_TYPES)
        tiles.push({type: randomType, top: null, left: null, right: null});
        tiles.push({type: randomType, top: null, left: null, right: null});
    }
    // Randomize tile distribution
    tiles = shuffleArray(tiles);
    return tiles;
}

/**
 * Shuffles a board's tiles.
 * @param board
 */
function shuffleBoard(board: Tile[][]) {

}