import React, {Component} from 'react';
import CreateRaceCheckpointList from '../CreateRaceCheckpointList/CreateRaceCheckpointList';
import CreateRaceMapView from '../CreateRaceMapView/CreateRaceMapView';

const initialCoords = {
    lat: null,
    lng: null,
}

class CreateRaceContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            showMap: true,
            newCoords: initialCoords,
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

    handleCheckpointSave = (name, description) => {
        const newCheckpoint = {
            lat: this.state.newCoords.lat,
            lng: this.state.newCoords.lng,
            name: name,
            description: description
        }
        console.log(newCheckpoint);
        this.setState({
            checkpoints: [...this.state.checkpoints, newCheckpoint]
        })
    }

    handleMapClick = (e) => {
        console.log('handle map click');
        console.log(e.lat);
        console.log(e.lng);
        this.setState({
            newCoords: {
                lat: e.lat,
                lng: e.lng
            },
            checkpoints: [...this.state.checkpoints, {lat: e.lat, lng: e.lng}]
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
        this.setState({
            newCoords: initialCoords,
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

export default CreateRaceContainer;