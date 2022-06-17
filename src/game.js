import type {Board} from "./board";
import {newBoard} from "./board";
import {shuffleArray} from "./util";

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
function shuffleBoard(board: Board) {
    board.tiles = shuffleArray(board.tiles);
}

function checkMatch(board: Board, indexA: number, indexB: number) {
    return board.types[indexA] === board.types[indexB];
}

/**
 * Returns true iff a tile can be played.
 * @param board
 * @param index
 * @returns {boolean}
 */
function tilePlayable(board: Board, index: number): boolean {
    if (!board.tiles[index]) {
        return false;
    }
    return board.top[index] === -1 && (board.left[index] === -1 || board.right[index] === -1);
}