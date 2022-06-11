import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    makeBoard,
    WIDTH_LEVEL_FOUR_A,
    WIDTH_LEVEL_FOUR_B,
    WIDTH_LEVEL_FOUR_C,
    WIDTH_LEVEL_THREE,
    WIDTH_LEVEL_TWO
} from "./board";
import {makeTiles} from "./game";

function Tile(props) {
    return (
        <button className="tile" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: makeBoard(makeTiles())
        };
    }

    handleClick(i) {
        const tiles = this.state.tiles.slice();
        tiles[i] = 'help';
        this.setState({
            tiles: tiles
        });
    }

    renderTile(tile: Tile) {
        return (
            <Tile
                value={tile.position}
                onClick={() => this.props.onClick(tile)}
            />
        );
    }

    renderZero() {
        return (
            <div className="board-layer">
                <div className="board-row">
                    {this.renderTile(this.state.tiles[0][0])}
                </div>
            </div>
        )
    }

    renderOne() {
        const layer: Tile[] = this.state.tiles[1]
        return (
            <div className="board-layer">
                <div className="board-row">
                    {[this.renderTile(layer[0]), this.renderTile(layer[1])]}
                </div>
                <div className="board-row">
                    {[this.renderTile(layer[2]), this.renderTile(layer[3])]}
                </div>
            </div>
        )
    }

    renderTwo() {
        return this.renderSquareLayer(this.state.tiles[2], WIDTH_LEVEL_TWO)
    }

    renderThree() {
        return this.renderSquareLayer(this.state.tiles[3], WIDTH_LEVEL_THREE);
    }

    renderFour() {
        let layer: Tile[] = this.state.tiles[4];
        let rows: Tile[][] = [];
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
                        {row.map(tile => (this.renderTile(tile)))}
                    </div>
                ))}
            </div>
        )
    }

    // Renders a square shaped layer using a layer's tiles and width
    renderSquareLayer(layer: Tile[], width: number) {
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
                        {row.map(tile => (this.renderTile(tile)))}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderZero()}
                {this.renderOne()}
                {this.renderTwo()}
                {this.renderThree()}
                {this.renderFour()}
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
                    <Board/>
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