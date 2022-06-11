import type {Tile} from "./tile";
import type {Board} from "./board";
import {newBoard} from "./board";

function newGame() {
    // TODO
    let board = newBoard();
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
function noMovesRemaining(board: Board): boolean {
    return board.tiles.reduce((acc, curr) => {
        return acc && !curr; // check that every tile is false
    })
}

/**
 * Shuffles a board's tiles.
 * @param board
 */
function shuffleBoard(board: Tile[][]) {
    // TODO
}