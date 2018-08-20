import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

let clockInterval;

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: null
        }
    }

    componentDidMount = () => {
        clockInterval = setInterval(this.update, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(clockInterval)
    }

    update = () => {
        let duration = moment().diff(this.props.race.startTime)
        let formattedDuration = this.formatRaceTime(duration)
        this.setState({
            timeElapsed: formattedDuration
        })
    }

    formatRaceTime = (duration) => {
        let s = Math.floor( (duration/1000) % 60 );
        let m = Math.floor( (duration/1000/60) % 60 );
        let h = Math.floor(duration/(1000*60*60));
        s = s.toString();
        m = m.toString();
        if (s.length === 1){
            s = '0' + s;
        }
        if (m.length === 1){
            m = '0' + m;
        }
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