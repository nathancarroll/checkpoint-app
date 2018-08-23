import React, {Component} from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Paper} from '@material-ui/core';
import MaterialIcon from 'material-icons-react';

class CreateRaceCheckpointList extends Component {
    render(){
        let allCheckpoints = [];
        if (this.props.checkpoints){
            allCheckpoints = this.props.checkpoints.map((checkpoint, index) => {
                return(
                    <Paper elevation={2}>
                    <ListItem key={index}>
                        <ListItemIcon>
                            <MaterialIcon icon="place" size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={checkpoint.name} secondary={checkpoint.description}/>
                    </ListItem>
                    </Paper>
                )
            })
        }
        return(
            <React.Fragment>{allCheckpoints}</React.Fragment>
        )
    }
}

export default CreateRaceCheckpointList;