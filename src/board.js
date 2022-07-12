import {shuffleArray} from "./util";

export const NUM_TILE_TYPES = 36;

// export const NUM_TOTAL_TILES = 144;

export class Board {
    // private tiles: boolean[144];
    // private types: number[144];
    // private top: number[144];
    // private left: (number | number[])[144];
    // private right: (number | number[])[144];
    // private shuffled: boolean;

    constructor(tiles, types: number[], top: number[], left: (number | number[])[],
                right: (number | number[])[], shuffled: boolean) {
        this.types = types;
        this.top = top;
        this.left = left;
        this.right = right;
        this.shuffled = shuffled;
    }

    /**
     * Returns the number of playable moves for a given board
     */
    findMoves(): number {
        // TODO
        return 0;
    }

    /**
     * Finds bottom neighbors of a tile
     * @returns {[]}
     * @param targetTile
     */
    findBottoms(targetTile: number): number[] {
        let bottoms = [];
        this.top.forEach((tile, bottom) => {
            if (tile === targetTile) {
                bottoms.push(bottom);
            }
        });
        return bottoms;
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

    hasTopNeighbor(tile: number): boolean {
        return this.top[tile] === -1;
    }

    hasLeftNeighbor(tile: number): boolean {
        let left = this.left[tile];
        if (Array.isArray(left)) {
            return left.length === 0;
        } else {
            return left === -1;
        }
    }

    hasRightNeighbor(tile: number): boolean {
        let right = this.right[tile];
        if (Array.isArray(right)) {
            return right.length === 0;
        } else {
            return right === -1;
        }
    }
}