import {NUM_TILE_TYPES} from "./boardComponent";

/**
 * Returns a random integer in the range 0...val (inclusive)
 */
export function randInt(val): number {
    return Math.floor(Math.random() * val);
}

/**
 * Shuffles an array using the Fisher-Yates shuffle.
 * Javascript implementation taken from Stack Overflow:
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export function shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Generates tile types for a Tile Towers board.
 * @returns {number[]}
 */
export function generateTypes(): number[] {
    let types: number[] = [];
    for (let i = 0; i < NUM_TILE_TYPES; i++) {
        types.push(i, i, i, i);
    }
    // Randomize tile distribution
    types = shuffleArray(types);
    return types;
}

export const TILE_DIM = Math.max(Math.min(window.innerWidth, window.innerHeight) / 12, 25);
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight