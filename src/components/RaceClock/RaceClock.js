import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';
let clockInterval;

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: null,
        }
    }

    componentDidMount = () => {
        clockInterval = setInterval(this.update, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(clockInterval)
    }

    handleJoin = (joined) => {
        if (!joined){
            this.props.dispatch({
                type: RACE_ACTIONS.POST_PARTICIPANT,
                payload: this.props.race.raceID
            })
        } else {
            this.props.dispatch({
                type: RACE_ACTIONS.DELETE_PARTICIPANT,
                payload: this.props.race.raceID
            })
        }
    }

    handleStart = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.START_RACE,
            payload: this.props.race.raceID
        })
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
        let output;
        let joined = false;
        for (let racer in this.props.racers){
            if (this.props.racers[racer].id === this.props.user.id ){
                joined = true;
            } 
        }
        if (!this.props.race.startTime){
            if (this.props.race.creator === this.props.user.id){
                output = <div onClick={this.handleStart}>START</div>
            } else {
                output = <div onClick={() => this.handleJoin(joined)}>{joined ? 'LEAVE' : 'JOIN'}</div>
            }
        } else if (!this.props.race.finishTime){
            output = <h1>{this.state.timeElapsed}</h1>
        } else {
            output = <h2>FINISHED</h2>
        }
        return(
            <React.Fragment>{output}</React.Fragment>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race.raceDetails,
    user: state.user,
    racers: state.race.participants,
})

export default connect(mapStateToProps)(RaceClock);