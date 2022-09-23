import React from 'react';

// Modified from https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default class Timer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            seconds: props.seconds
        };
        this.countDown = this.countDown.bind(this);
    }

    /**
     * Returns a string representing the seconds remaining.
     * @returns {string}
     */
    secondsToTime() {
        let divisor_for_minutes = this.state.seconds % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        return minutes + ":" + seconds;
    }

    startTimer() {
        if (!this.state.timer) {
            this.setState({
                timer: setInterval(this.countDown, 1000)
            })
        }
    }

    /**
     * Interval handler function. Decrement seconds remaining.
     */
    countDown() {
        if (this.props.paused) {
            // Do not decrement timer!
            return;
        }

        // Remove one second, set state so a re-render happens.
        let updatedSeconds = this.state.seconds - 1;
        this.setState({
            seconds: updatedSeconds,
        });

        // Check if we're at zero.
        if (updatedSeconds === 0) {
            clearInterval(this.state.timer);
        }
    }

    resetTimer() {
        clearInterval(this.state.timer);
        this.setState({
            seconds: this.props.seconds,
            timer: setInterval(this.countDown, 1000)
        })
    }

    render() {
        this.startTimer();
        return (
            <div>
                <button onClick={() => {
                    this.resetTimer()
                }}>reset
                </button>
                Time Remaining: {this.secondsToTime()}
            </div>
        );
    }
}