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

const GAME_LENGTH = 12 * 60; // seconds; 12 min
const HINT_LENGTH = 2 * 1000 // milliseconds; 5 sec

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            shuffled: false,
            board: new Board(),
            tilesRemaining: Board.NUM_TILES,
            mode: MODE.Classic,
            hint: [-1, -1],
            paused: false
        };
        this.selectTile = this.selectTile.bind(this);
        this.giveHint = this.giveHint.bind(this);
        this.togglePause = this.togglePause.bind(this);
    }

    selectTile(index) {
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
            this.playMove(this.state.selected, index).then()
        }
    }

    createModeOption(mode) {
        return (<option id={mode}
                        value={mode}>
            {mode}
        </option>)
    }

    renderPauseResumeButton() {
        if (this.state.paused) {
            return (<button onClick={this.togglePause}>Resume</button>)
        } else {
            return (<button onClick={this.togglePause}>Pause</button>)
        }
    }

    renderMenu() {
        return (<div className={'menu'}>
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
                    disabled={this.state.shuffled || this.state.paused}
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
                    disabled={this.state.paused}
                    className={"menu-button"}
                    onClick={this.giveHint}>
                Hint
            </button>
            <button id={"new-game-button"}
                    className={"menu-button"}
                    onClick={() => {
                        this.resetGameState()
                    }}>
                New Game
            </button>
            {this.renderPauseResumeButton()}
        </div>);
    }

    renderInfo() {
        return (<div className={'info'}>
            Tiles remaining: {this.state.tilesRemaining} --
            Shuffles remaining: {this.state.shuffled ? 0 : 1}
        </div>)
    }

    renderHeader() {
        return (
            <div className='header'>
                {this.renderMenu()}
                {this.renderInfo()}
                <Timer seconds={GAME_LENGTH}
                       paused={this.state.paused}/>
            </div>
        )
    }

    render() {
        return (
            <div className="game-component">
                {this.renderHeader()}
                <BoardComponent
                    tiles={this.state.board.getTiles()}
                    handler={this.selectTile}
                    selected={this.state.selected}
                    hint={this.state.hint}
                    right={Board.NEIGHBORS_RIGHT}
                />
            </div>
        );
    }

    /**
     * Resets the game.
     */
    resetGameState(mode) {
        let newMode = mode;
        if (newMode === null) {
            newMode = this.state.mode;
        }
        this.setState({
            selected: -1,
            shuffled: false,
            board: new Board(),
            tilesRemaining: Board.NUM_TILES,
            paused: false,
            mode: newMode
        })
    }

    changeMode(evt) {
        this.resetGameState(evt.target.value)
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
                alert("Congratulations! You win!")
                // start new game
                this.resetGameState();
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
    }

    copyBoard(): Board {
        return new Board(this.state.board.getTiles())
    }

    giveHint() {
        this.setState({
            hint: this.state.board.findMove()
        })

        // Hint disappears after short amount of time
        setTimeout(() => {
            this.setState({
                hint: [-1, -1]
            })
        }, HINT_LENGTH);
    }

    togglePause() {
        let prevState = this.state.paused;
        this.setState({
            paused: !prevState
        });
    }
}