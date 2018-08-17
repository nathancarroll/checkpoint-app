import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: null
        }
    }

    componentDidMount = () => {
        setInterval(this.update, 1000)
    }

    // componentWillUnmount = () => {
    //     clearInterval(this.clockUpdate)
    // }

    update = () => {
        let duration = moment().diff(this.props.race.startTime)
        let formattedDuration = this.formatRaceTime(duration)
        this.setState({
            timeElapsed: formattedDuration
        })
    }

    formatRaceTime = (duration) => {
        const s = Math.floor( (duration/1000) % 60 );
        const m = Math.floor( (duration/1000/60) % 60 );
        const h = Math.floor(duration/(1000*60*60));
        return `${h}:${m}:${s}`; 
    }

    render(){
        let content;
        if (!this.props.race.startTime){
            content = <h2>READY</h2>
        } else if (!this.props.race.finishTime){
            content = <h2>{this.state.timeElapsed}</h2>
        } else {
            content = <h2>FINISHED</h2>
        }
        return(
            <div>{content}</div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race.raceDetails    
})

export default connect(mapStateToProps)(RaceClock);