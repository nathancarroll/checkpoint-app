import React, {Component} from 'react';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from 'material-icons-react';

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
        let allParticipants = [];
        if (this.props.race.participants){
            allParticipants = this.props.race.participants.map((participant) => {
                return(
                    <ListItem key={participant.id}>
                        <ListItemIcon>
                            <MaterialIcon icon="person" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={participant.username} secondary={null}/>
                    </ListItem>
                )
            })
        }

        return(
            <div>
                <List>{allParticipants}</List>
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