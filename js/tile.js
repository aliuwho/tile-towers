export interface Tile {
    type: number,
    layer: number, // used to render tile
    position: number, // used to render tile
    top: Tile;
    left: Tile;
    right: Tile;
}

/**
 * Sets a tile's neighbors. Updates above index.
 * @param tile
 * @param rowWidth
 * @param prevTile
 * @param nextTile
 * @param aboveTile
 * @param aboveIndex
 */
export function setNeighbors(tile: Tile, rowWidth: number, prevTile: Tile, nextTile: Tile, aboveTile: Tile,
                             aboveIndex: number) {
    const rowPosition = tile.position % rowWidth;
    // Update left neighbor
    if (rowPosition > 0) {
        tile.left = prevTile;
    }

    // Update right neighbor
    if (rowPosition + 1 < rowWidth) {
        tile.right = nextTile;
    }

    // Update top neighbor
    if (rowPosition > 0 && rowPosition + 1 < rowWidth) {
        tile.top = aboveTile;
        aboveIndex++;
    }
}