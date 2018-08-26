import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import CheckinDialog from '../CheckinDialog/CheckinDialog';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import MaterialIcon from 'material-icons-react';
import Spinner from 'react-spinkit';

import '../NewRaceMap/NewRaceMap.css';

const checkpointMargin = 10000 // This margin for error can be changed as needed.

class RaceCheckpoints extends Component{
    state = {
        showDialog: false,
        showSpinner: false,
        feedback: ''
    }

    validateCheckin = () => {
        const targetCheckpoint = this.props.race.checkpoints[this.props.race.checkpoints.length-1];
        console.log('targetCheckpoint: ', targetCheckpoint);
        this.setState({
            showSpinner: true
        })
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            const d = this.latLngDiffs(targetCheckpoint.latitude, targetCheckpoint.longitude, position.coords.latitude, position.coords.longitude);
            let message;
            if (d < checkpointMargin){
                message = 'You got it!';
                this.revealNext(targetCheckpoint.id);
            } else {
                message = 'Not quite...'
            }
            this.setState({
                showSpinner: false,
                showDialog: true,
                feedback: message
            })
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

    handleDialogOpen = () => {
        this.setState({
            showDialog: true
        })
    }

    handleDialogClose = () => {
        this.setState({
            showDialog: false
        })
    }

    render(){
        const showHideClassName = this.state.showSpinner ? "spinner display-block" : "spinner display-none";
        let allCheckpoints = [];
        if (this.props.race.checkpoints){
            allCheckpoints = this.props.race.checkpoints.map(checkpoint => {
                return(
                    <Paper elevation={2}>
                    <ListItem key={checkpoint.id}>
                        <ListItemIcon>
                            <MaterialIcon icon="place" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={checkpoint.name} secondary={checkpoint.description}/>
                    </ListItem>
                    </Paper>
                )
            })
        }
        let checkinButton = null;
        let status;
        if (this.props.race.raceDetails.startTime && this.props.race.raceDetails.finishTime){
          status = 'COMPLETED';
        } else if (this.props.race.raceDetails.startTime){
          status = 'IN PROGRESS';
        } else {
          status = 'REGISTERING';
        }
        let joined;
        for (let racer in this.props.race.participants){
            if (this.props.race.participants[racer].id === this.props.user.id ){
                joined = true;
            } 
        }
        if ((this.props.race.raceDetails.creator !== this.props.user.id) && status === 'IN PROGRESS' && joined){
            checkinButton = <Paper elevation={10}>
                                <ListItem>
                                    <button onClick={this.validateCheckin}>CHECK IN</button>
                                    <Spinner className={showHideClassName} name="circle" fadeIn='quarter'/>
                                </ListItem>
                             </Paper>
        }
        return(
            <div>
                {checkinButton}
                {allCheckpoints}
                <CheckinDialog
                    open={this.state.showDialog}
                    handleClose={this.handleDialogClose}
                    feedback={this.state.feedback}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race,
    user: state.user
})

export default connect(mapStateToProps)(RaceCheckpoints);