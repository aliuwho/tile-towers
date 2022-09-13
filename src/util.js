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
 * Sleep! Zzz....
 * @param ms
 * @returns {Promise<unknown>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;

export function getRenderDim() {
    let minWidth = WINDOW_WIDTH / 20;
    let minHeight = WINDOW_HEIGHT / 11;
    return Math.min(minWidth, minHeight);
}
