import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class CheckpointMap extends Component{
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
                />
        )
    }
};

export default GoogleApiWrapper({apiKey: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'})(CheckpointMap);

const style = {
    width: '100%',
    height: '100%'
}