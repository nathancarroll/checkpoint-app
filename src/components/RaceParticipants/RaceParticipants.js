import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {connect} from 'react-redux';

class RaceParticipants extends Component{
    raceID = this.props.match.params.id;

    componentDidMount = () => {
        this.refreshParticipants();
    }

    refreshParticipants = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.FETCH_PARTICIPANTS,
            payload: this.raceID
        })
    }

    handleJoin = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.POST_PARTICIPANT,
            payload: this.raceID
        })
    }

    handleStart = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.START_RACE,
            payload: this.raceID
        })
    }

    render(){
        return(
            <div>
                <RaceDetailsNav raceID={this.raceID} />
                {JSON.stringify(this.props.participants)}
                <button onClick={this.handleJoin}>Join Race</button>
                <button onClick={this.handleStart}>START!</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    participants: state.race.participants
})

export default connect(mapStateToProps)(RaceParticipants);