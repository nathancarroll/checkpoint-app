import React, {Component} from 'react';
import {connect} from 'react-redux';

class RaceCheckpoints extends Component{
    validateCheckin = () => {
        const targetCheckpoint = this.props.race.checkpoints[this.props.race.checkpoints.length-1];
        console.log('targetCheckpoint: ', targetCheckpoint);
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            const d = this.latLngDiffs(targetCheckpoint.latitude, targetCheckpoint.longitude, position.coords.latitude, position.coords.longitude);
            if (d < 50){
                alert('you got it dude');
                this.revealNext();
            } else {
                alert('come a little closer then you\'ll see')
            }
        });
    }

    revealNext = () => {
        
    }

    // The below function uses the Haversine formula to calculate the great-circle distance between
    // two points on a sphere given their longitudes and latitudes. 
    // Credit to user b-h- on StackOverflow.

    latLngDiffs = (lat1, lng1, lat2, lng2) => {
        const R = 6378.137 // Radius of earth in km
        const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        const dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1 * Math.PI / 180) * 
                  Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        return d * 1000; // Return the distance between the checkpoints in meters
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