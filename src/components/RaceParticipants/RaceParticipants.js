import React, {Component} from 'react';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from 'material-icons-react';
import Paper from '@material-ui/core/Paper'

class RaceParticipants extends Component{

    render(){
        let allParticipants = [];
        if (this.props.race.participants){
            allParticipants = this.props.race.participants.map((participant) => {
                return(
                    <Paper elevation={2}>
                    <ListItem key={participant.id}>
                        <ListItemIcon>
                            <MaterialIcon icon="person" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={participant.username} secondary={null}/>
                    </ListItem>
                    </Paper>
                )
            })
        }

        return(
            <div>
                {allParticipants}
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race
})

export default connect(mapStateToProps)(RaceParticipants);