import React, {Component} from 'react';
import {connect} from 'react-redux';

class RaceCheckpoints extends Component{
    validateCheckin = () => {
        navigator.geolocation.getCurrentPosition((position) => console.log(position.coords));
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.props.race.checkpoints)}
                <button onClick={this.validateCheckin}>Check In</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race
})

export default connect(mapStateToProps)(RaceCheckpoints);