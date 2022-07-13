import {shuffleArray} from "./util";
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
    constructor(props) {
        super(props);
    }

    renderTile(tileIndex: number) {
        return (
            <Tile
                index={tileIndex}
                type={this.props.types[tileIndex]}
                selected={this.props.selected}
                handler={this.props.handler}
                left={this.props.left[tileIndex]}
            />
        );
    }

    renderLayerZero() {
        return (
            <div className="board-layer">
                <div className="board-row">
                    {this.renderTile(0)}
                </div>
            </div>
        )
    }

    renderLayerOne() {
        const layer = this.props.types.slice(1, 5);
        return (
            <div className="board-layer">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_ONE, 1)}
            </div>
        )
    }

    renderLayerTwo() {
        const layer = this.props.types.slice(5, 21);
        return (
            <div className="board-layer">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_TWO, 5)}
            </div>
        )
    }

    renderLayerThree() {
        const layer = this.props.types.slice(21, 57);
        return (
            <div className="board-layer">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_THREE, 21)}
            </div>
        )
    }

    renderLayerFour() {
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
        index += WIDTH_LEVEL_FOUR_A;
        let offRow1 = layer.slice(index, index + 1); // unaligned 3 pieces
        index++;
        let offRow2 = layer.slice(index);

        let offset = 0;

        return (
            <div className="board-layer">
                <div className="board-off-row-1">
                    {this.renderRow(offRow1, 141)}
                </div>
                {rows.map(row => {
                    let ret = <div className="board-row">
                        {this.renderRow(row, 57 + offset)}
                    </div>
                    offset += row.length;
                    return ret;
                })}
                <div className="board-off-row-2">
                    {this.renderRow(offRow2, 142)}
                </div>
            </div>
        )
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(layer: number[], width: number, indexOffset: number) {
        const numRows = layer.length / width;
        let rows = []
        for (let i = 0; i < numRows; i++) {
            const start = i * width;
            rows.push(layer.slice(start, start + width))
        }
        return (
            rows.map((row, rowNum) => (
                <div className="board-row">
                    {this.renderRow(row, indexOffset + rowNum * width)}
                </div>
            ))
        )
    }

    renderRow(row, indexOffset) {
        return (row.map((tileType, tileIndex) => (this.renderTile(tileIndex + indexOffset))))
    }

    render() {
        return (
            <div>
                {this.renderLayerFour()}
                {this.renderLayerThree()}
                {this.renderLayerTwo()}
                {this.renderLayerOne()}
                {this.renderLayerZero()}
            </div>
        );
    }
}