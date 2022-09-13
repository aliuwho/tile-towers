import React from 'react';
import {Tile} from "./tile";

export const NUM_TILE_TYPES = 36;

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

export class BoardComponent extends React.Component {
    // private tiles: number[144];
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
                type={this.props.tiles[tileIndex]}
                selected={this.props.selected}
                handler={this.props.handler}
                right={this.props.right[tileIndex]}
                renderDim={this.props.renderDim}
            />
        );
    }

    renderLayerZero() {
        return this.renderTile(0, 5,
            this.props.centerX + this.props.alignOffset,
            this.props.centerY - this.props.alignOffset);
    }

    renderLayerOne() {
        return this.renderSquareLayer(WIDTH_LEVEL_ONE, 1, 4,
            this.props.centerX - this.props.renderDim / 2,
            this.props.centerY - this.props.renderDim / 2);
    }

    renderLayerTwo() {
        return (this.renderSquareLayer(WIDTH_LEVEL_TWO, 5, 3,
            this.props.centerX - this.props.renderDim / 2 * 3 - this.props.alignOffset,
            this.props.centerY - this.props.renderDim / 2 * 3 + this.props.alignOffset));
    }

    renderLayerThree() {
        return this.renderSquareLayer(WIDTH_LEVEL_THREE, 21, 2,
            this.props.centerX - this.props.renderDim / 2 * 5 - this.props.alignOffset * 2,
            this.props.centerY - this.props.renderDim / 2 * 5 + this.props.alignOffset * 2);
    }

    renderLayerFourA() {
        console.log(this.props.centerX)
        console.log(this.props);
        return this.renderTile(141, 1,
            this.props.centerX - this.props.renderDim / 2 * 13 - this.props.alignOffset * 3,
            this.props.centerY + this.props.alignOffset * 3);

    }

    renderLayerFourC() {
        let left = this.props.centerX + this.props.renderDim / 2 * 13 - this.props.alignOffset * 3;
        let top = this.props.centerY + this.props.alignOffset * 3;
        return [this.renderTile(143, 1, left + this.props.renderDim, top),
            this.renderTile(142, 1, left, top)];
    }

    renderLayerFourB() {
        let layer = [];
        let offset = 0;
        let startY = this.props.centerY - this.props.renderDim / 2 * 7 + this.props.alignOffset * 3
        LEVEL_FOUR_WIDTHS.forEach(((width, rowNum) => {
            layer.push(this.renderRow(width,
                57 + offset,
                1,
                this.props.centerX + this.props.renderDim / 2 - (this.props.renderDim * width / 2) - this.props.alignOffset * 3,
                startY + this.props.renderDim * rowNum))
            offset += width;
        }));
        return layer;
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(widthLength: number, startIndex: number, zIndex: number, left: number, top: number) {
        let layer = []
        for (let i = 0; i < widthLength; i++) {
            let row = this.renderRow(widthLength, startIndex + widthLength * i, zIndex, left, top + this.props.renderDim * i);
            layer.push(row)
        }
        return layer;
    }

    renderRow(numTiles: number, startIndex: number, zIndex: number, left: number, top: number) {
        let tiles = []
        for (let i = 0; i < numTiles; i++) {
            let tile = this.renderTile(startIndex + numTiles - i - 1,
                zIndex,
                left + this.props.renderDim * (numTiles - i - 1),
                top);
            tiles.push(tile);
        }
        return tiles;
    }

    render() {
        return (
            <div className='board'>
                {this.renderLayerFourC()}
                {this.renderLayerFourB()}
                {this.renderLayerFourA()}
                {this.renderLayerThree()}
                {this.renderLayerTwo()}
                {this.renderLayerOne()}
                {this.renderLayerZero()}
            </div>
        );
    }
}