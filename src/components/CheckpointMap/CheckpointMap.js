import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class CheckpointMap extends Component{
    newCheckpoint = (mapProps, map, clickEvent) => {
        console.log(clickEvent.latLng);
    }

    fetchCheckpoints = () => {
        
    }

    render(){
        return(
            <Map 
                google={this.props.google} 
                zoom={14}
                style={style}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                  }}
                onReady={this.fetchCheckpoints}
                onClick={this.newCheckpoint}
                />
        )
    }
};

export default GoogleApiWrapper({apiKey: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'})(CheckpointMap);

const style = {
    width: '80%',
    height: '60%'
}