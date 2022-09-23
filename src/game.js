import {BoardComponent} from "./boardComponent";
import React from 'react';
import Board from "./board";
import {sleep} from "./util";
import Timer from "./timer";

const MODE = {
    Unlimited: 'Unlimited',
    Easy: 'Easy',
    Classic: 'Classic',
    Hard: 'Hard'
}

const GAME_LENGTH = 12 * 60; // 12 min

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            shuffled: false,
            board: new Board(),
            tilesRemaining: Board.NUM_TILES,
            mode: MODE.Classic
        };
        this.handler = this.handler.bind(this);
        this.toggleMenuButtons = this.toggleMenuButtons.bind(this);
    }

    handler(index) {
        if (this.state.selected === -1) {
            // No tile selected
            this.setState({
                selected: index
            })
        } else if (this.state.selected === index) {
            // Tile already selected; deselect
            this.setState({
                selected: -1
            })
        } else {
            // A different tile is already selected, make move
            this.playMove(this.state.selected, index);
        }
    }

    createModeOption(mode) {
        return (<option id={mode}
                        value={mode}
                        onClick={() => {
                            this.resetGameState(mode)
                        }}>
            {mode}
        </option>)
    }

    renderHeader() {
        return (
            <div className='header'>
                <div id={'menu-options'}>
                    <label>Mode: </label>
                    <select id={'select-mode'}
                            onChange={(event) => {
                                this.changeMode(event)
                            }}>
                        {this.createModeOption(MODE.Classic)}
                        {this.createModeOption(MODE.Hard)}
                        {this.createModeOption(MODE.Unlimited)}
                    </select>
                    <button id={"shuffle-button"}
                            disabled={this.state.shuffled}
                            className={"menu-button"}
                            onClick={() => {
                                let newBoard = this.copyBoard();
                                newBoard.shuffleTiles();
                                this.setState({
                                    board: newBoard,
                                    shuffled: true
                                })
                            }}>
                        Shuffle Tiles
                    </button>
                    <button id={'hint-button'}
                            disabled={true}
                        // className={"menu-button"}
                    >
                        Hint
                    </button>
                    <button id={"new-game-button"}
                            className={"menu-button"}
                            onClick={() => {
                                this.resetGameState()
                            }}>
                        New Game
                    </button>
                </div>
                <text>{"REMAINING: " + this.state.tilesRemaining}</text>
                <text>{"Shuffles left: " + (this.state.shuffled ? 0 : 1)}</text>
                <Timer seconds={GAME_LENGTH}
                       pauseHandler={this.toggleMenuButtons}/>
            </div>
        )
    }

    render() {
        return (
            <div className="game-component">
                {this.renderHeader()}
                <BoardComponent
                    tiles={this.state.board.getTiles()}
                    handler={this.handler}
                    selected={this.state.selected}
                    right={Board.NEIGHBORS_RIGHT}
                />
            </div>
        );
    }

    /**
     * Resets the game.
     */
    resetGameState(mode) {
        if (mode) {
            this.setState({
                selected: -1,
                shuffled: false,
                board: new Board(),
                tilesRemaining: Board.NUM_TILES,
                mode: mode
            })
        } else {
            this.setState({
                selected: -1,
                shuffled: false,
                board: new Board(),
                tilesRemaining: Board.NUM_TILES
            })
        }
    }

    changeMode(evt) {
        this.resetGameState(evt.target.value)
    }

    /**
     * Toggles menu buttons from disabled to enabled (and vice versa) depending on current state.
     */
    toggleMenuButtons() {
        let elems = document.getElementsByClassName("menu-button");
        for (let i = 0; i < elems.length; i++) {
            elems[i].disabled = !elems[i].disabled;
        }
    }

    /**
     * Checks if the game is over.
     */
    async playMove(tileA, tileB) {
        let numTiles = this.state.tilesRemaining;
        let newBoard = this.copyBoard();
        let moveSuccess = newBoard.makeMove(tileA, tileB);
        // Check if player successfully cleared all tiles
        if (moveSuccess) {
            numTiles = numTiles - 2;
            if (this.state.tilesRemaining === 2) {
                alert("Congratulations! You win!") // TODO broken
                // start new game
                this.setState({
                    board: new Board(),
                    tilesRemaining: Board.NUM_TILES,
                    shuffled: false,
                    selected: -1
                });
                return;
            }
        }

        this.setState({
            selected: -1,
            board: newBoard,
            tilesRemaining: numTiles,
        })
        await sleep(1000); // delay so board can update before shuffling

        let shuffled = this.state.shuffled;
        if (newBoard.noMoves()) {
            console.log("NO MOVES")
            if (shuffled) {
                alert("No shuffles remaining. Game over.")
                return;
            } else {
                alert("No moves! Shuffling...")
                newBoard.shuffleTiles();
                shuffled = true;
                this.setState({
                    shuffled: shuffled,
                    board: newBoard,
                    selected: -1
                })
            }
        }

        console.log(newBoard.findMove()) // TODO remove and make into hint button
    }

    copyBoard(): Board {
        return new Board(this.state.board.getTiles())
    }
}