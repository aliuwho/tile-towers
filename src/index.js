import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {copyBoard, newBoard} from "./board";

// Represents width of rectangle grids on specified layer
const WIDTH_LEVEL_ONE = 2;
const WIDTH_LEVEL_TWO = 4;
const WIDTH_LEVEL_THREE = 6;
const WIDTH_LEVEL_FOUR_A = 12;
const WIDTH_LEVEL_FOUR_B = 8;
const WIDTH_LEVEL_FOUR_C = 10;

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        };
    }

    handleClick() {
        // alert("hello");
    }

    render() {
        return (
            // <button className="tile" onClick={handleClick()}>
            <button className="tile" onClick={this.handleClick()}>
                {this.state.type}
            </button>
        );
    }
}

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: newBoard()
        };
    }

    handleClick(i) {
        const board = copyBoard(this.state.board);
        board.tiles[i] = "i was clicked";
        this.setState({
            board: board
        });
    }

    renderTile(tileType: number, tileIndex: number) {
        return (
            <Tile
                type={tileType}
                onClick={() => this.props.onClick(tileIndex)}
            />
        );
    }

    renderLayerZero() {
        return (
            <div className="board-layer-0">
                <div className="grid-container">
                    {this.renderTile(this.state.board.types[0], 0)}
                </div>
            </div>
        )
    }

    renderLayerOne() {
        const layer = this.state.board.types.slice(1, 5);
        return (
            <div className="board-layer-1">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_ONE)}
            </div>
        )
    }

    renderLayerTwo() {
        const layer = this.state.board.types.slice(5, 21);
        return (
            <div className="board-layer-3">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_TWO)}
            </div>
        )
    }

    renderLayerThree() {
        const layer = this.state.board.types.slice(21, 57);
        return (
            <div className="board-layer-3">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_THREE)}
            </div>
        )
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
            <div className="board-layer-4">
                {rows.map(row => (
                    <div className="board-row">
                        {row.map((tileType, tileIndex) => (this.renderTile(tileType, tileIndex)))}
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
            rows.map(row => (
                <div className="board-row">
                    {row.map((tileType, tileIndex) => (this.renderTile(tileType, tileIndex)))}
                </div>
            ))
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