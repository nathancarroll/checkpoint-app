import React, {Component} from 'react';

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed = 0
        }
    }

    componentDidMount = () => {
        setInterval(update, 1000)
    }

    update = () => {
        const timeElapsed = moment() - this.props.start;
        this.setState({
            timeElapsed: timeElapsed
        })
    }

    render(){
        return(
            <h2>{this.state.timeElapsed}</h2>
        )
    }
};

export default RaceClock;