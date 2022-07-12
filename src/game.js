import {shuffleArray} from "./util";
import {Board} from "./board";

const INIT_NEIGHBORS_LEFT = [-1, -1, 1, -1, 3, -1, 5, 6, 7, -1, 9, 10, 11, -1, 13, 14, 15, -1, 17, 18, 19, -1, 21, 22, 23, 24, 25, -1, 27, 28, 29, 30, 31, -1, 33, 34, 35, 36, 37, -1, 39, 40, 41, 42, 43, -1, 45, 46, 47, 48, 49, -1, 51, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, -1, 77, 78, 79, 80, 81, 82, 83, 84, 85, 141, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 141, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, -1, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1, 121, 122, 123, 124, 125, 126, 127, -1, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, -1, [98, 110], 142];
const INIT_NEIGHBORS_RIGHT = [-1, 2, -1, 4, 5, 6, 7, 8, -1, 10, 11, 12, -1, 14, 15, 16, -1, 18, 19, 20, -1, 22, 23, 24, 25, 26, -1, 28, 29, 30, 31, 32, -1, 34, 35, 36, 37, 38, -1, 40, 41, 42, 43, 44, -1, 46, 47, 48, 49, 50, -1, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, 76, -1, 78, 79, 80, 81, 82, 83, 84, 85, 86, -1, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 142, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 142, 112, 113, 114, 115, 116, 117, 118, 119, 120, -1, 122, 123, 124, 125, 126, 127, 128, -1, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, -1, [87, 99], 143, -1];
const INIT_NEIGHBORS_TOP = [-1, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, 2, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 7, 8, -1, -1, 9, 10, 11, 12, -1, -1, 13, 14, 15, 16, -1, -1, 17, 18, 19, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 21, 22, 23, 24, 25, 26, -1, -1, -1, 27, 28, 29, 30, 31, 32, -1, -1, -1, -1, -1, 33, 34, 35, 36, 37, 38, -1, -1, -1, -1, -1, -1, 39, 40, 41, 42, 43, 44, -1, -1, -1, -1, -1, 45, 46, 47, 48, 49, 50, -1, -1, -1, 51, 52, 53, 54, 55, 56, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];


export class Game {

    constructor() {
        // TODO
        this.board = new Board(new Array(144).fill(true),
            Board.generateTypes(),
            INIT_NEIGHBORS_TOP,
            INIT_NEIGHBORS_LEFT,
            INIT_NEIGHBORS_RIGHT
        )
        this.moves = this.board.findMoves();
        // setTimeout(0, 12000); // timer for game set to 12m
    }

    timer() {
        // TODO
    }

    pause() {
        // TODO
    }

    /**
     * Shuffles the board's tiles.
     */
    shuffleBoard(): void {
        this.board.types = shuffleArray(this.board.types);
    }

    /**
     * Returns true iff 2 tiles on a board are the same type.
     * @param tileA
     * @param tileB
     * @returns {boolean}
     */
    tilesMatch(tileA: number, tileB: number): boolean {
        return this.board.types[tileA] === this.board.types[tileB];
    }

    /**
     * Returns true iff a tile can be played.
     * @param tile
     * @returns {boolean}
     */
    tilePlayable(tile: number): boolean {
        if (this.board.types[tile] === -1) {
            return false;
        }
        return !this.board.hasTopNeighbor(tile) &&
            (this.board.hasLeftNeighbor(tile) || this.board.hasRightNeighbor(tile));
    }

    /**
     * Tries to play 2 tiles. If a move is successful, the board will be updated.
     * @param tileA
     * @param tileB
     */
    makeMove(tileA: number, tileB: number): void {
        if (this.tilePlayable(this.board, tileA) &&
            this.tilePlayable(this.board, tileB) &&
            this.tilesMatch(tileA, tileB)) {
            // Update board
            this.updateNeighbors(tileA);
            this.updateNeighbors(tileB);
            this.board.types[tileA] = -1;
            this.board.types[tileB] = -1;
            this.moves--;
            if (this.moves === 0) {
                if (this.board.shuffled) {
                    // TODO end game
                } else {
                    this.board.shuffled = true;
                    this.shuffleBoard();
                }
            }
        }
    }

    updateNeighbors(tile: number) {
        this.removeTileNeighbors(this.board.left, tile);
        this.removeTileNeighbors(this.board.right, tile);
        this.removeTileNeighbors(this.board.findBottoms(), tile);
    }

    /**
     * Removes a tile from its neighbors.
     * @param tiles A list of tiles to update
     * @param tile The tile to remove
     */
    removeTileNeighbors(tiles: (number | number[])[], tile: number): void {
        let neighbors = tiles[tile]; // Represents the neighbors of a tile
        if (!Array.isArray(neighbors)) {
            // Only 1 neighbor to update
            tiles[neighbors] = -1;
            return;
        }
        if (neighbors.length > 0) {
            // Multiple neighbors to update
            neighbors.forEach((neighbor) => {
                tiles[neighbor] = -1;
            })
        }
    }
}