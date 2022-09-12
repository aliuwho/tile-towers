import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                {/*<span className='score'>{`SCORE: ${this.props.score}`}</span>*/}
                <span className='menu-buttons'>
                    <button>Pause</button>
                    <button>Shuffle Tiles</button>
                    <button type={'reset'}>New Game</button>
                    <button>Hint</button>
                </span>
                <text color="black">{"SELECTED: " + this.props.selected}</text>
                <text color="black">{"REMAINING: " + this.props.remaining}</text>
            </div>
        )
    }
}