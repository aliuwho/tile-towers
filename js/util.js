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