import React, {Component} from 'react';
import moment from 'moment';

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: 0
        }
    }

    componentDidMount = () => {
        setInterval(this.update, 1000)
        // this.setState({
        //     timeElapsed: moment().format()
        // })
    }

    update = () => {
        const timeElapsed = moment().format('h:mm:ss');
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