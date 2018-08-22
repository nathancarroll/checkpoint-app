import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Button} from '@material-ui/core';
import MaterialIcon from 'material-icons-react';

import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';
import NewCheckpointModal from '../NewCheckpointModal/NewCheckpointModal';

import {ListItem} from '@material-ui/core';

import '../NewRaceMap/NewRaceMap.css';

class CreateRaceMapView extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMapClick = (e) => {
        if (this.state.showModal) return;
        console.log('handleMapClick:', e);
        this.setState({
            showModal: true,
            coords: {
                lat: e.lat,
                lng: e.lng,
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
            this.props.handleCheckpointSave(newCheckpoint)
        }
        this.setState({
            showModal: false,
            checkpointName: '',
            checkpointDescription: '',
            coords: {
                lat: null,
                lng: null
            }
        })
    }

    render(){
        const allCheckpoints = this.props.checkpoints.map((checkpoint, index) => {
            return(
                <MapCheckpoint
                    key={index}
                    {...checkpoint}
                />
            )
        })
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
                    bootstrapURLKeys={{ key: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
                    defaultCenter={{lat: 44.977769, lng: -93.154999}}
                    defaultZoom={13}
                    onChildClick={this.props.handleCheckpointClick}
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
                        {...this.state.coords}
                    />
                </GoogleMapReact>
            </div>
        )
    }
};

export default CreateRaceMapView;