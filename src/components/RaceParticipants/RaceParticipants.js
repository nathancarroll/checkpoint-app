import React, {Component} from 'react';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {connect} from 'react-redux';
import moment from 'moment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from 'material-icons-react';
import Paper from '@material-ui/core/Paper'

class RaceParticipants extends Component{

    formatRaceTime = (duration) => {
        let s = Math.floor( (duration/1000) % 60 );
        let m = Math.floor( (duration/1000/60) % 60 );
        let h = Math.floor(duration/(1000*60*60));
        s = s.toString();
        m = m.toString();
        if (s.length === 1){
            s = '0' + s;
        }
        if (m.length === 1){
            m = '0' + m;
        }
        return `${h}:${m}:${s}`; 
    }

    render(){
        let allParticipants = [];
        if (this.props.race.participants){
            allParticipants = this.props.race.participants.map((participant) => {
                let raceTime = null;
                if (participant.time){
                    raceTime = moment(participant.time).diff(this.props.race.raceDetails.startTime)
                    raceTime = this.formatRaceTime(raceTime);
                }
                return(
                    <Paper elevation={2}>
                    <ListItem key={participant.id}>
                        <ListItemIcon>
                            <MaterialIcon icon="person" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={participant.username} secondary={raceTime}/>
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