import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {connect} from 'react-redux';

class RaceParticipants extends Component{
    raceID = this.props.match.params.id;

    componentDidMount = () => {
        console.log('hello');
        this.props.dispatch({
            type: 'FETCH_PARTICIPANTS',
            payload: this.raceID
        })
    }

    render(){
        return(
            <div>
                <RaceDetailsNav raceID={this.raceID} />
                {JSON.stringify(this.props.participants)}
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    participants: state.race.participants
})

export default connect(mapStateToProps)(RaceParticipants);