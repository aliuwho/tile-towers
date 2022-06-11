export interface Tile {
    type: number,
    top: Tile;
    left: Tile;
    right: Tile;
}