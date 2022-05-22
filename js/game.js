import type {setNeighbors, Tile} from "./tile";
import {randInt, shuffle} from "./util";

const NUM_TILE_TYPES = 36;
const NUM_TOTAL_TILES = 144;
const NUM_TILES_LEVEL_FOUR = 87;
const NUM_TILES_LEVEL_THREE = 36;
const NUM_TILES_LEVEL_TWO = 16;
const NUM_TILES_LEVEL_ONE = 4;
const NUM_TILES_LEVEL_ZERO = 1;

// Represents width of rectangle grids on specified layer
const WIDTH_LEVEL_TWO = 4;
const WIDTH_LEVEL_THREE = 6;
const WIDTH_LEVEL_FOUR_A = 12;
const WIDTH_LEVEL_FOUR_B = 8;
const WIDTH_LEVEL_FOUR_C = 10;

/**
 * Creates a Tile Towers game board.
 */
function makeBoard(): Tile[][] {
    let tiles = makeTiles();
    let board: Tile[] = [];
    // Construct the board from top to bottom
    makeLayerZero(tiles, board);
    makeLayerOne(tiles, board);
    makeLayerTwo(tiles, board);
    makeLayerThree(tiles, board);
    makeLayerFour(tiles, board);
    return board;
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
    tiles = shuffle(tiles);
    return tiles;
}

/**
 * Appends tiles to the layer-4 layer. Updates position and above index.
 * @param numTiles
 * @param layer
 * @param tiles
 * @param aboveTiles
 * @param position
 * @param aboveIndex
 */
function appendTilesToFour(numTiles: number, layer: Tile[], tiles: Tile[], aboveTiles: Tile[], position: number,
                           aboveIndex: number) {
    for (let i = 0; i < numTiles; i++) {
        let tile = tiles.pop();
        tile.layer = 4;
        tile.position = i; // Temporary position to properly set neighbors
        setNeighbors(tile, numTiles, layer[layer.length - 1], tiles[tiles.length - 1],
            aboveTiles[aboveIndex], aboveIndex);
        tile.position = position;
        layer.push(tile);
        position++;
    }
}

/**
 *
 * @param tiles
 * @param board
 */
function makeLayerFour(tiles: Tile[], board: Tile[][]): void {
    // Central 12 x 8 section:
    let layer: Tile[] = [];
    const aboveTiles: Tile[] = board[3];
    let position = 0;
    let aboveIndex = 0;
    // Follows pattern A-B-C-A A-C-B-A
    appendTilesToFour(WIDTH_LEVEL_FOUR_A, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_B, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_C, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_A, layer, tiles, aboveTiles, position, aboveIndex);

    appendTilesToFour(WIDTH_LEVEL_FOUR_A, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_C, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_B, layer, tiles, aboveTiles, position, aboveIndex);
    appendTilesToFour(WIDTH_LEVEL_FOUR_A, layer, tiles, aboveTiles, position, aboveIndex);

    // Outside 3 pieces:
    let tile = tiles.pop();
    tile.layer = 4;
    tile.position = position;
    layer[30].left = tile;
    layer[42].left = tile;
    layer.push(tile);
    position++;

    tile = tiles.pop();
    tile.layer = 4;
    tile.position = position;
    tile.right = tiles[tiles.length - 1];
    layer[41].right = tile;
    layer[53].right = tile;
    layer.push(tile);
    position++;

    tile = tiles.pop();
    tile.layer = 4;
    tile.position = position;
    tile.left = layer[85];
    layer.push(tile);

    board.push(layer);
}

/**
 * Adds layer 3 tiles to board.
 * 6 x 6 board
 * @param tiles
 * @param board
 */
function makeLayerThree(tiles: Tile[], board: Tile[][]): Tile[][] {
    let layer: Tile[] = [];
    const aboveTiles: Tile[] = board[2];
    let aboveIndex = 0;
    for (let i = 0; i < NUM_TILES_LEVEL_THREE; i++) {
        let tile = tiles.pop();
        tile.layer = 3;
        tile.position = i;
        setNeighbors(tile, WIDTH_LEVEL_THREE, layer[layer.length - 1], tiles[tiles.length - 1],
            aboveTiles[aboveIndex], aboveIndex);
        layer.push(tile);
    }
    board.push(layer);
}

/**
 * Adds layer 2 tiles to board.
 * 4 x 4 board
 * @param tiles
 * @param board
 */
function makeLayerTwo(tiles: Tile[], board: Tile[]): void {
    let layer: Tile[] = [];
    const aboveTiles: Tile[] = board[1];
    let aboveIndex = 0;
    for (let i = 0; i < NUM_TILES_LEVEL_TWO; i++) {
        let tile = tiles.pop();
        tile.layer = 2;
        tile.position = i;
        setNeighbors(tile, WIDTH_LEVEL_TWO, layer[layer.length - 1], tiles[tiles.length - 1],
            aboveTiles[aboveIndex], aboveIndex);
        layer.push(tile);
    }
    board.push(layer);
}

/**
 * Adds layer 3 tiles to board.
 * 2 x 2 board
 * @param tiles
 * @param board
 */
function makeLayerOne(tiles: Tile[], board: Tile[][]): void {
    let layer: Tile[] = [];
    const aboveTile: Tile = board[0][0];
    for (let i = 0; i < NUM_TILES_LEVEL_ONE; i++) {
        let tile = tiles.pop();
        tile.layer = 3;
        tile.position = i;
        tile.top = aboveTile;
        layer.push(tile);
    }
    for (let tile of layer) {
        switch (tile.position) {
            case 0:
                tile.right = layer[1];
                break;
            case 1:
                tile.left = layer[0];
                break;
            case 2:
                tile.right = layer[3];
                break;
            case 3:
                tile.left = layer[2];
                break;
        }
    }
    board.push(layer);
}

/**
 * Adds layer 4 tile to board.
 * 1 x 1 board
 * @param tiles
 * @param board
 * @returns {Tile[]}
 */
function makeLayerZero(tiles: Tile[], board: Tile[]): void {
    let tile = tiles.pop();
    tile.layer = 4;
    tile.position = 0;
    board.push([tile]);
}