import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class NewRaceMap extends Component{
    fetchCheckpoints = () => {
        console.log('fetching checkpoints');
    }
    
    newCheckpoint = (mapProps, map, clickEvent) => {
        const position = {
            latitude: clickEvent.latLng.lat(),
            longitude: clickEvent.latLng.lng()
        };
        console.log(position);
    }

    render(){
        return(
            <div>
                <Map 
                google={this.props.google} 
                zoom={14}
                style={style}
                initialCenter={{
                    lat: 44.978185,
                    lng: -93.081807
                  }}
                onReady={this.fetchCheckpoints}
                onClick={this.newCheckpoint}
                />
            </div>
        )
    }
};

export default GoogleApiWrapper({apiKey: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'})(NewRaceMap);

const style = {
    width: '100%',
    height: '100%'
}