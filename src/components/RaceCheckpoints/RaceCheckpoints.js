import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {connect} from 'react-redux';

import RaceClock from '../RaceClock/RaceClock';

class RaceCheckpoints extends Component{
    raceID = this.props.match.params.id;

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_CHECKPOINTS',
            payload: this.raceID
        })
    }

    validateCheckin = () => {
        navigator.geolocation.getCurrentPosition((position) => console.log(position.coords));
    }

    render(){
        return(
            <div>
                <RaceDetailsNav raceID={this.raceID} />
                {JSON.stringify(this.props.checkpoints)}
                <button onClick={this.validateCheckin}>Check In</button>
                <RaceClock raceID={this.raceID}/>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    checkpoints: state.race.checkpoints
})

export default connect(mapStateToProps)(RaceCheckpoints);