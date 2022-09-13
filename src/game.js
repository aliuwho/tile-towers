import {BoardComponent} from "./boardComponent";
import React from 'react';
import Board from "./board";
import {sleep} from "./util";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            shuffled: false,
            board: new Board(),
            tilesRemaining: Board.NUM_TILES,
            // setTimeout(0, 12000); // timer for game set to 12m // TODO make timer optional
            // TODO Menu with diff modes?
        };

        this.handler = this.handler.bind(this);
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

    renderHeader() {
        return (
            <div className='header'>
                {/*<span className='score'>{`SCORE: ${this.props.score}`}</span>*/}
                <span className='menu-buttons'>
                    <button onClick={() => {
                        let newBoard = this.copyBoard();
                        newBoard.shuffleTiles();
                        this.setState({
                            board: newBoard
                        })
                    }}>Shuffle Tiles</button>
                    <button disabled={true}>Pause</button>
                    <button type={'reset'} disabled={true}>New Game</button>
                    <button disabled={true}>Hint</button>
                </span>
                {/*<text color="black">{"SELECTED: " + this.state.selected}</text>*/}
                <text color="black">{"REMAINING: " + this.state.tilesRemaining}</text>
            </div>
        )
    }

    render() {
        return (
            <div className="game-component">
                {this.renderHeader()}
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                {/*</div>*/}
                <BoardComponent
                    tiles={this.state.board.getTiles()}
                    handler={this.handler}
                    selected={this.state.selected}
                    right={this.state.board.getTiles()}
                />
            </div>
        );
    }

    timer() {
        // TODO
    }

    pause() {
        // TODO
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
            }
        }
        this.setState({
            shuffled: shuffled,
            board: newBoard
        })

        console.log(newBoard.findMove()) // TODO remove and make into hint button
    }

    copyBoard(): Board {
        return new Board(this.state.board.getTiles())
    }
}