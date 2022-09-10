import React from 'react';
import {Tile} from "./tile";
import {TILE_DIM, WINDOW_HEIGHT, WINDOW_WIDTH} from "./util";

export const NUM_TILE_TYPES = 36;

// export const NUM_TOTAL_TILES = 144;

// Represents width of rectangle grids on specified layer
const WIDTH_LEVEL_ONE = 2;
const WIDTH_LEVEL_TWO = 4;
const WIDTH_LEVEL_THREE = 6;
const WIDTH_LEVEL_FOUR_A = 12;
const WIDTH_LEVEL_FOUR_B = 8;
const WIDTH_LEVEL_FOUR_C = 10;

const LEVEL_FOUR_WIDTHS = [WIDTH_LEVEL_FOUR_A, WIDTH_LEVEL_FOUR_B, WIDTH_LEVEL_FOUR_C,
    WIDTH_LEVEL_FOUR_A, WIDTH_LEVEL_FOUR_A, WIDTH_LEVEL_FOUR_C,
    WIDTH_LEVEL_FOUR_B, WIDTH_LEVEL_FOUR_A]

const CENTER_X = WINDOW_WIDTH * 0.75 / 2;
const CENTER_Y = WINDOW_HEIGHT * 0.75 / 2 - TILE_DIM;

export class Board extends React.Component {
    // private tiles: boolean[144];
    // private types: number[144];
    // private top: number[144];
    // private left: (number | number[])[144];
    // private right: (number | number[])[144];
    // private shuffled: boolean;
    // constructor(props) {
    //     super(props);
    // }

    renderTile(tileIndex: number, zIndex: number, leftOffset: number, topOffset: number) {
        let leftArg = leftOffset + 'px';
        let topArg = topOffset + 'px';
        return (
            <Tile
                style={{position: 'absolute', left: leftArg, top: topArg}}
                index={tileIndex}
                type={this.props.types[tileIndex]}
                selected={this.props.selected}
                handler={this.props.handler}
                right={this.props.types[tileIndex]}
            />
        );
    }

    renderLayerZero() {
        return this.renderTile(0, 5, CENTER_X, CENTER_Y);
    }

    renderLayerOne() {
        return this.renderSquareLayer(WIDTH_LEVEL_ONE, 1, 4,
            CENTER_X - TILE_DIM / 2,
            CENTER_Y - TILE_DIM / 2);
    }

    renderLayerTwo() {
        return (this.renderSquareLayer(WIDTH_LEVEL_TWO, 5, 3,
            CENTER_X - TILE_DIM / 2 * 3,
            CENTER_Y - TILE_DIM / 2 * 3));
    }

    renderLayerThree() {
        return this.renderSquareLayer(WIDTH_LEVEL_THREE, 21, 2,
            CENTER_X - TILE_DIM / 2 * 5,
            CENTER_Y - TILE_DIM / 2 * 5);
    }

    renderLayerFourA() {
        return this.renderTile(141, 1,
            CENTER_X - TILE_DIM / 2 * 13,
            CENTER_Y);
    }

    renderLayerFourC() {
        let left = CENTER_X + TILE_DIM / 2 * 13;
        let top = CENTER_Y;
        return [this.renderTile(142, 1, left, top),
            this.renderTile(143, 1, left + TILE_DIM, top)];
    }

    renderLayerFourB() {
        let layer = [];
        let offset = 0;
        let startY = CENTER_Y - TILE_DIM / 2 * 7
        LEVEL_FOUR_WIDTHS.forEach(((width, rowNum) => {
            layer.push(this.renderRow(width,
                57 + offset,
                1,
                CENTER_X + TILE_DIM / 2 - (TILE_DIM * width / 2),
                startY + TILE_DIM * rowNum))
            offset += width;
        }));
        return layer;
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(widthLength: number, startIndex: number, zIndex: number, left: number, top: number) {
        let layer = []
        for (let i = 0; i < widthLength; i++) {
            let row = this.renderRow(widthLength, startIndex + widthLength * i, zIndex, left, top + TILE_DIM * i);
            layer.push(row)
        }
        return layer;
    }

    renderRow(numTiles: number, startIndex: number, zIndex: number, left: number, top: number) {
        let tiles = []
        for (let i = 0; i < numTiles; i++) {
            let tile = this.renderTile(startIndex + i,
                zIndex,
                left + TILE_DIM * i,
                top);
            tiles.push(tile);
        }
        return tiles;
    }

    render() {
        return (
            <div className='board'>
                {this.renderLayerFourA()}
                {this.renderLayerFourB()}
                {this.renderLayerFourC()}
                {this.renderLayerThree()}
                {this.renderLayerTwo()}
                {this.renderLayerOne()}
                {this.renderLayerZero()}
            </div>
        );
    }
}