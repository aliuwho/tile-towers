import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Game} from "./game";

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
            type: props.type,
            selected: false,
        };
    }

    getColor() {
        switch (this.state.type % 4) {
            case 0:
                return "orangered";
            case 1:
                return "goldenrod";
            case 2:
                return "white";
            default:
                return "steelblue";
        }
    }

    getShape() {
        switch (this.state.type % 9) {
            case 0:
                return (<circle cx="25" cy="25" r="20" fill="black"/>);
            case 1:
                return (<polygon points="25,5 5,45 45,45"
                                 fill="purple"/>);
            case 2:
                return (<rect x="5" y="5" width="40" height="40" fill="green"/>);
            case 3:
                return (<circle cx="25" cy="25" r="20" fill="purple"/>);
            case 4:
                return (<rect x="5" y="5" width="40" height="40" fill="black"/>);
            case 5:
                return (<polygon points="25,5 5,45 45,45"
                                 fill="purple"/>);
            case 6:
                return (<polygon points="25,5
                30,20 45,20 32,30 37,45
                25,35
                12,45 17,30 5,20 20,20"
                                 fill="green"/>);
            case 7:
                return (<polygon points="25,5
                30,20 45,20 32,30 37,45
                25,35
                12,45 17,30 5,20 20,20"
                                 fill="black"/>);
            default:
                return;
        }
    }

    render() {
        /* TODO dynamic squares */
        if (this.state.selected) {
            return (
                <svg className="tile-selected"
                     onClick={() => {
                         this.setState({selected: false})
                     }}
                     width="52px" height="52px">
                    <rect x="0" y="0" width="50px" height="50px" fill={this.getColor()} stroke="black"
                          strokeWidth="1px"/>
                    {this.getShape()}
                </svg>
            );
        }
        return (
            <svg className="tile"
                 onClick={() => {
                     this.setState({selected: true})
                 }}
                 width="52px" height="52px">
                <rect x="0" y="0" width="50px" height="50px" fill={this.getColor()} stroke="black" strokeWidth="1px"/>
                {this.getShape()}
            </svg>
        );
    }
}

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
        };
    }

    handleClick(i) {
        const board = this.state.board.copyBoard();
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
            <div className="board-layer">
                <div className="board-row">
                    {this.renderTile(this.state.board.types[0], 0)}
                </div>
            </div>
        )
    }

    renderLayerOne() {
        const layer = this.state.board.types.slice(1, 5);
        return (
            <div className="board-layer">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_ONE)}
            </div>
        )
    }

    renderLayerTwo() {
        const layer = this.state.board.types.slice(5, 21);
        return (
            <div className="board-layer">
                {this.renderSquareLayer(layer, WIDTH_LEVEL_TWO)}
            </div>
        )
    }

    renderLayerThree() {
        const layer = this.state.board.types.slice(21, 57);
        return (
            <div className="board-layer">
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
        let offRow1 = layer.slice(index, index + 1); // unaligned 3 pieces
        index++;
        let offRow2 = layer.slice(index);

        return (
            <div className="board-layer">
                <div className="board-off-row-1">
                    {this.renderRow(offRow1)}
                </div>
                {rows.map(row => (
                    <div className="board-row">
                        {this.renderRow(row)}
                    </div>
                ))}
                <div className="board-off-row-2">
                    {this.renderRow(offRow2)}
                </div>
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
                    {this.renderRow(row)}
                </div>
            ))
        )
    }

    renderRow(row) {
        return (row.map((tileType, tileIndex) => (this.renderTile(tileType, tileIndex))))
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

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
        };
    }

    handleClick(i) {
        alert(this.state.game.types[i]);
        // this.setState({
        //
        // });
    }

    render() {
        return (
            <div className="game-component">
                <div className="game-board">
                    <BoardComponent
                        board={this.state.game.board}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                {/*<canvas className="temp" id="myCanvas" width="200" height="100" style="border:1px solid #000000;"/>*/}
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GameComponent game={new Game()}/>);