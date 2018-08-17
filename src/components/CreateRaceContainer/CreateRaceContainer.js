import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    Link
  } from 'react-router-dom';

import CreateRaceCheckpointList from '../CreateRaceCheckpointList/CreateRaceCheckpointList';
import CreateRaceMapView from '../CreateRaceMapView/CreateRaceMapView';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class CreateRaceContainer extends Component{
    constructor(props){
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

    handleCheckpointClick = (e) => {
        console.log('handle checkpoint click');
    }

    handleCheckpointSave = (newCheckpoint) => {
        console.log(newCheckpoint);
        this.setState({
            checkpoints: [...this.state.checkpoints, newCheckpoint]
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

    render(){
        let content;
        if (this.state.showMap){
            content = <CreateRaceMapView 
                            checkpoints={this.state.checkpoints} 
                            toggle={this.toggleView}
                            handleCheckpointClick={this.handleCheckpointClick}
                            handleMapClick={this.handleMapClick}
                            handleCheckpointSave={this.handleCheckpointSave}
                            />
        } else {
            content = (
                    <React.Fragment>
                    <Link to="/#/user">Cancel</Link>
                    <button onClick={this.toggleView}>Add more checkpoints</button>
                    <input onChange={this.handleNameChange} placeholder="name your race" value={this.state.raceName} />
                    <button onClick={this.submitRace}>Submit Race</button>
                    <CreateRaceCheckpointList checkpoints={this.state.checkpoints} />
                    </React.Fragment>
            )
        }
        return(
            <div>{content}</div>
        )
    }
};

export default connect()(CreateRaceContainer);