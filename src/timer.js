import React from 'react';

// Source: https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default class Timer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            paused: false,
            time: {},
            seconds: props.seconds
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.togglePause = this.togglePause.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        if (this.state.paused) {
            // Do not decrement timer!
            return;
        }

        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    togglePause() {
        let prevState = this.state.paused;
        this.props.pauseHandler();
        this.setState({
            paused: !prevState
        });
    }

    pauseResumeButton() {
        if (this.state.paused) {
            return (<button onClick={this.togglePause}>Resume</button>)
        } else {
            return (<button onClick={this.togglePause}>Pause</button>)
        }
    }

    render() {
        this.startTimer();
        return (
            <div>
                Time Remaining: {this.state.time.m}:{this.state.time.s}
                <br/>
                {this.pauseResumeButton()}
            </div>
        );
    }
}