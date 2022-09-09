import React from 'react';
import {Tile} from "./tile";

export const NUM_TILE_TYPES = 36;

// export const NUM_TOTAL_TILES = 144;

// Represents width of rectangle grids on specified layer
const WIDTH_LEVEL_ONE = 2;
const WIDTH_LEVEL_TWO = 4;
const WIDTH_LEVEL_THREE = 6;
const WIDTH_LEVEL_FOUR_A = 12;
const WIDTH_LEVEL_FOUR_B = 8;
const WIDTH_LEVEL_FOUR_C = 10;

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
                right={this.props.right[tileIndex]}
            />
        );
    }

    renderLayerZero() {
        return (this.renderTile(0, 5, 20, 20));
    }

    renderLayerOne() {
        const layer = this.props.types.slice(1, 5);
        return (this.renderSquareLayer(layer, WIDTH_LEVEL_ONE, 1, 4));
    }

    renderLayerTwo() {
        const layer = this.props.types.slice(5, 21);
        return (this.renderSquareLayer(layer, WIDTH_LEVEL_TWO, 5, 3));
    }

    renderLayerThree() {
        const layer = this.props.types.slice(21, 57);
        return (this.renderSquareLayer(layer, WIDTH_LEVEL_THREE, 21, 2));
    }

    renderLayerFourA() {
        return (this.renderRow(this.props.types.slice(84, 85), 141, 1));
    }

    renderLayerFourC() {
        return (this.renderRow(this.props.types.slice(85, 87), 142, 1));

    }

    renderLayerFourB() {
        let layer = this.props.types.slice(57);
        let rows = [];
        let index = 0;
        rows.push(layer.slice(index, WIDTH_LEVEL_FOUR_A));
        index += WIDTH_LEVEL_FOUR_A;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_B))
        index += WIDTH_LEVEL_FOUR_B;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_C));
        index += WIDTH_LEVEL_FOUR_C;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_A));
        index += WIDTH_LEVEL_FOUR_A;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_A));
        index += WIDTH_LEVEL_FOUR_A;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_C));
        index += WIDTH_LEVEL_FOUR_C;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_B));
        index += WIDTH_LEVEL_FOUR_B;
        rows.push(layer.slice(index, index + WIDTH_LEVEL_FOUR_A));
        let offset = 0;
        return (rows.map(row => {
            let ret = this.renderRow(row, 57 + offset)
            offset += row.length;
            return ret;
        }));
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(layer: number[], width: number, indexOffset: number, zIndex: number) {
        const numRows = layer.length / width;
        let rows = []
        for (let i = 0; i < numRows; i++) {
            const start = i * width;
            rows.push(layer.slice(start, start + width))
        }
        return (rows.map((row, rowNum) => (
            this.renderRow(row, indexOffset + rowNum * width, zIndex)
        )));
    }

    renderRow(row: number[], indexOffset, zIndex) {
        let left = Math.random() * 1000;
        let top = Math.random() * 1000;
        return (row.map((tileType, tileIndex) => (this.renderTile(tileIndex + indexOffset, zIndex, left, top))));
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