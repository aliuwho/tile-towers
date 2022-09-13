import {shuffleArray} from "./util";
import {NUM_TILE_TYPES} from "./boardComponent";

export default class Board {
    // Map neighbor positions
    static NEIGHBORS_LEFT = [-1, -1, 1, -1, 3, -1, 5, 6, 7, -1, 9, 10, 11, -1, 13, 14, 15, -1, 17, 18, 19, -1, 21, 22, 23, 24, 25, -1, 27, 28, 29, 30, 31, -1, 33, 34, 35, 36, 37, -1, 39, 40, 41, 42, 43, -1, 45, 46, 47, 48, 49, -1, 51, 52, 53, 54, 55, -1, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, -1, 69, 70, 71, 72, 73, 74, 75, -1, 77, 78, 79, 80, 81, 82, 83, 84, 85, 141, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 141, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, -1, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1, 121, 122, 123, 124, 125, 126, 127, -1, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, -1, [98, 110], 142];
    static NEIGHBORS_RIGHT = [-1, 2, -1, 4, 5, 6, 7, 8, -1, 10, 11, 12, -1, 14, 15, 16, -1, 18, 19, 20, -1, 22, 23, 24, 25, 26, -1, 28, 29, 30, 31, 32, -1, 34, 35, 36, 37, 38, -1, 40, 41, 42, 43, 44, -1, 46, 47, 48, 49, 50, -1, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, 76, -1, 78, 79, 80, 81, 82, 83, 84, 85, 86, -1, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 142, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 142, 112, 113, 114, 115, 116, 117, 118, 119, 120, -1, 122, 123, 124, 125, 126, 127, 128, -1, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, -1, [87, 99], 143, -1];
    static NEIGHBORS_TOP = [-1, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, 2, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 7, 8, -1, -1, 9, 10, 11, 12, -1, -1, 13, 14, 15, 16, -1, -1, 17, 18, 19, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 21, 22, 23, 24, 25, 26, -1, -1, -1, 27, 28, 29, 30, 31, 32, -1, -1, -1, -1, -1, 33, 34, 35, 36, 37, 38, -1, -1, -1, -1, -1, -1, 39, 40, 41, 42, 43, 44, -1, -1, -1, -1, -1, 45, 46, 47, 48, 49, 50, -1, -1, -1, 51, 52, 53, 54, 55, 56, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    static  NUM_TILES = 144;

    // types: number[];
    constructor(tiles: number[]) {
        if (tiles) {
            this.tiles = tiles;
        } else {
            this.tiles = Board.generateTypes();
        }
    }

    /**
     * Generates tile types for a Tile Towers board.
     * @returns {number[]}
     */
    static generateTypes(): number[] {
        let types: number[] = [];
        for (let i = 0; i < NUM_TILE_TYPES; i++) {
            types.push(i, i, i, i);
        }
        // Randomize tile distribution
        types = shuffleArray(types);
        return types;
    }

    /**
     * Returns true iff 2 tiles on a board are the same type.
     * @param indexA
     * @param indexB
     * @returns {boolean}
     */
    tilesMatch(indexA: number, indexB: number): boolean {
        return this.tiles[indexA] === this.tiles[indexB];
    }

    /**
     * Returns true iff a tile can be played.
     * @param tileIndex
     * @returns {boolean}
     */
    tilePlayable(tileIndex: number): boolean {
        if (this.tiles[tileIndex] === -1) {
            return false;
        }
        return this.noTopNeighbor(tileIndex) &&
            (this.noLeftNeighbor(tileIndex) || this.noRightNeighbor(tileIndex));
    }

    /**
     * Returns true if tile does not have a top neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noTopNeighbor(tileIndex: number): boolean {
        let topNeighbor = Board.NEIGHBORS_TOP[tileIndex];
        if (topNeighbor === -1) {
            // No top tile exists
            return true;
        }
        // Returns true if existing above tile has been removed
        return this.tiles[topNeighbor] === -1;
    }

    /**
     * Returns true if tile has no left neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noLeftNeighbor(tileIndex: number): boolean {
        let leftNeighbor = Board.NEIGHBORS_LEFT[tileIndex];
        if (Array.isArray(leftNeighbor)) {
            return this.tiles[leftNeighbor[0]] === -1 &&
                this.tiles[leftNeighbor[1]] === -1;
        } else {
            if (leftNeighbor === -1) {
                // No left tile exists
                return true;
            }
            // Returns true if existing left tile has been removed
            return this.tiles[leftNeighbor] === -1;
        }
    }

    /**
     * Returns true if tile has no right neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noRightNeighbor(tileIndex: number): boolean {
        let rightNeighbor = Board.NEIGHBORS_RIGHT[tileIndex];
        if (Array.isArray(rightNeighbor)) {
            return this.tiles[rightNeighbor[0]] === -1 &&
                this.tiles[rightNeighbor[1]] === -1;
        } else {
            if (rightNeighbor === -1) {
                // No right tile exists
                return true;
            }
            // Returns true if existing right tile has been removed
            return this.tiles[rightNeighbor] === -1;
        }
    }

    /**
     * Tries to play 2 tiles. If a move is successful, the board will be updated.
     * Returns true iff move was successful; false otherwise.
     * @param tileA
     * @param tileB
     */
    makeMove(tileA: number, tileB: number): boolean {
        if (this.tilePlayable(tileA) && this.tilePlayable(tileB)) {
            if (this.tilesMatch(tileA, tileB)) {
                // Update board
                this.tiles[tileA] = -1;
                this.tiles[tileB] = -1;
                return true;
            } else {
                console.log("Tiles did not match.");
            }
        } else {
            if (this.tilePlayable(tileA)) {
                console.log(tileA + "was not playable.");
            }
            if (this.tilePlayable(tileB)) {
                console.log(tileB + "was not playable.");
            }
        }
        return false;
    }

    /**
     * Shuffles the board's tiles.
     */
    shuffleTiles(): void {
        let currTypes = this.tiles.slice().filter(type => type !== -1)
        currTypes = shuffleArray(currTypes);
        let newTypes = this.tiles.slice()
        newTypes.forEach((type, i) => {
            if (type !== -1) {
                newTypes[i] = currTypes.pop()
            }
        });
        this.tiles = newTypes;
        if (this.noMoves()) {
            this.shuffleTiles();
        }
    }

    /**
     * Finds a move for a board (if one exists) as a pair of indices.
     * If none exists, then returns [-1, -1].
     * @returns {number[]}
     */
    findMove(): number[] {
        for (let i = 0; i < Board.NUM_TILES; i++) {
            if (this.tilePlayable(i)) {
                for (let j = 0; j < Board.NUM_TILES; j++) {
                    if (j !== i && this.tilePlayable(j) && this.tilesMatch(i, j)) {
                        return [i, j];
                    }
                }
            }
        }
        return [-1, -1];
    }

    noMoves(): boolean {
        let move = this.findMove();
        return move[0] === -1 && move[1] === -1;
    }

    getTiles() {
        return this.tiles.slice();
    }
}