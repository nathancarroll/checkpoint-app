import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {connect} from 'react-redux';

class RaceParticipants extends Component{

    handleJoin = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.POST_PARTICIPANT,
            payload: this.props.race.raceDetails.raceID
        })
    }

    handleStart = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.START_RACE,
            payload: this.props.race.raceDetails.raceID
        })
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.props.race.participants)}
                <button onClick={this.handleJoin}>Join Race</button>
                <button onClick={this.handleStart}>START!</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race
})

export default connect(mapStateToProps)(RaceParticipants);