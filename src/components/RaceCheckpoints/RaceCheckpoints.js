import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from 'material-icons-react';

const checkpointMargin = 50000 // Currently 50 km, dont forget to change this back for production!!

class RaceCheckpoints extends Component{
    validateCheckin = () => {
        const targetCheckpoint = this.props.race.checkpoints[this.props.race.checkpoints.length-1];
        console.log('targetCheckpoint: ', targetCheckpoint);
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            const d = this.latLngDiffs(targetCheckpoint.latitude, targetCheckpoint.longitude, position.coords.latitude, position.coords.longitude);
            if (d < checkpointMargin){
                alert('you got it dude');
                this.revealNext(targetCheckpoint.id);
            } else {
                alert('come a little closer then you\'ll see')
            }
        });
    }

    revealNext = (checkpointID) => {
        this.props.dispatch({
            type: RACE_ACTIONS.TIMESTAMP_CHECKPOINT,
            payload: {
                checkpointID: checkpointID,
                raceID: this.props.race.raceDetails.raceID
            }
        })
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
        let allCheckpoints = [];
        if (this.props.race.checkpoints){
            allCheckpoints = this.props.race.checkpoints.map(checkpoint => {
                return(
                    <ListItem key={checkpoint.id}>
                        <ListItemIcon>
                            <MaterialIcon icon="place" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={checkpoint.name} secondary={checkpoint.description}/>
                    </ListItem>
                )
            })
        }
        return(
            <div>
                <button onClick={this.validateCheckin}>Check In</button>
                <List>{allCheckpoints}</List>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race
})

export default connect(mapStateToProps)(RaceCheckpoints);