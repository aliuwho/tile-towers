import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {newBoard} from "./board";

// Represents width of rectangle grids on specified layer
const WIDTH_LEVEL_ONE = 2;
const WIDTH_LEVEL_TWO = 4;
const WIDTH_LEVEL_THREE = 6;
const WIDTH_LEVEL_FOUR_A = 12;
const WIDTH_LEVEL_FOUR_B = 8;
const WIDTH_LEVEL_FOUR_C = 10;

function Tile(props) {
    return (
        // <button className="tile" onClick={props.onClick}>
        <button className="tile">
            {props.value}
        </button>
    );
}

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: newBoard()
        };
    }

    // handleClick(i) {
    //     const tiles = this.state.tiles.slice();
    //     tiles[i] = 'help';
    //     this.setState({
    //         tiles: tiles
    //     });
    // }

    renderTile(tileIndex: number) {
        return (
            <Tile
                value={tileIndex}
                // onClick={() => this.props.onClick(tile)}
            />
        );
    }

    renderLayerZero() {
        return (
            <div className="board-layer">
                <div className="board-row">
                    {this.renderTile(this.state.board.types[0])}
                </div>
            </div>
        )
    }

    renderLayerOne() {
        const layer = this.state.board.types.slice(1, 5);
        return this.renderSquareLayer(layer, WIDTH_LEVEL_ONE)
    }

    renderLayerTwo() {
        const layer = this.state.board.types.slice(5, 21);
        return this.renderSquareLayer(layer, WIDTH_LEVEL_TWO)
    }

    renderLayerThree() {
        const layer = this.state.board.types.slice(21, 57);
        return this.renderSquareLayer(layer, WIDTH_LEVEL_THREE);
    }

    renderLayerFour() {
        let layer = this.state.board.types.slice(57);
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
        rows.push(layer.slice(index)); // unaligned 3 pieces

        return (
            <div className="board-layer">
                {rows.map(row => (
                    <div className="board-row">
                        {row.map(tileType => (this.renderTile(tileType)))}
                    </div>
                ))}
            </div>
        )
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(layer: number[], width: number) {
        const numRows = layer.length / width;
        let rows = []
        for (let i = 0; i < numRows; i++) {
            const start = i * width;
            rows.push(layer.slice(start, start + width))
        }
        return (
            <div className="board-layer">
                {rows.map(row => (
                    <div className="board-row">
                        {row.map(tileType => (this.renderTile(tileType)))}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderLayerZero()}
                {this.renderLayerOne()}
                {this.renderLayerTwo()}
                {this.renderLayerThree()}
                {this.renderLayerFour()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <BoardComponent/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);