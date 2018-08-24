import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText, Paper} from '@material-ui/core';

import CreateRaceCheckpointList from '../CreateRaceCheckpointList/CreateRaceCheckpointList';
import CreateRaceMapView from '../CreateRaceMapView/CreateRaceMapView';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class CreateRaceContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMap: true,
            checkpoints: [],
            raceName: ''
        }
    }

    handleNameChange = (e) => {
        this.setState({
            raceName: e.target.value
        })
    }

    handleCheckpointSave = (newCheckpoint) => {
        console.log(newCheckpoint);
        this.setState({
            checkpoints: [...this.state.checkpoints, newCheckpoint]
        })
    }

    handleCheckpointEdit = (editedCheckpoint, indexToEdit) => {
        console.log('we are editing', editedCheckpoint, indexToEdit);
        this.setState({
            checkpoints: [...this.state.checkpoints.slice(0, indexToEdit), editedCheckpoint, ...this.state.checkpoints.slice(indexToEdit + 1)]
        })
    }

    toggleView = () => {
        this.setState({
            showMap: !this.state.showMap
        })
    }

    submitRace = () => {
        console.log('submitting race now. name:', this.state.raceName);
        console.log('checkpoints:', this.state.checkpoints);
        this.props.dispatch({
            type: RACE_ACTIONS.POST_RACE,
            payload: {
                name: this.state.raceName,
                checkpoints: this.state.checkpoints
            }
        })
        this.setState({
            checkpoints: [],
            raceName: ''
        })
    }

    cancel = () => {
        window.location.href = '/#/user'
    }

    render() {
        let content;
        if (this.state.showMap) {
            content = (
                <CreateRaceMapView
                    checkpoints={this.state.checkpoints}
                    toggle={this.toggleView}
                    handleMapClick={this.handleMapClick}
                    handleCheckpointSave={this.handleCheckpointSave}
                    handleCheckpointEdit={this.handleCheckpointEdit}
                />
            )
        } else {
            content = (
                <List>
                    {/* <button onClick={this.toggleView}>Add more checkpoints</button> */}
                    <Paper elevation={10}>
                    <ListItem>
                    <input onChange={this.handleNameChange} placeholder="NAME YOUR RACE" value={this.state.raceName} />
                    <button onClick={this.submitRace}>SUBMIT RACE</button>
                    </ListItem>
                    </Paper>
                    <CreateRaceCheckpointList checkpoints={this.state.checkpoints} />
                    <Paper elevation={10}>
                        <ListItem onClick={this.toggleView}>
                            <ListItemText primary="ADD MORE CHECKPOINTS" />
                        </ListItem>
                    </Paper>
                    <Paper elevation={10}>
                        <ListItem onClick={this.cancel} className="list-button">
                            CANCEL
                        </ListItem>
                    </Paper>
                </List>
            )
        }
        return (
            <React.Fragment>{content}</React.Fragment>
        )
    }
};

export default connect()(CreateRaceContainer);