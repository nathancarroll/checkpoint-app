import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';
import NewCheckpointModal from '../NewCheckpointModal/NewCheckpointModal';

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
            }
        }
        this.modalAction = false
    }

    handleModalChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // this insane workaround is to make sure that click events on the modal dont also trigger the 
    // mapclick handler to initialize another modal
    handleMapClick = (e) => {
        if (this.modalAction){
            this.setState({
                showModal: false,
                checkpointName: '',
                checkpointDescription: '',
                coords: {
                    lat: null,
                    lng: null
                }
            })
            this.modalAction = false;
            return;
        }
        console.log('passing through');
        this.setState({
            showModal: true,
            coords: {
                lat: e.lat,
                lng: e.lng,
            }
        })
        // this.props.handleMapClick(e);
    }

    handleModalClick = (e) => {
        if (e.target.name === 'cancel'){
            console.log('cancel');
        } else if (e.target.name === 'save'){
            console.log('save');
            const newCheckpoint = {
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
                name: this.state.checkpointName,
                description: this.state.checkpointDescription
            }
            this.props.handleCheckpointSave(newCheckpoint)
        }
        this.modalAction = true;
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
                <button onClick={this.props.toggle}>Back</button>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
                    defaultCenter={{lat: 44.978185, lng: -93.081808}}
                    defaultZoom={14}
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
                    />
                </GoogleMapReact>
            </div>
        )
    }
};

export default CreateRaceMapView;