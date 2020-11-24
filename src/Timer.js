import React from 'react'

class Timer extends React.Component {
    state = {
        secondsElapsed: 0
    };

    getInitialState = () => {
      return this.state;
    };

    tick = () => {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    };

    componentDidMount = () =>  {
      this.interval = setInterval(this.tick, 1000);
    };

    componentWillUnmount = () => {
      clearInterval(this.interval);
    };

    render() {
      return (
        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
      );
    }
  };


  export default Timer;