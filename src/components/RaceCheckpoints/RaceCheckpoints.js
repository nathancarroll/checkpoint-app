import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {connect} from 'react-redux';

class RaceCheckpoints extends Component{
    raceID = this.props.match.params.id;

    componentDidMount = () => {
        console.log('hello');
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
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    checkpoints: state.race.checkpoints
})

export default connect(mapStateToProps)(RaceCheckpoints);