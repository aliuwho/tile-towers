export interface Tile {
    type: number,
    layer: number, // used to render tile
    position: number, // used to render tile
    top: Tile;
    left: Tile;
    right: Tile;
}