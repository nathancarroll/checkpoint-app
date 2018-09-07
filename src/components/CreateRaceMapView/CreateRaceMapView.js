import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Button} from '@material-ui/core';
import MaterialIcon from 'material-icons-react';

import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';
import NewCheckpointModal from '../NewCheckpointModal/NewCheckpointModal';

import '../NewRaceMap/NewRaceMap.css';

class CreateRaceMapView extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            editing: false,
            checkpointName: '',
            checkpointDescription: '',
            coords: {
                lat: null,
                lng: null
            },
        }
        this.modalAction = false
    }

    handleModalChange = (e) => {
        console.log('changin');
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMapClick = (e) => {
        // Dont do anything with extra map clicks while the new checkpoint modal is open
        if (this.state.showModal) return;
        // Also don't do anything if the target of the click is a checkpoint
        if (e.event.target.tagName === 'I'){
            console.log('handling checkpoint click');
            console.log(e.event);
            return;
        };

        this.setState({
            showModal: true,
            coords: {
                lat: e.lat,
                lng: e.lng,
            }
        })
    }

    handleCheckpointClick = (e) => {
        if (this.state.showModal) return;
        // The event here is the index of the array of the map's children
        console.log('handleCheckpointClick');
        console.log(e);
        let checkpointToEdit = this.props.checkpoints[e];
        this.setState({
            showModal: true,
            editing: e,
            checkpointName: checkpointToEdit.name,
            checkpointDescription: checkpointToEdit.description,
            coords: {
                lat: checkpointToEdit.lat,
                lng: checkpointToEdit.lng
            }
        })
    }

    handleModalClick = (e) => {
        if (e.target.textContent === 'Save'){
            const newCheckpoint = {
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
                name: this.state.checkpointName,
                description: this.state.checkpointDescription
            }
            if (this.state.editing){
                console.log('were editing now');
                this.props.handleCheckpointEdit(newCheckpoint, this.state.editing)
            } else {
                this.props.handleCheckpointSave(newCheckpoint)
            }
        } else if (e.target.textContent === 'Delete'){
            console.log('delete');
            this.props.handleCheckpointDelete(this.state.editing);
        }
        this.setState({
            showModal: false,
            editing: false,
            checkpointName: '',
            checkpointDescription: '',
            coords: {
                lat: null,
                lng: null
            }
        })
    }

    render(){
        let allCheckpoints = []
        if (this.props.checkpoints){
            allCheckpoints = this.props.checkpoints.map((checkpoint, index) => {
                return(
                    <MapCheckpoint
                        key={index}
                        {...checkpoint}
                    />
                )
            })
        }
        return(
            <div style={{ height: '100vh', width: '100%' }}> 
                <Button 
                    variant='fab'
                    style={{position: 'absolute', zIndex: 10, margin: '5px', backgroundColor: 'white'}}
                    onClick={this.props.toggle}
                >
                    <MaterialIcon icon="arrow_back" />
                </Button>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'HIDDEN'}}
                    defaultCenter={{lat: 44.977055, lng: -93.265884}}
                    defaultZoom={13}
                    onChildClick={this.handleCheckpointClick}
                    onClick={this.handleMapClick}
                    options={{gestureHandling: 'greedy'}}
                >
                    {allCheckpoints}
                    <MapCheckpoint {...this.state.coords} />
                    <NewCheckpointModal
                        showModal={this.state.showModal}
                        handleModalChange={this.handleModalChange}
                        handleModalClick={this.handleModalClick}
                        checkpointName={this.state.checkpointName}
                        checkpointDescription={this.state.checkpointDescription}
                        editing={this.state.editing}
                        {...this.state.coords}
                    />
                </GoogleMapReact>
            </div>
        )
    }
};

export default CreateRaceMapView;
