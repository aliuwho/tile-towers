import {BoardComponent} from "./boardComponent";
import React from 'react';
import {shuffleArray} from "./util";

const INIT_NEIGHBORS_LEFT = [-1, -1, 1, -1, 3, -1, 5, 6, 7, -1, 9, 10, 11, -1, 13, 14, 15, -1, 17, 18, 19, -1, 21, 22, 23, 24, 25, -1, 27, 28, 29, 30, 31, -1, 33, 34, 35, 36, 37, -1, 39, 40, 41, 42, 43, -1, 45, 46, 47, 48, 49, -1, 51, 52, 53, 54, 55, -1, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, -1, 69, 70, 71, 72, 73, 74, 75, -1, 77, 78, 79, 80, 81, 82, 83, 84, 85, 141, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 141, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, -1, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1, 121, 122, 123, 124, 125, 126, 127, -1, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, -1, [98, 110], 142];
const INIT_NEIGHBORS_RIGHT = [-1, 2, -1, 4, 5, 6, 7, 8, -1, 10, 11, 12, -1, 14, 15, 16, -1, 18, 19, 20, -1, 22, 23, 24, 25, 26, -1, 28, 29, 30, 31, 32, -1, 34, 35, 36, 37, 38, -1, 40, 41, 42, 43, 44, -1, 46, 47, 48, 49, 50, -1, 52, 53, 54, 55, 56, -1, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, -1, 70, 71, 72, 73, 74, 75, 76, -1, 78, 79, 80, 81, 82, 83, 84, 85, 86, -1, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 142, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 142, 112, 113, 114, 115, 116, 117, 118, 119, 120, -1, 122, 123, 124, 125, 126, 127, 128, -1, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, -1, [87, 99], 143, -1];
const INIT_NEIGHBORS_TOP = [-1, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, 2, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 7, 8, -1, -1, 9, 10, 11, 12, -1, -1, 13, 14, 15, 16, -1, -1, 17, 18, 19, 20, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 21, 22, 23, 24, 25, 26, -1, -1, -1, 27, 28, 29, 30, 31, 32, -1, -1, -1, -1, -1, 33, 34, 35, 36, 37, 38, -1, -1, -1, -1, -1, -1, 39, 40, 41, 42, 43, 44, -1, -1, -1, -1, -1, 45, 46, 47, 48, 49, 50, -1, -1, -1, 51, 52, 53, 54, 55, 56, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
const NUM_TILES = 144;

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            shuffled: false,
            types: props.types,
            top: INIT_NEIGHBORS_TOP,
            left: INIT_NEIGHBORS_LEFT,
            right: INIT_NEIGHBORS_RIGHT,
            tilesRemaining: NUM_TILES,
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
            this.makeMove(this.state.selected, index);
            this.setState({
                selected: -1
            })
            this.isGameOver();
        }
    }

    renderHeader() {
        return (
            <div className='header'>
                {/*<span className='score'>{`SCORE: ${this.props.score}`}</span>*/}
                <span className='menu-buttons'>
                    <button onClick={() => this.shuffleBoard()}>Shuffle Tiles</button>
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
                    types={this.state.types}
                    handler={this.handler}
                    selected={this.state.selected}
                    right={this.state.top}
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
     * Returns true iff 2 tiles on a board are the same type.
     * @param indexA
     * @param indexB
     * @returns {boolean}
     */
    tilesMatch(indexA: number, indexB: number): boolean {
        return this.state.types[indexA] === this.state.types[indexB];
    }

    /**
     * Tries to play 2 tiles. If a move is successful, the board will be updated.
     * @param tileA
     * @param tileB
     */
    makeMove(tileA: number, tileB: number): void {
        if (this.tilePlayable(tileA) && this.tilePlayable(tileB)) {
            if (this.tilesMatch(tileA, tileB)) {
                // Update board
                let newTypes = this.state.types.slice();
                newTypes[tileA] = -1;
                newTypes[tileB] = -1;

                this.setState({
                    types: newTypes,
                    tilesRemaining: this.state.tilesRemaining - 2
                })
            } else {
                console.log("Tiles did not match.");
            }
        } else {
            if (this.tilePlayable(tileA)) {
                console.log(tileA + "was not playable.");
            }
            if (this.tilePlayable(tileB)) {
                console.log(tileB + "was not playable.");
            }
        }
    }

    /**
     * Checks if the game is over.
     */
    // TODO this function does not appear to be called after each move? or delayed update?
    isGameOver(): boolean {
        // Check if player successfully cleared all tiles
        if (this.state.tilesRemaining === 0) {
            alert("Congratulations! You win!") // TODO broken
            return true;
        }

        // Check if game ends prematurely
        // TODO this is running twice
        if (!this.canPlay()) {
            if (this.state.shuffled) {
                // TODO end game
                alert("No shuffles remaining. Game over.")
            } else {
                alert("No moves! Shuffling...")
                this.setState({
                    shuffled: true
                })
                this.shuffleBoard();
            }
        }
        console.log(this.hint())
        return false;
    }

    /**
     * Returns true iff there exists a move for a given board
     */
    canPlay(): boolean {
        for (let i = 0; i < NUM_TILES; i++) {
            if (this.tilePlayable(i)) {
                for (let j = 0; j < NUM_TILES; j++) {
                    if (j !== i && this.tilePlayable(j) && this.tilesMatch(i, j)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    hint(): number[] {
        for (let i = 0; i < NUM_TILES; i++) {
            if (this.tilePlayable(i)) {
                for (let j = 0; j < NUM_TILES; j++) {
                    if (j !== i && this.tilePlayable(j) && this.tilesMatch(i, j)) {
                        return [i, j];
                    }
                }
            }
        }
        return [-1, -1];
    }

    /**
     * Returns true iff a tile can be played.
     * @param tileIndex
     * @returns {boolean}
     */
    tilePlayable(tileIndex: number): boolean {
        if (this.state.types[tileIndex] === -1) {
            return false;
        }
        return this.noTopNeighbor(tileIndex) &&
            (this.noLeftNeighbor(tileIndex) || this.noRightNeighbor(tileIndex));
    }

    /**
     * Returns true if tile does not have a top neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noTopNeighbor(tileIndex: number): boolean {
        let topNeighbor = this.state.top[tileIndex];
        if (topNeighbor === -1) {
            // No top tile exists
            return true;
        }
        // Returns true if existing above tile has been removed
        return this.state.types[topNeighbor] === -1;
    }

    /**
     * Returns true if tile has no left neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noLeftNeighbor(tileIndex: number): boolean {
        let leftNeighbor = this.state.left[tileIndex];
        if (Array.isArray(leftNeighbor)) {
            return this.state.types[leftNeighbor[0]] === -1 &&
                this.state.types[leftNeighbor[1]] === -1;
        } else {
            if (leftNeighbor === -1) {
                // No left tile exists
                return true;
            }
            // Returns true if existing left tile has been removed
            return this.state.types[leftNeighbor] === -1;
        }
    }

    /**
     * Returns true if tile has no right neighbor
     * @param tileIndex
     * @returns {boolean}
     */
    noRightNeighbor(tileIndex: number): boolean {
        let rightNeighbor = this.state.right[tileIndex];
        if (Array.isArray(rightNeighbor)) {
            return this.state.types[rightNeighbor[0]] === -1 &&
                this.state.types[rightNeighbor[1]] === -1;
        } else {
            if (rightNeighbor === -1) {
                // No right tile exists
                return true;
            }
            // Returns true if existing right tile has been removed
            return this.state.types[rightNeighbor] === -1;
        }
    }

    /**
     * Shuffles the board's tiles.
     */
    shuffleBoard(): void {
        let currTypes = this.state.types.slice().filter(type => type !== -1)
        currTypes = shuffleArray(currTypes);
        let newTypes = this.state.types.slice()
        newTypes.forEach((type, i) => {
            if (type !== -1) {
                newTypes[i] = currTypes.pop()
            }
        });
        this.setState({
            types: newTypes,
        })
        if (!this.canPlay()) {
            this.shuffleBoard();
        }
    }

    getTypes() {
        return this.state.types;
    }
}